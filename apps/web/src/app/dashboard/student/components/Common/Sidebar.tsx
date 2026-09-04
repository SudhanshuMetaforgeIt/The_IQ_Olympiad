"use client";

import React, { useState, useEffect } from "react";
import type { StudentProfile } from "../../types";
import { clearAccessToken } from "@/lib/auth/token-storage";
import { LogoutConfirmModal } from "./LogoutConfirmModal";
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
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("student_sidebar_open");
        if (saved !== null) {
          return saved === "true";
        }
      } catch {
        // ignore storage access restrictions
      }
    }
    return true;
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sync state if storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "student_sidebar_open" && e.newValue !== null) {
        setIsOpen(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleSidebar = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("student_sidebar_open", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleItemClick = (item: NavItem) => {
    if (item.id === "logout") {
      setIsLogoutModalOpen(true);
      return;
    }
    onSelectTab?.(item.id);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    if (typeof window !== "undefined") {
      clearAccessToken();
      localStorage.removeItem("student_active_tab");
      localStorage.setItem("student_sidebar_open", "true");
      window.location.href = "/";
    }
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <aside
        className={`bg-[#090E24] text-white flex flex-col justify-between shrink-0 h-screen select-none border-r border-slate-800/60 transition-all duration-300 ease-in-out relative ${
          isOpen ? "w-60 p-4" : "w-[72px] p-2.5"
        } sticky top-0 left-0 z-40`}
      >
        {/* Border Docked Circular Toggle Button */}
        <div className="absolute -right-3.5 top-7 z-50">
          <button
            type="button"
            onClick={toggleSidebar}
            className="size-7 rounded-full bg-[#090E24] border-2 border-slate-600 text-slate-100 hover:text-white hover:bg-violet-600 hover:border-violet-400 shadow-xl shadow-black/60 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              // Chevron Left < (Collapse)
              <svg
                className="w-3.5 h-3.5 stroke-[3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            ) : (
              // Chevron Right > (Expand)
              <svg
                className="w-3.5 h-3.5 stroke-[3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </button>
        </div>

        {/* Scrollable Main Navigation Content */}
        <div className="space-y-4 overflow-y-auto overflow-x-hidden">
          {/* Logo & Portal Title */}
          {isOpen ? (
            <div
              className="flex items-center gap-2.5 px-1 pt-0.5 cursor-pointer group min-w-0"
              onClick={() => onSelectTab?.("dashboard")}
            >
              <div className="size-9 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-xl text-[#090E24] shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <TrophyLogoIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h1 className="font-black text-sm sm:text-base tracking-wide leading-tight text-white truncate">
                  IQ OLYMPIAD
                </h1>
                <p className="text-[10px] tracking-wider text-slate-400 font-extrabold uppercase mt-0.5 truncate">
                  STUDENT PORTAL
                </p>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center cursor-pointer group w-full py-1"
              onClick={() => onSelectTab?.("dashboard")}
              title="IQ Olympiad - Student Portal"
            >
              <div className="size-9 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-xl text-[#090E24] shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <TrophyLogoIcon className="w-5 h-5" />
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              if (!isOpen) {
                // Collapsed icon-only mode
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    title={item.label}
                    className={`w-full flex items-center justify-center size-11 mx-auto rounded-xl transition-all cursor-pointer relative group/item ${
                      isActive
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30 font-extrabold"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />

                    {/* Floating Item Label on Hover */}
                    <div className="hidden group-hover/item:flex items-center absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap border border-slate-700 z-50 pointer-events-none">
                      {item.label}
                    </div>
                  </button>
                );
              }

              // Expanded full mode
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30 font-extrabold"
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

        {/* Bottom Illustration (Expanded Only) */}
        {isOpen && (
          <div className="pt-4 pb-1 px-2 flex justify-center shrink-0">
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
        )}
      </aside>

      {/* Logout Confirmation Dialog Modal */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}
