"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "../../Common/icons";

interface ResultsFiltersProps {
  selectedSubject: string;
  onSelectSubject: (subj: string) => void;
}

const SUBJECT_OPTIONS = [
  "All Subjects",
  "Science",
  "Mathematics",
  "English",
  "Cyber",
  "Logical Reasoning",
];

export function ResultsFilters({
  selectedSubject,
  onSelectSubject,
}: ResultsFiltersProps) {
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);

  return (
    <div className="flex items-center justify-end">
      {/* Subject Filter Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsSubjectOpen(!isSubjectOpen);
          }}
          className="flex items-center justify-between gap-3 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-violet-300 text-xs font-bold text-slate-700 transition cursor-pointer min-w-[140px]"
        >
          <span>{selectedSubject}</span>
          <ChevronDownIcon
            className={`w-4 h-4 text-slate-400 transition-transform ${
              isSubjectOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isSubjectOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsSubjectOpen(false)}
            />
            <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 divide-y divide-slate-50">
              {SUBJECT_OPTIONS.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => {
                    onSelectSubject(sub);
                    setIsSubjectOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium transition flex items-center justify-between hover:bg-violet-50 hover:text-violet-700 cursor-pointer ${
                    selectedSubject === sub
                      ? "text-violet-700 font-bold bg-violet-50/50"
                      : "text-slate-700"
                  }`}
                >
                  {sub}
                  {selectedSubject === sub && <span className="text-violet-600">✓</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
