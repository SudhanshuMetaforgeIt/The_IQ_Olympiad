"use client";

import React from "react";
import {
  Bell,
  Users,
  FileCheck,
  Megaphone,
  Inbox,
  CheckCircle2,
} from "lucide-react";
import { NotificationPreference } from "./types";

interface NotificationsCardProps {
  notifications: NotificationPreference[];
  onToggle?: (id: string) => void;
}

export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  notifications,
  onToggle,
}) => {
  const getIcon = (type: NotificationPreference["iconType"]) => {
    switch (type) {
      case "bell":
        return <Bell className="w-5 h-5 text-[#6332ec]" />;
      case "users":
        return <Users className="w-5 h-5 text-[#6332ec]" />;
      case "file-check":
        return <FileCheck className="w-5 h-5 text-[#6332ec]" />;
      case "megaphone":
        return <Megaphone className="w-5 h-5 text-[#6332ec]" />;
      case "inbox":
        return <Inbox className="w-5 h-5 text-[#6332ec]" />;
    }
  };

  const examUpdates = notifications.filter((n) => n.category === "examination");
  const generalUpdates = notifications.filter((n) => n.category === "general");

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100/90 shadow-2xs flex flex-col justify-between h-full space-y-5">
      {/* Card Header with Divider */}
      <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4 mb-1">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec] flex-shrink-0">
          <Bell className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Notification Preferences
          </h3>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            Choose how you want to receive important updates.
          </p>
        </div>
      </div>

      {/* Grouped Notification Items */}
      <div className="space-y-5 my-auto">
        {/* EXAMINATION UPDATES */}
        <div>
          <h4 className="text-xs sm:text-sm font-black text-[#6332ec] uppercase tracking-wider mb-2.5">
            EXAMINATION UPDATES
          </h4>
          <div className="space-y-2.5">
            {examUpdates.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-2.5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                    {getIcon(item.iconType)}
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-black text-slate-900">{item.title}</h5>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onToggle?.(item.id)}
                  className={`w-12 h-6.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 flex-shrink-0 ${
                    item.enabled ? "bg-[#6332ec]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-200 ${
                      item.enabled ? "translate-x-5.5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* GENERAL UPDATES */}
        <div>
          <h4 className="text-xs sm:text-sm font-black text-[#6332ec] uppercase tracking-wider mb-2.5">
            GENERAL UPDATES
          </h4>
          <div className="space-y-2.5">
            {generalUpdates.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-2.5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                    {getIcon(item.iconType)}
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-black text-slate-900">{item.title}</h5>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onToggle?.(item.id)}
                  className={`w-12 h-6.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 flex-shrink-0 ${
                    item.enabled ? "bg-[#6332ec]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-200 ${
                      item.enabled ? "translate-x-5.5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Green Banner with top divider line & larger font size */}
      <div className="pt-4 border-t border-slate-100">
        <div className="bg-[#f0fdf4] border border-emerald-100 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-base font-black text-emerald-900">Preferences are saved automatically</h4>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">
              You will receive a notification when changes are updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
