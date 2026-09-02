"use client";

import React, { useState } from "react";
import type { CertificateItem } from "../../../types";
import { MOCK_CERTIFICATES } from "../../Common/mockData";
import { CertificatePreviewModal } from "../../Common/CertificatePreviewModal";
import { CertificateCard } from "./CertificateCard";
import { CertificatesFilter } from "./CertificatesFilter";

interface CertificatesSectionProps {
  certificates?: CertificateItem[];
  onSelectCertificate?: (cert: CertificateItem) => void;
}

export function CertificatesSection({
  certificates = MOCK_CERTIFICATES,
  onSelectCertificate,
}: CertificatesSectionProps) {
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownload = (cert: CertificateItem) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      setToastMessage(`Certificate "${cert.certificateId}" downloaded successfully!`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 900);
  };

  const handleCopyId = (certId: string) => {
    navigator.clipboard?.writeText(certId);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenPreview = (cert: CertificateItem) => {
    setActiveCertificate(cert);
    onSelectCertificate?.(cert);
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-3 animate-fade-in">
          <span className="text-emerald-400 text-base">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📜</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Official Certificates & Merit Awards
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Download verified certificates of merit, distinction, and medals earned across all completed Olympiads.
          </p>
        </div>

        <CertificatesFilter totalCount={certificates.length} />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            onPreview={handleOpenPreview}
            onDownload={handleDownload}
            isDownloading={downloadingId === cert.id}
            onCopyId={handleCopyId}
            isCopied={copiedId === cert.certificateId}
          />
        ))}
      </div>

      {/* Online Verification Prompt Banner */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50/80 rounded-2xl p-4 sm:p-5 border border-violet-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-violet-500/25">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-black text-slate-900">Instant Certificate Verification</h5>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              All certificates carry an official digital cryptographic hash and can be verified by schools and institutions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-emerald-200">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Student Credentials
          </span>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificatePreviewModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
        onDownload={handleDownload}
      />
    </section>
  );
}
