"use client";

import React, { useState } from "react";
import { STUDENT_PROFILE } from "../Commonn/mockData";
import { Sidebar } from "../Commonn/Sidebar";
import { HeaderBar } from "../Commonn/HeaderBar";
import { ExamInstructionsStep } from "../Commonn/ExamInstructionsStep";
import { ExamProctoringStep } from "../Commonn/ExamProctoringStep";
import { ExamLiveInterfaceStep } from "../Commonn/ExamLiveInterfaceStep";

interface MyExamsPanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function MyExamsPanel({ activeTab = "exams", onSelectTab }: MyExamsPanelProps) {
  const [examStep, setExamStep] = useState<"instructions" | "proctoring" | "live_exam">("instructions");

  // If in live exam workspace step (Image 3), render full screen workspace layout!
  if (examStep === "live_exam") {
    return (
      <ExamLiveInterfaceStep
        onExitExam={() => setExamStep("instructions")}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar student={STUDENT_PROFILE} />

        {/* Main Area - fills remaining height */}
        <main className="flex-1 p-4 md:p-6 flex flex-col overflow-hidden">
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
