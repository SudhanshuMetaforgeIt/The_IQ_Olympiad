"use client";

import React from "react";

interface PracticeSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PracticeSubscriptionModal({
  isOpen,
  onClose,
}: PracticeSubscriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-6 text-white text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
          <div className="size-12 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center mb-3 shadow-inner">
            <span className="text-2xl">👑</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">
            Unlock Unlimited Practice
          </h3>
          <p className="text-violet-100 text-xs mt-1 max-w-sm mx-auto">
            Get unlimited access to Test 11 and above, full length AI-proctored mocks, and in-depth performance analytics.
          </p>
        </div>

        {/* Plans Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl border-2 border-violet-500 bg-violet-50/40 relative">
            <span className="absolute -top-2.5 right-4 bg-violet-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-slate-900 text-sm">
                  Annual Olympiad Master Pass
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Unlimited tests for all 4 subjects for 1 full year
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-violet-700">₹999</span>
                <span className="text-[10px] text-slate-400 block">/ year</span>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 font-semibold border-t border-violet-100 pt-3">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Unlimited practice tests (Tests 11 to 50+)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Detailed step-by-step solution explanations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> AI diagnostic weak-area identification
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition bg-white flex items-center justify-between">
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                Single Subject Pass
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Unlimited tests for 1 selected subject
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-slate-900">₹399</span>
              <span className="text-[10px] text-slate-400 block">/ year</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm shadow-md shadow-violet-600/25 transition cursor-pointer"
          >
            Upgrade to Master Pass
          </button>
        </div>
      </div>
    </div>
  );
}
