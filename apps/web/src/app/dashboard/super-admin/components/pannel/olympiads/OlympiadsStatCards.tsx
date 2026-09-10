"use client";

import React from "react";
import { Trophy, Tv, Download, Award } from "lucide-react";
import { statCardsData } from "./mockData";

interface OlympiadsStatCardsProps {
  selectedFilter: string;
  onSelectFilter: (filterId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  all: Trophy,
  Active: Tv,
  Upcoming: Download,
  Completed: Award,
};

export function OlympiadsStatCards({
  selectedFilter,
  onSelectFilter,
}: OlympiadsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCardsData.map((card) => {
        const IconComponent = iconMap[card.id] || Trophy;
        const isSelected = selectedFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
              isSelected
                ? card.borderColor
                : "border-slate-200/80 shadow-2xs hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left Info */}
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold text-slate-500">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </div>
                <p className="text-xs font-semibold text-slate-400">
                  {card.subtitle}
                </p>
              </div>

              {/* Right Icon Box */}
              <div
                className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <IconComponent className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            {/* Bottom Row: Trend & Sparkline */}
            <div className="mt-4 pt-2 flex items-end justify-between">
              <span className={`text-xs font-extrabold ${card.trendColor}`}>
                {card.trend}
              </span>
              <div className="w-24 h-7">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 120 24"
                  fill="none"
                >
                  <polyline
                    fill="none"
                    stroke={card.sparklineColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={card.sparklinePoints}
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
