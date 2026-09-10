"use client";

import React from "react";
import { Building2, Users, FileText, CheckCircle2, Trophy } from "lucide-react";
import { reportStatCardsData } from "./mockData";
import { ReportsViewMode } from "./types";

interface ReportsStatCardsProps {
  selectedCardMode?: ReportsViewMode;
  onSelectCardMode?: (mode: ReportsViewMode) => void;
}

export default function ReportsStatCards({
  selectedCardMode = "default",
  onSelectCardMode,
}: ReportsStatCardsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "schools":
        return <Building2 className="w-6 h-6 text-purple-600" />;
      case "students":
        return <Users className="w-6 h-6 text-emerald-600" />;
      case "tests":
        return <FileText className="w-6 h-6 text-amber-600" />;
      case "participation":
        return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
      case "avg_score":
        return <Trophy className="w-6 h-6 text-rose-600" />;
      default:
        return <Building2 className="w-6 h-6 text-purple-600" />;
    }
  };

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case "purple":
        return { bg: "bg-purple-100/80", stroke: "#8b5cf6" };
      case "green":
        return { bg: "bg-emerald-100/80", stroke: "#10b981" };
      case "orange":
        return { bg: "bg-amber-100/80", stroke: "#f97316" };
      case "blue":
        return { bg: "bg-blue-100/80", stroke: "#3b82f6" };
      case "red":
        return { bg: "bg-rose-100/80", stroke: "#ef4444" };
      default:
        return { bg: "bg-purple-100/80", stroke: "#8b5cf6" };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {reportStatCardsData.map((card) => {
        const isSelected = selectedCardMode === card.id;
        const style = getThemeStyles(card.colorTheme);
        const points = card.sparklineData
          .map((val, idx) => `${(idx / (card.sparklineData.length - 1)) * 140},${60 - val * 0.5}`)
          .join(" ");

        return (
          <div
            key={card.id}
            onClick={() =>
              onSelectCardMode?.(isSelected ? "default" : (card.id as ReportsViewMode))
            }
            className={`bg-white rounded-2xl p-5 border shadow-2xs space-y-3 transition-all cursor-pointer relative ${
              isSelected
                ? "border-purple-600 ring-2 ring-purple-600/20 shadow-md"
                : "border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
                  {card.value}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center shrink-0`}>
                {getIcon(card.id)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span
                className={`text-[11px] font-extrabold ${
                  card.isPositive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {card.change}
              </span>
            </div>

            <div className="w-full h-8 pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 140 40">
                <polyline
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
              </svg>
            </div>

            {isSelected && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-purple-600 z-10" />
            )}
          </div>
        );
      })}
    </div>
  );
}
