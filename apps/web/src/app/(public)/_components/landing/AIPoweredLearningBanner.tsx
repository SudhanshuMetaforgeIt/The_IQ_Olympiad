"use client";

import React from "react";

export default function AIPoweredLearningBanner() {
  const points = [
    "Topic-level strengths and gaps",
    "Difficulty matched to your progress",
    "Clear, actionable next steps",
  ];

  return (
    <section className="py-14 bg-white w-full font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-50/90 via-purple-50/50 to-indigo-50/40 border border-purple-100/80 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Column */}
          <div className="flex-1 text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-purple-900 border border-purple-200/80 text-sm font-black tracking-wide mb-6 shadow-sm">
              ✨ AI-powered learning
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-5">
              Know what to learn next.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed max-w-xl">
              THE IQ OLYMPIAD turns performance patterns into practical recommendations — so every practice session has a purpose.
            </p>
          </div>

          {/* Right Column: 3 White Pill Stack */}
          <div className="w-full lg:w-auto flex flex-col gap-4 min-w-[320px] sm:min-w-[440px]">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5.5 rounded-2xl bg-white border border-slate-100/90 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="size-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm shrink-0">
                  ✓
                </div>
                <span className="text-base sm:text-lg font-black text-slate-900">
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
