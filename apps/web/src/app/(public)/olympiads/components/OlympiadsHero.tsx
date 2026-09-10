import React from "react";
import { Trophy, Sparkles } from "lucide-react";

export default function OlympiadsHero() {
  return (
    <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 pt-1">
      {/* Left Text */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-purple-700 text-[11px] font-bold tracking-wide uppercase mb-3 shadow-2xs">
          <Sparkles className="size-3 text-purple-600 animate-pulse" />
          <span>National & Global Competitions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
          Explore{" "}
          <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-xs">
            Olympiads
          </span>
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl font-normal">
          Discover and participate in prestigious intellectual competitions designed
          to challenge your mind, benchmark your skills, and shape your academic future.
        </p>
      </div>

      {/* Right Decorative Badge */}
      <div className="relative self-center lg:self-auto flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#faf7ff] via-[#f5efff] to-[#f8f2ff] p-4 sm:p-5 border border-purple-200/80 shadow-md shadow-purple-950/5 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
        {/* Floating Sparkles */}
        <div className="absolute -top-2.5 -left-2.5 text-purple-500">
          <Sparkles className="size-4 animate-pulse" />
        </div>
        <div className="absolute -bottom-1.5 right-2 text-purple-400">
          <Sparkles className="size-3.5" />
        </div>

        {/* Trophy Icon Container */}
        <div className="relative flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-600/30">
          <Trophy className="size-8 sm:size-9 fill-white/20 stroke-white stroke-[1.8]" />
        </div>

        {/* Motivational Words */}
        <div className="flex flex-col pr-2">
          <span className="text-sm sm:text-base font-black tracking-tight text-purple-950 leading-tight">
            Think
          </span>
          <span className="text-sm sm:text-base font-black tracking-tight text-purple-950 leading-tight">
            Compete
          </span>
          <div className="relative inline-block">
            <span className="text-sm sm:text-base font-black tracking-tight text-purple-950 leading-tight">
              Grow
            </span>
            {/* Curved Swoosh Underline */}
            <svg
              className="absolute -bottom-2 left-0 w-12 text-purple-600 overflow-visible"
              height="6"
              viewBox="0 0 50 6"
              fill="none"
            >
              <path
                d="M1 4.5C12 1.5 35 1.5 49 4.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

