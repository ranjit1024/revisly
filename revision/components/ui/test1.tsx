import React from 'react';

const CreateFirstRevisionSessionSophisticated = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
             backgroundSize: '32px 32px'
           }}>
      </div>

      <div className="relative z-10 text-center max-w-xl mx-auto px-8">
        {/* Elegant icon */}
        <div className="mb-16">
          <div className="w-12 h-12 mx-auto">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-800">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 1v6m0 8v6m11-7h-6m-8 0H1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        {/* Refined typography */}
        <div className="space-y-2 mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
            Create First
          </h1>
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight">
            Revision Session
          </h2>
        </div>

        {/* Elegant subtitle */}
        <p className="text-gray-500 font-light text-lg mb-16 leading-relaxed">
          Transform your learning with structured revision
        </p>

        {/* Sophisticated button */}
        <div className="space-y-4">
          <button className="group relative px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            <span className="relative z-10">Start Session</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="text-xs text-gray-400 font-light tracking-wide">
            No setup required
          </div>
        </div>
      </div>

      {/* Minimal footer element */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-px bg-gray-300"></div>
      </div>
    </div>
  );
};

export default CreateFirstRevisionSessionSophisticated;