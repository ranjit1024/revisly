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
import express, { Express } from "express";
import cors from "cors"
import { CostExplorer } from "aws-sdk";
//config
dotenv.config();
const redis = Redis.fromEnv();

const prisma = new PrismaClient();

console.log(process.env.GROQ_API_KEY)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
const app: Express = express();
app.use(express.json());
app.use(cors())
//file type
interface FileUpload {
  content: Buffer | string;
  key: string;
  contentType: string;
}

//push to quque
async function getData() {
  try {
    const data = await prisma.revisionSession.findMany({
      select: {
        id: true,
        topic: true,
        email: true,
        reminderDate: true,
        time: true,
        revisionid: true
      },
      orderBy: {
        reminderDate: 'desc'
      }, 
      
    })
    data.forEach(async (reminderTime) => {
      await redis.lpush('reminder', JSON.stringify({
        time: reminderTime.time,
        topic: reminderTime.topic,
        email: reminderTime.email,
        revision_id: reminderTime.revisionid,
        id: reminderTime.id
      }))
    })
  }
  catch (e) {
    console.log(`something went wrong ${e}`)
  }
}

//llm test
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
//inti s3 client config
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
function storeFile(content: string | null, filename: string) {
  fs.writeFile(filename, '', (err) => {
    if (err) {
      console.error('Error clearing file:', err);
      return;
    }
    console.log('File content cleared successfully.');
    // Step 2: Add the new content
    fs.appendFile(filename, String(content), (err) => {
      if (err) {
        console.error('Error appending new content:', err);
        return;
      }
      console.log('New content added successfully.');
    });
  });
}
//upload to s3
const upload = async (
  htmlfile: FileUpload,
  questions: FileUpload,
  userdata: FileUpload
) => {
  const Bucket_Name = "ranjit-dev-test";
  try {
    //upload html file
    const htmlParams: PutObjectCommandInput = {
      Bucket: Bucket_Name,
      Key: htmlfile.key,
      Body: htmlfile.content,
      ContentType: htmlfile.contentType
    }
    const htmlCommand = new PutObjectCommand(htmlParams);
    const htmlResponse = await s3Client.send(htmlCommand);
    console.log('HTML upload successful:', htmlResponse.ETag);

    // json file upload
    const jsonParams: PutObjectCommandInput = {
      Bucket: Bucket_Name,
      Key: questions.key,
      Body: questions.content,
      ContentType: questions.contentType
    }

    const jsonCommand = new PutObjectCommand(jsonParams);
    const jsonResponse = await s3Client.send(jsonCommand);
    console.log('JSON upload successful:', jsonResponse.ETag);

    const userdataPramas: PutObjectCommandInput = {
      Bucket: Bucket_Name,
      Key: userdata.key,
      Body: userdata.content,
      ContentType: userdata.contentType
    }

    const userCommand = new PutObjectCommand(userdataPramas);
    const userResponse = await s3Client.send(userCommand);
    console.log('JSON upload successful:', userResponse.ETag);
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
        remind: string,
        time: string,
        email: string,
        revision_id: string,
        id: string,
      } | null;
      //Getting notes from s3
      if (reminder && reminder.email !== null) {
        storeFile(JSON.stringify(reminder), 'data.json')
        console.log("popoed", reminder)
        const notes = await getNotes({
          id: reminder?.revision_id,
          title: reminder?.topic
        });
        //getting pdf in Memory
        const pdfBuffer = fs.readFileSync('notes.pdf');
        const data = await pdf(pdfBuffer);
        const pdfTextContent = data.text;
        //genrateing question
        const test: string | null = await genarateTest(`

          Generate ${10} ${'medium'} level multiple choice questions from ${pdfTextContent}. 
Return ONLY a valid Javascript format with this exact structure:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0
  }
]

Requirements:
- Dont add ${'```javascrip '}  on top and ${'```'} on bottom
- Do not add code block markers at the beginning or end
- Make questions challenging but fair for ${'medium'} level
- Ensure correctAnswer is the index (0-3) of the correct option
- Mix up the position of correct answers
- Keep questions focused on ${reminder.topic}
- Provide clear, concise questions`
        );
        // 
        storeFile(test, 'questions.json');
        const html = fs.readFileSync('index.html', 'utf-8');
        const questions = fs.readFileSync('questions.json', 'utf-8');

        await upload(
          {
            content: html,
            key: `${reminder.id}/index.html`,
            contentType: 'text/html'
          },
          {
            content: questions,
            key: `${reminder.id}/questions.json`,
            contentType: 'application/json'
          },
          {
            content: JSON.stringify(reminder),
            key: `${reminder.id}/data.json`,
            contentType: 'application/json'
          }
        )
        return;

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
// generateQuestionAndStore();
//app rout


app.post('/api/score/:id', async (req, res) => {
  const id = req.params.id;
  const { score } = req.body;
  console.log(id)
  console.log(score)
  try {
    const userId = await prisma.revisionSession.findFirst({
      where: {
        id: id
      }
    })
    console.log(userId)
    if (userId) {
      const userUpdate = await prisma.revisionSession.update({
        where: {
          id: userId.id
        },
        data: {
          score: score
        }
      });
      res.json({
        msg: "Score updated",
        data: userUpdate
      })
      return;
    }
    else {
      res.json({
        msg: "User not",

      })
    }

  }
  catch (e) {
    res.json({
      msg: "not updated"
    })
  }
})
app.listen(4000, () => {
  console.log('listing on port number 4000')
})