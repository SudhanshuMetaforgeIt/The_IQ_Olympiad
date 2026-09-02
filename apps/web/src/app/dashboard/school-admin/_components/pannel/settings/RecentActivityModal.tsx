"use client";

import React from "react";
import { Clock, CheckCircle2, Bell, Lock, LogIn, X } from "lucide-react";
import { ActivityItem } from "./types";

interface RecentActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
}

export function RecentActivityModal({ isOpen, onClose, activities }: RecentActivityModalProps) {
  if (!isOpen) return null;

  const getIcon = (type: ActivityItem["iconType"]) => {
    switch (type) {
      case "check":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "bell":
        return <Bell className="w-5 h-5 text-purple-600" />;
      case "lock":
        return <Lock className="w-5 h-5 text-sky-600" />;
      case "login":
        return <LogIn className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getBgColor = (type: ActivityItem["iconType"]) => {
    switch (type) {
      case "check":
        return "bg-emerald-50 border-emerald-200";
      case "bell":
        return "bg-purple-50 border-purple-200";
      case "lock":
        return "bg-sky-50 border-sky-200";
      case "login":
        return "bg-indigo-50 border-indigo-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec] shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Recent Account Activity</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
              A summary of your recent account activities and updates.
            </p>
          </div>
        </div>

        {/* Exact 4 Activity Items from image */}
        <div className="space-y-4">
          {activities.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border ${getBgColor(item.iconType)} flex items-start space-x-4 transition-all shadow-2xs`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                {getIcon(item.iconType)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                  <span className="text-xs font-semibold text-slate-500">{item.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#6332ec] hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm rounded-full transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
