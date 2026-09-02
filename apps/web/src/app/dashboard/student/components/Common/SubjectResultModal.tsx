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

  // Subject-specific detailed metrics with Part A - E structure
  const details = isMath
    ? {
        subject: "Mathematics",
        examName: result.title,
        date: result.completedDate,
        score: "90/100",
        percentage: 90,
        nationalRank: 982,
        percentile: "98.4%",
        accuracy: "94.7%",
        correct: 45,
        incorrect: 3,
        unattempted: 2,
        timeTaken: "38m 20s",
        award: "Gold Medal 🏆",
        awardBadge: "Top 2% Nationally",
        sections: [
          {
            part: "PART A — THINK",
            totalMarks: "30 Marks",
            description: "Objective reasoning and analysis.",
            obtained: "28/30",
            percentage: "93%",
          },
          {
            part: "PART B — ANALYSE",
            totalMarks: "25 Marks",
            description: "Information, data and critical-thinking questions.",
            obtained: "23/25",
            percentage: "92%",
          },
          {
            part: "PART C — SOLVE",
            totalMarks: "20 Marks",
            description: "Real-world problem-solving scenarios.",
            obtained: "18/20",
            percentage: "90%",
          },
          {
            part: "PART D — DECIDE",
            totalMarks: "15 Marks",
            description: "Situational judgement and decision-making.",
            obtained: "13/15",
            percentage: "87%",
          },
          {
            part: "PART E — CREATE",
            totalMarks: "10 Marks",
            description: "Creative/open-ended challenge.",
            obtained: "8/10",
            percentage: "80%",
          },
        ],
        iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      }
    : {
        subject: "Science",
        examName: result.title,
        date: result.completedDate,
        score: "86/100",
        percentage: 86,
        nationalRank: 1325,
        percentile: "96.2%",
        accuracy: "91.5%",
        correct: 43,
        incorrect: 4,
        unattempted: 3,
        timeTaken: "41m 15s",
        award: "Gold Medal 🏆",
        awardBadge: "Top 5% Nationally",
        sections: [
          {
            part: "PART A — THINK",
            totalMarks: "30 Marks",
            description: "Objective reasoning and analysis.",
            obtained: "26/30",
            percentage: "87%",
          },
          {
            part: "PART B — ANALYSE",
            totalMarks: "25 Marks",
            description: "Information, data and critical-thinking questions.",
            obtained: "22/25",
            percentage: "88%",
          },
          {
            part: "PART C — SOLVE",
            totalMarks: "20 Marks",
            description: "Real-world problem-solving scenarios.",
            obtained: "17/20",
            percentage: "85%",
          },
          {
            part: "PART D — DECIDE",
            totalMarks: "15 Marks",
            description: "Situational judgement and decision-making.",
            obtained: "13/15",
            percentage: "87%",
          },
          {
            part: "PART E — CREATE",
            totalMarks: "10 Marks",
            description: "Creative/open-ended challenge.",
            obtained: "8/10",
            percentage: "80%",
          },
        ],
        iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`size-12 rounded-2xl flex items-center justify-center border shrink-0 ${details.iconBg}`}>
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
                  {details.examName}
                </h2>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {details.date} • Verified Result Scorecard
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
          {/* Top Scorecard Highlight Card */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-violet-500/20">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-[11px] font-bold text-violet-200 uppercase tracking-widest block">
                  Total Exam Score
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black">{details.score}</span>
                  <span className="text-lg font-bold text-violet-200">({details.percentage}%)</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-white font-bold text-xs">
                    {details.award}
                  </span>
                  <span className="text-xs font-semibold text-violet-100">
                    {details.awardBadge}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-violet-200 uppercase tracking-wider block">
                  National Rank
                </span>
                <span className="text-3xl font-black text-amber-300 block mt-0.5">
                  #{details.nationalRank}
                </span>
                <span className="text-xs font-semibold text-violet-100 block mt-1">
                  Percentile: {details.percentile}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Performance Metric Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Accuracy
              </span>
              <span className="text-base font-black text-slate-900 mt-0.5 block">
                {details.accuracy}
              </span>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                Correct
              </span>
              <span className="text-base font-black text-emerald-700 mt-0.5 block">
                {details.correct} Qs
              </span>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
              <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider block">
                Incorrect
              </span>
              <span className="text-base font-black text-rose-700 mt-0.5 block">
                {details.incorrect} Qs
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Time Spent
              </span>
              <span className="text-base font-black text-slate-900 mt-0.5 block">
                {details.timeTaken}
              </span>
            </div>
          </div>

          {/* Section-Wise Performance Breakdown (Parts A through E) */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              Section-Wise Performance Breakdown
            </h3>
            <div className="space-y-2.5">
              {details.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 hover:bg-violet-50/30 border border-slate-200/80 hover:border-violet-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-xs sm:text-sm">
                        {sec.part}
                      </span>
                      <span className="text-[10px] font-extrabold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-md">
                        {sec.totalMarks}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-500">
                      {sec.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    <span className="text-xs font-bold text-slate-600 font-mono">
                      {sec.obtained}
                    </span>
                    <span className="font-black text-xs text-violet-700 bg-violet-50 border border-violet-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
                      {sec.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <span>✓</span> Official Certified Result
          </span>
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
