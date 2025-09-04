"use server"
import { getServerSession } from "next-auth";
import  prisma  from "../prisma";

import { authOption } from "@/lib/auth";
export interface userType {
    user:{
        name:string,
        email:string,
        image:string
    }
};

export default async function newUser(){
    const session : userType | null  = await getServerSession(authOption);
    console.log(session?.user.email)
    if(session){
        const existingUser = await prisma.user.findFirst({
            where:{
                email:session?.user.email
            }
        })
        if(existingUser){
            console.log("User exist")
            return "you are alredy loged in"
        }
        const createUser  = await prisma.user.create({
            data:{
                email:session?.user.email,
                name:session?.user.name,
                image:session?.user.image,
                createdAt:new Date()
            }
        })
        console.log(createUser)
    }
    console.log(session)
}