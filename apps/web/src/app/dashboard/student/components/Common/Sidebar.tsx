"use client";

import React from "react";
import type { StudentProfile } from "../../types";
import {
  TrophyLogoIcon,
  UserIcon,
  DashboardIcon,
  ExamsIcon,
  TargetIcon,
  DiamondIcon,
  TrendingUpIcon,
  CertificateIcon,
  SettingsIcon,
  LogoutIcon,
} from "./icons";

interface SidebarProps {
  student?: StudentProfile;
  activeTab?: string;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "exams", label: "My Exams", icon: ExamsIcon },
  { id: "olympiad", label: "Olympiad", icon: TargetIcon },
  { id: "practice", label: "Practice / Mock", icon: DiamondIcon },
  { id: "results", label: "Results", icon: TrendingUpIcon },
  { id: "certificates", label: "Certificates", icon: CertificateIcon },
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
  { id: "logout", label: "Logout", icon: LogoutIcon },
];

export function Sidebar({ activeTab = "dashboard", onSelectTab }: SidebarProps) {
  return (
    <aside className="w-56 md:w-60 bg-[#090E24] text-white flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0 overflow-y-auto select-none z-30 border-r border-slate-800/40">
      {/* Top Section */}
      <div className="space-y-4">
        {/* Logo & Portal Title */}
        <div
          className="flex items-center gap-2.5 px-2 pt-0.5 cursor-pointer group"
          onClick={() => onSelectTab?.("dashboard")}
        >
          <div className="size-9 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-xl text-[#090E24] shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <TrophyLogoIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-sm sm:text-base tracking-wide leading-tight text-white">
              IQ OLYMPIAD
            </h1>
            <p className="text-[10px] tracking-wider text-slate-400 font-extrabold uppercase mt-0.5">
              STUDENT PORTAL
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "logout") {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("student_active_tab");
                      window.location.href = "/";
                    }
                    return;
                  }
                  if (onSelectTab) {
                    onSelectTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-extrabold"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Illustration (Stacked Books & Trophy) */}
      <div className="pt-4 pb-1 px-2 flex justify-center">
        <div className="relative w-full max-w-[140px] flex flex-col items-center">
          {/* Trophy Illustration */}
          <div className="size-9 bg-amber-400 rounded-xl flex items-center justify-center text-slate-900 shadow-md transform translate-y-1.5 z-10">
            <TrophyLogoIcon className="w-5 h-5 text-amber-950 fill-amber-400" />
          </div>
          {/* Books Stack */}
          <div className="w-full space-y-1 z-0 pt-0.5">
            <div className="h-2.5 bg-rose-500 rounded-sm shadow-sm" />
            <div className="h-3 bg-slate-100 rounded-sm shadow-sm" />
            <div className="h-3.5 bg-indigo-600 rounded-sm shadow-sm" />
            <div className="h-4 bg-blue-600 rounded-sm shadow-sm flex items-center justify-between px-2">
              <div className="w-1.5 h-2.5 bg-amber-400 rounded-t-sm transform -translate-y-1.5" />
              <div className="w-1.5 h-2.5 bg-rose-400 rounded-t-sm transform -translate-y-1.5" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
