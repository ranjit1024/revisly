// lib/auth.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: process.env.DATABASE_URL as string,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});