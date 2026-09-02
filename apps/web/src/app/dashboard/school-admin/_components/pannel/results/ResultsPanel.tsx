"use client";

import { useState } from "react";
import { ActiveCardType, ResultRecord, AppearedStudentRecord } from "./types";
import { initialStudentResults, initialAppearedStudentsList } from "./mockData";
import { ResultStatsCards } from "./ResultStatsCards";
import { ResultsTrendChart } from "./ResultsTrendChart";
import { AppearedStudentsTrendChart } from "./AppearedStudentsTrendChart";
import { QualifiedStudentsTrendChart } from "./QualifiedStudentsTrendChart";
import { AppearedStudentsByExamChart } from "./AppearedStudentsByExamChart";
import { AppearedStudentsByClassChart } from "./AppearedStudentsByClassChart";
import { AvgScoreTrendChart } from "./AvgScoreTrendChart";
import { AvgScoreByExamDonutChart } from "./AvgScoreByExamDonutChart";
import { AvgScoreBySubjectChart } from "./AvgScoreBySubjectChart";
import { MeritAppearedTrendChart } from "./MeritAppearedTrendChart";
import { MeritAppearedByExamDonutChart } from "./MeritAppearedByExamDonutChart";
import { MeritAppearedByClassChart } from "./MeritAppearedByClassChart";
import { PassPercentageDonutChart } from "./PassPercentageDonutChart";
import { SubjectPerformanceChart } from "./SubjectPerformanceChart";
import { ResultsFilterBar } from "./ResultsFilterBar";
import { ResultsTable } from "./ResultsTable";
import { AppearedStudentsTable } from "./AppearedStudentsTable";
import { QualifiedStudentsTable } from "./QualifiedStudentsTable";
import { AvgScoreTable } from "./AvgScoreTable";
import { MeritStudentsTable } from "./MeritStudentsTable";
import { exportResultsToCSV } from "./exportUtils";

export function ResultsPanel() {
  const [activeCard, setActiveCard] = useState<ActiveCardType>("merit");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const [resultsList] = useState<ResultRecord[]>(initialStudentResults);
  const [appearedList] = useState<AppearedStudentRecord[]>(initialAppearedStudentsList);

  const filteredResults = resultsList.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = selectedExam === "All Exams" || item.examName.includes(selectedExam);
    const matchesClass = selectedClass === "All Classes" || item.className === selectedClass;
    let matchesStatus = selectedStatus === "All Status" || item.resultStatus === selectedStatus;
    if (activeCard === "qualified" || activeCard === "merit") {
      matchesStatus = item.resultStatus === "Pass";
    }
    return matchesSearch && matchesExam && matchesClass && matchesStatus;
  });

  const filteredAppearedList = appearedList.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = selectedExam === "All Exams" || item.examName.includes(selectedExam);
    const matchesClass = selectedClass === "All Classes" || item.className === selectedClass;
    const matchesStatus = selectedStatus === "All Status" || item.attendanceStatus === selectedStatus;
    return matchesSearch && matchesExam && matchesClass && matchesStatus;
  });

  const renderTopChartsRow = () => {
    if (activeCard === "appeared") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <AppearedStudentsTrendChart />
          <AppearedStudentsByExamChart />
          <AppearedStudentsByClassChart />
        </div>
      );
    }
    if (activeCard === "qualified") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <QualifiedStudentsTrendChart />
          <PassPercentageDonutChart />
          <SubjectPerformanceChart />
        </div>
      );
    }
    if (activeCard === "avg_score") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <AvgScoreTrendChart />
          <AvgScoreByExamDonutChart />
          <AvgScoreBySubjectChart />
        </div>
      );
    }
    if (activeCard === "merit") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <MeritAppearedTrendChart />
          <MeritAppearedByExamDonutChart />
          <MeritAppearedByClassChart />
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ResultsTrendChart />
        <PassPercentageDonutChart />
        <SubjectPerformanceChart />
      </div>
    );
  };

  const renderDataTable = () => {
    if (activeCard === "appeared") {
      return <AppearedStudentsTable appearedStudents={filteredAppearedList} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRecordsCount={1624} />;
    }
    if (activeCard === "qualified") {
      return <QualifiedStudentsTable qualifiedStudents={filteredResults} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRecordsCount={1418} />;
    }
    if (activeCard === "avg_score") {
      return <AvgScoreTable results={filteredResults} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRecordsCount={1624} />;
    }
    if (activeCard === "merit") {
      return <MeritStudentsTable results={filteredResults} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRecordsCount={1418} />;
    }
    return <ResultsTable results={filteredResults} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRecordsCount={1624} />;
  };

  return (
    <div className="space-y-6 w-full font-sans text-slate-900">
      <ResultStatsCards
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        appearedStudentsCount={1624}
        qualifiedStudentsCount={1418}
        qualifiedPercentage="87.31% Qualified"
        avgStudentsScore="78.6%"
        meritStudentName="Aarav Sharma"
        meritStudentScore="99.2% in NSO"
      />
      {renderTopChartsRow()}
      <ResultsFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onExport={() => exportResultsToCSV(filteredResults, `IQ_Olympiad_${activeCard}_Results.csv`)}
      />
      {renderDataTable()}
    </div>
  );
}

export default ResultsPanel;
