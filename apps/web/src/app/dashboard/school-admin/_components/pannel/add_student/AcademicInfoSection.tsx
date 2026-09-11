"use client";

import { ChevronDown } from "lucide-react";
import { getAcademicYearOptions } from "@/lib/academicYear";
import { SectionProps } from "./types";

export function AcademicInfoSection({ formData, handleChange }: SectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <h2 className="text-h2 font-bold text-[#1E1B4B]">Academic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Class */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Class <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.className}
              onChange={(e) => handleChange("className", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              required
            >
              <option value="">Select class</option>
              <option value="V">Class V</option>
              <option value="VI">Class VI</option>
              <option value="VII">Class VII</option>
              <option value="VIII">Class VIII</option>
              <option value="IX">Class IX</option>
              <option value="X">Class X</option>
              <option value="XI">Class XI</option>
              <option value="XII">Class XII</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Section */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Section <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.section}
              onChange={(e) => handleChange("section", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              required
            >
              <option value="">Select section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Academic Year <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.academicYear}
              onChange={(e) => handleChange("academicYear", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              required
            >
              <option value="">Select academic year</option>
              {getAcademicYearOptions(formData.academicYear).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
