"use client";

import React from "react";
import {
  Lock,
  Key,
  ShieldCheck,
  Smartphone,
  Clock,
  ChevronRight,
  Shield,
} from "lucide-react";
import { SecuritySettingItem } from "./types";

interface SecurityCardProps {
  items: SecuritySettingItem[];
  onOpenItem?: (id: string) => void;
  onReviewTips?: () => void;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({
  items,
  onOpenItem,
  onReviewTips,
}) => {
  const getIcon = (type: SecuritySettingItem["iconType"]) => {
    switch (type) {
      case "key":
        return <Key className="w-5 h-5 text-[#6332ec]" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-[#6332ec]" />;
      case "device":
        return <Smartphone className="w-5 h-5 text-[#6332ec]" />;
      case "clock":
        return <Clock className="w-5 h-5 text-[#6332ec]" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100/90 shadow-2xs flex flex-col justify-between h-full space-y-5">
      {/* Card Header with Divider */}
      <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4 mb-1">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec] flex-shrink-0">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Security & Account
          </h3>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            Manage your account security and login activity.
          </p>
        </div>
      </div>

      {/* Security Cards List */}
      <div className="space-y-3.5 my-auto">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenItem?.(item.id)}
            className="border border-slate-100/90 rounded-2xl p-4 bg-white hover:border-purple-200 transition cursor-pointer flex items-center justify-between gap-4 shadow-2xs"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                {getIcon(item.iconType)}
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">{item.title}</h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {item.statusBadge && (
                <span
                  className={`text-xs sm:text-sm font-black px-3 py-1.5 rounded-lg ${
                    item.badgeType === "emerald"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-sky-50 text-sky-600"
                  }`}
                >
                  {item.statusBadge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2.5]" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Button with top divider line & larger font size */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={onReviewTips}
          className="border-2 border-purple-300 text-[#6332ec] font-black text-base sm:text-lg rounded-2xl py-4 px-6 w-full flex items-center justify-center gap-3 hover:bg-purple-50 transition cursor-pointer shadow-2xs"
        >
          <Shield className="w-5.5 h-5.5 stroke-[2.5]" />
          <span>Review Security Tips</span>
        </button>
      </div>
    </div>
  );
};
