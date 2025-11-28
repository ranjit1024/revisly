// components/loaders/dashboard-loader.tsx
import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoader() {
  return (
    <div className="flex h-screen w-full bg-white dark:bg-neutral-950">
      {/* Sidebar Skeleton - Hidden on mobile */}
      <div className="hidden w-64 flex-col border-r border-neutral-200 p-6 dark:border-neutral-800 md:flex">
        <div className="mb-10 flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg" /> {/* Logo placeholder */}
          <Skeleton className="h-6 w-24" /> {/* App Name */}
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </div>
        <div className="mt-auto">
            <Skeleton className="h-10 w-full rounded-md" /> {/* User Profile */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 px-6 dark:border-neutral-800">
          <Skeleton className="h-6 w-32" /> {/* Page Title */}
          <div className="flex gap-3">
             <Skeleton className="h-9 w-9 rounded-full" />
             <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          
          {/* Welcome & Stats Row */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                   <div className="flex justify-between mb-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-4" />
                   </div>
                   <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Decks / Study Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <Skeleton className="h-7 w-32" />
               <Skeleton className="h-9 w-24 rounded-full" />
            </div>
            
            {/* Staggered Animation Container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="mt-2 h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-4 flex items-center gap-2">
                     <Skeleton className="h-6 w-16 rounded-full" />
                     <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
