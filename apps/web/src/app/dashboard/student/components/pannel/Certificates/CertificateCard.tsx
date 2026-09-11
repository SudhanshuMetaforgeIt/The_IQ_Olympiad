"use client";

import React from "react";
import type { CertificateItem } from "../../../types";

interface CertificateCardProps {
  certificate: CertificateItem;
  onPreview: (cert: CertificateItem) => void;
  onDownload: (cert: CertificateItem) => void;
  isDownloading: boolean;
  onCopyId: (id: string) => void;
  isCopied: boolean;
}

export function CertificateCard({
  certificate,
  onPreview,
  onDownload,
  isDownloading,
  onCopyId,
  isCopied,
}: CertificateCardProps) {
  const isGold = certificate.awardType === "gold";

  return (
    <div
      className={`rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 hover:shadow-sm flex flex-col justify-between relative overflow-hidden group ${
        isGold
          ? "bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border-amber-200/80"
          : "bg-gradient-to-br from-slate-50/90 via-white to-indigo-50/30 border-slate-200/90"
      }`}
    >
      {/* Background Watermark Crest */}
      <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
        <svg className="w-32 h-32 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Card Header: Award Badge & Subject Category */}
      <div className="flex items-start justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className={`size-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs border ${
              isGold
                ? "bg-amber-100 border-amber-300 text-amber-800"
                : "bg-indigo-50 border-indigo-200 text-indigo-700"
            }`}
          >
            {isGold ? <span className="text-lg">🥇</span> : <span className="text-lg">🥈</span>}
          </div>
          <div>
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded inline-block ${
                isGold ? "bg-amber-200/70 text-amber-900" : "bg-indigo-100 text-indigo-900"
              }`}
            >
              {certificate.badgeTitle}
            </span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 leading-snug">
              {certificate.examTitle}
            </h4>
          </div>
        </div>

        {/* Score Pill */}
        <div className="text-right shrink-0">
          <span className="text-base font-black text-emerald-600 block leading-tight">
            {certificate.scorePercentage}%
          </span>
          <span className="text-[8px] font-bold text-slate-400 uppercase">Score</span>
        </div>
      </div>

      {/* Meta details: ID, Date, Rank */}
      <div className="bg-white/80 backdrop-blur-xs rounded-xl p-2.5 border border-slate-100 space-y-1 mb-3 text-[11px]">
        <div className="flex items-center justify-between font-semibold text-slate-600">
          <span className="text-slate-400">Recipient:</span>
          <span className="font-bold text-slate-900">{certificate.recipientName} ({certificate.grade})</span>
        </div>
        <div className="flex items-center justify-between font-semibold text-slate-600">
          <span className="text-slate-400">Issued On:</span>
          <span className="font-bold text-slate-700">{certificate.issueDate}</span>
        </div>
        <div className="flex items-center justify-between font-semibold text-slate-600">
          <span className="text-slate-400">Certificate ID:</span>
          <button
            type="button"
            onClick={() => onCopyId(certificate.certificateId)}
            className="font-mono text-[10px] font-bold text-violet-700 hover:text-violet-900 flex items-center gap-1 cursor-pointer"
            title="Click to copy Certificate ID"
          >
            <span>{certificate.certificateId}</span>
            <span className="text-[9px] text-slate-400">
              {isCopied ? "✓ Copied" : "📋"}
            </span>
          </button>
        </div>
      </div>

      {/* Action Buttons: Preview + Download */}
      <div className="flex items-center gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => onPreview(certificate)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition flex items-center justify-center gap-1 cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => onDownload(certificate)}
          disabled={isDownloading}
          className={`py-1.5 px-3 rounded-lg border font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer ${
            isGold
              ? "border-amber-300 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
          }`}
        >
          {isDownloading ? (
            <>
              <div className="size-3 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
