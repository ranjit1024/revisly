"use client"
import { Plus } from "lucide-react"
import {TopicCard} from "@/components/ui/currnet_topic"
import ProjectsCard from "@/components/ui/indicator"
import ProjectList from "@/components/ui/list_of_project"
import { ChartBarDefault} from "@/components/ui/session_history"
import { useRouter } from "next/navigation"
export default function Home(){
  const router = useRouter();
  return <div className="p-5 bg-white rounded-sm">
    <div className="flex justify-between items-center">
      <div>
    <h1 className="text-5xl font-normal">Dashboard</h1>
    <h2 className="mt-3 text-sm text-gray-500 ml-1 ">Plan, prioritize, and accomplish your task with ease</h2>
      </div>
       <button 
      className="flex items-center gap-2 bg-gradient-to-t from-teal-500 to-gray-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:cursor-pointer transition-all duration-200 hover:shadow-md"
      onClick={() => router.push('/revisly/revision')}
    >
      <Plus className="w-4 h-4" />
      Add Session
    </button>
    </div>
    <div className="space-y-10">

 
    <div className="mt-10 ml-1 flex gap-3 justify-between w-full">
      <ProjectsCard main={true}/>
      <ProjectsCard/>
      <ProjectsCard/>
      
    </div>
    <div className="grid grid-cols-[50%_50%] gap-2 ">
    <ChartBarDefault/>
    <TopicCard/>
    </div>
    <ProjectList/>
</div>
  </div>
}