"use server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: String(process.env.AWS_REGION),
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
  maxAttempts:5,
  retryMode:'adaptive'

})

export async function getNotes({ folderKey}:{
    folderKey:string
}) {
    try{
            const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: folderKey,
            
        });
        
        return getSignedUrl(s3, command);
    }
    catch(err){
        console.log(err)
    }
}