"use client";

import React from "react";

export default function ReportsAverageScoreByClassCard() {
  const data = [
    { className: "Class 6", val: 58.42, display: "58.42%" },
    { className: "Class 7", val: 62.31, display: "62.31%" },
    { className: "Class 8", val: 66.58, display: "66.58%" },
    { className: "Class 9", val: 64.72, display: "64.72%" },
    { className: "Class 10", val: 61.37, display: "61.37%" },
  ];

  const yTicks = [0, 20, 40, 60, 80, 100];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4 font-sans h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Average Score by Class
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
                  {`${tick}%`}
                </span>
                <div className="w-full h-px bg-slate-100" />
              </div>
            ))}
          </div>

          {/* Vertical Bars */}
          {data.map((item) => {
            const heightPercent = item.val;

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
                  className="w-full max-w-[44px] bg-purple-600 hover:bg-purple-700 rounded-t-xl transition-all duration-300 shadow-xs"
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
