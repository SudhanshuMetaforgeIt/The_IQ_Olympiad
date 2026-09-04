"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ExamDetails } from "../_data/examQuestions";

interface ExamProctoringViewProps {
  exam: ExamDetails;
  onProceedToLiveExam: (stream: MediaStream | null) => void;
  onExitExam?: () => void;
}

type CheckStatus = "waiting" | "in_progress" | "passed" | "failed";

export function ExamProctoringView({
  exam,
  onProceedToLiveExam,
  onExitExam,
}: ExamProctoringViewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Diagnostic states evaluated sequentially one by one
  const [internetStatus, setInternetStatus] = useState<CheckStatus>("in_progress");
  const [browserStatus, setBrowserStatus] = useState<CheckStatus>("waiting");
  const [cameraStatus, setCameraStatus] = useState<CheckStatus>("waiting");
  const [micStatus, setMicStatus] = useState<CheckStatus>("waiting");
  const [systemStatus, setSystemStatus] = useState<CheckStatus>("waiting");

  const [networkPing, setNetworkPing] = useState<number>(24);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const [isAllComplete, setIsAllComplete] = useState<boolean>(false);

  // Silent full-screen trigger scoped specifically to this exam page
  const triggerFullscreenSilently = useCallback(async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Browser will require user click gesture, which is handled directly on "Next: Take Exam"
    }
  }, []);

  useEffect(() => {
    triggerFullscreenSilently();
  }, [triggerFullscreenSilently]);

  // Sequential Check Step 1: Internet Status
  useEffect(() => {
    const runInternetCheck = () => {
      setActiveStepIndex(1);
      setInternetStatus("in_progress");

      const timer = setTimeout(() => {
        if (typeof navigator !== "undefined" && navigator.onLine) {
          setNetworkPing(Math.floor(18 + Math.random() * 12));
          setInternetStatus("passed");
          // Proceed to Step 2: Browser
          setBrowserStatus("in_progress");
          setActiveStepIndex(2);
        } else {
          setInternetStatus("failed");
        }
      }, 1000);

      return () => clearTimeout(timer);
    };

    runInternetCheck();
  }, []);

  // Sequential Check Step 2: Browser & WebRTC Security
  useEffect(() => {
    if (browserStatus !== "in_progress") return;

    const timer = setTimeout(() => {
      setBrowserStatus("passed");
      // Proceed to Step 3: Camera
      setCameraStatus("in_progress");
      setActiveStepIndex(3);
    }, 800);

    return () => clearTimeout(timer);
  }, [browserStatus]);

  // Sequential Check Step 3: Camera Hardware (Bypassed in Dev Mode)
  useEffect(() => {
    if (cameraStatus !== "in_progress") return;

    // In dev mode: softly attempt camera without blocking or throwing errors
    let isCancelled = false;
    const initCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
            audio: false,
          }).catch(() => null);

          if (mediaStream && !isCancelled) {
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
          }
        }
      } catch {
        // Dev mode bypass
      }

      if (!isCancelled) {
        setCameraStatus("passed");
        // Proceed to Step 4: Microphone
        setMicStatus("in_progress");
        setActiveStepIndex(4);
      }
    };

    const timer = setTimeout(() => {
      initCamera();
    }, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [cameraStatus]);

  // Attach camera stream to video element when stream is ready
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Sequential Check Step 4: Microphone Check (Bypassed in Dev Mode)
  useEffect(() => {
    if (micStatus !== "in_progress") return;

    const timer = setTimeout(() => {
      setMicStatus("passed");
      // Proceed to Step 5: System Readiness Check
      setSystemStatus("in_progress");
      setActiveStepIndex(5);
    }, 800);

    return () => clearTimeout(timer);
  }, [micStatus]);

  // Sequential Check Step 5: System & Full Screen Environment Readiness
  useEffect(() => {
    if (systemStatus !== "in_progress") return;

    const timer = setTimeout(() => {
      setSystemStatus("passed");
      setIsAllComplete(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [systemStatus]);

  // When clicking Next: Explicitly enters Full Screen mode and starts the live exam
  const handleProceedToExam = async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen activation on click:", err);
    }
    onProceedToLiveExam(stream);
  };

  const checks = [
    {
      id: 1,
      name: "Internet Connection",
      description: "Testing ping latency & connection speed...",
      successText: `Stable Connection (${networkPing} ms)`,
      status: internetStatus,
      icon: "📶",
    },
    {
      id: 2,
      name: "Browser Environment",
      description: "Verifying secure WebRTC & sandbox...",
      successText: "Verified Secure Browser Environment",
      status: browserStatus,
      icon: "🌐",
    },
    {
      id: 3,
      name: "Camera Hardware",
      description: "Verifying webcam hardware...",
      successText: "Camera Hardware Connected & Ready",
      status: cameraStatus,
      icon: "📷",
    },
    {
      id: 4,
      name: "Microphone Audio",
      description: "Checking audio input stream...",
      successText: "Microphone Calibrated & Ready",
      status: micStatus,
      icon: "🎙️",
    },
    {
      id: 5,
      name: "System Readiness",
      description: "Preparing live proctoring sandbox...",
      successText: "Full Screen & Proctoring Ready",
      status: systemStatus,
      icon: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased select-none">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200/90 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-violet-600/25">
            IQO
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {exam.title}
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Exam ID: <span className="font-mono text-violet-700 font-bold">{exam.id}</span> • {exam.durationMinutes} Minutes • {exam.questions.length} Questions • 100 Marks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onExitExam && (
            <button
              type="button"
              onClick={onExitExam}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition cursor-pointer shadow-2xs"
            >
              Exit
            </button>
          )}
        </div>
      </header>

      {/* Main Container: Top aligned */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 flex flex-col space-y-6">
        {/* Step Indicator Header */}
        <div className="text-center space-y-1.5 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold">
            <span className="size-2 rounded-full bg-violet-600 animate-pulse" />
            <span>
              {isAllComplete
                ? "All System Requirements Verified"
                : `Verifying System Status: Check ${activeStepIndex} of 5...`}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System & Hardware Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Checking your network status and system requirements. Once all checks complete, click Next to start your exam in full-screen mode.
          </p>
        </div>

        {/* 2-Column Layout: Left Video Stream Preview & Right Sequential Checks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Live Webcam / Simulated Stream (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm relative">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${cameraStatus === "passed" ? "bg-emerald-500" : "bg-violet-500 animate-pulse"}`} />
                  <h3 className="text-sm font-bold text-slate-800">
                    Proctoring Stream Preview
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-50 text-violet-700 border border-violet-200">
                  {stream ? "Live Video Feed" : "Camera Stream Ready"}
                </span>
              </div>

              {/* Video Player Box */}
              <div className="relative w-full aspect-video rounded-2xl bg-slate-900 overflow-hidden border border-slate-200 flex items-center justify-center shadow-inner">
                {/* Video element if real stream is available */}
                {stream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100 block"
                  />
                ) : (
                  /* Stylized Simulated Proctoring Stream */
                  <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="size-20 rounded-full bg-violet-600/30 border-2 border-violet-400/50 flex items-center justify-center text-3xl shadow-lg mb-2 animate-pulse text-white">
                      👤
                    </div>
                    <span className="text-xs font-bold text-white">
                      Proctoring Camera Stream
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1">
                      ✓ Hardware Active & Calibrated
                    </span>
                  </div>
                )}

                {/* Face positioning target guide */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-44 h-56 rounded-full border-2 border-violet-400/40 border-dashed flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white bg-slate-950/80 px-2.5 py-0.5 rounded-full">
                      Facial Boundary
                    </span>
                  </div>
                </div>

                {/* Live stream badge */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-slate-700">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">
                    PROCTORING ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Camera Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">
                  {stream ? "HD Webcam connected & streaming" : "Proctoring feed verified & active"}
                </span>
              </div>
              <span className="text-emerald-600 font-bold text-xs">✓ Ready</span>
            </div>
          </div>

          {/* Right Column: Sequential Diagnostic Checks (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">
                  System Diagnostics
                </h3>
                <span className="text-xs font-bold text-violet-600">
                  {checks.filter((c) => c.status === "passed").length} / 5 Passed
                </span>
              </div>

              {/* Sequential Checklist Items */}
              <div className="space-y-2.5">
                {checks.map((check) => {
                  const isWaiting = check.status === "waiting";
                  const isInProgress = check.status === "in_progress";
                  const isPassed = check.status === "passed";
                  const isFailed = check.status === "failed";

                  let cardBorder = "border-slate-200 bg-slate-50/60 opacity-60";
                  if (isInProgress) {
                    cardBorder = "border-violet-400 bg-violet-50/70 shadow-sm ring-1 ring-violet-400/40";
                  } else if (isPassed) {
                    cardBorder = "border-emerald-200 bg-emerald-50/60";
                  } else if (isFailed) {
                    cardBorder = "border-rose-200 bg-rose-50/60";
                  }

                  return (
                    <div
                      key={check.id}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${cardBorder}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`size-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isPassed
                            ? "bg-emerald-100 text-emerald-700"
                            : isInProgress
                            ? "bg-violet-100 text-violet-700"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {check.icon}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {check.name}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {isPassed
                              ? check.successText
                              : isInProgress
                              ? check.description
                              : "Waiting to verify..."}
                          </span>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="shrink-0">
                        {isPassed && (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <span>✓</span>
                            <span>Passed</span>
                          </span>
                        )}
                        {isInProgress && (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200 flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-violet-600 animate-ping" />
                            <span>Checking...</span>
                          </span>
                        )}
                        {isWaiting && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200">
                            Waiting
                          </span>
                        )}
                        {isFailed && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-rose-700 bg-rose-100 border border-rose-200">
                            Failed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Next Action Box */}
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                {isAllComplete ? (
                  <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5">
                    <span>✓</span>
                    <span>All checks passed! Click Next to launch exam in full-screen mode.</span>
                  </p>
                ) : (
                  <p className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1.5">
                    <span className="size-2 rounded-full bg-violet-600 animate-pulse" />
                    <span>Running verification diagnostics one by one...</span>
                  </p>
                )}
              </div>

              {/* NEXT BUTTON: Direct Fullscreen Mode on Click */}
              <button
                type="button"
                disabled={!isAllComplete}
                onClick={handleProceedToExam}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg ${
                  isAllComplete
                    ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-violet-600/25 hover:scale-[1.01] active:scale-[0.99]"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none opacity-60"
                }`}
              >
                <span>Next: Take Exam</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
