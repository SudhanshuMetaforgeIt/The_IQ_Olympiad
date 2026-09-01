"use client";

import React from "react";
import { FlaskIcon, MathCalcIcon, TrophyLogoIcon } from "./icons";

interface PerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PerformanceModal({ isOpen, onClose }: PerformanceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            aria-label="Back"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Overall Performance
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Overall Percentage Card */}
          <div className="bg-gradient-to-r from-violet-100/80 via-indigo-100/60 to-purple-100/70 rounded-3xl p-6 relative overflow-hidden flex items-center gap-6 border border-violet-100">
            {/* Background Faint Watermark Trophy */}
            <div className="absolute right-2 bottom-2 text-violet-300/30 pointer-events-none">
              <TrophyLogoIcon className="w-32 h-32 fill-current" />
            </div>

            {/* Circular Progress Gauge */}
            <div className="relative size-28 shrink-0 flex items-center justify-center bg-white/70 rounded-full shadow-inner p-2">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                {/* Track */}
                <path
                  className="text-violet-200"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress (82%) */}
                <path
                  className="text-violet-600"
                  strokeDasharray="82, 100"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-2xl font-black text-slate-900">
                82%
              </span>
            </div>

            {/* Overall Percentage Text */}
            <div className="relative z-10">
              <span className="text-xs font-bold text-slate-700 tracking-wide block">
                Overall Percentage
              </span>
              <span className="text-3xl font-black text-slate-900 tracking-tight block mt-0.5">
                82%
              </span>
              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-snug">
                Great job! You are performing above the average.
              </p>
            </div>
          </div>

          {/* Subject Wise Performance Section */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Subject Wise Performance
            </h3>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {/* Science */}
              <div className="p-4 flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FlaskIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900">Science</span>
                    <span className="text-sm font-black text-slate-900">86%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full w-[86%]" />
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 shrink-0">
                  Excellent
                </span>
              </div>

              {/* Mathematics */}
              <div className="p-4 flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <MathCalcIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900">Mathematics</span>
                    <span className="text-sm font-black text-slate-900">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-violet-600 h-2 rounded-full w-[78%]" />
                  </div>
                </div>
                <span className="text-xs font-bold text-violet-600 shrink-0">
                  Good
                </span>
              </div>

              {/* English */}
              <div className="p-4 flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900">English</span>
                    <span className="text-sm font-black text-slate-900">82%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full w-[82%]" />
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600 shrink-0">
                  Very Good
                </span>
              </div>

              {/* Logical Reasoning */}
              <div className="p-4 flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900">
                      Logical Reasoning
                    </span>
                    <span className="text-sm font-black text-slate-900">74%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full w-[74%]" />
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 shrink-0">
                  Good
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Performance Summary Box */}
          <div className="bg-violet-50/80 border border-violet-100 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-violet-100 text-violet-600 shrink-0 mt-0.5">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-violet-800">
                Performance Summary
              </h4>
              <p className="text-xs font-medium text-slate-600 leading-snug mt-0.5">
                You have scored 82% overall. Keep practicing and you can achieve even higher!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
