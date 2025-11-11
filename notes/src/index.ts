import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { createClient } from "redis";
import PDFDocument from "pdfkit";
import fs from "fs";
dotenv.config();
//all config
interface ReminderType {
  topic: string;
  id: string;
}

// llm notes init
console.log(process.env.GROQ_API_KEY);
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

//  init a s3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "", // e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
  maxAttempts: 5,
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
// function GenerateNotesPdf(notes: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument(); // Create new instance each time
//     const stream = fs.createWriteStream("notes.pdf");
//     doc.pipe(stream);
//     doc.fontSize(18).text(notes);
//     doc.end();

//     stream.on("finish", () => resolve());
//     stream.on("error", () => reject());
//   });
// }
//main meat of logic
async function main() {
  const redis = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: 13429,
    },
  });
  redis.on("error", (err) => console.log("Something Went wrong", err));
  await redis.connect();
  while (true) {
    try {
      //pop revison message quque
      const quque = await redis.brPop("revision", 60);

      const revisionData: {
        topic: string;
        id: string;
      } = JSON.parse(quque?.element || "");
      console.log(revisionData);

      if (
        revisionData &&
        revisionData.id !== null &&
        revisionData.topic.trim() !== ""
      ) {
        console.log(`Processing: ${revisionData.id}`);

        //hash sett

        const notes = await getAiGeneratedNotes(
          `generate notes for ${revisionData.topic} in clean string format `
        );
        // const notesPdf = await GenerateNotesPdf(String(notes));
        const fileContent = await fs.promises.readFile("notes.pdf");
        //uploading to s3
        const params = {
          Bucket: String(process.env.S3_BUCKET),
          Key: `${revisionData.id} ${revisionData.topic}/notes/notes.pdf`,
          Body: fileContent,
          ContentType: "application/pdf",
        };
        const command = new PutObjectCommand(params);
        const result = await s3Client.send(command);
        console.log(result)
        await redis.set(`status-${revisionData.id}`,JSON.stringify({
        success: true,
      }))
        console.log(
          // result.$metadata.httpStatusCode,
          "Notes uploaded  succesffuly"
        );
    }
  } catch (e) {
    console.log(`something went wrong ${e}`);
  }
}}
main()
