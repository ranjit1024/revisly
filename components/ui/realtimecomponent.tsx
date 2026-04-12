import React from 'react';
import { Mail, FileText, Database, FileSpreadsheet, Webhook } from 'lucide-react';

export const BulkEmailCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      {/* Card Container */}
      <div className="relative w-full  bg-white border border-slate-100 rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 overflow-hidden">
        
        {/* Top Graphic Section */}
        <div className="relative h-60 w-full mb-6">
          
          {/* Background Arc & Circuit Lines (SVG) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full z-0 overflow-visible">
            
            {/* Faint Background Arch */}
            <path 
              d="M 40 180 A 160 160 0 0 1 360 180" 
              stroke="#f1f5f9" 
              strokeWidth="2" 
              fill="none" 
            />

            {/* Connection Lines (Connecting exact center 200,160 to the % coordinates of the icons) */}
            <g stroke="#cbd5e1" strokeWidth="1.5" fill="none">
              {/* Line to CSV (X: 10% of 400 = 40, Y: 70% of 200 = 140) */}
              <path d="M 200 160 L 40 140" />
              
              {/* Line to XLSX (X: 25% of 400 = 100, Y: 25% of 200 = 50) */}
              <path d="M 200 160 L 100 50" />
              
              {/* Line to CRM (X: 75% of 400 = 300, Y: 25% of 200 = 50) */}
              <path d="M 200 160 L 300 50" />
              
              {/* Line to API (X: 90% of 400 = 360, Y: 70% of 200 = 140) */}
              <path d="M 200 160 L 360 140" />
            </g>

            {/* Accent dots matching your screenshot (placed along the lines near the hub) */}
            <g className="fill-orange-500">
              <circle cx="150" cy="154" r="2.5" />
              <circle cx="170" cy="127" r="2.5" />
              <circle cx="230" cy="127" r="2.5" />
              <circle cx="250" cy="154" r="2.5" />
            </g>
          </svg>
          </div>

          {/* Central Node: Email Engine */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
            <div className="w-20 h-20 bg-white border border-slate-100 shadow-xl shadow-orange-500/10 rounded-2xl flex flex-col items-center justify-center gap-1">
              <Mail className="text-orange-500" size={32} strokeWidth={2} />
              <span className="text-[9px] font-bold text-slate-800 uppercase tracking-wider">Send</span>
            </div>
          </div>

          {/* Satellite Nodes: Data Sources */}
          
          {/* Far Left: CSV */}
          <div className="absolute bottom-16 left-0 -translate-x-2 z-10 group">
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-lg rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <FileText className="text-emerald-500" size={20} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400">CSV</div>
          </div>

          {/* Top Left: Spreadsheets */}
          <div className="absolute top-4 left-10 z-10 group">
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-lg rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <FileSpreadsheet className="text-green-600" size={20} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400">XLSX</div>
          </div>

          {/* Top Right: Database */}
          <div className="absolute top-4 right-10 z-10 group">
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-lg rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <Database className="text-blue-500" size={20} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400">CRM</div>
          </div>

          {/* Far Right: API/Webhook */}
          <div className="absolute bottom-16 right-0 translate-x-2 z-10 group">
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-lg rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <Webhook className="text-indigo-500" size={20} strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400">API</div>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div className="text-left mt-8 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Bulk Email Import
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            Seamlessly import your contact lists from CSV files, external databases, and custom sources to launch massive campaigns in a single click.
          </p>
        </div>
      </div>
    </div>
  );
};
