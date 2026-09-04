"use client";

import React from "react";
import { Building2, Plus } from "lucide-react";

export function SchoolsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-100/80 flex items-center justify-center text-[#3B1EAE] shrink-0">
          <Building2 className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Schools
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            Manage all registered schools and their administrators
          </p>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B1EAE] text-white text-xs sm:text-sm font-extrabold hover:bg-purple-800 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add School</span>
      </button>
    </div>
  );
}
