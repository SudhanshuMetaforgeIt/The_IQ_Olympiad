"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ReportsStudentsTrendCard() {
  const [timeframe, setTimeframe] = useState("Monthly");

  const months = [
    "May '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25",
    "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26", "Apr '26", "May '26"
  ];

  // Data points in thousands (K)
  const registered = [20, 24, 26, 28, 30, 28, 30, 34, 32, 30, 26, 29, 34];
  const participated = [12, 15, 18, 17, 20, 21, 19, 23, 26, 24, 20, 17, 20, 22, 26];
  // Trim participated to match months length
  const partData = [12, 15, 18, 17, 20, 21, 19, 23, 26, 24, 20, 19, 22, 26].slice(0, months.length);

  // SVG viewBox coordinates: width 700, height 220
  const width = 700;
  const height = 200;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index: number) =>
    paddingX + (index / (months.length - 1)) * (width - paddingX * 2);

  const getY = (val: number) =>
    height - paddingY - (val / 40) * (height - paddingY * 2);

  const regPoints = registered.map((val, idx) => `${getX(idx)},${getY(val)}`).join(" ");
  const partPoints = partData.map((val, idx) => `${getX(idx)},${getY(val)}`).join(" ");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4 font-sans h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Students Trend</span>
            <span className="text-purple-600 font-bold text-xs">(Registration & Participation)</span>
          </h3>
        </div>

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

      {/* Legend */}
      <div className="flex items-center space-x-6 text-xs font-bold text-slate-600">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
          <span>Registered Students</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span>Participated Students</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] relative">
          <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full h-56 overflow-visible">
            {/* Horizontal Grid Lines */}
            {[0, 10, 20, 30, 40].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
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
                    {val === 0 ? "0" : `${val}K`}
                  </text>
                </g>
              );
            })}

            {/* Registered Line (Purple) */}
            <polyline
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={regPoints}
            />

            {/* Participated Line (Emerald) */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={partPoints}
            />

            {/* Data Dots */}
            {registered.map((val, idx) => (
              <circle
                key={`reg-${idx}`}
                cx={getX(idx)}
                cy={getY(val)}
                r="4"
                fill="#8b5cf6"
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}

            {partData.map((val, idx) => (
              <circle
                key={`part-${idx}`}
                cx={getX(idx)}
                cy={getY(val)}
                r="4"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}

            {/* X-Axis Labels */}
            {months.map((month, idx) => (
              <text
                key={month}
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
