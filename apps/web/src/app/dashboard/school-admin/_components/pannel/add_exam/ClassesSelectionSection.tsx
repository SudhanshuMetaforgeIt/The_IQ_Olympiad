"use client";

import React, { useState, useRef, useEffect } from "react";
import { GraduationCap, ChevronDown, Check } from "lucide-react";

interface ClassesSelectionSectionProps {
  classSelectionType: "all" | "custom";
  setClassSelectionType: (type: "all" | "custom") => void;
  selectedClasses: string[];
  toggleSelectClass: (cls: string) => void;
}

const DYNAMIC_CLASS_OPTIONS = [
  "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
  "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6"
];

export function ClassesSelectionSection({
  classSelectionType,
  setClassSelectionType,
  selectedClasses,
  toggleSelectClass,
}: ClassesSelectionSectionProps) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayLabel =
    selectedClasses.length > 0
      ? selectedClasses.join(", ")
      : "Select classes";

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]">
          <GraduationCap className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-black text-slate-900">Classes Selection</h2>
      </div>

      {/* Radio Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
        <label
          onClick={() => setClassSelectionType("all")}
          className={`flex items-start space-x-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            classSelectionType === "all"
              ? "border-[#6332ec] bg-purple-50/40"
              : "border-slate-200 hover:border-purple-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="classSelection"
            checked={classSelectionType === "all"}
            onChange={() => setClassSelectionType("all")}
            className="w-5 h-5 text-[#6332ec] border-slate-300 focus:ring-[#6332ec] mt-0.5"
          />
          <div>
            <p className="text-sm font-extrabold text-slate-900">All Classes</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Exam will be available for all classes</p>
          </div>
        </label>

        <label
          onClick={() => setClassSelectionType("custom")}
          className={`flex items-start space-x-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            classSelectionType === "custom"
              ? "border-[#6332ec] bg-purple-50/40"
              : "border-slate-200 hover:border-purple-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="classSelection"
            checked={classSelectionType === "custom"}
            onChange={() => setClassSelectionType("custom")}
            className="w-5 h-5 text-[#6332ec] border-slate-300 focus:ring-[#6332ec] mt-0.5"
          />
          <div>
            <p className="text-sm font-extrabold text-slate-900">Customize Classes</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Select specific classes for this exam</p>
          </div>
        </label>
      </div>

      {/* Select Classes Dropdown (Initially empty placeholder, dynamic selection for Classes 7 to 12) */}
      {classSelectionType === "custom" && (
        <div className="space-y-2 pt-2 max-w-md" ref={dropdownRef}>
          <label className="block text-xs font-bold text-slate-800">
            Select Classes <span className="text-purple-600">*</span>
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-between hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-2xs"
            >
              <span className={selectedClasses.length === 0 ? "text-slate-400 font-medium" : "text-slate-900 font-bold truncate"}>
                {displayLabel}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpenDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu Items */}
            {isOpenDropdown && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 max-h-60 overflow-y-auto space-y-1 animate-in fade-in duration-150">
                {DYNAMIC_CLASS_OPTIONS.map((cls) => {
                  const isChecked = selectedClasses.includes(cls);
                  return (
                    <div
                      key={cls}
                      onClick={() => toggleSelectClass(cls)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-purple-50 text-[#6332ec]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cls}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#6332ec] stroke-[2.5]" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
