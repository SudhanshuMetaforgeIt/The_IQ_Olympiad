"use client";

import React from "react";
import { User } from "lucide-react";
import { MeritStudentItem } from "./types";

interface MeritStudentDetailsCardProps {
  student?: MeritStudentItem;
}

export const MeritStudentDetailsCard: React.FC<MeritStudentDetailsCardProps> = ({
  student = {
    id: "merit-1",
    rank: 1,
    studentName: "Aarav Sharma",
    class: "IX",
    examName: "National Science Olympiad (NSO)",
    scorePercentage: 98.33,
    marksObtained: 59,
    totalMarks: 60,
    publishedOn: "16 May 2025",
  },
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-2xs space-y-5 h-full flex flex-col justify-between">
      {/* Title */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Merit Student Details
        </h3>
      </div>

      {/* Winner Hero Badge with Laurel Wreath */}
      <div className="bg-purple-50/40 rounded-3xl p-6 border border-purple-100/80 flex flex-col items-center justify-center text-center relative overflow-hidden my-auto">
        <div className="relative flex items-center justify-center mb-3">
          {/* Laurel Wreath Left */}
          <div className="text-amber-400 text-4xl font-bold mr-2 select-none">🌿</div>

          {/* Avatar Circle with Rank Badge */}
          <div className="relative">
            <div className="w-22 h-22 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-inner">
              <User className="w-11 h-11 text-slate-200" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs ring-2 ring-white">
              {student.rank}
            </div>
          </div>

          {/* Laurel Wreath Right */}
          <div className="text-amber-400 text-4xl font-bold ml-2 select-none transform scale-x-[-1]">
            🌿
          </div>
        </div>

        {/* Student Name & Rank */}
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">
          {student.studentName}
        </h4>
        <p className="text-xs sm:text-sm font-extrabold text-slate-500 mt-0.5">
          Rank {student.rank} Overall
        </p>
        <p className="text-xl font-black text-[#7c3aed] mt-1">
          {student.scorePercentage.toFixed(2)}% in NSO
        </p>
      </div>

      {/* Key-Value Information List */}
      <div className="space-y-3 pt-2 border-t border-slate-100 text-xs sm:text-sm">
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Class</span>
          <span className="font-bold text-slate-900">{student.class}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Olympiad</span>
          <span className="font-bold text-slate-900 text-right">{student.examName}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Marks Obtained</span>
          <span className="font-bold text-slate-900">
            {student.marksObtained} / {student.totalMarks}
          </span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Percentage</span>
          <span className="font-black text-[#7c3aed]">
            {student.scorePercentage.toFixed(2)}%
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="font-semibold text-slate-500">Published On</span>
          <span className="font-bold text-slate-900">{student.publishedOn}</span>
        </div>
      </div>
    </div>
  );
};
