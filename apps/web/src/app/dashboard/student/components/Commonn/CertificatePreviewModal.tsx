"use client";

import React from "react";
import type { CertificateItem } from "../../types";

interface CertificatePreviewModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  onDownload: (cert: CertificateItem) => void;
}

export function CertificatePreviewModal({
  certificate,
  onClose,
  onDownload,
}: CertificatePreviewModalProps) {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar Controls */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span className="font-bold text-sm text-slate-200">
              Certificate Viewer • {certificate.certificateId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDownload(certificate)}
              className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title="Close viewer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Ornate Certificate Paper Canvas */}
        <div className="p-6 sm:p-10 bg-amber-50/30">
          <div className="bg-white border-8 border-double border-amber-600/60 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden text-center space-y-5">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-amber-500 text-2xl select-none font-serif">❧</div>
            <div className="absolute top-2 right-2 text-amber-500 text-2xl select-none font-serif">☙</div>
            <div className="absolute bottom-2 left-2 text-amber-500 text-2xl select-none font-serif">❧</div>
            <div className="absolute bottom-2 right-2 text-amber-500 text-2xl select-none font-serif">☙</div>

            {/* Organization Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full text-[10px] font-black tracking-widest text-amber-900 uppercase">
                ★ THE IQ OLYMPIAD FOUNDATION ★
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif uppercase pt-1">
                {certificate.awardType === "gold"
                  ? "Certificate of Merit & Excellence"
                  : "Certificate of Distinction"}
              </h2>
              <p className="text-[11px] uppercase tracking-widest font-bold text-amber-700">
                National Level Scholastic Recognition
              </p>
            </div>

            {/* Divider Ribbon Graphic */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-amber-500 text-sm">✦ ✦ ✦</span>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            {/* Recipient Declaration */}
            <div className="space-y-2 py-2">
              <p className="text-xs sm:text-sm font-medium text-slate-500 italic">
                This certificate is proudly awarded to
              </p>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                {certificate.recipientName}
              </h3>
              <p className="text-xs font-semibold text-slate-600 max-w-lg mx-auto leading-relaxed pt-1">
                of <strong className="text-slate-900">{certificate.school}</strong> ({certificate.grade}) for outstanding performance in the{" "}
                <strong className="text-violet-900 font-extrabold">{certificate.examTitle}</strong> securing{" "}
                <span className="text-amber-800 font-black">National Rank #{certificate.rank}</span> with an aggregate score of{" "}
                <span className="text-emerald-700 font-black">{certificate.scorePercentage}%</span>.
              </p>
            </div>

            {/* Seal & Signatures Row */}
            <div className="pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Left Signature */}
              <div className="text-center sm:text-left space-y-1">
                <div className="font-serif italic text-base text-slate-800 border-b border-slate-300 pb-0.5 px-4 font-bold">
                  Dr. A. K. Verma
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Chief Academic Officer
                </span>
              </div>

              {/* Center Official Gold Seal Badge */}
              <div className="size-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-amber-950 flex flex-col items-center justify-center p-2 border-4 border-white shadow-md shadow-amber-500/30">
                <span className="text-lg leading-none">🏆</span>
                <span className="text-[8px] font-black uppercase tracking-tighter text-center leading-none mt-1">
                  OFFICIAL SEAL
                </span>
                <span className="text-[7px] font-extrabold text-amber-900">VERIFIED</span>
              </div>

              {/* Right Signature */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic text-base text-slate-800 border-b border-slate-300 pb-0.5 px-4 font-bold">
                  Prof. Sarah Jenkins
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  President, Olympiad Council
                </span>
              </div>
            </div>

            {/* Footer Credential Verification Info */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-bold text-slate-400 border-t border-slate-100">
              <span>Certificate ID: <strong className="font-mono text-slate-600">{certificate.certificateId}</strong></span>
              <span>Issued Date: <strong className="text-slate-600">{certificate.issueDate}</strong></span>
              <span className="text-emerald-600">● Digitally Authenticated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
