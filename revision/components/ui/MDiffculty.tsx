"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

import { MSelectDay } from "./MSelect";
import { useDispatch } from "react-redux";
import { actions } from "@/store/slices/revison";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Hard } from "./hard";
import { BookOpen, Check, Sparkle, Zap, type LucideIcon } from "lucide-react";
export function MDifficluty() {
   const selectDays = useSelector((data:RootState)=>{
    return data.revision.days
  })
  const [selected, setSelected] = useState("");
  const [opne,setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  interface LevelOption {
  id: string;
  label: string;
  subtitle: string;
  icon: LucideIcon; 
  color: string;
  bg:string;
  info:string
}
  const levels: LevelOption[] = [
    { id: "hard", label: "New Concept", subtitle: "I need to learn this from scratch",icon:BookOpen, color:"text-red-500", bg:"bg-red-100", info:"Every Day"},
   {id:"medium", label:"Familiar", subtitle:"I know the basics, but need practice", icon:Zap, color:"text-yellow-500", bg:"bg-yellow-100", info:"Trice a Week" },
   {id:"easy", label:"Expert", subtitle:"Just keep it fresh in my memory", icon:Check, color:"text-green-500", bg:"bg-green-100",info:"Once a week" }
   
  ];
  return (
    <AlertDialog open={opne} onOpenChange={setOpen}>
     
        <div className="w-full max-w-md mx-auto mt-2 ">
          <div className="space-y-10">
            {levels.map((level) => (
              <div className="relative z-10">
              <button
                key={level.id}
                onClick={() => {
                    setSelected(level.id);
                    if(level.id !== "hard"){
                        setOpen(true)
                    }
                    dispatch(actions.addDifficulty({
                      // @ts-ignore
                      difficulty: level.id
                    }))
                }}
                className={`"flex   gap-10 rounded-2xl border-2  border-b-0 px-3 pr-10  bg-white hover:cursor-pointer w-85 py-3 rounded-xl"} `}
              >
                <div className="flex    gap-4 items-center min-w-[100%]">
                  <div className={`p-2 ${level.bg} rounded-2xl`}>
                   <level.icon className={`${level.color}`} size={18}/>
                  </div>
                  <div className="flex flex-col justify-start  ">
                    
                  <p
                    className={`
                      font-semibold text-sm  text-slate-900
                      ${selected === level.id ? "text-amber-900 text-start" : "text-gray-900 text-start"}
                      `}
                      >
                    {level.label}
                  </p>
                  <p
                    className={`
                      text-sm text-start
                      ${selected === level.id}`}
                      >
                    {level.subtitle}
                  </p>
                  </div>
                </div>
              </button>
                <div className={`h-10 w-full  justify-center rounded-xl top-12 flex items-end absolute -z-1 p text-sm font-medium ${level.color} ${level.bg}`}>{level.info}</div>
                  
              </div>
            ))}
          </div>
          {
            selectDays === undefined ? null: <div 
            
             className="px-2 pt-15 flex flex-col gap-2">
             <label
        className="block text-sm  font-medium text-zinc-700 text-start "
        htmlFor="session-duration"
      >
        Seleted Days
      </label>
            <p className="flex  rounded-2xl gap-1 flex-wrap">
            {selectDays?.map((data,index)=>{
              return <div key={index} className="bg-accent font-medium text-sm text-gray-950 px-4 py-1 rounded-md">
                {data}
              </div>
            })}
            </p>
          </div>
}
        </div>
        
            
       {
        selected === "hard" ? <Hard/>:null
       }
      <AlertDialogContent>
        <AlertDialogTitle>Select revision days.</AlertDialogTitle>
        <MSelectDay Limit={selected === "medium" ? 3 : 1} />
        
        <AlertDialogFooter>
           <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
