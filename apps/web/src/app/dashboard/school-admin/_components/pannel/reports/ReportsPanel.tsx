"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STAT_METRICS, PERFORMANCE_TRENDS, DONUT_CATEGORIES, RECENT_REPORTS, MERIT_STUDENTS_LIST } from "./mockData";
import { QUALIFIED_TRENDS, AVERAGE_SCORE_TRENDS, QUALIFIED_EXAM_CATEGORIES, AVERAGE_SCORE_EXAM_CATEGORIES, QUALIFIED_EXAM_LIST, AVERAGE_SCORE_EXAM_LIST } from "./mockDataAnalytics";
import { ReportFilterState, StatMetric, MeritStudentItem } from "./types";
import { ReportsStatCards } from "./ReportsStatCards";
import { ReportsFilterBar } from "./ReportsFilterBar";
import { PerformanceOverviewChart } from "./PerformanceOverviewChart";
import { ReportsSummaryDonutChart } from "./ReportsSummaryDonutChart";
import { RecentReportsTable } from "./RecentReportsTable";
import { QualificationTrendChart } from "./QualificationTrendChart";
import { QualificationRateDonutChart } from "./QualificationRateDonutChart";
import { ExamWiseQualifiedTable } from "./ExamWiseQualifiedTable";
import { AverageScoreTrendChart } from "./AverageScoreTrendChart";
import { AverageScoreDonutChart } from "./AverageScoreDonutChart";
import { ExamWiseAverageScoreTable } from "./ExamWiseAverageScoreTable";
import { TopMeritStudentsTable } from "./TopMeritStudentsTable";
import { MeritStudentDetailsCard } from "./MeritStudentDetailsCard";

export function ReportsPanel() {
  const [selectedMetricId, setSelectedMetricId] = useState<StatMetric["id"]>("merit");
  const [selectedStudent, setSelectedStudent] = useState<MeritStudentItem>(MERIT_STUDENTS_LIST[0]);
  const [meritPage, setMeritPage] = useState(1);
  const [filters, setFilters] = useState<ReportFilterState>({ olympiad: "all", class: "all", section: "all", dateRange: "01 Apr 2025 - 31 May 2025", search: "" });

  const handleFilterChange = (key: keyof ReportFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredReports = useMemo(() => RECENT_REPORTS.filter((r) => !filters.search || r.name.toLowerCase().includes(filters.search.toLowerCase()) || r.examOrClass.toLowerCase().includes(filters.search.toLowerCase())), [filters.search]);
  const filteredQualifiedExams = useMemo(() => QUALIFIED_EXAM_LIST.filter((e) => !filters.search || e.examName.toLowerCase().includes(filters.search.toLowerCase())), [filters.search]);
  const filteredAverageExams = useMemo(() => AVERAGE_SCORE_EXAM_LIST.filter((e) => !filters.search || e.examName.toLowerCase().includes(filters.search.toLowerCase())), [filters.search]);
  const filteredMeritStudents = useMemo(() => MERIT_STUDENTS_LIST.filter((s) => !filters.search || s.studentName.toLowerCase().includes(filters.search.toLowerCase()) || s.examName.toLowerCase().includes(filters.search.toLowerCase())), [filters.search]);

  // Real File Downloader for Reports Export
  const handleExport = (format: "pdf" | "excel" | "csv") => {
    const exportData = filteredMeritStudents.map((s) => ({
      Rank: s.rank,
      Student: s.studentName,
      Class: s.class,
      Exam: s.examName,
      "Score (%)": s.scorePercentage,
      "Marks Obtained": `${s.marksObtained} / ${s.totalMarks}`,
      "Published On": s.publishedOn,
    }));
    const headers = Object.keys(exportData[0]);
    const csvLines = [headers.join(","), ...exportData.map((row) => headers.map((h) => `"${String(row[h as keyof typeof row]).replace(/"/g, '""')}"`).join(","))];
    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reports_export_${format}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <ReportsStatCards metrics={STAT_METRICS} selectedId={selectedMetricId} onSelectMetric={(id) => setSelectedMetricId(id)} />
      <ReportsFilterBar filters={filters} onFilterChange={handleFilterChange} onExport={handleExport} />

      {selectedMetricId === "merit" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8">
              <TopMeritStudentsTable students={filteredMeritStudents} selectedStudentId={selectedStudent.id} onSelectStudent={(student) => setSelectedStudent(student)} />
            </div>
            <div className="lg:col-span-4">
              <MeritStudentDetailsCard student={selectedStudent} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/80 text-xs font-medium text-slate-500 px-2">
            <p className="text-slate-400">Showing 1 to 10 of <span className="font-black text-slate-900">1,418</span> merit students</p>
            <div className="flex items-center gap-1.5">
              <button disabled={meritPage === 1} onClick={() => setMeritPage((p) => Math.max(1, p - 1))} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
              {[1, 2, 3].map((page) => (
                <button key={page} onClick={() => setMeritPage(page)} className={`w-8 h-8 rounded-xl font-bold transition cursor-pointer ${meritPage === page ? "bg-[#7c3aed] text-white shadow-2xs" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>{page}</button>
              ))}
              <span className="px-1 text-slate-400 font-medium">...</span>
              <button onClick={() => setMeritPage(142)} className="w-8 h-8 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer">142</button>
              <button onClick={() => setMeritPage((p) => Math.min(142, p + 1))} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      ) : selectedMetricId === "qualified" ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7"><QualificationTrendChart data={QUALIFIED_TRENDS} /></div>
            <div className="lg:col-span-5"><QualificationRateDonutChart categories={QUALIFIED_EXAM_CATEGORIES} /></div>
          </div>
          <ExamWiseQualifiedTable exams={filteredQualifiedExams} onPreview={(exam) => alert(`Viewing details for: ${exam.examName}`)} />
        </>
      ) : selectedMetricId === "avg" ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7"><AverageScoreTrendChart data={AVERAGE_SCORE_TRENDS} /></div>
            <div className="lg:col-span-5"><AverageScoreDonutChart categories={AVERAGE_SCORE_EXAM_CATEGORIES} /></div>
          </div>
          <ExamWiseAverageScoreTable exams={filteredAverageExams} onPreview={(exam) => alert(`Viewing details for: ${exam.examName}`)} />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7"><PerformanceOverviewChart data={PERFORMANCE_TRENDS} /></div>
            <div className="lg:col-span-5"><ReportsSummaryDonutChart categories={DONUT_CATEGORIES} /></div>
          </div>
          <RecentReportsTable reports={filteredReports} totalCount={RECENT_REPORTS.length} onPreview={(report) => alert(`Previewing: ${report.name}`)} onDownload={() => handleExport("csv")} />
        </>
      )}
    </div>
  );
}

export default ReportsPanel;
