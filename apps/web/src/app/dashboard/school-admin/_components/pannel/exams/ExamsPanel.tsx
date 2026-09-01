"use client";

import { useState } from "react";
import { ActiveCardType, ExamRecord } from "./types";
import { initialExamsList, initialCompletedExamsList } from "./mockData";
import { ExamStatsCards } from "./ExamStatsCards";
import { ExamFilterBar } from "./ExamFilterBar";
import { ExamTable } from "./ExamTable";
import { CompletedExamsTable } from "./CompletedExamsTable";

export function ExamsPanel() {
  const [activeCard, setActiveCard] = useState<ActiveCardType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [examsList] = useState<ExamRecord[]>(initialExamsList);
  const [completedExamsList] = useState(initialCompletedExamsList);

  const filteredExams = examsList.filter((item) => {
    const matchesSearch =
      item.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examCode.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeCard === "active") return matchesSearch && item.status === "Open";
    if (activeCard === "upcoming") return matchesSearch && item.status === "Upcoming";

    return matchesSearch;
  });

  const filteredCompletedExams = completedExamsList.filter((item) => {
    return (
      item.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 w-full font-sans text-slate-900">
      {/* Top Metric Cards */}
      <ExamStatsCards
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        totalExamsCount={15}
        activeExamsCount={4}
        upcomingExamsCount={6}
        completedExamsCount={5}
      />

      {/* Filter and Search Bar */}
      <ExamFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Data Table */}
      {activeCard === "completed" ? (
        <CompletedExamsTable
          completedExams={filteredCompletedExams}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      ) : (
        <ExamTable
          exams={filteredExams}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalExamsCount={15}
        />
      )}
    </div>
  );
}

export default ExamsPanel;
