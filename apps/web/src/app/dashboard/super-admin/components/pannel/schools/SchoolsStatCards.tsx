"use client";

import React from "react";
import { schoolsStatCardsData } from "./mockData";

interface SchoolsStatCardsProps {
  selectedFilter: string;
  onSelectFilter: (filterId: string) => void;
}

export function SchoolsStatCards({
  selectedFilter,
  onSelectFilter,
}: SchoolsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {schoolsStatCardsData.map((card) => {
        const IconComponent = card.icon;
        const isSelected = selectedFilter === card.id;
        return (
          <div
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`bg-white rounded-2xl p-5 border flex items-center justify-between transition-all duration-200 cursor-pointer ${
              isSelected
                ? card.borderColor
                : "border-slate-200/80 shadow-2xs hover:border-slate-300"
            }`}
          >
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                {card.title}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>
              <p className={`text-xs ${card.subtitleColor}`}>
                {card.subtitle}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl ${card.bg} ${card.text} flex items-center justify-center shrink-0`}
            >
              <IconComponent className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
