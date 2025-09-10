"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
export async function getDashBaordData(){
    const session = await getServerSession(authOption) 
    const dashboardData = await prisma.revision.findFirst({
        where:{
            email:session?.user?.email || ""
        },
      
    })
    return dashboardData;
}