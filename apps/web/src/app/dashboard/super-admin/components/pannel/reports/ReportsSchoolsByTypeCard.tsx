"use client";

import React from "react";
import { schoolsByTypeData } from "./mockData";

export default function ReportsSchoolsByTypeCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Schools by Type
        </h3>
      </div>

      {/* Donut Chart & Legend Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        {/* Donut Chart SVG */}
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#7c3aed"
              strokeWidth="16"
              strokeDasharray="125 200"
              strokeDashoffset="0"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#2563eb"
              strokeWidth="16"
              strokeDasharray="95 200"
              strokeDashoffset="-125"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#10b981"
              strokeWidth="16"
              strokeDasharray="19 200"
              strokeDashoffset="-220"
            />
          </svg>

          {/* Center Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-black text-slate-900 tracking-tight">
              1,248
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              Total Schools
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-4 w-full sm:w-auto flex-1">
          {schoolsByTypeData.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-between gap-4 text-xs font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 font-bold">{item.type}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-900 font-extrabold">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-slate-400 font-semibold ml-1.5">
                  ({item.percentage})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
