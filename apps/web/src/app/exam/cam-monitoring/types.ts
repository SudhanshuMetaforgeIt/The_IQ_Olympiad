export type CoreViolationType =
  | "FACE_MISSING"
  | "TAB_SWITCHING"
  | "MULTIPLE_FACES"
  | "AUDIO_VIOLATION"
  | "SCREENSHOT_ATTEMPT"
  | "PHONE_DETECTED"
  | "CAMERA_DISCONNECTED"
  | "MICROPHONE_OFF"
  | "FULLSCREEN_EXIT";

export type AuxiliaryViolationType =
  | "LOOKING_AWAY_LEFT"
  | "LOOKING_AWAY_RIGHT"
  | "LOOKING_DOWN"
  | "LOOKING_UP"
  | "HEAD_TILT"
  | "EYES_CLOSED";

export type ViolationType = CoreViolationType | AuxiliaryViolationType;

export type IncidentCategory = "standard" | "serious" | "critical";

export type IncidentLifecycleStage =
  | "DETECTING"   // Raw frame or event flagged
  | "CONFIRMING"  // Sustained across temporal window; not yet committed
  | "VIOLATED"    // Confirmed violation, counter incremented, warning displayed
  | "TERMINATED"; // 4th confirmed incident reached, exam terminated

export type DetectorLifecycleState =
  | "IDLE"
  | "PENDING"
  | "CONFIRMED"
  | "RESOLVED"
  | "COOLDOWN";

export interface ProctoringViolationEvent {
  id: string;               // Unique eventId for audit and backend sync
  type: ViolationType;
  category: IncidentCategory;
  message: string;
  actionRequired: string;   // Clear student-facing warning explaining what action is required
  timestamp: number;
  durationMs: number;
  strikeNumber: number;     // 1, 2, 3, or 4
  maxStrikes: number;       // Always 4 (1st-3rd warning, 4th terminate)
  confidence?: number;      // e.g. 0.89 for phone detection or speech score
  snapshotUrl?: string;     // Evidence snapshot
  details?: string;         // Diagnostic context
}

export interface TerminationEvent {
  reasonType: ViolationType | "TOTAL_SERIOUS_LIMIT" | "TOTAL_STANDARD_LIMIT";
  reasonMessage: string;
  timestamp: number;
  totalViolations: number;
  totalSeriousViolations: number;
  evidenceSnapshots: string[];
  incidentHistory: ProctoringViolationEvent[];
}

export interface HeadPose {
  yaw: number;   // Horizontal rotation (deg)
  pitch: number; // Vertical tilt (deg)
  roll: number;  // Sideways tilt (deg)
}

export interface EyeGazeMetrics {
  leftEyeOpenness: number;
  rightEyeOpenness: number;
  isBlinking: boolean;
  gazeDirection: "center" | "left" | "right" | "up" | "down";
}

export interface DetectedPhone {
  confidence: number;
  box: { x: number; y: number; width: number; height: number };
}

export interface ProctoringFrameResult {
  faceCount: number;
  headPose: HeadPose;
  eyeGaze: EyeGazeMetrics;
  isCompliant: boolean;
  activeViolations: ViolationType[];
  detectedPhone: DetectedPhone | null;
  audioMetrics?: {
    currentVolume: number;
    isSpeaking: boolean;
    continuousSpeechMs: number;
  };
  landmarks: { x: number; y: number; z: number }[] | null;
  boundingBox: { x: number; y: number; width: number; height: number } | null;
  cameraTrackState: "live" | "muted" | "ended" | "unavailable";
  fps: number;
  timestamp: number;
}

export interface IncidentCounter {
  faceMissingCount: number;
  tabSwitchingCount: number;
  multipleFacesCount: number;
  audioViolationCount: number;
  screenshotAttemptCount: number;
  phoneDetectedCount: number;
  cameraDisconnectedCount: number;
  microphoneOffCount: number;
  fullscreenExitCount: number;
  totalStandardWarnings: number;
  totalSeriousWarnings: number;
  preExamVerificationFailures: number;
}

export interface ProctoringSessionStats {
  trustScore: number; // 0 - 100
  counters: IncidentCounter;
  violationsList: ProctoringViolationEvent[];
  isTerminated: boolean;
  terminationDetails: TerminationEvent | null;
  activeWarning: ProctoringViolationEvent | null;
}

export interface CameraDeviceInfo {
  deviceId: string;
  label: string;
}

