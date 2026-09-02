"use client";

import React, { useState } from "react";
import {
  TIME_SERIES_PERFORMANCE,
  SUBJECT_AVERAGES,
} from "./mockResultsData";

export function StudentAnalyticsCard() {
  const [activeHoverPoint, setActiveHoverPoint] = useState<number | null>(null);

  // SVG Chart Coordinate System
  const chartWidth = 420;
  const chartHeight = 170;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 30;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const pointsCount = TIME_SERIES_PERFORMANCE.length;
  const getX = (index: number) => paddingLeft + (index / (pointsCount - 1)) * innerWidth;
  const getY = (val: number) => paddingTop + innerHeight - (val / 100) * innerHeight;

  // Build SVG Line & Area Paths
  const percentagePoints = TIME_SERIES_PERFORMANCE.map((p, i) => ({ x: getX(i), y: getY(p.percentage) }));
  const rankPoints = TIME_SERIES_PERFORMANCE.map((p, i) => ({ x: getX(i), y: getY(p.nationalRankPercent) }));

  const percentageLinePath = percentagePoints.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
    ""
  );

  const percentageAreaPath = `${percentageLinePath} L ${percentagePoints[percentagePoints.length - 1].x} ${paddingTop + innerHeight} L ${percentagePoints[0].x} ${paddingTop + innerHeight} Z`;

  const rankLinePath = rankPoints.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
    ""
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
      {/* Card Title Header */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" x2="18" y1="20" y2="10" />
            <line x1="12" x2="12" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="14" />
            <path d="M4 20h16" />
          </svg>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
            Student Analytics
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Your performance insights and progress over time.
          </p>
        </div>
      </div>

      {/* 2 Equal Columns: Performance Over Time & Subject-wise Average */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Sub-Widget 1: Performance Over Time */}
        <div className="bg-[#FAF8FF]/60 border border-violet-100/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            {/* Title & Legend below title matching mockup */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Performance Over Time
              </h4>
              <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 mt-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-violet-600"></span>
                  Percentage
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-blue-500"></span>
                  National Rank
                </span>
              </div>
            </div>

            {/* SVG Line Graph */}
            <div className="w-full relative">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 overflow-visible"
              >
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines & Y-axis labels */}
                {[100, 75, 50, 25].map((val) => {
                  const y = getY(val);
                  return (
                    <g key={val}>
                      <line
                        x1={paddingLeft}
                        x2={chartWidth - paddingRight}
                        y1={y}
                        y2={y}
                        stroke="#E2E8F0"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 3.5}
                        textAnchor="end"
                        className="text-[10px] fill-slate-400 font-semibold"
                      >
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* Bottom Base Axis Line */}
                <line
                  x1={paddingLeft}
                  x2={chartWidth - paddingRight}
                  y1={paddingTop + innerHeight}
                  y2={paddingTop + innerHeight}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />

                {/* X Axis Month Labels */}
                {TIME_SERIES_PERFORMANCE.map((point, index) => {
                  const x = getX(index);
                  return (
                    <text
                      key={point.month}
                      x={x}
                      y={chartHeight - 8}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-500 font-bold"
                    >
                      {point.month}
                    </text>
                  );
                })}

                {/* Area Gradient Under Percentage Line */}
                <path d={percentageAreaPath} fill="url(#purpleGradient)" />

                {/* Percentage Line (Purple) */}
                <path
                  d={percentageLinePath}
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Rank Line (Blue) */}
                <path
                  d={rankLinePath}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points (Percentage) */}
                {TIME_SERIES_PERFORMANCE.map((point, index) => {
                  const x = getX(index);
                  const y = getY(point.percentage);
                  return (
                    <circle
                      key={`pct-${point.month}`}
                      cx={x}
                      cy={y}
                      r="4.5"
                      className="fill-violet-600 stroke-white stroke-2 hover:r-6 cursor-pointer transition-all"
                      onMouseEnter={() => setActiveHoverPoint(index)}
                      onMouseLeave={() => setActiveHoverPoint(null)}
                    />
                  );
                })}

                {/* Data Points (Rank) */}
                {TIME_SERIES_PERFORMANCE.map((point, index) => {
                  const x = getX(index);
                  const y = getY(point.nationalRankPercent);
                  return (
                    <circle
                      key={`rnk-${point.month}`}
                      cx={x}
                      cy={y}
                      r="4"
                      className="fill-blue-500 stroke-white stroke-2 hover:r-5.5 cursor-pointer transition-all"
                    />
                  );
                })}
              </svg>

              {/* Hover Tooltip if active */}
              {activeHoverPoint !== null && (
                <div className="absolute top-2 right-4 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg pointer-events-none">
                  {TIME_SERIES_PERFORMANCE[activeHoverPoint].month}: {TIME_SERIES_PERFORMANCE[activeHoverPoint].percentage}%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Widget 2: Subject-wise Average (%) */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-4">
              Subject-wise Average (%)
            </h4>

            {/* Subject Progress Bars */}
            <div className="space-y-3.5">
              {SUBJECT_AVERAGES.map((sub) => (
                <div key={sub.subject} className="flex items-center gap-3 text-xs">
                  <span className="w-28 sm:w-32 text-slate-700 font-bold truncate">
                    {sub.subject}
                  </span>
                  <div className="flex-1 h-2.5 bg-slate-200/70 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full ${sub.colorClass} transition-all duration-500 shadow-xs`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-black text-slate-900 text-xs">
                    {sub.percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Scale Line (0% to 100%) */}
            <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 mt-5 pt-2.5 border-t border-slate-200/80 pl-28 sm:pl-32 pr-10">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
