"use client";

import React from "react";
import type { ExamResultItem } from "../../types";
import { FlaskIcon, MathCalcIcon, TrophyLogoIcon } from "./icons";

interface SubjectResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ExamResultItem | null;
}

export function SubjectResultModal({
  isOpen,
  onClose,
  result,
}: SubjectResultModalProps) {
  if (!isOpen || !result) return null;

  const isMath = result.subjectIcon === "math" || result.title.toLowerCase().includes("math");
  const isScience = result.subjectIcon === "science" || result.title.toLowerCase().includes("science");

  const iconBg = isScience
    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
    : isMath
      ? "bg-indigo-50 text-indigo-600 border-indigo-100"
      : "bg-violet-50 text-violet-600 border-violet-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`size-12 rounded-2xl flex items-center justify-center border shrink-0 ${iconBg}`}>
              {isScience ? (
                <FlaskIcon className="w-6 h-6" />
              ) : isMath ? (
                <MathCalcIcon className="w-6 h-6" />
              ) : (
                <TrophyLogoIcon className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {result.title}
                </h2>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {result.completedDate || "—"} • Result Scorecard
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Scorecard Highlight Card — from result prop only */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-violet-500/20">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-[11px] font-bold text-violet-200 uppercase tracking-widest block">
                  Total Exam Score
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black">
                    {result.scorePercentage != null ? `${result.scorePercentage}%` : "—"}
                  </span>
                </div>
                {result.badgeName && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-bold text-xs">
                      {result.badgeName}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-violet-200 uppercase tracking-wider block">
                  Rank
                </span>
                <span className="text-3xl font-black text-amber-300 block mt-0.5">
                  {result.rank != null ? `#${result.rank}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Empty breakdown state */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 py-10 px-4 text-center">
            <p className="text-sm font-medium text-slate-500">
              No score details available
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Close Scorecard
          </button>
        </div>
      </div>
    </div>
  );
}
