"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {Label} from "@/components/ui/label"
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
  const sessions = useSelector((data:RootState)=>{
    return data.revision.sessionIntervel
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
     
        <div className="w-full max-w-md mx-auto mt-2  ">
          <div className="space-y-6">
            {levels.map((level) => (
              <div className="relative ">
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
                className={`"flex relative pb-9  gap-10  border  border-b-0 px-3 pr-10  bg-white hover:cursor-pointer w-full py-3 rounded-md "} `}
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
                  <div className={` py-[0.5px] w-full right-0 p-2 bg-gray-500  w-fit px-5 rounded absolute bottom-0   justify-center flex text-sm font-medium ${level.color} ${level.bg}`}>{level.info}</div>
              </button>
                
              </div>
            ))}
          </div>
          {
            sessions === undefined ? null: <div 
            
             className=" pt-10 flex flex-col gap-4">
                       <Label>4. All sessions</Label>
            <p className="flex  rounded-2xl gap-3 flex-wrap">
            {sessions?.map((data,index)=>{
              return <div key={index} className="bg-indigo-200 font-medium text-sm text-gray-950 px-3  py-1.5 rounded-md">
                {`${data.split(" ")[2]} ${data.split(" ")[1]}`}
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
