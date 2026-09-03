"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Bell, Mail, ChevronDown, Menu, User, Plus } from "lucide-react";
import { SchoolProfile } from "../../_types/dashboard";
import { NotificationDropdown } from "./NotificationDropdown";
import { MailDropdown } from "./MailDropdown";

interface HeaderProps {
  profile: SchoolProfile;
  onToggleSidebar?: () => void;
  onBack?: () => void;
}

export function Header({ profile, onToggleSidebar, onBack }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("2025 - 2026");
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const [showMail, setShowMail] = useState(false);
  const [mailUnreadCount, setMailUnreadCount] = useState(3);
  const notifRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (mailRef.current && !mailRef.current.contains(event.target as Node)) {
        setShowMail(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (typeof window !== "undefined") {
      const event = new CustomEvent("school-admin-back-click", { cancelable: true });
      const wasNotCancelled = window.dispatchEvent(event);

      if (!wasNotCancelled) {
        return;
      }
    }

    if (pathname && pathname !== "/dashboard/school-admin" && pathname.startsWith("/dashboard/school-admin")) {
      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back();
      } else {
        router.push("/dashboard/school-admin");
      }
      return;
    }

    router.push("/dashboard/school-admin");
  };

  const getBreadcrumb = () => {
    if (pathname?.includes("/students")) {
      return (
        <span className="text-secondary text-slate-500 font-normal">
          Dashboard <span className="text-purple-700 font-bold ml-1">Students</span>
        </span>
      );
    }
    if (pathname?.includes("/exam-registration")) {
      return (
        <span className="text-secondary text-slate-500 font-normal">
          Dashboard <span className="text-purple-700 font-bold ml-1">Exam Registration</span>
        </span>
      );
    }
    if (pathname?.includes("/exams")) {
      return (
        <span className="text-secondary text-slate-500 font-normal">
          Dashboard <span className="text-purple-700 font-bold ml-1">Exams</span>
        </span>
      );
    }
    if (pathname?.includes("/results")) {
      return (
        <span className="text-secondary text-slate-500 font-normal">
          Dashboard <span className="text-purple-700 font-bold ml-1">Results</span>
        </span>
      );
    }
    return <span className="text-secondary text-slate-500 font-normal">{profile.welcomeMessage}</span>;
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left Back Button, Sidebar Toggle & Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={handleBack}
          className="p-2 text-slate-600 hover:text-purple-700 hover:bg-purple-50 active:scale-95 rounded-full transition-all border border-slate-200 cursor-pointer shadow-xs"
          title="Go Back"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-h1 font-bold text-slate-900 tracking-tight">
            {profile.name}
          </h1>
          <div className="mt-0.5">{getBreadcrumb()}</div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4 self-end md:self-auto">
        <div className="relative">
          <div className="flex flex-col text-right pr-7">
            <span className="text-[10px] uppercase font-bold text-slate-400">Academic Year</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-transparent text-menu font-bold text-slate-800 cursor-pointer focus:outline-none"
            >
              <option value="2025 - 2026">2025 - 2026</option>
              <option value="2024 - 2025">2024 - 2025</option>
              <option value="2026 - 2027">2026 - 2027</option>
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Notification Bell Button & Popover Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors border border-slate-200 cursor-pointer"
            aria-label="View Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationDropdown
              onClose={() => setShowNotifications(false)}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
          )}
        </div>

        {/* Mail Icon Button & Dropdown */}
        <div className="relative" ref={mailRef}>
          <button
            onClick={() => setShowMail(!showMail)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors border border-slate-200 cursor-pointer"
            aria-label="View Mail Inbox"
          >
            <Mail className="w-5 h-5" />
            {mailUnreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {mailUnreadCount}
              </span>
            )}
          </button>

          {showMail && (
            <MailDropdown
              onClose={() => setShowMail(false)}
              unreadCount={mailUnreadCount}
              setUnreadCount={setMailUnreadCount}
            />
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2 pl-2">
          <div className="relative w-9 h-9 rounded-full bg-[#6B46C1] text-white flex items-center justify-center font-bold text-caption shadow-sm">
            <User className="w-5 h-5" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-purple-700 text-white rounded-full flex items-center justify-center border border-white">
              <Plus className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="flex items-center space-x-1">
              <p className="text-menu font-bold text-slate-900 leading-tight">
                Haripriya
              </p>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
              SCHOOL_ADMIN
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
