"use clinet"

import {TopicCard} from "@/components/ui/currnet_topic"
import ProjectsCard from "@/components/ui/indicator"
import ProjectList from "@/components/ui/list_of_project"
import { ChartBarDefault} from "@/components/ui/session_history"
export default function Home(){
  return <div className="p-5 bg-white rounded-sm">
    <h1 className="text-5xl font-normal">Dashboard</h1>
    <h2 className="mt-3 text-sm text-gray-500 ml-1 ">Plan, prioritize, and accomplish your task with ease</h2>
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