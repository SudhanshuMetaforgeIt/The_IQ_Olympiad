"use client";

import { ChevronDown } from "lucide-react";
import { SectionProps } from "./types";

export function GuardianInfoSection({ formData, handleChange }: SectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <h2 className="text-h2 font-bold text-[#1E1B4B]">Parent / Guardian Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Guardian Name */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Guardian Name <span className="text-purple-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter guardian name"
            value={formData.guardianName}
            onChange={(e) => handleChange("guardianName", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            required
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Relationship <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.relationship}
              onChange={(e) => handleChange("relationship", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              required
            >
              <option value="">Select relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Guardian Phone Number */}
        <div>
          <label className="block text-label font-bold text-slate-800 mb-2">
            Guardian Phone Number <span className="text-purple-600">*</span>
          </label>
          <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500">
            <div className="bg-slate-50 px-3 py-2.5 border-r border-slate-200 flex items-center space-x-1.5 text-body font-bold text-slate-700 shrink-0">
              <span>🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              type="text"
              placeholder="Enter phone number"
              value={formData.guardianPhone}
              onChange={(e) => handleChange("guardianPhone", e.target.value)}
              className="w-full bg-white px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Guardian Email */}
        <div className="md:col-span-4">
          <label className="block text-label font-bold text-slate-800 mb-2">
            Guardian Email
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            value={formData.guardianEmail}
            onChange={(e) => handleChange("guardianEmail", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-8">
          <label className="block text-label font-bold text-slate-800 mb-2">
            Address <span className="text-purple-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter complete address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            required
          />
        </div>
      </div>
    </div>
  );
}
