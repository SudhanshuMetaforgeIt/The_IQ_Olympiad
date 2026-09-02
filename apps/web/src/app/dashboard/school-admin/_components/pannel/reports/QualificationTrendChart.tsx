"use client";

import React, { useState } from "react";
import { QualifiedTrendPoint } from "./types";

interface QualificationTrendChartProps {
  data: QualifiedTrendPoint[];
}

export const QualificationTrendChart: React.FC<QualificationTrendChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(4);

  const width = 620;
  const height = 190;
  const paddingX = 45;
  const paddingY = 24;

  const maxVal = 1500;
  const pointsCount = data.length;
  const getX = (index: number) => paddingX + (index / (pointsCount - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - (val / maxVal) * (height - 2 * paddingY);

  const createSmoothPath = () => {
    return data.reduce((acc, point, i) => {
      const x = getX(i);
      const y = getY(point.qualifiedCount);
      if (i === 0) return `M ${x},${y}`;

      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1].qualifiedCount);
      const cp1X = prevX + (x - prevX) / 2.2;
      const cp2X = prevX + (x - prevX) / 2.2;

      return `${acc} C ${cp1X},${prevY} ${cp2X},${y} ${x},${y}`;
    }, "");
  };

  const linePath = createSmoothPath();
  const areaPath = `${linePath} L ${getX(pointsCount - 1)},${height - paddingY} L ${paddingX},${
    height - paddingY
  } Z`;

  const yLabels = [
    { label: "1.5K", val: 1500 },
    { label: "1.2K", val: 1200 },
    { label: "900", val: 900 },
    { label: "600", val: 600 },
    { label: "300", val: 300 },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100/90 shadow-2xs flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Qualification Trend
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Number of qualified students over time
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="w-3 h-3 rounded-full bg-[#10b981]" />
          <span className="text-slate-600 font-medium">Qualified Students</span>
        </div>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {yLabels.map((item) => {
            const y = getY(item.val);
            return (
              <g key={item.label}>
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
                  {item.label}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="url(#qualGrad)" />
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.qualifiedCount);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle cx={x} cy={y} r={isHovered ? "5" : "3.5"} fill="#10b981" />

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

        {hoveredIdx !== null && (
          <div
            className="absolute top-4 bg-white border border-slate-200 text-slate-900 text-xs px-3 py-1.5 rounded-xl shadow-lg z-10 pointer-events-none transform -translate-x-1/2 transition-all text-center"
            style={{ left: `${(getX(hoveredIdx) / width) * 100}%` }}
          >
            <p className="text-[10px] font-bold text-slate-400 leading-tight">17 Apr 2026</p>
            <p className="font-black text-slate-900 text-xs leading-tight">1,418 Students</p>
          </div>
        )}
      </div>
    </div>
  );
};
