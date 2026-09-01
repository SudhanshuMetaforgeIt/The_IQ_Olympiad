"use client";

import { ChevronDown } from "lucide-react";

export function MeritAppearedByClassChart() {
  const classData = [
    { className: "Class VI", count: 220, percent: "13.5%", barPercent: 44 },
    { className: "Class VII", count: 310, percent: "19.1%", barPercent: 62 },
    { className: "Class VIII", count: 390, percent: "24.0%", barPercent: 78 },
    { className: "Class IX", count: 360, percent: "22.1%", barPercent: 72 },
    { className: "Class X", count: 344, percent: "21.2%", barPercent: 68.8 },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-body">Appeared by Class</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Classes</option>
            <option>Class VI</option>
            <option>Class VII</option>
            <option>Class VIII</option>
            <option>Class IX</option>
            <option>Class X</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Purple Horizontal Progress Bars */}
      <div className="space-y-3.5 my-auto py-2">
        {classData.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-micro font-bold text-slate-700">
              <span>{item.className}</span>
              <span className="text-purple-700 font-extrabold tabular-nums">
                {item.count} <span className="text-[10px] text-slate-400 font-normal">({item.percent})</span>
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6B46C1] h-full rounded-full transition-all duration-500"
                style={{ width: `${item.barPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* X-Axis Scale Labels */}
      <div className="pt-2 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center justify-between w-full text-[10px] font-medium text-slate-400">
          <span>0</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>400</span>
          <span>500</span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 mt-0.5">No. of Students</span>
      </div>
    </div>
  );
}
