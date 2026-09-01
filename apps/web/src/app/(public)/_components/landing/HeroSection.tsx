"use client";

import React from "react";
import Link from "next/link";
import Hero3DScene from "./Hero3DScene";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-8 pb-16 overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Small Badge */}
            <span className="text-micro font-bold text-purple-900 tracking-wider uppercase mb-4">
              FOR CLASSES 7 TO 12
            </span>

            {/* Main Headline */}
            <h1 className="text-display font-bold text-slate-900 tracking-tight mb-6">
              WELCOME TO{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                INTELLIQUEST 2026
              </span>
              <br />
              <span className="text-h1 italic font-extrabold inline-block pr-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent mt-3">
                Where Curious Minds Become Future Leaders...
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-body-lg text-slate-600 font-regular leading-relaxed max-w-xl mb-8">
              India&apos;s next-generation intellectual challenge platform
              <br />
              designed to discover, develop and celebrate young talent....
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link href="/signup">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-8 py-3.5 text-button font-medium text-white shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Start Learning →
                </button>
              </Link>

              <Link href="/olympiads">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-purple-200/90 bg-purple-50/50 px-7 py-3.5 text-button font-medium text-purple-950 hover:bg-purple-100/70 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  Explore Olympiads ✨
                </button>
              </Link>
            </div>

            {/* Trust Badges Checklist */}
            <div className="flex flex-wrap items-center gap-6 text-body-sm font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="text-purple-600 font-bold">✓</span> Trusted learning
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-purple-600 font-bold">✓</span> Expert-designed
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-purple-600 font-black">✓</span> Safe & ad-free
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
