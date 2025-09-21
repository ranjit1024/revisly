import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
import express from "express";
import corn from "node-cron"
import cors from "cors";
//
dotenv.config();
const redis = Redis.fromEnv();
const prisma = new PrismaClient();
const app = express();
const port = 8080;
app.use(cors);
app.use(express.json())
//
async function getData() {
  try {
    const data = await prisma.revisionSession.findMany({
      select: {
        id: true,
        topic: true,
        email: true,
        reminderDate: true,
        time: true,
        revisionid: true,
      },
      where:{
        status:"PENDING",
        time:new Date().toISOString()
      },
      orderBy: {
        reminderDate: "asc",
      },
    });
    console.log(data)
    data.forEach(async (reminderTime) => {
      await redis.lpush(
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
  console.log(id);

  try {
    const userId = await prisma.revisionSession.findFirst({
      where: {
        id: id,
      },
    });
    console.log(userId);
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

      res.json({
        msg: "Score updated",
        data: userUpdate,
      });
      return;
    } else {
      res.json({
        msg: "User not",
      });
    }
  } catch (e) {
    res.json({
      msg: "not updated",
    });
  }
});
app.listen(port, () => {
  console.log("listing on port number ",  port);
});

corn.schedule('0 0 * * *', async()=>{
  const res = await getData();
  console.log(res)
})