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
  const redis = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 10363,
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
        time: true,
        revisionid: true,
      },
      where: {
        status: "PENDING",
        time: new Date().toISOString(),
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
          time: reminderTime.time,
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

app.post("/api/score/:id", async (req, res) => {
  const id = req.params.id;
  const { score } = req.body;
  const { selectedAnswer } = req.body;
  let status: String[] = [];
  let revisionData: {
    status: String[];
    topic: string;
    email: string;
    revisonId: string;
  } = { topic: "", email: "", status: status, revisonId: "" };
  console.log(id);

  try {
    const userId = await prisma.revisionSession.findFirst({
      where: {
        id: id,
      },
    });

    // if (userId) {
    //   const userUpdate = await prisma.revisionSession.update({
    //     where: {
    //       id: userId.id,
    //     },
    //     data: {
    //       score: score,
    //       answer: selectedAnswer,
    //       status: "COMPLETED",
    //     },
    //   });

    //   res.json({
    //     msg: "Score updated",
    //     data: userUpdate,
    //   });
    //   return;
    // } else {
    //   res.json({
    //     msg: "User not",
    //   });
    // }

    const allRevison = await prisma.revisionSession.findMany({
      where: {
        email: userId?.email,
        topic: userId?.topic,
      },
      include: {
        revision: true,
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
    const isCompletd = revisionData.status.every(data => data === 'COMPLETED')
    console.log(isCompletd);
    if(revisionData){
      const mainUpdate = await prisma.revision.update({
        where:{
          id:revisionData.revisonId
        },
        data:{
          status:'COMPLETED'
        }
      })
      res.status(200).json({
        msg:"Your Session Coppleted"
      })
    }
    else{
       res.status(200).json({
        msg:"Pending"
      })
    }
    console.log(revisionData);
  } catch (e) {
    res.json({
      msg: "not updated",
    });
  }
  res.json({
    msg: "Woking",
  });
});
app.listen(port, () => {
  console.log("listing on port number ", port);
});

corn.schedule("0 0 * * *", async () => {
  const res = await getData();
  console.log("data", res);
});
getData();
