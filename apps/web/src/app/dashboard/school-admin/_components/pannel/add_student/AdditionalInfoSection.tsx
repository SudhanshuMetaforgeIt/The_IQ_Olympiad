"use client";

import { ChevronDown } from "lucide-react";
import { SectionProps } from "./types";

export function AdditionalInfoSection({ formData, handleChange }: SectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <h2 className="text-h2 font-bold text-[#1E1B4B]">Additional Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Previous School */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Previous School
          </label>
          <input
            type="text"
            placeholder="Enter previous school name"
            value={formData.previousSchool}
            onChange={(e) => handleChange("previousSchool", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Transport Required */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Transport Required
          </label>
          <div className="relative">
            <select
              value={formData.transportRequired}
              onChange={(e) => handleChange("transportRequired", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Any Medical Condition */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Any Medical Condition
          </label>
          <input
            type="text"
            placeholder="Enter medical condition (if any)"
            value={formData.medicalCondition}
            onChange={(e) => handleChange("medicalCondition", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
