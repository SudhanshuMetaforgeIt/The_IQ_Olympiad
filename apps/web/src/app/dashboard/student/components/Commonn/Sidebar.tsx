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
  onSelectTab?: (tabId: string) => void;
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

export function Sidebar({ student, activeTab = "dashboard", onSelectTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#090E24] text-white flex flex-col justify-between p-5 shrink-0 min-h-screen">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Logo & Portal Title */}
        <div className="flex items-center gap-3 px-2 pt-2 cursor-pointer" onClick={() => onSelectTab?.("dashboard")}>
          <div className="p-2 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-xl text-[#090E24] shadow-lg shadow-amber-500/20">
            <TrophyLogoIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide leading-tight text-white">
              IQ OLYMPIAD
            </h1>
            <p className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
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
                    window.location.href = "/login";
                  } else if (onSelectTab) {
                    onSelectTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Illustration (Stacked Books & Trophy) */}
      <div className="pt-6 px-2 flex justify-center">
        <div className="relative w-full max-w-[170px] flex flex-col items-center">
          {/* Trophy Illustration */}
          <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-md transform translate-y-2 z-10">
            <TrophyLogoIcon className="w-7 h-7 text-amber-950 fill-amber-400" />
          </div>
          {/* Books Stack */}
          <div className="w-full space-y-1.5 z-0 pt-1">
            <div className="h-3.5 bg-rose-500 rounded-sm shadow-sm" />
            <div className="h-4 bg-slate-100 rounded-sm shadow-sm" />
            <div className="h-4.5 bg-indigo-600 rounded-sm shadow-sm" />
            <div className="h-5 bg-blue-600 rounded-sm shadow-sm flex items-center justify-between px-2">
              <div className="w-2 h-3 bg-amber-400 rounded-t-sm transform -translate-y-2" />
              <div className="w-2 h-3 bg-rose-400 rounded-t-sm transform -translate-y-2" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
