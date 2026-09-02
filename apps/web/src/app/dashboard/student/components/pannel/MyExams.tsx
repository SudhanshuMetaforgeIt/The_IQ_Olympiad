"use client";

import React, { useState } from "react";
import { STUDENT_PROFILE } from "../Common/mockData";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { ExamInstructionsStep } from "../Common/ExamInstructionsStep";
import { ExamProctoringStep } from "../Common/ExamProctoringStep";
import { ExamLiveInterfaceStep } from "../Common/ExamLiveInterfaceStep";

interface MyExamsPanelProps {
  activeTab?: string;
  initialSubtab?: "upcoming" | "completed";
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

export default function MyExamsPanel({ activeTab = "exams", onSelectTab }: MyExamsPanelProps) {
  const [examStep, setExamStep] = useState<"instructions" | "proctoring" | "live_exam">("instructions");

  // If in live exam workspace step, render full screen workspace layout
  if (examStep === "live_exam") {
    return (
      <ExamLiveInterfaceStep
        onExitExam={() => setExamStep("instructions")}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={STUDENT_PROFILE} onSelectTab={onSelectTab} />

        {/* Main Area */}
        <main className="flex-1 p-4 md:p-6 flex flex-col">
          {examStep === "instructions" && (
            <ExamInstructionsStep
              onStartExam={() => setExamStep("proctoring")}
            />
          )}

          {examStep === "proctoring" && (
            <ExamProctoringStep
              onProceedToLiveExam={() => setExamStep("live_exam")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
