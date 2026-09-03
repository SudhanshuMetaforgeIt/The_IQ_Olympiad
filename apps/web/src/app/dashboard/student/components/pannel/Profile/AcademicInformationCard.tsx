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
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
              Academic Information
            </h3>
            <p className="text-[10px] font-medium text-slate-400 mt-0.5">
              School and enrollment details
            </p>
          </div>
        </div>

        {/* Form Fields Stack */}
        <div className="space-y-2">
          {/* 1. School Name */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              School Name
            </label>
            <input
              type="text"
              value={profile.schoolName}
              onChange={(e) => onChange?.("schoolName", e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
              placeholder="Enter school name"
            />
          </div>

          {/* 2. Academic Year */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Academic Year
            </label>
            <div className="relative">
              <select
                value={profile.academicYear}
                onChange={(e) => onChange?.("academicYear", e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 transition appearance-none cursor-pointer shadow-2xs"
              >
                <option value="2024 - 2025">2024 - 2025</option>
                <option value="2025 - 2026">2025 - 2026</option>
                <option value="2026 - 2027">2026 - 2027</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Section */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Section
            </label>
            <div className="relative">
              <select
                value={profile.section}
                onChange={(e) => onChange?.("section", e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 transition appearance-none cursor-pointer shadow-2xs"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Roll Number */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Roll Number
            </label>
            <input
              type="text"
              value={profile.rollNumber}
              onChange={(e) => onChange?.("rollNumber", e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
              placeholder="Enter roll number"
            />
          </div>

          {/* 5. Student ID (Permanent) */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Student ID
            </label>
            <div className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-violet-700 font-black font-mono text-xs tracking-wider flex items-center justify-between select-all">
              <span>{profile.studentId}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                Permanent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
