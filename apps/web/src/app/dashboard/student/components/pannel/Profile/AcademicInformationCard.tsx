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

        {/* Form Fields Stack (Fixed / Non-editable) */}
        <div className="space-y-2">
          {/* 1. School Name */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              School Name
            </label>
            <input
              type="text"
              value={profile.schoolName || "Not linked"}
              readOnly
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default select-all"
              placeholder="School name"
            />
          </div>

          {/* 2. Academic Year */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Academic Year
            </label>
            <input
              type="text"
              value={profile.academicYear || "Not provided"}
              readOnly
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
          </div>

          {/* 3. Section */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Section
            </label>
            <input
              type="text"
              value={
                profile.section
                  ? profile.section.startsWith("Section")
                    ? profile.section
                    : `Section ${profile.section}`
                  : "Not provided"
              }
              readOnly
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
          </div>

          {/* 4. Roll Number */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Roll Number
            </label>
            <input
              type="text"
              value={profile.rollNumber || "Not assigned"}
              readOnly
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
          </div>

          {/* 5. Student ID (Permanent) */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Student ID
            </label>
            <div className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-violet-700 font-black font-mono text-xs tracking-wider flex items-center justify-between select-all">
              <span>{profile.studentId || "IQO-STU-001"}</span>
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
