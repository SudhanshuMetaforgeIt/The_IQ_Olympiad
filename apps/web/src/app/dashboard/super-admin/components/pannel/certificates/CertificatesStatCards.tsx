"use client";

import React from "react";
import { Award, Users, Clock, FileCheck } from "lucide-react";
import { certificatesStatCardsData } from "./mockData";
import { CertificatesViewMode } from "./types";

interface CertificatesStatCardsProps {
  selectedCardMode: CertificatesViewMode;
  onSelectCardMode: (mode: CertificatesViewMode) => void;
}

export default function CertificatesStatCards({
  selectedCardMode,
  onSelectCardMode,
}: CertificatesStatCardsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "merit":
        return <Award className="w-6 h-6 text-purple-600 stroke-[2]" />;
      case "participation":
        return <Users className="w-6 h-6 text-emerald-600 stroke-[2]" />;
      case "pending":
        return <Clock className="w-6 h-6 text-amber-600 stroke-[2]" />;
      case "total":
        return <FileCheck className="w-6 h-6 text-blue-600 stroke-[2]" />;
      default:
        return <Award className="w-6 h-6 text-purple-600 stroke-[2]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {certificatesStatCardsData.map((card) => {
        const isSelected = selectedCardMode === card.id;
        return (
          <div
            key={card.id}
            onClick={() =>
              onSelectCardMode(isSelected ? "default" : (card.id as CertificatesViewMode))
            }
            className={`bg-white rounded-2xl p-5 border shadow-2xs flex items-center justify-between transition-all cursor-pointer relative ${
              isSelected
                ? "border-purple-600 ring-2 ring-purple-600/20 shadow-md"
                : "border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0`}
              >
                {getIcon(card.id)}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {card.title}
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
                  {card.value}
                </h3>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Selection Downward Arrow Pointer */}
            {isSelected && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-purple-600 z-10" />
            )}
          </div>
        );
      })}
    </div>
  );
}
