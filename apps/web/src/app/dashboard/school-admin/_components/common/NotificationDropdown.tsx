"use client";

import React, { useState } from "react";
import { Bell, CheckCheck, Clock, FileText, AlertTriangle, Award, ShieldAlert, X } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "registration" | "alert" | "result" | "system";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "notif-1", title: "New Student Registrations", message: "12 new students registered for National Science Olympiad (NSO 2026).", time: "10 mins ago", read: false, type: "registration" },
  { id: "notif-2", title: "Registration Deadline Warning", message: "Cyber Olympiad (ICO 2026) registration closes in 2 days.", time: "1 hour ago", read: false, type: "alert" },
  { id: "notif-3", title: "Olympiad Results Published", message: "Math Olympiad (IMO 2026) results are ready for download.", time: "3 hours ago", read: false, type: "result" },
  { id: "notif-4", title: "Payment Receipt Generated", message: "Bulk registration receipt #INV-2026-891 issued successfully.", time: "Yesterday", read: false, type: "system" },
  { id: "notif-5", title: "Portal Maintenance Notice", message: "Scheduled server upgrade planned for Saturday 11:00 PM.", time: "2 days ago", read: false, type: "system" },
];

interface NotificationDropdownProps {
  onClose: () => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export function NotificationDropdown({ onClose, unreadCount, setUnreadCount }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.read) {
          setUnreadCount(Math.max(0, unreadCount - 1));
          return { ...item, read: true };
        }
        return item;
      })
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    setUnreadCount(0);
  };

  const filteredNotifications = notifications.filter((item) => activeFilter === "unread" ? !item.read : true);

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "registration": return <FileText className="w-4 h-4 text-purple-600" />;
      case "alert": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "result": return <Award className="w-4 h-4 text-emerald-600" />;
      default: return <ShieldAlert className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 font-sans">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6332ec] flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Notifications</h3>
            <p className="text-[11px] font-semibold text-slate-500">{unreadCount} unread alerts</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllRead} className="text-[11px] font-bold text-[#6332ec] hover:text-purple-800 flex items-center gap-1 cursor-pointer">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
          )}
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2 border-b border-slate-100 flex items-center space-x-2 bg-white">
        <button onClick={() => setActiveFilter("all")} className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeFilter === "all" ? "bg-[#6332ec] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          All ({notifications.length})
        </button>
        <button onClick={() => setActiveFilter("unread")} className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeFilter === "unread" ? "bg-[#6332ec] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 font-semibold text-xs">No notifications available</div>
        ) : (
          filteredNotifications.map((item) => (
            <div key={item.id} onClick={() => handleMarkAsRead(item.id)} className={`p-4 transition-colors cursor-pointer flex items-start space-x-3 ${!item.read ? "bg-purple-50/30 hover:bg-purple-50/60" : "bg-white hover:bg-slate-50"}`}>
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">{getIcon(item.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-black text-slate-900 truncate">{item.title}</h4>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />}
                </div>
                <p className="text-xs font-semibold text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{item.message}</p>
                <div className="flex items-center space-x-1 mt-1 text-[10px] font-bold text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
        <span className="text-xs font-bold text-[#6332ec] hover:underline cursor-pointer">View All System Notifications</span>
      </div>
    </div>
  );
}
