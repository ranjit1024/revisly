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
} from "lucide-react";
import { useSession } from "next-auth/react";
import Profile from "@/components/ui/Profile";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Notification from "@/components/ui/notification";
import Loader from "@/components/ui/loader";

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
        <motion.div
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className=" bg-white z-400 border-b-gray-200 border-b-1 grid grid-cols-[20%_80%] fixed w-full"
        >
          <div className="hover:cursor-pointer border-r-1 border-r-gray-100 p-2 max-md:border-none ">
            <div
              onClick={() => {
                router.push("/revisly/home");
              }}
              className="flex items-center gap-2 max-md:ml-2"
            >
              <Image src={logo} height={50} width={25} alt="logo"/>
              <p className="font-semibold text-[1.2rem]  text-input/90">
                Revisly
              </p>
            </div>
          </div>
          <div className=" max-md:hidden flex px-3 justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
                <BookOpen size={18} />
              </div>
              <div className="leading-tight">
                <p className="text-sm text-zinc-500">Hello</p>
                <p className="font-semibold">{session.user?.name}</p>
              </div>
            </div>

            <div className="flex gap-3 items-center  ">
              <div className="inline-flex ">
                <button
                  className="inline-flex  hover:cursor-pointer items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-xm hover:bg-zinc-50 active:shadow-none"
                  onClick={() => {
                    router.push("/revisly/revision");
                  }}
                >
                  <PlusCircle size={16} />
                  Set Revision
                </button>
              </div>

              <div className="bg-gradient-to-r to-purple-50 from-fuchsia-100 border-1 border-pink-50  hover:border-pink-100  px-3 py-[5px] flex rounded-lg gap-3 hover:cursor-pointer ">
                <img
                  width="20"
                  height="50"
                  src="https://img.icons8.com/parakeet-line/50/coins--v2.png"
                  alt="coins--v2"
                />
                <p className="text-sm font-bold text-gray-700">0</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="h-[100%] w-[100%] relative   grid grid-cols-[20%_80%]">
          <div className="mt-2 max-md:hidden">
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
              className=" bg-white    h-[100vh] w-[20%]   left-0 fixed z-2  border-r-1  border-gray-200/90   "
            >
              <div
                className=" p-4  pt-15 space-y-1  
        
        "
              >
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
                  className="mb-1"
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

          <div className="p-3 max-md:p-0 w-[99%] pt-15 h-[100%] max-md:w-[100vw] max-md:mt-14 ">{children}</div>
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