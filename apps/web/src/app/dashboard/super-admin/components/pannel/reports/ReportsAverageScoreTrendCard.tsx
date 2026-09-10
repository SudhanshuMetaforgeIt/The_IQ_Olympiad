"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ReportsAverageScoreTrendCard() {
  const [timeframe, setTimeframe] = useState("Monthly");

  const months = [
    "May '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25",
    "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26", "Apr '26"
  ];

  const dataPoints = [
    { label: "61.2%", val: 61.2 },
    { label: "62.3%", val: 62.3 },
    { label: "63.1%", val: 63.1 },
    { label: "64.0%", val: 64.0 },
    { label: "65.2%", val: 65.2 },
    { label: "66.1%", val: 66.1 },
    { label: "64.8%", val: 64.8 },
    { label: "63.9%", val: 63.9 },
    { label: "64.7%", val: 64.7 },
    { label: "65.3%", val: 65.3 },
    { label: "66.0%", val: 66.0 },
    { label: "64.4%", val: 64.4 },
  ];

  const width = 700;
  const height = 210;
  const paddingX = 40;
  const paddingY = 30;

  const minVal = 0;
  const maxVal = 100;

  const getX = (idx: number) =>
    paddingX + (idx / (dataPoints.length - 1)) * (width - paddingX * 2);

  const getY = (val: number) =>
    height - paddingY - (val / maxVal) * (height - paddingY * 2);

  const linePoints = dataPoints
    .map((item, idx) => `${getX(idx)},${getY(item.val)}`)
    .join(" ");

  const areaPoints = `${getX(0)},${height - paddingY} ${linePoints} ${getX(dataPoints.length - 1)},${height - paddingY}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4 font-sans h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Average Score Trend (%)
        </h3>

        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-1.5 pr-8 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[620px]">
          <svg viewBox={`0 0 ${width} ${height + 25}`} className="w-full h-60 overflow-visible">
            <defs>
              <linearGradient id="purpleScoreFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 20, 40, 60, 80, 100].map((tick) => {
              const y = getY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1.5"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    fill="#94a3b8"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="end"
                  >
                    {`${tick}%`}
                  </text>
                </g>
              );
            })}

            {/* Gradient Area */}
            <polygon points={areaPoints} fill="url(#purpleScoreFill)" />

            {/* Main Line */}
            <polyline
              fill="none"
              stroke="#7c3aed"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePoints}
            />

            {/* Data Points and Value Labels */}
            {dataPoints.map((item, idx) => {
              const cx = getX(idx);
              const cy = getY(item.val);
              return (
                <g key={idx}>
                  {/* Number Label Above Dot */}
                  <text
                    x={cx}
                    y={cy - 9}
                    fill="#475569"
                    fontSize="9.5"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {item.label}
                  </text>
                  {/* Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#7c3aed"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              );
            })}

            {/* X-Axis Labels */}
            {months.map((month, idx) => (
              <text
                key={idx}
                x={getX(idx)}
                y={height + 15}
                fill="#64748b"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                {month}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
