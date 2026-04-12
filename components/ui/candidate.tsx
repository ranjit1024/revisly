import React from 'react';
import { UserCheck, ShieldCheck, BookOpen, HeartHandshake, MonitorSmartphone } from 'lucide-react';

export const PolicyScoreCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      {/* Card Container */}
      <div className="relative w-full  bg-white border border-slate-100 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 overflow-hidden">
        
        {/* Top Graphic Section */}
        <div className="relative h-64 w-full flex items-center justify-center mb-6">
          
          {/* Circuit / Connection Lines (SVG) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full stroke-slate-200 fill-transparent">
              {/* Top Left */}
              <path d="M 100 100 L 70 100 L 40 70" strokeWidth="2" strokeLinejoin="round" />
              {/* Top Right */}
              <path d="M 100 100 L 130 100 L 160 70" strokeWidth="2" strokeLinejoin="round" />
              {/* Bottom Left */}
              <path d="M 100 100 L 70 100 L 40 130" strokeWidth="2" strokeLinejoin="round" />
              {/* Bottom Right */}
              <path d="M 100 100 L 130 100 L 160 130" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Central Node: Overall Score */}
          <div className="relative z-10 w-24 h-24 bg-white border-2 border-blue-50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] rounded-2xl flex flex-col items-center justify-center rotate-45 transition-transform hover:scale-105 duration-300">
            <div className="-rotate-45 flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900 tracking-tighter">94</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Score</span>
            </div>
          </div>

          {/* Satellite Nodes: Policy Categories */}
          {/* Top Left: Data Privacy */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm text-blue-600">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-500">Data Privacy</span>
          </div>

          {/* Top Right: Code of Conduct */}
          <div className="absolute top-4 right-4 z-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
              <BookOpen size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-500">Conduct</span>
          </div>

          {/* Bottom Left: IT Guidelines */}
          <div className="absolute bottom-4 left-4 z-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm text-amber-500">
              <MonitorSmartphone size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-500">IT Policy</span>
          </div>

          {/* Bottom Right: Workplace Safety */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm text-rose-500">
              <HeartHandshake size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-slate-500">Safety</span>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div className="text-center md:text-left space-y-3 mt-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
           
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Per Candidate Score </h2>
           
            </div>
          </div>
          
          <p className="text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
            Demonstrates a comprehensive understanding of core company guidelines. Excellent grasp of Data Privacy and Workplace Conduct, with minor review suggested for IT equipment protocols.
          </p>

          {/* Action Button */}
          
        </div>
      </div>
    </div>
  );
};
