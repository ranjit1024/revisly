"use client"
import React from 'react';

const ProjectsCard = ({main, title, count}:{main?:boolean,title:string,count:number}) => {
  return (
    <div className={`${main? 'w-full h-fit bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-6 text-white shadow': 'w-full  bg-gradient-to-br rounded-2xl p-6 text-gray-900  border'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
        
      </div>

      {/* Main Number */}
      <div className="text-6xl font-bold mb-4">{count}</div>

      {/* Footer Badge */}
      <div className="inline-flex items-end w-full gap-1.5 justify-start  rounded-full  ">
        <div className="w-4 h-4 bg-teal-400 rounded-sm flex items-center justify-center  ">
          <svg 
            className="w-3 h-3 text-emerald-900 " 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span className="text-xs opacity-90 text-start">Study goals on track </span>
      </div>
    </div>
  );
};

export default ProjectsCard;
