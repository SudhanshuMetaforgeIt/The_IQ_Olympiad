"use client";

import React from "react";
import { RegisteredStudentRecord } from "./types";

interface ResultsRegisteredStudentsTableProps {
  students: RegisteredStudentRecord[];
}

export function ResultsRegisteredStudentsTable({
  students,
}: ResultsRegisteredStudentsTableProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
      {/* Title */}
      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
        All Registered Students (28,934)
      </h3>

      {/* Table Shell */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/60">
              <th className="py-3.5 px-4 min-w-[60px]">S.No.</th>
              <th className="py-3.5 px-4 min-w-[200px]">Student Name</th>
              <th className="py-3.5 px-4 min-w-[130px]">Registration ID</th>
              <th className="py-3.5 px-4 min-w-[100px]">Roll No.</th>
              <th className="py-3.5 px-4 min-w-[220px]">School</th>
              <th className="py-3.5 px-4 min-w-[80px]">Class</th>
              <th className="py-3.5 px-4 min-w-[130px]">Registered On</th>
              <th className="py-3.5 px-4 min-w-[110px]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {students.length > 0 ? (
              students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* S.No. */}
                  <td className="py-4 px-4 font-bold text-slate-600 text-sm">
                    {st.sNo}
                  </td>

                  {/* Student Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100/90 text-purple-700 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
                        {st.avatarInitials}
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {st.studentName}
                      </span>
                    </div>
                  </td>

                  {/* Registration ID */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {st.registrationId}
                  </td>

                  {/* Roll No */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {st.rollNo}
                  </td>

                  {/* School */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-slate-900 text-sm leading-snug">
                        {st.schoolName}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {st.schoolLocation}
                      </span>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {st.classNum}
                  </td>

                  {/* Registered On */}
                  <td className="py-4 px-4 font-extrabold text-slate-800 text-sm">
                    {st.registeredOn}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-100/80 text-emerald-600 text-xs font-extrabold">
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-400 font-semibold">
                  No registered students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
