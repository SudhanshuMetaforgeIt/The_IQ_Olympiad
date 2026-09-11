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
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div className="space-y-2.5">
        {/* Card Header */}
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
            Security
          </h3>
        </div>

        {/* Security Fields */}
        <div className="space-y-2 pt-0.5">
          {/* 1. Email Box */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="min-w-0 pr-1 space-y-0.5">
              <span className="text-[9px] font-bold text-slate-500 block leading-none">
                Email
              </span>
              <span className="text-xs font-black text-slate-900 truncate block">
                {email}
              </span>
            </div>

            <button
              type="button"
              onClick={onChangeEmail}
              className="px-2.5 py-1 rounded-md border border-violet-300 bg-white hover:bg-violet-50 text-violet-700 font-bold text-[10px] transition cursor-pointer shadow-2xs shrink-0"
            >
              Change
            </button>
          </div>

          {/* 2. Password Box */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-slate-500 block leading-none">
                Password
              </span>
              <span className="text-sm font-black text-slate-900 tracking-widest block leading-tight">
                ••••••••
              </span>
            </div>

            <button
              type="button"
              onClick={onChangePassword}
              className="px-2.5 py-1 rounded-md border border-violet-300 bg-white hover:bg-violet-50 text-violet-700 font-bold text-[10px] transition cursor-pointer shadow-2xs shrink-0"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* School Admin Notice Box */}
      <div className="mt-3 p-2.5 rounded-lg bg-violet-50/80 border border-violet-100 flex items-start gap-2">
        <div className="size-4 rounded bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <p className="text-[10px] font-medium text-slate-600 leading-snug">
          For security reasons, your email ID can be changed by contacting the school admin.
        </p>
      </div>
    </div>
  );
}
