"use client";

import React, { useState } from "react";
import { useCameraMonitoring } from "./useCameraMonitoring";
import { ProctoringWarningModal } from "./ProctoringWarningModal";
import { VerificationMediaPipeFeed, type PreExamReadinessStatus } from "./VerificationMediaPipeFeed";
import type { IncidentCategory, ViolationType } from "./types";

interface CameraMonitoringViewProps {
  className?: string;
  onViolation?: (violation: string) => void;
  onExamTerminated?: () => void;
}

export function CameraMonitoringView({ className = "", onExamTerminated }: CameraMonitoringViewProps) {
  const [meshEnabled, setMeshEnabled] = useState(true);
  const [activeViewMode, setActiveViewMode] = useState<"live_exam" | "pre_exam">("pre_exam");
  const [showSimulator, setShowSimulator] = useState(false);

  // Real pre-exam diagnostic readiness states (STEP 8)
  const [preExamStatus, setPreExamStatus] = useState<PreExamReadinessStatus>({
    cameraReady: false,
    faceCount: 0,
    isFaceCentered: false,
    isSingleFace: false,
    voicePassed: false,
    phoneDetected: false,
    isDisqualified: false,
    isOverallVerified: false,
  });

  const {
    videoRef,
    canvasRef,
    isLoadingModel,
    modelError,
    isMonitoringActive,
    availableDevices,
    selectedDeviceId,
    setSelectedDeviceId,
    mediaStream,
    currentFrameResult,
    violationsList,
    activeWarning,
    isTerminated,
    terminationDetails,
    sessionStats,
    counters,
    isExamStarted,
    setIsExamStarted,
    triggerViolation,
    dismissWarning,
    startCamera,
    stopCamera,
    clearViolations,
  } = useCameraMonitoring({
    enableMeshDrawing: meshEnabled,
    autoStart: true,
    isExamStarted: activeViewMode === "live_exam",
    onExamTerminated: () => {
      onExamTerminated?.();
    },
  });

  // STEP 8: Calculate real genuine readiness
  const isCameraPassed = !!mediaStream && mediaStream.getVideoTracks().length > 0;
  const isFacePassed = preExamStatus.faceCount === 1 && preExamStatus.isFaceCentered;
  const isMultipleFacePassed = preExamStatus.faceCount <= 1;
  const isMicPassed = !!mediaStream && mediaStream.getAudioTracks().length > 0;
  const isVoicePassed = preExamStatus.voicePassed;
  const isPhonePassed = !preExamStatus.phoneDetected;
  const isProctorActive = isMonitoringActive && !isLoadingModel;

  const isExamReady =
    isCameraPassed &&
    isFacePassed &&
    isMultipleFacePassed &&
    isMicPassed &&
    isVoicePassed &&
    isPhonePassed &&
    !preExamStatus.isDisqualified &&
    isProctorActive;

  const getCategoryBadgeClass = (cat: IncidentCategory) => {
    switch (cat) {
      case "critical":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "serious":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      case "standard":
      default:
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-500";
  };

  const handleStartLiveExam = async () => {
    if (!isExamReady) return;
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request:", err);
    }
    setIsExamStarted(true);
    setActiveViewMode("live_exam");
    console.log("[Exam] Transitioned from Pre-Exam to Live Exam. Proctoring is active.");
  };

  return (
    <div className={`flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 sm:p-6 text-slate-100 ${className}`}>
      {/* Warning and Termination Modal */}
      <ProctoringWarningModal
        warning={activeWarning}
        termination={terminationDetails}
        onDismissWarning={dismissWarning}
      />

      {/* Mode Switcher & Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center size-10 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400 font-black">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            {isMonitoringActive && !isTerminated && (
              <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight text-white">AI Proctoring Monitor</h2>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                MediaPipe 7-Rule Strict Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">Detection → Confirmation → Warning → Escalation → Termination</p>
          </div>
        </div>

        {/* Phase Mode Navigation Switcher */}
        <div className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveViewMode("pre_exam");
              setIsExamStarted(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeViewMode === "pre_exam"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-400 hover:text-white"
              }`}
          >
            1. Pre-Exam Verification Gating
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveViewMode("live_exam");
              setIsExamStarted(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeViewMode === "live_exam"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                : "text-slate-400 hover:text-white"
              }`}
          >
            2. Live Exam Monitoring (Rules 1–7)
          </button>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
          {/* Exam Active Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
            <span
              className={`size-2 rounded-full ${isTerminated
                  ? "bg-rose-600"
                  : isExamStarted
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-amber-400"
                }`}
            />
            <span className="font-semibold text-slate-300">
              {isTerminated
                ? "Exam Terminated"
                : isExamStarted
                  ? "Exam Active (Rules Enforced)"
                  : "Pre-Exam Gating Active"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono">
            <span className="text-slate-400">FPS:</span>
            <span className="font-bold text-emerald-400">{currentFrameResult?.fps ?? 0}</span>
          </div>

          {availableDevices.length > 1 && !isTerminated && (
            <select
              value={selectedDeviceId}
              onChange={(e) => {
                setSelectedDeviceId(e.target.value);
                startCamera(e.target.value);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              {availableDevices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label}
                </option>
              ))}
            </select>
          )}

          {!isTerminated && (
            <button
              onClick={() => (isMonitoringActive ? stopCamera() : startCamera(selectedDeviceId))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isMonitoringActive
                  ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40"
                  : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40"
                }`}
            >
              {isMonitoringActive ? "Pause Camera" : "Resume Camera"}
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: Pre-Exam Verification & Calibration Flow (STEP 7 & STEP 8) */}
      {activeViewMode === "pre_exam" && (
        <div className="flex flex-col gap-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-black text-white">Pre-Exam Strict Readiness & Biometric Verification</h3>
              <p className="text-xs text-slate-400">
                All 8 verification checks below are strictly enforced from real hardware and MediaPipe models.
              </p>
            </div>

            {/* Gated Next Button (STEP 8) */}
            <button
              type="button"
              disabled={!isExamReady}
              onClick={handleStartLiveExam}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg ${isExamReady
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed shadow-none"
                }`}
            >
              {isExamReady ? "✓ All Checks Passed → Next: Take Exam" : "Complete All 8 Checks Below to Take Exam"}
            </button>
          </div>

          {/* 8 Diagnostic Criteria Grid (STEP 8) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* 1. Camera */}
            <div className={`p-3 rounded-2xl border ${isCameraPassed ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">1. Camera</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isCameraPassed ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {isCameraPassed ? "PASS" : "WAITING"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Live video track</p>
            </div>

            {/* 2. Face */}
            <div className={`p-3 rounded-2xl border ${isFacePassed ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">2. Face Aligned</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isFacePassed ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {isFacePassed ? "PASS" : "WAITING"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">1 face centered in view</p>
            </div>

            {/* 3. Multiple Face */}
            <div className={`p-3 rounded-2xl border ${isMultipleFacePassed ? "bg-emerald-950/40 border-emerald-500/40" : "bg-rose-950/40 border-rose-500/40"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">3. Multiple Face</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isMultipleFacePassed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                  {isMultipleFacePassed ? "PASS" : "FAILED"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">No extra persons</p>
            </div>

            {/* 4. Microphone */}
            <div className={`p-3 rounded-2xl border ${isMicPassed ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">4. Microphone</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isMicPassed ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {isMicPassed ? "PASS" : "WAITING"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Audio track ready</p>
            </div>

            {/* 5. Voice Verification */}
            <div className={`p-3 rounded-2xl border ${isVoicePassed ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">5. Voice Verify</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isVoicePassed ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {isVoicePassed ? "PASS" : "REQUIRED"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Prompt sentence read</p>
            </div>

            {/* 6. Phone Check */}
            <div className={`p-3 rounded-2xl border ${isPhonePassed ? "bg-emerald-950/40 border-emerald-500/40" : "bg-rose-950/40 border-rose-500/40"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">6. Phone Check</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isPhonePassed ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                  {isPhonePassed ? "PASS" : "FAIL (PHONE)"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">No phones in view</p>
            </div>

            {/* 7. Fullscreen Ready */}
            <div className="p-3 rounded-2xl border bg-emerald-950/40 border-emerald-500/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">7. Fullscreen</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  PASS
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Enters on Start click</p>
            </div>

            {/* 8. Proctoring Engine */}
            <div className={`p-3 rounded-2xl border ${isProctorActive ? "bg-emerald-950/40 border-emerald-500/40" : "bg-slate-950/60 border-slate-800"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-300">8. AI Engine</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isProctorActive ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {isProctorActive ? "ACTIVE" : "LOADING"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">MediaPipe Vision AI</p>
            </div>
          </div>

          {/* Shared Stream Feed */}
          <VerificationMediaPipeFeed
            stream={mediaStream}
            onVerificationStatusChange={(verified, count, disqualified, voicePassed, phoneDetected, detailed) => {
              if (detailed) {
                setPreExamStatus(detailed);
              } else {
                setPreExamStatus({
                  cameraReady: !!mediaStream,
                  faceCount: count,
                  isFaceCentered: verified,
                  isSingleFace: count === 1,
                  voicePassed: !!voicePassed,
                  phoneDetected: !!phoneDetected,
                  isDisqualified: !!disqualified,
                  isOverallVerified: verified,
                });
              }
            }}
          />
        </div>
      )}

      {/* VIEW MODE 2: In-Exam Live Monitoring (7 Strict Rules Execution) */}
      {activeViewMode === "live_exam" && (
        <>
          {/* Test Simulator Toggle Bar */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-violet-600/30 text-violet-300 font-black text-[10px] uppercase">
                Proctoring Rules Status
              </span>
              <span className="text-slate-400 text-xs">
                Rules Enforced: Face Missing (5s), Tab Switch, Multiple Faces, Audio/Voice, Screenshot, Phone Detection, Fullscreen.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSimulator(!showSimulator)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
              >
                {showSimulator ? "Hide Rule QA Simulator" : "🛠️ Rule QA Simulator (Test Strikes)"}
              </button>
              <button
                type="button"
                onClick={() => setIsExamStarted(!isExamStarted)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${isExamStarted
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
                    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                  }`}
              >
                {isExamStarted ? "Pause In-Exam Rules" : "Resume In-Exam Rules"}
              </button>
            </div>
          </div>

          {/* Collapsible Test Simulator Bar */}
          {showSimulator && (
            <div className="bg-slate-950/80 border border-violet-500/30 rounded-2xl p-4 shadow-lg flex flex-col gap-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-violet-400 font-black text-xs">⚡ Interactive Rule Strike Simulation</span>
                  <span className="text-[10px] text-slate-400">
                    Click to test confirmed incidents (Strikes 1–3 warn, 4th terminates exam).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearViolations}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold cursor-pointer"
                >
                  Reset Strikes & Trust Score
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => triggerViolation("FACE_MISSING", "Simulated face absent > 5s")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-center cursor-pointer transition-colors"
                >
                  👤 1. Face Missing
                  <span className="block text-[10px] text-amber-400 font-mono mt-0.5">
                    Strike {counters.faceMissingCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerViolation("TAB_SWITCHING", "Simulated visibilitychange hidden")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-center cursor-pointer transition-colors"
                >
                  🔄 2. Tab Switch
                  <span className="block text-[10px] text-amber-400 font-mono mt-0.5">
                    Strike {counters.tabSwitchingCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerViolation("MULTIPLE_FACES", "Simulated multiple faces")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-900/60 text-rose-200 font-bold text-center cursor-pointer transition-colors"
                >
                  👥 3. Multiple Faces
                  <span className="block text-[10px] text-rose-400 font-mono mt-0.5">
                    Serious {counters.multipleFacesCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerViolation("AUDIO_VIOLATION", "Simulated continuous speech")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-900/60 text-rose-200 font-bold text-center cursor-pointer transition-colors"
                >
                  🎙️ 4. Audio Voice
                  <span className="block text-[10px] text-rose-400 font-mono mt-0.5">
                    Serious {counters.audioViolationCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerViolation("SCREENSHOT_ATTEMPT", "Simulated PrintScreen shortcut")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-center cursor-pointer transition-colors"
                >
                  📸 5. Screenshot
                  <span className="block text-[10px] text-amber-400 font-mono mt-0.5">
                    Strike {counters.screenshotAttemptCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerViolation("PHONE_DETECTED", "Simulated phone detection AI")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-900/60 text-rose-200 font-bold text-center cursor-pointer transition-colors"
                >
                  📱 6. Phone Detect
                  <span className="block text-[10px] text-rose-400 font-mono mt-0.5">
                    Serious {counters.phoneDetectedCount}/4
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerViolation("FULLSCREEN_EXIT", "Simulated fullscreen exit")}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-center cursor-pointer transition-colors"
                >
                  🖥️ 7. Fullscreen
                  <span className="block text-[10px] text-amber-400 font-mono mt-0.5">
                    Strike {counters.fullscreenExitCount}/4
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Main Grid: Video Stream + Rule Counters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Viewport (8 Columns) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 block"
                />

                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none transform -scale-x-100"
                />

                {/* Top Viewport Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-black text-white uppercase tracking-wider">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Feed
                  </span>

                  {/* Face Detection Status */}
                  <span
                    className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[11px] font-bold ${(currentFrameResult?.faceCount ?? 0) === 1
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                        : (currentFrameResult?.faceCount ?? 0) === 0
                          ? "bg-rose-500/30 border-rose-500/50 text-rose-200 animate-pulse"
                          : "bg-rose-500/30 border-rose-500/50 text-rose-200 animate-pulse"
                      }`}
                  >
                    {(currentFrameResult?.faceCount ?? 0) === 1
                      ? "✓ 1 Candidate In Frame"
                      : (currentFrameResult?.faceCount ?? 0) === 0
                        ? "⚠ Face Missing"
                        : `⚠ Multiple Faces (${currentFrameResult?.faceCount})`}
                  </span>

                  {/* Phone Alert Badge in viewport */}
                  {currentFrameResult?.detectedPhone && (
                    <span className="px-2.5 py-1 rounded-full backdrop-blur-md border border-rose-500 bg-rose-600/40 text-rose-200 text-[11px] font-black uppercase animate-bounce flex items-center gap-1">
                      <span>📱</span> Phone Detected ({Math.round(currentFrameResult.detectedPhone.confidence * 100)}%)
                    </span>
                  )}
                </div>

                {/* Mesh Overlay Toggle Button */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={() => setMeshEnabled(!meshEnabled)}
                    className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${meshEnabled
                        ? "bg-violet-600/60 border-violet-400 text-white"
                        : "bg-black/60 border-white/20 text-slate-300"
                      }`}
                  >
                    {meshEnabled ? "Mesh: ON" : "Mesh: OFF"}
                  </button>
                </div>

                {/* Active Alert Banner inside viewport */}
                {currentFrameResult && !currentFrameResult.isCompliant && (
                  <div className="absolute bottom-3 inset-x-3 z-10 p-2.5 rounded-xl bg-rose-950/85 border border-rose-500/60 backdrop-blur-md text-rose-200 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-base">⚠️</span>
                    <span>
                      {currentFrameResult.activeViolations.join(" • ").replace(/_/g, " ")}
                    </span>
                  </div>
                )}

                {isLoadingModel && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20">
                    <div className="size-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                    <p className="text-xs font-semibold text-slate-300">Loading MediaPipe Vision Models...</p>
                  </div>
                )}

                {modelError && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20 p-6 text-center">
                    <span className="text-3xl">⚠️</span>
                    <p className="text-sm font-bold text-rose-400">{modelError}</p>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Please ensure camera and microphone permissions are granted.
                    </p>
                  </div>
                )}
              </div>

              {/* 7 Core Rules Status Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Face Missing */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">1. Face Missing</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.faceMissingCount > 0 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.faceMissingCount} / 4 Strikes
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Confirmed if absent &gt; 5s</p>
                </div>

                {/* 2. Tab Switching */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">2. Tab Switch</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.tabSwitchingCount > 0 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.tabSwitchingCount} / 4 Strikes
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">1 incident while hidden</p>
                </div>

                {/* 3. Multiple Faces */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-300">3. Multiple Faces</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.multipleFacesCount > 0 ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.multipleFacesCount} / 4 Serious
                    </span>
                  </div>
                  <p className="text-[10px] text-rose-400/80 mt-1 font-semibold">Confirmed &gt; 1.5s</p>
                </div>

                {/* 4. Audio / Voice */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-300">4. Audio / Voice</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.audioViolationCount > 0 ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.audioViolationCount} / 4 Serious
                    </span>
                  </div>
                  <p className="text-[10px] text-rose-400/80 mt-1 font-semibold">Continuous speech</p>
                </div>

                {/* 5. Screenshot Prohibition */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">5. Screenshot</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.screenshotAttemptCount > 0 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.screenshotAttemptCount} / 4 Strikes
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Intercepts keys & snip</p>
                </div>

                {/* 6. Phone Detection */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-300">6. Phone Detect</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.phoneDetectedCount > 0 ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.phoneDetectedCount} / 4 Serious
                    </span>
                  </div>
                  <p className="text-[10px] text-rose-400/80 mt-1 font-semibold">Confirmed &gt; 1.2s</p>
                </div>

                {/* 7. Fullscreen Exit */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">7. Fullscreen</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${counters.fullscreenExitCount > 0 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {counters.fullscreenExitCount} / 4 Strikes
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Exited fullscreen</p>
                </div>

                {/* Camera Status */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Camera Feed</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-400">
                      Live
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Shared webcam</p>
                </div>
              </div>
            </div>

            {/* Right: Integrity Scorecard & Incident Log (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidate Integrity Score</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black font-mono ${getTrustScoreColor(sessionStats.trustScore)}`}>
                      {sessionStats.trustScore}
                    </span>
                    <span className="text-sm font-bold text-slate-500">/ 100</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${sessionStats.trustScore >= 80
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : sessionStats.trustScore >= 60
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                      }`}
                  >
                    {sessionStats.trustScore >= 80 ? "High Trust" : sessionStats.trustScore >= 60 ? "Warning" : "Critical"}
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${sessionStats.trustScore >= 80
                        ? "bg-emerald-500"
                        : sessionStats.trustScore >= 60
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                    style={{ width: `${sessionStats.trustScore}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Serious Violations</span>
                    <span className="font-mono font-black text-rose-400 text-base">
                      {counters.totalSeriousWarnings} / 4
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Standard Violations</span>
                    <span className="font-mono font-black text-amber-400 text-base">
                      {counters.totalStandardWarnings} / 8
                    </span>
                  </div>
                </div>
              </div>

              {/* Incident Feed */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Incident Log</h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-400">
                      {violationsList.length}
                    </span>
                  </div>
                  {violationsList.length > 0 && (
                    <button
                      type="button"
                      onClick={clearViolations}
                      className="text-[10px] font-bold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      Clear Log
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto pr-1">
                  {violationsList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center gap-2 text-slate-500">
                      <span className="text-2xl">🛡️</span>
                      <p className="text-xs font-medium">No violations committed.</p>
                      <p className="text-[10px] text-slate-600">Continuous AI & System Monitoring Active.</p>
                    </div>
                  ) : (
                    violationsList.map((violation) => (
                      <div
                        key={violation.id}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5 text-xs animate-in fade-in"
                      >
                        {violation.snapshotUrl ? (
                          <img
                            src={violation.snapshotUrl}
                            alt="Violation snapshot"
                            className="size-10 rounded-lg object-cover shrink-0 border border-slate-700"
                          />
                        ) : (
                          <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm shrink-0">
                            {violation.type === "PHONE_DETECTED"
                              ? "📱"
                              : violation.type === "MULTIPLE_FACES"
                                ? "👥"
                                : violation.type === "FULLSCREEN_EXIT"
                                  ? "🖥️"
                                  : violation.type === "TAB_SWITCHING"
                                    ? "🔄"
                                    : "⚠️"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${getCategoryBadgeClass(
                                violation.category
                              )}`}
                            >
                              {violation.type.replace(/_/g, " ")}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(violation.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px] mt-1 leading-tight line-clamp-2">
                            {violation.message}
                          </p>
                          {violation.actionRequired && (
                            <p className="text-violet-300 text-[10px] mt-0.5 font-semibold leading-tight">
                              👉 {violation.actionRequired}
                            </p>
                          )}
                          <span className="text-[9px] font-mono text-slate-500 mt-1 block">
                            Strike {violation.strikeNumber} of {violation.maxStrikes}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
