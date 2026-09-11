"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ActiveCardType, ExamRecord } from "./types";
import { initialExamsList, initialCompletedExamsList } from "./mockData";
import { ExamStatsCards } from "./ExamStatsCards";
import { ExamFilterBar } from "./ExamFilterBar";
import { ExamTable } from "./ExamTable";
import { CompletedExamsTable } from "./CompletedExamsTable";
import { AddExamForm } from "../add_exam/AddExamForm";

function ExamsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || searchParams.get("status");

  const [activeCard, setActiveCard] = useState<ActiveCardType>(
    tabParam === "upcoming"
      ? "upcoming"
      : tabParam === "completed"
      ? "completed"
      : "all"
  );

  useEffect(() => {
    if (tabParam === "upcoming") {
      setActiveCard("upcoming");
    } else if (tabParam === "completed") {
      setActiveCard("completed");
    }
  }, [tabParam]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddingExam, setIsAddingExam] = useState(false);

  const [examsList, setExamsList] = useState<ExamRecord[]>(initialExamsList);
  const [completedExamsList] = useState(initialCompletedExamsList);

  // Intercept top back button when filling Add Exam form
  useEffect(() => {
    const handleBackClick = (e: Event) => {
      if (isAddingExam) {
        e.preventDefault();
        setIsAddingExam(false);
      }
    };

    window.addEventListener("school-admin-back-click", handleBackClick);
    return () => window.removeEventListener("school-admin-back-click", handleBackClick);
  }, [isAddingExam]);

  const handleAddNewExam = (newExam: ExamRecord) => {
    setExamsList((prev) => [newExam, ...prev]);
    setIsAddingExam(false);
  };

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

  if (isAddingExam) {
    return (
      <AddExamForm
        onCancel={() => setIsAddingExam(false)}
        onSave={handleAddNewExam}
      />
    );
  }

  return (
    <div className="space-y-6 w-full font-sans text-slate-900">
      {/* Top Metric Cards */}
      <ExamStatsCards
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        totalExamsCount={examsList.length + completedExamsList.length}
        activeExamsCount={examsList.filter((e) => e.status === "Open").length}
        upcomingExamsCount={examsList.filter((e) => e.status === "Upcoming").length}
        completedExamsCount={completedExamsList.length}
      />

      {/* Filter and Search Bar with working Add Exam trigger */}
      <ExamFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddExam={() => setIsAddingExam(true)}
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
          totalExamsCount={examsList.length}
        />
      )}
    </div>
  );
}

export function ExamsPanel() {
  return (
    <Suspense fallback={<div className="p-4 text-slate-500 font-semibold">Loading exams...</div>}>
      <ExamsContent />
    </Suspense>
  );
}

export default ExamsPanel;
