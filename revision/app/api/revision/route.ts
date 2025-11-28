"use server";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z from "zod";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { createClient } from "redis";
import { Groq } from "groq-sdk";
import crypto from "crypto";
import { AwardIcon } from "lucide-react";




const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
async function gerateBrif(sub: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Give me a 10-word brief about the ${sub} `,
      },
    ],
    model: "openai/gpt-oss-120b",
  });
  return chatCompletion.choices[0].message.content;
}

//function to get user selected time into date type

//function for calculating endsesionDate
function calculateAfterDays(value: number, createDate: Date): Date {
  const date = new Date();
  date.setDate(createDate.getDate() + value);
  
  return date;

}
// all zod schemas
const week = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const validation = z.object({
  topic: z.string(),
  sessionIntervel: z.array(z.string()).min(1),
  days: z.array(z.enum(week)),
  difficulty: z.enum(["easy", "medium", "hard"]),
  sessionStart: z.string(),
  sessionEnd: z.string(),
});
function getCorrectDate(date: string) {
  const newDate = new Date(date);
  return newDate.toISOString();
}
export async function POST(req: NextRequest) {
    const redis = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 13429,
    },
  });

  const id = crypto.randomBytes(8).toString("hex");

  const session = await getServerSession(authOption);
  const body = await req.json();
  const zodValidation = validation.safeParse(body);

  const sessionIntervels = zodValidation.data?.sessionIntervel.map((date) =>
    new Date(date).toISOString()
  );

  const daysLenght = zodValidation.data?.days.length;
  console.log(zodValidation.data)

  if (!zodValidation.success) {
    return NextResponse.json({ message: "Invalid Input" }, { status: 400 });
  }

  if (zodValidation.data.difficulty === "medium" && daysLenght !== 3) {
    return NextResponse.json({ message: "invalid Input" }, { status: 400 });
  }
  const ifExitstingRevison = await prisma.revision.findFirst({
    where: {
      topic: zodValidation.data.topic,
    },
  });

  if (ifExitstingRevison) {
    return NextResponse.json(
      { message: "Session Exists with same topic" },
      { status: 400 }
    );
  }
  const  sessionCount = await prisma.revision.count({
    where:{
      email:session?.user?.email || ""
    }
  })
   if(sessionCount > 5){
     return NextResponse.json(
      { message: "Limit Reached" },
      { status: 400 }
    );
   }

  // <---- Completing on the revision donrt----->


  try {
    await redis.connect();
    //pushing in quque
    await redis.lPush(
      "revision",
      JSON.stringify({
        topic: zodValidation.data?.topic,
        id: id,
      })
    );
    //check whethre notes process are done or not

  
    // cretae db entry
    try{
      const result = await redis.brpop(`${id}status`, 500);
      console.log(result)
    }
    catch(e){
      return NextResponse.json(
      { message: "Cannot Process Your Request" },
      { status: 400 }
    );
    }
    finally{
      await redis.del('${id}status')
    }
    const revision = await prisma.revision.create({
      data: {
        id: id,
        email: session?.user?.email ?? "",
        topic: zodValidation.data.topic,
        startSesion: getCorrectDate(zodValidation?.data?.sessionStart),
        endSession: new Date(zodValidation.data.sessionEnd),
        totalDays: 12,
        days: zodValidation.data.days,
        sessionsintervel: sessionIntervels,
        brif:
          (await gerateBrif(zodValidation.data.topic)) ??
          "not able to generate",
        sessions: Number(sessionIntervels?.length),
        status: "PENDING",
        score: 0,
      },
    });
    console.log(revision)
    //  <----- adding revisionSesions -------------------->
    if (sessionIntervels!.length > 0) {
      await prisma.revisionSession.createMany({
        data:
          sessionIntervels?.map((date, index) => ({
            email: String(session?.user?.email),
            score: 0,
            sessionNumber: index,
            topic: revision.topic,
            revisionid: revision.id,
            reminderDate: new Date(date).toISOString(),
            status: "PENDING",
          })) || [],
      });
    }
    await redis.quit();
    return NextResponse.json(
      { message: "Notes and database updated" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
