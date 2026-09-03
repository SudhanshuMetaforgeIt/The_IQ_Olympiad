import React from "react";

interface PracticeEndTestModalProps {
  isOpen: boolean;
  answeredCount: number;
  notAnsweredCount: number;
  markedCount: number;
  onResume: () => void;
  onConfirmEnd: () => void;
}

export function PracticeEndTestModal({
  isOpen,
  answeredCount,
  notAnsweredCount,
  markedCount,
  onResume,
  onConfirmEnd,
}: PracticeEndTestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5 animate-in zoom-in-95 duration-200">
        {/* Warning Icon */}
        <div className="size-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-xs">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            End Practice Test?
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Are you sure you want to finish and submit your test?
          </p>
        </div>

        {/* Test Summary Breakdown */}
        <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Answered</span>
            <span className="text-lg font-black text-emerald-600">{answeredCount}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Unanswered</span>
            <span className="text-lg font-black text-slate-700">{notAnsweredCount}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Marked</span>
            <span className="text-lg font-black text-violet-600">{markedCount}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onResume}
            className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 font-black text-sm hover:bg-slate-50 transition cursor-pointer"
          >
            Resume Test
          </button>
          <button
            type="button"
            onClick={onConfirmEnd}
            className="flex-1 py-3 rounded-2xl bg-[#E11D48] text-white font-black text-sm hover:bg-[#BE123C] shadow-md shadow-rose-500/25 transition cursor-pointer"
          >
            Yes, End Test
          </button>
        </div>
      </div>
    </div>
  );
}
