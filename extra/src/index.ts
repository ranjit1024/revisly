import dotenv from "dotenv";
import { PrismaClient, Status } from "@prisma/client";
import express from "express";
import corn from "node-cron";
import cors from "cors";
import { createClient } from "redis";

//
dotenv.config();

const prisma = new PrismaClient();
const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());
//
async function markMiss() {
  const sesionTime = new Date()
  sesionTime.setHours(23, 59, 0 ,0);
  const data = await prisma.revisionSession.findMany({
    where: {
      reminderDate: {
        lt: sesionTime.toISOString()
      },
      status:{
        in:['PENDING']
      }
    },
    select: {
      id: true
      
    },
    orderBy: {
      reminderDate: "asc",
    },
  });
  console.log(data)
  const mark = data.map(async(user) =>{
    const mark_miss = await prisma.revisionSession.updateMany({
      where:{
        id:user.id
      },
      data:{
        status:"MISSED"
      }
    })
  })
}
async function getData() {
  await markMiss();
  const today = new Date();
  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);
  const startDateIso = startDate.toISOString();

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);
  const redis = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 13429,
    },
  });
  try {
    const sesionTime = new Date();
    sesionTime.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    await redis.connect();
    const data = await prisma.revisionSession.findMany({
      where: {
        reminderDate: {
          gte: sesionTime.toISOString(),
          lte: endOfDay.toISOString()
        }
      },
      select: {
        id: true,
        topic: true,
        email: true,
        reminderDate: true,
        revisionid: true,
      },
      orderBy: {
        reminderDate: "asc",
      },
    });
    console.log(data);
    data.forEach(async (reminderTime) => {
      await redis.lPush(
        "reminder",
        JSON.stringify({
          topic: reminderTime.topic,
          email: reminderTime.email,
          revision_id: reminderTime.revisionid,
          id: reminderTime.id,
        })
      );
    });
  } catch (e) {
    console.log(`something went wrong ${e}`);
  }
}

async function isCompletd({ topic, id }: { topic: string, id: string }) {

  let score = 0;
  const sessions = await prisma.revisionSession.findMany({
    where: {
      topic: topic
    },
    select: {
      status: true,
      score: true,
    }
  })
  console.log(sessions)
  const result = sessions.every(session => {
    if (session.status === "COMPLETED") {

      score += session.score;

    }
  })
  console.log()
  return {
    result,
    score: score / sessions.length
  };
}

app.post('/api/check/:id', async (req, res) => {
  const id = req.params.id;
  const isCompletd = await prisma.revisionSession.findFirst({
    where: {
      id: id
    },
    select: {
      status: true
    }
  })
  if (isCompletd?.status === 'COMPLETED') {
    return res.status(200).json({
      status: true
    });
  }
  return res.status(411).json({
    status: false
  })
})

app.post("/api/score/:id", async (req, res) => {
  const id = req.params.id;
  const { score } = req.body;
  const { selectedAnswer } = req.body;

  console.log(id);

  try {
    const userId = await prisma.revisionSession.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        topic: true,
        revision: true
      }
    });

    if (!userId) {
      res.json({
        msg: "User Not found",
      });
      return;
    }
    const sessionUpdate = await prisma.revisionSession.update({
      where: {
        id: userId.id,
      },
      data: {
        score: score,
        answer: selectedAnswer,
        status: "COMPLETED",
      },
    });
    const response = await isCompletd({ topic: userId?.topic || "", id: id });

    console.log(response.result);
    console.log(response.result)
    if (response.result) {
      const setCompleted = await prisma.revision.update({
        where: {
          id: userId.revision.id
        },
        data: {
          score: response.score,
          status: "COMPLETED"
        }
      })
      return res.json({
        message: 'Main revision session also completed'
      })
    }
    else {
      return res.json({
        message: 'main revision session is not completed'
      })
    }
  }
  catch (e) {
    res.json({
      msg: "Something Went wrinf",
    });
  }

});
async function  main() {
  const res = await getData()
}
main()
app.listen(port, () => {
  console.log("listing on port number ", port);
});
corn.schedule('0 0 * * *', async () => {
  await getData()
},{
  timezone:"Asia/Kolkata"
})