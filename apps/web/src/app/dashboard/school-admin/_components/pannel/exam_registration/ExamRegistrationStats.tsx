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
        <div className="w-14 h-14 rounded-full bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <Users className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Total Registrations</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">
            {totalRegistrationsCount.toLocaleString()}
          </h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Across all exams</p>
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
        <div className="w-14 h-14 rounded-full bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0">
          <Clock className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Registration Pending</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">
            {pendingCount.toLocaleString()}
          </h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Yet to be completed</p>
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
        <div className="w-14 h-14 rounded-full bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <Calendar className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Registration Closed</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">
            {closedCount.toLocaleString()}
          </h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Closed exams</p>
        </div>
      </div>
    </div>
  );
}
