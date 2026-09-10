"use client";

import React, { useState } from "react";
import { ResultsStatCards } from "./results/ResultsStatCards";
import { ResultsFilterBar } from "./results/ResultsFilterBar";
import { ResultsRankSheetTable } from "./results/ResultsRankSheetTable";
import { ResultsAllStudentsTable } from "./results/ResultsAllStudentsTable";
import { ResultsRegisteredStudentsTable } from "./results/ResultsRegisteredStudentsTable";
import { ResultsMeritListTable } from "./results/ResultsMeritListTable";
import { ResultsPublishedTable } from "./results/ResultsPublishedTable";
import { ResultsPagination } from "./results/ResultsPagination";
import {
  initialRankSheetData,
  allStudentsData,
  registeredStudentsData,
  meritListData,
  publishedResultsData,
} from "./results/mockData";
import { ResultsFilterState } from "./results/types";

export default function ResultsPanel() {
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [rankSheetList] = useState(initialRankSheetData);
  const [allStudentsList] = useState(allStudentsData);
  const [registeredStudentsList] = useState(registeredStudentsData);
  const [meritList] = useState(meritListData);
  const [publishedResultsList] = useState(publishedResultsData);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<ResultsFilterState>({
    olympiad: "All Olympiads",
    school: "All Schools",
    classNum: "All Classes",
    status: "Published",
    dateRange: "01 May 2026 - 12 May 2026",
    searchQuery: "",
    medal: "All Medals",
  });

  const handleFilterChange = (key: keyof ResultsFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const isTotalStudentsView = selectedCardId === "total";
  const isRegisteredStudentsView = selectedCardId === "registered";
  const isMeritListView = selectedCardId === "merit";
  const isPublishedResultsView = selectedCardId === "published";

  // Filter published results
  const filteredPublishedResults = publishedResultsList.filter((item) => {
    const q = filters.searchQuery.toLowerCase().trim();
    return (
      !q ||
      item.olympiadName.toLowerCase().includes(q) ||
      item.examCode.toLowerCase().includes(q)
    );
  });

  // Filter merit list
  const filteredMeritList = meritList.filter((item) => {
    const q = filters.searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.studentName.toLowerCase().includes(q) ||
      item.registrationId.toLowerCase().includes(q) ||
      item.rollNo.toLowerCase().includes(q) ||
      item.schoolName.toLowerCase().includes(q);

    const matchesSchool =
      filters.school === "All Schools" || item.schoolName === filters.school;

    const matchesMedal =
      !filters.medal ||
      filters.medal === "All Medals" ||
      item.medal === filters.medal;

    return matchesSearch && matchesSchool && matchesMedal;
  });

  // Filter rank sheet
  const filteredRankSheet = rankSheetList.filter((item) => {
    const q = filters.searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.studentName.toLowerCase().includes(q) ||
      item.registrationId.toLowerCase().includes(q) ||
      item.rollNo.toLowerCase().includes(q) ||
      item.schoolName.toLowerCase().includes(q);

    const matchesSchool =
      filters.school === "All Schools" || item.schoolName === filters.school;

    return matchesSearch && matchesSchool;
  });

  // Filter all students
  const filteredAllStudents = allStudentsList.filter((item) => {
    const q = filters.searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.studentName.toLowerCase().includes(q) ||
      item.registrationId.toLowerCase().includes(q) ||
      item.rollNo.toLowerCase().includes(q) ||
      item.schoolName.toLowerCase().includes(q);

    const matchesSchool =
      filters.school === "All Schools" || item.schoolName === filters.school;

    return matchesSearch && matchesSchool;
  });

  // Filter registered students
  const filteredRegisteredStudents = registeredStudentsList.filter((item) => {
    const q = filters.searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.studentName.toLowerCase().includes(q) ||
      item.registrationId.toLowerCase().includes(q) ||
      item.rollNo.toLowerCase().includes(q) ||
      item.schoolName.toLowerCase().includes(q);

    const matchesSchool =
      filters.school === "All Schools" || item.schoolName === filters.school;

    return matchesSearch && matchesSchool;
  });

  const handleExport = () => {
    const dataToExport = isPublishedResultsView
      ? filteredPublishedResults
      : isMeritListView
      ? filteredMeritList
      : isRegisteredStudentsView
      ? filteredRegisteredStudents
      : isTotalStudentsView
      ? filteredAllStudents
      : filteredRankSheet;
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isPublishedResultsView
      ? "published_results.json"
      : isMeritListView
      ? "merit_list.json"
      : isRegisteredStudentsView
      ? "registered_students.json"
      : isTotalStudentsView
      ? "all_students.json"
      : "rank_sheet.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePublish = () => {
    alert("Action completed successfully!");
  };

  const totalItemsCount = isPublishedResultsView
    ? filteredPublishedResults.length
    : isMeritListView
    ? filteredMeritList.length
    : isRegisteredStudentsView
    ? filteredRegisteredStudents.length
    : isTotalStudentsView
    ? filteredAllStudents.length
    : filteredRankSheet.length;

  return (
    <div className="space-y-6 pb-8 font-sans text-slate-900">
      {/* 1. Top Stat Cards */}
      <ResultsStatCards
        selectedCardId={selectedCardId}
        onSelectCard={(id) => {
          const nextCardId = selectedCardId === id ? "" : id;
          setSelectedCardId(nextCardId);
          setFilters((prev) => ({
            ...prev,
            status:
              nextCardId === "registered"
                ? "Registered"
                : nextCardId === "total"
                ? "All Status"
                : "Published",
            medal: "All Medals",
          }));
          setCurrentPage(1);
        }}
      />

      {/* 2. Filter Bar */}
      <ResultsFilterBar
        filters={filters}
        isTotalStudentsView={isTotalStudentsView}
        isRegisteredStudentsView={isRegisteredStudentsView}
        isMeritListView={isMeritListView}
        isPublishedResultsView={isPublishedResultsView}
        onFilterChange={handleFilterChange}
        onPublish={handlePublish}
        onExport={handleExport}
      />

      {/* 3. Main Dynamic Table View */}
      {isPublishedResultsView ? (
        <ResultsPublishedTable results={filteredPublishedResults} />
      ) : isMeritListView ? (
        <ResultsMeritListTable students={filteredMeritList} />
      ) : isRegisteredStudentsView ? (
        <ResultsRegisteredStudentsTable students={filteredRegisteredStudents} />
      ) : isTotalStudentsView ? (
        <ResultsAllStudentsTable students={filteredAllStudents} />
      ) : (
        <ResultsRankSheetTable records={filteredRankSheet} />
      )}

      {/* 4. Pagination */}
      <ResultsPagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={totalItemsCount}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
