import dotenv from "dotenv";
import { createClient } from "redis";
import fs from "fs";
import { Groq } from "groq-sdk";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
dotenv.config();

class RevionsTest {
  private intervel = 3000;
  private revisionData: {
    topic: string;
    email: string;
    revision_id: string;
    id: string;
  } | null = null;



  start = async () => {
    const redis = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: 13429,
      },
    });
    await redis.connect();

      while(1){

      try{

      
      const reminderData = await redis.brPop("reminder", 0);
      
      this.revisionData = JSON.parse(reminderData?.element || "");
      console.log(this.revisionData);
      if (this.revisionData) {
        const notes = await this.generateNotes(this.revisionData.topic);
      
        this.Store('data.json', JSON.parse(JSON.stringify(this.revisionData)));
        this.Store('questions.json', notes || "",true);
        await this.Upload([{filePath:'./index.html', key:`${this.revisionData.id}/index.html`,content_type:'text/html'},

          {filePath:'./data.json', key:`${this.revisionData.id}/data.json`,content_type:'application/json'},
          {filePath:'./questions.json', key:`${this.revisionData.id}/questions.json`,content_type:'application/json'},
        ])
        await redis.lPush("reminderTime", JSON.stringify({
          email:this.revisionData.email,
          id:this.revisionData.id,
          topic:this.revisionData.topic
        }))
      }
      else{
        console.log("Not found")
      }
    }catch(e){
      console.log('something Went wrong ', e)
    }
    }
  }

  // genertaing questions
  private generateNotes = async (topic: string) => {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    // generatea Questions from LLM
    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `Generate 10 mid to hard multiple-choice interview questions focusing on ${topic}Strictly output the result as a raw JSON array of objects. Do not include markdown formatting likeUse this exact JSON structure for each object:
            {
              "id": <number>,
              "question": "<The technical question string>",
              "options": [
                "A) <Option 1>",
                "B) <Option 2>",
                "C) <Option 3>",
                "D) <Option 4>"
              ],
              "correctAnswer": <index of the correct option, e.g., 0 for A, 1 for B>
            }`,
        },
      ],
    });
    return chatCompletion.choices[0].message.content;
  };
  // storing in hard disk
  private Store = (filename: string, content:string, question?:boolean) => {
    try {
      if(question === true){
              fs.writeFileSync(filename, content, "utf-8");  
              console.log("questoin Written Successfully");      
      }
      else{
        fs.writeFileSync(filename, JSON.stringify(content), "utf-8");
        console.log("file Written Successfully");
      }
    } catch (err) {
      console.log("Error while storing file", err);
    }
  };
  // stoping the intervel
  private Upload = async (
    files:{filePath: string,
    key: string,content_type:string}[]
  ) => {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const uploadPromise = files.map(file =>{
      const fileContent = fs.readFileSync(file.filePath);
      const params: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET,
        Key: file.key,
        Body: fileContent,
        ContentType:file.content_type
      };
      return s3Client.send(new PutObjectCommand(params));
    })
    try{
      const results = await Promise.all(uploadPromise);
      console.log('Uploded')
      return results;
    }
    catch(err){
      console.error('Upload Filest', err)
    }
  
  }
 
}
const revision = new RevionsTest();
revision.start();
