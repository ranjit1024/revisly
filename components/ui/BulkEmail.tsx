import React from 'react';
import { Mail, FileText, Database, FileSpreadsheet, Webhook } from 'lucide-react';

export const BulkEmailCard = () => {
    return (
        <div className="flex  w-full bg-neutral-100 rounded-md text-slate-900 shadow-sm overflow-hidden">
            {/* Card Container */}
            <div className="relative w-full  bg-white border border-slate-100 rounded-md p-8 py-11 shadow-2xl shadow-slate-200/50 overflow-hidden">

                {/* Top Graphic Section */}
                <div className="relative h-60 w-full mb-6">

                    {/* Background Arc & Circuit Lines (SVG) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                            <defs>
                                <filter id="orange-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
                                    <feMerge>
                                        <feMergeNode in="blur1" />
                                        <feMergeNode in="blur2" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <path
                                d="M 10 110 A 180 170 5 0 1 360 130"
                                stroke="#f1f5f9"
                                strokeWidth="2"
                                fill="none"
                            />

                            <g stroke="#cbd5e1" strokeWidth="1.5" fill="none">
                                <path d="M 40 140 L 200 160" />  <path d="M 80 30 L 180 140" />   <path d="M 300 50 L 200 160" />   <path d="M 360 140 L 200 160" />  </g>

                            <circle r="2.5" fill="#f97316" filter="url(#orange-glow)">
                                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 40 140 L 200 160" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="1.5s" repeatCount="indefinite" />
                            </circle>

                            <circle r="2.5" fill="#f97316" filter="url(#orange-glow)">
                                <animateMotion dur="2.2s" begin="0.5s" repeatCount="indefinite" path="M 100 50 L 200 160" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
                            </circle>

                            <circle r="2.5" fill="#f97316" filter="url(#orange-glow)">
                                <animateMotion dur="1.8s" begin="1.2s" repeatCount="indefinite" path="M 300 50 L 200 160" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
                            </circle>

                            <circle r="2.5" fill="#f97316" filter="url(#orange-glow)">
                                <animateMotion dur="1.2s" begin="0.2s" repeatCount="indefinite" path="M 360 140 L 200 160" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
                            </circle>

                            <circle r="2.5" fill="#f97316" filter="url(#orange-glow)">
                                <animateMotion dur="1.8s" begin="0.3s" repeatCount="indefinite" path="M 300 50 L 200 160" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
                            </circle>

                        </svg>

                    </div>

                    {/* Central Node: Email Engine */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                        <div className="w-15 h-17 bg-white border border-slate-100 shadow-xl shadow-orange-500/10 rounded-2xl flex flex-col items-center justify-center gap-1">
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
                    <div className="absolute top-6 right-15 z-10 group">
                        <div className="w-12 h-12 bg-white border border-slate-100 shadow-lg rounded-xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
                            <Database className="text-blue-500" size={20} strokeWidth={2.5} />
                        </div>
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400">CRM</div>
                    </div>

                    {/* Far Right: API/Webhook */}
                    <div className="absolute bottom-16 right-2 translate-x-2 z-10 group">
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
                    <p className="text-sm text-slate-500 leading-relaxed ">
                        Seamlessly import your contact lists from CSV files, external databases, and custom sources to launch massive campaigns in a single click.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BulkEmailCard;