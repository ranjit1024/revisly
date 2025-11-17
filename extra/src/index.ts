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
  const startDate =  new Date(today);
  startDate.setHours(0 ,0,0,0);
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
    await redis.connect();
    const data = await prisma.revisionSession.findMany({
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
      where:{
        reminderDate:{
          gte:startDateIso,
          lte:endOfDayISO
        },
       status:"PENDING"
      }
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
async function isCompletd(email: string, topic: string) {
  let status: String[] = [];
  let revisionData: {
    status: String[];
    topic: string;
    email: string;
    revisonId: string;
  } = { topic: "", email: "", status: status, revisonId: "" };
  const allRevison = await prisma.revisionSession.findMany({
    where: {
      email: email,
      topic: topic,
    },
    include: {
      revision: true
    },
  });

  allRevison.map((revison) => {
    status.push(revison.status);
    revisionData = {
      topic: revison.topic,
      email: revison?.email,
      status: status,
      revisonId: revison.revision.id,
    };
  });
  console.log(revisionData)
  const isCompletd = revisionData.status.every((data) => data === "COMPLETED");

  if (isCompletd) {
     await prisma.revision.update({
      where: {
        id: revisionData.revisonId,
      },
      data: {
        status: "COMPLETED",
      },
    });
    return
  } else {
    return
  }

}

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
    });

    if (userId) {
      const userUpdate = await prisma.revisionSession.update({
        where: {
          id: userId.id,
        },
        data: {
          score: score,
          answer: selectedAnswer,
          status: "COMPLETED",
        },
      });
      isCompletd(userId.email, userId.topic);
      res.json({
        msg: "Score updated",
        data: userUpdate,
      });
      return;

    }
    else {
      res.json({
        msg: "User Not found",
      });
    }
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
corn.schedule('0 0 * * *',async()=>{
  await getData()
})

getData()