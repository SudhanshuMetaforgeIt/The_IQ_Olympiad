"use client";

import React from "react";

export default function ReportsStudentsByClassTop6Card() {
  const data = [
    { className: "Class 6", count: 4852, display: "4,852" },
    { className: "Class 7", count: 7845, display: "7,845" },
    { className: "Class 8", count: 8963, display: "8,963" },
    { className: "Class 9", count: 7210, display: "7,210" },
    { className: "Class 10", count: 6347, display: "6,347" },
    { className: "Class 11", count: 4102, display: "4,102" },
  ];

  const maxVal = 10000;
  const yTicks = [0, 2000, 4000, 6000, 8000, 10000];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4 font-sans h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
          <span>Students by Class</span>
          <span className="text-purple-600 font-bold text-xs">(Top 6)</span>
        </h3>
      </div>

      {/* Bar Chart Area */}
      <div className="relative pt-6 pb-2">
        <div className="flex items-end h-56 space-x-3 sm:space-x-4 pl-10 pr-2 relative">
          {/* Y-Axis Guidelines & Labels */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2">
            {yTicks.slice().reverse().map((tick) => (
              <div key={tick} className="flex items-center space-x-2 w-full">
                <span className="text-[10px] font-bold text-slate-400 w-8 text-right shrink-0">
                  {tick === 0 ? "0" : `${tick / 1000}K`}
                </span>
                <div className="w-full h-px bg-slate-100" />
              </div>
            ))}
          </div>

          {/* Vertical Bars */}
          {data.map((item) => {
            const heightPercent = (item.count / maxVal) * 100;

            return (
              <div
                key={item.className}
                className="flex-1 flex flex-col items-center justify-end h-full relative z-10 group"
              >
                {/* Count value label on top of bar */}
                <span className="text-[11px] font-extrabold text-slate-900 mb-1.5 transition-transform group-hover:scale-110">
                  {item.display}
                </span>

                {/* Rounded Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[42px] bg-purple-600 hover:bg-purple-700 rounded-t-xl transition-all duration-300 shadow-xs"
                />

                {/* Class Label */}
                <span className="text-[11px] font-extrabold text-slate-800 mt-2.5 whitespace-nowrap">
                  {item.className}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
