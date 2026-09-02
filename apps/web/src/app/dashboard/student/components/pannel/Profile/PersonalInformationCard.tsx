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
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="size-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Personal Information
            </h3>
            <p className="text-xs font-semibold text-slate-400">
              Personal profile & contact information
            </p>
          </div>
        </div>

        {/* Content Layout: Profile Avatar on Left, Inputs on Right */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Left Profile Avatar Section */}
          <div className="sm:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              {/* Circular Avatar Graphic / Uploaded Image */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="size-28 sm:size-32 rounded-full bg-emerald-50 border-4 border-white shadow-md overflow-hidden flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] relative"
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
                    {/* Background */}
                    <circle cx="50" cy="50" r="50" fill="#ECFDF5" />
                    {/* Body (Green T-shirt) */}
                    <path d="M22 100 C22 75, 35 68, 50 68 C65 68, 78 75, 78 100 Z" fill="#10B981" />
                    {/* Neck */}
                    <rect x="44" y="52" width="12" height="18" fill="#8D5B4C" />
                    {/* Head & Face */}
                    <circle cx="50" cy="42" r="22" fill="#A06857" />
                    {/* Hair */}
                    <path d="M28 38 C28 22, 40 16, 50 16 C60 16, 72 22, 72 38 C72 28, 64 22, 50 22 C36 22, 28 28, 28 38 Z" fill="#1E293B" />
                    {/* Eyes */}
                    <circle cx="43" cy="42" r="2.5" fill="#1E293B" />
                    <circle cx="57" cy="42" r="2.5" fill="#1E293B" />
                    {/* Smile */}
                    <path d="M44 50 Q50 56 56 50" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
                  <span>📷</span>
                  <span>Change</span>
                </div>
              </div>

              {/* Camera Upload Badge */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 size-8 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
                title="Upload Passport Size Photo"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              className="text-xs font-bold text-slate-800 hover:text-violet-700 mt-3 block transition cursor-pointer"
            >
              Upload Passport Size Photo
            </button>
            <span className="text-[11px] font-medium text-slate-400 mt-0.5 block">
              JPG, PNG up to 2MB
            </span>
          </div>

          {/* Right Inputs Section */}
          <div className="sm:col-span-8 space-y-4 w-full">
            {/* 1. Full Name (With Edit -> Downwards Save & Cancel Buttons) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name
              </label>

              {!isEditingName ? (
                <div>
                  <div className="w-full px-3.5 py-1.5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs flex items-center justify-between gap-3">
                    <span className="flex-1 py-1 px-1 text-slate-900 font-bold text-xs sm:text-sm truncate">
                      {profile.fullName}
                    </span>
                    <button
                      type="button"
                      onClick={handleStartEdit}
                      className="px-3.5 py-1.5 rounded-xl border border-violet-200 hover:border-violet-300 bg-white hover:bg-violet-50 text-violet-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs shrink-0"
                    >
                      <svg className="w-3.5 h-3.5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Inline Saved Successfully Confirmation Badge */}
                  {showSavedSuccess && (
                    <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold animate-fade-in w-fit mt-1.5">
                      <span className="size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                      <span>Saved successfully!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <input
                    type="text"
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveName();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-violet-500 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none ring-2 ring-violet-500/10 shadow-sm"
                    placeholder="Enter full name"
                  />

                  {/* 2 Options Down Below: Cancel & Save */}
                  <div className="flex items-center justify-end gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveName}
                      className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                    >
                      <span>✓</span>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Class (Standard dropdown) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Class
              </label>
              <div className="relative">
                <select
                  value={profile.className}
                  onChange={(e) => onChange?.("className", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition appearance-none cursor-pointer shadow-2xs"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 3. Mobile Number (Standard input) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => onChange?.("phone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition shadow-2xs"
                placeholder="Enter mobile number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
