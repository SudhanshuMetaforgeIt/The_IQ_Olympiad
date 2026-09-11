"use client";

import React, { useState, useMemo } from "react";
import type { OlympiadResultRecord } from "./types";
import type { QuestionReviewItem } from "../../../lib/examResultsStorage";
import { FlaskIcon, MathCalcIcon, TrophyLogoIcon } from "../../Common/icons";

interface OlympiadScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: OlympiadResultRecord | null;
  initialTab?: "review" | "scorecard";
}

export function OlympiadScorecardModal({
  isOpen,
  onClose,
  result,
  initialTab = "review",
}: OlympiadScorecardModalProps) {
  const [activeTab, setActiveTab] = useState<"review" | "scorecard">(initialTab);
  const [filterType, setFilterType] = useState<"all" | "correct" | "wrong" | "unattempted">("all");

  const questions: QuestionReviewItem[] = useMemo(() => {
    return result?.questions || [];
  }, [result]);

  const stats = useMemo(() => {
    if (!questions.length) {
      return {
        total: 0,
        correct: 0,
        wrong: 0,
        unattempted: 0,
        accuracy: 0,
      };
    }
    const total = questions.length;
    const correct = questions.filter((q) => q.isCorrect).length;
    const attempted = questions.filter((q) => q.isAttempted).length;
    const wrong = attempted - correct;
    const unattempted = total - attempted;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { total, correct, wrong, unattempted, accuracy };
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (filterType === "correct") return questions.filter((q) => q.isCorrect);
    if (filterType === "wrong") return questions.filter((q) => q.isAttempted && !q.isCorrect);
    if (filterType === "unattempted") return questions.filter((q) => !q.isAttempted);
    return questions;
  }, [questions, filterType]);

  if (!isOpen || !result) return null;

  const renderSubjectIcon = (iconType: OlympiadResultRecord["iconType"]) => {
    switch (iconType) {
      case "science":
        return <FlaskIcon className="w-5 h-5 text-emerald-600" />;
      case "math":
        return <MathCalcIcon className="w-5 h-5 text-indigo-600" />;
      case "english":
        return (
          <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
        );
      case "cyber":
        return (
          <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="14" x="3" y="4" rx="2" />
            <line x1="8" x2="16" y1="20" y2="20" />
            <line x1="12" x2="12" y1="18" y2="20" />
            <path d="m7 9 3 3-3 3" />
            <line x1="13" x2="17" y1="15" y2="15" />
          </svg>
        );
      default:
        return <TrophyLogoIcon className="w-5 h-5 text-violet-600" />;
    }
  };

  const handleScrollToQuestion = (qNum: number) => {
    const el = document.getElementById(`review-q-${qNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
              {renderSubjectIcon(result.iconType)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                  {result.name}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200 shrink-0">
                  {result.resultStatus}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">
                {result.date} • Scored {result.score} / {result.totalScore} ({result.percentage.toFixed(1)}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("review")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "review"
                    ? "bg-white text-violet-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Question Review {questions.length > 0 && `(${questions.length})`}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("scorecard")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "scorecard"
                    ? "bg-white text-violet-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Scorecard & Summary
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer shrink-0"
              aria-label="Close"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5 bg-[#F8FAFC]">
          {activeTab === "scorecard" ? (
            /* SCORECARD VIEW */
            <div className="space-y-5">
              {/* Top Score Banner */}
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md shadow-violet-500/20">
                <div>
                  <span className="text-xs font-bold text-violet-200 uppercase tracking-wider block">
                    Final Olympiad Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight">{result.score}</span>
                    <span className="text-base font-bold text-violet-200">/ {result.totalScore} Marks</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white font-bold text-xs backdrop-blur-xs">
                      {result.percentage.toFixed(2)}% Overall
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/90 text-white font-bold text-xs">
                      {result.resultStatus}
                    </span>
                  </div>
                </div>

                {/* Rank & Medal Pill */}
                <div className="bg-white/10 rounded-2xl p-3.5 text-center border border-white/15 min-w-[130px] self-stretch sm:self-auto">
                  <span className="text-[11px] font-bold text-violet-200 block uppercase tracking-wide">
                    National Rank
                  </span>
                  <span className="text-2xl font-black text-white block mt-0.5">
                    #{result.nationalRank.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-amber-300 block mt-0.5">
                    {result.medal === "gold" ? "🥇 Gold Medal" : result.medal === "silver" ? "🥈 Silver Medal" : result.medal === "bronze" ? "🥉 Bronze Medal" : "🏅 Participation"}
                  </span>
                </div>
              </div>

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Correct Answers</span>
                  <span className="text-xl font-black text-emerald-600 mt-1 block">
                    {stats.correct} / {stats.total || result.totalScore / 2}
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Incorrect</span>
                  <span className="text-xl font-black text-rose-600 mt-1 block">
                    {stats.wrong}
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Unattempted</span>
                  <span className="text-xl font-black text-slate-500 mt-1 block">
                    {stats.unattempted}
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Accuracy</span>
                  <span className="text-xl font-black text-violet-600 mt-1 block">
                    {stats.accuracy}%
                  </span>
                </div>
              </div>

              {/* Section-wise Performance breakdown */}
              {result.sectionBreakdown && result.sectionBreakdown.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-3">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-slate-500">
                    Section-wise Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.sectionBreakdown.map((sec) => (
                      <div key={sec.section} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>{sec.section}</span>
                          <span className="text-violet-600">{sec.score} / {sec.totalMarks} Marks</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-violet-600 h-full rounded-full"
                            style={{ width: `${sec.totalMarks > 0 ? (sec.score / sec.totalMarks) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                          <span>{sec.correct} Correct • {sec.wrong} Wrong</span>
                          <span>{sec.accuracy}% Accuracy</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Remarks */}
              <div className="bg-violet-50/80 border border-violet-100 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-violet-100 text-violet-600 shrink-0 mt-0.5">
                  <TrophyLogoIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-violet-900">
                    Performance Remarks
                  </h4>
                  <p className="text-xs font-medium text-slate-600 leading-snug mt-0.5">
                    {result.name}: You scored {result.score} out of {result.totalScore} marks ({result.percentage.toFixed(2)}%) and earned a National Rank of #{result.nationalRank.toLocaleString()}.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* QUESTION BY QUESTION REVIEW VIEW */
            <div className="space-y-4">
              {/* Filter Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                      filterType === "all"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    All Questions ({stats.total})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType("correct")}
                    className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer ${
                      filterType === "correct"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                    }`}
                  >
                    <span>✓ Correct</span>
                    <span className="font-mono">({stats.correct})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType("wrong")}
                    className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer ${
                      filterType === "wrong"
                        ? "bg-rose-600 text-white shadow-2xs"
                        : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                    }`}
                  >
                    <span>✗ Incorrect</span>
                    <span className="font-mono">({stats.wrong})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType("unattempted")}
                    className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer ${
                      filterType === "unattempted"
                        ? "bg-slate-700 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    <span>— Skipped</span>
                    <span className="font-mono">({stats.unattempted})</span>
                  </button>
                </div>

                <div className="text-xs font-bold text-slate-500">
                  Showing <span className="text-slate-900">{filteredQuestions.length}</span> questions
                </div>
              </div>

              {/* Jump Palette (1-50) */}
              {questions.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                    Quick Jump to Question:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {questions.map((q) => {
                      const colorClass = q.isCorrect
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                        : q.isAttempted
                          ? "bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200";

                      return (
                        <button
                          key={q.questionId}
                          type="button"
                          onClick={() => handleScrollToQuestion(q.questionNumber)}
                          className={`size-7 rounded-lg text-[11px] font-bold border transition flex items-center justify-center cursor-pointer ${colorClass}`}
                          title={`Question ${q.questionNumber}: ${q.isCorrect ? "Correct" : q.isAttempted ? "Incorrect" : "Unattempted"}`}
                        >
                          {q.questionNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Questions List */}
              {filteredQuestions.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-2xs space-y-2">
                  <p className="text-sm font-bold text-slate-700">No questions in this filter.</p>
                  <button
                    type="button"
                    onClick={() => setFilterType("all")}
                    className="px-4 py-1.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 transition cursor-pointer"
                  >
                    Show All Questions
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((q) => {
                    return (
                      <div
                        key={q.questionId}
                        id={`review-q-${q.questionNumber}`}
                        className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs space-y-4 transition-all scroll-mt-6 ${
                          q.isCorrect
                            ? "border-emerald-200/90 hover:border-emerald-300"
                            : q.isAttempted
                              ? "border-rose-200/90 hover:border-rose-300"
                              : "border-slate-200/90 hover:border-slate-300"
                        }`}
                      >
                        {/* Question Header Card */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="size-6 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                              {q.questionNumber}
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                              {q.section}
                            </span>
                          </div>

                          {/* Result status badge */}
                          <div>
                            {q.isCorrect ? (
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 font-extrabold text-xs flex items-center gap-1 shadow-2xs">
                                <span>✓ Correct</span>
                                <span className="text-[10px] font-black opacity-80">(+{q.marks} Marks)</span>
                              </span>
                            ) : q.isAttempted ? (
                              <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 font-extrabold text-xs flex items-center gap-1 shadow-2xs">
                                <span>✗ Incorrect</span>
                                <span className="text-[10px] font-black opacity-80">(0/{q.marks} Marks)</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs flex items-center gap-1">
                                <span>— Unattempted</span>
                                <span className="text-[10px] font-black opacity-80">(0/{q.marks} Marks)</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Text */}
                        <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                          {q.question}
                        </div>

                        {/* Options List */}
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt) => {
                            const isCorrectAnswer = opt.id === q.correctAnswer;
                            const isUserSelected = opt.id === q.userAnswer;

                            let optionStyle = "border-slate-200 bg-slate-50/50 text-slate-700";
                            let badge = null;

                            if (isCorrectAnswer && isUserSelected) {
                              // User got it right!
                              optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500/20";
                              badge = (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] shadow-2xs flex items-center gap-1 shrink-0">
                                  ✓ Your Answer (Correct)
                                </span>
                              );
                            } else if (isCorrectAnswer && !isUserSelected) {
                              // The actual correct answer when user picked something else or skipped
                              optionStyle = "border-emerald-400 bg-emerald-50/60 text-emerald-950 font-bold";
                              badge = (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[10px] flex items-center gap-1 shrink-0">
                                  ✓ Correct Answer
                                </span>
                              );
                            } else if (!isCorrectAnswer && isUserSelected) {
                              // User picked wrong answer
                              optionStyle = "border-rose-400 bg-rose-50 text-rose-950 font-bold ring-1 ring-rose-500/20";
                              badge = (
                                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-extrabold text-[10px] shadow-2xs flex items-center gap-1 shrink-0">
                                  ✗ Your Answer (Incorrect)
                                </span>
                              );
                            }

                            return (
                              <div
                                key={opt.id}
                                className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${optionStyle}`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className={`size-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 border ${
                                    isCorrectAnswer
                                      ? "bg-emerald-600 text-white border-emerald-600"
                                      : isUserSelected
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : "bg-white text-slate-600 border-slate-200"
                                  }`}>
                                    {opt.id}
                                  </span>
                                  <span className="font-semibold leading-snug">
                                    {opt.text}
                                  </span>
                                </div>

                                {badge}
                              </div>
                            );
                          })}
                        </div>

                        {/* Step-by-Step Explanation / Verification Box */}
                        {q.explanation && (
                          <div className="mt-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1.5 text-xs">
                            <div className="flex items-center gap-1.5 font-black text-amber-900 uppercase tracking-wider text-[10px]">
                              <span>💡 Step-by-Step Solution & Verification:</span>
                            </div>
                            <p className="font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            Exam answers verified and archived.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer ml-auto"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
}
