"use client";

import React, { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { StatCardsGrid } from "./dashboard/StatCardsGrid";
import { UpcomingExamsOverviewTable } from "./dashboard/UpcomingExamsOverviewTable";
import { ActiveExamsOverviewTable } from "./dashboard/ActiveExamsOverviewTable";
import { PracticeSeriesOverviewTable } from "./dashboard/PracticeSeriesOverviewTable";
import { OverviewChartCard } from "./dashboard/OverviewChartCard";
import { RecentActivitiesCard } from "./dashboard/RecentActivitiesCard";
import { BottomTablesRow } from "./dashboard/BottomTablesRow";

interface SuperAdminDashboardProps {
  onSelectTab?: (tabId: string, filter?: string) => void;
}

export default function SuperAdminDashboard({ onSelectTab }: SuperAdminDashboardProps) {
  const [selectedCard, setSelectedCard] = useState<string>("overview");

  const handleCardClick = (cardId: string) => {
    if (cardId === "schools") {
      onSelectTab?.("schools");
      return;
    }
    if (cardId === "students") {
      onSelectTab?.("students", "total");
      return;
    }
    if (selectedCard === cardId) {
      setSelectedCard("overview");
    } else {
      setSelectedCard(cardId);
    }
  };

  return (
    <div className="space-y-6 pb-8 font-sans">
      {/* Right-aligned Overview Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setSelectedCard("overview")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-2xs border ${
            selectedCard === "overview"
              ? "bg-[#3B1EAE] text-white border-[#3B1EAE] shadow-purple-600/20"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 hover:text-purple-700"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>
      </div>

      {/* 1. Stat Summary Cards Grid (5 columns) */}
      <StatCardsGrid selectedCard={selectedCard} onCardClick={handleCardClick} />

      {/* 2. Main Content View based on Selected Card */}
      {selectedCard === "upcoming-exams" ? (
        <UpcomingExamsOverviewTable />
      ) : selectedCard === "active-exams" ? (
        <ActiveExamsOverviewTable />
      ) : selectedCard === "practice" ? (
        <PracticeSeriesOverviewTable />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OverviewChartCard />
            <RecentActivitiesCard />
          </div>
          <BottomTablesRow onSelectTab={onSelectTab} />
        </>
      )}
    </div>
  );
}
