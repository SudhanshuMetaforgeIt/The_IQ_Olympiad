"use client";

import React from "react";
import type { PracticeQuestion } from "./types";

interface PracticeQuestionCardProps {
  currentQ: PracticeQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer?: string;
  isMarkedForReview: boolean;
  onSelectOption: (key: string) => void;
  onToggleMarkForReview: () => void;
}

export function PracticeQuestionCard({
  currentQ,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  isMarkedForReview,
  onSelectOption,
  onToggleMarkForReview,
}: PracticeQuestionCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      {/* Question Index & Mark for Review Toggle */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <span className="text-sm font-bold text-slate-500">
          Question <strong className="text-violet-700 font-black">{currentQuestionIndex + 1}</strong> of {totalQuestions}
        </span>

        <button
          type="button"
          onClick={onToggleMarkForReview}
          className="flex items-center gap-1.5 text-xs font-black text-violet-600 hover:text-violet-800 transition cursor-pointer"
        >
          <span className="text-base leading-none">☆</span>
          <span>{isMarkedForReview ? "Marked for Review" : "Mark for Review"}</span>
        </button>
      </div>

      {/* Question Text */}
      <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
        {currentQ.text}
      </h2>

      {/* Options List */}
      <div className="space-y-3.5">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAnswer === opt.key;

          return (
            <div
              key={opt.key}
              onClick={() => onSelectOption(opt.key)}
              className={`p-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                isSelected
                  ? "bg-violet-50/70 border-2 border-violet-600 shadow-xs"
                  : "bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`size-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                    isSelected
                      ? "bg-violet-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {opt.key}
                </div>
                <span
                  className={`text-sm ${
                    isSelected ? "font-bold text-slate-900" : "font-medium text-slate-700"
                  }`}
                >
                  {opt.text}
                </span>
              </div>

              {/* Radio Indicator */}
              <div
                className={`size-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "border-violet-600 bg-violet-600"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && <div className="size-2 rounded-full bg-white" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
