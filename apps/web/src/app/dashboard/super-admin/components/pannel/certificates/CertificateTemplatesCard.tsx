"use client";

import React from "react";
import { Award, MoreVertical, Settings } from "lucide-react";

interface CertificateTemplatesCardProps {
  onPreviewTemplate?: (templateType: "Merit" | "Participation") => void;
}

export default function CertificateTemplatesCard({
  onPreviewTemplate,
}: CertificateTemplatesCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 flex flex-col justify-between h-full space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Certificate Templates
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Active certificate designs for issuing
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <Settings className="w-4 h-4" />
          <span>Manage Templates</span>
        </button>
      </div>

      {/* Template List - Expanded to Fill Height */}
      <div className="flex-1 flex flex-col justify-evenly space-y-6">
        {/* Merit Certificate Template */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border border-amber-200/60 bg-amber-50/20 hover:bg-amber-50/40 transition-all shadow-2xs">
          {/* Visual Certificate Frame - Gold Theme (Large Landscape) */}
          <div className="w-full sm:w-60 h-40 sm:h-44 rounded-2xl border-2 border-amber-400 bg-amber-50/50 p-4 flex flex-col items-center justify-between text-center shadow-xs shrink-0 relative overflow-hidden">
            <div className="absolute inset-2 border border-amber-300/80 rounded-xl pointer-events-none" />
            <div className="space-y-0.5 mt-1">
              <span className="block text-xs font-black tracking-widest uppercase text-amber-800">
                MERIT CERTIFICATE
              </span>
              <span className="block text-[8px] font-bold text-amber-600 tracking-wider">
                OF EXCELLENCE
              </span>
            </div>
            <div className="space-y-1 my-1">
              <span className="block text-[8px] text-slate-400">This is to certify that</span>
              <span className="block text-xs font-black text-slate-900 tracking-wide">
                Student Name
              </span>
              <span className="block text-[7.5px] text-slate-500 max-w-[160px] leading-tight mx-auto">
                has secured outstanding performance in the Olympiad
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white mb-0.5 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Template Info & Actions */}
          <div className="flex-1 flex flex-col justify-between h-full py-1 space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wide inline-block mb-1">
                Top Performers
              </span>
              <h4 className="text-base font-bold text-slate-900">Merit Certificate</h4>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Issued automatically to top 3 rank holders and high percentile scorers.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onPreviewTemplate?.("Merit")}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer text-center"
              >
                Preview
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Participation Certificate Template */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border border-blue-200/60 bg-blue-50/20 hover:bg-blue-50/40 transition-all shadow-2xs">
          {/* Visual Certificate Frame - Blue Theme (Large Landscape) */}
          <div className="w-full sm:w-60 h-40 sm:h-44 rounded-2xl border-2 border-blue-400 bg-blue-50/50 p-4 flex flex-col items-center justify-between text-center shadow-xs shrink-0 relative overflow-hidden">
            <div className="absolute inset-2 border border-blue-300/80 rounded-xl pointer-events-none" />
            <div className="space-y-0.5 mt-1">
              <span className="block text-xs font-black tracking-widest uppercase text-blue-800">
                PARTICIPATION
              </span>
              <span className="block text-[8px] font-bold text-blue-600 tracking-wider">
                CERTIFICATE
              </span>
            </div>
            <div className="space-y-1 my-1">
              <span className="block text-[8px] text-slate-400">This is to certify that</span>
              <span className="block text-xs font-black text-slate-900 tracking-wide">
                Student Name
              </span>
              <span className="block text-[7.5px] text-slate-500 max-w-[160px] leading-tight mx-auto">
                has participated in the Olympiad
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mb-0.5 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Template Info & Actions */}
          <div className="flex-1 flex flex-col justify-between h-full py-1 space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wide inline-block mb-1">
                All Participants
              </span>
              <h4 className="text-base font-bold text-slate-900">Participation Certificate</h4>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Issued to all enrolled candidates completing the official exam.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onPreviewTemplate?.("Participation")}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer text-center"
              >
                Preview
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
