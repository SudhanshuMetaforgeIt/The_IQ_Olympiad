"use client";

import React from "react";

export default function ReportsTestsByTypeCard() {
  const testTypes = [
    { label: "Olympiad Tests", count: "4,256", percentage: "(47.5%)", color: "bg-[#6521e8]" },
    { label: "Subject Tests", count: "2,845", percentage: "(31.7%)", color: "bg-[#2563eb]" },
    { label: "Mock Tests", count: "1,256", percentage: "(14.0%)", color: "bg-[#10b981]" },
    { label: "Practice Tests", count: "608", percentage: "(6.8%)", color: "bg-[#f97316]" },
  ];

  const slices = [
    { start: 0, end: 171, color: "#6521e8", label: "47.5%", textRadius: 48 },
    { start: 171, end: 285.12, color: "#2563eb", label: "31.7%", textRadius: 50 },
    { start: 285.12, end: 335.52, color: "#10b981", label: "14.0%", textRadius: 52 },
    { start: 335.52, end: 360, color: "#f97316", label: "6.8%", textRadius: 54 },
  ];

  const getPieSlicePath = (startAngle: number, endAngle: number, radius = 85) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = 100 + radius * Math.cos(startRad);
    const y1 = 100 + radius * Math.sin(startRad);
    const x2 = 100 + radius * Math.cos(endRad);
    const y2 = 100 + radius * Math.sin(endRad);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (startAngle: number, endAngle: number, radius = 52) => {
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = (midAngle - 90) * (Math.PI / 180);
    return {
      x: 100 + radius * Math.cos(midRad),
      y: 100 + radius * Math.sin(midRad),
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4 font-sans h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Tests by Type
        </h3>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 my-auto">
        {/* Pie Chart Column */}
        <div className="md:col-span-7 flex items-center justify-center relative py-2">
          <div className="w-52 h-52 relative flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              {slices.map((slice, idx) => {
                const pathD = getPieSlicePath(slice.start, slice.end);
                const textPos = getTextPosition(slice.start, slice.end, slice.textRadius);

                return (
                  <g key={idx}>
                    <path
                      d={pathD}
                      fill={slice.color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <text
                      x={textPos.x}
                      y={textPos.y + 4}
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend Column */}
        <div className="md:col-span-5 space-y-3 pl-2">
          {testTypes.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center space-x-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                <span className="text-slate-700">{item.label}</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-900 font-bold">
                <span>{item.count}</span>
                <span className="text-slate-400 font-medium text-[11px]">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Row: Total Tests */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-extrabold text-slate-900">Total Tests</span>
        <span className="font-black text-purple-700 text-sm">8,965</span>
      </div>
    </div>
  );
}
