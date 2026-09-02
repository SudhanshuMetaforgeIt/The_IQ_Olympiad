"use client";

import React, { useRef } from "react";
import type { StudentProfileData } from "./types";

interface IdentityInformationCardProps {
  profile: StudentProfileData;
  onChange?: (field: keyof StudentProfileData, value: string) => void;
  onSave?: (fieldLabel: string) => void;
}

const parseDateToISO = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  } catch {
    // fallback
  }
  return "2012-03-12";
};

const formatISOToDisplay = (isoStr: string) => {
  try {
    const [year, month, day] = isoStr.split("-");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = months[parseInt(month, 10) - 1] || "Jan";
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  } catch {
    return isoStr;
  }
};

export function IdentityInformationCard({
  profile,
  onChange,
}: IdentityInformationCardProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleOpenDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoVal = e.target.value;
    if (isoVal) {
      const displayVal = formatISOToDisplay(isoVal);
      onChange?.("dateOfBirth", displayVal);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="size-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h10M7 12h10M7 17h6" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Identity Information
            </h3>
            <p className="text-xs font-semibold text-slate-400">
              DOB, gender, country & Aadhaar details
            </p>
          </div>
        </div>

        {/* Form Fields Stack */}
        <div className="space-y-3.5">
          {/* 1. Date of Birth with Interactive Calendar Picker on Right */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                onClick={handleOpenDatePicker}
                value={profile.dateOfBirth}
                className="w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition cursor-pointer hover:border-violet-300 shadow-2xs"
              />

              {/* Hidden Native Date Input */}
              <input
                ref={dateInputRef}
                type="date"
                value={parseDateToISO(profile.dateOfBirth)}
                onChange={handleDateChange}
                className="sr-only"
                tabIndex={-1}
              />

              {/* Calendar Icon Button on Right */}
              <button
                type="button"
                onClick={handleOpenDatePicker}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-violet-600 hover:text-violet-800 transition cursor-pointer"
                title="Choose Date from Calendar"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </button>
            </div>
          </div>

          {/* 2. Gender */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Gender
            </label>
            <div className="relative">
              <select
                value={profile.gender}
                onChange={(e) => onChange?.("gender", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition appearance-none cursor-pointer shadow-2xs"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Country */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Country
            </label>
            <div className="relative">
              <select
                value={profile.country}
                onChange={(e) => onChange?.("country", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition appearance-none cursor-pointer shadow-2xs"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Singapore">Singapore</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Aadhar Number */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Aadhar Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profile.aadharNumber}
              onChange={(e) => onChange?.("aadharNumber", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
              placeholder="Enter 12-digit Aadhar number"
            />
            {profile.isAadharVerified && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-xs font-bold text-emerald-600">
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
