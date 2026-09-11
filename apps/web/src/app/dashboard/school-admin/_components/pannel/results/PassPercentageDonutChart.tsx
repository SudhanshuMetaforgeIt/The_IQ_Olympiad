"use client";

import { ChevronDown } from "lucide-react";
import { examPassRatesData } from "./mockData";

export function PassPercentageDonutChart() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Pass Percentage by Exam</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-700 py-2 pl-3.5 pr-8 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
        {/* SVG Donut Chart with Center Label */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="12" />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#10B981"
              strokeWidth="12"
              strokeDasharray="60 178.8"
              strokeDashoffset="0"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#6332ec"
              strokeWidth="12"
              strokeDasharray="50 188.8"
              strokeDashoffset="-63"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="12"
              strokeDasharray="45 193.8"
              strokeDashoffset="-116"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#EC4899"
              strokeWidth="12"
              strokeDasharray="40 198.8"
              strokeDashoffset="-164"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="12"
              strokeDasharray="35 203.8"
              strokeDashoffset="-207"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">87.6%</span>
            <span className="text-xs font-bold text-slate-500 mt-1">Overall Pass Rate</span>
          </div>
        </div>

        {/* Legend List on Right */}
        <div className="space-y-3 w-full">
          {examPassRatesData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 truncate pr-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate">{item.examName}</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-900 tabular-nums shrink-0">{item.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
