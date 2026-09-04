"use client";

import React, { useState, useRef, useEffect } from "react";
import type { StudentProfile } from "../../types";
import { BellIcon } from "./icons";

interface HeaderBarProps {
  student: StudentProfile;
  onSelectTab?: (tabId: string) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  type: "exam" | "result" | "badge" | "practice" | "certificate";
  tabRedirect?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export function HeaderBar({ student, onSelectTab }: HeaderBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [avatarUrl, setAvatarUrl] = useState<string>(student.avatarUrl);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const studentName =
    student.name === "Harshith Bantu" || !student.name || student.name === "Student"
      ? "Haripriya varma"
      : student.name;
  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // Optional local avatar override only (schema has no avatar field yet).
  useEffect(() => {
    const syncAvatar = () => {
      if (typeof window === "undefined") return;
      const savedAvatar = localStorage.getItem("student_custom_avatar");
      setAvatarUrl(savedAvatar || student.avatarUrl);
    };

    syncAvatar();
    window.addEventListener("student_profile_updated", syncAvatar);
    window.addEventListener("storage", syncAvatar);
    return () => {
      window.removeEventListener("student_profile_updated", syncAvatar);
      window.removeEventListener("storage", syncAvatar);
    };
  }, [student.avatarUrl]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isUnread: false } : n))
    );
    if (item.tabRedirect && onSelectTab) {
      onSelectTab(item.tabRedirect);
      setIsOpen(false);
    }
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "exam":
        return {
          bg: "bg-blue-50 text-blue-600 border-blue-100",
          icon: "📅",
        };
      case "result":
        return {
          bg: "bg-amber-50 text-amber-600 border-amber-100",
          icon: "🏆",
        };
      case "badge":
        return {
          bg: "bg-violet-50 text-violet-600 border-violet-100",
          icon: "⭐",
        };
      case "practice":
        return {
          bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
          icon: "🎯",
        };
      case "certificate":
        return {
          bg: "bg-teal-50 text-teal-600 border-teal-100",
          icon: "📜",
        };
    }
  };

  return (
    <header className="flex items-center justify-between py-3 px-4 sm:px-6 bg-transparent shrink-0">
      {/* Welcome Title */}
      <div>
        <span className="text-[11px] font-semibold text-slate-500">Welcome back,</span>
        <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-1.5 tracking-tight leading-tight">
          {studentName} <span className="animate-bounce inline-block text-base">👋</span>
        </h1>
        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
          {student.grade} • {student.school}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="View notifications"
            className={`relative p-2.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${isOpen
                ? "bg-violet-50 border-violet-300 text-violet-700 shadow-md shadow-violet-500/10"
                : "bg-white border-slate-200 text-slate-600 hover:text-violet-600 hover:border-violet-200"
              }`}
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-rose-500 text-white font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* 5 Notifications Dropdown Popover */}
          {isOpen && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Popover Header */}
              <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-bold text-violet-600 hover:text-violet-800 transition cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm font-medium text-slate-500">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const iconConfig = getIcon(n.type);
                    return (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-3.5 sm:p-4 hover:bg-violet-50/40 transition cursor-pointer flex items-start gap-3 relative ${n.isUnread ? "bg-[#FAF8FF]" : "bg-white"
                          }`}
                      >
                        {/* Icon */}
                        <div
                          className={`size-9 rounded-xl ${iconConfig.bg} border flex items-center justify-center text-sm shrink-0 mt-0.5`}
                        >
                          {iconConfig.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-black text-slate-900 truncate">
                              {n.title}
                            </h4>
                            {n.isUnread && (
                              <span className="size-2 rounded-full bg-violet-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] font-medium text-slate-600 leading-snug mt-0.5 line-clamp-2">
                            {n.description}
                          </p>
                          <span className="text-[10px] font-semibold text-slate-400 block mt-1">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Popover Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile (Clickable to navigate to Profile) */}
        <button
          type="button"
          onClick={() => onSelectTab?.("profile")}
          className="flex items-center gap-3 p-1 sm:pr-2.5 rounded-2xl hover:bg-white hover:shadow-xs transition-all cursor-pointer border border-transparent hover:border-slate-200/80 group text-left"
          title="View Student Profile"
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={studentName}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-violet-500/20 group-hover:ring-violet-500/60 transition-all"
            />
          ) : (
            <div className="size-10 sm:size-11 rounded-full bg-violet-600 text-white font-black flex items-center justify-center text-sm border-2 border-white shadow-sm ring-2 ring-violet-500/20">
              {studentName.charAt(0)}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <div className="flex items-center gap-1 font-extrabold text-slate-900 text-sm group-hover:text-violet-700 transition-colors">
              <span>{studentName}</span>
              <svg className="w-4 h-4 text-slate-600 group-hover:text-violet-700 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400">{student.grade}</p>
          </div>
        </button>
      </div>
    </header>
  );
}
