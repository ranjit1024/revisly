"use client"

import Navbar from "./components/ui/header";
import TrustBadge from "./components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6">

        {/* Badge */}
        <div className="mb-6">
          <TrustBadge />
        </div>

        {/* Heading */}
        <motion.div
          className="max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          >
            Upload policies. Generate tests.
          </motion.h1>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          >
            Measure understanding
          </motion.h1>
        </motion.div>

        
        <motion.p
          className="mt-6 max-w-xl text-center text-gray-600 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
         Turn your company policies into interactive assessments and gain clear insight into how well your team truly understands them
        </motion.p>

        
        <motion.div
          className="mt-9 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          
              <button 
            
            className="group h-10 hover:cursor-pointer relative overflow-hidden bg-[#f75d11] text-white px-4  rounded-md text-sm font-semibold hover:bg-orange-500 shadow-xl shadow-gray-200"
          >
            Get Started
          </button>
          

          
              <button 
            
            className="group hover:cursor-pointer relative overflow-hidden bg-gray-100 hover:bg-[#f75d11] text-black border border-gray-200 px-6 py-2.5 rounded-md hover:text-white text-sm font-semibold   active:scale-95 shadow-xl shadow-gray-200"
          >
            <span className="relative z-10">Learn More</span>
            
          </button>
        </motion.div>

      </main>
    </div>
  );
}