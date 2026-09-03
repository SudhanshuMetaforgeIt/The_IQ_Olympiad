"use client";

import { ChevronDown } from "lucide-react";

export function AvgScoreByExamDonutChart() {
  const examScores = [
    { name: "National Science Olympiad", score: "78.4%", color: "bg-emerald-500" },
    { name: "IMO Mathematics Olympiad", score: "76.2%", color: "bg-blue-600" },
    { name: "Cyber Olympiad", score: "79.6%", color: "bg-purple-600" },
    { name: "English Olympiad", score: "81.3%", color: "bg-orange-500" },
    { name: "AI Olympiad", score: "77.5%", color: "bg-cyan-500" },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-body">Average Score by Exam</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Donut & Legend Container */}
      <div className="flex items-center space-x-4 my-auto py-2">
        {/* SVG Multi-Segment Donut Chart */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
            <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="12" fill="transparent" />
            <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="50" />
            <circle cx="50" cy="50" r="38" stroke="#2563EB" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="100" />
            <circle cx="50" cy="50" r="38" stroke="#7C3AED" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="150" />
            <circle cx="50" cy="50" r="38" stroke="#F97316" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="190" />
            <circle cx="50" cy="50" r="38" stroke="#06B6D4" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="220" />
          </svg>

          {/* Center Callout Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold text-slate-900 leading-tight">78.6%</span>
            <span className="text-[9px] font-bold text-slate-400 max-w-[70px] leading-snug">Overall Average Score</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2 text-micro flex-1">
          {examScores.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 truncate max-w-[130px]">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                <span className="font-semibold text-slate-700 truncate">{item.name}</span>
              </div>
              <span className="font-extrabold text-slate-900 tabular-nums ml-1">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
