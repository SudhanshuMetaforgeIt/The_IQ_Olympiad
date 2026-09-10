"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ReportsPerformanceOverviewCard() {
  const [timeframe, setTimeframe] = useState("Daily");

  const dates = [
    "01 May", "02 May", "03 May", "04 May", "05 May", "06 May",
    "07 May", "08 May", "09 May", "10 May", "11 May", "12 May",
  ];

  // SVG Coordinates for smooth trends
  const studentsPath = "M 20 110 Q 70 80, 120 70 T 220 50 T 320 60 T 420 40 T 520 70 T 620 50";
  const testsPath = "M 20 180 Q 70 175, 120 160 T 220 170 T 320 140 T 420 160 T 520 175 T 620 155";
  const participationPath = "M 20 130 Q 70 120, 120 130 T 220 100 T 320 80 T 420 110 T 520 125 T 620 110";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Performance Overview
          </h3>
        </div>
        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 pr-7 focus:outline-none cursor-pointer"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-bold">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
          <span className="text-slate-600">Students</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span className="text-slate-600">Tests</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="text-slate-600">Participation (%)</span>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="relative w-full h-64 pt-2">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-semibold text-slate-400 pointer-events-none">
          <div className="border-b border-slate-100 pb-1">10K</div>
          <div className="border-b border-slate-100 pb-1">8K</div>
          <div className="border-b border-slate-100 pb-1">6K</div>
          <div className="border-b border-slate-100 pb-1">4K</div>
          <div className="border-b border-slate-100 pb-1">2K</div>
          <div className="border-b border-slate-100 pb-1">0</div>
        </div>

        {/* SVG Curve Overlay */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 640 220" preserveAspectRatio="none">
          {/* Grid background lines */}
          <line x1="0" y1="40" x2="640" y2="40" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="80" x2="640" y2="80" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="120" x2="640" y2="120" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="160" x2="640" y2="160" stroke="#f1f5f9" strokeWidth="1" />

          {/* Lines */}
          <path d={studentsPath} fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          <path d={testsPath} fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
          <path d={participationPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* X-Axis Date Labels */}
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
        {dates.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}
