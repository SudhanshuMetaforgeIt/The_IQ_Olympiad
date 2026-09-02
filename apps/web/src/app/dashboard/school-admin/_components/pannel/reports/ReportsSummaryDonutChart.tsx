"use client";

import React, { useState } from "react";
import { DonutCategory } from "./types";

interface ReportsSummaryDonutChartProps {
  categories: DonutCategory[];
}

export const ReportsSummaryDonutChart: React.FC<ReportsSummaryDonutChartProps> = ({
  categories,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const totalReports = categories.reduce((sum, c) => sum + c.count, 0);

  const size = 260;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-2xs flex flex-col justify-start gap-5 h-full">
      {/* Title */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Reports Summary
        </h3>
      </div>

      {/* Side-by-Side Content: Extra Large Donut Left, Legend Right */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10 my-auto">
        {/* LEFT: Extra Large Donut Chart with Center Counter */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
            {/* Background Light Gray Ring Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {categories.map((cat, i) => {
              const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += cat.percentage;
              const isHovered = hoveredIdx === i;

              return (
                <circle
                  key={cat.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={isHovered ? strokeWidth + 5 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="transition-all duration-200 cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Center Counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {hoveredIdx !== null ? categories[hoveredIdx].count : totalReports}
            </span>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">
              {hoveredIdx !== null ? categories[hoveredIdx].name.split(" ")[0] : "Total Reports"}
            </span>
          </div>
        </div>

        {/* RIGHT: Legend List */}
        <div className="w-full space-y-4 flex-grow">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between transition-colors cursor-pointer rounded-xl px-3 py-2 ${hoveredIdx === i ? "bg-slate-50 font-bold" : "font-semibold"
                }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-slate-900 text-sm font-extrabold">{cat.name}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-500 text-sm">
                  {cat.count} ({cat.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
