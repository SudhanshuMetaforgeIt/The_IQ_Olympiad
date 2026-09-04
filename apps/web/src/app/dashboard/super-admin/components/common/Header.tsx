"use client";

import React from "react";
import { Bell, ChevronDown, User, ChevronRight } from "lucide-react";

interface HeaderProps {
  activeTab?: string;
}

export function Header({ activeTab = "dashboard" }: HeaderProps) {
  return (
    <header className="bg-[#F8FAFC] px-6 md:px-8 py-4 sticky top-0 z-20 font-sans border-b border-slate-200/60">
      <div className="flex items-center justify-between relative">
        {/* Left Welcome Title or Breadcrumbs */}
        {activeTab === "dashboard" ? (
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
              Welcome back, Super Admin 👋
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500">
            <span>Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 capitalize font-extrabold">{activeTab}</span>
          </div>
        )}



        {/* Right Bell & Profile */}
        <div className="flex items-center gap-4">
          {/* Bell Icon */}
          <button
            type="button"
            className="relative p-2 rounded-full bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9.5 h-9.5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-bold text-slate-900 leading-tight">
                Super Admin
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Super Admin
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
}



