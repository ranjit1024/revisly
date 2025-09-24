import {createClient} from "redis"
import dotenv from "dotenv";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommandInput,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { createWriteStream } from "node:fs";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from "https";
import pdf from "pdf-parse";
import { Readable } from "node:stream";
import Groq from "groq-sdk";
import express, { Express } from "express";
import cors from "cors";
//type
interface reminderType {
  topic: string;
  remind: string;
  time: string;
  email: string;
  revision_id: string;
  id: string;
}
//config
dotenv.config();



console.log(process.env.GROQ_API_KEY);
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const app: Express = express();
app.use(express.json());
app.use(cors());
//file type
interface FileUpload {
  content: Buffer | string;
  key: string;
  contentType: string;
}

//push to quque


//llm test
async function genarateTest(params: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: params,
      },
    ],
    reasoning_format: "parsed",
    model: "qwen/qwen3-32b",
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



class ReminderProceser {
  private isProcessing: boolean = false;
  private shouldStop: boolean = false;
  private pollIntervel: number = 2000;

  async start() {
    if (this.isProcessing) {
      console.log(`Reminder queue is processing`);
      return;
    }
    this.isProcessing = true;
    this.shouldStop = false;
    console.log("Starting Reminder Queue");

    await this.processQueue();
  }
  async stop() {
    console.log("Stopping Queue processor");
    this.shouldStop = true;
  }
  private reminderTime(time: string) {
    const originalDate = new Date(time);
    const reminderTime = new Date(originalDate.getTime() - 10 * 60 * 1000);
    const reminderTimeISO = reminderTime.toISOString()
    return reminderTimeISO;
  }
  private async processQueue() {
        const redis = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 10363
    }
});
redis.connect()
    while (!this.shouldStop) {
      try {
        // Use rpop (non-blocking) with Upstash
        const res  = await redis.brPop("reminder",60);
        
        if (res) {
          const reminderData : reminderType = JSON.parse(res.element);
          console.log(reminderData)
          await this.processReminder( reminderData);
        } else {
          // No items in queue, wait before polling again
          await this.sleep(this.pollIntervel);
        }
      } catch (error) {
        console.error("Queue processing error:", error);
        
        await this.sleep(5000); // Wait longer on error
      }
    }
  }
  private async processReminder(reminder: reminderType | null) {
    try {
      const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_HOST,
      port: 10363
  }
});
client.connect()

      console.log("Procesing Reminder", reminder);
      if (!reminder?.email.trim() || !reminder.id.trim()) {
        return;
      }

      this.storeFile(JSON.stringify(reminder), "data.json");

      const notes = await this.getNotes({
        id: reminder?.revision_id,
        title: reminder?.topic,
      });

      //Get nots pdf
      const pdfBuffer = fs.readFileSync("notes.pdf");
      const data = await pdf(pdfBuffer);
      const pdfTextContent = data.text;

      //generate question
      const questions = await this.generateTest(pdfTextContent, reminder.topic);

      if (!questions) {
        console.log("Failed to generate questions for:", reminder.id);
        return;
      }
      this.storeFile(questions, "questions.json");

      // read html
      const html = fs.readFileSync("index.html", "utf-8");
      await this.upload(
        {
          content: html,
          key: `${reminder.id}/index.html`,
          contentType: "text/html",
        },
        {
          content: questions,
          key: `${reminder.id}/questions.json`,
          contentType: "application/json",
        },
        {
          content: JSON.stringify(reminder),
          key: `${reminder.id}/data.json`,
          contentType: "application/json",
        }
      );
      console.log("Successfully processed reminder:", reminder.id);
      client.lpush(
        "reminderTime",
        JSON.stringify({
          email: reminder.email,
          id: reminder.id,
          topi: this.reminderTime(reminder.time),
        })
      );
      await client.quit()
    } catch (err) {
      console.log("Something Went wrong");
    }
  }

  private async generateTest(
    pdfTextContent: string,
    topic: string
  ): Promise<string | null> {
    try {
      const test = await genarateTest(`
Generate 10 medium level multiple choice questions from ${pdfTextContent}. 
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
- Do not add code block markers at the beginning or end
- dont add an
- Make questions challenging but fair for medium level
- Ensure correctAnswer is the index (0-3) of the correct option
- Mix up the position of correct answers
- Keep questions focused on ${topic}
- Provide clear, concise questions
      `);

      return test;
    } catch (error) {
      console.error("Error generating test:", error);
      return null;
    }
  }

  private storeFile(content: string | null, filename: string) {
    try {
      fs.writeFileSync(filename, "", "utf-8");
      console.log("file content added successfully");

      fs.appendFileSync(filename, String(content), "utf-8");
    } catch (err) {
      console.error("Error Ducring handing file");
    }
  }

  private async getNotes(params: {
    id: string | undefined;
    title: string | undefined;
  }) {
    const { id, title } = params;
    const res = await s3Client.send(
      new GetObjectCommand({
        Bucket: "revisly",
        Key: `${id} ${title}/notes/notes.pdf`,
      })
    );
    return new Promise<void>((resolve, reject) => {
      const body = res.Body;

      if (!(body instanceof Readable)) {
        return reject(new Error("S3 Getobject body is not a Readable stream"));
      }

      const file = createWriteStream("notes.pdf");
      body.pipe(file).on("error", reject).on("close", resolve);
    });
  }

  private upload = async (
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
        ContentType: htmlfile.contentType,
      };
      const htmlCommand = new PutObjectCommand(htmlParams);
      const htmlResponse = await s3Client.send(htmlCommand);
      console.log("HTML upload successful:", htmlResponse.ETag);

      // json file upload
      const jsonParams: PutObjectCommandInput = {
        Bucket: Bucket_Name,
        Key: questions.key,
        Body: questions.content,
        ContentType: questions.contentType,
      };

      const jsonCommand = new PutObjectCommand(jsonParams);
      const jsonResponse = await s3Client.send(jsonCommand);
      console.log("JSON upload successful:", jsonResponse.ETag);

      const userdataPramas: PutObjectCommandInput = {
        Bucket: Bucket_Name,
        Key: userdata.key,
        Body: userdata.content,
        ContentType: userdata.contentType,
      };

      const userCommand = new PutObjectCommand(userdataPramas);
      const userResponse = await s3Client.send(userCommand);
      console.log("JSON upload successful:", userResponse.ETag);
      return {
        htmlETag: htmlResponse.ETag || "",
        jsonETag: jsonResponse.ETag || "",
      };
    } catch (err) {
      console.error(err);
      console.error("Upload failed:", err);
      throw err;
    }
  };
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
const processor = new ReminderProceser();

// Start the processor
processor.start().catch(console.error);
