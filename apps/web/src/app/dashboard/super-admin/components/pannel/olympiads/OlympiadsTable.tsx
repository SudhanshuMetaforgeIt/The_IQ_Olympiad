"use client";

import React from "react";
import { OlympiadItem } from "./types";
import { OlympiadTableRow } from "./OlympiadTableRow";

interface OlympiadsTableProps {
  olympiads: OlympiadItem[];
  isUpcomingView?: boolean;
  isCompletedView?: boolean;
  onToggleStatus: (id: string) => void;
  onEdit: (olympiad: OlympiadItem) => void;
  onView: (olympiad: OlympiadItem) => void;
  onDelete: (id: string) => void;
}

export function OlympiadsTable({
  olympiads,
  isUpcomingView = false,
  isCompletedView = false,
  onToggleStatus,
  onEdit,
  onView,
  onDelete,
}: OlympiadsTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200/80 shadow-2xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/60">
            <th className="py-4 px-4 min-w-[240px]">Olympiad</th>
            <th className="py-4 px-4 min-w-[80px]">Code</th>
            <th className="py-4 px-4 min-w-[90px]">Classes</th>
            <th className="py-4 px-4 min-w-[130px]">Category</th>
            {isCompletedView ? (
              <>
                <th className="py-4 px-4 min-w-[150px]">Completed Date</th>
                <th className="py-4 px-4 min-w-[180px]">Total Registrations</th>
                <th className="py-4 px-4 min-w-[140px]">Actions</th>
              </>
            ) : isUpcomingView ? (
              <>
                <th className="py-4 px-4 min-w-[150px]">Start Date</th>
                <th className="py-4 px-4 min-w-[160px]">Registration Ends</th>
                <th className="py-4 px-4 min-w-[140px]">Actions</th>
              </>
            ) : (
              <>
                <th className="py-4 px-4 min-w-[120px]">Status</th>
                <th className="py-4 px-4 min-w-[120px]">Registrations</th>
                <th className="py-4 px-4 min-w-[160px]">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
          {olympiads.length > 0 ? (
            olympiads.map((item) => (
              <OlympiadTableRow
                key={item.id}
                olympiad={item}
                isUpcomingView={isUpcomingView}
                isCompletedView={isCompletedView}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                No olympiads found matching your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
