import dotenv from "dotenv";
import { Redis } from "@upstash/redis";
import { Groq } from "groq-sdk";
import multer from "multer"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import pdfDoc from "pdfkit";

import express from "express";

import PDFDocument from 'pdfkit';
import fs from 'fs';
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from 'https';
//all import conf
const port = 5084;
dotenv.config({
  debug: true
});

console.log(process.env.GROQ_API_KEY)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
console.log(process.env.GROQ_API_KEY)
const s3 = new S3Client({
  region: String(process.env.AWS_REGION),

  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
  maxAttempts: 5,
  retryMode: 'adaptive'
})

interface MulterRequest extends Request {
  file: Express.Multer.File;
}
interface UploadResponse {
  message: string;
  url: string;
  fileKey: string;
}
interface ErrorResponse {
  error: string;
}
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only pdf files are allowed'))
    }
  }
});
const app = express()
const redis = Redis.fromEnv();

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

setInterval( async() =>{
  try {
    const revisionData = await redis.rpop("revision") as {
      topic: string
      id: string
    } | null;

    if (revisionData && revisionData.topic !== null && revisionData.topic.trim() !== '') {
      console.log(`Processing: ${revisionData.id}`);
      //sending processing
 
    
        //uploading to s3
        const notes = await getAiGeneratedNotes(`generate notes for ${revisionData.topic} in clean string format `);
        const notesPdf = await GenerateNotesPdf(String(notes));
        console.log("errror", notesPdf)
        const fileContent = await fs.promises.readFile("notes.pdf");
      
        const params = {
          Bucket: String(process.env.S3_BUCKET),
          Key: `${revisionData.id} ${revisionData.topic}/notes/notes.pdf`,
          Body:  fileContent,
          ContentType: 'application/pdf',
        }
 
        const command = new PutObjectCommand(params);
        
        const result = await s3.send(command);
        
        console.log('Notes uploaded successfully', result);
       
        const notesUploaded = await redis.publish("notes", "Notes uploaded successfully")
        console.log(notesUploaded);
        fs.unlinkSync("notes.pdf");
        return "done with creating notes";
      }
     
    }
    catch(e){
      console.log(e)
    }
    return "done with creating notes"
  }
,5000)
 // Check every 2 seconds
console.log("Worker started - processing revision jobs...");