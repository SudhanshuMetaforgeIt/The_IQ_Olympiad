"use client";

import React, { useState } from "react";
import { DonutCategory } from "./types";

interface QualificationRateDonutChartProps {
  categories: DonutCategory[];
}

export const QualificationRateDonutChart: React.FC<QualificationRateDonutChartProps> = ({
  categories,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const size = 260;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100/90 shadow-2xs flex flex-col justify-start gap-4 h-full">
      <div>
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Qualification Rate by Exam
        </h3>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Percentage of students qualified
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 my-auto">
        <div className="relative w-56 h-56 sm:w-60 sm:h-60 flex-shrink-0 flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
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

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
              87.31%
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
              Overall Qualification
            </span>
          </div>
        </div>

        <div className="w-full space-y-3 flex-grow">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between transition-colors cursor-pointer rounded-xl px-2.5 py-1 ${
                hoveredIdx === i ? "bg-slate-50 font-bold" : "font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-slate-800 text-xs sm:text-sm font-bold">{cat.name}</span>
              </div>
              <div className="text-right">
                <span className="font-black text-slate-900 text-xs sm:text-sm">
                  {cat.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
