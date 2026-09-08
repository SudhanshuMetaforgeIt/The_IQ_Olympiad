"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import { mediaPipeVisionManager } from "./faceLandmarkerService";
import { mediaPipeObjectDetectorManager } from "./objectDetectorService";
import { audioProctoringEngine } from "./audioProctoringService";
import { DEFAULT_PROCTORING_CONFIG } from "./proctoringConfig";
import {
  estimateHeadPose,
  getBoundingBox,
} from "./proctoringAnalysis";
import type { HeadPose } from "./types";

export interface PreExamReadinessStatus {
  cameraReady: boolean;
  faceCount: number;
  isFaceCentered: boolean;
  isSingleFace: boolean;
  voicePassed: boolean;
  phoneDetected: boolean;
  isDisqualified: boolean;
  isOverallVerified: boolean;
}

interface VerificationMediaPipeFeedProps {
  stream: MediaStream | null;
  className?: string;
  onVerificationStatusChange?: (
    isVerified: boolean,
    faceCount: number,
    isDisqualified?: boolean,
    audioPassed?: boolean,
    phoneDetected?: boolean,
    detailedStatus?: PreExamReadinessStatus
  ) => void;
}

export function VerificationMediaPipeFeed({
  stream: externalStream,
  className = "",
  onVerificationStatusChange,
}: VerificationMediaPipeFeedProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [internalStream, setInternalStream] = useState<MediaStream | null>(null);
  const activeStream = externalStream || internalStream;

  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [faceCount, setFaceCount] = useState<number>(0);
  const lastFaceLogCountRef = useRef<number>(-1);
  const [isFaceCentered, setIsFaceCentered] = useState<boolean>(false);

  // Phone Detection in Pre-Exam
  const [isPhoneDetected, setIsPhoneDetected] = useState<boolean>(false);
  const lastPhoneCheckTimeRef = useRef<number>(0);

  // Rule 3: Pre-Exam Multiple Face Correction Attempts
  const [multiFaceStrikes, setMultiFaceStrikes] = useState<number>(0);
  const [isDisqualified, setIsDisqualified] = useState<boolean>(false);
  const multiFaceTimerRef = useRef<number | null>(null);

  // Rule 4: Pre-Exam Voice Verification
  const [activeVoicePromptIndex, setActiveVoicePromptIndex] = useState<number>(0);
  const [voiceVolume, setVoiceVolume] = useState<number>(0);
  const [isVoiceVerifying, setIsVoiceVerifying] = useState<boolean>(false);
  const [voiceSecondsLeft, setVoiceSecondsLeft] = useState<number>(5);
  const [voicePassed, setVoicePassed] = useState<boolean>(false);
  const [voiceAttempts, setVoiceAttempts] = useState<number>(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const prompts = DEFAULT_PROCTORING_CONFIG.audioMonitoring.preExamPrompts;
  const currentPrompt = prompts[activeVoicePromptIndex];

  // Fallback camera creation ONLY if no external stream is provided
  useEffect(() => {
    if (externalStream) return;

    let isMounted = true;
    async function initFallbackCamera() {
      try {
        console.log("[Camera] Pre-exam feed requesting local getUserMedia stream...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
          audio: true,
        });
        if (isMounted) {
          setInternalStream(stream);
        }
      } catch (err) {
        console.error("[Camera] Pre-exam local getUserMedia failed:", err);
      }
    }

    initFallbackCamera();

    return () => {
      isMounted = false;
      if (internalStream) {
        internalStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [externalStream]);

  // Attach active stream to video element and audio engine
  useEffect(() => {
    if (videoRef.current && activeStream) {
      videoRef.current.srcObject = activeStream;
      videoRef.current.play().catch(() => { });
    }
    if (activeStream && activeStream.getAudioTracks().length > 0) {
      audioProctoringEngine.startMonitoring(activeStream);
    }
  }, [activeStream]);

  // Continuous live microphone signal monitoring (STEP 6)
  useEffect(() => {
    if (!activeStream || activeStream.getAudioTracks().length === 0) return;

    const interval = setInterval(() => {
      if (!isVoiceVerifying) {
        const metrics = audioProctoringEngine.sampleAudio();
        setVoiceVolume(metrics.currentVolume);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeStream, isVoiceVerifying]);

  // Load MediaPipe FaceLandmarker
  useEffect(() => {
    let isCancelled = false;

    async function loadLandmarker() {
      setIsModelLoading(true);
      setModelError(null);
      try {
        const landmarker = await mediaPipeVisionManager.getFaceLandmarker();
        if (!isCancelled) {
          landmarkerRef.current = landmarker;
          setIsModelLoading(false);
          console.log("[Face] Pre-exam FaceLandmarker loaded successfully.");
        }
      } catch (err) {
        if (!isCancelled) {
          setModelError(err instanceof Error ? err.message : "Failed to load MediaPipe model");
          setIsModelLoading(false);
        }
      }
    }

    loadLandmarker();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Rule 3: Multiple Faces Pre-Exam Status
  useEffect(() => {
    if (faceCount > 1) {
      console.log(`[Face] Multiple faces detected in pre-exam verification: ${faceCount} faces.`);
      const isVerified = false;
      onVerificationStatusChange?.(isVerified, faceCount, false, voicePassed, isPhoneDetected);
    }
  }, [faceCount, isPhoneDetected, onVerificationStatusChange, voicePassed]);

  // Rule 4: Run Voice Prompt Verification (STEP 7)
  const startVoiceVerification = useCallback(async () => {
    if (isVoiceVerifying) return;
    setIsVoiceVerifying(true);
    setVoiceError(null);

    console.log("[Audio] Pre-exam voice verification started by candidate.");
    const result = await audioProctoringEngine.verifyPromptSpeech(
      currentPrompt,
      (vol, sec) => {
        setVoiceVolume(vol);
        setVoiceSecondsLeft(sec);
      }
    );

    setIsVoiceVerifying(false);

    if (result.passed) {
      console.log("[Audio] Pre-exam voice verification PASSED.");
      setVoicePassed(true);
      setVoiceError(null);
      const isVerified = faceCount === 1 && isFaceCentered && !isPhoneDetected;
      onVerificationStatusChange?.(isVerified, faceCount, false, true, isPhoneDetected);
    } else {
      console.log(`[Audio] Pre-exam voice verification FAILED (Attempt ${voiceAttempts + 1}).`);
      setVoiceAttempts((prev) => prev + 1);
      setVoiceError(`Audio check not passed. ${result.error || "Please speak the prompt sentence clearly into your mic and try again."}`);
    }
  }, [currentPrompt, faceCount, isFaceCentered, isPhoneDetected, isVoiceVerifying, onVerificationStatusChange, voiceAttempts]);

  // Draw Overlays
  const renderOverlays = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      landmarksList: { x: number; y: number; z: number }[][],
      centered: boolean
    ) => {
      ctx.clearRect(0, 0, width, height);

      if (landmarksList.length === 0) {
        // Ideal target boundary
        ctx.save();
        ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, width * 0.18, height * 0.32, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
        return;
      }

      const primaryFace = landmarksList[0];
      const box = getBoundingBox(primaryFace);

      // Adaptive Face Boundary
      if (box) {
        const bx = box.x * width;
        const by = box.y * height;
        const bw = box.width * width;
        const bh = box.height * height;

        const isGood = centered && landmarksList.length === 1 && !isDisqualified && !isPhoneDetected;
        const strokeColor = isGood ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)";
        const fillColor = isGood ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)";

        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 16);
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 16);
        ctx.stroke();

        const cLen = 16;
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = isGood ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)";

        // Corners
        ctx.beginPath();
        ctx.moveTo(bx, by + cLen);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + cLen, by);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx + bw - cLen, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + cLen);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx, by + bh - cLen);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + cLen, by + bh);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx + bw - cLen, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by + bh - cLen);
        ctx.stroke();

        // Label
        ctx.save();
        ctx.font = "bold 11px sans-serif";
        const labelText = isGood ? "✓ FACE VERIFIED & ALIGNED" : "⚠ ALIGN HEAD TO CENTER";
        const textWidth = ctx.measureText(labelText).width;
        const labelX = bx + (bw - textWidth) / 2 - 8;
        const labelY = Math.max(24, by - 10);

        ctx.fillStyle = isGood ? "rgba(6, 78, 59, 0.9)" : "rgba(127, 29, 29, 0.9)";
        ctx.beginPath();
        ctx.roundRect(labelX, labelY - 14, textWidth + 16, 20, 6);
        ctx.fill();

        ctx.fillStyle = isGood ? "#6ee7b7" : "#fca5a5";
        ctx.fillText(labelText, labelX + 8, labelY);
        ctx.restore();
      }
    },
    [isDisqualified, isPhoneDetected]
  );

  // Process Frame Loop
  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;

    if (!video || !canvas || !landmarker || video.readyState < 2 || video.videoWidth === 0) {
      animFrameRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const now = performance.now();

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const ctx = canvas.getContext("2d");

    try {
      // 1. Face detection
      const results = landmarker.detectForVideo(video, now);
      const faceLandmarks = results.faceLandmarks || [];
      const count = faceLandmarks.length;
      setFaceCount(count);

      // Log face count transitions (STEP 3)
      if (count !== lastFaceLogCountRef.current) {
        lastFaceLogCountRef.current = count;
        console.log(`[Face] Detected faces: ${count}`);
      }

      // 2. Periodic Phone Detection during pre-exam (STEP 5)
      if (now - lastPhoneCheckTimeRef.current >= 300) {
        lastPhoneCheckTimeRef.current = now;
        const phone = mediaPipeObjectDetectorManager.detectPhone(video, now);
        const hasPhone = !!phone && phone.confidence >= 0.40;
        setIsPhoneDetected(hasPhone);
      }

      if (count > 0) {
        const primary = faceLandmarks[0];
        const pose = estimateHeadPose(primary);

        const centered =
          Math.abs(pose.yaw) < 18 &&
          pose.pitch > -15 &&
          pose.pitch < 18 &&
          Math.abs(pose.roll) < 20;

        setIsFaceCentered(centered);

        if (ctx) {
          renderOverlays(ctx, canvas.width, canvas.height, faceLandmarks, centered);
        }

        const isVerified = count === 1 && centered && !isDisqualified && voicePassed && !isPhoneDetected;
        const detailedStatus: PreExamReadinessStatus = {
          cameraReady: true,
          faceCount: count,
          isFaceCentered: centered,
          isSingleFace: count === 1,
          voicePassed,
          phoneDetected: isPhoneDetected,
          isDisqualified,
          isOverallVerified: isVerified,
        };
        onVerificationStatusChange?.(isVerified, count, isDisqualified, voicePassed, isPhoneDetected, detailedStatus);
      } else {
        setIsFaceCentered(false);
        if (ctx) {
          renderOverlays(ctx, canvas.width, canvas.height, [], false);
        }
        const detailedStatus: PreExamReadinessStatus = {
          cameraReady: true,
          faceCount: 0,
          isFaceCentered: false,
          isSingleFace: false,
          voicePassed,
          phoneDetected: isPhoneDetected,
          isDisqualified,
          isOverallVerified: false,
        };
        onVerificationStatusChange?.(false, 0, isDisqualified, voicePassed, isPhoneDetected, detailedStatus);
      }
    } catch (err) {
      // Safe frame drop handler
    }

    animFrameRef.current = requestAnimationFrame(processFrame);
  }, [isDisqualified, isPhoneDetected, onVerificationStatusChange, renderOverlays, voicePassed]);

  useEffect(() => {
    if (activeStream && !isModelLoading && landmarkerRef.current) {
      animFrameRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [activeStream, isModelLoading, processFrame]);

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Video Viewport Container */}
      <div className="relative w-full aspect-video rounded-2xl bg-slate-950 overflow-hidden border border-slate-700/80 flex items-center justify-center shadow-2xl">
        {activeStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100 block"
          />
        ) : (
          <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-2 text-slate-400">
            <span className="text-3xl">👤</span>
            <span className="text-xs font-bold text-white">Starting Camera Stream...</span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transform -scale-x-100"
        />

        {/* Verification Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span
            className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-bold shadow-md transition-colors ${faceCount === 1 && isFaceCentered && !isPhoneDetected
                ? "bg-emerald-500/25 border-emerald-500/50 text-emerald-300"
                : faceCount === 0
                  ? "bg-rose-500/30 border-rose-500/50 text-rose-200 animate-pulse"
                  : "bg-amber-500/30 border-amber-500/50 text-amber-200 animate-pulse"
              }`}
          >
            {faceCount === 1
              ? isFaceCentered
                ? isPhoneDetected ? "⚠ Phone In Frame" : "✓ Candidate Face Verified"
                : "⚠ Turn to Center Face"
              : faceCount === 0
                ? "⚠ No Face Detected"
                : `⚠ Multiple Faces Detected (${faceCount})`}
          </span>
        </div>

        {/* Phone Detected Alert */}
        {isPhoneDetected && (
          <div className="absolute inset-x-3 bottom-20 z-20 p-3 rounded-xl bg-rose-950/95 border-2 border-rose-500 backdrop-blur-md text-rose-200 text-xs shadow-xl animate-bounce">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-base">📱</span>
              <span>Phone Detected! Remove the phone from the camera view immediately.</span>
            </div>
          </div>
        )}

        {/* Rule 3 Warning Alert: Multiple Faces In Frame */}
        {faceCount > 1 && (
          <div className="absolute inset-x-3 bottom-3 z-20 p-3.5 rounded-xl bg-rose-950/95 border-2 border-rose-500 backdrop-blur-md text-rose-200 text-xs shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <span className="text-base">👥</span>
                <span className="text-sm">Multiple People Detected ({faceCount} Faces)</span>
              </span>
              <span className="text-[10px] bg-rose-900 text-rose-200 px-2 py-0.5 rounded font-mono font-bold">
                Action Required
              </span>
            </div>
            <p className="text-[11px] text-rose-300 mt-1.5 leading-relaxed">
              Examination integrity requires you to be completely alone in the room. You cannot start the exam until all extra individuals leave the camera view.
            </p>
          </div>
        )}

        {/* Loading / Error States */}
        {isModelLoading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
            <div className="size-8 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            <span className="text-xs font-semibold text-slate-300">Loading MediaPipe Models...</span>
          </div>
        )}

        {modelError && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-1 z-20 p-4 text-center">
            <span className="text-2xl">⚠️</span>
            <span className="text-xs font-bold text-rose-400">{modelError}</span>
          </div>
        )}
      </div>

      {/* Voice Verification Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-end">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${voicePassed
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
              }`}
          >
            {voicePassed ? "✓ Voice Verified" : "Speech Required"}
          </span>
        </div>

        {/* Prompt To Speak */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
            Read aloud prompt sentence {activeVoicePromptIndex + 1} of {prompts.length}:
          </span>
          <p className="text-xs sm:text-sm font-semibold text-white italic">
            &ldquo;{currentPrompt.text}&rdquo;
          </p>
        </div>

        {/* Live Volume Meter */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Mic Volume: {voiceVolume}%</span>
            {isVoiceVerifying && <span>Listening ({voiceSecondsLeft}s remaining)...</span>}
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ${voiceVolume > 20 ? "bg-emerald-500" : "bg-violet-500"
                }`}
              style={{ width: `${Math.min(100, voiceVolume * 1.5)}%` }}
            />
          </div>
        </div>

        {/* Error message */}
        {voiceError && (
          <p className="text-xs font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/60 p-2 rounded-lg">
            ⚠️ {voiceError}
          </p>
        )}

        {/* Action Button */}
        {!voicePassed && (
          <button
            type="button"
            disabled={isVoiceVerifying}
            onClick={startVoiceVerification}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${isVoiceVerifying
                ? "bg-violet-600/50 text-violet-200 animate-pulse cursor-wait"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-600/20"
              }`}
          >
            {isVoiceVerifying ? "🎙️ Listening... Speak Sentence Clearly" : "🎙️ Speak & Verify Voice (5s)"}
          </button>
        )}

        {voicePassed && (
          <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <span>✓</span>
            <span>Microphone and voice verified successfully! Single speaker confirmed.</span>
          </div>
        )}
      </div>
    </div>
  );
}
