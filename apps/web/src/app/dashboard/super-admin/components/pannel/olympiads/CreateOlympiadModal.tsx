"use client";

import React, { useState, useEffect } from "react";
import { X, Trophy } from "lucide-react";
import { OlympiadItem, OlympiadStatus } from "./types";

interface CreateOlympiadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (olympiadData: Omit<OlympiadItem, "id" | "registrations">) => void;
  editingOlympiad?: OlympiadItem | null;
}

const CATEGORY_OPTIONS = [
  { label: "Mathematics", color: "bg-blue-100/70 text-blue-600", bg: "bg-[#1E56A0] text-white" },
  { label: "Science", color: "bg-emerald-100/70 text-emerald-600", bg: "bg-[#059669] text-white" },
  { label: "English", color: "bg-amber-100/70 text-amber-600", bg: "bg-[#D97706] text-white" },
  { label: "General Knowledge", color: "bg-purple-100/70 text-purple-600", bg: "bg-[#7C3AED] text-white" },
  { label: "Reasoning", color: "bg-pink-100/70 text-pink-600", bg: "bg-[#DB2777] text-white" },
  { label: "Cyber Security", color: "bg-sky-100/70 text-sky-600", bg: "bg-[#0284C7] text-white" },
];

export function CreateOlympiadModal({
  isOpen,
  onClose,
  onSave,
  editingOlympiad,
}: CreateOlympiadModalProps) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [code, setCode] = useState("");
  const [classes, setClasses] = useState("1 - 12");
  const [category, setCategory] = useState("Mathematics");
  const [status, setStatus] = useState<OlympiadStatus>("Active");

  useEffect(() => {
    if (editingOlympiad) {
      setName(editingOlympiad.name);
      setSubtitle(editingOlympiad.subtitle);
      setCode(editingOlympiad.code);
      setClasses(editingOlympiad.classes);
      setCategory(editingOlympiad.category);
      setStatus(editingOlympiad.status);
    } else {
      setName("");
      setSubtitle("");
      setCode("");
      setClasses("1 - 12");
      setCategory("Mathematics");
      setStatus("Active");
    }
  }, [editingOlympiad, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = CATEGORY_OPTIONS.find((c) => c.label === category) || CATEGORY_OPTIONS[0];

    onSave({
      name: name || "New Olympiad",
      subtitle: subtitle || "Competition details",
      code: code.toUpperCase() || "OLY",
      classes: classes || "1 - 12",
      category,
      categoryColor: catObj.color,
      status,
      avatarCode: code.slice(0, 4).toUpperCase() || "OLY",
      avatarBg: catObj.bg,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {editingOlympiad ? "Edit Olympiad" : "Create New Olympiad"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Olympiad Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. International Mathematics Olympiad"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. IMO"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Classes
              </label>
              <input
                type="text"
                required
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                placeholder="e.g. 1 - 12"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Subtitle / Description
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. World's most prestigious mathematics competition"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-purple-600 bg-white"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OlympiadStatus)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-purple-600 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-sm hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-colors"
            >
              {editingOlympiad ? "Update Olympiad" : "Save Olympiad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
