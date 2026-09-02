"use client";

import { ChevronDown } from "lucide-react";

export function QualifiedStudentsTrendChart() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-sans">Qualified Students Trend</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-700 py-2 pl-3.5 pr-8 rounded-full cursor-pointer focus:outline-none font-sans">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
            <option>Cyber</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="relative w-full h-48 my-auto">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible font-sans">
          {/* Background Grid Lines */}
          <line x1="40" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="50" x2="390" y2="50" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="80" x2="390" y2="80" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="110" x2="390" y2="110" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="140" x2="390" y2="140" stroke="#F1F5F9" strokeWidth="1" />

          {/* Y-Axis Labels */}
          <text x="5" y="24" className="text-[11px] fill-slate-500 font-bold font-sans">1,500</text>
          <text x="5" y="54" className="text-[11px] fill-slate-500 font-bold font-sans">1,150</text>
          <text x="5" y="84" className="text-[11px] fill-slate-500 font-bold font-sans">800</text>
          <text x="5" y="114" className="text-[11px] fill-slate-500 font-bold font-sans">450</text>
          <text x="5" y="144" className="text-[11px] fill-slate-500 font-bold font-sans">0</text>

          {/* Emerald Gradient Fill under path */}
          <defs>
            <linearGradient id="emeraldGradientQualified" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 50 120 L 110 95 L 170 78 L 230 82 L 290 55 L 350 28 L 350 140 L 50 140 Z"
            fill="url(#emeraldGradientQualified)"
          />

          {/* Smooth Curved Green Line */}
          <path
            d="M 50 120 L 110 95 L 170 78 L 230 82 L 290 55 L 350 28"
            fill="none"
            stroke="#10B981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Data Points with Data Labels */}
          <circle cx="50" cy="120" r="4.5" fill="#10B981" />
          <text x="50" y="110" textAnchor="middle" className="text-[11px] fill-slate-900 font-black font-sans">710</text>

          <circle cx="110" cy="95" r="4.5" fill="#10B981" />
          <text x="110" y="85" textAnchor="middle" className="text-[11px] fill-slate-900 font-black font-sans">920</text>

          <circle cx="170" cy="78" r="4.5" fill="#10B981" />
          <text x="170" y="68" textAnchor="middle" className="text-[11px] fill-slate-900 font-black font-sans">1,060</text>

          <circle cx="230" cy="82" r="4.5" fill="#10B981" />
          <text x="230" y="72" textAnchor="middle" className="text-[11px] fill-slate-900 font-black font-sans">1,030</text>

          <circle cx="290" cy="55" r="4.5" fill="#10B981" />
          <text x="290" y="45" textAnchor="middle" className="text-[11px] fill-slate-900 font-black font-sans">1,240</text>

          <circle cx="350" cy="28" r="5.5" fill="#047857" stroke="#FFFFFF" strokeWidth="2" />
          <text x="350" y="18" textAnchor="middle" className="text-[11px] fill-emerald-800 font-black font-sans">1,418</text>
        </svg>
      </div>

      {/* Legend and X-Axis */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col items-center space-y-2 font-sans">
        <div className="flex items-center space-x-2 text-xs sm:text-sm font-extrabold text-slate-800">
          <span className="w-3 h-3 rounded-full bg-emerald-600" />
          <span>Qualified Students</span>
        </div>
        <div className="flex items-center justify-between w-full text-xs font-bold text-slate-600 pl-6 pr-2">
          <span>Apr '25</span>
          <span>May '25</span>
          <span>Jun '25</span>
          <span>Jul '25</span>
          <span>Aug '25</span>
          <span>Sep '25</span>
        </div>
      </div>
    </div>
  );
}
