"use client";

import React from "react";
import { RESULTS_TOP_METRICS } from "./mockResultsData";

export function ResultsTopStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. National Rank Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-5 hover:shadow-md transition-shadow">
        <div className="w-16 h-16 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center justify-center shrink-0">
          <svg
            className="w-9 h-9 text-purple-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            <path d="m12 6 1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2L9 8.5l2-.5 1-2z" fill="currentColor" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            National Rank
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {RESULTS_TOP_METRICS.nationalRank.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-400">
              / {RESULTS_TOP_METRICS.totalStudents.toLocaleString()} Students
            </span>
          </div>

          <div className="mt-2.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100">
              Top {RESULTS_TOP_METRICS.topPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Percentage Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-5 hover:shadow-md transition-shadow">
        {/* Pie Chart SVG Graphic */}
        <div className="w-16 h-16 shrink-0 relative flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="#E0E7FF"
            />
            {/* Primary Slice (Violet/Blue) */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="#6366F1"
              strokeWidth="31.83"
              strokeDasharray="60 40"
              strokeDashoffset="0"
            />
            {/* Secondary Slice (Purple) */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="#8B5CF6"
              strokeWidth="31.83"
              strokeDasharray="27.65 72.35"
              strokeDashoffset="-60"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Percentage
          </span>
          <div className="flex items-baseline mt-0.5">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {RESULTS_TOP_METRICS.percentage}%
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <span>↑</span> {RESULTS_TOP_METRICS.improvementPercentage}% improvement
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              vs last month
            </span>
          </div>
        </div>
      </div>

      {/* 3. Medals Earned Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-5 hover:shadow-md transition-shadow">
        {/* Ribbon Star Medal Graphic */}
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
            {/* Ribbon Tails */}
            <path
              d="M22 28L12 56L26 48L32 56L28 28H22Z"
              fill="#F59E0B"
            />
            <path
              d="M42 28L52 56L38 48L32 56L36 28H42Z"
              fill="#D97706"
            />
            {/* Medal Outer Circle */}
            <circle cx="32" cy="24" r="18" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
            {/* Medal Inner Ring */}
            <circle cx="32" cy="24" r="14" fill="#F59E0B" opacity="0.2" />
            <circle cx="32" cy="24" r="13" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Star Center */}
            <path
              d="M32 15L34.5 20.5L40.5 21.2L36 25.3L37.2 31.2L32 28.2L26.8 31.2L28 25.3L23.5 21.2L29.5 20.5L32 15Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Medals Earned
          </span>
          <div className="flex items-baseline mt-0.5">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {RESULTS_TOP_METRICS.totalMedals}
            </span>
          </div>

          <div className="border-t border-slate-100 mt-2 pt-2 flex items-center gap-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1">
              <span className="text-amber-500 font-bold">{RESULTS_TOP_METRICS.goldMedals} Gold</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <span className="text-slate-500 font-bold">{RESULTS_TOP_METRICS.silverMedals} Silver</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <span className="text-amber-700 font-bold">{RESULTS_TOP_METRICS.bronzeMedals} Bronze</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
