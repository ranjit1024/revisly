import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs"
import { createWriteStream } from "node:fs";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from 'https';
import pdf from "pdf-parse"
import { Readable } from "node:stream";
import Groq from "groq-sdk"
import Mail = require("nodemailer/lib/mailer");
dotenv.config();
const redis = Redis.fromEnv();
import nodemailer from "nodemailer"
import { mainModule } from "node:process";
const prisma = new PrismaClient();
console.log(process.env.GROQ_API_KEY)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'revislyreminder@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})
//genrate test
//send mail
async function sendMail({
  from,
  to,
  subject,
  text,
  index
}: {
  from: string,
  to: string,
  subject: string,
  text: string,
  index: string
}) {
  const mailConbnfg = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: index
  });
  return mailConbnfg.response;
}
async function genrateTest(params: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: params,
      },
    ],
    model: "qwen/qwen3-32b",
  });
  return chatCompletion.choices[0]?.message.content;
}
//inti s3 client;
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  requestHandler: new NodeHttpHandler({
    requestTimeout: 60000, // 60 seconds
    connectionTimeout: 5000, // 5 seconds
    httpsAgent: new https.Agent({
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets: 50,
      timeout: 60000,
    }),
  }),
  retryMode: "adaptive",
  maxAttempts: 3,
});

//get notes pdf form s3
async function getNotes(params: { id: string | undefined, title: string | undefined }) {
  const { id, title } = params
  const res = await s3Client.send(new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `${id} ${title}/notes/notes.pdf`
  }));
  return new Promise<void>((resolve, reject) => {
    const body = res.Body;

    if (!(body instanceof Readable)) {
      return reject(new Error("S3 Getobject body is not a Readable stream"));
    }

    const file = createWriteStream('notes.pdf')
    body
      .pipe(file)
      .on("error", reject)
      .on("close", resolve)
  })
}

async function reminder() {

  //pop data from  quque
  try {


    const reminder = await redis.rpop("reminder") as {
      topic: string
      id: string,
      time: string,
      email: string
    } | null;
    console.log("popoed", reminder)
    //Getting notes from s3
    const notes = await getNotes({
      id: reminder?.id,
      title: reminder?.topic
    });

    //getting pdf in Memory
    const pdfBuffer = fs.readFileSync('notes.pdf');
    const data = await pdf(pdfBuffer);
    const pdfTextContent = data.text;
    console.log("email", reminder?.email)
    //send mail
    const reminderMail = await sendMail({
      from: 'revislyreminder@gmail.com',
      to: reminder!.email,
      text: `this is your reminder for subject ${reminder?.topic}`,
      subject: reminder!.topic,
      index: '<h1>Reminder for financail modeling </h1> <Button style={{"bgColor":"red"}}><a href="https://ranjitdas.in">Start Test </a><Button>'
    });
    console.log(reminderMail)
    // console.log(pdfTextContent)
  }
  catch (e) {
    console.log(e)
  }
}
reminder()