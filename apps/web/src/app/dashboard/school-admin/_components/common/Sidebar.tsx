"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HelpSupportModal } from "./HelpSupportModal";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DEFAULT_WIDTH = 272;
const MIN_WIDTH = 80;
const MAX_WIDTH = 272;

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const isCollapsed = sidebarWidth < 180;

  useEffect(() => {
    setIsMounted(true);
    const savedWidth = localStorage.getItem("school_admin_sidebar_width");
    if (savedWidth) {
      const parsed = parseInt(savedWidth, 10);
      if (!isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
        setSidebarWidth(parsed);
      }
    }
  }, []);

  const toggleSidebarWidth = useCallback(() => {
    setSidebarWidth((prev) => {
      const next = prev < 180 ? DEFAULT_WIDTH : MIN_WIDTH;
      localStorage.setItem("school_admin_sidebar_width", next.toString());
      return next;
    });
  }, []);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (sidebarRef.current) {
      const calculatedWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      const clampedWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, calculatedWidth));
      setSidebarWidth(clampedWidth);
    }
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      if (sidebarWidth) {
        localStorage.setItem("school_admin_sidebar_width", sidebarWidth.toString());
      }
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, resize, stopResizing, sidebarWidth]);

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
        ref={sidebarRef}
        style={{
          width: isMounted && typeof window !== "undefined" && window.innerWidth >= 1024 ? `${sidebarWidth}px` : undefined,
        }}
        className={`fixed inset-y-0 left-0 z-40 bg-[#3826B1] text-white flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen lg:shrink-0 font-sans relative ${
          isResizing ? "select-none" : "transition-all duration-300 ease-in-out"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex-1 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
          <div>
            <div className="p-4 pb-4 border-b border-purple-500/20 block select-none">
              <div className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3.5"}`}>
                <div
                  className="w-11 h-11 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center shadow-inner shrink-0"
                  title="The IQ Olympiad"
                >
                  <Shield className="w-6.5 h-6.5 text-white stroke-[2.2]" />
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="text-base font-black tracking-wide leading-tight text-white uppercase whitespace-nowrap">
                      The IQ <br /> Olympiad
                    </h1>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <p className="text-xs text-purple-200/90 font-extrabold mt-2.5 tracking-wider uppercase whitespace-nowrap">
                  Admin Dashboard
                </p>
              )}
            </div>

            <nav className="p-3 space-y-2.5">
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
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center ${
                      isCollapsed ? "justify-center p-3" : "space-x-3.5 px-4 py-3"
                    } rounded-2xl text-base sm:text-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white text-[#3826B1] shadow-lg font-black"
                        : "text-purple-100/90 hover:bg-white/10 hover:text-white font-extrabold"
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 stroke-[2.2] ${isActive ? "text-[#3826B1]" : "text-purple-200"}`} />
                    {!isCollapsed && <span className="truncate whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-3 space-y-3">
            <div
              onClick={() => setIsBotOpen(true)}
              title={isCollapsed ? "Help & Support" : undefined}
              className={`rounded-2xl border transition-all cursor-pointer shadow-md flex items-center ${
                isCollapsed ? "justify-center p-3" : "p-4 space-x-3.5"
              } group ${
                isBotOpen
                  ? "bg-white/20 border-2 border-white/40 ring-2 ring-purple-300/40 shadow-lg"
                  : "bg-white/10 hover:bg-white/15 border-white/15"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#3826B1] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6 stroke-[2.2]" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-black text-white leading-tight whitespace-nowrap">Help & Support</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-xs font-bold text-purple-200 whitespace-nowrap">Chat with our bot</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsLogoutOpen(true)}
              title={isCollapsed ? "Logout" : undefined}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center p-3" : "space-x-3.5 px-4 py-3"
              } rounded-2xl text-purple-100/90 hover:bg-white/10 hover:text-white text-base font-extrabold transition-colors text-left cursor-pointer`}
            >
              <LogOut className="w-5 h-5 text-purple-200 stroke-[2.2] shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
            </button>
          </div>
        </div>

        {/* Floating Touch & Auto-Movable Arrow Resize Handle */}
        <div
          onClick={toggleSidebarWidth}
          onTouchStart={(e) => {
            e.preventDefault();
            toggleSidebarWidth();
          }}
          onMouseDown={startResizing}
          className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 items-center justify-center cursor-pointer select-none group py-4"
          title={isCollapsed ? "Touch/Click to expand sidebar" : "Touch/Click to collapse sidebar"}
        >
          <div
            className={`w-7 h-7 rounded-full bg-[#3826B1] border-2 border-white/90 text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-[#3826B1] transition-all transform group-hover:scale-110 active:scale-90 cursor-pointer`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            ) : (
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            )}
          </div>
        </div>
      </aside>

      <HelpSupportModal isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      <LogoutConfirmModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          router.push("/");
        }}
      />
    </>
  );
}
