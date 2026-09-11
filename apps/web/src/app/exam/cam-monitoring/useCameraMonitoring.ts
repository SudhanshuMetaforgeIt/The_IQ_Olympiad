"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import { mediaPipeVisionManager } from "./faceLandmarkerService";
import { mediaPipeObjectDetectorManager } from "./objectDetectorService";
import { audioProctoringEngine, type AudioAnalysisMetrics } from "./audioProctoringService";
import { screenshotPreventionManager, type ScreenshotViolationDetail } from "./screenshotPreventionService";
import { IncidentTracker } from "./incidentManager";
import {
  analyzeProctoringFrame,
  getViolationDetails,
} from "./proctoringAnalysis";
import {
  DEFAULT_PROCTORING_CONFIG,
  type GlobalProctoringConfig,
} from "./proctoringConfig";
import type {
  ProctoringViolationEvent,
  ProctoringFrameResult,
  ProctoringSessionStats,
  CameraDeviceInfo,
  ViolationType,
  TerminationEvent,
  DetectedPhone,
  IncidentCounter,
} from "./types";

interface UseCameraMonitoringOptions {
  config?: GlobalProctoringConfig;
  existingStream?: MediaStream | null;
  isExamStarted?: boolean;
  enableMeshDrawing?: boolean;
  enableAudioMonitoring?: boolean;
  enableScreenshotPrevention?: boolean;
  autoStart?: boolean;
  onViolationRecorded?: (event: ProctoringViolationEvent) => void;
  onExamTerminated?: (termination: TerminationEvent) => void;
  onSyncIncidentWithBackend?: (incident: ProctoringViolationEvent) => Promise<void> | void;
}

