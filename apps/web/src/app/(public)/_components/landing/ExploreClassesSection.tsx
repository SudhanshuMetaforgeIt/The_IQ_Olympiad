"use client";

import React from "react";
import Link from "next/link";

export default function ExploreClassesSection() {
  return (
    <section className="py-10 bg-white w-full font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Classes 7-8 */}
          <Link
            href="/subjects"
            className="p-10 rounded-3xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/60 transition-all cursor-pointer flex flex-col justify-between group min-h-[220px]"
          >
            <div>
              <span className="text-sm font-black text-purple-700 tracking-wide uppercase">
                Explore by Class
              </span>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-3 group-hover:text-purple-900 transition-colors">
                Classes 7–8
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-semibold">
                Build strong concepts and foundations.
              </p>
            </div>
          </Link>

          {/* Card 2: Classes 9-10 */}
          <Link
            href="/subjects"
            className="p-10 rounded-3xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/60 transition-all cursor-pointer flex flex-col justify-between group min-h-[220px]"
          >
            <div>
              <span className="text-sm font-black text-purple-700 tracking-wide uppercase">
                Grow with confidence
              </span>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3 mb-3 group-hover:text-purple-900 transition-colors">
                Classes 9–10
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-semibold">
                Sharpen skills and compete.
              </p>
            </div>
          </Link>

          {/* Card 3: Classes 11-12 */}
          <Link
            href="/subjects"
            className="p-10 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-fuchsia-900 text-white shadow-xl shadow-purple-950/20 hover:scale-[1.01] transition-transform cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <span className="text-sm font-black text-purple-200 tracking-wide uppercase">
                Aim higher
              </span>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight mt-3 mb-3 text-white">
                Classes 11–12
              </h3>
              <p className="text-base sm:text-lg text-purple-100/90 font-semibold">
                Master advanced Olympiad challenges.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
