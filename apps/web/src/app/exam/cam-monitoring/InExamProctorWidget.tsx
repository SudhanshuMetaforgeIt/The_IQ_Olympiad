"use client";

import React, { useState } from "react";
import { useCameraMonitoring } from "./useCameraMonitoring";
import { ProctoringWarningModal } from "./ProctoringWarningModal";
import type { ProctoringViolationEvent, TerminationEvent } from "./types";

export interface InExamProctorWidgetProps {
  stream?: MediaStream | null;
  onExamTerminated?: (event: TerminationEvent) => void;
  onViolationRecorded?: (event: ProctoringViolationEvent) => void;
  onReturnToDashboard?: () => void;
  className?: string;
  showMeshToggle?: boolean;
}

/**
 * Compact, embeddable In-Exam AI Proctoring Widget
 * Directly connects to the exam camera stream, runs all 6 strict proctoring rules,
 * displays warnings with explicit action required, and handles 4-strike termination.
 */
export function InExamProctorWidget({
  stream = null,
  onExamTerminated,
  onViolationRecorded,
  onReturnToDashboard,
  className = "",
  showMeshToggle = false,
}: InExamProctorWidgetProps) {
  const {
    videoRef,
    canvasRef,
    isLoadingModel,
    modelError,
    currentFrameResult,
    activeWarning,
    isTerminated,
    terminationDetails,
    counters,
    dismissWarning,
  } = useCameraMonitoring({
    existingStream: stream,
    isExamStarted: true,
    autoStart: true,
    enableMeshDrawing: false,
    enableAudioMonitoring: true,
    enableScreenshotPrevention: true,
    onViolationRecorded,
    onExamTerminated,
  });

  return (
    <>
      {/* Strict Student Warning & Termination Modal */}
      <ProctoringWarningModal
        warning={activeWarning}
        termination={terminationDetails}
        onDismissWarning={dismissWarning}
        onReturnToDashboard={onReturnToDashboard}
      />

      {/* Picture-in-Picture Mini Proctor Viewport */}
      <div
        className={`relative w-16 h-12 sm:w-24 sm:h-16 lg:w-28 lg:h-20 rounded-lg sm:rounded-xl bg-slate-950 border-2 overflow-hidden shadow-md flex items-center justify-center shrink-0 transition-colors ${currentFrameResult?.detectedPhone
            ? "border-rose-500 ring-1 ring-rose-500/50"
            : (currentFrameResult?.faceCount ?? 1) !== 1
              ? "border-amber-500 ring-1 ring-amber-500/30"
              : "border-violet-500/80"
          } ${className}`}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100 block"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transform -scale-x-100"
        />

        {/* Top Badges */}
        <div className="absolute top-1 left-1.5 flex items-center gap-1 z-10">
          <div className="flex items-center gap-1 bg-black/75 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-white/10">
            <span
              className={`size-1.5 rounded-full ${isTerminated
                  ? "bg-rose-600"
                  : currentFrameResult?.isCompliant
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-amber-400 animate-pulse"
                }`}
            />
            <span className="text-[8px] font-black text-white uppercase tracking-wider">
              {isTerminated ? "LOCKED" : "AI LIVE"}
            </span>
          </div>

          {currentFrameResult?.detectedPhone && (
            <span className="text-[8px] font-black bg-rose-600 text-white px-1 rounded animate-bounce">
              📱 PHONE
            </span>
          )}
        </div>

        {/* Proctor Status Badge (Bottom) */}
        <div className="absolute bottom-1 inset-x-1.5 flex items-center justify-between z-10 text-[8px] font-mono">
          <span className="px-1.5 py-0.5 rounded font-bold bg-black/75 backdrop-blur-xs text-slate-300 border border-white/10">
            {isTerminated ? "TERMINATED" : "PROCTOR ACTIVE"}
          </span>
        </div>

        {/* Loading Spinner */}
        {isLoadingModel && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="size-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Model Error */}
        {modelError && (
          <div className="absolute inset-0 bg-rose-950/90 p-1 flex items-center justify-center text-center z-20">
            <span className="text-[7px] font-bold text-rose-300">Camera error</span>
          </div>
        )}
      </div>
    </>
  );
}
