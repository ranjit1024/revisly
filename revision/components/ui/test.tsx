
"use client"
import React from 'react';
import {motion} from "framer-motion"
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  
};

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const Test = ({  }) => {
  return (
    <motion.div
    variants={cardVariant}
    className=" bg-white p-5 rounded-xl shadow-sm font-sans">
      <div className="flex justify-between items-center">
        
        {/* Left Section: Topic and Date */}
        <div>
          <div className="flex items-center">
            <span className="flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <h2 className="ml-3 text-base font-semibold text-gray-800">{"Coding"}</h2>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2 ml-1">
            <CalendarIcon />
            <p className="ml-2">{"12/2/2025 - 25/2/2025"}</p>
          </div>
        </div>

        {/* Right Section: Score and Report Link */}
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500">Score</p>
          <p className="text-2xl font-bold text-blue-600">
            {1}<span className="text-lg text-gray-400">/{10}</span>
          </p>
          <a
            href={"fsdf"}
            className="text-sm font-medium text-blue-600 hover:underline mt-1 block"
          >
            Full report
          </a>
        </div>
        
      </div>
    </motion.div>
  );
};

export default Test;