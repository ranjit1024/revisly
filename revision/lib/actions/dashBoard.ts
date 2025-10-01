"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
export async function getFirst(){
    const session = await getServerSession(authOption) 
    const dashboardData = await prisma.revision.findFirst({
        where:{
            email:session?.user?.email || "",
            
        },
    })
   
    return dashboardData ;
}
export async function Frist(){
    const session = await getServerSession(authOption) 
    const dashboardData = await prisma.revision.findFirst({
        where:{
            email:session?.user?.email || "",
            status:'PENDING'
        },
        orderBy:{
            createdSession:'asc'
        }
    })
    return dashboardData;
}