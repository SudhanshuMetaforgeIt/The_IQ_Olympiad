"use client";

import React from "react";
import {
  ChevronsUpDown,
  ChevronRight,
  Building2,
  Compass,
  Sun,
  Leaf,
  GraduationCap,
  Shield,
  Diamond,
} from "lucide-react";
import {
  studentSchoolsListData,
  activeStudentsListData,
  inactiveStudentsListData,
  RegisteredStudentDetail,
} from "./mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": Building2,
  "2": Compass,
  "3": Sun,
  "4": Leaf,
  "5": Shield,
  "6": Building2,
  "7": GraduationCap,
};

interface StudentsTableProps {
  selectedCard: string | null;
}

export function StudentsTable({ selectedCard }: StudentsTableProps) {
  let studentList: RegisteredStudentDetail[] | null = null;
  if (selectedCard === "active" || selectedCard === "total") {
    studentList = activeStudentsListData;
  } else if (selectedCard === "inactive") {
    studentList = inactiveStudentsListData;
  }

  if (studentList) {
    return (
      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/50">
              <th className="py-3.5 px-3 w-10">S.No.</th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Student Name</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Registration ID</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Roll Number</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Class</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>School Name</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Olympiad</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Registered On</span>
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {studentList.map((stu) => (
              <tr key={stu.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-3 font-bold text-slate-900">{stu.sNo}</td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${stu.avatarBg} flex items-center justify-center shrink-0 text-xs font-bold`}
                    >
                      {stu.initials}
                    </div>
                    <span className="font-extrabold text-slate-900">{stu.name}</span>
                  </div>
                </td>
                <td className="py-4 px-3 font-bold text-slate-800">{stu.regId}</td>
                <td className="py-4 px-3 font-bold text-slate-800">{stu.rollNo}</td>
                <td className="py-4 px-3 font-bold text-slate-800">{stu.className}</td>
                <td className="py-4 px-3 font-bold text-slate-800">{stu.schoolName}</td>
                <td className="py-4 px-3 font-bold text-slate-800">{stu.olympiad}</td>
                <td className="py-4 px-3 font-bold text-slate-800">{stu.registeredOn}</td>
                <td className="py-4 px-3 text-center">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-xl border border-purple-200 bg-white text-[#3B1EAE] inline-flex items-center justify-center hover:bg-purple-50 transition-colors cursor-pointer"
                    title="View Student"
                  >
                    <Diamond className="w-4 h-4 stroke-[2]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/50">
            <th className="py-3.5 px-4 w-14">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                <span>S.No.</span>
                <ChevronsUpDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3.5 px-4">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                <span>School Name</span>
                <ChevronsUpDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3.5 px-4">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                <span>School Code</span>
                <ChevronsUpDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3.5 px-4">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                <span>Branch</span>
                <ChevronsUpDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3.5 px-4">
              <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                <span>Location</span>
                <ChevronsUpDown className="w-3.5 h-3.5" />
              </div>
            </th>
            <th className="py-3.5 px-4 text-center">
              <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-slate-700">
                <span>Actions</span>
                <ChevronsUpDown className="w-3.5 h-3.5" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
          {studentSchoolsListData.map((school) => {
            const Icon = iconMap[school.id] || Building2;
            return (
              <tr key={school.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900">{school.sNo}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${school.avatarBg} flex items-center justify-center shrink-0 font-bold`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-slate-900">{school.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-bold text-slate-900">{school.code}</td>
                <td className="py-4 px-4 font-bold text-slate-900">{school.branch}</td>
                <td className="py-4 px-4 font-bold text-slate-900">{school.location}</td>
                <td className="py-4 px-4 text-center">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-xl border border-purple-200 bg-white text-[#3B1EAE] inline-flex items-center justify-center hover:bg-purple-50 transition-colors cursor-pointer"
                    title="View Students"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
