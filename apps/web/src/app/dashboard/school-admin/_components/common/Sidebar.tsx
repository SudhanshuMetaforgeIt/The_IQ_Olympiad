"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  TrendingUp,
  PieChart,
  Settings,
  LogOut,
  Shield,
  Bot,
} from "lucide-react";
import { HelpSupportModal } from "./HelpSupportModal";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isBotOpen, setIsBotOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard/school-admin", icon: LayoutDashboard },
    { name: "Students", href: "/dashboard/school-admin/students", icon: Users },
    { name: "Exam Registration", href: "/dashboard/school-admin/exam-registration", icon: ClipboardCheck },
    { name: "Exams", href: "/dashboard/school-admin/exams", icon: FileText },
    { name: "Results", href: "/dashboard/school-admin/results", icon: TrendingUp },
    { name: "Reports", href: "/dashboard/school-admin/reports", icon: PieChart },
    { name: "Settings", href: "/dashboard/school-admin/settings", icon: Settings },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 bg-[#3826B1] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 overflow-y-auto font-sans ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <Link
            href="/"
            onClick={onClose}
            className="p-6 pb-4 border-b border-purple-500/20 block hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-6.5 h-6.5 text-white stroke-[2.2]" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-wide leading-tight text-white uppercase group-hover:text-purple-200 transition-colors">
                  The IQ <br /> Olympiad
                </h1>
              </div>
            </div>
            <p className="text-xs text-purple-200/90 font-extrabold mt-2.5 tracking-wider uppercase">
              Admin Dashboard
            </p>
          </Link>

          <nav className="p-4 space-y-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard/school-admin" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-base sm:text-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#3826B1] shadow-lg font-black"
                      : "text-purple-100/90 hover:bg-white/10 hover:text-white font-extrabold"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 stroke-[2.2] ${isActive ? "text-[#3826B1]" : "text-purple-200"}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 space-y-3">
          <div
            onClick={() => setIsBotOpen(true)}
            className={`rounded-2xl p-4 border transition-all cursor-pointer shadow-md flex items-center space-x-3.5 group ${
              isBotOpen
                ? "bg-white/20 border-2 border-white/40 ring-2 ring-purple-300/40 shadow-lg"
                : "bg-white/10 hover:bg-white/15 border-white/15"
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-white text-[#3826B1] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Bot className="w-6.5 h-6.5 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-white leading-tight">Help & Support</h4>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-xs font-bold text-purple-200">Chat with our bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-purple-100/90 hover:bg-white/10 hover:text-white text-base font-extrabold transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-purple-200 stroke-[2.2]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <HelpSupportModal isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
    </>
  );
}
