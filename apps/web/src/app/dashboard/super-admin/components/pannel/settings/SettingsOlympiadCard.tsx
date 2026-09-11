"use client";

import React, { useState } from "react";
import { Trophy, Edit3, Check, X, ChevronDown, CheckCircle2 } from "lucide-react";

export interface OlympiadSettings {
  academicYear: string;
  availableClasses: string;
  subjects: string[];
  defaultDuration: string;
  resultPublishing: string;
}

const ALL_SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "GK",
  "Reasoning",
  "Computer Science",
  "Cyber",
  "Astronomy",
];

export default function SettingsOlympiadCard() {
  const [settings, setSettings] = useState<OlympiadSettings>({
    academicYear: "2026 - 27",
    availableClasses: "1 - 12",
    subjects: ["Mathematics", "Science", "English", "GK"],
    defaultDuration: "60 Minutes",
    resultPublishing: "Manual Approval",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<OlympiadSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const startEditing = () => {
    setDraft({ ...settings });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const cancelEditing = () => {
    setDraft({ ...settings });
    setIsEditing(false);
  };

  const toggleSubject = (subject: string) => {
    setDraft((prev) => {
      const exists = prev.subjects.includes(subject);
      if (exists) {
        if (prev.subjects.length <= 1) return prev; // keep at least 1
        return { ...prev, subjects: prev.subjects.filter((s) => s !== subject) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subject] };
      }
    });
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSettings(draft);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3.5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Olympiad
                </h3>
                {isEditing && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wide">
                    Editing
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {isEditing ? "Edit Olympiad preferences below" : "Default Olympiad preferences"}
              </p>
            </div>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={cancelEditing}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              title="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode */}
        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Academic Year</span>
              <span className="font-bold text-slate-900">{settings.academicYear}</span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Available Classes</span>
              <span className="font-bold text-slate-900">{settings.availableClasses}</span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Subjects</span>
              <span className="font-bold text-slate-900 text-right">
                {settings.subjects.join(", ")}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Default Exam Duration</span>
              <span className="font-bold text-slate-900">{settings.defaultDuration}</span>
            </div>

            <div className="flex items-center justify-between pb-1 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Result Publishing</span>
              <span className="font-bold text-slate-900">{settings.resultPublishing}</span>
            </div>
          </div>
        ) : (
          /* Inline Editable Mode */
          <form onSubmit={handleSave} className="space-y-4 animate-in fade-in duration-200">
            {/* Academic Year */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Academic Year</label>
              <div className="relative sm:w-48">
                <select
                  value={draft.academicYear}
                  onChange={(e) => setDraft({ ...draft, academicYear: e.target.value })}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="2025 - 26">2025 - 26</option>
                  <option value="2026 - 27">2026 - 27</option>
                  <option value="2027 - 28">2027 - 28</option>
                  <option value="2028 - 29">2028 - 29</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Available Classes */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Available Classes</label>
              <div className="relative sm:w-48">
                <select
                  value={draft.availableClasses}
                  onChange={(e) => setDraft({ ...draft, availableClasses: e.target.value })}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="1 - 12">1 - 12 (All Classes)</option>
                  <option value="1 - 10">1 - 10 (Primary & Secondary)</option>
                  <option value="6 - 12">6 - 12 (Middle & Senior)</option>
                  <option value="1 - 8">1 - 8 (Elementary Only)</option>
                  <option value="9 - 12">9 - 12 (High School Only)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Subjects Selection */}
            <div className="space-y-2 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Subjects</label>
                <span className="text-[11px] font-semibold text-purple-600">
                  {draft.subjects.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SUBJECTS.map((sub) => {
                  const isSelected = draft.subjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-purple-600 text-white border-purple-600 shadow-2xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {isSelected && <span className="mr-1">✓</span>}
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Default Exam Duration */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Default Exam Duration</label>
              <div className="relative sm:w-48">
                <select
                  value={draft.defaultDuration}
                  onChange={(e) => setDraft({ ...draft, defaultDuration: e.target.value })}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="30 Minutes">30 Minutes</option>
                  <option value="45 Minutes">45 Minutes</option>
                  <option value="60 Minutes">60 Minutes</option>
                  <option value="90 Minutes">90 Minutes</option>
                  <option value="120 Minutes">120 Minutes</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Result Publishing */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1">
              <label className="text-xs font-bold text-slate-700">Result Publishing</label>
              <div className="relative sm:w-48">
                <select
                  value={draft.resultPublishing}
                  onChange={(e) => setDraft({ ...draft, resultPublishing: e.target.value })}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="Manual Approval">Manual Approval</option>
                  <option value="Automatic on Exam End">Automatic on Exam End</option>
                  <option value="Scheduled Release">Scheduled Release</option>
                  <option value="School Admin Discretion">School Admin Discretion</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="pt-6 flex justify-center">
        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            className="px-5 py-2.5 rounded-xl border border-purple-200 text-purple-700 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Olympiad Settings</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full justify-end">
            <button
              type="button"
              onClick={cancelEditing}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saveSuccess}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
