"use client";

import { ChevronDown } from "lucide-react";

export function AppearedStudentsByClassChart() {
  const classData = [
    { className: "IX", count: 520, percent: 86 },
    { className: "VIII", count: 420, percent: 70 },
    { className: "VII", count: 340, percent: 56 },
    { className: "X", count: 300, percent: 50 },
    { className: "VI", count: 184, percent: 30 },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-body">Appeared Students by Class</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3.5 my-auto py-2">
        {classData.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-micro font-bold text-slate-700">
              <span>{item.className}</span>
              <span className="text-purple-700 font-extrabold tabular-nums">{item.count}</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6B46C1] h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* X-Axis Scale Labels */}
      <div className="pt-2 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center justify-between w-full text-[10px] font-medium text-slate-400">
          <span>0</span>
          <span>200</span>
          <span>400</span>
          <span>600</span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 mt-0.5">Students</span>
      </div>
    </div>
  );
}
