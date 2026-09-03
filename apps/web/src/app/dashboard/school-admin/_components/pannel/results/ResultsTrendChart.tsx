"use client";

import { ChevronDown } from "lucide-react";

export function ResultsTrendChart() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-body">Results Trend</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
            <option>Cyber</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="relative w-full h-48">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
          {/* Background Grid Lines */}
          <line x1="30" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="30" y1="55" x2="390" y2="55" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="30" y1="90" x2="390" y2="90" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="30" y1="125" x2="390" y2="125" stroke="#F1F5F9" strokeWidth="1" />

          {/* Y-Axis Labels */}
          <text x="10" y="24" className="text-[10px] fill-slate-400 font-medium">100</text>
          <text x="10" y="59" className="text-[10px] fill-slate-400 font-medium">80</text>
          <text x="10" y="94" className="text-[10px] fill-slate-400 font-medium">60</text>
          <text x="10" y="129" className="text-[10px] fill-slate-400 font-medium">40</text>
          <text x="10" y="155" className="text-[10px] fill-slate-400 font-medium">0</text>

          {/* Gradient Fill under path */}
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 40 140 Q 65 120, 90 90 T 140 85 T 190 98 T 240 70 T 290 95 T 340 50 T 380 25 L 380 150 L 40 150 Z"
            fill="url(#purpleGradient)"
          />

          {/* Smooth Curved Trend Line */}
          <path
            d="M 40 140 Q 65 120, 90 90 T 140 85 T 190 98 T 240 70 T 290 95 T 340 50 T 380 25"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data Points */}
          <circle cx="40" cy="140" r="4" fill="#8B5CF6" />
          <circle cx="90" cy="90" r="4" fill="#8B5CF6" />
          <circle cx="140" cy="85" r="4" fill="#8B5CF6" />
          <circle cx="190" cy="98" r="4" fill="#8B5CF6" />
          <circle cx="240" cy="70" r="5" fill="#6B46C1" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="290" cy="95" r="4" fill="#8B5CF6" />
          <circle cx="340" cy="50" r="4" fill="#8B5CF6" />
          <circle cx="380" cy="25" r="4" fill="#8B5CF6" />
        </svg>

        {/* Floating Tooltip at Jul '25 Point */}
        <div className="absolute top-8 left-[52%] -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center space-x-1.5 text-[11px] font-bold text-slate-800 z-10 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#6B46C1]" />
          <span>Jul '25</span>
          <span className="text-slate-400 font-normal">| Results Published: 6</span>
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pl-8 pr-2 mt-2">
        <span>Apr '25</span>
        <span>May '25</span>
        <span>Jun '25</span>
        <span>Jul '25</span>
        <span>Aug '25</span>
        <span>Sep '25</span>
      </div>
    </div>
  );
}
