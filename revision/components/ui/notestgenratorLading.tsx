import { ReactNode } from "react"
import animation from "../../public/notes-animation.json"
import Lottie from "lottie-react"
import { Button } from "./button"
export default function NotesgeneratorLoader():ReactNode{
    return <div className="overflow-hidden">
    <div className="fixed top-1  w-[79vw] h-full  bg-gray-500  items-center  bg-linear-150 from-gray-50 from-65% to-gray-100/80 z-30">
   
      <div className="flex flex-col justify-center items-center h-[90vh]">
      <Lottie animationData={animation} loop={true} size={100} className="size-80 absolute" />
      <p className="mt-56 text-lg text-gray-900 mask font-normal ">Hang tight—we’re getting your notes ready</p>

</div>
    </div>
    </div>
}