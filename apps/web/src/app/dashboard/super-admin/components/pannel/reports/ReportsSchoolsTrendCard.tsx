"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { schoolsTrendData } from "./mockData";

export default function ReportsSchoolsTrendCard() {
  const [timeframe, setTimeframe] = useState("Monthly");

  // Chart Y range: 300 to 1500
  const points = schoolsTrendData
    .map((item, idx) => {
      const x = (idx / (schoolsTrendData.length - 1)) * 520 + 20;
      const y = 180 - ((item.registrations - 300) / 1200) * 140;
      return { x, y, val: item.registrations, month: item.month };
    });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Schools Trend <span className="text-xs font-normal text-slate-400">(Registrations)</span>
          </h3>
        </div>
        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 pr-7 focus:outline-none cursor-pointer"
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Line Chart */}
      <div className="relative w-full h-56 pt-2">
        {/* Y-Axis Labels */}
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-semibold text-slate-400 pointer-events-none">
          <div className="border-b border-slate-100 pb-1">1.5K</div>
          <div className="border-b border-slate-100 pb-1">1.2K</div>
          <div className="border-b border-slate-100 pb-1">900</div>
          <div className="border-b border-slate-100 pb-1">600</div>
          <div className="border-b border-slate-100 pb-1">300</div>
        </div>

        {/* SVG Path & Data Point Labels */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 560 200" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#7c3aed"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="4" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                className="fill-slate-800 text-[8px] font-black"
              >
                {p.val}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* X-Axis Month Labels */}
      <div className="flex items-center justify-between text-[9px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
        {schoolsTrendData.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}
