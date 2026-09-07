"use client";

import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { MeritListRecord } from "./types";

interface ResultsMeritListTableProps {
  students: MeritListRecord[];
}

export function ResultsMeritListTable({ students }: ResultsMeritListTableProps) {
  const [selectedMedal, setSelectedMedal] = useState<string>("All");

  const filteredStudents = students.filter((s) =>
    selectedMedal === "All" ? true : s.medal === selectedMedal
  );

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1.5 font-black text-amber-500 text-sm">
          <Trophy className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
          <span>1</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1.5 font-black text-slate-400 text-sm">
          <Trophy className="w-5 h-5 text-slate-400 fill-slate-300 shrink-0" />
          <span>2</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center gap-1.5 font-black text-amber-700 text-sm">
          <Trophy className="w-5 h-5 text-amber-700 fill-amber-600 shrink-0" />
          <span>3</span>
        </div>
      );
    }
    return <span className="font-extrabold text-slate-700 px-2">{rank}</span>;
  };

  const getMedalBadge = (medal: "Gold" | "Silver" | "Bronze") => {
    if (medal === "Gold") {
      return (
        <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-extrabold shadow-2xs">
          Gold
        </span>
      );
    }
    if (medal === "Silver") {
      return (
        <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-extrabold shadow-2xs">
          Silver
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-extrabold shadow-2xs">
        Bronze
      </span>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
      {/* Title & Medal Filter Pills Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
          Merit List (1,256 Students)
        </h3>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedMedal("All")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedMedal === "All"
                ? "bg-purple-100 text-purple-700 border border-purple-300 shadow-2xs"
                : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            All (1,256)
          </button>
          <button
            type="button"
            onClick={() => setSelectedMedal("Gold")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedMedal === "Gold"
                ? "bg-amber-100 text-amber-700 border border-amber-300 shadow-2xs"
                : "bg-amber-50/70 text-amber-700 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            Gold (10)
          </button>
          <button
            type="button"
            onClick={() => setSelectedMedal("Silver")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedMedal === "Silver"
                ? "bg-slate-200 text-slate-800 border border-slate-300 shadow-2xs"
                : "bg-slate-100/70 text-slate-600 border border-slate-200 hover:bg-slate-200"
            }`}
          >
            Silver (40)
          </button>
          <button
            type="button"
            onClick={() => setSelectedMedal("Bronze")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedMedal === "Bronze"
                ? "bg-amber-200/80 text-amber-900 border border-amber-300 shadow-2xs"
                : "bg-orange-50/80 text-amber-800 border border-amber-200 hover:bg-orange-100"
            }`}
          >
            Bronze (50)
          </button>
        </div>
      </div>

      {/* Table Shell */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/60">
              <th className="py-3.5 px-4 min-w-[70px]">Rank</th>
              <th className="py-3.5 px-4 min-w-[200px]">Student Name</th>
              <th className="py-3.5 px-4 min-w-[130px]">Registration ID</th>
              <th className="py-3.5 px-4 min-w-[100px]">Roll No.</th>
              <th className="py-3.5 px-4 min-w-[220px]">School</th>
              <th className="py-3.5 px-4 min-w-[80px]">Class</th>
              <th className="py-3.5 px-4 min-w-[140px]">Score (out of 100)</th>
              <th className="py-3.5 px-4 min-w-[110px]">Percentage</th>
              <th className="py-3.5 px-4 min-w-[110px]">Medal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">{getRankBadge(st.rank)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100/90 text-purple-700 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
                        {st.avatarInitials}
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {st.studentName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">{st.registrationId}</td>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">{st.rollNo}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-slate-900 text-sm leading-snug">{st.schoolName}</span>
                      <span className="text-xs font-semibold text-slate-400">{st.schoolLocation}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">{st.classNum}</td>
                  <td className="py-4 px-4 font-black text-amber-600 text-sm">{st.score}</td>
                  <td className="py-4 px-4 font-black text-emerald-600 text-sm">{st.percentage}</td>
                  <td className="py-4 px-4">{getMedalBadge(st.medal)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-400 font-semibold">
                  No merit list students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
