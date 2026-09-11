"use client";

import React, { useState } from "react";
import { PerformanceTrendPoint } from "./types";

interface PerformanceOverviewChartProps {
  data: PerformanceTrendPoint[];
}

export const PerformanceOverviewChart: React.FC<PerformanceOverviewChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const width = 620;
  const height = 190;
  const paddingX = 45;
  const paddingY = 24;

  const pointsCount = data.length;
  const getX = (index: number) => paddingX + (index / (pointsCount - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - (val / 100) * (height - 2 * paddingY);

  const createSmoothPath = (getValue: (d: PerformanceTrendPoint) => number) => {
    return data.reduce((acc, point, i) => {
      const x = getX(i);
      const y = getY(getValue(point));
      if (i === 0) return `M ${x},${y}`;

      const prevX = getX(i - 1);
      const prevY = getY(getValue(data[i - 1]));
      const cp1X = prevX + (x - prevX) / 2.2;
      const cp2X = prevX + (x - prevX) / 2.2;

      return `${acc} C ${cp1X},${prevY} ${cp2X},${y} ${x},${y}`;
    }, "");
  };

  const passPath = createSmoothPath((d) => d.passPercentage);
  const avgPath = createSmoothPath((d) => d.averageScore);

  const passArea = `${passPath} L ${getX(pointsCount - 1)},${height - paddingY} L ${paddingX},${height - paddingY
    } Z`;
  const avgArea = `${avgPath} L ${getX(pointsCount - 1)},${height - paddingY} L ${paddingX},${height - paddingY
    } Z`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-2xs flex flex-col justify-between h-full">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Performance Overview
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
            Pass percentage vs Average score trends
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm font-extrabold">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#10b981]" />
            <span className="text-slate-700">Pass Percentage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#7c3aed]" />
            <span className="text-slate-700">Average Score</span>
          </div>
        </div>
      </div>

      {/* SVG Curve Chart */}
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Y Axis Gridlines & Labels */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fontSize="11"
                  fill="#64748b"
                  textAnchor="end"
                  fontWeight="600"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Soft Gradient Area Fills */}
          <path d={passArea} fill="url(#passGrad)" />
          <path d={avgArea} fill="url(#avgGrad)" />

          {/* Smooth Curves */}
          <path d={passPath} fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" />
          <path d={avgPath} fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" />

          {/* Data Point Dots */}
          {data.map((d, i) => {
            const x = getX(i);
            const passY = getY(d.passPercentage);
            const avgY = getY(d.averageScore);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={height - paddingY}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                <circle cx={x} cy={passY} r={isHovered ? "5.5" : "4"} fill="#10b981" />
                <circle cx={x} cy={avgY} r={isHovered ? "5.5" : "4"} fill="#7c3aed" />

                {/* X Axis Month Labels */}
                <text
                  x={x}
                  y={height - 2}
                  fontSize="11"
                  fill={isHovered ? "#0f172a" : "#64748b"}
                  fontWeight={isHovered ? "700" : "600"}
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-0 bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg z-10 pointer-events-none transform -translate-x-1/2 transition-all"
            style={{ left: `${(getX(hoveredIdx) / width) * 100}%` }}
          >
            <p className="font-bold border-b border-slate-700 pb-0.5 mb-1 text-slate-200">
              {data[hoveredIdx].month}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span>Pass:</span>
              <span>{data[hoveredIdx].passPercentage}%</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <span>Avg:</span>
              <span>{data[hoveredIdx].averageScore}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
