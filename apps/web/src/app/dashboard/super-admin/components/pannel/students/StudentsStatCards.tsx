"use client";

import React from "react";
import { studentStatCardsData } from "./mockData";

interface StudentsStatCardsProps {
  selectedCard: string | null;
  onSelectCard: (id: string) => void;
}

export function StudentsStatCards({
  selectedCard,
  onSelectCard,
}: StudentsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      {studentStatCardsData.map((card) => {
        const IconComponent = card.icon;
        const isSelected = selectedCard === card.id;
        return (
          <div
            key={card.id}
            onClick={() => onSelectCard(card.id)}
            className={`bg-white rounded-2xl p-6 border flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-200 ${
              isSelected
                ? card.activeBorder
                : "border-slate-200/80 shadow-2xs hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-extrabold text-slate-700">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </div>
                <span className="text-xs font-semibold text-slate-400 block">
                  {card.subtitle}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0`}
              >
                <IconComponent className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="w-28 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                  <path
                    d={
                      card.id === "total"
                        ? "M5 25 L25 15 L45 22 L65 10 L85 18 L95 5"
                        : card.id === "active"
                        ? "M5 22 L25 25 L45 18 L65 20 L85 10 L95 5"
                        : "M5 10 L25 18 L45 12 L65 22 L85 15 L95 5"
                    }
                    stroke={card.strokeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {card.percentage && (
                <span
                  className={`px-2.5 py-1 rounded-full text-xs ${card.percentageColor}`}
                >
                  {card.percentage}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
