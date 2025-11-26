"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import newUser from "@/lib/actions/newUser";
import { usePathname } from "next/navigation";
import logo from '../../public/revisly.png'
import {
  BookOpen,
  CalendarCheck,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  PlusCircle,
  MessageCircle,
  HomeIcon,
  BookOpenCheck,
  BadgeInfo,
  Plus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Profile from "@/components/ui/Profile";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Loader from "@/components/ui/loader";
import ProfileIcon from "@/components/ui/Mprofile";

export default function Home({ children }: { children: ReactNode }) {
  let pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<boolean>(false);
  const drpodownRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/auth/signin");
    }
  }, [router, session, status]);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        drpodownRef.current &&
        !drpodownRef.current?.contains(e.target as Node)
      ) {
        setProfile(false);
      }
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    newUser().then((data) => console.log(data));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current?.contains(e.target as Node)
      ) {
        setNotification(false);
      }
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (status === "loading") return <Loader />;
  if (!session) return null;
  return (
    <Provider store={store}>
      <div className="h-[100%] relative bg-gray-100  ">
       
        {/* mobile header */}
           <header className="bg-gray-100 py-2 border-b md:hidden border-gray-200/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-1 group cursor-pointer select-none">
          <Image src={logo} height={25} width={27} alt="logo"/>
            
            <h1 className="text-[18px] font-[550] text-gray-900 tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
              Revisly
            </h1>
          </div>

          {/* User Profile */}
          {/* <button 
            className="w-9 h-9 rounded hover:bg-gray-200 flex items-center justify-center transition-all duration-300 group bg-gray-100 "
            aria-label="User profile"
          >
            
           <Image src={session?.user?.image || ""} height={40} width={30} alt="profile" className="rounded-full"/>
            
          </button> */}
          <ProfileIcon/>
        </div>
      </div>
    </header>
        {/* //done */}
        <div className="h-[100vh] w-[100%] relative  grid grid-cols-[20%_80%]  ">
          <div className="max-md:hidden">

          
            <motion.div
              initial={{
                x: -20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
              }}
              className=" bg-white flex p-2 gap-10    h-[100vh] w-[20%] max-md:hidden  left-0 fixed z-2  border-r-1  border-gray-200/90   "
            >
                 
              
              <div
                className=" p-2 pt-2   space-y-1  
        
        "
              >

                   
              <div
              onClick={() => {
                router.push("/revisly/home");
              }}
              className="flex items-center gap-2  max-md:ml-0 px-1 py-4 pl-2"
            >
              <Image src={logo} height={80} width={26} alt="logo"/>
              <p className="text-xl font-semibold text-gray-900">
                Revisly
              </p>
            </div>
                <motion.div
                  className="mb-3"
                  initial={{
                    x: -25,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  onClick={() => {
                    router.push("/revisly/home");
                  }}
                >
                  <div className=""></div>
                  <NavItem
                    icon={<LayoutDashboard size={16} />}
                    label="Dashboard"
                    active={pathname.includes("home") ? true : false}
                  />
                </motion.div>

                <motion.div
                  className="mb-3"
                  initial={{
                    x: -25,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.6,
                  }}
                  onClick={() => {
                    router.push("/revisly/all");
                  }}
                >
                  <NavItem
                    icon={<CalendarCheck size={16} />}
                    label="All Revision sessions"
                    active={pathname.includes("all") ? true : false}
                  />
                </motion.div>
                <motion.div
                  initial={{
                    x: -25,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1,
                  }}
                  onClick={() => {
                    router.push("/revisly/custom");
                  }}
                  className=""
                >
                  <NavItem
                    icon={<Gauge size={16} />}
                    label="Set custom Revision"
                    active={pathname.includes("custom") ? true : false}
                  />
                </motion.div>

                <motion.div
                  initial={{
                    x: -25,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.25,
                  }}
                  className="mt-4 border-t border-zinc-100"
                  onClick={() => {
                    router.push("/contact");
                  }}
                >
                  <NavItem icon={<HelpCircle size={16} />} label="Help" />
                </motion.div>
                <motion.div
                  initial={{
                    x: -25,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.25,
                  }}
                  className=" border-zinc-100"
                  onClick={() => {
                    router.push("/feedback");
                  }}
                >
                  <NavItem
                    icon={<MessageCircle size={16} />}
                    label="feedback and suggestions"
                  />
                </motion.div>

                <div
                  className={`flex items-end hover:cursor-pointer relative   `}
                >
                  <motion.div
                    ref={drpodownRef}
                    initial={{
                      y: 25,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 1.3,
                    }}
                    className="flex items-center w-[18%] fixed bottom-3  gap-3 hover:bg-primary/10 rounded-md hover:cursor-pointer py-2 px-1"
                    onClick={() => {
                      setProfile((prev) => !prev);
                    }}
                  >
                    {profile ? <Profile></Profile> : null}
                    <div>
                      <Image
                        src={String(session.user?.image)}
                        width={35}
                        height={20}
                        alt="user"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-md text-neutral-800 font-medium">
                        {session.user?.name}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-3 max-md:p-0 w-[100%]  h-[100%] max-md:w-[100vw]  max-md:mt-1   ">{children}</div>
        </div>
      </div>
        <div className="fixed bottom-0 md:hidden p-1 rounded-tr-lg rounded-tl-lg bg-black text-white w-[100%] grid grid-cols-[42.5%_15%_42.5%]">
          <div className="flex w-full gap-2 justify-around">

          <button onClick={()=>{
            router.push('/revisly/home')
          }} className="hover:cursor-pointer gap-1 flex flex-col items-center p-3 hover:bg-white/10 rounded-2xl font-thin">
          <HomeIcon className={`${pathname.includes("home")?'stroke-[2]':"stroke-[1.2] active:stroke-[2]"}`}/>
          <p className="text-xs font-normal">Home</p>
          </button>
          <button onClick={()=>[
            router.push('/revisly/all')
          ]} className={`'hover:cursor-pointer p-3 flex flex-col items-center gap-1  rounded-2xl active:font-semibold font-thin stroke-[2]`}>
          <CalendarCheck className={` ${pathname.includes("all")?"text-xs   size-[1.4rem]   font-thin stroke-[2] text-gray-100":"text-xs stroke-[1.2]  size-[1.4rem]   font-thin active:stroke-3 text-gray-100"} `}/>
          <p className="text-xs font-normal">sessions</p>
          </button>
          </div>

          <div className="flex  justify-center items-center relative w-[100%] " onClick={()=>{
            router.push('/revisly/revision')
          }}>
            <div className="bg-gray-100 rounded-full border-4 border-black absolute -top-4 text-gray-900 p-2 re">
            <Plus className="size-8"></Plus>
            </div>
          </div>
          
           <div className="flex w-full gap-2 justify-around">

           <button onClick={()=>{
            router.push("/revisly/custom")
           }} className="hover:cursor-pointer p-3 flex flex-col items-center gap-1  rounded-2xl active:font-semibold font-thin">
          < BookOpenCheck className="text-xs stroke-[1.2]  size-[1.4rem]   font-thin active:stroke-3 text-gray-100"/>
          <p className="text-xs font-normal">Custom</p>
          </button>
           <button onClick={()=>{
            router.push('/contact')
           }} className="hover:cursor-pointer p-3 flex flex-col items-center gap-1  rounded-2xl active:font-semibold font-thin">
          <BadgeInfo className="text-xs stroke-[1.2]  size-[1.4rem]   font-thin active:stroke-3 text-gray-100"/>
          <p className="text-xs font-normal">Feedback</p>
          </button>
         
          </div>
          
          
        </div>
    </Provider>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.button
      className={[
        "w-full rounded-xl px-3 py-2 text-left text-sm font-medium",
        "flex items-center gap-2 transition-discrete duration-300  ease-out ",
        active
          ? "bg-zinc-900 text-white shadow-sm"
          : "text-zinc-700 hover:bg-zinc-100 hover:cursor-pointer hover:text-zinc-950",
      ].join(" ")}
    >
      <span className={active ? "text-white" : "text-zinc-500"}>{icon}</span>
      {label}
    </motion.button>
  );
}