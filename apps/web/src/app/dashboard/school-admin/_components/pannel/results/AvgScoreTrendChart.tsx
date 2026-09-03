"use client";

import { ChevronDown } from "lucide-react";

export function AvgScoreTrendChart() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-slate-900 text-body">Average Score Trend</h3>
          <p className="text-[10px] text-slate-400 font-medium">Percentage (%)</p>
        </div>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="relative w-full h-48">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
          {/* Background Grid Lines */}
          <line x1="40" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="50" x2="390" y2="50" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="80" x2="390" y2="80" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="110" x2="390" y2="110" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="140" x2="390" y2="140" stroke="#F1F5F9" strokeWidth="1" />

          {/* Y-Axis Labels */}
          <text x="5" y="24" className="text-[9px] fill-slate-400 font-medium">100</text>
          <text x="5" y="54" className="text-[9px] fill-slate-400 font-medium">80</text>
          <text x="5" y="84" className="text-[9px] fill-slate-400 font-medium">60</text>
          <text x="5" y="114" className="text-[9px] fill-slate-400 font-medium">40</text>

          {/* Orange Gradient Fill */}
          <defs>
            <linearGradient id="orangeGradientAvg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 50 76 L 110 70 L 170 65 L 230 58 L 290 52 L 350 44 L 350 140 L 50 140 Z"
            fill="url(#orangeGradientAvg)"
          />

          {/* Orange Line */}
          <path
            d="M 50 76 L 110 70 L 170 65 L 230 58 L 290 52 L 350 44"
            fill="none"
            stroke="#F97316"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Points with Value Labels */}
          {/* Point 1: 62.4% */}
          <circle cx="50" cy="76" r="4.5" fill="#FFFFFF" stroke="#F97316" strokeWidth="2.5" />
          <text x="50" y="66" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">62.4%</text>

          {/* Point 2: 65.1% */}
          <circle cx="110" cy="70" r="4.5" fill="#FFFFFF" stroke="#F97316" strokeWidth="2.5" />
          <text x="110" y="60" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">65.1%</text>

          {/* Point 3: 67.8% */}
          <circle cx="170" cy="65" r="4.5" fill="#FFFFFF" stroke="#F97316" strokeWidth="2.5" />
          <text x="170" y="55" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">67.8%</text>

          {/* Point 4: 71.2% */}
          <circle cx="230" cy="58" r="4.5" fill="#FFFFFF" stroke="#F97316" strokeWidth="2.5" />
          <text x="230" y="48" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">71.2%</text>

          {/* Point 5: 74.5% */}
          <circle cx="290" cy="52" r="4.5" fill="#FFFFFF" stroke="#F97316" strokeWidth="2.5" />
          <text x="290" y="42" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">74.5%</text>

          {/* Point 6: 78.6% */}
          <circle cx="350" cy="44" r="5" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
          <text x="350" y="32" textAnchor="middle" className="text-[10px] fill-orange-700 font-extrabold">78.6%</text>
        </svg>
      </div>

      {/* Footer Legend */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center space-x-1.5 text-caption font-semibold text-slate-500 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span>Average Score (%)</span>
        </div>
        <div className="flex items-center justify-between w-full text-[11px] font-medium text-slate-400 pl-6 pr-2">
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
