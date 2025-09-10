import { S3Client } from "@aws-sdk/client-s3";
import Groq from "groq-sdk";
import  dotenv from "dotenv";
import { Redis } from "@upstash/redis";
import PDFDocument from "pdfkit";
import fs from "fs"
//all config
dotenv.config()
const redis = Redis.fromEnv()
// llm notes init
console.log(process.env.GROQ_API_KEY)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
//  init a s3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "us-east-1", // e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID??"",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY??'',
  },
  maxAttempts:5,
});
//generating notes
async function getAiGeneratedNotes(params: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: params,
      },
    ],
    model: "openai/gpt-oss-120b",
  });
  return chatCompletion.choices[0]?.message.content;
}
//storing in pdf
function GenerateNotesPdf(notes:string):Promise<void> {
  return new Promise((resolve,reject)=>{
     const doc = new PDFDocument(); // Create new instance each time
    const stream = fs.createWriteStream('notes.pdf');
    doc.pipe(stream);
    doc.fontSize(20).text(notes);
    doc.end();
    
    stream.on('finish', () => resolve());
    stream.on('error', () => reject());
  })
}