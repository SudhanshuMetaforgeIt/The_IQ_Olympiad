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
      window.open(examUrl, "_blank");
    } else {
      router.push(examUrl);
    }
  };

  return (
    <StudentPanelChrome activeTab={activeTab} onSelectTab={onSelectTab}>
      {({ student, activeTab, onSelectTab }) => (
        <div className="flex h-dvh w-full max-w-[100dvw] overflow-x-hidden overflow-y-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900 box-border">
          <Sidebar student={student} activeTab={activeTab} onSelectTab={onSelectTab} />

          <div className="flex-1 flex flex-col h-dvh min-w-0 max-w-full overflow-x-hidden overflow-y-auto box-border">
            <HeaderBar student={student} onSelectTab={onSelectTab} />

            <main className="flex-1 p-2.5 sm:p-3 md:p-4 flex flex-col min-w-0 max-w-full overflow-x-hidden box-border">
              <ExamInstructionsStep onStartExam={handleStartExam} />
            </main>
          </div>
        </div>
      )}
    </StudentPanelChrome>
  );
}
