"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  TrendingUp,
  PieChart,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard/school-admin",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      href: "/dashboard/school-admin/students",
      icon: Users,
    },
    {
      name: "Exam Registration",
      href: "/dashboard/school-admin/exam-registration",
      icon: ClipboardCheck,
    },
    {
      name: "Exams",
      href: "/dashboard/school-admin/exams",
      icon: FileText,
    },
    {
      name: "Results",
      href: "/dashboard/school-admin/results",
      icon: TrendingUp,
    },
    {
      name: "Reports",
      href: "/dashboard/school-admin/reports",
      icon: PieChart,
    },
    {
      name: "Settings",
      href: "/dashboard/school-admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#3826B1] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Top Header Logo */}
      <div>
        <div className="p-6 pb-4 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center shadow-inner">
              <Shield className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-card-title font-semibold tracking-wide leading-tight text-white uppercase">
                The IQ <br />
                Olympiad
              </h1>
            </div>
          </div>
          <p className="text-badge text-purple-200/80 font-semibold mt-2 tracking-wide uppercase">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard/school-admin" &&
                pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-menu transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#3826B1] shadow-md font-semibold"
                    : "text-purple-100/80 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#3826B1]" : "text-purple-200"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Support & Logout */}
      <div className="p-4 space-y-3">
        {/* Support Box */}
        <div className="bg-white/10 rounded-xl p-3.5 flex items-center space-x-3 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-purple-100" />
          </div>
          <div className="min-w-0">
            <p className="text-menu font-medium text-white truncate">
              Need Help?
            </p>
            <p className="text-caption text-purple-200/70 truncate uppercase">
              Contact Support
            </p>
          </div>
        </div>

        {/* Logout Link */}
        <button
          onClick={() => {
            /* Logout handler stub */
          }}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-purple-100/80 hover:bg-white/10 hover:text-white text-menu font-medium transition-colors text-left"
        >
          <LogOut className="w-4 h-4 text-purple-200" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
