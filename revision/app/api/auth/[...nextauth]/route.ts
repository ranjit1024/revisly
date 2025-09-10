"use server"
import NextAuth from "next-auth";
import {authOption} from "@/lib/auth"; // adjust path as needed

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
