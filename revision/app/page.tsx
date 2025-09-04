"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Logo from "../public/revisly.png";
import Image from "next/image";
import users from "../public/Group 1.png";
import second from "../public/info.png";
import Retation from "@/components/ui/LandginGraph";
import srs from "../public/space.png";
import Test from "@/components/ui/test";
import { Mail } from "lucide-react";
import { Clock, CalendarDays, PencilLine, Bell } from "lucide-react";
import side2 from "../public/side2.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const colorMap: Record<string, string> = {
  red: "bg-indigo-600/50",
  blue: "bg-blue-600/50",
  green: "bg-purple-600/50",
  yellow: "bg-yellow-600/50",
  // Add other colors as needed
};

export default function Home() {


  const [show, setShow] = useState<Boolean>(true);
  const [lastScrollY, setLastScollY] = useState<number>(0);
  useEffect(() => {
    const handelScrollY = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false); // Scrolling down — hide
      } else {
        setShow(true); // Scrolling up — show
      }
      setLastScollY(currentScrollY);
    };

    window.addEventListener("scroll", handelScrollY);
    return () => window.removeEventListener("scroll", handelScrollY);
  }, [lastScrollY]);

  const router = useRouter();
  function signInPage() {
    router.push("/auth/signin");
  }

  return (
    <div>
      <div className="px-15 max-md:px-5  py-4 bg-gray-50 h-[100%] ">
        <div className="bg-gradient-to-r  from-gray-50 max-md:w-[90vw]  ">
          <motion.header className="bg-white backdrop:backdrop-blur-3xl  w-[100%]">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: show ? 0 : -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex  fixed top-5 w-[91%] max-md:w-[90%]    z-10  items-center justify-between gap-2 rounded-full bg-white/50 px-4 py-2 shadow-blue-200 shadow backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <Image src={Logo} width={25} height={10} alt="logo"></Image>
                <p className="text-[1rem] font-semibold text-neutral-900">
                  Revisly
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  
                  onClick={signInPage}
                  className="bg-white text-primary hover:cursor-pointer hover:bg-white"
                >
                  Login
                </Button>
                <Button className="hover:cursor-pointer " onClick={signInPage}>
                  Join
                </Button>
              </div>
            </motion.div>
          </motion.header>

          <div className="grid grid-cols-2 pt-30 max-md:grid-cols-1 ">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <div>
                <p className="text-[3.5rem]  font-medium">
                  Revise scientifically.
                </p>
                <p className="text-[3.5rem] -mt-2 font-medium">
                  Remember longer{" "}
                </p>

                <p className="text-[3.5rem] -mt-2 font-medium">Master Time</p>
              </div>
              <div className="mt-5 w-[80%]">
                Automatic reminders are sent to your registered email and phone
                based on the date and time you set.
              </div>
              <div className="mt-12 flex items-center">
                <Button
                  onClick={signInPage}
                  className=" bg-accent-foreground hover:cursor-pointer"
                >
                  Get started
                </Button>
                <Button className="ml-3 bg-gray-50 flex items-center text-primary hover:cursor-pointer  hover:bg-white hover:shadow">
                  <Image
                    width="20"
                    height="48"
                    src="https://img.icons8.com/fluency/48/google-play.png"
                    alt="google-play"
                  />
                  Download app
                </Button>
              </div>
              <div className="mt-18">
                <div className="flex items-start gap-4">
                  <Image
                    src={users}
                    height={20}
                    quality={34}
                    width={100}
                    alt="user"
                    className="mt-3"
                  />
                  <div className="felx">
                    <p className="text-[2rem] font-light">Trusted by users</p>
                    <p className="text-sm w-[80%] ml-2 text-[0.9rem] font-normal  text-muted">
                      Revisly transforms how you study. Backed by science and
                      powered by an intelligent spaced repetition system.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="flex justify-end items-center relative w-full  h-[100%] "
            >
              <div>
                <Image
                  src={side2}
                  alt="Hero"
                  width={500}
                  height={800}
                  className="object-cover p-2 rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-25  flex">
          <div className="flex justify-center items-center flex-col">
            <p className="text-[2.2rem] font-normal">Revise, Review, Done</p>

            <div className="mt-7 bg-gray-200 rounded-xl p-4 w-[100%]">
              <div className="grid grid-cols-[70%_30%] max-md:grid-cols-1 gap-2">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="bg-white p-10 rounded-2xl shadow "
                >
                  <div>
                    <p className="text-center text-[1.6rem] font-medium">
                      With Revisly, every test you take is scored and analyzed{" "}
                    </p>
                    <p className="text-center text-[1.6rem] font-medium">
                      to guide your future improvements
                    </p>
                  </div>
                  <div className="flex justify-center mt-13 h-100 w-full relative">
                    <div className="absolute bottom-10  right-30 max-md:-right-2 rounded-full bg-indigo-600/20">
                      <Image
                        width="50"
                        height="64"
                        src="https://img.icons8.com/external-becris-lineal-color-becris/64/external-maths-data-science-becris-lineal-color-becris.png"
                        alt="external-maths-data-science-becris-lineal-color-becris"
                      />
                    </div>
                    <div className="absolute bottom-10 p-3 left-30 max-md:-left-4 rounded-full bg-lime-600/20">
                      <img
                        width="40"
                        height="64"
                        src="https://img.icons8.com/external-becris-lineal-color-becris/64/external-science-literary-genres-becris-lineal-color-becris.png"
                        alt="external-science-literary-genres-becris-lineal-color-becris"
                      />
                    </div>
                    <div className="absolute bg-purple-600/50 top-10 right-40 max-md:-right-2 rounded-full p-3">
                      <Image
                        width="40"
                        height="64"
                        src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-economics-university-courses-wanicon-lineal-color-wanicon.png"
                        alt="external-economics-university-courses-wanicon-lineal-color-wanicon"
                      />
                    </div>
                    <div className="absolute top-10 left-40 p-3 rounded-full max-md:-left-2 bg-accent/50">
                      <Image
                        width="40"
                        height="64"
                        src="https://img.icons8.com/external-becris-lineal-color-becris/64/external-history-literary-genres-becris-lineal-color-becris.png"
                        alt="external-history-literary-genres-becris-lineal-color-becris"
                      />
                    </div>
                    <Image src={second} height={10} width={270} alt="secon" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  className="bg-white p-5 rounded-2xl shadow "
                >
                  <div>
                    <p className="text-sm ml-1 font-medium mb-2">Revision 1</p>
                    <div className="w-[100%] h-100%">
                      <Retation />
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="font-medium text-xl">
                      Most Frequent subjects
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <Subjects prop="red" topic="Maths" precent="70" />
                    <Subjects prop="yellow" topic="Economics" precent="50" />
                    <Subjects prop="blue" topic="science" precent="60" />
                    <Subjects prop="green" topic="History" precent="40" />
                  </div>
                </motion.div>
              </div>

              <motion.div className="mt-4 flex justify-center gap-3 items-center max-md:flex-wrap">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white p-5 shadow w-[100%] rounded-xl"
                >
                  <p className="text-lg font-medium">
                    AI generated test/result{" "}
                  </p>
                  <div className="h-full mt-1 flex flex-col gap-3">
                    <Test />
                    <Test />
                  </div>
                  <p className="mt-5 text-md font-medium text-neutral-900">
                    set a time, and Revisly will handle the test and results for
                    you — no effort needed.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="bg-white p-5 shadow w-[100%]  rounded-xl  "
                >
                  <div className="h-fit">
                    <p className="text-lg font-medium">Email Reminder </p>
                    <div className="h-full mt-5 flex flex-col gap-1">
                      <EmailReminderCard />
                      <EmailReminderCard />
                    </div>
                    <p className="mt-4 font-medium text-neutral-900">
                      Revisly sends timely email reminders based on your
                      schedule, so you never miss a revision session.{" "}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-[3rem]  font-medium w-[60%] max-md:w-[90vw]">
            Revise smartly with Spaced repetition system{" "}
          </p>
          <div className="mt-5 grid grid-cols-[60%_40%] max-md:grid-cols-1 max-md:w-[94vw] ">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="w-[100%] max-md:w-[90vw] pr-15 max-md:mt-5 flex max-md:pr-4 "
            >
              <AccordionDemo />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="w-[100%] h-full max-md:hidden "
            >
              <Image
                src={srs}
                height={1000}
                width={1000}
                className="rounded-2xl shadow"
                alt="dsf"
              />
            </motion.div>
          </div>

          <div className="mt-20">
            <div className="p-10 bg-gray-200 rounded-xl max-md:grid-cols-1  grid grid-cols-[60%_40%] w-full items-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
              >
                <Image
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/settings--v1.png"
                  className="p-2 rounded-full bg-amber-400 animate-new duration-1000"
                  alt="settings--v1"
                />

                <p className="mt-9  font-medium text-[2.4rem] w-[80%] max-md:w-[80vw] ">
                  Set up custom revision sessions on your schedule.
                </p>

                <p className="mt-7 w-[80%] max-md:w-[100%] text-[1.1rem] font-medium text-gray-600">
                  With Revisly, you can create fully customized revision
                  sessions that align with your daily routine, helping you stay
                  consistent and retain more.
                </p>

                <Button
                  onClick={signInPage}
                  className="mt-10 hover:cursor-pointer"
                >
                  Explore Revisly
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                className="w-full  flex  justify-center items-center pt-10 "
              >
                <CustomRevisionSessionCard />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20">
        <footer className="w-full bg-white p-8">
          <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
            <Image src={Logo} height={100} width={50} alt="logo" />

            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
              <li>
                <a
                  onClick={() => {
                    router.push("/contact");
                  }}
                  className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm hover:cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <p className="block mb-4 text-sm text-center text-slate-500 md:mb-0 border-t border-slate-200 mt-4 pt-4">
            Copyright © 2024&nbsp;
            <a href="#" target="_blank" rel="noreferrer">
              Revisly
            </a>
            .
          </p>
        </footer>
      </footer>
    </div>
  );
}

