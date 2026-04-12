"use client"

import Navbar from "../components/ui/header";
import TrustBadge from "../components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Dashboard from "../public/Dashborad.png";
import EvaluationDashboard from "@/components/ui/EvalutraionComp";
import { BulkEmailCard } from "@/components/ui/BulkEmail";
import PolicyAlignmentSelector from "@/components/ui/bestcandidate";
import StepTrackerWidget from "@/components/ui/steps";
import Fotter from "@/components/ui/fotter"

const cinematicEase = [0.22, 1, 0.36, 1]  as const;

// Animation variants for a professional fade-up
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: cinematicEase } 
  },
} as const ;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <div className="mb-38">
        <Navbar />
      </div>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6">
        <motion.div
          className="flex flex-col items-center w-full max-w-4xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <TrustBadge />
          </motion.div>

          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              Upload policies. Generate tests.
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-gray-800">
              Measure understanding.
            </h1>
          </motion.div>

          <motion.p className="mt-6 max-w-xl text-center text-gray-500 text-lg leading-relaxed" variants={itemVariants}>
            Turn your company policies into interactive assessments and gain clear insight into how well your team truly understands them.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <Button className="h-11 px-6 font-medium text-base rounded-full shadow-sm hover:shadow-md" size="lg">
              Get Started
            </Button>
            <Button className="h-11 px-6 font-medium text-base rounded-full" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 flex justify-center w-full max-w-5xl px-4 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: cinematicEase }}
        >
          <div className="mb-28 opacity-80">
            <Image src={Dashboard} width={900} height={120} alt="Dashboard"/>
          </div>
        </motion.div>
      </main>

      {/* Feature Header */}
      <motion.div 
        className="flex justify-center flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h1 className="text-5xl font-medium text-black mb-4" variants={itemVariants}>
          Measure real understanding
        </motion.h1>
        <motion.h1 className="max-w-lg text-gray-700 font-normal text-center" variants={itemVariants}>
          Stop tracking completion. Gain clear insight into who actually understands your policies and who doesn’t
        </motion.h1>
      </motion.div>

      {/* Components */}
      <motion.div 
        className="px-20 mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: cinematicEase }}
      >
        <EvaluationDashboard/>
      </motion.div>

      <motion.div 
        className="grid grid-cols-[60%_40%] px-22 pt-5 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}><PolicyAlignmentSelector/></motion.div>
        <motion.div variants={itemVariants}><BulkEmailCard/></motion.div>
      </motion.div>

      <motion.div 
        className="mt-15 px-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <StepTrackerWidget/>
      </motion.div>

      {/* CTA Section */}
      <motion.section 
        className="flex flex-col items-center justify-center px-4 py-20 mx-auto max-w-3xl border-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 className="mb-3 text-4xl font-semibold tracking-tight text-center text-black" variants={itemVariants}>
          Turn policies into assessments.
        </motion.h2>
        
        <motion.p className="max-w-xl mb-7 text-sm leading-relaxed text-center text-gray-500" variants={itemVariants}>
          Evaluate real understanding. Instead of relying on completion metrics, discover how well your candidates grasp what actually matters.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button className="px-6 py-2.5 text-sm font-medium transition-colors rounded-md shadow-sm h-10">
            Start Now
          </Button>
        </motion.div>
      </motion.section>

      <Fotter/>
    </div>
  );
}