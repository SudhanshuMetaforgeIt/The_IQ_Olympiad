"use client";

import React from "react";
import { Bell, Mail, ChevronDown } from "lucide-react";
import { getCurrentAcademicYear } from "@/lib/academicYear";

export const ReportsHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
      {/* Title & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reports</h1>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">
          Dashboard <span className="text-purple-600 font-bold">/ Reports</span>
        </p>
      </div>

      {/* Top Right Controls */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        {/* Academic Year Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-2xl px-3.5 py-1.5 shadow-2xs cursor-pointer">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Academic Year
          </div>
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <span>{getCurrentAcademicYear()}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
            5
          </span>
        </div>

        {/* Messages Icon */}
        <div className="relative w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs">
          <Mail className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
            3
          </span>
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 bg-white border border-slate-200/80 rounded-2xl pl-1.5 pr-3 py-1 shadow-2xs cursor-pointer">
          <div className="w-7 h-7 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            H
          </div>
          <div className="text-left">
            <div className="text-xs font-extrabold text-slate-900 leading-tight">Haripriya</div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
              SCHOOL_ADMIN
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
        </div>
      </div>
    </div>
  );
};
