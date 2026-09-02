"use client";

import React from "react";
import { Users, ShieldCheck, TrendingUp, ShoppingBag } from "lucide-react";
import { StatMetric } from "./types";

interface ReportsStatCardsProps {
  metrics: StatMetric[];
  selectedId?: StatMetric["id"];
  onSelectMetric?: (id: StatMetric["id"]) => void;
}

export const ReportsStatCards: React.FC<ReportsStatCardsProps> = ({
  metrics,
  selectedId = "appeared",
  onSelectMetric,
}) => {
  const getIcon = (type: StatMetric["iconType"]) => {
    switch (type) {
      case "appeared":
        return <Users className="w-6 h-6 text-purple-600" />;
      case "qualified":
        return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
      case "avg":
        return <TrendingUp className="w-6 h-6 text-amber-500" />;
      case "merit":
        return <ShoppingBag className="w-6 h-6 text-purple-600" />;
    }
  };

  const getBgColor = (type: StatMetric["iconType"]) => {
    switch (type) {
      case "appeared":
        return "bg-purple-100/60";
      case "qualified":
        return "bg-emerald-100/60";
      case "avg":
        return "bg-amber-100/60";
      case "merit":
        return "bg-purple-100/60";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const isSelected = selectedId === metric.id;
        return (
          <div
            key={metric.id}
            onClick={() => onSelectMetric?.(metric.id)}
            className={`rounded-3xl p-5 border shadow-2xs flex items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected
                ? "bg-white border-purple-600 ring-2 ring-purple-600/30 shadow-sm"
                : "bg-white border-slate-100/80 hover:border-slate-200"
              }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${getBgColor(
                  metric.iconType
                )}`}
              >
                {getIcon(metric.iconType)}
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-800">{metric.title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  {metric.value}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  {metric.subtext}
                </p>
              </div>
            </div>

            {metric.badge && (
              <div className="self-center">
                <span className="text-base font-black text-emerald-500">{metric.badge}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
