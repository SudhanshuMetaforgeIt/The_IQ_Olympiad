"use client";

import { Users, Award, TrendingUp, ShieldCheck } from "lucide-react";
import { ActiveCardType } from "./types";

interface ResultStatsCardsProps {
  activeCard: ActiveCardType;
  setActiveCard: (card: ActiveCardType) => void;
  appearedStudentsCount?: number;
  qualifiedStudentsCount?: number;
  qualifiedPercentage?: string;
  avgStudentsScore?: string;
  meritStudentName?: string;
  meritStudentScore?: string;
}

export function ResultStatsCards({
  activeCard,
  setActiveCard,
  appearedStudentsCount = 1624,
  qualifiedStudentsCount = 1418,
  qualifiedPercentage = "87.31% Qualified",
  avgStudentsScore = "78.6%",
  meritStudentName = "Aarav Sharma",
  meritStudentScore = "99.2% in NSO",
}: ResultStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: Appeared Students */}
      <div
        onClick={() => setActiveCard("appeared")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "appeared"
            ? "border-purple-600 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-purple-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <Users className="w-7 h-7" />
        </div>
        <div>
          <p className="text-sm sm:text-base font-extrabold text-slate-800">Appeared Students</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">{appearedStudentsCount.toLocaleString()}</h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">Across all exams</p>
        </div>
      </div>

      {/* Card 2: Qualified Students */}
      <div
        onClick={() => setActiveCard("qualified")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center justify-between ${activeCard === "qualified"
            ? "border-emerald-500 ring-4 ring-emerald-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-emerald-300"
          }`}
      >
        <div className="flex items-center space-x-5">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-extrabold text-slate-800">Qualified Students</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">{qualifiedStudentsCount.toLocaleString()}</h2>
            <p className="text-xs font-bold text-emerald-600 mt-0.5">{qualifiedPercentage}</p>
          </div>
        </div>
      </div>

      {/* Card 3: Avg Students Score */}
      <div
        onClick={() => setActiveCard("avg_score")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "avg_score"
            ? "border-amber-500 ring-4 ring-amber-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-amber-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div>
          <p className="text-sm sm:text-base font-extrabold text-slate-800">Avg Students Score</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">{avgStudentsScore}</h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">Average percentage</p>
        </div>
      </div>

      {/* Card 4: Merit Student */}
      <div
        onClick={() => setActiveCard("merit")}
        className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 transform cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-98 flex items-center space-x-5 ${activeCard === "merit"
            ? "border-purple-500 ring-4 ring-purple-500/15 shadow-md scale-[1.01]"
            : "border-slate-200/80 hover:border-purple-300"
          }`}
      >
        <div className="w-14 h-14 rounded-3xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <p className="text-sm sm:text-base font-extrabold text-slate-800">Merit Student</p>
          <h2 className="text-lg font-black text-slate-900 truncate max-w-[150px]">{meritStudentName}</h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">{meritStudentScore}</p>
        </div>
      </div>
    </div>
  );
}
