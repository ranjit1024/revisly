"use server"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z, { string } from "zod";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import {createClient} from 'redis'
import { Groq } from "groq-sdk";
import crypto from 'crypto'
import axios from "axios";
import { AwardIcon } from "lucide-react";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
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
function getSelectedDateAndTime(time: string): Date {
  const today = new Date().toISOString().split('T')[0]
  const [year, month, day] = today.split('-').map(Number);
  console.log(month)
  const perido = String(time).slice(-2);
  const [hours, minute] = String(time).slice(0, -2).split(':').map(Number);

  let hours24 = Number(hours);
  if (perido === 'PM') hours24 += 12;
  if (perido === 'AM') hours24;

  const convertedDate = new Date(year, (month - 1), day, hours24, minute, 0, 0);
  return convertedDate
}
//function for calculating endsesionDate
function calculateAfterDays(value: number, createDate: Date): Date {
  const date = new Date();
  date.setDate(createDate.getDate() + value);
  return date;
}
// all zod schemas
const week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

const validation = z.object({
  topic: z.string(),
  sessionIntervel: z.array(z.string()),
  time: z
    .string()
    .min(6)
    .max(7)
    .regex(/^\d{1,2}:\d{2}[AP]M$/, "Invalid time format")
    .refine((time) => {
      const timepart = time.slice(0, -2);
      const [hours, minutes] = timepart.split(":").map(Number);
      return hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59;
    }),
  days: z.array(z.enum(week)),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  sessionStart: z.string(),
  sessionEnd: z.string()
});
function getCorrectDate(date: string) {
  const newDate = new Date(date)
  return newDate.toISOString()
}
export async function POST(req: NextRequest) {

  const id =  crypto.randomBytes(8).toString('hex');
  const session = await getServerSession(authOption)
  const body = await req.json();
  const zodValidation = validation.safeParse(body);

  const sessionIntervels = zodValidation.data?.sessionIntervel.map(date => new Date(date).toISOString());


  const daysLenght = zodValidation.data?.days.length;

  if (!zodValidation.success) {
    return NextResponse.json({ message: 'Invalid Input' }, { status: 400 });
  }

  if (zodValidation.data.difficulty === "medium" && daysLenght !== 3) {
    return NextResponse.json({ message: "invalid Input" }, { status: 400 })
  }
  const ifExitstingRevison = await prisma.revision.findFirst({
    where:{
      topic:zodValidation.data.topic
    }
  })
  if(ifExitstingRevison){
    return NextResponse.json({ message: "Session Exists with same topic" }, { status: 400 })
  }
    const redis = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 10363
    }
});
  // <---- Completing on the revision donrt----->
    
  try {
   
    await redis.connect()
    //pushing in quque
      await redis.lPush("revision", JSON.stringify({
        topic: zodValidation.data?.topic,
        id: id
      }));
    //check whethre notes process are done or not\
    await redis.quit()
    // cretae db entry
    const revision = await prisma.revision.create({
      data: {
        id: id,
        email: session?.user?.email ?? "",
        topic: zodValidation.data.topic,
        time: getSelectedDateAndTime(zodValidation.data.time)?.toISOString(),
        startSesion: getCorrectDate(zodValidation?.data?.sessionStart),
        endSession: new Date(zodValidation.data.sessionEnd),
        totalDays: 12,
        days: zodValidation.data.days,
        sessionsintervel: sessionIntervels,
        brif: await gerateBrif(zodValidation.data.topic) ?? "not able to generate",
        sessions: Number(sessionIntervels?.length),
        status: 'PENDING',
        score: 0
      }
    });
    //  <----- adding revisionSesions -------------------->
    if (sessionIntervels!.length > 0) {
      await prisma.revisionSession.createMany({
        data: sessionIntervels?.map((date, index) => ({
          email: String(session?.user?.email),
          score: 0,
          sessionNumber: index,
          topic: revision.topic,
          revisionid: revision.id,
          reminderDate: new Date(date).toISOString(),
          status: "PENDING",
          time: revision.time
        })) || []
      })
    }

    return NextResponse.json({ message: 'Notes and database updated' }, { status: 200 });

  }
  catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 400 });
  }
 
}

