import React from "react";

interface PracticeTestBottomBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onToggleMarkForReview: () => void;
}

export function PracticeTestBottomBar({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onToggleMarkForReview,
}: PracticeTestBottomBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-violet-200 text-violet-700 font-black text-sm hover:bg-violet-50 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
      >
        <span>‹ Previous</span>
      </button>

      <button
        type="button"
        onClick={onToggleMarkForReview}
        className="flex items-center gap-2 px-8 py-3 rounded-2xl border border-violet-200 text-violet-700 font-black text-sm hover:bg-violet-50 transition cursor-pointer"
      >
        <span>☆ Mark & Review</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={currentQuestionIndex === totalQuestions - 1}
        className="flex items-center gap-2 px-9 py-3 rounded-2xl bg-violet-600 text-white font-black text-sm hover:bg-violet-700 shadow-md shadow-violet-500/20 transition cursor-pointer"
      >
        <span>Next ›</span>
      </button>
    </div>
  );
}
