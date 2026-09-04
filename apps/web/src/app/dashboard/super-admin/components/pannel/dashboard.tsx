"use client";

import React, { useState } from "react";
import { StatCardsGrid } from "./dashboard/StatCardsGrid";
import { UpcomingExamsOverviewTable } from "./dashboard/UpcomingExamsOverviewTable";
import { ActiveExamsOverviewTable } from "./dashboard/ActiveExamsOverviewTable";
import { PracticeSeriesOverviewTable } from "./dashboard/PracticeSeriesOverviewTable";
import { OverviewChartCard } from "./dashboard/OverviewChartCard";
import { RecentActivitiesCard } from "./dashboard/RecentActivitiesCard";
import { BottomTablesRow } from "./dashboard/BottomTablesRow";

interface SuperAdminDashboardProps {
  onSelectTab?: (tabId: string) => void;
}

export default function SuperAdminDashboard({ onSelectTab }: SuperAdminDashboardProps) {
  const [selectedCard, setSelectedCard] = useState<string>("upcoming-exams");

  const handleCardClick = (cardId: string) => {
    if (selectedCard === cardId) {
      setSelectedCard("overview");
    } else {
      setSelectedCard(cardId);
    }
  };

  return (
    <div className="space-y-6 pb-8 font-sans">
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
