"use client";

import React from "react";

export default function AIPoweredLearningBanner() {
  const points = [
    "Topic-level strengths and gaps",
    "Difficulty matched to your progress",
    "Clear, actionable next steps",
  ];

  return (
    <section className="py-12 bg-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1920px] mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-50/90 via-purple-50/50 to-indigo-50/40 border border-purple-100/80 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column */}
          <div className="flex-1 text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-purple-900 border border-purple-200/80 text-xs font-black tracking-wide mb-6 shadow-sm">
              ✨ AI-powered learning
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Know what to learn next.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              THE IQ OLYMPIAD turns performance patterns into practical recommendations — so every practice session has a purpose.
            </p>
          </div>

          {/* Right Column: 3 White Pill Stack */}
          <div className="w-full lg:w-auto flex flex-col gap-4 min-w-[320px] sm:min-w-[420px]">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-100/90 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow"
              >
                <div className="size-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
