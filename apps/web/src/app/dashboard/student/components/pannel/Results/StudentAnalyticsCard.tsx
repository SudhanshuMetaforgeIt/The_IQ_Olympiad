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
  const chartHeight = 140;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 10;
  const paddingBottom = 25;

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
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs space-y-3.5">
      {/* Card Title Header */}
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" x2="18" y1="20" y2="10" />
            <line x1="12" x2="12" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="14" />
            <path d="M4 20h16" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
            Student Analytics
          </h3>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
            Your performance insights and progress over time.
          </p>
        </div>
      </div>

      {/* 2 Equal Columns: Performance Over Time & Subject-wise Average */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">
        {/* Sub-Widget 1: Performance Over Time */}
        <div className="bg-[#FAF8FF]/60 border border-violet-100/80 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            {/* Title & Legend */}
            <div className="mb-2">
              <h4 className="text-xs font-extrabold text-slate-900">
                Performance Over Time
              </h4>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-violet-600"></span>
                  Percentage
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-blue-500"></span>
                  National Rank
                </span>
              </div>
            </div>

            {/* SVG Line Graph */}
            <div className="w-full relative">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-32 overflow-visible"
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
                        x={paddingLeft - 6}
                        y={y + 3}
                        textAnchor="end"
                        className="text-[9px] fill-slate-400 font-semibold"
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
                      y={chartHeight - 6}
                      textAnchor="middle"
                      className="text-[9px] fill-slate-500 font-bold"
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
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Rank Line (Blue) */}
                <path
                  d={rankLinePath}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
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
                      r="3.5"
                      className="fill-violet-600 stroke-white stroke-2 hover:r-5 cursor-pointer transition-all"
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
                      r="3"
                      className="fill-blue-500 stroke-white stroke-2 hover:r-4.5 cursor-pointer transition-all"
                    />
                  );
                })}
              </svg>

              {/* Hover Tooltip if active */}
              {activeHoverPoint !== null && (
                <div className="absolute top-1 right-3 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow pointer-events-none">
                  {TIME_SERIES_PERFORMANCE[activeHoverPoint].month}: {TIME_SERIES_PERFORMANCE[activeHoverPoint].percentage}%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Widget 2: Subject-wise Average (%) */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 mb-2.5">
              Subject-wise Average (%)
            </h4>

            {/* Subject Progress Bars */}
            <div className="space-y-2.5">
              {SUBJECT_AVERAGES.map((sub) => (
                <div key={sub.subject} className="flex items-center gap-2.5 text-xs">
                  <span className="w-24 sm:w-28 text-slate-700 font-bold truncate text-[11px]">
                    {sub.subject}
                  </span>
                  <div className="flex-1 h-2 bg-slate-200/70 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full ${sub.colorClass} transition-all duration-500 shadow-2xs`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-black text-slate-900 text-[11px]">
                    {sub.percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Scale Line (0% to 100%) */}
            <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 mt-3 pt-1.5 border-t border-slate-200/80 pl-24 sm:pl-28 pr-9">
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
