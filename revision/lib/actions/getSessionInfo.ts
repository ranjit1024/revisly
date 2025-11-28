"use server";
import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import prisma from "../prisma";
import { JsonValue } from "@prisma/client/runtime/library";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  retryMode: "adaptive",
  maxAttempts: 3,
});
export async function GetDetailSession(id: string): Promise<
  | { msg: string }
  | {
      fileContent: string | undefined;
      answers:JsonValue[]
    }
> {
  const Bucket_Name = "revisly-test";
  let answers:JsonValue[] = [];
  const revisionSession = await prisma?.revisionSession.findFirst({
    where: {
      id: id,
    },
    select: {
      answer: true,
    },
  });
  console.log(revisionSession);
  if (!revisionSession) {
    return { msg: "Something went wrong" };
  }

  const res = await s3Client.send(
    new GetObjectCommand({
      Bucket: Bucket_Name,
      Key: `${id}/questions.json`,
    })
  );

  const fileContent = await res?.Body?.transformToString();
  const answer = revisionSession.answer;

  const isJsonObject = (value: any): value is Record<string, JsonValue> => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };
  
  if(isJsonObject(answer) && answer){
    Object.keys(answer).forEach(key=>{
        answers.push(answer[key])
    })
  }
  
//   console.log(fileContent);
console.log(answers)
  return {
    fileContent,
    answers
  };
}
