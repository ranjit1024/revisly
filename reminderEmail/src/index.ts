import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import nodemailer from "nodemailer"
//
dotenv.config();
const redis = Redis.fromEnv();
//
interface reminderType {
  email: string;
  id: string;
  time: string;
  topic:string;
}
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
}
//
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  retryMode: "adaptive",
  maxAttempts: 3,
});
//
async function getQuizLInk(id: string) {
  const Bucket_Name = "ranjit-dev-test";
  const command = new GetObjectCommand({
    Bucket: Bucket_Name,
    Key: `${id}/index.html`,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
//mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
async function semdMail(to:string,subject:string,link:string) {
    try{
        const mail = await transporter.sendMail({
            from:process.env.EMAIL_PASS,
            to:to,
            subject:subject,
            html:`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Quiz is Ready!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🎯 Quiz Ready!</h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px; font-weight: bold;">Your ${subject} Quiz is Ready</h2>
                            
                            <p style="margin: 0 0 20px; color: #666666; font-size: 16px; line-height: 1.6;">
                                Great news! We've prepared a personalized quiz for you on <strong>${subject}</strong>. Test your knowledge and see how well you perform!
                            </p>
                            
                            <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #555555; font-size: 14px;">
                                    ✨ <strong>Quiz Features:</strong><br>
                                    • Interactive multiple-choice questions<br>
                                    • Instant feedback and scoring<br>
                                    • Progress tracking<br>
                                    • Personalized results
                                </p>
                            </div>
                            
                            <!-- Bulletproof Button -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto;">
                                <tr>
                                    <td style="text-align: center;">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#667eea">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Start Quiz Now</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-->
                                        <div style="background-color: #667eea; border-radius: 5px; display: inline-block;">
                                            <a href=${link} style="background-color: #667eea; border: 1px solid #667eea; border-radius: 5px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none; mso-hide: all;">Start Quiz Now</a>
                                        </div>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0 0; color: #888888; font-size: 14px; text-align: center; line-height: 1.5;">
                                The quiz will take approximately 10-15 minutes to complete.<br>
                                Good luck! 🍀
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                                This quiz was generated specifically for you. If you have any questions, please don't hesitate to reach out.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
        })
        console.log(mail)
    }

    catch(e){
        console.log(`cannot send ${e}`)
    }
}
async function main() {
  while (1) {
    try {
      const reminderData: reminderType | null = await redis.rpop(
        "reminderTime"
      );
      if (reminderData && reminderData.email !== "") {
        const link = await getQuizLInk(reminderData?.id);
        console.log(link)
        await semdMail(reminderData.email, reminderData.topic, link)
      } else {
        // console.log("not found");
      }
    } catch (e) {
      console.log(`something went wrong ${e}`);
    }
  }
}
main();
