"use client";

import React from "react";
import { LightbulbIcon } from "../../Common/icons";

export function ResultsBottomBanner() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-violet-100/70 text-violet-600 flex items-center justify-center shrink-0">
        <LightbulbIcon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-bold text-slate-900">
          Keep practicing to improve your rank and unlock more medals!
        </h4>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          Consistency today, success tomorrow.
        </p>
      </div>
    </div>
  );
}
