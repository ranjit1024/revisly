import React from 'react';
import { Plus } from 'lucide-react';
const CreateFirstRevisionSession = () => {
  return (
    <div className="min-h-screen bg-white flex rounded-md items-center justify-center relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-blue-50/30"></div>

      {/* Minimal floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-pulse delay-2000"></div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Simple icon */}
        <div className="mb-12 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        {/* Clean typography */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 tracking-tight leading-tight">
          Create First
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-8 tracking-tight leading-tight">
          Revision Session
        </h1>

        {/* Minimal subtitle */}
        <p className="text-lg text-gray-500 mb-12 font-light max-w-md mx-auto">
          Begin your learning journey with focus and clarity
        </p>

        {/* Clean CTA */}
      <button className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/25">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Create First Session
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
        </button>

        {/* Minimal feature indicators */}
        <div className="mt-20 flex justify-center space-x-12">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">QUICK</p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">SMART</p>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">SIMPLE</p>
          </div>
        </div>
      </div>

      {/* Minimal bottom decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateFirstRevisionSession;