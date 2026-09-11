"use client";

import React from "react";
import { Clock, CheckCircle2, Bell, Lock, LogIn } from "lucide-react";
import { ActivityItem } from "./types";

interface RecentActivityCardProps {
  activities: ActivityItem[];
  onViewAll?: () => void;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
  onViewAll,
}) => {
  const getIcon = (type: ActivityItem["iconType"]) => {
    switch (type) {
      case "check":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "bell":
        return <Bell className="w-5 h-5 text-[#6332ec]" />;
      case "lock":
        return <Lock className="w-5 h-5 text-sky-600" />;
      case "login":
        return <LogIn className="w-5 h-5 text-[#6332ec]" />;
    }
  };

  const getIconBg = (type: ActivityItem["iconType"]) => {
    switch (type) {
      case "check":
        return "bg-emerald-100/90";
      case "bell":
        return "bg-purple-100/90";
      case "lock":
        return "bg-sky-100/90";
      case "login":
        return "bg-purple-100/90";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100/90 shadow-2xs space-y-6 mt-6">
      {/* Card Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec] flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Recent Account Activity
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">
              A summary of your recent account activities and updates.
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="border border-purple-300 text-[#6332ec] font-black text-sm rounded-xl px-4 py-2 hover:bg-purple-50 transition cursor-pointer flex-shrink-0"
        >
          View All Activity
        </button>
      </div>

      {/* Timeline Grid Track */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3 relative">
        {activities.map((item, index) => (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Circle Node Badge */}
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${getIconBg(
                item.iconType
              )}`}
            >
              {getIcon(item.iconType)}
            </div>

            {/* Content */}
            <div className="space-y-1 pr-2">
              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-snug">
                {item.description}
              </p>
              <span className="text-xs font-extrabold text-slate-600 inline-block pt-0.5">
                {item.timestamp}
              </span>
            </div>

            {/* Connecting Horizontal Line (except for last node) */}
            {index < activities.length - 1 && (
              <div className="hidden lg:block absolute top-5 left-14 w-[calc(100%-2.5rem)] h-0.5 border-t-2 border-dotted border-purple-200 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
