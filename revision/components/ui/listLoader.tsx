// ListLoader.jsx
import React from 'react';

const ListLoader = ({ items = 10 }) => {
  const skeletonItems = Array(items).fill(0);
  
  return (
    <div role="status" className="w-[78vw] max-md:w-[100vw] h-[100vh] p-4 space-y-4 border  border-gray-200 divide-y divide-gray-200 rounded-lg shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex items-center justify-between pt-4 first:pt-0">
          <div className="flex items-center space-x-4">
            {/* Avatar skeleton */}
            <div className="h-10 w-10 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            
            {/* Text content skeleton */}
            <div className="space-y-2">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            </div>
          </div>
          
          {/* Right side element */}
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ListLoader;
