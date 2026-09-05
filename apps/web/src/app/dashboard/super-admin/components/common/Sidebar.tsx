"use client";

import React from "react";
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
} from "lucide-react";

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export function Sidebar({ activeTab = "dashboard", onSelectTab }: SidebarProps) {
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

  return (
    <aside className="w-64 bg-[#3B1EAE] text-white flex flex-col justify-between p-5 h-screen sticky top-0 shrink-0 select-none z-30 font-sans">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Brand Logo & Portal Title */}
        <div className="flex items-center gap-3.5 px-2 pt-1">
          <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
            <Shield className="w-6.5 h-6.5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-black text-base tracking-wide leading-tight text-white uppercase">
              The IQ <br /> Olympiad
            </h1>
            <p className="text-xs tracking-wider text-purple-200/90 font-extrabold uppercase mt-0.5">
              Olympiad Platform
            </p>
          </div>
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
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-base transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#3B1EAE] shadow-lg shadow-purple-900/20 font-black"
                    : "text-purple-100/90 hover:bg-white/10 hover:text-white font-extrabold"
                }`}
              >
                <Icon className={`w-5.5 h-5.5 shrink-0 stroke-[2.2] ${isActive ? "text-[#3B1EAE]" : "text-purple-200"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Decorative Dots & Profile */}
      <div className="space-y-6 pt-4">
        {/* Decorative Grid Dots */}
        <div className="grid grid-cols-5 gap-1.5 px-3 opacity-25">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white leading-tight truncate">
              Super Admin
            </h4>
            <p className="text-xs text-purple-200/90 font-medium truncate mt-0.5">
              superadmin@examiq.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

