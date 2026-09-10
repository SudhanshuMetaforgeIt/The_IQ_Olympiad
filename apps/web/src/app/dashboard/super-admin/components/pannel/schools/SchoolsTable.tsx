"use client";

import React from "react";
import {
  ChevronDown,
  Eye,
  Pencil,
  MoreVertical,
  Building2,
  Compass,
  Sun,
  Leaf,
  GraduationCap,
  Shield,
} from "lucide-react";
import { SchoolRecord } from "./mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": Building2,
  "2": Compass,
  "3": Sun,
  "4": Leaf,
  "5": Shield,
  "6": Building2,
  "7": GraduationCap,
};

interface SchoolsTableProps {
  schools: SchoolRecord[];
}

export function SchoolsTable({ schools }: SchoolsTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/50">
            <th className="py-3 px-3 w-10 text-slate-500">#</th>
            <th className="py-3 px-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                <span>School Name</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3 px-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                <span>School Code</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3 px-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                <span>School Admin</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3 px-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                <span>Email</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3 px-3">Phone</th>
            <th className="py-3 px-3">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                <span>Location</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3 px-3">Students</th>
            <th className="py-3 px-3">Exams</th>
            <th className="py-3 px-3">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
          {schools.map((school, index) => {
            const Icon = iconMap[school.id] || Building2;
            return (
              <tr key={school.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100/70 text-[#3B1EAE] font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${school.avatarBg} flex items-center justify-center shrink-0 font-bold`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-slate-900">{school.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-slate-600 font-medium">{school.code}</td>
                <td className="py-3.5 px-3 text-slate-700 font-semibold">{school.admin}</td>
                <td className="py-3.5 px-3 text-slate-500 font-medium">{school.email}</td>
                <td className="py-3.5 px-3 text-slate-800 font-bold">{school.phone}</td>
                <td className="py-3.5 px-3 text-slate-600 font-medium">{school.location}</td>
                <td className="py-3.5 px-3 text-slate-700 font-semibold">{school.students}</td>
                <td className="py-3.5 px-3 text-slate-700 font-semibold">{school.exams}</td>
                <td className="py-3.5 px-3">
                  {school.status === "Active" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                      Active
                    </span>
                  )}
                  {school.status === "Pending" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-black">
                      Pending
                    </span>
                  )}
                  {school.status === "Inactive" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-black">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-purple-200 bg-purple-50/50 text-[#3B1EAE] flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 stroke-[2]" />
                    </button>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-purple-200 bg-purple-50/50 text-[#3B1EAE] flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer"
                      title="Edit School"
                    >
                      <Pencil className="w-4 h-4 stroke-[2]" />
                    </button>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer"
                      title="More Options"
                    >
                      <MoreVertical className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
