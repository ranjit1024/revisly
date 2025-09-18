
import React, { useState } from 'react';

const QuizSkeleton: React.FC = () => {
  return (
    <div className=" mx-auto p-6 bg-white mb-3 rounded-2xl shadow-sm ">
      {/* Header with number badge */}
    

      
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-blue-100 text-white rounded-full flex items-center justify-center text-sm font-medium">
          
        </div>
      </div>

      {/* Main content area */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left column */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/3"></div>
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/3"></div>
          <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Grid of options */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
