"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("@upstash/redis");
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const nodemailer_1 = __importDefault(require("nodemailer"));
//
dotenv_1.default.config();
const redis = redis_1.Redis.fromEnv();
//
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    retryMode: "adaptive",
    maxAttempts: 3,
});
//
function getQuizLInk(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const Bucket_Name = "ranjit-dev-test";
        const command = new client_s3_1.GetObjectCommand({
            Bucket: Bucket_Name,
            Key: `${id}/index.html`,
        });
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
            expiresIn: 600
        });
        return url;
    });
}
//mail
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
function semdMail(to, subject, link) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mail = yield transporter.sendMail({
                from: process.env.EMAIL_PASS,
                to: to,
                subject: subject,
                html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Quiz is Ready!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 50px 40px 30px; text-align: center; background-color: #ffffff; border-radius: 12px 12px 0 0;">
                            <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
                            <h1 style="margin: 0; color: #1f2937; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Quiz Ready!</h1>
                            <p style="margin: 12px 0 0; color: #6b7280; font-size: 16px;">Time to test your knowledge</p>
                        </td>
                    </tr>
                    
                    <!-- Time Warning Banner -->
                    <tr>
                        <td style="padding: 0;">
                            <div style="padding: 16px; text-align: center; background-color: #fef2f2; border-top: 1px solid #fecaca; border-bottom: 1px solid #fecaca;">
                                <div style="font-size: 14px; font-weight: 600; color: #dc2626;">
                                    <span style="font-size: 16px;">⏰</span>
                                    Link expires in 10 minutes - Start now!
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 50px 40px; background-color: #ffffff;">
                            <h2 style="margin: 0 0 24px; color: #111827; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">Your ${subject} Quiz Awaits</h2>
                            
                            <p style="margin: 0 0 32px; color: #4b5563; font-size: 18px; line-height: 1.6;">
                                We've crafted a personalized quiz just for you! Challenge yourself with questions tailored to <strong style="color: #374151;">${subject}</strong> and discover what you've mastered.
                            </p>
                            
                            <!-- Features Card -->
                            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin: 32px 0;">
                                <h3 style="margin: 0 0 16px; color: #374151; font-size: 18px; font-weight: 600;">
                                    <span style="color: #6b7280; font-size: 20px;">✨</span>
                                    What's Inside
                                </h3>
                                <div style="color: #6b7280; font-size: 15px; line-height: 1.8;">
                                    <div style="margin-bottom: 8px;"><span style="color: #374151; font-weight: 500;">•</span> Interactive multiple-choice questions</div>
                                    <div style="margin-bottom: 8px;"><span style="color: #374151; font-weight: 500;">•</span> Instant feedback and detailed explanations</div>
                                    <div style="margin-bottom: 8px;"><span style="color: #374151; font-weight: 500;">•</span> Real-time progress tracking</div>
                                    <div><span style="color: #374151; font-weight: 500;">•</span> Comprehensive performance analytics</div>
                                </div>
                            </div>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 40px auto 32px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:56px;v-text-anchor:middle;width:240px;" arcsize="14%" stroke="f" fillcolor="#374151">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">🚀 Start Quiz Now</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-->
                                        <div style="background-color: #374151; border-radius: 6px; display: inline-block; border: 1px solid #374151;">
                                            <a href="${link}" style="background: transparent; border: none; border-radius: 6px; color: #ffffff; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 56px; text-align: center; text-decoration: none; width: 240px; -webkit-text-size-adjust: none;">
                                                🚀 Start Quiz Now
                                            </a>
                                        </div>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Time and Duration Info -->
                            <div style="text-align: center; padding: 24px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 15px; font-weight: 500; line-height: 1.5;">
                                    ⏱️ <strong>Duration:</strong> 10-15 minutes<br>
                                    🎯 <strong>Reminder:</strong> Link expires in 10 minutes
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0; color: #9ca3af; font-size: 14px; text-align: center; line-height: 1.6;">
                                Ready to challenge yourself? Your personalized quiz experience awaits! 🌟
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
                            <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center; line-height: 1.5;">
                                This quiz was generated specifically for you using advanced AI.<br>
                                Questions? We're here to help! 💬
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
            });
            console.log(mail);
        }
        catch (e) {
            console.log(`cannot send ${e}`);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (1) {
            try {
                const reminderData = yield redis.rpop("reminderTime");
                if (reminderData && reminderData.email !== "") {
                    const link = yield getQuizLInk(reminderData === null || reminderData === void 0 ? void 0 : reminderData.id);
                    console.log(link);
                    yield semdMail(reminderData.email, reminderData.topic, link);
                }
                else {
                    // console.log("not found");
                }
            }
            catch (e) {
                console.log(`something went wrong ${e}`);
            }
        }
    });
}
main();
