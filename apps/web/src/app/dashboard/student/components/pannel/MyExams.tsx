"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { StudentPanelChrome } from "../Common/StudentPanelChrome";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { ExamInstructionsStep } from "../Common/ExamInstructionsStep";

interface MyExamsPanelProps {
  activeTab?: string;
  initialSubtab?: "upcoming" | "completed";
  onSelectTab?: (tabId: string, subtabId?: string) => void;
  examId?: string;
}

export default function MyExamsPanel({ activeTab = "exams", onSelectTab, examId = "68d123abc" }: MyExamsPanelProps) {
  const router = useRouter();

  const handleStartExam = () => {
    const examUrl = `/exam/${examId}`;
    if (typeof window !== "undefined") {
      const width = window.screen.availWidth || window.innerWidth;
      const height = window.screen.availHeight || window.innerHeight;
      window.open(
        examUrl,
        "_blank",
        `left=0,top=0,width=${width},height=${height}`
      );
    } else {
      router.push(examUrl);
    }
  };

  return (
    <StudentPanelChrome activeTab={activeTab} onSelectTab={onSelectTab}>
      {({ student, activeTab, onSelectTab }) => (
        <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
          {/* Sidebar Navigation */}
          <Sidebar student={student} activeTab={activeTab} onSelectTab={onSelectTab} />

          {/* Main Container */}
          <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
            <HeaderBar student={student} onSelectTab={onSelectTab} />

            {/* Main Area */}
            <main className="flex-1 p-4 md:p-6 flex flex-col">
              <ExamInstructionsStep onStartExam={handleStartExam} />
            </main>
          </div>
        </div>
      )}
    </StudentPanelChrome>
  );
}
