"use client";

import React from "react";

interface SecurityCardProps {
  email?: string;
  onChangePassword?: () => void;
  onChangeEmail?: () => void;
}

export function SecurityCard({
  email = "rahul.sharma@abcschool.edu.in",
  onChangePassword,
  onChangeEmail,
}: SecurityCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Security
          </h3>
        </div>

        {/* Security Fields (Email First, Password Second - Enlarged) */}
        <div className="space-y-3.5 pt-1">
          {/* 1. Email Box (Enlarged) */}
          <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="min-w-0 pr-2 space-y-0.5">
              <span className="text-xs font-bold text-slate-500 block">
                Email
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-900 truncate block">
                {email}
              </span>
            </div>

            <button
              type="button"
              onClick={onChangeEmail}
              className="px-4 py-2 rounded-xl border border-violet-300 bg-white hover:bg-violet-50 text-violet-700 font-bold text-xs transition cursor-pointer shadow-2xs shrink-0"
            >
              Change
            </button>
          </div>

          {/* 2. Password Box (Enlarged) */}
          <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-500 block">
                Password
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-widest block leading-snug">
                ••••••••
              </span>
            </div>

            <button
              type="button"
              onClick={onChangePassword}
              className="px-4 py-2 rounded-xl border border-violet-300 bg-white hover:bg-violet-50 text-violet-700 font-bold text-xs transition cursor-pointer shadow-2xs shrink-0"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* School Admin Notice Box */}
      <div className="mt-5 p-4 rounded-2xl bg-violet-50/80 border border-violet-100 flex items-start gap-3">
        <div className="size-6 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <p className="text-xs font-medium text-slate-600 leading-relaxed">
          For security reasons, your email ID can be changed by contacting the school admin.
        </p>
      </div>
    </div>
  );
}
