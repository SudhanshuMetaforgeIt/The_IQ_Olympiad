import React from "react";
import { ShieldStarIcon, StarIcon } from "./icons";

interface AchievementsCardProps {
  onViewAll?: () => void;
}

export function AchievementsCard({ onViewAll }: AchievementsCardProps) {
  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      {/* Achievements Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex-1 flex flex-col items-center justify-between text-center min-h-[340px]">
        {/* Card Header */}
        <div className="w-full flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Achievements</h3>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-violet-600 hover:text-violet-800 transition cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Shield Graphic with Arcs */}
        <div className="relative my-6 flex items-center justify-center">
          {/* Curved side accent lines */}
          <div className="absolute w-40 h-28 border-t-2 border-indigo-400/60 rounded-t-full -translate-y-2 pointer-events-none" />
          <div className="relative p-3 text-indigo-600">
            <ShieldStarIcon className="w-28 h-28 fill-indigo-600 drop-shadow-md" />
          </div>
        </div>

        {/* Text Section */}
        <div className="mb-2">
          <h4 className="text-base font-extrabold text-slate-900">Keep going!</h4>
          <p className="text-xs font-medium text-slate-500 mt-1 max-w-[220px] mx-auto leading-relaxed">
            You&apos;re doing great. Complete exams and earn badges.
          </p>
        </div>
      </div>

      {/* Encouraging Banner Box */}
      <div className="bg-amber-50/90 border border-amber-100 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
        <div className="size-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
          <StarIcon className="w-5 h-5 fill-white" />
        </div>
        <div>
          <h5 className="text-xs font-extrabold text-slate-900">
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
