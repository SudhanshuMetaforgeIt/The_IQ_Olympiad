"use client";

import React, { useState } from "react";
import { X, Download, Printer, Award, Maximize2, Minimize2 } from "lucide-react";
import { CertificateRecord } from "./types";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: CertificateRecord | null;
  templateType?: "Merit" | "Participation" | null;
}

export function downloadCertificateImage({
  name,
  exam,
  regId,
  percentage,
  isMerit,
}: {
  name: string;
  exam: string;
  regId: string;
  percentage: string;
  isMerit: boolean;
}) {
  const width = 1200;
  const height = 850;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background Fill
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  // Soft Outer Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  if (isMerit) {
    bgGrad.addColorStop(0, "#fffbeb");
    bgGrad.addColorStop(0.5, "#ffffff");
    bgGrad.addColorStop(1, "#fef3c7");
  } else {
    bgGrad.addColorStop(0, "#eff6ff");
    bgGrad.addColorStop(0.5, "#ffffff");
    bgGrad.addColorStop(1, "#dbeafe");
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer Border Box
  ctx.lineWidth = 10;
  ctx.strokeStyle = isMerit ? "#fbbf24" : "#60a5fa";
  ctx.strokeRect(25, 25, width - 50, height - 50);

  // Inner Border Box
  ctx.lineWidth = 3;
  ctx.strokeStyle = isMerit ? "#fcd34d" : "#93c5fd";
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Header Brand Text
  ctx.textAlign = "center";
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("THE IQ OLYMPIAD", width / 2, 130);

  // Main Certificate Title
  ctx.fillStyle = isMerit ? "#b45309" : "#1d4ed8";
  ctx.font = "900 42px sans-serif";
  const certTitle = isMerit ? "CERTIFICATE OF MERIT" : "CERTIFICATE OF PARTICIPATION";
  ctx.fillText(certTitle, width / 2, 200);

  // Subtitle
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("THIS CERTIFICATE IS PROUDLY PRESENTED TO", width / 2, 250);

  // Recipient Name
  ctx.fillStyle = "#0f172a";
  ctx.font = "900 52px sans-serif";
  ctx.fillText(name, width / 2, 360);

  // Underline for name
  const nameWidth = ctx.measureText(name).width;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.moveTo(width / 2 - Math.max(nameWidth / 2 + 30, 180), 385);
  ctx.lineTo(width / 2 + Math.max(nameWidth / 2 + 30, 180), 385);
  ctx.stroke();

  // Performance Text
  ctx.fillStyle = "#475569";
  ctx.font = "500 20px sans-serif";
  ctx.fillText(`For outstanding performance in the ${exam} (${percentage})`, width / 2, 450);

  // Center Emblem Seal Circle
  const sealX = width / 2;
  const sealY = 600;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 48, 0, 2 * Math.PI);
  ctx.fillStyle = isMerit ? "rgba(254, 243, 199, 0.9)" : "rgba(219, 234, 254, 0.9)";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = isMerit ? "#fbbf24" : "#60a5fa";
  ctx.stroke();

  // Star in seal
  ctx.fillStyle = isMerit ? "#d97706" : "#2563eb";
  ctx.font = "bold 38px sans-serif";
  ctx.fillText("★", sealX, sealY + 12);

  // Left Details (Registration ID)
  ctx.textAlign = "left";
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("REGISTRATION ID", 80, 710);

  ctx.fillStyle = "#334155";
  ctx.font = "bold 20px monospace";
  ctx.fillText(regId, 80, 745);

  // Right Details (Authorized Signatory)
  ctx.textAlign = "right";
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("AUTHORIZED SIGNATORY", width - 80, 710);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("IQ Olympiad Committee", width - 80, 745);

  // Trigger Image Download
  const filename = `Certificate_${name.replace(/\s+/g, "_")}_${regId}.png`;
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function CertificateModal({
  isOpen,
  onClose,
  student,
  templateType,
}: CertificateModalProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!isOpen) return null;

  const isMerit = (templateType || student?.certificateType) === "Merit";
  const name = student?.studentName || "Student Name";
  const exam = student?.examName || "International Mathematics Olympiad";
  const regId = student?.registrationId || "IQ01001";
  const percentage = student?.percentage || "91.50%";

  const handleClose = () => {
    setIsFullScreen(false);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    downloadCertificateImage({
      name,
      exam,
      regId,
      percentage,
      isMerit,
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isFullScreen ? "p-0 sm:p-3 bg-slate-950/85 backdrop-blur-md" : "p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        }`}
    >
      <div
        className={`bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isFullScreen
            ? "w-full h-full max-w-none rounded-none sm:rounded-3xl"
            : "max-w-2xl w-full rounded-3xl"
          }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <Award className={`w-5 h-5 ${isMerit ? "text-amber-500" : "text-blue-500"}`} />
            <h3 className="text-base font-black text-slate-900">
              {isMerit ? "Merit Certificate Preview" : "Participation Certificate Preview"}
            </h3>
            {isFullScreen && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-extrabold uppercase tracking-wider">
                Full Screen View
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Full Screen / Normal Toggle Option */}
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isFullScreen ? "Exit Full Screen" : "Full Screen Mode"}
            >
              {isFullScreen ? (
                <Minimize2 className="w-4.5 h-4.5 stroke-[2.2]" />
              ) : (
                <Maximize2 className="w-4.5 h-4.5 stroke-[2.2]" />
              )}
            </button>

            {/* Close Option */}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Certificate Design */}
        <div className={`flex justify-center bg-slate-50/60 overflow-y-auto flex-1 items-center ${isFullScreen ? "p-8 sm:p-12" : "p-8"}`}>
          <div
            className={`w-full flex flex-col items-center justify-between text-center relative border-4 shadow-xl transition-all ${isFullScreen ? "max-w-4xl aspect-[1.4/1] p-12" : "max-w-xl aspect-[1.4/1] p-8"
              } rounded-3xl ${isMerit
                ? "border-amber-400 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 text-amber-950"
                : "border-blue-400 bg-gradient-to-b from-blue-50/70 via-white to-blue-50/40 text-slate-900"
              }`}
          >
            {/* Inner Border Line */}
            <div
              className={`absolute inset-2 sm:inset-3 border-2 rounded-2xl pointer-events-none ${isMerit ? "border-amber-300/80" : "border-blue-300/80"
                }`}
            />

            {/* Top Brand */}
            <div className="space-y-1.5 mt-2">
              <div className="flex items-center justify-center gap-2">
                <Award className={`${isFullScreen ? "w-9 h-9" : "w-7 h-7"} ${isMerit ? "text-amber-600" : "text-blue-600"}`} />
                <span className={`${isFullScreen ? "text-base" : "text-sm"} font-black tracking-wider uppercase text-slate-800`}>
                  THE IQ OLYMPIAD
                </span>
              </div>
              <h2
                className={`font-black tracking-widest uppercase mt-2 ${isFullScreen ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
                  } ${isMerit ? "text-amber-700" : "text-blue-700"}`}
              >
                {isMerit ? "CERTIFICATE OF MERIT" : "CERTIFICATE OF PARTICIPATION"}
              </h2>
              <p className={`${isFullScreen ? "text-sm" : "text-xs"} font-semibold text-slate-400 tracking-wide uppercase`}>
                THIS CERTIFICATE IS PROUDLY PRESENTED TO
              </p>
            </div>

            {/* Recipient Name */}
            <div className="my-4 space-y-2">
              <h3 className={`font-black text-slate-900 border-b-2 border-slate-300 pb-1.5 px-10 inline-block ${isFullScreen ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
                }`}>
                {name}
              </h3>
              <p className={`${isFullScreen ? "text-sm sm:text-base" : "text-xs"} text-slate-500 font-medium pt-2`}>
                For outstanding performance in the <strong className="text-slate-800">{exam}</strong> ({percentage})
              </p>
            </div>

            {/* Footer Signatures & Details */}
            <div className="w-full flex items-end justify-between pt-4 px-4 text-left">
              <div>
                <p className={`${isFullScreen ? "text-xs" : "text-[10px]"} text-slate-400 font-bold uppercase`}>Registration ID</p>
                <p className={`${isFullScreen ? "text-sm" : "text-xs"} font-mono font-bold text-slate-700`}>{regId}</p>
              </div>
              <div className={`${isFullScreen ? "w-16 h-16" : "w-12 h-12"} rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center`}>
                <Award className={`${isFullScreen ? "w-8 h-8" : "w-6 h-6"} ${isMerit ? "text-amber-600" : "text-blue-600"}`} />
              </div>
              <div className="text-right">
                <p className={`${isFullScreen ? "text-xs" : "text-[10px]"} text-slate-400 font-bold uppercase`}>Authorized Signatory</p>
                <p className={`${isFullScreen ? "text-sm" : "text-xs"} font-bold text-slate-800`}>IQ Olympiad Committee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

