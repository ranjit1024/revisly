"use client";
import { RevisionCard } from "@/components/ui/score";
import GetdetailSession from "@/lib/actions/getDetailsSession";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Skeleton from "@/components/ui/cardSkeleton";
type Status = "COMPLETED" | "PENDING" | "MISSED";
interface revisionDetails {
  id: string;
  email: string;
  topic: string;
  sessionNumber: number;
  score: number;
  revisionid: string;
  reminderDate: Date;
  status: Status;
}
export default function Page() {
  const [sessionDetails,setSessionDetails] = useState<revisionDetails[]| null>(null)
  const pathname = usePathname();
  const sessionid = pathname.split("/")[3];
  console.log(sessionid);
  useEffect(()=>{
    GetdetailSession(sessionid).then(data => setSessionDetails(data))
  },[])
  return (
    <div className="px-6 py-8 bg-white rounded-xl max-md:px-3 max-md:py-5 max-md:bg-gray-100">
      <h1 className="text-5xl font-semibold text-gray-900">{sessionDetails? sessionDetails[0].topic:null}</h1>
        
      <p className="text-md text-gray-400 mt-7">Revision / Upcoming revision</p>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-md: mb-15">
        {sessionDetails === null ? (
          <div className="h-[100vh]  grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[75vw] ">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          sessionDetails?.map((data, index) => {
            return (
              <RevisionCard
                id={data.id}
                key={index}
                title={`Session ${data.sessionNumber + 1}`}
                status={data.status}
                date={`${data.reminderDate}`}
                progressText={`${data.score}/10`}
                
              />
            );
          })
        )}
      </div> 
    </div>
  );
}
