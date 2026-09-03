"use client";

import React from "react";
import Link from "next/link";
import Hero3DScene from "./Hero3DScene";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-10 pb-20 overflow-hidden bg-white font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Small Badge */}
            <span className="text-sm sm:text-base font-black text-purple-900 tracking-wider uppercase mb-4">
              FOR CLASSES 7 TO 12
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              WELCOME TO{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                INTELLIQUEST 2026
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl italic font-extrabold inline-block pr-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent mt-3">
                Where Curious Minds Become Future Leaders...
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-semibold leading-relaxed max-w-2xl mb-9">
              India&apos;s next-generation intellectual challenge platform
              <br />
              designed to discover, develop and celebrate young talent....
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-9">
              <Link href="/signup">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-9 py-4 text-sm sm:text-base font-black text-white shadow-xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Start Learning →
                </button>
              </Link>

              <Link href="/olympiads">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-purple-200/90 bg-purple-50/50 px-8 py-4 text-sm sm:text-base font-black text-purple-950 hover:bg-purple-100/70 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  Explore Olympiads ✨
                </button>
              </Link>
            </div>

            {/* Trust Badges Checklist */}
            <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-extrabold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-black text-lg">✓</span> Trusted learning
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-black text-lg">✓</span> Expert-designed
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-black text-lg">✓</span> Safe & ad-free
              </div>
            </div>
          </div>

          {/* Right Column: 3D Scene Card */}
          <div className="lg:col-span-6 w-full">
            <Hero3DScene />
          </div>
        </div>
      </div>
    </section>
  );
}
