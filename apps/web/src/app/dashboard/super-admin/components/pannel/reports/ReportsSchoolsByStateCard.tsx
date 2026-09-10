"use client";

import React from "react";
import { schoolsByStateData } from "./mockData";

export default function ReportsSchoolsByStateCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Schools by State
        </h3>
      </div>

      {/* Progress Rows */}
      <div className="space-y-4 py-1">
        {schoolsByStateData.map((item) => {
          const barWidthPercent = (item.count / 400) * 100;
          return (
            <div key={item.state} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="w-28 truncate font-bold">{item.state}</span>
                <div className="flex-1 px-3">
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${barWidthPercent}%` }}
                    />
                  </div>
                </div>
                <span className="text-slate-500 font-medium text-[11px] min-w-[80px] text-right">
                  {item.count} ({item.percentage})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* X-Axis Scale */}
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100 px-28">
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>400</span>
      </div>
    </div>
  );
}
