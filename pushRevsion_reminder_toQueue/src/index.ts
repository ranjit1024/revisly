import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();
const prisma = new PrismaClient();
async function getData() {
    try {
        const data = await prisma.revisionSession.findMany({
            select: {
                topic: true,
                email: true,
                reminderDate: true,
                time: true,
                revisionid:true
            }
        })
        data.forEach(async (reminderTime) => {
            await redis.lpush('reminder', JSON.stringify({
                time: reminderTime.time,
                topic: reminderTime.topic,
                email: reminderTime.email,
                id:reminderTime.revisionid
            }))
        })
    }
    catch (e) {
        console.log(`something went wrong ${e}`)
    }
}

getData();