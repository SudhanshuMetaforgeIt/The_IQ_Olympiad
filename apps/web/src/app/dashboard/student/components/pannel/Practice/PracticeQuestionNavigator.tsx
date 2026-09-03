import React from "react";

interface PracticeQuestionNavigatorProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  markedForReview: number[];
  onSelectQuestion: (index: number) => void;
  onClearResponse: () => void;
}

export function PracticeQuestionNavigator({
  totalQuestions,
  currentQuestionIndex,
  answers,
  markedForReview,
  onSelectQuestion,
  onClearResponse,
}: PracticeQuestionNavigatorProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
      <h3 className="text-base font-black text-slate-900">
        Question Navigator
      </h3>

      {/* Legend Items */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-emerald-500" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-violet-600 ring-2 ring-violet-200" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-slate-200" />
          <span>Not Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-violet-600 text-sm">☆</span>
          <span>Marked for Review</span>
        </div>
      </div>

      {/* 5x10 Questions Grid (1 to 50) */}
      <div className="grid grid-cols-5 gap-2.5 pt-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const qNum = idx + 1;
          const isCurrent = currentQuestionIndex === idx;
          const isAnswered = !!answers[qNum];
          const isMarked = markedForReview.includes(qNum);

          let buttonStyle = "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100";
          if (isCurrent) {
            buttonStyle = "bg-violet-50/80 border-2 border-violet-600 text-violet-700 font-black shadow-xs";
          } else if (isAnswered) {
            buttonStyle = "bg-emerald-600 border border-emerald-600 text-white font-black shadow-xs";
          }

          return (
            <button
              key={qNum}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`h-10 rounded-xl font-extrabold text-xs relative flex items-center justify-center transition-all cursor-pointer ${buttonStyle}`}
            >
              <span>{qNum}</span>
              {isMarked && (
                <span className="absolute top-0.5 right-1 text-[10px] text-violet-700 font-bold">
                  ☆
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Clear Response Button */}
      <button
        type="button"
        onClick={onClearResponse}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-violet-200 text-violet-700 font-bold text-xs hover:bg-violet-50 transition cursor-pointer"
      >
        <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        <span>Clear Response</span>
      </button>
    </div>
  );
}
