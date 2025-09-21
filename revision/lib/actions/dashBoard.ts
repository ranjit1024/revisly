"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
export async function getDashBaordData(){
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
export async function getRevisionSession(){
      const session = await getServerSession(authOption);
      
      const revisionSesion = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
            status:'COMPLETED'
        },
        orderBy:{
            reminderDate:'asc'
        }
      })
      return  revisionSesion;
}