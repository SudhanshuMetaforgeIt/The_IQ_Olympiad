"use client";

import React, { useState } from "react";
import { ArrowRight, Target, X, Calendar, BookOpen, UserPlus } from "lucide-react";
import { UpcomingExam } from "../../_types/dashboard";

interface UpcomingExamsTableProps {
  exams: UpcomingExam[];
}

const fullExamsList: UpcomingExam[] = [
  { id: "exam-1", name: "National Science Olympiad (NSO)", code: "NSO", examDate: "18 Aug 2026", duration: "2 hrs", registeredCount: 186, capacityCount: 214, status: "Open", registrationEndsDate: "10 Aug 2026" },
  { id: "exam-2", name: "Mathematics Olympiad (IMO)", code: "IMO", examDate: "24 Aug 2026", duration: "1.5 hrs", registeredCount: 172, capacityCount: 200, status: "Open", registrationEndsDate: "16 Aug 2026" },
  { id: "exam-3", name: "English Assessment Test", code: "EAT", examDate: "02 Sep 2026", duration: "1 hr", registeredCount: 145, capacityCount: 180, status: "Upcoming", registrationEndsDate: "25 Aug 2026" },
  { id: "exam-4", name: "Cyber Olympiad Challenge", code: "COC", examDate: "15 Sep 2026", duration: "1.5 hrs", registeredCount: 120, capacityCount: 160, status: "Upcoming", registrationEndsDate: "08 Sep 2026" },
];

export function UpcomingExamsTable({ exams }: UpcomingExamsTableProps) {
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedExamDetail, setSelectedExamDetail] = useState<UpcomingExam | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4 font-sans">
        <h2 className="text-[#0F172A] text-xl font-extrabold">Upcoming Exams</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase">
                <th className="py-3 px-2">Exam Name</th>
                <th className="py-3 px-2">Exam Date</th>
                <th className="py-3 px-2">Duration</th>
                <th className="py-3 px-2">Registered / Capacity</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Registration Ends</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-bold text-slate-800 text-xs sm:text-sm">
              {exams.map((exam) => {
                const capacityPercent = Math.round((exam.registeredCount / exam.capacityCount) * 100);
                return (
                  <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-2 font-black text-purple-900">
                      <button onClick={() => setSelectedExamDetail(exam)} className="hover:underline text-left cursor-pointer hover:text-purple-700">{exam.name}</button>
                    </td>
                    <td className="py-3.5 px-2 text-slate-600">{exam.examDate}</td>
                    <td className="py-3.5 px-2 text-slate-600">{exam.duration}</td>
                    <td className="py-3.5 px-2">
                      <div className="flex items-center space-x-3 max-w-xs">
                        <span className="font-black text-slate-900 w-16 tabular-nums">{exam.registeredCount} / {exam.capacityCount}</span>
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${capacityPercent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black ${exam.status === "Open" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-600">{exam.registrationEndsDate}</td>
                    <td className="py-3.5 px-2 text-right">
                      <button onClick={() => setSelectedExamDetail(exam)} className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer" title="View Exam Details">
                        <Target className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pt-3 border-t border-slate-100">
          <button onClick={() => setShowAllModal(true)} className="inline-flex items-center space-x-2 text-sm font-black text-purple-700 hover:text-purple-900 transition-colors cursor-pointer">
            <span>View All Exams</span><ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {selectedExamDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]"><BookOpen className="w-6 h-6" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{selectedExamDetail.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${selectedExamDetail.status === "Open" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}`}>{selectedExamDetail.status}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Code: {selectedExamDetail.code} • Online Proctored Examination</p>
                </div>
              </div>
              <button onClick={() => setSelectedExamDetail(null)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-purple-50/80 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-purple-700">Exam Date</p><p className="text-base sm:text-lg font-black text-purple-900 mt-1">{selectedExamDetail.examDate}</p></div>
              <div className="bg-slate-50 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-slate-500">Duration</p><p className="text-base sm:text-lg font-black text-slate-900 mt-1">{selectedExamDetail.duration}</p></div>
              <div className="bg-amber-50/80 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-amber-700">Deadline</p><p className="text-base sm:text-lg font-black text-amber-900 mt-1">{selectedExamDetail.registrationEndsDate}</p></div>
              <div className="bg-emerald-50/80 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-emerald-700">Registrations</p><p className="text-base sm:text-lg font-black text-emerald-900 mt-1">{selectedExamDetail.registeredCount} / {selectedExamDetail.capacityCount}</p></div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button onClick={() => setSelectedExamDetail(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-sm hover:bg-slate-50 cursor-pointer">Close</button>
              <button onClick={() => alert(`Registration portal opened for ${selectedExamDetail.name}`)} className="px-5 py-2.5 rounded-xl bg-[#6332ec] text-white font-extrabold text-sm flex items-center gap-2 hover:bg-purple-700 cursor-pointer shadow-md"><UserPlus className="w-4 h-4" /><span>Register Students</span></button>
            </div>
          </div>
        </div>
      )}

      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]"><Calendar className="w-5 h-5" /></div>
                <div><h3 className="text-xl font-black text-slate-900">All Upcoming & Active Exams</h3><p className="text-xs font-semibold text-slate-500 mt-0.5">Click any row to open complete exam specifications.</p></div>
              </div>
              <button onClick={() => setShowAllModal(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 font-extrabold uppercase border-b border-slate-100">
                  <tr><th className="p-3">Exam Name</th><th className="p-3">Exam Date</th><th className="p-3">Duration</th><th className="p-3">Capacity</th><th className="p-3">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-800">
                  {fullExamsList.map((exam) => (
                    <tr key={exam.id} onClick={() => { setShowAllModal(false); setSelectedExamDetail(exam); }} className="hover:bg-purple-50/50 cursor-pointer">
                      <td className="p-3 font-black text-purple-900">{exam.name}</td><td className="p-3">{exam.examDate}</td><td className="p-3">{exam.duration}</td><td className="p-3 font-black text-slate-900">{exam.registeredCount} / {exam.capacityCount}</td><td className="p-3"><span className={`px-2.5 py-1 rounded-full text-xs font-black ${exam.status === "Open" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"}`}>{exam.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button onClick={() => setShowAllModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-sm hover:bg-slate-50 cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
