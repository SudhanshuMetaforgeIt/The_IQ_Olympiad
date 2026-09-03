"use client";

import React, { useState } from "react";
import { AverageTrendPoint } from "./types";

interface AverageScoreTrendChartProps {
  data: AverageTrendPoint[];
}

export const AverageScoreTrendChart: React.FC<AverageScoreTrendChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(3); // Default tooltip on Jul '25 / 78.4%

  const width = 620;
  const height = 190;
  const paddingX = 45;
  const paddingY = 24;

  const pointsCount = data.length;
  const getX = (index: number) => paddingX + (index / (pointsCount - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - (val / 100) * (height - 2 * paddingY);

  const createSmoothPath = () => {
    return data.reduce((acc, point, i) => {
      const x = getX(i);
      const y = getY(point.averageScore);
      if (i === 0) return `M ${x},${y}`;

      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1].averageScore);
      const cp1X = prevX + (x - prevX) / 2.2;
      const cp2X = prevX + (x - prevX) / 2.2;

      return `${acc} C ${cp1X},${prevY} ${cp2X},${y} ${x},${y}`;
    }, "");
  };

  const linePath = createSmoothPath();
  const yLabels = [100, 75, 50, 25];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100/90 shadow-2xs flex flex-col justify-between h-full">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Average Score Trend
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="w-3 h-3 rounded-full bg-[#f97316]" />
          <span className="text-slate-600 font-medium">Average Score</span>
        </div>
      </div>

      {/* SVG Curve Chart */}
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Y Axis Gridlines & Labels */}
          {yLabels.map((val) => {
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
                  y={y + 3}
                  fontSize="10"
                  fill="#94a3b8"
                  textAnchor="end"
                  fontWeight="500"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Smooth Amber Line */}
          <path d={linePath} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data Point Dots */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.averageScore);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle cx={x} cy={y} r={isHovered ? "5" : "3.5"} fill="#f97316" />

                {/* X Axis Month Labels */}
                <text
                  x={x}
                  y={height - 2}
                  fontSize="10"
                  fill={isHovered ? "#0f172a" : "#94a3b8"}
                  fontWeight={isHovered ? "700" : "500"}
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Highlighted Tooltip on Jul '25 / 78.4% */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 bg-white border border-slate-200 text-slate-900 text-xs px-3 py-1.5 rounded-xl shadow-lg z-10 pointer-events-none transform -translate-x-1/2 transition-all text-center"
            style={{ left: `${(getX(hoveredIdx) / width) * 100}%` }}
          >
            <p className="text-[10px] font-bold text-slate-400 leading-tight">
              {data[hoveredIdx].month}
            </p>
            <p className="font-black text-slate-900 text-xs leading-tight">
              {data[hoveredIdx].averageScore}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
