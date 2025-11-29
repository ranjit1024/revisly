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
async function getData() {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);
  const startDateIso = startDate.toISOString();

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);
  const endOfDayISO = endOfDay.toISOString();
  const redis = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 13429,
    },
  });
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    await redis.connect();
    const data = await prisma.revisionSession.findMany({
      where: {
        reminderDate: {
          gte: startOfToday.toISOString(),
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

async function isCompletd({ id }: { id: string }) {
  let COMPLETED = false;
  let score = 0;
  const sessions = await prisma.revisionSession.findMany({
    where: {
      id: id
    },
    select: {
      status: true,
      score: true,
    }
  })
  console.log(sessions)
  sessions.filter(session => {
    if (session.status === "MISSED") {
      console.log("fsdf")
      return
    }
    else if (session.status === "PENDING") {
      console.log("dsladjfa")
      return;
    }
    score += session.score;
  })
  COMPLETED = true;
  if (COMPLETED) {
    const userId = await prisma.revisionSession.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        revision: true
      }
    });
    await prisma.revision.update({
      where: {
        id: userId?.revision.id
      },
      data: {
        score: score / sessions.length
      }
    })
  }
  console.log(score / sessions.length)

}
app.post('/api/test', async (req, res) => {
  const id = req.body;


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
    const response = await isCompletd({ id: id });

  }
  catch (e) {
    res.json({
      msg: "Something Went wrinf",
    });
  }

});
app.listen(port, () => {
  console.log("listing on port number ", port);
});
corn.schedule('0 0 * * *', async () => {
  await getData()
})

getData()