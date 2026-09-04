"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { statCards } from "./mockData";

interface StatCardsGridProps {
  selectedCard: string;
  onCardClick: (cardId: string) => void;
}

export function StatCardsGrid({ selectedCard, onCardClick }: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        const isSelected = selectedCard === card.id;

        let borderClasses = "border-slate-200/80 shadow-2xs hover:shadow-md hover:border-purple-300";
        if (isSelected) {
          if (card.id === "active-exams") {
            borderClasses = "border-2 border-pink-500 ring-2 ring-pink-500/15 shadow-md scale-[1.01]";
          } else if (card.id === "students" || card.id === "upcoming-exams") {
            borderClasses = "border-2 border-blue-600 ring-2 ring-blue-600/15 shadow-md scale-[1.01]";
          } else {
            borderClasses = "border-2 border-[#3B1EAE] ring-2 ring-purple-600/15 shadow-md scale-[1.01]";
          }
        }

        return (
          <div
            key={card.id}
            onClick={() => onCardClick(card.id)}
            className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${borderClasses}`}
          >
            <div className="flex items-center space-x-3.5">
              <div className={`w-12 h-12 rounded-full ${card.bg} ${card.text} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">
                  {card.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(card.id);
              }}
              className={`mt-4 flex items-center space-x-1 text-xs sm:text-sm font-extrabold transition-colors self-start cursor-pointer group ${
                card.id === "active-exams" ? "text-pink-600 hover:text-pink-800" : "text-[#3B1EAE] hover:text-purple-900"
              }`}
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
