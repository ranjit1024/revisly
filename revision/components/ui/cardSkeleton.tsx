// components/Skeleton.tsx
"use client"
import React from "react";
import {motion} from "framer-motion"
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  
};
type Props = { className?: string };
export default function Skeleton({ className = "" }: Props) {
  return (
    <motion.div
           variants={cardVariant}
      transition={{
        
        ease:'anticipate'
      }}
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  );
}
