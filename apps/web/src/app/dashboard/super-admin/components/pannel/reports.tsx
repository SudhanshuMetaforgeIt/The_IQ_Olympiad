"use client";

import React, { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import ReportsStatCards from "./reports/ReportsStatCards";
import ReportsFilterBar from "./reports/ReportsFilterBar";
import ReportsSchoolsFilterBar from "./reports/ReportsSchoolsFilterBar";
import ReportsStudentsFilterBar from "./reports/ReportsStudentsFilterBar";
import ReportsTestsFilterBar from "./reports/ReportsTestsFilterBar";
import ReportsParticipationFilterBar from "./reports/ReportsParticipationFilterBar";
import ReportsAvgScoreFilterBar from "./reports/ReportsAvgScoreFilterBar";
import ReportsPerformanceOverviewCard from "./reports/ReportsPerformanceOverviewCard";
import ReportsStudentsByClassCard from "./reports/ReportsStudentsByClassCard";
import ReportsStudentsByClassTop6Card from "./reports/ReportsStudentsByClassTop6Card";
import ReportsStudentsTrendCard from "./reports/ReportsStudentsTrendCard";
import ReportsTestsConductedTrendCard from "./reports/ReportsTestsConductedTrendCard";
import ReportsTestsByTypeCard from "./reports/ReportsTestsByTypeCard";
import ReportsParticipationRateTrendCard from "./reports/ReportsParticipationRateTrendCard";
import ReportsParticipationRateByClassCard from "./reports/ReportsParticipationRateByClassCard";
import ReportsAverageScoreTrendCard from "./reports/ReportsAverageScoreTrendCard";
import ReportsAverageScoreByClassCard from "./reports/ReportsAverageScoreByClassCard";
import ReportsSchoolsByStateCard from "./reports/ReportsSchoolsByStateCard";
import ReportsSchoolsByTypeCard from "./reports/ReportsSchoolsByTypeCard";
import ReportsSchoolsTrendCard from "./reports/ReportsSchoolsTrendCard";
import ReportsTopPerformingSchoolsTable from "./reports/ReportsTopPerformingSchoolsTable";
import ReportsStudentsTopPerformingSchoolsTable from "./reports/ReportsStudentsTopPerformingSchoolsTable";
import ReportsTopTestsConductedTable from "./reports/ReportsTopTestsConductedTable";
import ReportsParticipationRateByOlympiadTable from "./reports/ReportsParticipationRateByOlympiadTable";
import ReportsTopOlympiadsByAverageScoreTable from "./reports/ReportsTopOlympiadsByAverageScoreTable";
import ReportsRecentReportsList from "./reports/ReportsRecentReportsList";
import ReportsParticipationByOlympiad from "./reports/ReportsParticipationByOlympiad";
import ReportsTotalSchoolsTable from "./reports/ReportsTotalSchoolsTable";
import ReportsPagination from "./reports/ReportsPagination";
import { ReportsFilterState, ReportsViewMode } from "./reports/types";

export default function ReportsPanel() {
  const [viewMode, setViewMode] = useState<ReportsViewMode>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ReportsFilterState>({
    olympiad: "All", school: "All", classNum: "All", city: "All", state: "All",
    dateRange: "01 May 2026 - 12 May 2026", searchQuery: "",
  });

  const handleFilterChange = (key: keyof ReportsFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      olympiad: "All", school: "All", classNum: "All", city: "All", state: "All",
      dateRange: "01 May 2026 - 12 May 2026", searchQuery: "",
    });
  };

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setViewMode("default")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-2xs border ${viewMode === "default"
            ? "bg-[#3B1EAE] text-white border-[#3B1EAE] shadow-purple-600/20"
            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 hover:text-purple-700"
            }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>
      </div>

      <ReportsStatCards selectedCardMode={viewMode} onSelectCardMode={(mode) => setViewMode(mode)} />

      {viewMode === "schools" ? (
        <>
          <ReportsSchoolsFilterBar filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <ReportsSchoolsByStateCard />
            <ReportsSchoolsByTypeCard />
            <ReportsSchoolsTrendCard />
          </div>
          <ReportsTotalSchoolsTable />
        </>
      ) : viewMode === "students" ? (
        <>
          <ReportsStudentsFilterBar filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7"><ReportsStudentsTrendCard /></div>
            <div className="lg:col-span-5"><ReportsStudentsByClassTop6Card /></div>
          </div>
          <ReportsStudentsTopPerformingSchoolsTable />
        </>
      ) : viewMode === "tests" ? (
        <>
          <ReportsTestsFilterBar filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7"><ReportsTestsConductedTrendCard /></div>
            <div className="lg:col-span-5"><ReportsTestsByTypeCard /></div>
          </div>
          <ReportsTopTestsConductedTable />
        </>
      ) : viewMode === "participation" ? (
        <>
          <ReportsParticipationFilterBar filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7"><ReportsParticipationRateTrendCard /></div>
            <div className="lg:col-span-5"><ReportsParticipationRateByClassCard /></div>
          </div>
          <ReportsParticipationRateByOlympiadTable />
        </>
      ) : viewMode === "avg_score" ? (
        <>
          <ReportsAvgScoreFilterBar filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7"><ReportsAverageScoreTrendCard /></div>
            <div className="lg:col-span-5"><ReportsAverageScoreByClassCard /></div>
          </div>
          <ReportsTopOlympiadsByAverageScoreTable />
        </>
      ) : (
        <>
          <ReportsFilterBar filters={filters} onFilterChange={handleFilterChange} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2"><ReportsPerformanceOverviewCard /></div>
            <div className="lg:col-span-1"><ReportsStudentsByClassCard /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            <ReportsTopPerformingSchoolsTable />
            <ReportsRecentReportsList />
            <ReportsParticipationByOlympiad />
          </div>
          <ReportsPagination currentPage={currentPage} totalPages={20} totalResults={24} onPageChange={(page) => setCurrentPage(page)} />
        </>
      )}
    </div>
  );
}
