"use client";

import { Users, ShieldCheck, Calendar } from "lucide-react";
import { ActiveCardType } from "./types";

interface StudentStatsCardsProps {
  activeCard: ActiveCardType;
  setActiveCard: (card: ActiveCardType) => void;
  totalCount: number;
  registeredCount: number;
}

export function StudentStatsCards({
  activeCard,
  setActiveCard,
  totalCount,
  registeredCount,
}: StudentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Card 1: Total Students */}
      <div
        onClick={() => setActiveCard("total")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${
          activeCard === "total"
            ? "border-purple-600 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-purple-300"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <Users className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Total Students</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">
            {totalCount.toLocaleString()}
          </h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">All students in school</p>
        </div>
      </div>

      {/* Card 2: Total Registered Students */}
      <div
        onClick={() => setActiveCard("registered")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${
          activeCard === "registered"
            ? "border-emerald-500 ring-4 ring-emerald-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-emerald-300"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Total Registered Students</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">
            {registeredCount.toLocaleString()}
          </h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">97.3% of total students</p>
        </div>
      </div>

      {/* Card 3: Classes (Static Display Card) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-5">
        <div className="w-14 h-14 rounded-2xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <Calendar className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Classes</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">12</h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">From Class 1 to 12</p>
        </div>
      </div>
    </div>
  );
}
