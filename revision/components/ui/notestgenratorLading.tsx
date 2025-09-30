import animation from "../../public/scan document.json"
import Lottie from "lottie-react"
import React, { useState, useEffect } from 'react';

const NotesgeneratorLoader  = () => {

return ( <div className="min-h-screen fixed w-[79vw] z-40 top-0 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Animated icon */}
        <div className="relative w-40 h-40 mx-auto">
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          
          {/* Center icon */}
          

           <Lottie animationData={animation} loop={true}  />
          
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Generating your notes...
          </h2>
          <p className="text-gray-500 text-sm">This will only take a moment</p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center items-center space-x-1.5">
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
;

// Add this to your Tailwind config or global CSS


export default NotesgeneratorLoader;
