"use client";

import React from "react";

interface EarnedBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarnedBadgesModal({
  isOpen,
  onClose,
}: EarnedBadgesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏅</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                My Earned Badges
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Your unlocked achievement badges will appear here.
              </p>
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

        {/* Modal Body - Empty state */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex items-center justify-center min-h-[200px]">
          <div className="text-center space-y-2">
            <div className="size-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-2xl mx-auto">
              🏅
            </div>
            <p className="text-sm font-bold text-slate-700">No badges earned yet</p>
            <p className="text-xs font-medium text-slate-500 max-w-[260px]">
              Complete exams and practice tests to unlock achievement badges.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
