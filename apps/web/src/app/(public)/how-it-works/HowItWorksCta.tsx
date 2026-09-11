"use client";

import React from "react";

export default function HowItWorksCta() {
  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-20">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#240046] via-[#3c096c] to-[#5a189a] text-white flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-6 shadow-2xl">
        <div className="size-20 sm:size-24 rounded-3xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-inner">
          🏆
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-300 block mb-1.5">
            READY TO GET STARTED?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Begin Your Olympiad Journey Today
          </h3>
          <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-2xl leading-relaxed">
            Join thousands of students who are already learning, practicing, and achieving with The IQ Olympiad.
          </p>
        </div>
      </div>
    </section>
  );
}
