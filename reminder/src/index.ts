import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
import { S3Client, GetObjectCommand, PutObjectCommandInput, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs"
import { createWriteStream } from "node:fs";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from 'https';
import pdf from "pdf-parse"
import { Readable } from "node:stream";
import Groq from "groq-sdk"
dotenv.config();
const redis = Redis.fromEnv();
import nodemailer from "nodemailer";
import pdfDocment from "pdfkit"

const prisma = new PrismaClient();

console.log(process.env.GROQ_API_KEY)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

//file type
interface FileUpload {
  content: Buffer | string;
  key: string;
  contentType: string;
}



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'revislyreminder@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})
//push to quque
async function getData() {
  try {
    const data = await prisma.revisionSession.findMany({
      select: {
        topic: true,
        email: true,
        reminderDate: true,
        time: true,
        revisionid: true
      },
      orderBy: {
        reminderDate: 'desc'
      }
    })
    data.forEach(async (reminderTime) => {
      await redis.lpush('reminder', JSON.stringify({
        time: reminderTime.time,
        topic: reminderTime.topic,
        email: reminderTime.email,
        id: reminderTime.revisionid
      }))
    })
  }
  catch (e) {
    console.log(`something went wrong ${e}`)
  }
}

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
async function genarateTest(params: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: params,
      },
    ],
    model: "llama-3.1-8b-instant",
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


//store question in pdf
function GenerateNotesPdf(notes: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new pdfDocment(); // Create new instance each time
    const stream = fs.createWriteStream('./test/question.pdf');
    doc.pipe(stream);
    doc.fontSize(18).text(notes);
    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', () => reject());
  })
}
//upload to s3
const upload = async (
  htmlfile: FileUpload,
  jsonfile: FileUpload
) => {
  const Bucket_Name = "ranjit-dev-test";
  try {
    //upload html file
    const htmlParams:PutObjectCommandInput = {
      Bucket:Bucket_Name,
      Key:htmlfile.key,
      Body:htmlfile.content,
      ContentType:htmlfile.contentType
    }
    const htmlCommand = new PutObjectCommand(htmlParams);
    const htmlResponse = await s3Client.send(htmlCommand);
    console.log('HTML upload successful:', htmlResponse.ETag);

    // json file upload
    const jsonParams : PutObjectCommandInput = {
      Bucket:Bucket_Name,
      Key:jsonfile.key,
      Body:jsonfile.content,
      ContentType:jsonfile.contentType
    }

    const jsonCommand = new PutObjectCommand(jsonParams);
    const jsonResponse = await s3Client.send(jsonCommand);
    console.log('JSON upload successful:', jsonResponse.ETag);
     return {
      htmlETag: htmlResponse.ETag || '',
      jsonETag: jsonResponse.ETag || '',
    };

  } catch (err) {
    console.error(err)
     console.error('Upload failed:', err);
    throw err;
  }
}
//get notes pdf form s3
async function getNotes(params: { id: string | undefined, title: string | undefined }) {
  const { id, title } = params
  const res = await s3Client.send(new GetObjectCommand({
    Bucket: "revisly",
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


async function generateQuestionAndStore() {

  //pushing into ququue
  const push = await getData()
  setInterval(async () => {


    try {
      const reminder = await redis.rpop("reminder") as {
        topic: string
        id: string,
        time: string,
        email: string
      } | null;
      //Getting notes from s3
      if (reminder && reminder.email !== null) {
        console.log("popoed", reminder)


        const notes = await getNotes({
          id: reminder?.id,
          title: reminder?.topic
        });
        //getting pdf in Memory
        const pdfBuffer = fs.readFileSync('notes.pdf');
        const data = await pdf(pdfBuffer);
        const pdfTextContent = data.text;
        //genrateing question
        const test: string | null = await genarateTest(`dont add think tag and Generate ${10} ${'esaus'} level multiple choice questions from ${pdfTextContent}. 
    Return ONLY a valid Javascript format  with this exact structure:
    
      export default[
        {
          "id": 1,
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Brief explanation of the correct answer"
        }
      ]
   
    Requirements:
    - Dont add ${'```javascrip '}  on top and ${'```'} on bottom
    - Make questions challenging but fair for medium level
    - Ensure correctAnswer is the index (0-3) of the correct option
    - Mix up the position of correct answers
    - Keep questions focused on ${reminder.topic}
    - Provide clear, concise explanations`)

      
        fs.writeFile('questions.json', '', (err) => {
          if (err) {
            console.error('Error clearing file:', err);
            return;
          }
          console.log('File content cleared successfully.');
          // Step 2: Add the new content
          fs.appendFile('questions.json', String(test), (err) => {
            if (err) {
              console.error('Error appending new content:', err);
              return;
            }
            console.log('New content added successfully.');
          });
        });
        console.log(pdfTextContent.length);
        return
      }
      else {
        console.log("fsdf")
        return;
      }

    }
    catch (e) {
      console.log(e)
    }
  }, 5000)
}
// generateQuestionAndStore()
const htmlContent = '<html><body><h1>Hello World</h1></body></html>';
const jsonContent = JSON.stringify({ message: 'Hello', timestamp: Date.now() });
async function  uploadFiles() {
  await upload(
    {
      content:htmlContent,
      key:'pages/index.html',
      contentType:'text/html'
    },
    {
       content:jsonContent,
       key:'data/response.json',
       contentType:'application/json'
    }
  )
}
uploadFiles()