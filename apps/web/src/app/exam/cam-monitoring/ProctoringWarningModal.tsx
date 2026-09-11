"use client";

import React from "react";
import type { ProctoringViolationEvent, TerminationEvent } from "./types";

interface ProctoringWarningModalProps {
  warning: ProctoringViolationEvent | null;
  termination: TerminationEvent | null;
  onDismissWarning: () => void;
  onReturnToDashboard?: () => void;
}

export function ProctoringWarningModal({
  warning,
  termination,
  onDismissWarning,
  onReturnToDashboard,
}: ProctoringWarningModalProps) {
  // If exam is terminated: show permanent termination screen
  if (termination) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
        <div className="bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl space-y-5">
          <div className="size-20 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-4xl mx-auto shadow-rose-600/30 shadow-lg animate-pulse">
            ⛔
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/40">
              EXAM TERMINATED
            </span>
            <h2 className="text-2xl font-black text-white pt-1">Proctoring Rule Violation Limit Reached</h2>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-left space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Termination Cause:</span>
              <span className="font-mono text-rose-400 font-bold uppercase">{termination.reasonType}</span>
            </div>
            <p className="text-sm font-semibold text-rose-200 leading-relaxed">
              {termination.reasonMessage}
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Total Violations: {termination.totalViolations}</span>
              <span>Serious Violations: {termination.totalSeriousViolations}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Your examination session has been officially locked and recorded for proctor audit. No further responses can be submitted.
          </p>

          <button
            type="button"
            onClick={onReturnToDashboard || (() => (window.location.href = "/dashboard/student?tab=exams"))}
            className="w-full py-3.5 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-lg shadow-rose-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            Return to Student Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Active Warning Modal
  if (!warning) return null;

  const isMultipleFaces = warning.type === "MULTIPLE_FACES";
  const isAudioViolation = warning.type === "AUDIO_VIOLATION";
  const isPhoneDetected = warning.type === "PHONE_DETECTED";
  const isMicrophoneOff = warning.type === "MICROPHONE_OFF";
  const isSecondWarning = warning.strikeNumber === 2;
  const isSerious = warning.category === "serious" || warning.category === "critical" || isSecondWarning;

  // Render highlighted 2nd (final) warning for microphone off
  if (isMicrophoneOff && isSecondWarning) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 border-2 border-rose-600 ring-4 ring-rose-500/60 shadow-2xl shadow-rose-600/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 animate-pulse">
          <div className="size-20 rounded-full flex items-center justify-center text-4xl mx-auto border-3 bg-rose-500/30 border-rose-500 text-rose-300 shadow-rose-500/50 shadow-xl">
            🔇
          </div>

          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg inline-block animate-bounce">
              🚨 CRITICAL ALERT • FINAL NOTICE
            </span>
            <h3 className="text-2xl font-black text-rose-200 pt-1 tracking-tight">
              MICROPHONE STILL OFF
            </h3>
          </div>

          <div className="bg-rose-950/90 rounded-2xl p-4 border-2 border-rose-500 text-left space-y-3 shadow-inner">
            <p className="text-xs sm:text-sm font-bold text-rose-100 leading-relaxed">
              Your microphone is still muted or disabled. An active microphone is required for the entire exam.
              Take a moment to unmute now — you have a grace period after dismissing this notice.
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-rose-400/60 flex items-start gap-2.5">
              <span className="text-rose-400 text-lg">⚠️</span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-300 block">
                  ZERO REMAINING CHANCES:
                </span>
                <p className="text-xs font-extrabold text-white leading-snug">
                  If the microphone is turned off again, your exam will be DIRECTLY TERMINATED.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-start gap-2">
              <span className="text-violet-400 text-sm">👉</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 block">
                  Action Required Immediately:
                </span>
                <p className="text-xs font-bold text-white leading-snug">
                  Unmute your mic now (keyboard mic key / system mute / browser permission) and keep it on.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismissWarning}
            className="w-full py-3.5 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-lg shadow-rose-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            I Have Turned My Microphone Back On
          </button>
        </div>
      </div>
    );
  }

  // Render highlighted 2nd warning for mobile phone detected
  if (isPhoneDetected && isSecondWarning) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 border-2 border-rose-600 ring-4 ring-rose-500/60 shadow-2xl shadow-rose-600/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 animate-pulse">
          <div className="size-20 rounded-full flex items-center justify-center text-4xl mx-auto border-3 bg-rose-500/30 border-rose-500 text-rose-300 shadow-rose-500/50 shadow-xl">
            📱
          </div>

          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg inline-block animate-bounce">
              🚨 CRITICAL ALERT • FINAL NOTICE
            </span>
            <h3 className="text-2xl font-black text-rose-200 pt-1 tracking-tight">
              MOBILE PHONE STILL DETECTED
            </h3>
          </div>

          <div className="bg-rose-950/90 rounded-2xl p-4 border-2 border-rose-500 text-left space-y-3 shadow-inner">
            <p className="text-xs sm:text-sm font-bold text-rose-100 leading-relaxed">
              A mobile phone or unauthorized electronic device is still visible in your camera frame.
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-rose-400/60 flex items-start gap-2.5">
              <span className="text-rose-400 text-lg">⚠️</span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-300 block">
                  ZERO REMAINING CHANCES:
                </span>
                <p className="text-xs font-extrabold text-white leading-snug">
                  If a phone is detected in your camera view even once more, your exam will be DIRECTLY TERMINATED with zero remaining chances.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-start gap-2">
              <span className="text-violet-400 text-sm">👉</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 block">
                  Action Required Immediately:
                </span>
                <p className="text-xs font-bold text-white leading-snug">
                  Put your phone away completely and keep your hands on the keyboard/mouse.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismissWarning}
            className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-xl shadow-rose-600/40 transition-all cursor-pointer"
          >
            I Understand — Next Detection Will Terminate Exam
          </button>
        </div>
      </div>
    );
  }

  // Render highlighted 2nd warning for multiple faces
  if (isMultipleFaces && isSecondWarning) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 border-2 border-rose-600 ring-4 ring-rose-500/60 shadow-2xl shadow-rose-600/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 animate-pulse">
          {/* Highlighted Warning Icon */}
          <div className="size-20 rounded-full flex items-center justify-center text-4xl mx-auto border-3 bg-rose-500/30 border-rose-500 text-rose-300 shadow-rose-500/50 shadow-xl">
            👥
          </div>

          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg inline-block animate-bounce">
              🚨 CRITICAL ALERT • FINAL NOTICE
            </span>
            <h3 className="text-2xl font-black text-rose-200 pt-1 tracking-tight">
              MULTIPLE PEOPLE STILL DETECTED
            </h3>
          </div>

          {/* Highlighted Callout Box */}
          <div className="bg-rose-950/90 rounded-2xl p-4 border-2 border-rose-500 text-left space-y-3 shadow-inner">
            <p className="text-xs sm:text-sm font-bold text-rose-100 leading-relaxed">
              Examination integrity requires you to be completely alone in the room. Another individual is still visible in your testing environment.
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-rose-400/60 flex items-start gap-2.5">
              <span className="text-rose-400 text-lg">⚠️</span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-300 block">
                  ZERO REMAINING CHANCES:
                </span>
                <p className="text-xs font-extrabold text-white leading-snug">
                  If another person is detected in your camera view even once more, your exam will be DIRECTLY TERMINATED without any further alerts.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-start gap-2">
              <span className="text-violet-400 text-sm">👉</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 block">
                  Action Required Immediately:
                </span>
                <p className="text-xs font-bold text-white leading-snug">
                  Remove everyone from the room immediately and close the door before continuing.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismissWarning}
            className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-xl shadow-rose-600/40 transition-all cursor-pointer"
          >
            I Understand — Next Detection Will Terminate Exam
          </button>
        </div>
      </div>
    );
  }

  // Render highlighted 2nd warning for audio / speaking
  if (isAudioViolation && isSecondWarning) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 border-2 border-rose-600 ring-4 ring-rose-500/60 shadow-2xl shadow-rose-600/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 animate-pulse">
          <div className="size-20 rounded-full flex items-center justify-center text-4xl mx-auto border-3 bg-rose-500/30 border-rose-500 text-rose-300 shadow-rose-500/50 shadow-xl">
            🎙️
          </div>

          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg inline-block animate-bounce">
              🚨 CRITICAL ALERT • FINAL NOTICE
            </span>
            <h3 className="text-2xl font-black text-rose-200 pt-1 tracking-tight">
              TALKING / VOICES STILL DETECTED
            </h3>
          </div>

          <div className="bg-rose-950/90 rounded-2xl p-4 border-2 border-rose-500 text-left space-y-3 shadow-inner">
            <p className="text-xs sm:text-sm font-bold text-rose-100 leading-relaxed">
              Background voices, conversation, or speech were detected again in your testing room.
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-rose-400/60 flex items-start gap-2.5">
              <span className="text-rose-400 text-lg">⚠️</span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-300 block">
                  ZERO REMAINING CHANCES:
                </span>
                <p className="text-xs font-extrabold text-white leading-snug">
                  If talking, whispering, or background speech is detected even once more, your exam will be DIRECTLY TERMINATED.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-start gap-2">
              <span className="text-violet-400 text-sm">👉</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 block">
                  Action Required Immediately:
                </span>
                <p className="text-xs font-bold text-white leading-snug">
                  Remain completely silent and ask anyone in the background to leave the room immediately.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismissWarning}
            className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-xl shadow-rose-600/40 transition-all cursor-pointer"
          >
            I Understand — Next Detection Will Terminate Exam
          </button>
        </div>
      </div>
    );
  }

  // 1st warning or other violation types: action-specific messaging without mentioning warning numbers/strikes
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
      <div
        className={`bg-slate-900 border-2 rounded-3xl p-6 sm:p-7 max-w-md w-full text-center shadow-2xl space-y-4 ${isSerious ? "border-rose-500 shadow-rose-500/20" : "border-amber-500 shadow-amber-500/20"
          }`}
      >
        {/* Violation Icon Badge */}
        <div
          className={`size-16 rounded-full flex items-center justify-center text-3xl mx-auto border-2 ${isSerious
            ? "bg-rose-500/20 border-rose-500 text-rose-400"
            : "bg-amber-500/20 border-amber-500 text-amber-400"
            }`}
        >
          {warning.type === "PHONE_DETECTED"
            ? "📱"
            : warning.type === "MULTIPLE_FACES"
              ? "👥"
              : warning.type === "CAMERA_DISCONNECTED"
                ? "📷"
                : warning.type === "MICROPHONE_OFF"
                  ? "🔇"
                : warning.type === "TAB_SWITCHING"
                  ? "🔄"
                  : warning.type === "SCREENSHOT_ATTEMPT"
                    ? "📸"
                    : warning.type === "AUDIO_VIOLATION"
                      ? "🎙️"
                      : "⚠️"}
        </div>

        {/* Header Badge */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${isSerious
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                }`}
            >
              {isMultipleFaces
                ? "ROOM INTEGRITY ALERT"
                : isAudioViolation
                  ? "AUDIO INTEGRITY ALERT"
                  : isMicrophoneOff
                    ? "MICROPHONE ALERT"
                  : isSerious
                    ? "PROCTORING INTEGRITY ALERT"
                    : "PROCTORING NOTICE"}
            </span>
          </div>

          <h3 className="text-xl font-black text-white pt-1">
            {isMultipleFaces
              ? "Multiple People Detected in Camera View"
              : isAudioViolation
                ? "Background Speech / Voices Detected"
                : isMicrophoneOff
                  ? "Microphone Turned Off"
                : warning.type === "PHONE_DETECTED"
                  ? "Mobile Phone Detected in Camera View"
                  : warning.type === "TAB_SWITCHING"
                    ? "Tab Switching Prohibited"
                    : warning.type.replace(/_/g, " ")}
          </h3>
        </div>

        {/* Action-Specific Explanation Card */}
        <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 text-left space-y-2.5">
          <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
            {isMultipleFaces
              ? "Another individual was detected in your camera frame. Examination rules strictly require you to be completely alone in the room throughout the exam."
              : isAudioViolation
                ? "Conversational voices or background speech were detected in your testing room. Absolute silence is strictly required during the exam."
                : isMicrophoneOff
                  ? "Your microphone was muted or disabled (including via keyboard). This may have been accidental — unmute it now. You have time to fix this before another warning is issued."
                : warning.message}
          </p>

          {/* Student Action Required */}
          <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/30 flex items-start gap-2">
            <span className="text-violet-400 text-sm">👉</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 block">
                Action Required:
              </span>
              <p className="text-xs font-bold text-white leading-snug">
                {isMultipleFaces
                  ? "Please ensure the other person immediately leaves your testing area. Keep only your face visible."
                  : isAudioViolation
                    ? "Remain silent and ask any individuals nearby to leave the room immediately."
                    : isMicrophoneOff
                      ? "Unmute your microphone (keyboard mic key / system mute), then continue. Keep it on for the rest of the exam."
                    : warning.actionRequired}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-medium">
            {isMicrophoneOff
              ? "After you dismiss this, you get a short grace period to unmute. A second mute warning is your final notice; a third mute will terminate the exam."
              : "Repeated occurrences will result in immediate disqualification and termination of your exam."}
          </p>
        </div>

        {/* Acknowledgment Action Button */}
        <button
          type="button"
          onClick={onDismissWarning}
          className={`w-full py-3 px-6 rounded-xl font-black text-sm text-white transition-all cursor-pointer shadow-lg ${isSerious
            ? "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30"
            : "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30"
            }`}
        >
          {isMultipleFaces
            ? "I Have Cleared the Room — Continue Exam"
            : isAudioViolation
              ? "I Understand — Silence Testing Area"
              : "I Understand & Acknowledge"}
        </button>
      </div>
    </div>
  );
}
