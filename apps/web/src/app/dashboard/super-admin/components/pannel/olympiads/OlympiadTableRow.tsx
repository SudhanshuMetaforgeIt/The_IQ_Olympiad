"use client";

import React from "react";
import { Eye, Edit3, Trash2, MoreVertical, Calendar, BarChart2 } from "lucide-react";
import { OlympiadItem } from "./types";

interface OlympiadTableRowProps {
  olympiad: OlympiadItem;
  isUpcomingView?: boolean;
  isCompletedView?: boolean;
  onToggleStatus: (id: string) => void;
  onEdit: (olympiad: OlympiadItem) => void;
  onView: (olympiad: OlympiadItem) => void;
  onDelete: (id: string) => void;
}

export function OlympiadTableRow({
  olympiad,
  isUpcomingView = false,
  isCompletedView = false,
  onToggleStatus,
  onEdit,
  onView,
  onDelete,
}: OlympiadTableRowProps) {
  const isActive = olympiad.status === "Active";

  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${olympiad.avatarBg} flex items-center justify-center shrink-0 font-black text-xs shadow-2xs`}>
            {olympiad.avatarCode}
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-sm group-hover:text-purple-700 transition-colors">
              {olympiad.name}
            </span>
            <span className="text-xs font-semibold text-slate-400">{olympiad.subtitle}</span>
          </div>
        </div>
      </td>

      <td className="py-4 px-4 font-extrabold text-slate-800 text-sm">{olympiad.code}</td>
      <td className="py-4 px-4 font-bold text-slate-700 text-sm">{olympiad.classes}</td>

      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${olympiad.categoryColor}`}>
          {olympiad.category}
        </span>
      </td>

      {isCompletedView ? (
        <>
          <td className="py-4 px-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4.5 h-4.5 text-purple-600 shrink-0" />
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-800 text-sm leading-snug">{olympiad.completedDate || "15 May 2025"}</span>
                <span className="text-xs font-semibold text-slate-400">{olympiad.completedTime || "10:00 AM"}</span>
              </div>
            </div>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-sm">
                  {olympiad.registrations ? olympiad.registrations.toLocaleString() : "0"}
                </span>
                <span className="text-xs font-semibold text-slate-400">Students</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-600 text-xs font-extrabold">
                Completed
              </span>
            </div>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => onView(olympiad)} className="w-8.5 h-8.5 rounded-xl border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="View Details">
                <Eye className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" className="w-8.5 h-8.5 rounded-xl border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="Results & Analytics">
                <BarChart2 className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" className="w-8.5 h-8.5 rounded-xl border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="More Actions">
                <MoreVertical className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </td>
        </>
      ) : isUpcomingView ? (
        <>
          <td className="py-4 px-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4.5 h-4.5 text-purple-600 shrink-0" />
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-800 text-sm leading-snug">{olympiad.startDate || "15 Jun 2025"}</span>
                <span className="text-xs font-semibold text-slate-400">{olympiad.startTime || "10:00 AM"}</span>
              </div>
            </div>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4.5 h-4.5 text-purple-600 shrink-0" />
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-800 text-sm leading-snug">{olympiad.regEndDate || "05 Jun 2025"}</span>
                <span className="text-xs font-semibold text-slate-400">{olympiad.regEndTime || "11:59 PM"}</span>
              </div>
            </div>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => onView(olympiad)} className="w-8.5 h-8.5 rounded-xl border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="View Details">
                <Eye className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" className="w-8.5 h-8.5 rounded-xl border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="Schedule / Calendar">
                <Calendar className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" className="w-8.5 h-8.5 rounded-xl border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="More Actions">
                <MoreVertical className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="py-4 px-4">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-extrabold ${isActive ? "bg-emerald-100/80 text-emerald-600" : "bg-blue-100/80 text-blue-600"}`}>
                {olympiad.status}
              </span>
              <button type="button" onClick={() => onToggleStatus(olympiad.id)} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isActive ? "bg-emerald-500" : "bg-slate-300"}`} role="switch" aria-checked={isActive}>
                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ${isActive ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>
          </td>

          <td className="py-4 px-4">
            {olympiad.registrations !== null ? (
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-sm">{olympiad.registrations.toLocaleString()}</span>
                <span className="text-xs font-semibold text-slate-400">Students</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="font-bold text-slate-400 text-sm">-</span>
                <span className="text-xs font-semibold text-slate-400">Not started</span>
              </div>
            )}
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => onEdit(olympiad)} className="w-8 h-8 rounded-lg border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="Edit Olympiad">
                <Edit3 className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" onClick={() => onView(olympiad)} className="w-8 h-8 rounded-lg border border-purple-200/80 bg-purple-50/60 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer" title="View Details">
                <Eye className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" onClick={() => onDelete(olympiad.id)} className="w-8 h-8 rounded-lg border border-red-200/80 bg-red-50/60 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer" title="Delete Olympiad">
                <Trash2 className="w-4 h-4 stroke-[2]" />
              </button>
              <button type="button" className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer" title="More Actions">
                <MoreVertical className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
