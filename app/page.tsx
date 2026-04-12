"use client"

import Navbar from "../components/ui/header";
import TrustBadge from "../components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Dashboard from "../public/Dashborad.png";
import EvaluationDashboard from "@/components/ui/EvalutraionComp";
import { BulkEmailCard } from "@/components/ui/BulkEmail";
import PolicyAlignmentSelector from "@/components/ui/bestcandidate";
import StepTrackerWidget from "@/components/ui/steps";
import Fotter from "@/components/ui/fotter"

const cinematicEase = [0.22, 1, 0.36, 1] as const;


const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: cinematicEase },
  },
};

const PolicyHero = () => {
  // Animation variants for staggered children
  const containerVars = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* Navbar */}
      <div className="mb-38">
        <Navbar />
      </div>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6">
        
        {/* Animated Container */}
        <motion.div
          className="flex flex-col items-center w-full max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2, // Wider gap between elements appearing
                delayChildren: 0.3,   // Longer initial pause
              },
            },
          }}
        >
          {/* Badge */}
          <motion.div className="mb-8" variants={itemVariants}>
            <TrustBadge />
          </motion.div>

          {/* Headings */}
          <motion.div className="flex flex-col gap-2">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
              variants={itemVariants}
            >
              Upload policies. Generate tests.
            </motion.h1>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-gray-800"
              variants={itemVariants}
            >
              Measure understanding.
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-xl text-center text-gray-500 text-lg leading-relaxed"
            variants={itemVariants}
          >
            Turn your company policies into interactive assessments and gain clear insight into how well your team truly understands them.
          </motion.p>

          {/* Buttons */}
          <motion.div className="mt-10 flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <Button className="h-11 px-6 font-medium text-base rounded-full shadow-sm hover:shadow-md" size="lg">
              Get Started
              
            </Button>
            <Button className="h-11 px-6 font-medium text-base rounded-full" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Image Reveal & Float */}
        <motion.div
          className="mt-20 flex justify-center w-full max-w-5xl px-4 relative perspective-[1000px]"
          // Starts further down, slightly smaller, with a heavy blur
          initial={{ opacity: 0, y: 80, scale: 0.98, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 2.2, // Very slow, dramatic reveal
            delay: 0.8,    // Waits for the text to establish itself
            ease: cinematicEase,
          }}
        >
          {/* Ultra-slow, subtle breathing animation */}
          
        </motion.div>
        <div className="mb-28 opacity-80">
          <Image src={Dashboard} width={900} height={120} alt="DAshbarod"/>
        </div>
      </main>
      <div className="flex justify-center  flex-col items-center " >
        <h1 className="text-5xl font-medium text-black mb-4">Measure real understanding</h1>
        <h1 className="max-w-lg text-gray-700 font-normal text-center">Stop tracking completion. Gain clear insight into who actually understands your policies and who doesn’t</h1>
      </div>
      <div className="px-20  mt-10">

        <EvaluationDashboard/>
      </div>
      <div className="grid grid-cols-[60%_40%] px-22 pt-5 gap-4  ">
        <PolicyAlignmentSelector/>

        <BulkEmailCard/>
        
      </div>
      <div className="mt-15 px-20">
            
             <StepTrackerWidget/>
      </div>
      <section className="flex flex-col items-center justify-center px-4  mx-auto max-w-3xl  border-gray-100">
  <h2 className="mb-3 text-4xl font-semibold tracking-tight text-center text-black md:text-4xl">
    Turn policies into assessments.
  </h2>
  
  <p className="max-w-xl mb-7 text-sm leading-relaxed text-center text-gray-500">
    Evaluate real understanding. Instead of relying on completion metrics, discover how well your candidates grasp what actually matters.
  </p>
  
  {/* Consider making this an outline button or a softer color if it's still too loud */}
  <Button className="px-6 py-2.5 text-sm font-medium transition-colors rounded-md shadow-sm h-10">
    Start Now
  </Button>
</section>
<Fotter/>
    </div>
  );
}