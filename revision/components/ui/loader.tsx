import { ReactNode } from "react"
import animation from "../../public/Animation.json"
import Lottie from "lottie-react"
export default function Loader():ReactNode{
    return <div className=" absolute w-[100%] h-[100vh] flex justify-center items-center bg-indigo-200/40">
      <Lottie animationData={animation} loop={true} className="size-80"  />
    </div>
}