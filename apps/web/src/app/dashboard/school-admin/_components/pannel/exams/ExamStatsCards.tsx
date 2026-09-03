"use client";

import { FileText, UserCheck, Calendar, CheckSquare } from "lucide-react";
import { ActiveCardType } from "./types";

interface ExamStatsCardsProps {
  activeCard: ActiveCardType;
  setActiveCard: (card: ActiveCardType) => void;
  totalExamsCount: number;
  activeExamsCount: number;
  upcomingExamsCount: number;
  completedExamsCount: number;
}

export function ExamStatsCards({
  activeCard,
  setActiveCard,
  totalExamsCount,
  activeExamsCount,
  upcomingExamsCount,
  completedExamsCount,
}: ExamStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: Total Exams */}
      <div
        onClick={() => setActiveCard("all")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "all"
          ? "border-purple-600 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
          : "border-slate-200/80 hover:border-purple-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Total Exams</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">{totalExamsCount}</h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Across all classes</p>
        </div>
      </div>

      {/* Card 2: Active Exams */}
      <div
        onClick={() => setActiveCard("active")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "active"
          ? "border-emerald-500 ring-4 ring-emerald-500/15 shadow-md scale-[1.01]"
          : "border-slate-200/80 hover:border-emerald-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0">
          <UserCheck className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Active Exams</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">{activeExamsCount}</h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Registration open</p>
        </div>
      </div>

      {/* Card 3: Upcoming Exams */}
      <div
        onClick={() => setActiveCard("upcoming")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "upcoming"
          ? "border-purple-500 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
          : "border-slate-200/80 hover:border-purple-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <Calendar className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Upcoming Exams</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">{upcomingExamsCount}</h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Starting soon</p>
        </div>
      </div>

      {/* Card 4: Completed Exams */}
      <div
        onClick={() => setActiveCard("completed")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "completed"
          ? "border-pink-500 ring-4 ring-pink-500/15 shadow-md scale-[1.01]"
          : "border-slate-200/80 hover:border-pink-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-pink-100/90 text-pink-600 flex items-center justify-center shrink-0">
          <CheckSquare className="w-7 h-7" />
        </div>
        <div>
          <p className="text-secondary font-medium text-slate-500">Completed Exams</p>
          <h2 className="text-stat font-bold text-slate-900 tabular-nums">{completedExamsCount}</h2>
          <p className="text-caption font-normal text-slate-400 mt-0.5">Completed</p>
        </div>
      </div>
    </div>
  );
}
