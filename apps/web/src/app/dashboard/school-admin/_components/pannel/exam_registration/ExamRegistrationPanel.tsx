"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ActiveCardType, ExamRegistrationRecord } from "./types";
import { initialExamRegistrations, initialClosedExamsList } from "./mockData";
import { ExamRegistrationStats } from "./ExamRegistrationStats";
import { ExamRegistrationFilters } from "./ExamRegistrationFilters";
import { ExamRegistrationTable } from "./ExamRegistrationTable";
import { ClosedExamsTable } from "./ClosedExamsTable";

function ExamRegistrationContent() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  const [activeCard, setActiveCard] = useState<ActiveCardType>(
    statusParam === "pending" ? "pending" : "all"
  );

  useEffect(() => {
    if (statusParam === "pending") {
      setActiveCard("pending");
    }
  }, [statusParam]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [registrationsList] = useState<ExamRegistrationRecord[]>(initialExamRegistrations);
  const [closedExamsList] = useState(initialClosedExamsList);

  const filteredRegistrations = registrationsList.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExam = selectedExam === "All Exams" || item.examName.includes(selectedExam);
    const matchesClass = selectedClass === "All Classes" || item.className === selectedClass;

    let matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus;

    if (activeCard === "pending") {
      matchesStatus = item.status === "Pending";
    }

    return matchesSearch && matchesExam && matchesClass && matchesStatus;
  });

  const filteredClosedExams = closedExamsList.filter((item) => {
    const matchesSearch =
      item.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExam = selectedExam === "All Exams" || item.examName.includes(selectedExam);
    const matchesClass = selectedClass === "All Classes" || item.classes.includes(selectedClass);

    return matchesSearch && matchesExam && matchesClass;
  });

  // Real CSV File Downloader
  const handleExportCSV = () => {
    const dataToExport = filteredRegistrations.map((item) => ({
      "Student Name": item.studentName,
      "Student ID": item.studentId,
      "Class": item.className,
      "Exam Name": item.examName,
      "Schedule": item.schedule,
      "Registration Date": item.registrationDate,
      "Status": item.status,
    }));

    if (!dataToExport.length) return;
    const headers = Object.keys(dataToExport[0]);
    const csvLines = [
      headers.join(","),
      ...dataToExport.map((row) =>
        headers.map((h) => `"${String(row[h as keyof typeof row]).replace(/"/g, '""')}"`).join(",")
      ),
    ];

    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `exam_registrations_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 w-full font-sans text-slate-900">
      {/* Top Metric Cards */}
      <ExamRegistrationStats
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        totalRegistrationsCount={1621}
        pendingCount={221}
        closedCount={12}
      />

      {/* Filter and Search Bar with Working Export */}
      <ExamRegistrationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onExport={handleExportCSV}
      />

      {/* Data Table View */}
      {activeCard === "closed" ? (
        <ClosedExamsTable
          closedExams={filteredClosedExams}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      ) : (
        <ExamRegistrationTable
          registrations={filteredRegistrations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRecordsCount={1621}
          activeCard={activeCard}
        />
      )}
    </div>
  );
}

export function ExamRegistrationPanel() {
  return (
    <Suspense fallback={<div className="p-4 text-slate-500 font-semibold">Loading registrations...</div>}>
      <ExamRegistrationContent />
    </Suspense>
  );
}

export default ExamRegistrationPanel;
