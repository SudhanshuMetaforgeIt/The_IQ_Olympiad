"use client";

import React from "react";
import type { StudentProfileData } from "./types";

interface AcademicInformationCardProps {
  profile: StudentProfileData;
  onChange?: (field: keyof StudentProfileData, value: string) => void;
  onSave?: (fieldLabel: string) => void;
}

export function AcademicInformationCard({
  profile,
  onChange,
}: AcademicInformationCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="size-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Academic Information
            </h3>
            <p className="text-xs font-semibold text-slate-400">
              School and enrollment details
            </p>
          </div>
        </div>

        {/* Form Fields Stack */}
        <div className="space-y-3.5">
          {/* 1. School Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              School Name
            </label>
            <input
              type="text"
              value={profile.schoolName}
              onChange={(e) => onChange?.("schoolName", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
              placeholder="Enter school name"
            />
          </div>

          {/* 2. Academic Year */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Academic Year
            </label>
            <div className="relative">
              <select
                value={profile.academicYear}
                onChange={(e) => onChange?.("academicYear", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition appearance-none cursor-pointer shadow-2xs"
              >
                <option value="2024 - 2025">2024 - 2025</option>
                <option value="2025 - 2026">2025 - 2026</option>
                <option value="2026 - 2027">2026 - 2027</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Section */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Section
            </label>
            <div className="relative">
              <select
                value={profile.section}
                onChange={(e) => onChange?.("section", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition appearance-none cursor-pointer shadow-2xs"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Roll Number */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Roll Number
            </label>
            <input
              type="text"
              value={profile.rollNumber}
              onChange={(e) => onChange?.("rollNumber", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
              placeholder="Enter roll number"
            />
          </div>

          {/* 5. Student ID (Permanent) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Student ID
            </label>
            <div className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-violet-700 font-black font-mono text-xs sm:text-sm tracking-wider flex items-center justify-between select-all">
              <span>{profile.studentId}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                Permanent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
