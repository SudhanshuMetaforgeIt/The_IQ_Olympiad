"use client";

import React from "react";
import type { StudentProfileData } from "./types";

interface IdentityInformationCardProps {
  profile: StudentProfileData;
  onChange?: (field: keyof StudentProfileData, value: string) => void;
  onSave?: (fieldLabel: string) => void;
}

export function IdentityInformationCard({
  profile,
}: IdentityInformationCardProps) {
  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h10M7 12h10M7 17h6" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
              Identity Information
            </h3>
            <p className="text-[10px] font-medium text-slate-400 mt-0.5">
              DOB, gender, country & Aadhaar details
            </p>
          </div>
        </div>

        {/* Form Fields Stack (Fixed / Non-editable) */}
        <div className="space-y-2">
          {/* 1. Date of Birth */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Date of Birth
            </label>
            <input
              type="text"
              readOnly
              value={profile.dateOfBirth || "Not provided"}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
          </div>

          {/* 2. Gender */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Gender
            </label>
            <input
              type="text"
              readOnly
              value={profile.gender || "Not specified"}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
          </div>

          {/* 3. Country */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Country
            </label>
            <input
              type="text"
              readOnly
              value={profile.country || "India"}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
          </div>

          {/* 4. Aadhar Number */}
          <div>
            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
              Aadhar Number
            </label>
            <input
              type="text"
              value={profile.aadharNumber ? `•••• •••• ${profile.aadharNumber.slice(-4)}` : "Not provided"}
              readOnly
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
            />
            {profile.isAadharVerified && (
              <div className="flex items-center gap-1 mt-1">
                <div className="size-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold">
                  ✓
                </div>
                <span className="text-[10px] font-bold text-emerald-600">
                  Aadhar number is verified
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
