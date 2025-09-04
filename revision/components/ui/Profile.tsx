'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"
import User from "../../public/user.jpg"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { Button } from "./button"
import { signOut } from "next-auth/react"
export default function Profile(){
    const router = useRouter();
    const { data: session } = useSession()
    return <div className=" absolute bottom-20 w-[100%] rounded-xl shadow-2xl p-4   bg-accent">
        <div  className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-xl" onClick={()=>{
          router.push("/revisly/profile")
        }}>
            <Image
                    src={User}
                    width={35}
                    height={20}
                    alt="user"
                    className="rounded-full"
                  />
                  <p className="text-[1rem] font-medium text-gray-900 mt-1 ">{session?.user?.name}</p>
        </div>
    <Button className="w-[100%] mt-4 bg-red-600 hover:bg-red-700 hover:cursor-pointer" onClick={()=>{
        signOut({callbackUrl:"/"})
    }}>Sign out</Button>
    </div>
}