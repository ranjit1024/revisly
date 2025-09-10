import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { basename, resolve } from "node:path";
import { Readable } from "node:stream";
import { error } from "node:console";
import { createWriteStream } from "node:fs";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from 'https';
dotenv.config();
const redis = Redis.fromEnv();
const prisma = new PrismaClient();

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
//  const userNotes = await getNotes({folderKey:`${id} ${title}/notes/notes.pdf`});//key
async function  getNotes(params:{bucket:string, key:string, outPath?:string}) {
  const {bucket,key,outPath=`./${basename(key)}`} = params  ;
  const res = await s3Client.send(new GetObjectCommand({
    Bucket:bucket,
    Key:key
  }));
  return new Promise<void>((resolve,reject)=>{
    const body = res.Body;
    if(!(body instanceof Readable)){
      return reject(new Error("S3 Getobject body is not a Readable stream"));
    }
    const file = createWriteStream(outPath)
    body
    .pipe(file)
    .on("error", reject)
    .on("close", ()=>resolve)
  })
}

async function GenerateTest(){
    const data = await redis.rpop("reminder");
    console.log(data)
}

// GenerateTest()
