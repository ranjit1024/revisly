import {ChevronRight} from "lucide-react"
import { useState } from "react"
export function CurretnTopicCard(){
    const [topic,setTopic] = useState<null>(null)
    if(topic === null){
        return <CurretnTopicCardLoader/>
    }
     return <div className="bg-white p-5 shadow rounded-2xl" >
            <div className="flex items-start justify-between ">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Current Revision Topic
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">
                  
                  {topic}
                </h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                Active
              </span>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="absolute inset-y-0 left-0 w-[86%] rounded-r-full bg-emerald-500" />
              </div>
              <p className="mt-3 text-sm text-zinc-600">
                You’re{" "}
                <span className="font-semibold text-emerald-700">
                  ahead of pace
                </span>{" "}
                and should reach your goal{" "}
                <span className="font-semibold">ahead</span> of schedule.
              </p>
            </div>

            <div className="mt-4">
              <button className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800">
                View plan
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
}
export function CurretnTopicCardLoader(){
 return <div className="bg-white rounded-lg border border-gray-200 p-4  animate-pulse">
      {/* Header with topic status */}
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-5 bg-gray-200 rounded-full w-12 px-2 py-1"></div>
      </div>
      
      {/* Topic title */}
      <div className="h-6 bg-gray-200 rounded w-16 mb-4"></div>
      
      {/* Progress bar */}
      <div className="h-2 bg-gray-200 rounded-full mb-3"></div>
      
      {/* Progress text */}
      <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>
      
      {/* View plan button */}
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
}