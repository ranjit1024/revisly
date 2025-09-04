import express, { Express, Request, } from "express";
import dotenv from "dotenv";
import { Redis } from "@upstash/redis";
import { Groq } from "groq-sdk";

import multer from "multer"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

import pdfDoc from "pdfkit"
import fs from "fs"
import cors from "cors"

dotenv.config();
const app: Express = express();
app.use(express.json())
app.use(cors());

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
  return chatCompletion.choices[0].message.content;
}

function GenerateNotesPdf(text: string) {
  const doc = new pdfDoc();
  doc.pipe(fs.createWriteStream('./notes/notes2.pdf'))
  doc.fontSize(12)
    .text(text, 10, 10, {
      width: 1000,
      align: 'justify'
    });
  doc.end()
}


app.get("/notesuploaded",async(req, res)=>{
  try {
    const revisionData = await redis.rpop("revision") as {
      topic: string
      id: string
    } | null;
    if (revisionData && revisionData.topic !== null && revisionData.topic.trim() !== '') {
      console.log(`Processing: ${revisionData.id}`);
      const notes = await getAiGeneratedNotes(`generate notes for ${revisionData.topic} in clean string format `);

      const notesPdf = GenerateNotesPdf(String(`${notes}`));
      const fileContent = fs.promises.readFile('./notes/notes2.pdf')
      const params = {
        Bucket: String(process.env.S3_BUCKET),
        Key: `${revisionData.id} ${revisionData.topic}/notes/notes.pdf`,
        Body: await fileContent,
        ContentLength: Number((await fileContent).length),
        ContentType: 'application/pdf',

      }
      const command = new PutObjectCommand(params)
      const result = await s3.send(command);
      console.log('Notes uploaded successfully');
      res.status(200).json({
        message:"Notes uploaded successfully"
      })
      return "done with creating notes"
    }
    return "done with creating notes"
  }
  catch (err) {
    console.log('Queue processing error', err);
    res.status(400).json({
       message:"Queue processing error"
     })
    return "error"
  }
})


app.listen(3002, () => {
  console.log(`listing on port number 3002`)
})
