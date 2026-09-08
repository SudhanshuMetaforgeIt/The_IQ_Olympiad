"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, getDemoExamQuestions } from "@/lib/api";
import {
  buildDemoExamDetails,
  type ExamDetails,
} from "../_data/examQuestions";
import { ExamProctoringView } from "./ExamProctoringView";
import { ExamLiveWorkspace } from "./ExamLiveWorkspace";

interface ExamSessionClientProps {
  examId: string;
}

export function ExamSessionClient({ examId }: ExamSessionClientProps) {
  const router = useRouter();
  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<"proctoring" | "live_exam">(
    "proctoring"
  );
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuestions() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const payload = await getDemoExamQuestions(controller.signal);
        if (payload.questions.length === 0) {
          throw new Error("No approved demo questions are available yet.");
        }
        setExam(buildDemoExamDetails(examId, payload));
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        if (error instanceof ApiError) {
          setLoadError(error.message);
        } else if (error instanceof Error) {
          setLoadError(error.message);
        } else {
          setLoadError("Failed to load exam questions. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadQuestions();

    return () => controller.abort();
  }, [examId]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-3xl px-8 py-10 text-center shadow-sm max-w-md w-full space-y-3">
          <div className="mx-auto size-10 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin" />
          <h1 className="text-lg font-black text-slate-900">Loading exam questions</h1>
          <p className="text-sm text-slate-500">
            Fetching the approved demo paper from the server…
          </p>
        </div>
      </div>
    );
  }

  if (loadError || !exam) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-3xl px-8 py-10 text-center shadow-sm max-w-md w-full space-y-4">
          <h1 className="text-lg font-black text-slate-900">Unable to start exam</h1>
          <p className="text-sm text-slate-500">
            {loadError ?? "Exam questions could not be loaded."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold cursor-pointer"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={handleExitToDashboard}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

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
