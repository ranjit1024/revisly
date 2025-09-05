"use client"
import { ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"
interface ErrorToastProps {
  message?: string;
  visible: boolean;
  onClose?: () => void;
  duration?: number;
}
const ErrorToast = ({title, subtitle}: {
  title:string,
  subtitle:string
}) => {
  return (
    <motion.div
      key={"error"}

      initial={{
        x: 50,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        ease: "linear",
        duration: 1
      }}
      exit={{
        x: -20,
        opacity: 0
      }}
      className={`fixed  top-12 rounded-lg shadow z-100 min-w-[40%] flex gap-2 bg-linear-180 from-white to-white  flex-col py-2 right-2`}>
      <div className="flex gap-2 px-2  items-center-safe">

        <div className=" px-[5px] py-[4px] rounded-full bg-red-100/80">
          <ShieldAlert className="text-red-500" size={20} />
        </div>
        <p className="text-shadow-red-500 text-zinc-800 font-medium text-[16px] ">{title}</p>

      </div>
      <p className="pl-11 text-sm font-medium text-red-500">{subtitle}</p>
    </motion.div>
  );
};

export default ErrorToast;
