"use client";

import { examPassRatesData } from "./mockData";

export function PassPercentageDonutChart() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Title */}
      <h3 className="font-bold text-slate-900 text-body mb-2">Pass Percentage by Exam</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto">
        {/* SVG Donut Chart with Center Label */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background Circle */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="12" />

            {/* Segment 1: Science (Green) - 92.4% */}
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

            {/* Segment 2: Math (Purple) - 89.1% */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#6B46C1"
              strokeWidth="12"
              strokeDasharray="50 188.8"
              strokeDashoffset="-63"
            />

            {/* Segment 3: Cyber (Orange) - 85.3% */}
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

            {/* Segment 4: English (Pink) - 78.8% */}
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

            {/* Segment 5: AI (Cyan) - 90.2% */}
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
            <span className="text-h2 font-bold text-slate-900 leading-none">87.6%</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Overall Pass Rate</span>
          </div>
        </div>

        {/* Legend List on Right */}
        <div className="space-y-2.5 w-full text-caption">
          {examPassRatesData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate pr-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium truncate">{item.examName}</span>
              </div>
              <span className="font-bold text-slate-900 tabular-nums shrink-0">{item.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
