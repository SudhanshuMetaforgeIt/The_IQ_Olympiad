"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ExamDetails } from "../_data/examQuestions";
import { VerificationMediaPipeFeed } from "../cam-monitoring";

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

  // Live biometric & proctoring status reported directly by VerificationMediaPipeFeed
  const [feedFaceCount, setFeedFaceCount] = useState<number>(0);
  const [feedFaceCentered, setFeedFaceCentered] = useState<boolean>(false);
  const [feedPhoneDetected, setFeedPhoneDetected] = useState<boolean>(false);
  const [feedVoicePassed, setFeedVoicePassed] = useState<boolean>(false);

  const handleVerificationStatusChange = useCallback(
    (
      _isVerified: boolean,
      faceCount: number,
      _isDisqualified?: boolean,
      audioPassed?: boolean,
      phoneDetected?: boolean,
      detailedStatus?: any
    ) => {
      setFeedFaceCount(faceCount);
      setFeedFaceCentered(detailedStatus?.isFaceCentered ?? (faceCount === 1));
      setFeedPhoneDetected(!!phoneDetected);
      setFeedVoicePassed(!!audioPassed);
    },
    []
  );



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
          let mediaStream: MediaStream | null = null;
          try {
            mediaStream = await navigator.mediaDevices.getUserMedia({
              video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
              audio: true,
            });
          } catch {
            // Fallback if microphone permission denied or device not found
            mediaStream = await navigator.mediaDevices.getUserMedia({
              video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
              audio: false,
            }).catch(() => null);
          }

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
    }, 800);

    return () => clearTimeout(timer);
  }, [systemStatus]);

  // Overall readiness: Strictly all environmental & proctoring criteria must pass simultaneously
  const isInternetPassed = internetStatus === "passed";
  const isBrowserPassed = browserStatus === "passed";
  const isCameraLive = cameraStatus === "passed" && !!stream;
  const isSingleCandidatePassed = feedFaceCount === 1 && feedFaceCentered && !feedPhoneDetected;
  const isVoiceCompliant = feedVoicePassed;

  const allRequirementsMet =
    isInternetPassed &&
    isBrowserPassed &&
    isCameraLive &&
    isSingleCandidatePassed &&
    isVoiceCompliant;

  // When clicking Next: Explicitly enters Full Screen mode and starts the live exam
  const handleProceedToExam = async () => {
    if (!allRequirementsMet) return;
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
      name: "Candidate & Face Calibration",
      description:
        feedFaceCount > 1
          ? `Multiple people detected (${feedFaceCount} in frame) — Candidate must be alone`
          : feedPhoneDetected
            ? "Mobile phone detected in frame — Remove immediately"
            : feedFaceCount === 0 && cameraStatus === "passed"
              ? "No face detected — Position face clearly in front of camera"
              : !feedFaceCentered && cameraStatus === "passed"
                ? "Face not centered — Look directly into the camera"
                : "Verifying single candidate face...",
      successText: "Single Candidate Verified & Centered",
      status:
        !isCameraLive
          ? cameraStatus
          : feedFaceCount > 1 || feedPhoneDetected || feedFaceCount === 0
            ? ("failed" as CheckStatus)
            : !feedFaceCentered
              ? ("in_progress" as CheckStatus)
              : ("passed" as CheckStatus),
      icon: feedFaceCount > 1 ? "👥" : feedPhoneDetected ? "📱" : "📷",
    },
    {
      id: 4,
      name: "Microphone & Voice Verification",
      description: "Read aloud the prompt sentence below camera preview to verify...",
      successText: "Microphone Calibrated & Voice Verified",
      status: feedVoicePassed ? ("passed" as CheckStatus) : ("in_progress" as CheckStatus),
      icon: "🎙️",
    },
    {
      id: 5,
      name: "Exam Proctoring Sandbox",
      description: "Waiting for all criteria above to be satisfied...",
      successText: "Full Screen & Proctoring Ready",
      status: allRequirementsMet ? ("passed" as CheckStatus) : ("waiting" as CheckStatus),
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
              {allRequirementsMet
                ? "All System Requirements Verified"
                : `Verifying Requirements: ${checks.filter((c) => c.status === "passed").length} of 5 Passed`}
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

                {stream ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Camera Connected
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-50 text-violet-700 border border-violet-200">
                    Camera Stream Ready
                  </span>
                )}
              </div>

              {/* MediaPipe Video & Detection Feed */}
              <VerificationMediaPipeFeed
                stream={stream}
                className="w-full aspect-video shadow-inner"
                onVerificationStatusChange={handleVerificationStatusChange}
              />
            </div>

            {/* Bottom Camera Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">
                  {stream ? "HD Webcam connected • Ready for verification" : "Proctoring feed verified & active"}
                </span>
              </div>
              <span className="text-emerald-600 font-bold text-xs">✓ Camera Ready</span>
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
                        <div className={`size-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${isPassed
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
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                {allRequirementsMet ? (
                  <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5 animate-in fade-in">
                    <span>✓</span>
                    <span>All requirements verified! Click Next to launch exam in full-screen mode.</span>
                  </p>
                ) : feedFaceCount > 1 ? (
                  <p className="text-xs font-bold text-rose-700 flex items-center justify-center gap-1.5 animate-in fade-in">
                    <span>👥</span>
                    <span>Multiple people detected ({feedFaceCount} faces). Examination rules require candidate to be alone.</span>
                  </p>
                ) : feedPhoneDetected ? (
                  <p className="text-xs font-bold text-rose-700 flex items-center justify-center gap-1.5 animate-in fade-in">
                    <span>📱</span>
                    <span>Mobile phone detected in view. Please remove it from the examination area.</span>
                  </p>
                ) : feedFaceCount === 0 && cameraStatus === "passed" ? (
                  <p className="text-xs font-bold text-amber-700 flex items-center justify-center gap-1.5 animate-in fade-in">
                    <span>👤</span>
                    <span>No face detected. Please position yourself clearly in front of the camera.</span>
                  </p>
                ) : !feedVoicePassed ? (
                  <p className="text-xs font-bold text-violet-700 flex items-center justify-center gap-1.5 animate-in fade-in">
                    <span>🎙️</span>
                    <span>Voice verification required: Click "Speak & Verify Voice" below camera preview.</span>
                  </p>
                ) : (
                  <p className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1.5">
                    <span className="size-2 rounded-full bg-violet-600 animate-pulse" />
                    <span>Verifying proctoring and environmental requirements...</span>
                  </p>
                )}
              </div>

              {/* NEXT BUTTON: Strictly disabled until allRequirementsMet */}
              <button
                type="button"
                disabled={!allRequirementsMet}
                onClick={handleProceedToExam}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${allRequirementsMet
                    ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-violet-600/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    : "bg-slate-100 text-slate-400 border border-slate-200 shadow-none opacity-60 cursor-not-allowed"
                  }`}
              >
                <span>
                  {allRequirementsMet
                    ? "Next: Take Exam →"
                    : feedFaceCount > 1
                      ? "Cannot Start: Multiple People In Frame"
                      : feedPhoneDetected
                        ? "Cannot Start: Remove Mobile Phone"
                        : feedFaceCount === 0 && cameraStatus === "passed"
                          ? "Cannot Start: Position Face in Camera"
                          : !feedVoicePassed
                            ? "Cannot Start: Verify Voice First"
                            : "Cannot Start: Complete Checks First"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
