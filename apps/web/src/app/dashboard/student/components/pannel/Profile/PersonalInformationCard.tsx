"use client";

import React, { useRef, useState } from "react";
import { ApiError, uploadStudentProfilePhoto } from "@/lib/api";
import { getAccessToken } from "@/lib/auth/token-storage";
import type { StudentProfileData } from "./types";

interface PersonalInformationCardProps {
  profile: StudentProfileData;
  onChange?: (field: keyof StudentProfileData, value: string) => void;
  onSave?: (fieldLabel: string) => void;
  onPhotoUploaded?: () => void;
}

export function PersonalInformationCard({
  profile,
  onChange,
  onSave,
  onPhotoUploaded,
}: PersonalInformationCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) {
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      onSave?.("Profile photo must be JPEG, PNG, or WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onSave?.("Profile photo must be 5MB or smaller");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      onSave?.("Please sign in again to update your photo");
      return;
    }

    setIsUploading(true);
    try {
      await uploadStudentProfilePhoto(token, file);
      if (typeof window !== "undefined") {
        localStorage.removeItem("student_custom_avatar");
        window.dispatchEvent(new Event("student_profile_updated"));
        window.alert("Profile photo updated successfully");
      }
      onPhotoUploaded?.();
      onSave?.("Profile photo updated successfully");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to upload profile photo";
      if (typeof window !== "undefined") {
        window.alert(message);
      }
      onSave?.(message);
    } finally {
      setIsUploading(false);
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

        {/* Content Layout: Editable Profile Avatar on Left, Fixed Inputs on Right */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Left Profile Avatar Section (Editable Photo) */}
          <div className="sm:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              <div
                onClick={() => {
                  if (!isUploading) {
                    fileInputRef.current?.click();
                  }
                }}
                className="size-16 sm:size-18 rounded-full bg-emerald-50 border-2 border-white shadow-md overflow-hidden flex items-center justify-center cursor-pointer transition-all hover:scale-105 relative"
                title="Click to change profile photo"
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

                {/* Subtle Hover Edit Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold">
                  <span>📷</span>
                  <span>Edit</span>
                </div>
              </div>

              {/* Camera Upload Badge */}
              <button
                type="button"
                onClick={() => {
                  if (!isUploading) {
                    fileInputRef.current?.click();
                  }
                }}
                className="absolute bottom-0 right-0 size-6 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95 border-2 border-white"
                title="Change Photo"
                aria-label="Change Photo"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(event) => void handleFileChange(event)}
                disabled={isUploading}
                className="hidden"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!isUploading) {
                  fileInputRef.current?.click();
                }
              }}
              disabled={isUploading}
              className="text-[10px] font-bold text-violet-600 hover:text-violet-800 mt-1.5 transition cursor-pointer disabled:opacity-60"
            >
              {isUploading ? "Uploading…" : "Change Photo"}
            </button>

            <span className="text-[11px] font-black text-slate-800 mt-0.5 block truncate max-w-[120px]">
              {profile.fullName === "Harshith Bantu" || !profile.fullName || profile.fullName === "Student"
                ? "Haripriya varma"
                : profile.fullName}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 block leading-tight">
              Registered Profile
            </span>
          </div>

          {/* Right Inputs Column (Fixed / Non-editable) */}
          <div className="sm:col-span-8 space-y-2">
            {/* 1. Full Name */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                value={
                  profile.fullName === "Harshith Bantu" || !profile.fullName || profile.fullName === "Student"
                    ? "Haripriya varma"
                    : profile.fullName
                }
                readOnly
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default select-all"
              />
            </div>

            {/* 2. Class / Grade */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                Class / Grade
              </label>
              <input
                type="text"
                value={profile.className?.startsWith("Class") ? profile.className : profile.className || "Not provided"}
                readOnly
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default"
              />
            </div>

            {/* 3. Email Address */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default select-all"
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
                readOnly
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 font-bold text-xs cursor-default select-all"
                placeholder="+91"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
