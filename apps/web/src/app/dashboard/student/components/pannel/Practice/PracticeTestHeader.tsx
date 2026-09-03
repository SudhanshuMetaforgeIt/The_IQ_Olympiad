"use client";

import React from "react";
import type { PracticeSubject } from "./types";
import type { StudentProfile } from "../../../types";
import { BellIcon, ChevronDownIcon } from "../../Common/icons";

interface PracticeTestHeaderProps {
  subject: PracticeSubject;
  student: StudentProfile;
  onBack: () => void;
  onEndTest: () => void;
}

export function PracticeTestHeader({
  subject,
  student,
  onBack,
  onEndTest,
}: PracticeTestHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <button
          type="button"
          onClick={onBack}
          className="p-2.5 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition shadow-xs cursor-pointer mt-1"
          title="Back to Practice"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <button
              type="button"
              onClick={onBack}
              className="text-violet-600 hover:text-violet-800 transition cursor-pointer"
            >
              Practice
            </button>
            <span>›</span>
            <span className="text-violet-600">{subject.title}</span>
            <span>›</span>
            <span className="text-slate-500">Practice Test 1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {subject.title} Practice Test 1
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
            Practice questions to improve your concepts and problem solving skills.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onEndTest}
          className="px-6 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-sm shadow-md shadow-rose-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>End Test</span>
          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <button
          type="button"
          className="relative p-2.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition shadow-xs cursor-pointer"
        >
          <BellIcon className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-3 bg-white border border-slate-200/80 py-1.5 px-3 rounded-2xl shadow-xs">
          <div className="size-9 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-sm overflow-hidden border border-amber-200">
            {student.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={student.avatarUrl} alt="" className="size-full object-cover" />
            ) : (
              student.name.charAt(0).toUpperCase() || "S"
            )}
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-black text-slate-900 block leading-tight">
              {student.name}
            </span>
            <span className="text-[10px] font-bold text-slate-400 block">
              {student.grade}
            </span>
          </div>
          <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
