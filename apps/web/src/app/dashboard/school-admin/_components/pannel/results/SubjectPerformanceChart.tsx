"use client";

import { ChevronDown } from "lucide-react";
import { subjectPerformanceData } from "./mockData";

export function SubjectPerformanceChart() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-900 text-body">Subject Performance (Average %)</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>Class IX</option>
            <option>Class X</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Horizontal Progress Bars */}
      <div className="space-y-3.5 my-auto">
        {subjectPerformanceData.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-caption font-medium">
              <span className="text-slate-700">{item.subject}</span>
              <span className="font-bold text-slate-900 tabular-nums">{item.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#6B46C1] h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* X-Axis Scale Labels */}
      <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 pt-2 border-t border-slate-100 mt-2">
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
