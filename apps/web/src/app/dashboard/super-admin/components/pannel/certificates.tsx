"use client";

import React, { useState, useMemo } from "react";
import { LayoutDashboard } from "lucide-react";
import CertificatesStatCards from "./certificates/CertificatesStatCards";
import CertificatesFilterBar from "./certificates/CertificatesFilterBar";
import CertificatesStudentsTable from "./certificates/CertificatesStudentsTable";
import CertificateTemplatesCard from "./certificates/CertificateTemplatesCard";
import CertificatesMeritIssuedTable from "./certificates/CertificatesMeritIssuedTable";
import CertificatesParticipationIssuedTable from "./certificates/CertificatesParticipationIssuedTable";
import CertificatesPendingTable from "./certificates/CertificatesPendingTable";
import CertificatesTotalIssuedTable from "./certificates/CertificatesTotalIssuedTable";
import CertificatesPagination from "./certificates/CertificatesPagination";
import CertificateModal, { downloadCertificateImage } from "./certificates/CertificateModal";
import {
  initialCertificatesData,
  participationCertificatesData,
  pendingCertificatesData,
  totalCertificatesData,
} from "./certificates/mockData";
import { CertificateRecord, CertificatesFilterState, CertificatesViewMode } from "./certificates/types";

export default function CertificatesPanel() {
  const [data] = useState<CertificateRecord[]>(initialCertificatesData);
  const [participationData] = useState<CertificateRecord[]>(participationCertificatesData);
  const [pendingData] = useState<CertificateRecord[]>(pendingCertificatesData);
  const [totalData] = useState<CertificateRecord[]>(totalCertificatesData);
  const [viewMode, setViewMode] = useState<CertificatesViewMode>("default");
  const [filters, setFilters] = useState<CertificatesFilterState>({
    olympiad: "All",
    school: "All",
    classNum: "All",
    certificateTypeFilter: "All Types",
    categoryFilter: "All Categories",
    status: "Issued",
    searchQuery: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CertificateRecord | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<"Merit" | "Participation" | null>(null);

  const handleFilterChange = (key: keyof CertificatesFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectCardMode = (mode: CertificatesViewMode) => {
    setViewMode(mode);
    if (mode === "merit") {
      setFilters((prev) => ({ ...prev, certificateTypeFilter: "Merit Certificates", status: "Issued" }));
    } else if (mode === "participation") {
      setFilters((prev) => ({ ...prev, certificateTypeFilter: "Participation Certificates", status: "Issued" }));
    } else if (mode === "pending") {
      setFilters((prev) => ({ ...prev, certificateTypeFilter: "Pending Certificates", status: "Pending" }));
    } else if (mode === "total") {
      setFilters((prev) => ({ ...prev, certificateTypeFilter: "All Types", categoryFilter: "All Categories", status: "All" }));
    }
  };

  const filteredData = useMemo(() => {
    const dataset =
      viewMode === "total"
        ? totalData
        : viewMode === "pending"
          ? pendingData
          : viewMode === "participation"
            ? participationData
            : data;
    return dataset.filter((item) => {
      if (filters.olympiad !== "All" && !item.examName.includes(filters.olympiad)) return false;
      if (filters.classNum !== "All" && item.classNum !== filters.classNum) return false;
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = item.studentName.toLowerCase().includes(query);
        const matchReg = item.registrationId.toLowerCase().includes(query);
        const matchRoll = item.rollNo.toLowerCase().includes(query);
        if (!matchName && !matchReg && !matchRoll) return false;
      }
      return true;
    });
  }, [data, participationData, pendingData, totalData, filters, viewMode]);

  const handleViewCertificate = (student: CertificateRecord) => {
    setSelectedStudent(student);
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };

  const handlePreviewTemplate = (type: "Merit" | "Participation") => {
    setSelectedStudent(null);
    setSelectedTemplate(type);
    setIsModalOpen(true);
  };

  const handleDownloadCertificates = () => {
    if (filteredData.length > 0) {
      filteredData.slice(0, 5).forEach((student, index) => {
        setTimeout(() => {
          downloadCertificateImage({
            name: student.studentName,
            exam: student.examName,
            regId: student.registrationId,
            percentage: student.percentage,
            isMerit: student.certificateType === "Merit",
          });
        }, index * 300);
      });
    }
  };

  const handleDownloadSingleCertificate = (student: CertificateRecord) => {
    downloadCertificateImage({
      name: student.studentName,
      exam: student.examName,
      regId: student.registrationId,
      percentage: student.percentage,
      isMerit: student.certificateType === "Merit",
    });
  };

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setViewMode("default");
            setFilters({
              olympiad: "All",
              school: "All",
              classNum: "All",
              certificateTypeFilter: "All Types",
              categoryFilter: "All Categories",
              status: "Issued",
              searchQuery: "",
            });
            setCurrentPage(1);
          }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-2xs border ${
            viewMode === "default"
              ? "bg-[#3B1EAE] text-white border-[#3B1EAE] shadow-purple-600/20"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 hover:text-purple-700"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>
      </div>

      <CertificatesStatCards selectedCardMode={viewMode} onSelectCardMode={handleSelectCardMode} />
      <CertificatesFilterBar
        filters={filters}
        viewMode={viewMode}
        onFilterChange={handleFilterChange}
        onDownload={handleDownloadCertificates}
        onExport={handleDownloadCertificates}
      />

      {viewMode === "total" ? (
        <div className="w-full">
          <CertificatesTotalIssuedTable data={filteredData} onViewCertificate={handleViewCertificate} onDownloadCertificate={handleViewCertificate} />
        </div>
      ) : viewMode === "pending" ? (
        <div className="w-full">
          <CertificatesPendingTable data={filteredData} onIssueCertificate={handleViewCertificate} />
        </div>
      ) : viewMode === "merit" ? (
        <div className="w-full">
          <CertificatesMeritIssuedTable data={filteredData} onViewCertificate={handleViewCertificate} onDownloadCertificate={handleViewCertificate} />
        </div>
      ) : viewMode === "participation" ? (
        <div className="w-full">
          <CertificatesParticipationIssuedTable data={filteredData} onViewCertificate={handleViewCertificate} onDownloadCertificate={handleViewCertificate} />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          <div className="xl:col-span-7 space-y-4">
            <CertificatesStudentsTable data={filteredData} onViewCertificate={handleViewCertificate} onDownloadCertificate={handleViewCertificate} />
            <CertificatesPagination currentPage={currentPage} totalPages={1} totalResults={filteredData.length} onPageChange={(page) => setCurrentPage(page)} />
          </div>
          <div className="xl:col-span-5 h-full">
            <CertificateTemplatesCard onPreviewTemplate={handlePreviewTemplate} />
          </div>
        </div>
      )}

      <CertificateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} student={selectedStudent} templateType={selectedTemplate} />
    </div>
  );
}
