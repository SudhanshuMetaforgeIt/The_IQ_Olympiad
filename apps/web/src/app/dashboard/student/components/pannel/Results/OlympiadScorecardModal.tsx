"use client";

import React from "react";
import type { OlympiadResultRecord } from "./types";
import { FlaskIcon, MathCalcIcon, TrophyLogoIcon } from "../../Common/icons";

interface OlympiadScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: OlympiadResultRecord | null;
}

export function OlympiadScorecardModal({
  isOpen,
  onClose,
  result,
}: OlympiadScorecardModalProps) {
  if (!isOpen || !result) return null;

  const renderSubjectIcon = (iconType: OlympiadResultRecord["iconType"]) => {
    switch (iconType) {
      case "science":
        return <FlaskIcon className="w-6 h-6 text-emerald-600" />;
      case "math":
        return <MathCalcIcon className="w-6 h-6 text-indigo-600" />;
      case "english":
        return (
          <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        );
      case "cyber":
        return (
          <svg className="w-6 h-6 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="14" x="3" y="4" rx="2" />
            <line x1="8" x2="16" y1="20" y2="20" />
            <line x1="12" x2="12" y1="18" y2="20" />
            <path d="m7 9 3 3-3 3" />
            <line x1="13" x2="17" y1="15" y2="15" />
          </svg>
        );
      default:
        return <TrophyLogoIcon className="w-6 h-6 text-violet-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
              {renderSubjectIcon(result.iconType)}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                {result.name}
              </h2>
              <span className="text-xs font-semibold text-slate-400">
                {result.date} • Scorecard
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Top Score Banner */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 text-white flex items-center justify-between gap-4 shadow-md shadow-violet-500/20">
            <div>
              <span className="text-xs font-bold text-violet-200 uppercase tracking-wider block">
                Total Score
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black tracking-tight">{result.score}</span>
                <span className="text-sm font-bold text-violet-200">/ {result.totalScore}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white font-bold text-xs backdrop-blur-xs">
                  {result.percentage.toFixed(2)}%
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/90 text-white font-bold text-xs">
                  {result.resultStatus}
                </span>
              </div>
            </div>

            {/* Rank & Medal Pill on Right */}
            <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/15 min-w-[110px]">
              <span className="text-[11px] font-bold text-violet-200 block uppercase tracking-wide">
                National Rank
              </span>
              <span className="text-xl font-black text-white block mt-0.5">
                #{result.nationalRank.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-amber-300 block mt-0.5">
                {result.medal === "gold" ? "🥇 Gold Medal" : result.medal === "silver" ? "🥈 Silver Medal" : "🥉 Bronze Medal"}
              </span>
            </div>
          </div>

          {/* Section Wise Breakdown */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-slate-500 mb-3">
              Section-wise Performance
            </h3>

            <div className="bg-slate-50/80 rounded-2xl border border-slate-100 p-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                No score details available
              </p>
            </div>
          </div>

          {/* Subject Performance Summary Card */}
          <div className="bg-violet-50/70 border border-violet-100 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-violet-100 text-violet-600 shrink-0 mt-0.5">
              <TrophyLogoIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-violet-800">
                Performance Remarks
              </h4>
              <p className="text-xs font-medium text-slate-600 leading-snug mt-0.5">
                {result.name}: You scored {result.score} out of {result.totalScore} marks ({result.percentage.toFixed(2)}%) and earned a National Rank of #{result.nationalRank.toLocaleString()}.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Close Scorecard
          </button>
        </div>
      </div>
    </div>
  );
}
