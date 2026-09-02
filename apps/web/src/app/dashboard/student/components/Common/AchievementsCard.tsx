"use client";

import React, { useState, useRef } from "react";
import { StarIcon } from "./icons";
import {
  OlympiadAchieverBadgeGraphic,
  ProblemSolverBadgeGraphic,
} from "../pannel/Certificates/badgeIcons";

interface AchievementsCardProps {
  onViewAll?: () => void;
}

const EARNED_BADGES = [
  {
    id: "olympiad-achiever",
    title: "Olympiad Achiever",
    badgeType: "⭐ Top Badge",
    typeBadgeColor: "bg-amber-100 text-amber-900 border-amber-200",
    description: "Earned for scoring top 10% national rank in Science Olympiad 2026.",
    date: "28 Aug 2026",
    highlightStat: "🏆 Top 9.9% Rank",
    graphic: <OlympiadAchieverBadgeGraphic className="w-24 h-24 sm:w-28 sm:h-28" />,
    auraGlow: "from-amber-400/30 via-yellow-300/20 to-transparent",
  },
  {
    id: "problem-solver",
    title: "Problem Solver",
    badgeType: "🧠 Logic Master",
    typeBadgeColor: "bg-violet-100 text-violet-900 border-violet-200",
    description: "Earned for scoring 90% in Mathematics Olympiad with high accuracy.",
    date: "18 Sep 2026",
    highlightStat: "🧠 90% Score",
    graphic: <ProblemSolverBadgeGraphic className="w-24 h-24 sm:w-28 sm:h-28" />,
    auraGlow: "from-violet-500/30 via-purple-300/20 to-transparent",
  },
];

export function AchievementsCard({ onViewAll }: AchievementsCardProps) {
  const [activeBadgeIdx, setActiveBadgeIdx] = useState(0);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const currentBadge = EARNED_BADGES[activeBadgeIdx];

  // Mouse Movement 3D Interactive Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  const nextBadge = () => {
    setActiveBadgeIdx((prev) => (prev + 1) % EARNED_BADGES.length);
  };

  const prevBadge = () => {
    setActiveBadgeIdx((prev) => (prev - 1 + EARNED_BADGES.length) % EARNED_BADGES.length);
  };

  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      {/* Achievements Interactive Showcase Box */}
      <div className="bg-gradient-to-b from-[#FAF8FF] via-white to-violet-50/40 rounded-3xl p-5 sm:p-6 border border-violet-200/80 shadow-xs flex-1 flex flex-col justify-between text-center relative overflow-hidden group min-h-[460px]">
        {/* Background Ambient Radial Glow */}
        <div
          className={`absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-radial ${currentBadge.auraGlow} blur-3xl pointer-events-none transition-all duration-700`}
        />

        {/* Card Header */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏅</span>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Achievements
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-bold text-violet-700 hover:text-violet-900 transition cursor-pointer flex items-center gap-1 bg-white hover:bg-violet-50 px-3 py-1.5 rounded-xl shadow-2xs border border-violet-200/80"
          >
            <span>View All</span>
            <span className="text-violet-500 font-bold">›</span>
          </button>
        </div>

        {/* 3D Showcase Stage / Pedestal */}
        <div className="relative my-2 flex flex-col items-center justify-center select-none z-10 py-1">
          {/* Orbital Radiant Rings */}
          <div className="absolute inset-0 -m-4 rounded-full border border-violet-200/60 animate-aura-pulse pointer-events-none" />
          <div className="absolute inset-0 -m-7 rounded-full border border-dashed border-amber-300/50 animate-spin [animation-duration:35s] pointer-events-none" />

          {/* Animated Floating Sparkles */}
          <span className="absolute -top-3 left-6 text-amber-400 text-sm animate-sparkle-spin pointer-events-none">
            ✦
          </span>
          <span className="absolute top-2 right-4 text-violet-500 text-xs animate-sparkle-spin [animation-duration:2.5s] pointer-events-none">
            ★
          </span>
          <span className="absolute bottom-6 left-4 text-amber-400 text-xs animate-pulse pointer-events-none">
            ✦
          </span>

          {/* Movable Floating Badge with Interactive 3D Cursor Tilt */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="animate-badge-float filter drop-shadow-xl transition-transform cursor-grab active:cursor-grabbing p-1"
          >
            {currentBadge.graphic}
          </div>

          {/* Glowing Pedestal Base Shadow */}
          <div className="w-28 h-3.5 mt-1 bg-gradient-to-r from-transparent via-violet-300/40 to-transparent rounded-full blur-xs" />

          {/* Badge Type Tag */}
          <span
            className={`mt-2 inline-block px-3 py-1 rounded-full border font-black text-[11px] shadow-2xs transition-colors duration-300 ${currentBadge.typeBadgeColor}`}
          >
            {currentBadge.badgeType}
          </span>
        </div>

        {/* Badge Description Card & Controls */}
        <div className="space-y-3 w-full z-10">
          {/* Frosted Badge Detail Container */}
          <div className="bg-white/85 backdrop-blur-xs border border-violet-100/90 rounded-2xl p-3.5 shadow-2xs space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h4 className="text-base font-black text-slate-900 tracking-tight">
                {currentBadge.title}
              </h4>
              <span className="size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
            </div>

            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-[260px] mx-auto">
              {currentBadge.description}
            </p>

            {/* Quick Metrics Chips Row */}
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                📅 {currentBadge.date}
              </span>
              <span className="text-[10px] font-extrabold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-lg">
                {currentBadge.highlightStat}
              </span>
            </div>
          </div>

          {/* Slider Controls (Prev / Next & Indicator Pills) */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prevBadge}
              className="size-7 rounded-full bg-white hover:bg-violet-50 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold transition cursor-pointer shadow-2xs"
              title="Previous Badge"
            >
              ‹
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {EARNED_BADGES.map((b, idx) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveBadgeIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeBadgeIdx === idx
                      ? "w-6 bg-violet-600 shadow-2xs"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to ${b.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextBadge}
              className="size-7 rounded-full bg-white hover:bg-violet-50 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold transition cursor-pointer shadow-2xs"
              title="Next Badge"
            >
              ›
            </button>
          </div>

          {/* Next Badge in Progress Box */}
          <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-3 text-left flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center text-xs shrink-0 font-bold">
                🎯
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block leading-none">
                  Next Milestone
                </span>
                <span className="text-xs font-black text-slate-900 leading-tight">
                  Accuracy Master
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-black text-violet-700">76%</span>
              <span className="text-[10px] font-bold text-slate-400"> / 90%</span>
              <div className="w-16 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <div className="bg-violet-600 h-1.5 rounded-full w-[84%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Encouraging Banner Box */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-xs">
        <div className="size-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20">
          <StarIcon className="w-5 h-5 fill-white" />
        </div>
        <div>
          <h5 className="text-xs font-black text-slate-900">
            You are doing great!
          </h5>
          <p className="text-[11px] font-medium text-slate-600 leading-snug mt-0.5">
            Keep practicing and stay consistent. Success is on your way!
          </p>
        </div>
      </div>
    </div>
  );
}
