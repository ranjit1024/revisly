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
     <div className="bg-white rounded-lg shadow-sm p-6 max-w-md animate-pulse">
        {/* Topic Badge Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-10 bg-gray-300 rounded w-20 mb-8"></div>

        {/* Progress Section Skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-12"></div>
        </div>

        {/* Progress Bar Skeleton */}
        <div className="h-1.5 bg-gray-200 rounded-full mb-6"></div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
  );
}
