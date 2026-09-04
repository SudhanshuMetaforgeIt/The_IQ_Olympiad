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
    } catch {
      // ignore
    }
    router.push("/dashboard/student?tab=exams");
  };

  if (currentStep === "proctoring") {
    return (
      <ExamProctoringView
        exam={exam}
        onProceedToLiveExam={handleProceedToLiveExam}
        onExitExam={handleExitToDashboard}
      />
    );
  }

  return (
    <ExamLiveWorkspace
      exam={exam}
      cameraStream={cameraStream}
      onFinishExam={handleExitToDashboard}
    />
  );
}
