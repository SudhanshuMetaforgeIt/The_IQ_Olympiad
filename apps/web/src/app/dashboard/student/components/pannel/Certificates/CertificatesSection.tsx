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
    <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
          <span className="text-emerald-400 text-base">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📜</span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
              Official Certificates & Merit Awards
            </h3>
          </div>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
            Download verified certificates of merit, distinction, and medals earned across all completed Olympiads.
          </p>
        </div>

        <CertificatesFilter totalCount={certificates.length} />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
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
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50/80 rounded-xl p-3 sm:p-3.5 border border-violet-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            <h5 className="text-xs font-black text-slate-900 leading-snug">Instant Certificate Verification</h5>
            <p className="text-[11px] font-medium text-slate-500">
              All certificates carry an official digital cryptographic hash and can be verified by schools.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <CertificatePreviewModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
        onDownload={handleDownload}
      />
    </section>
  );
}