function Subjects({
  prop,
  topic,
  precent,
}: {
  prop: string;
  topic: string;
  precent: string;
}) {
  const bgClass = colorMap[prop] || "bg-gray-100";
  return (
    <div className={`${bgClass} py-3 px-4 rounded-md flex justify-between`}>
      <p className="font-normal  text-gray-950">{topic}</p>
      <p className="text-bold font-medium">{precent}%</p>
    </div>
  );
}

function EmailReminderCard() {
  return (
    <div className="bg-white rounded-md shadow-xs p-6 flex items-start gap-4 mb-2 border border-gray-100 hover:shadow-md  duration-300">
      <div className="bg-blue-500/10 text-blue-600 p-3 rounded-xl">
        <Mail className="w-6 h-6" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-base font-semibold text-gray-900">
          Upcoming Email Reminder
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          We'll notify you at{" "}
          <span className="font-medium text-gray-800">5:00 PM</span> today to
          revise your topics.
        </p>
      </div>
    </div>
  );
}

function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-pointer text-md">
          What is Spaced repetition system{" "}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className="text-[1rem]">
            Spaced Repetition is a scientifically proven learning method that
            helps you remember information more effectively and for a longer
            time by reviewing it at increasing intervals.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="cursor-pointer text-md">
          How It Works
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div>
            <p className="text-[1rem]">
              Instead of cramming all at once, you review information just
              before you're about to forget it. The better you remember it, the
              less often you need to review it.
            </p>

            <SpacedRepetitionTable />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="cursor-pointer text-md">
          Why paced repetition system?{" "}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ol className="flex flex-col gap-3 text-[1rem] font-normal">
            <li className="flex items-center gap-2 text-primary">
              <span className="p-1  bg-blue-500/50 rounded-3xl "></span>Cuts
              down on wasted repetition
            </li>
            <li className="flex items-center gap-2 ">
              <span className="p-1  bg-blue-500/50 rounded-3xl "></span>Improves
              long-term memory
            </li>
            <li className="flex items-center gap-2">
              <span className="p-1  bg-blue-500/50 rounded-3xl "></span>Adapts
              to your performance: harder info gets reviewed more often, easier
              info less
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function SpacedRepetitionTable() {
  const schedule = [
    { day: "Day 1", activity: "Learn it" },
    { day: "Day 2", activity: "First Review" },
    { day: "Day 4", activity: "Second Review" },
    { day: "Day 7", activity: "Third Review" },
    { day: "Day 14", activity: "Final Review" },
  ];

  return (
    <div className="max-w-md mx-auto mt-6 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b text-center text-lg font-semibold text-gray-800">
        Spaced Repetition Schedule
      </div>
      <div className="divide-y divide-gray-200">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 "
          >
            <span className="font-medium text-gray-900">{item.day}</span>
            <span>{item.activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomRevisionSessionCard() {
  return (
    <div className=" mx-auto max-h-fit w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Custom Revision Session
        </h2>
        <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
          <PencilLine className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>5:00 PM – 5:30 PM</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Bell className="w-4 h-4 text-gray-500" />
          <span>Reminder Set</span>
        </div>
        <div className="text-sm text-gray-700 pl-7">
          Subject: <span className="font-medium">Mathematics</span>
        </div>
      </div>

      <button
        disabled
        className="w-full bg-ring  text-white py-2 rounded-xl text-sm font-medium "
      >
        Save Session
      </button>
    </div>
  );
}
