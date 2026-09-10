"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Trophy,
  TrendingUp,
  Award,
  BarChart3,
  Settings,
  Shield,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export function Sidebar({ activeTab = "dashboard", onSelectTab }: SidebarProps) {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("super_admin_sidebar_collapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("super_admin_sidebar_collapsed", String(next));
      return next;
    });
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schools", label: "Schools", icon: GraduationCap },
    { id: "students", label: "Students", icon: Users },
    { id: "olympiads", label: "Olympiads", icon: Trophy },
    { id: "results", label: "Results", icon: TrendingUp },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push("/");
    }
  };

  return (
    <aside
      className={`relative bg-[#3B1EAE] text-white flex flex-col justify-between ${
        isCollapsed ? "w-20 p-3" : "w-64 p-5"
      } h-screen sticky top-0 shrink-0 select-none z-30 font-sans transition-all duration-300 ease-in-out`}
    >
      {/* Top Section */}
      <div className="space-y-6">
        {/* Brand Logo & Portal Title */}
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3.5 px-2"} pt-1`}>
          <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
            <Shield className="w-6.5 h-6.5 stroke-[2.2]" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1 overflow-hidden animate-in fade-in duration-200">
              <h1 className="font-black text-base tracking-wide leading-tight text-white uppercase truncate">
                The IQ <br /> Olympiad
              </h1>
              <p className="text-xs tracking-wider text-purple-200/90 font-extrabold uppercase mt-0.5 truncate">
                Olympiad Platform
              </p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab?.(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center p-3" : "gap-3.5 px-4 py-3"
                } rounded-2xl text-base transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#3B1EAE] shadow-lg shadow-purple-900/20 font-black"
                    : "text-purple-100/90 hover:bg-white/10 hover:text-white font-extrabold"
                }`}
              >
                <Icon
                  className={`w-5.5 h-5.5 shrink-0 stroke-[2.2] ${
                    isActive ? "text-[#3B1EAE]" : "text-purple-200"
                  }`}
                />
                {!isCollapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Profile & Logout */}
      <div className="space-y-2 pt-4 border-t border-white/15">
        {/* Super Admin Profile */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
          } rounded-2xl bg-white/10 border border-white/15`}
          title={isCollapsed ? "Super Admin (superadmin@examiq.com)" : undefined}
        >
          <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 shadow-xs">
            <User className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1 overflow-hidden animate-in fade-in duration-200">
              <h4 className="text-xs font-bold text-white leading-tight truncate">
                Super Admin
              </h4>
              <p className="text-[11px] text-purple-200/80 font-medium truncate">
                superadmin@examiq.com
              </p>
            </div>
          )}
        </div>

        {/* Logout placed down of Super Admin */}
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          title={isCollapsed ? "Log Out" : undefined}
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center p-2.5" : "gap-3 px-3.5 py-2.5"
          } rounded-2xl text-purple-200 hover:text-white hover:bg-red-500/80 transition-colors font-bold text-xs sm:text-sm cursor-pointer`}
        >
          <LogOut className="w-4 h-4 shrink-0 stroke-[2.2]" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>

      {/* Floating Arrow Toggle / Collapse Handle on Sidebar Edge */}
      <div
        onClick={toggleSidebar}
        className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 items-center justify-center cursor-pointer select-none group py-4"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div className="w-7 h-7 rounded-full bg-[#3B1EAE] border-2 border-white/90 text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-[#3B1EAE] transition-all transform group-hover:scale-110 active:scale-90 cursor-pointer">
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          ) : (
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          )}
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Confirm Log Out</h4>
                <p className="text-xs text-slate-500 font-medium">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-colors cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
