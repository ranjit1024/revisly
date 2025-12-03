"use client"
import { Plus } from "lucide-react"
import { TopicCard } from "@/components/ui/currnet_topic"
import ProjectsCard from "@/components/ui/indicator"
import ProjectList from "@/components/ui/list_of_project"
import { ChartBarDefault } from "@/components/ui/session_history"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { getuserData } from "@/lib/actions/dashBoard"
import DashboardLoader from "@/components/ui/dashBoardLoader"
import EmptySessionState from "@/components/ui/emptylist"

interface mainSessionType {
    topic:string;
    score: number | null;
}
interface sessionType {
    topic: string;
    status: "COMPLETED" | "PENDING" | "MISSED",
    reminderDate: Date;
}
export default function Home() {
  const [userData, setUserdata] = useState<[mainSessionType[],sessionType[]] | null>(null);
  const [indicatorData, setIndicatorData] = useState<{
    total:number|undefined;
    completed:number | undefined;
    missed:number | undefined;
    pending:number | undefined;
  }| null>(null);
  const [sessionScore, setSessionscore] = useState<{
    topic:string,
    score:number
  }[] | null>(null);

  useEffect(() => {
   getuserData().then(data => setUserdata(data));
  }, []);

  useEffect(()=>{
    if(!userData)
    {
      return;
    }
    console.log(userData)
    const total = userData[1].length;
    const completed = userData[1]?.filter(item => item.status === 'COMPLETED').length;
    const missed = userData[1]?.filter(item => item.status === 'MISSED').length;
    const pending = userData[1]?.filter(item => item.status === 'PENDING').length;
    setIndicatorData({total,completed,missed,pending })
  },[userData]);

 useEffect(()=>{
  if(!userData) return;
  
  const scores = userData[0].map(data => ({
    topic: data.topic, 
    score: data.score || 0
  }));
  
  setSessionscore(scores);
},[userData])
  const router = useRouter();
  if(userData === null) return <div className="h-100 max-md:flex justify-center items-center">
    <DashboardLoader/>
  </div>
   if(userData[0].length === 0 && userData[1].length ===0) return <EmptySessionState/>
  return <div className="p-5 bg-white rounded-sm max-md:p-2 max-md:pb-[15vh]">
    <div className="flex justify-between items-center">
      <div className="max-md:pl-1">
        <h1 className="text-5xl font-normal">Dashboard</h1>
        <h2 className="mt-3 text-sm text-gray-500 ml-1 ">Plan, prioritize, and accomplish your task with ease</h2>
      </div>
      <button
        className="flex max-md:hidden items-center gap-2 bg-gradient-to-t from-teal-500 to-gray-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:cursor-pointer transition-all duration-200 hover:shadow-md"
        onClick={() => router.push('/revisly/revision')}
      >
        <Plus className="w-4 h-4" />
        Add Session
      </button>
    </div>
    <div className="space-y-10">


      <div className="mt-10 ml-1 flex gap-3 justify-between w-full max-md:flex-wrap">
        <ProjectsCard main={true} title="Total Session" count={indicatorData?.total || 0} />
        <ProjectsCard title="Completed Session" count={indicatorData?.completed || 0} />
        <ProjectsCard title="Missed Session" count={indicatorData?.missed || 0} />
        <ProjectsCard title="Pending Session" count={indicatorData?.pending || 0} />
      </div>
      <div className="grid grid-cols-[50%_50%] gap-2 max-md:flex max-md:flex-wrap ">
        <ChartBarDefault revisionData={
          sessionScore
            } />
        <TopicCard />
      </div>
      <ProjectList projects={
      
        userData? userData[1] : []} />
    </div>
  </div>
}