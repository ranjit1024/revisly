import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
dotenv.config();
const redis = Redis.fromEnv();
const prisma = new PrismaClient()
async function checkDate() {

    const date = await prisma.revisionSession.findMany({
        select: {
            topic:true,
            email:true,
            reminderDate: true
        }
    })
     date.forEach(data => {
        console.log(data.reminderDate.getTime(), data.topic)
     })
}
checkDate()