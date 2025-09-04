"use client"
import { useSession } from "next-auth/react";
import User from "../../../public/user.jpg"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {AlertDialogDemo} from "@/components/ui/deletePermently";
export default function Home(){
    const { data: session } = useSession();
    return <div className="px-15 py-10 bg-white rounded-2xl">
    
        <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
     <Image src={User} height={200} width={70} className="rounded-full" alt="Profile"/>
                
     <h1 className="text-[2.5rem] text-gray-800 font-medium">{session?.user?.name}</h1>
            </div>
            <div>
                <div className="bg-gradient-to-r to-indigo-100 from-purple-50 flex items-center rounded-md gap-3 px-3 py-[2px] border border-indigo-50">
                        <img
                width="20"
                height="50"
                src="https://img.icons8.com/parakeet-line/50/coins--v2.png"
                alt="coins--v2"
              />
              <p className="text-gray-600 font-semibold">1</p>
                </div>
            </div>
        </div>
        <div className="mt-10">
        <Label className="mb-1 ml-1">Email</Label>
        <Input disabled value={String(session?.user?.email)}/>
      

        </div>
        <div className="mt-">
       
       <p className="text-accent-foreground text-sm mt-5 px-3 py-1 bg-gradient-to-l to-gray-100 from-gray-50 w-fit rounded-md">Total Session: <span className="text-gray-800 font-semibold ">5</span></p>
      

        </div>
        <div className="text-start mt-5">
       <AlertDialogDemo/>
        </div>
    </div>
}