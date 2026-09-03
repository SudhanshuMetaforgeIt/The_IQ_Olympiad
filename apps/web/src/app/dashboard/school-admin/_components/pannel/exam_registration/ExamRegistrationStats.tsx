"use client";

import { Users, Clock, Calendar } from "lucide-react";
import { ActiveCardType } from "./types";

interface ExamRegistrationStatsProps {
  activeCard: ActiveCardType;
  setActiveCard: (card: ActiveCardType) => void;
  totalRegistrationsCount: number;
  pendingCount: number;
  closedCount: number;
}

export function ExamRegistrationStats({
  activeCard,
  setActiveCard,
  totalRegistrationsCount,
  pendingCount,
  closedCount,
}: ExamRegistrationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Card 1: Total Registrations */}
      <div
        onClick={() => setActiveCard("all")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${
          activeCard === "all"
            ? "border-purple-600 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-purple-300"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-purple-100/90 text-[#6332ec] flex items-center justify-center shrink-0">
          <Users className="w-8 h-8 stroke-[2]" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-semibold text-slate-600">Total Registrations</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums tracking-tight mt-0.5">
            {totalRegistrationsCount.toLocaleString()}
          </h2>
          <p className="text-xs sm:text-sm font-normal text-slate-400 mt-1">Across all exams</p>
        </div>
      </div>

      {/* Card 2: Registration Pending */}
      <div
        onClick={() => setActiveCard("pending")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${
          activeCard === "pending"
            ? "border-amber-500 ring-4 ring-amber-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-amber-300"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0">
          <Clock className="w-8 h-8 stroke-[2]" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-semibold text-slate-600">Registration Pending</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums tracking-tight mt-0.5">
            {pendingCount.toLocaleString()}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-amber-600 mt-1">Yet to be completed</p>
        </div>
      </div>

      {/* Card 3: Registration Closed */}
      <div
        onClick={() => setActiveCard("closed")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${
          activeCard === "closed"
            ? "border-purple-500 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-purple-300"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-purple-100/90 text-[#6332ec] flex items-center justify-center shrink-0">
          <Calendar className="w-8 h-8 stroke-[2]" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-semibold text-slate-600">Registration Closed</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums tracking-tight mt-0.5">
            {closedCount.toLocaleString()}
          </h2>
          <p className="text-xs sm:text-sm font-normal text-slate-400 mt-1">Closed exams</p>
        </div>
      </div>
    </div>
  );
}
