"use client";

import { useState } from "react";
import { ActiveCardType, ExamRegistrationRecord } from "./types";
import { initialExamRegistrations, initialClosedExamsList } from "./mockData";
import { ExamRegistrationStats } from "./ExamRegistrationStats";
import { ExamRegistrationFilters } from "./ExamRegistrationFilters";
import { ExamRegistrationTable } from "./ExamRegistrationTable";
import { ClosedExamsTable } from "./ClosedExamsTable";

export function ExamRegistrationPanel() {
  const [activeCard, setActiveCard] = useState<ActiveCardType>("all");
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

      {/* Filter and Search Bar */}
      <ExamRegistrationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
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

export default ExamRegistrationPanel;
