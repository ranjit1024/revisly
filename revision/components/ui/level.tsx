"use client"
import { useDispatch, UseDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { actions } from "@/store/slices/revison";
import { BookOpen, Check, CornerRightDown, RadioIcon, Sparkle, TicketCheck, Zap } from "lucide-react";
export default function Chip() {
  const [easy, setisEasy] = useState<boolean | null>(false);
  const [medium, setisMedium] = useState<boolean | null>(false);
  const [hard, setisHard] = useState<boolean | null>(false);
  const dispatch = useDispatch();
  return <div className="flex  gap-2 ">
    <div className="relative ">
     
      <div className={` ${hard?" bg-gradient-to-tr hover:cursor-pointer to-rose-100 from-white flex  gap-5 border-2 relative border-b-0 px-3 pr-10 z-1  py-3 rounded-xl":"flex  gap-5 border-2 relative border-b-0 px-3 pr-10 z-1 bg-white hover:cursor-pointer  py-3 rounded-xl"} `}
        onClick={() => {
          setisHard(true);
          setisEasy(false);
          setisMedium(false);
          dispatch(actions.addDifficulty({
            difficulty: "hard"
          }))
        }}
      >
        <div className="flex justify-start items-center">
          <div className="p-2  bg-red-100 rounded-2xl flex justify-center">
            <BookOpen className="text-red-600" size={18} />
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="font-semibold text-sm text-slate-900">New Concept</p>
          <p className="text-xs text-slate-500 mt-0.5">I need to learn this from scratch</p>

        </div>
      </div>
      <div className={`bg-red-100 border-2 shadow-red-500 h-10 flex -bottom-5 justify-center items-end  w-full rounded-md  absolute`}>

        <p className="text-red-600/70 font-medium text-xs">Every Day</p>
      </div>

    </div>

    <div className="relative">


       <div className={` ${medium?" bg-gradient-to-tr hover:cursor-pointer to-amber-100 from-white flex  gap-5 border-2 relative border-b-0 px-3 pr-10 z-1  py-3 rounded-xl":"flex  gap-5 border-2 relative border-b-0 px-3 pr-10 z-1 bg-white hover:cursor-pointer  py-3 rounded-xl"} `}
        onClick={() => {
          setisMedium(true);
          setisEasy(false);
          setisHard(false);
          dispatch(actions.addDifficulty({
            difficulty: "medium"
          }))
        }}
      >
        <div className="flex justify-start items-center">


          <div className="p-2 bg-yellow-100 rounded-2xl flex justify-center">
            <Zap className="text-yellow-600" size={18} />
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="font-semibold text-sm text-slate-900">Familiar</p>
          <p className="text-xs text-slate-500 mt-0.5">I know the basics, but need practice</p>

        </div>

      </div>
      <div className="bg-yellow-100 border-1 z-0  shadow-red-500 h-10 flex -bottom-5 justify-center items-end  w-full rounded-md   absolute">

        <p className="text-yellow-600/70 font-medium text-xs">Trice a Week</p>
      </div>
    </div>

    <div className="relative">


       <div className={` ${easy?" bg-gradient-to-tr hover:cursor-pointer to--100 from-white flex  gap-5 border-2 relative border-b-0 px-3 pr-10 z-1  py-3 rounded-xl":"flex  gap-5 border-2 relative border-b-0 px-3 pr-10 z-1 bg-white hover:cursor-pointer  py-3 rounded-xl"} `}
        onClick={() => {
          setisMedium(false);
          setisHard(false)
          setisEasy(true);
          dispatch(actions.addDifficulty({
            difficulty: 'easy'
          }))
        }}
      >
        <div className="flex justify-start items-center">


          <div className="p-2 bg-green-100 rounded-2xl flex justify-center">
            <Check className="text-green-600" size={18} />
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="font-semibold text-sm text-slate-900">
            Expert</p>
          <p className="text-xs text-slate-500 mt-0.5">Just keep it fresh in my memory</p>
        </div>

      </div>
      <div className="bg-green-100 border-1 z-0  shadow-red-500 h-10 flex -bottom-5 justify-center items-end  w-full rounded-md   absolute">

        <p className="text-green-600/70 font-medium text-xs">Once a week</p>
      </div>
    </div>
  </div>
}