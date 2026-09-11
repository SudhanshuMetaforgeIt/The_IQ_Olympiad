"use client";

import React from "react";
import { FileText, ChevronDown } from "lucide-react";

interface AdditionalInformationSectionProps {
  formData: {
    examFee: string;
    lateFee: string;
    instructions: string;
    examPattern: string;
  };
  handleChange: (field: string, value: string) => void;
}

export function AdditionalInformationSection({ formData, handleChange }: AdditionalInformationSectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]">
          <FileText className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-black text-slate-900">Additional Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">Exam Fee (₹)</label>
          <input
            type="text"
            placeholder="Enter exam fee"
            value={formData.examFee}
            onChange={(e) => handleChange("examFee", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">Late Fee (₹)</label>
          <input
            type="text"
            placeholder="Enter late fee (optional)"
            value={formData.lateFee}
            onChange={(e) => handleChange("lateFee", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">Instructions</label>
          <input
            type="text"
            placeholder="Enter important instructions for students"
            value={formData.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">Exam Pattern / Format</label>
          <div className="relative">
            <select
              value={formData.examPattern}
              onChange={(e) => handleChange("examPattern", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
            >
              <option value="">Select exam pattern</option>
              <option value="60 MCQ (Online Proctored)">60 MCQ (Online Proctored)</option>
              <option value="50 MCQ + 10 HOTS">50 MCQ + 10 HOTS</option>
              <option value="100 MCQ Standard">100 MCQ Standard</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
