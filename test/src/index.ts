import dotenv from "dotenv";
import { createClient } from "redis";
import fs from "fs";
import { Groq } from "groq-sdk";
dotenv.config();
class RevionsTest {
  private intervel = 3000;
  private revisionData: {
    topic: string;
    email: string;
    revision_id: string;
    id: string;
  } | null = null;
  private count: number = 0;
  private intervelId: NodeJS.Timeout | null = null;

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
    /// creating
    this.intervelId = setInterval(async () => {
      this.count++;

      if (this.count > 5 && this.revisionData === null) {
        this.stop();
      }
      console.log(this.count);
      // getting data from redis queue and store in private veriable
      const reminderData = await redis.brPop("reminder", 60);
      const revisionInfo: {
        topic: string;
        email: string;
        revision_id: string;
        id: string;
      } = JSON.parse(reminderData?.element || "");
      this.revisionData = revisionInfo;
      console.log(this.revisionData);
      const notes = await this.generateNotes(this.revisionData.topic);
      // console.log(notes)
      // done here
    }, this.intervel);
  };

  // genertaing questions
  private generateNotes = async (topic: string) => {
      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });
      // genrta notes from LLM
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
      // storing in loca 
      const question = fs.writeFile("questions.json",chatCompletion.choices[0].message.content || "{}", 'utf-8', (err)=>{
        if(err){
          console.log("Error while Storing",err)
        }
        else{
          console.log("Data successfully stored")
        }
      } )
      return chatCompletion.choices[0].message.content;
    
  };
  // stoping the intervel
  private stop = () => {
    if (this.intervelId) {
      clearInterval(this.intervelId);
      this.intervelId = null;
    }
  };
}
const revision = new RevionsTest();
revision.start();
