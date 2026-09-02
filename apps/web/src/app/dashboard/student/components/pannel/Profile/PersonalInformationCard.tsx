"use client";

import React, { useState, useRef, useEffect } from "react";
import type { StudentProfileData } from "./types";

interface PersonalInformationCardProps {
  profile: StudentProfileData;
  onChange?: (field: keyof StudentProfileData, value: string) => void;
  onSave?: (fieldLabel: string) => void;
}

export function PersonalInformationCard({
  profile,
  onChange,
  onSave,
}: PersonalInformationCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit toggle & temp state for Full Name
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.fullName);
  const [showSavedSuccess, setShowSavedSuccess] = useState(false);

  useEffect(() => {
    setTempName(profile.fullName);
  }, [profile.fullName]);

  const handleStartEdit = () => {
    setTempName(profile.fullName);
    setIsEditingName(true);
    setShowSavedSuccess(false);
  };

  const handleCancelEdit = () => {
    setTempName(profile.fullName);
    setIsEditingName(false);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      const trimmed = tempName.trim();
      onChange?.("fullName", trimmed);
      if (typeof window !== "undefined") {
        localStorage.setItem("student_custom_name", trimmed);
        window.dispatchEvent(new Event("student_profile_updated"));
      }
      onSave?.("Full Name");
      setShowSavedSuccess(true);
      setTimeout(() => setShowSavedSuccess(false), 3500);
    }
    setIsEditingName(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const dataUrl = reader.result;
          onChange?.("avatarUrl", dataUrl);
          if (typeof window !== "undefined") {
            localStorage.setItem("student_custom_avatar", dataUrl);
            window.dispatchEvent(new Event("student_profile_updated"));
          }
          onSave?.("Profile photo");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
              Personal Information
            </h3>
            <p className="text-[10px] font-medium text-slate-400 mt-0.5">
              Personal profile & contact information
            </p>
          </div>
        </div>

        {/* Content Layout: Profile Avatar on Left, Inputs on Right */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Left Profile Avatar Section */}
          <div className="sm:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              {/* Circular Avatar Graphic / Uploaded Image */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="size-16 sm:size-18 rounded-full bg-emerald-50 border-2 border-white shadow-2xs overflow-hidden flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] relative"
                title="Click to upload/change photo"
              >
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="50" fill="#ECFDF5" />
                    <path d="M22 100 C22 75, 35 68, 50 68 C65 68, 78 75, 78 100 Z" fill="#10B981" />
                    <rect x="44" y="52" width="12" height="18" fill="#8D5B4C" />
                    <circle cx="50" cy="42" r="22" fill="#A06857" />
                    <path d="M28 38 C28 22, 40 16, 50 16 C60 16, 72 22, 72 38 C72 28, 64 22, 50 22 C36 22, 28 28, 28 38 Z" fill="#1E293B" />
                    <circle cx="43" cy="42" r="2.5" fill="#1E293B" />
                    <circle cx="57" cy="42" r="2.5" fill="#1E293B" />
                    <path d="M44 50 Q50 56 56 50" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[8px] font-bold">
                  <span>📷</span>
                  <span>Change</span>
                </div>
              </div>

              {/* Camera Upload Badge */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 size-5 sm:size-6 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-2xs cursor-pointer transition-transform hover:scale-110 active:scale-95"
                title="Upload Passport Size Photo"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[10px] font-bold text-slate-800 hover:text-violet-700 mt-1.5 block transition cursor-pointer"
            >
              Upload Photo
            </button>
            <span className="text-[9px] text-slate-400 block leading-tight">
              PNG, JPG up to 5MB
            </span>
          </div>

          {/* Right Inputs Column */}
          <div className="sm:col-span-8 space-y-2">
            {/* 1. Full Name */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-[10px] font-bold text-slate-600 block">
                  Full Name
                </label>
                {!isEditingName && (
                  <button
                    type="button"
                    onClick={handleStartEdit}
                    className="text-[10px] font-bold text-violet-600 hover:text-violet-800 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditingName ? (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    autoFocus
                    className="w-full px-2.5 py-1.5 rounded-lg border border-violet-400 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20 shadow-2xs"
                    placeholder="Enter student full name"
                  />
                  <div className="flex items-center gap-1.5 justify-end">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveName}
                      className="px-3 py-1 rounded-md text-[10px] font-bold text-white bg-violet-600 hover:bg-violet-700 transition cursor-pointer shadow-2xs"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={profile.fullName}
                    readOnly
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-900 font-bold text-xs cursor-default"
                  />
                  {showSavedSuccess && (
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-600 flex items-center gap-0.5">
                      <span>✓</span> Saved
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 2. Class / Grade */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                Class / Grade
              </label>
              <div className="relative">
                <select
                  value={profile.className}
                  onChange={(e) => onChange?.("className", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 transition appearance-none cursor-pointer shadow-2xs"
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 3. Email Address */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onChange?.("email", e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
                placeholder="student@example.com"
              />
            </div>

            {/* 4. Phone Number */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => onChange?.("phone", e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold text-xs focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
