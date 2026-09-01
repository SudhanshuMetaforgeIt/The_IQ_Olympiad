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
    <div className="h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden space-y-4 hover:shadow-md transition-all">
      {/* Background Faint Watermark Graphic */}
      <div className="absolute right-6 top-6 pointer-events-none opacity-40">
        {subject.watermarkGraphic}
      </div>

      {/* Top Header: Big Icon + Subject Title & Description */}
      <div className="flex items-center gap-5 z-10">
        <div
          className={`size-20 sm:size-22 rounded-full ${subject.iconBgClass} flex items-center justify-center shrink-0 shadow-xs`}
        >
          {subject.icon}
        </div>
        <div className="space-y-1.5 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            {subject.title}
          </h3>
          <p className="text-sm sm:text-base font-medium text-slate-500 leading-relaxed">
            {subject.description}
          </p>
        </div>
      </div>

      {/* 4 Statistics Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100 z-10">
        {/* Topics */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-400 block leading-tight">
              Topics
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {subject.topicsCount}
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-400 block leading-tight">
              Questions
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {subject.questionsCount}
            </span>
          </div>
        </div>

        {/* Tests */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-400 block leading-tight">
              Tests
            </span>
            <div className="flex items-baseline gap-1.5 leading-tight">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {freeTestsUsed}/{totalFreeTests}
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-600">(Free)</span>
            </div>
          </div>
        </div>

        {/* Avg. Score */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-400 block leading-tight">
              Avg. Score
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {subject.avgScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Free Tests Used Individual Progress Widget */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-100 z-10">
        <div className="shrink-0">
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-violet-700 leading-none">
              {freeTestsUsed}
            </span>
            <span className="text-xs font-bold text-slate-400">
              / {totalFreeTests}
            </span>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mt-0.5">
            Free Tests Used
          </span>
        </div>

        {/* 10 Segmented Rounded Progress Bars */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1 max-w-[240px] justify-end">
          {Array.from({ length: totalFreeTests }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 sm:h-2.5 flex-1 min-w-[10px] max-w-[20px] rounded-full transition-all ${
                idx < freeTestsUsed
                  ? "bg-violet-600 shadow-xs"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Start Practicing Action Button */}
      <button
        type="button"
        onClick={() => onStartPracticing?.(subject)}
        className={`w-full py-4 px-6 rounded-2xl text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-md ${subject.buttonClass} transition-all cursor-pointer z-10 hover:scale-[1.01] active:scale-[0.99]`}
      >
        <span>Start Practicing</span>
        <span className="text-xl leading-none">›</span>
      </button>
    </div>
  );
}
