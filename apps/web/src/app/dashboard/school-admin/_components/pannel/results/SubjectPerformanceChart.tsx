"use client";

import { ChevronDown } from "lucide-react";
import { subjectPerformanceData } from "./mockData";

export function SubjectPerformanceChart() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Subject Performance (Average %)</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-700 py-2 pl-3.5 pr-8 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>Class IX</option>
            <option>Class X</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Horizontal Progress Bars */}
      <div className="space-y-4 my-auto">
        {subjectPerformanceData.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-800">
              <span>{item.subject}</span>
              <span className="text-[#6332ec] font-black tabular-nums">{item.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6332ec] h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* X-Axis Scale Labels */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-3 border-t border-slate-100 mt-3">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </div>
    </div>
  );
}