export function useCameraMonitoring(options: UseCameraMonitoringOptions = {}) {
  const config = options.config || DEFAULT_PROCTORING_CONFIG;
  const {
    existingStream,
    isExamStarted = true,
    enableMeshDrawing = true,
    enableAudioMonitoring = true,
    enableScreenshotPrevention = true,
    autoStart = true,
    onViolationRecorded,
    onExamTerminated,
    onSyncIncidentWithBackend,
  } = options;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [activeMediaStream, setActiveMediaStream] = useState<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [isMonitoringActive, setIsMonitoringActive] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<CameraDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  const [currentFrameResult, setCurrentFrameResult] = useState<ProctoringFrameResult | null>(null);
  const [violationsList, setViolationsList] = useState<ProctoringViolationEvent[]>([]);
  const [activeWarning, setActiveWarning] = useState<ProctoringViolationEvent | null>(null);
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminationDetails, setTerminationDetails] = useState<TerminationEvent | null>(null);
  const [trustScore, setTrustScore] = useState<number>(100);

  // Separate Incident Counters
  const [counters, setCounters] = useState<IncidentCounter>({
    faceMissingCount: 0,
    tabSwitchingCount: 0,
    multipleFacesCount: 0,
    audioViolationCount: 0,
    screenshotAttemptCount: 0,
    phoneDetectedCount: 0,
    cameraDisconnectedCount: 0,
    microphoneOffCount: 0,
    fullscreenExitCount: 0,
    totalStandardWarnings: 0,
    totalSeriousWarnings: 0,
    preExamVerificationFailures: 0,
  });

  const countersRef = useRef(counters);
  countersRef.current = counters;

  const isTerminatedRef = useRef(false);
  isTerminatedRef.current = isTerminated;

  const activeWarningRef = useRef<ProctoringViolationEvent | null>(null);
  activeWarningRef.current = activeWarning;

  const [isExamStartedState, setIsExamStartedState] = useState<boolean>(isExamStarted);
  const isExamStartedRef = useRef(isExamStartedState);
  isExamStartedRef.current = isExamStartedState;

  useEffect(() => {
    setIsExamStartedState(isExamStarted);
  }, [isExamStarted]);

  // Object detector state
  const lastObjectDetectionTimeRef = useRef(0);
  const currentDetectedPhoneRef = useRef<DetectedPhone | null>(null);

  // Audio metrics
  const currentAudioMetricsRef = useRef<AudioAnalysisMetrics>({
    currentVolume: 0,
    isSpeaking: false,
    continuousSpeechDurationMs: 0,
    suspiciousNoiseDetected: false,
  });

  // FPS tracking
  const frameCountRef = useRef(0);
  const lastFpsCalcTimeRef = useRef(performance.now());
  const currentFpsRef = useRef(0);

  // Fullscreen tracking
  const hasEnteredFullscreenRef = useRef(typeof document !== "undefined" ? !!document.fullscreenElement : false);

  // Capture instant snapshot evidence
  const captureSnapshot = useCallback((): string | undefined => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return undefined;

    try {
      const snapCanvas = document.createElement("canvas");
      snapCanvas.width = 320;
      snapCanvas.height = 240;
      const ctx = snapCanvas.getContext("2d");
      if (!ctx) return undefined;
      ctx.drawImage(video, 0, 0, 320, 240);
      return snapCanvas.toDataURL("image/jpeg", 0.6);
    } catch {
      return undefined;
    }
  }, []);

  // GLOBAL TERMINATION ENGINE: Triggered strictly on the 4th confirmed incident
  const executeTermination = useCallback(
    (reasonType: ViolationType | "TOTAL_SERIOUS_LIMIT" | "TOTAL_STANDARD_LIMIT", reasonMessage: string) => {
      if (isTerminatedRef.current) return;

      isTerminatedRef.current = true;
      setIsTerminated(true);
      console.log(`[Termination] Exam termination triggered! Reason: ${reasonType} - "${reasonMessage}"`);

      // Immediately halt audio proctoring
      audioProctoringEngine.stopMonitoring();

      const latestEvidence = captureSnapshot();
      const terminationEvent: TerminationEvent = {
        reasonType,
        reasonMessage,
        timestamp: Date.now(),
        totalViolations: countersRef.current.totalStandardWarnings + countersRef.current.totalSeriousWarnings,
        totalSeriousViolations: countersRef.current.totalSeriousWarnings,
        evidenceSnapshots: latestEvidence ? [latestEvidence] : [],
        incidentHistory: violationsList,
      };

      setTerminationDetails(terminationEvent);
      onExamTerminated?.(terminationEvent);

      // Stop camera stream upon termination
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setActiveMediaStream(null);
      }
    },
    [captureSnapshot, onExamTerminated, violationsList]
  );

  // Commit Confirmed Incident: Detection → Confirmation → Warning → Escalation → Termination
  const commitViolation = useCallback(
    (type: ViolationType, durationMs: number, confidence?: number, customDetails?: string) => {
      if (isTerminatedRef.current) return;
      if (!isExamStartedRef.current) {
        console.log(`[Policy] Exam not officially started. Violation ${type} recorded internally only.`);
        return;
      }

      const details = getViolationDetails(type);
      const wallClock = Date.now();
      const snapshot = captureSnapshot();
      const eventId = `iq-violation-${type}-${wallClock}-${Math.random().toString(36).substring(2, 7)}`;

      const maxStrikes =
        type === "PHONE_DETECTED" ||
        type === "MULTIPLE_FACES" ||
        type === "AUDIO_VIOLATION" ||
        type === "MICROPHONE_OFF"
          ? 3
          : 4; // 1st & 2nd warning, 3rd direct termination
      let currentStrike = 1;

      // Update ref synchronously so strike counts and 4-strike termination checks are 100% accurate
      const updatedCounters = { ...countersRef.current };
      switch (type) {
        case "FACE_MISSING":
          updatedCounters.faceMissingCount += 1;
          updatedCounters.totalStandardWarnings += 1;
          currentStrike = updatedCounters.faceMissingCount;
          break;

        case "TAB_SWITCHING":
          updatedCounters.tabSwitchingCount += 1;
          updatedCounters.totalStandardWarnings += 1;
          currentStrike = updatedCounters.tabSwitchingCount;
          break;

        case "FULLSCREEN_EXIT":
          updatedCounters.fullscreenExitCount += 1;
          updatedCounters.totalStandardWarnings += 1;
          currentStrike = updatedCounters.fullscreenExitCount;
          break;

        case "MULTIPLE_FACES":
          updatedCounters.multipleFacesCount += 1;
          updatedCounters.totalSeriousWarnings += 1;
          currentStrike = updatedCounters.multipleFacesCount;
          break;

        case "AUDIO_VIOLATION":
          updatedCounters.audioViolationCount += 1;
          updatedCounters.totalSeriousWarnings += 1;
          currentStrike = updatedCounters.audioViolationCount;
          break;

        case "SCREENSHOT_ATTEMPT":
          updatedCounters.screenshotAttemptCount += 1;
          updatedCounters.totalStandardWarnings += 1;
          currentStrike = updatedCounters.screenshotAttemptCount;
          break;

        case "PHONE_DETECTED":
          updatedCounters.phoneDetectedCount += 1;
          updatedCounters.totalSeriousWarnings += 1;
          currentStrike = updatedCounters.phoneDetectedCount;
          break;

        case "CAMERA_DISCONNECTED":
          updatedCounters.cameraDisconnectedCount += 1;
          updatedCounters.totalSeriousWarnings += 1;
          currentStrike = updatedCounters.cameraDisconnectedCount;
          break;

        case "MICROPHONE_OFF":
          updatedCounters.microphoneOffCount += 1;
          updatedCounters.totalSeriousWarnings += 1;
          currentStrike = updatedCounters.microphoneOffCount;
          break;

        default:
          updatedCounters.totalStandardWarnings += 1;
          currentStrike = updatedCounters.totalStandardWarnings;
          break;
      }

      countersRef.current = updatedCounters;
      setCounters(updatedCounters);

      console.log(`[Policy] ${details.isSerious ? "Serious warning" : "Warning"} issued: ${type} #${currentStrike} (strike ${currentStrike}/${maxStrikes})`);

      const incidentEvent: ProctoringViolationEvent = {
        id: eventId,
        type,
        category: details.category,
        message: details.message,
        actionRequired: details.actionRequired,
        timestamp: wallClock,
        durationMs,
        strikeNumber: currentStrike,
        maxStrikes,
        confidence,
        snapshotUrl: snapshot,
        details: customDetails,
      };

      setViolationsList((prev) => [incidentEvent, ...prev].slice(0, 50));
      onViolationRecorded?.(incidentEvent);
      onSyncIncidentWithBackend?.(incidentEvent);

      // Deduct trust score
      setTrustScore((prev) => {
        const penalty = details.isSerious ? 20 : 10;
        return Math.max(0, prev - penalty);
      });

      // Termination Policy: 3rd strike terminates for phone, multiple faces, audio, mic off, or max strikes reached
      const isDirectThirdStrikeTermination =
        (type === "PHONE_DETECTED" ||
          type === "MULTIPLE_FACES" ||
          type === "AUDIO_VIOLATION" ||
          type === "MICROPHONE_OFF") &&
        currentStrike >= 3;
      const shouldTerminate =
        isDirectThirdStrikeTermination ||
        currentStrike >= maxStrikes ||
        updatedCounters.totalSeriousWarnings >= config.limits.maxTotalSeriousWarnings;

      if (shouldTerminate) {
        console.log(`[Policy] TERMINATION TRIGGERED: ${type} Strike ${currentStrike}/${maxStrikes}, Serious: ${updatedCounters.totalSeriousWarnings}. Executing immediate direct termination.`);
        setActiveWarning(null); // Ensure no warning modal is shown on termination
        let termMsg = "Exam terminated: Maximum allowed violations exceeded.";
        if (type === "PHONE_DETECTED") termMsg = config.phoneDetected.terminationMessage;
        else if (type === "MULTIPLE_FACES") termMsg = config.multipleFaces.terminationMessage;
        else if (type === "AUDIO_VIOLATION") termMsg = config.audioMonitoring.terminationMessage;
        else if (type === "MICROPHONE_OFF") termMsg = config.microphoneOff.terminationMessage;
        else if (type === "FACE_MISSING") termMsg = config.faceMissing.terminationMessage;
        else if (type === "TAB_SWITCHING") termMsg = config.tabSwitching.terminationMessage;
        else if (type === "FULLSCREEN_EXIT") termMsg = config.fullscreenExit.terminationMessage;
        else if (type === "SCREENSHOT_ATTEMPT") termMsg = config.screenshotProhibition.terminationMessage;
        else if (type === "CAMERA_DISCONNECTED") termMsg = "Exam terminated: Camera feed was disconnected.";
        else if (updatedCounters.totalSeriousWarnings >= config.limits.maxTotalSeriousWarnings) {
          termMsg = "Exam terminated: Maximum serious proctoring violation limit reached.";
        }

        executeTermination(type, termMsg);
        return; // Return immediately: do NOT show warning modal on terminating strike!
      }

      // Non-terminating strikes (strikes 1 and 2): show warning modal
      setActiveWarning(incidentEvent);
    },
    [captureSnapshot, config, executeTermination, onSyncIncidentWithBackend, onViolationRecorded]
  );

  const commitViolationRef = useRef(commitViolation);
  commitViolationRef.current = commitViolation;

  // Initialize Incident Trackers (STEP 10)
  const incidentTrackersRef = useRef<{
    faceMissing: IncidentTracker;
    multipleFaces: IncidentTracker;
    phoneDetected: IncidentTracker;
    audioViolation: IncidentTracker;
    cameraDisconnected: IncidentTracker;
    microphoneOff: IncidentTracker;
    tabSwitching: IncidentTracker;
    fullscreenExit: IncidentTracker;
  } | null>(null);

  if (!incidentTrackersRef.current) {
    incidentTrackersRef.current = {
      faceMissing: new IncidentTracker(
        "FACE_MISSING",
        { confirmationDurationMs: config.faceMissing.confirmationDurationMs, recoveryDurationMs: 1200 },
        { onConfirmed: (t, d) => commitViolationRef.current(t, d) }
      ),
      multipleFaces: new IncidentTracker(
        "MULTIPLE_FACES",
        { confirmationDurationMs: config.multipleFaces.confirmationDurationMs, recoveryDurationMs: 1200, isSerious: true },
        { onConfirmed: (t, d) => commitViolationRef.current(t, d) }
      ),
      phoneDetected: new IncidentTracker(
        "PHONE_DETECTED",
        { confirmationDurationMs: config.phoneDetected.confirmationDurationMs, recoveryDurationMs: 1200, isSerious: true },
        { onConfirmed: (t, d, m) => commitViolationRef.current(t, d, m?.confidence, "Detected in camera view") }
      ),
      audioViolation: new IncidentTracker(
        "AUDIO_VIOLATION",
        { confirmationDurationMs: config.audioMonitoring.confirmationDurationMs, recoveryDurationMs: 1200, isSerious: true },
        { onConfirmed: (t, d, m) => commitViolationRef.current(t, d, m?.volume, "Continuous voice detected") }
      ),
      cameraDisconnected: new IncidentTracker(
        "CAMERA_DISCONNECTED",
        { confirmationDurationMs: 1000, recoveryDurationMs: 800, isSerious: true },
        { onConfirmed: (t, d) => commitViolationRef.current(t, d) }
      ),
      microphoneOff: new IncidentTracker(
        "MICROPHONE_OFF",
        {
          confirmationDurationMs: config.microphoneOff.confirmationDurationMs,
          recoveryDurationMs: 600,
          cooldownDurationMs: config.microphoneOff.cooldownDurationMs,
          isSerious: true,
        },
        { onConfirmed: (t, d) => commitViolationRef.current(t, d, undefined, "Microphone muted or disabled") }
      ),
      tabSwitching: new IncidentTracker(
        "TAB_SWITCHING",
        { confirmationDurationMs: 0 },
        { onConfirmed: (t, d) => commitViolationRef.current(t, d) }
      ),
      fullscreenExit: new IncidentTracker(
        "FULLSCREEN_EXIT",
        { confirmationDurationMs: 0 },
        { onConfirmed: (t, d) => commitViolationRef.current(t, d) }
      ),
    };
  }

  // Rule 2: TAB SWITCHING (STEP 12)
  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log(`[Tab] visibilityState changed: ${document.visibilityState}`);
      if (document.hidden) {
        incidentTrackersRef.current?.tabSwitching.triggerSingleIncident(Date.now(), "Tab hidden / switch");
      } else {
        incidentTrackersRef.current?.tabSwitching.resolveInstant(Date.now());
      }
    };

    const handleWindowBlur = () => {
      console.log("[Tab] Window blur detected (user clicked outside exam)");
      incidentTrackersRef.current?.tabSwitching.triggerSingleIncident(Date.now(), "Window blurred");
    };

    const handleWindowFocus = () => {
      console.log("[Tab] Window focused");
      incidentTrackersRef.current?.tabSwitching.resolveInstant(Date.now());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  // Rule 7: FULLSCREEN MONITORING (STEP 13)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      console.log(`[Fullscreen] fullscreenchange: active=${isCurrentlyFullscreen}`);

      if (isCurrentlyFullscreen) {
        hasEnteredFullscreenRef.current = true;
        incidentTrackersRef.current?.fullscreenExit.resolveInstant(Date.now());
      } else {
        // Only trigger violation if fullscreen was previously entered and student exits
        if (hasEnteredFullscreenRef.current && isExamStartedRef.current) {
          console.log("[Fullscreen] Student exited fullscreen mode!");
          incidentTrackersRef.current?.fullscreenExit.triggerSingleIncident(Date.now(), "Exited fullscreen");
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Rule 5: SCREENSHOT / VIDEO PROHIBITION
  useEffect(() => {
    if (!enableScreenshotPrevention) return;

    screenshotPreventionManager.start((detail: ScreenshotViolationDetail) => {
      console.log(`[Screenshot] Violation intercepted: ${detail.actionTriggered}`);
      commitViolation("SCREENSHOT_ATTEMPT", 0, undefined, `Triggered by: ${detail.actionTriggered}`);
    });

    return () => {
      screenshotPreventionManager.stop();
    };
  }, [commitViolation, enableScreenshotPrevention]);

  // Evaluate Camera Health (STEP 14)
  const evaluateCameraHealth = useCallback((): "live" | "muted" | "ended" | "unavailable" => {
    const stream = streamRef.current;
    if (!stream) return "unavailable";

    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return "unavailable";

    if (videoTrack.readyState === "ended" || !videoTrack.enabled) {
      return "ended";
    }

    if (videoTrack.muted) {
      return "muted";
    }

    return "live";
  }, []);

  // Evaluate Microphone Health (keyboard mute / enabled=false / ended / missing)
  const evaluateMicrophoneHealth = useCallback((): "live" | "muted" | "ended" | "unavailable" => {
    const stream = streamRef.current;
    if (!stream) return "unavailable";

    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return "unavailable";

    if (audioTrack.readyState === "ended") {
      return "ended";
    }

    // Software mute / browser track disable
    if (!audioTrack.enabled) {
      return "ended";
    }

    // Hardware / OS / keyboard mute
    if (audioTrack.muted) {
      return "muted";
    }

    return "live";
  }, []);

  // Listen for mic mute / unmute / ended events (keyboard mute often fires these)
  useEffect(() => {
    const stream = activeMediaStream || streamRef.current;
    if (!stream || !enableAudioMonitoring) return;

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) return;

    const onMicStateChanged = () => {
      const trackers = incidentTrackersRef.current;
      if (!trackers || isTerminatedRef.current || !isExamStartedRef.current) return;
      // Give the student time to read/fix while the mic-off warning is open
      if (activeWarningRef.current?.type === "MICROPHONE_OFF") return;
      const micState = evaluateMicrophoneHealth();
      const isMicDead = micState !== "live";
      trackers.microphoneOff.update(isMicDead, Date.now());
    };

    audioTracks.forEach((track) => {
      track.addEventListener("mute", onMicStateChanged);
      track.addEventListener("unmute", onMicStateChanged);
      track.addEventListener("ended", onMicStateChanged);
    });

    // Poll enabled flag (no event fires when track.enabled is toggled)
    const pollId = window.setInterval(onMicStateChanged, 500);

    return () => {
      audioTracks.forEach((track) => {
        track.removeEventListener("mute", onMicStateChanged);
        track.removeEventListener("unmute", onMicStateChanged);
        track.removeEventListener("ended", onMicStateChanged);
      });
      window.clearInterval(pollId);
    };
  }, [activeMediaStream, enableAudioMonitoring, evaluateMicrophoneHealth]);

  // Enumerate cameras
  const refreshDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devices
        .filter((d) => d.kind === "videoinput")
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${index + 1}`,
        }));
      setAvailableDevices(videoDevs);
      if (videoDevs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevs[0].deviceId);
      }
    } catch { }
  }, [selectedDeviceId]);

  // Load Models
  useEffect(() => {
    let isCancelled = false;

    async function initModels() {
      setIsLoadingModel(true);
      setModelError(null);
      try {
        console.log("[Camera] Initializing MediaPipe vision & object models...");
        const [landmarker, detector] = await Promise.all([
          mediaPipeVisionManager.getFaceLandmarker(),
          mediaPipeObjectDetectorManager.getObjectDetector(),
        ]);

        if (!isCancelled) {
          landmarkerRef.current = landmarker;
          setIsLoadingModel(false);
          console.log("[Camera] MediaPipe models loaded successfully. Ready for inference.");
        }
      } catch (err) {
        if (!isCancelled) {
          const errMsg = err instanceof Error ? err.message : "Failed to initialize MediaPipe models";
          console.error("[Camera] MediaPipe initialization failure:", errMsg);
          setModelError(errMsg);
          setIsLoadingModel(false);
        }
      }
    }

    initModels();

    return () => {
      isCancelled = true;
    };
  }, []);

  // STEP 2: Exactly ONE Shared Webcam MediaStream
  const startCamera = useCallback(
    async (deviceId?: string) => {
      try {
        if (existingStream) {
          streamRef.current = existingStream;
          setActiveMediaStream(existingStream);

          if (videoRef.current) {
            videoRef.current.srcObject = existingStream;
            await videoRef.current.play().catch(() => { });
          }

          if (enableAudioMonitoring && existingStream.getAudioTracks().length > 0) {
            await audioProctoringEngine.startMonitoring(existingStream);
          }

          console.log(`[Camera] Attached existing shared MediaStream (video: ${existingStream.getVideoTracks().length}, audio: ${existingStream.getAudioTracks().length})`);
          setIsMonitoringActive(true);
          return;
        }

        // Clean up previous stream if any
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }

        const constraints: MediaStreamConstraints = {
          video: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
          audio: enableAudioMonitoring,
        };

        console.log("[Camera] Requesting shared getUserMedia with video & audio...");
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        setActiveMediaStream(stream);

        // Single shared stream powers Audio Engine
        if (enableAudioMonitoring && stream.getAudioTracks().length > 0) {
          await audioProctoringEngine.startMonitoring(stream);
        }

        // Single shared stream powers Video Preview
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => { });
        }

        const vTracks = stream.getVideoTracks();
        const aTracks = stream.getAudioTracks();
        console.log(`[Camera] Single shared MediaStream active. Video tracks: ${vTracks.length}, Audio tracks: ${aTracks.length}`);

        await refreshDevices();
        setIsMonitoringActive(true);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to access camera and microphone";
        console.error("[Camera] getUserMedia failed:", msg);
        setModelError(msg);
        setIsMonitoringActive(false);
      }
    },
    [enableAudioMonitoring, existingStream, refreshDevices]
  );

  // Attach existingStream if provided
  useEffect(() => {
    if (!existingStream) return;
    streamRef.current = existingStream;
    setActiveMediaStream(existingStream);
    if (videoRef.current) {
      videoRef.current.srcObject = existingStream;
      videoRef.current.play().catch(() => { });
    }
    if (enableAudioMonitoring && existingStream.getAudioTracks().length > 0) {
      audioProctoringEngine.startMonitoring(existingStream);
    }
    setIsMonitoringActive(true);
  }, [enableAudioMonitoring, existingStream]);

  const stopCamera = useCallback(() => {
    audioProctoringEngine.stopMonitoring();
    if (streamRef.current && !existingStream) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setActiveMediaStream(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    setIsMonitoringActive(false);
  }, [existingStream]);

  // Draw Overlays
  const drawOverlays = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      frameResult: ProctoringFrameResult
    ) => {
      ctx.clearRect(0, 0, width, height);

      if (!enableMeshDrawing) return;

      const { landmarks, boundingBox, isCompliant, headPose, detectedPhone } = frameResult;

      // Draw Phone Bounding Box
      if (detectedPhone) {
        const px = detectedPhone.box.x * width;
        const py = detectedPhone.box.y * height;
        const pw = detectedPhone.box.width * width;
        const ph = detectedPhone.box.height * height;

        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgb(239, 68, 68)";
        ctx.strokeRect(px, py, pw, ph);

        ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
        ctx.fillRect(px, py, pw, ph);

        ctx.fillStyle = "rgb(239, 68, 68)";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(`📱 PHONE (${Math.round(detectedPhone.confidence * 100)}%)`, px, py - 6);
      }

      // Draw Face Bounding Box
      if (boundingBox) {
        const boxX = boundingBox.x * width;
        const boxY = boundingBox.y * height;
        const boxW = boundingBox.width * width;
        const boxH = boundingBox.height * height;

        ctx.lineWidth = 2;
        ctx.strokeStyle = isCompliant ? "rgba(16, 185, 129, 0.85)" : "rgba(239, 68, 68, 0.9)";
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        const cornerLen = 14;
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = isCompliant ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)";

        ctx.beginPath();
        ctx.moveTo(boxX, boxY + cornerLen);
        ctx.lineTo(boxX, boxY);
        ctx.lineTo(boxX + cornerLen, boxY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(boxX + boxW - cornerLen, boxY);
        ctx.lineTo(boxX + boxW, boxY);
        ctx.lineTo(boxX + boxW, boxY + cornerLen);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(boxX, boxY + boxH - cornerLen);
        ctx.lineTo(boxX, boxY + boxH);
        ctx.lineTo(boxX + cornerLen, boxY + boxH);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(boxX + boxW - cornerLen, boxY + boxH);
        ctx.lineTo(boxX + boxW, boxY + boxH);
        ctx.lineTo(boxX + boxW, boxY + cornerLen);
        ctx.stroke();
      }

      // Draw Key Facial Landmarks & Ray
      if (landmarks && landmarks.length > 0) {
        ctx.fillStyle = isCompliant ? "rgba(52, 211, 153, 0.7)" : "rgba(248, 113, 113, 0.8)";
        const keyIndices = [
          1, 4, 10, 152, 33, 133, 159, 145, 263, 362, 386, 374, 61, 291, 0, 17, 468, 473,
          70, 63, 105, 66, 107, 336, 296, 334, 293, 300, 234, 454
        ];

        for (const idx of keyIndices) {
          const pt = landmarks[idx];
          if (pt) {
            ctx.beginPath();
            ctx.arc(pt.x * width, pt.y * height, 2, 0, 2 * Math.PI);
            ctx.fill();
          }
        }

        const nose = landmarks[1];
        if (nose) {
          const startX = nose.x * width;
          const startY = nose.y * height;
          const rayLen = 50;
          const endX = startX + (headPose.yaw / 45) * rayLen;
          const endY = startY - (headPose.pitch / 45) * rayLen;

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = isCompliant ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 1)";
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(endX, endY, 3.5, 0, 2 * Math.PI);
          ctx.fillStyle = isCompliant ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)";
          ctx.fill();
        }
      }
    },
    [enableMeshDrawing]
  );

  // Main Detection Loop: Detection → Temporal Confirmation → Incident
  const processFrame = useCallback(() => {
    if (isTerminatedRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;

    // Confirm that video is actively receiving live frames
    if (!video || !canvas || !landmarker || video.readyState < 2 || video.videoWidth === 0) {
      animFrameIdRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const now = performance.now();
    const wallClock = Date.now();

    frameCountRef.current += 1;
    if (now - lastFpsCalcTimeRef.current >= 1000) {
      currentFpsRef.current = frameCountRef.current;
      frameCountRef.current = 0;
      lastFpsCalcTimeRef.current = now;
    }

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const ctx = canvas.getContext("2d");

    try {
      // 1. STEP 3: MediaPipe Face Detection
      const faceResults = landmarker.detectForVideo(video, now);
      const faceLandmarks = faceResults.faceLandmarks || [];
      const faceCount = faceLandmarks.length;

      // 2. STEP 5: Periodic Phone Detection (Every 400ms)
      if (now - lastObjectDetectionTimeRef.current >= config.phoneDetected.detectionIntervalMs) {
        lastObjectDetectionTimeRef.current = now;
        currentDetectedPhoneRef.current = mediaPipeObjectDetectorManager.detectPhone(video, now);
      }

      // 3. STEP 6: Audio Sampling
      if (enableAudioMonitoring) {
        currentAudioMetricsRef.current = audioProctoringEngine.sampleAudio();
      }

      // 4. STEP 14: Hardware Health
      const cameraTrackState = evaluateCameraHealth();

      // 5. Analyze Frame
      const frameResult = analyzeProctoringFrame(
        faceLandmarks,
        currentDetectedPhoneRef.current,
        cameraTrackState,
        currentFpsRef.current,
        enableAudioMonitoring ? {
          currentVolume: currentAudioMetricsRef.current.currentVolume,
          isSpeaking: currentAudioMetricsRef.current.isSpeaking,
          continuousSpeechMs: currentAudioMetricsRef.current.continuousSpeechDurationMs,
        } : undefined
      );
      setCurrentFrameResult(frameResult);

      if (ctx) {
        drawOverlays(ctx, canvas.width, canvas.height, frameResult);
      }

      // ==============================================================
      // STEP 4, 5, 10, 14: Route through Incident Trackers (State Machine)
      // ==============================================================
      const trackers = incidentTrackersRef.current;
      if (trackers) {
        // Face Missing: faceCount === 0 for 5 seconds
        trackers.faceMissing.update(faceCount === 0, wallClock);

        // Multiple Faces: faceCount > 1 for ~1.5 seconds
        trackers.multipleFaces.update(faceCount > 1, wallClock);

        // Phone Detected: confidence >= threshold for confirmation duration
        const phone = currentDetectedPhoneRef.current;
        const hasPhone = !!phone && phone.confidence >= config.phoneDetected.confidenceThreshold;
        if (phone) {
          console.log(`[Frame Phone] detected raw confidence: ${phone.confidence} (threshold: ${config.phoneDetected.confidenceThreshold}), hasPhone: ${hasPhone}`);
        }
        trackers.phoneDetected.update(hasPhone, wallClock, phone);

        // Audio Voice: vocal speech or multiple speakers detected in room
        const hasVoice = enableAudioMonitoring && currentAudioMetricsRef.current.isSpeaking;
        trackers.audioViolation.update(hasVoice, wallClock, { volume: currentAudioMetricsRef.current.currentVolume });

        // Camera Disconnected: track ended/muted/unavailable for 1.0 second
        const isCamDead = cameraTrackState !== "live";
        trackers.cameraDisconnected.update(isCamDead, wallClock);

        // Microphone Off: keyboard/OS mute, track disabled, ended, or missing
        // Pause escalation while the mic-off warning modal is open so accidental mute can be fixed
        if (enableAudioMonitoring && activeWarningRef.current?.type !== "MICROPHONE_OFF") {
          const micState = evaluateMicrophoneHealth();
          const isMicDead = micState !== "live";
          trackers.microphoneOff.update(isMicDead, wallClock);
        }
      }

      // Trust recovery on continuous compliance
      if (frameResult.isCompliant && Math.random() < 0.003) {
        setTrustScore((prev) => Math.min(100, prev + 1));
      }
    } catch (err) {
      // Safe frame drop handler
    }

    animFrameIdRef.current = requestAnimationFrame(processFrame);
  }, [
    config.audioMonitoring.confirmationDurationMs,
    config.phoneDetected.confidenceThreshold,
    config.phoneDetected.detectionIntervalMs,
    drawOverlays,
    enableAudioMonitoring,
    evaluateCameraHealth,
    evaluateMicrophoneHealth,
  ]);

  useEffect(() => {
    if (isMonitoringActive && !isLoadingModel && landmarkerRef.current && !isTerminated) {
      animFrameIdRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [isMonitoringActive, isLoadingModel, isTerminated, processFrame]);

  useEffect(() => {
    if (existingStream) return;
    if (autoStart && !isLoadingModel && !modelError) {
      startCamera(selectedDeviceId);
    }
    return () => {
      stopCamera();
    };
  }, [autoStart, existingStream, isLoadingModel, modelError, selectedDeviceId, startCamera, stopCamera]);

  const dismissWarning = useCallback(() => {
    const warningType = activeWarningRef.current?.type;
    setActiveWarning(null);

    if (!incidentTrackersRef.current) return;

    // Mic-off: enter long cooldown so an accidental mute can be fixed before the next strike
    if (warningType === "MICROPHONE_OFF") {
      incidentTrackersRef.current.microphoneOff.forceCooldown(
        Date.now(),
        config.microphoneOff.cooldownDurationMs
      );
      Object.entries(incidentTrackersRef.current).forEach(([key, tracker]) => {
        if (key !== "microphoneOff") {
          tracker.resetToIdle();
        }
      });
      return;
    }

    // Other warnings: reset trackers so repeated violations are tracked without dead-zone delay
    Object.values(incidentTrackersRef.current).forEach((tracker) => {
      tracker.resetToIdle();
    });
  }, [config.microphoneOff.cooldownDurationMs]);

  const triggerViolation = useCallback(
    (type: ViolationType, customDetails?: string) => {
      commitViolation(type, 1000, undefined, customDetails || "Manually simulated proctoring event");
    },
    [commitViolation]
  );

  const sessionStats: ProctoringSessionStats = {
    trustScore,
    counters,
    violationsList,
    isTerminated,
    terminationDetails,
    activeWarning,
  };

  const clearViolations = useCallback(() => {
    setViolationsList([]);
    const resetCounters = {
      faceMissingCount: 0,
      tabSwitchingCount: 0,
      multipleFacesCount: 0,
      audioViolationCount: 0,
      screenshotAttemptCount: 0,
      phoneDetectedCount: 0,
      cameraDisconnectedCount: 0,
      microphoneOffCount: 0,
      fullscreenExitCount: 0,
      totalStandardWarnings: 0,
      totalSeriousWarnings: 0,
      preExamVerificationFailures: 0,
    };
    countersRef.current = resetCounters;
    setCounters(resetCounters);
    setTrustScore(100);
    setIsTerminated(false);
    isTerminatedRef.current = false;
    setTerminationDetails(null);
    setActiveWarning(null);

    // Reset trackers
    if (incidentTrackersRef.current) {
      Object.values(incidentTrackersRef.current).forEach((tr) => tr.reset());
    }
  }, []);

  return {
    videoRef,
    canvasRef,
    isLoadingModel,
    modelError,
    isMonitoringActive,
    availableDevices,
    selectedDeviceId,
    setSelectedDeviceId,
    mediaStream: activeMediaStream,
    currentFrameResult,
    violationsList,
    activeWarning,
    isTerminated,
    terminationDetails,
    sessionStats,
    counters,
    isExamStarted: isExamStartedState,
    setIsExamStarted: setIsExamStartedState,
    triggerViolation,
    startCamera,
    stopCamera,
    dismissWarning,
    clearViolations,
  };
}
