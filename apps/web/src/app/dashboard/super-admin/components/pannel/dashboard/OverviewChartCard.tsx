"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function OverviewChartCard() {
  const [chartFilter, setChartFilter] = useState("This Week");

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Overview</h3>
        <div className="relative inline-flex items-center">
          <select
            value={chartFilter}
            onChange={(e) => setChartFilter(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-7 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 pointer-events-none" />
        </div>
      </div>

      {/* Color Legend Indicators */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs sm:text-sm font-bold text-slate-700 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-purple-600 inline-block" />
          <span>Schools</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
          <span>Students</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-pink-500 inline-block" />
          <span>Active Exams</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-blue-500 inline-block" />
          <span>Upcoming Exams</span>
        </div>
      </div>

      {/* SVG Line Chart Representation */}
      <div className="mt-6 relative w-full h-56">
        <div className="absolute inset-0 flex flex-col justify-between text-xs font-bold text-slate-400">
          <div className="flex items-center border-b border-slate-100 pb-1">
            <span className="w-8">15K</span>
            <div className="flex-1 border-b border-slate-100 border-dashed" />
          </div>
          <div className="flex items-center border-b border-slate-100 pb-1">
            <span className="w-8">12K</span>
            <div className="flex-1 border-b border-slate-100 border-dashed" />
          </div>
          <div className="flex items-center border-b border-slate-100 pb-1">
            <span className="w-8">9K</span>
            <div className="flex-1 border-b border-slate-100 border-dashed" />
          </div>
          <div className="flex items-center border-b border-slate-100 pb-1">
            <span className="w-8">6K</span>
            <div className="flex-1 border-b border-slate-100 border-dashed" />
          </div>
          <div className="flex items-center border-b border-slate-100 pb-1">
            <span className="w-8">3K</span>
            <div className="flex-1 border-b border-slate-100 border-dashed" />
          </div>
          <div className="flex items-center">
            <span className="w-8">0</span>
            <div className="flex-1 border-b border-slate-200" />
          </div>
        </div>

        <svg className="absolute inset-0 pl-8 w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          <polygon
            points="0,85 70,80 145,45 220,40 295,65 370,35 450,20 450,170 0,170"
            fill="url(#emeraldGrad)"
          />

          <path
            d="M 0,85 L 70,80 L 145,45 L 220,40 L 295,65 L 370,35 L 450,20"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="0" cy="85" r="4" fill="#10B981" />
          <circle cx="70" cy="80" r="4" fill="#10B981" />
          <circle cx="145" cy="45" r="4" fill="#10B981" />
          <circle cx="220" cy="40" r="4" fill="#10B981" />
          <circle cx="295" cy="65" r="4" fill="#10B981" />
          <circle cx="370" cy="35" r="4" fill="#10B981" />
          <circle cx="450" cy="20" r="4" fill="#10B981" />

          <path
            d="M 0,120 L 70,128 L 145,120 L 220,115 L 295,128 L 370,118 L 450,110"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="0" cy="120" r="4" fill="#8B5CF6" />
          <circle cx="70" cy="128" r="4" fill="#8B5CF6" />
          <circle cx="145" cy="120" r="4" fill="#8B5CF6" />
          <circle cx="220" cy="115" r="4" fill="#8B5CF6" />
          <circle cx="295" cy="128" r="4" fill="#8B5CF6" />
          <circle cx="370" cy="118" r="4" fill="#8B5CF6" />
          <circle cx="450" cy="110" r="4" fill="#8B5CF6" />

          <path
            d="M 0,145 L 70,150 L 145,145 L 220,143 L 295,152 L 370,145 L 450,145"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="0" cy="145" r="4" fill="#3B82F6" />
          <circle cx="70" cy="150" r="4" fill="#3B82F6" />
          <circle cx="145" cy="145" r="4" fill="#3B82F6" />
          <circle cx="220" cy="143" r="4" fill="#3B82F6" />
          <circle cx="295" cy="152" r="4" fill="#3B82F6" />
          <circle cx="370" cy="145" r="4" fill="#3B82F6" />
          <circle cx="450" cy="145" r="4" fill="#3B82F6" />

          <path
            d="M 0,168 L 70,168 L 145,168 L 220,168 L 295,168 L 370,168 L 450,168"
            fill="none"
            stroke="#EC4899"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="0" cy="168" r="4" fill="#EC4899" />
          <circle cx="70" cy="168" r="4" fill="#EC4899" />
          <circle cx="145" cy="168" r="4" fill="#EC4899" />
          <circle cx="220" cy="168" r="4" fill="#EC4899" />
          <circle cx="295" cy="168" r="4" fill="#EC4899" />
          <circle cx="370" cy="168" r="4" fill="#EC4899" />
          <circle cx="450" cy="168" r="4" fill="#EC4899" />
        </svg>
      </div>

      <div className="flex justify-between pl-8 pt-3 text-xs font-bold text-slate-700">
        <span>15 May</span>
        <span>16 May</span>
        <span>17 May</span>
        <span>18 May</span>
        <span>19 May</span>
        <span>20 May</span>
        <span>21 May</span>
      </div>
    </div>
  );
}
