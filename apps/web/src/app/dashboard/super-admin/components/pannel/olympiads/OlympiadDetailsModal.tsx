"use client";

import React from "react";
import { X, Trophy, Users, BookOpen, Layers, Tag } from "lucide-react";
import { OlympiadItem } from "./types";

interface OlympiadDetailsModalProps {
  olympiad: OlympiadItem | null;
  onClose: () => void;
}

export function OlympiadDetailsModal({
  olympiad,
  onClose,
}: OlympiadDetailsModalProps) {
  if (!olympiad) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${olympiad.avatarBg} flex items-center justify-center font-black text-xs`}
            >
              {olympiad.avatarCode}
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                {olympiad.name}
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Code: {olympiad.code}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Description
            </span>
            <p className="font-semibold text-slate-700">{olympiad.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Tag className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Category</span>
                <span className="font-bold text-slate-900">{olympiad.category}</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Layers className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Eligible Classes</span>
                <span className="font-bold text-slate-900">{olympiad.classes}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Current Status</span>
                <span className="font-bold text-slate-900">{olympiad.status}</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Registrations</span>
                <span className="font-bold text-slate-900">
                  {olympiad.registrations
                    ? olympiad.registrations.toLocaleString()
                    : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-sm hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
