"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { ExamDetails } from "../_data/examQuestions";
import { ExamProctoringView } from "./ExamProctoringView";
import { ExamLiveWorkspace } from "./ExamLiveWorkspace";

interface ExamSessionClientProps {
  exam: ExamDetails;
}

export function ExamSessionClient({ exam }: ExamSessionClientProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<"proctoring" | "live_exam">("proctoring");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const handleProceedToLiveExam = (stream: MediaStream | null) => {
    setCameraStream(stream);
    setCurrentStep("live_exam");
  };

  const handleExitToDashboard = () => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("student_active_tab", "dashboard");
        if (window.opener && !window.opener.closed) {
          try {
            window.opener.location.href = "/dashboard/student?tab=dashboard";
            window.close();
            return;
          } catch {
            // fallback if window cannot be closed
          }
        }
      }
    } catch {
      // ignore
    }
    router.push("/dashboard/student?tab=dashboard");
  };

  return currentStep === "proctoring" ? (
    <ExamProctoringView
      exam={exam}
      onProceedToLiveExam={handleProceedToLiveExam}
      onExitExam={handleExitToDashboard}
    />
  ) : (
    <ExamLiveWorkspace
      exam={exam}
      cameraStream={cameraStream}
      onFinishExam={handleExitToDashboard}
    />
  );
}
