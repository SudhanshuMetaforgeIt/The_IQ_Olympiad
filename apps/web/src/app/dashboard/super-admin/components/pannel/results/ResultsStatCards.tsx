"use client";

import React from "react";
import { Users, UserCheck, Trophy, FileText } from "lucide-react";
import { resultsStatCardsData } from "./mockData";

interface ResultsStatCardsProps {
  selectedCardId?: string;
  onSelectCard?: (id: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  total: Users,
  registered: UserCheck,
  merit: Trophy,
  published: FileText,
};

export function ResultsStatCards({
  selectedCardId = "",
  onSelectCard,
}: ResultsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {resultsStatCardsData.map((card) => {
        const IconComponent = iconMap[card.id] || Users;
        const isSelected = selectedCardId === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onSelectCard?.(card.id)}
            className={`bg-white rounded-2xl p-5 border flex items-center justify-between transition-all duration-200 cursor-pointer relative overflow-visible ${
              isSelected
                ? card.activeBorder
                : "border-slate-200/80 shadow-2xs hover:border-slate-300"
            }`}
          >
            {/* Pointer Indicator Arrow for selected card */}
            {isSelected && (
              <div
                className={`absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] ${card.pointerColor} z-10`}
              />
            )}

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

            {/* Right Icon Container */}
            <div
              className={`w-13 h-13 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
            >
              <IconComponent className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
