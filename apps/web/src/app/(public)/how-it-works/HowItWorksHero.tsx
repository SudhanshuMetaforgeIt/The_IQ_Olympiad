"use client";

import React from "react";

export default function HowItWorksHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1b053a] via-[#2d0a52] to-[#3c096c] text-white py-14 sm:py-18 px-4 text-center">
      <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 text-purple-200 border border-purple-300/20 mb-4 backdrop-blur-sm">
        YOUR JOURNEY TO EXCELLENCE
      </span>
      <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">How The IQ Olympiad Works</h1>
      <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-xl mx-auto mb-8">
        A simple, structured way to learn, practice, compete, and measure your progress.
      </p>

      {/* 4 Feature Pills */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-purple-100">
        <span className="flex items-center gap-1.5"><span className="text-sm">🎓</span> Learn</span>
        <span className="flex items-center gap-1.5"><span className="text-sm">📊</span> Practice</span>
        <span className="flex items-center gap-1.5"><span className="text-sm">🏆</span> Compete</span>
        <span className="flex items-center gap-1.5"><span className="text-sm">📈</span> Achieve</span>
      </div>
    </section>
  );
}
