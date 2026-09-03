"use client";

import React from "react";
import { TrophyLogoIcon } from "./icons";

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
          {/* Top Overall Percentage Card — empty */}
          <div className="bg-gradient-to-r from-violet-100/80 via-indigo-100/60 to-purple-100/70 rounded-3xl p-6 relative overflow-hidden flex items-center gap-6 border border-violet-100">
            <div className="absolute right-2 bottom-2 text-violet-300/30 pointer-events-none">
              <TrophyLogoIcon className="w-32 h-32 fill-current" />
            </div>

            <div className="relative size-28 shrink-0 flex items-center justify-center bg-white/70 rounded-full shadow-inner p-2">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-violet-200"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-2xl font-black text-slate-400">—</span>
            </div>

            <div className="relative z-10">
              <span className="text-xs font-bold text-slate-700 tracking-wide block">
                Overall Percentage
              </span>
              <span className="text-3xl font-black text-slate-400 tracking-tight block mt-0.5">
                —
              </span>
              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-snug">
                No performance data yet.
              </p>
            </div>
          </div>

          {/* Subject Wise Performance Section */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Subject Wise Performance
            </h3>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs py-12 px-4 text-center">
              <p className="text-sm font-medium text-slate-500">
                No performance data yet
              </p>
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
                Complete exams and practice tests to see your performance summary here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
