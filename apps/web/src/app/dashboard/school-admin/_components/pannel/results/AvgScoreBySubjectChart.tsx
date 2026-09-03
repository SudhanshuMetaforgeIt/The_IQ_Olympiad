"use client";

import { ChevronDown } from "lucide-react";

export function AvgScoreBySubjectChart() {
  const subjects = [
    { name: "Mathematics", score: "83.2%", percent: 83.2, barColor: "bg-purple-600", textColor: "text-purple-700" },
    { name: "Science", score: "80.6%", percent: 80.6, barColor: "bg-emerald-500", textColor: "text-emerald-600" },
    { name: "English", score: "76.8%", percent: 76.8, barColor: "bg-pink-500", textColor: "text-pink-600" },
    { name: "Logical Reasoning", score: "74.2%", percent: 74.2, barColor: "bg-amber-500", textColor: "text-amber-600" },
    { name: "Computer Science", score: "81.4%", percent: 81.4, barColor: "bg-cyan-500", textColor: "text-cyan-600" },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 text-body">Average Score by Subject</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Multi-colored Progress Bars */}
      <div className="space-y-3.5 my-auto py-2">
        {subjects.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-micro font-bold text-slate-700">
              <span>{item.name}</span>
              <span className={`${item.textColor} font-extrabold tabular-nums`}>{item.score}</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`${item.barColor} h-full rounded-full transition-all duration-500`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* X-Axis Scale Labels */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-400">
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
