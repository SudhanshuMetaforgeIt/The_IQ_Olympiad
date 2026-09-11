"use client";

import React from "react";
import type { PracticeSubject } from "./types";

interface PracticeCardProps {
  subject: PracticeSubject;
  onStartPracticing?: (subject: PracticeSubject) => void;
}

export function PracticeCard({ subject, onStartPracticing }: PracticeCardProps) {
  const freeTestsUsed = subject.freeTestsUsed ?? 0;
  const totalFreeTests = subject.totalFreeTests ?? 10;

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between relative overflow-hidden space-y-2.5 hover:shadow-md transition-all">
      {/* Background Watermark Graphic */}
      <div className="absolute right-3 top-3 pointer-events-none opacity-20 scale-75">
        {subject.watermarkGraphic}
      </div>

      {/* Top Header: Icon + Title & Description */}
      <div className="flex items-center gap-3 z-10">
        <div
          className={`size-10 sm:size-11 rounded-xl ${subject.iconBgClass} flex items-center justify-center shrink-0 shadow-2xs`}
        >
          {subject.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
            {subject.title}
          </h3>
          <p className="text-[11px] font-medium text-slate-500 leading-tight line-clamp-1">
            {subject.description}
          </p>
        </div>
      </div>

      {/* 4 Statistics Metrics Compact Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 z-10">
        {/* Topics */}
        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
          <div className="size-6 rounded-md bg-white text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-2xs">
            <svg className="w-3 h-3 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-slate-400 block leading-none">
              Topics
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              {subject.topicsCount}
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
          <div className="size-6 rounded-md bg-white text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-2xs">
            <svg className="w-3 h-3 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-slate-400 block leading-none">
              Questions
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              {subject.questionsCount}
            </span>
          </div>
        </div>

        {/* Tests */}
        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
          <div className="size-6 rounded-md bg-white text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-2xs">
            <svg className="w-3 h-3 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-slate-400 block leading-none">
              Tests
            </span>
            <div className="flex items-baseline gap-0.5 leading-tight">
              <span className="text-xs sm:text-sm font-black text-slate-900">
                {freeTestsUsed}/{totalFreeTests}
              </span>
              <span className="text-[9px] font-black text-emerald-600">(Free)</span>
            </div>
          </div>
        </div>

        {/* Avg. Score */}
        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
          <div className="size-6 rounded-md bg-white text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-2xs">
            <svg className="w-3 h-3 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-slate-400 block leading-none">
              Avg. Score
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              {subject.avgScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Free Tests Progress Widget */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 z-10">
        <div className="shrink-0 flex items-baseline gap-1">
          <span className="text-xs font-black text-violet-700 leading-none">
            {freeTestsUsed}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            / {totalFreeTests}
          </span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider ml-1">
            Free Tests
          </span>
        </div>

        {/* Segmented Dots */}
        <div className="flex items-center gap-1 flex-1 max-w-[180px] justify-end">
          {Array.from({ length: totalFreeTests }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 min-w-[6px] max-w-[14px] rounded-full transition-all ${
                idx < freeTestsUsed
                  ? "bg-violet-600 shadow-2xs"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Start Practicing Button */}
      <button
        type="button"
        onClick={() => onStartPracticing?.(subject)}
        className={`w-full py-2 px-3 rounded-xl text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs ${subject.buttonClass} transition-all cursor-pointer z-10 hover:scale-[1.005] active:scale-[0.995]`}
      >
        <span>Start Practicing</span>
        <span className="text-xs leading-none">›</span>
      </button>
    </div>
  );
}
