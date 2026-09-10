import type {
  HeadPose,
  EyeGazeMetrics,
  ProctoringFrameResult,
  ViolationType,
  IncidentCategory,
  DetectedPhone,
} from "./types";
import { DEFAULT_PROCTORING_CONFIG } from "./proctoringConfig";

interface Landmark {
  x: number;
  y: number;
  z: number;
}

const LANDMARKS = {
  NOSE_TIP: 1,
  CHIN: 152,
  FOREHEAD_GLABELLA: 10,
  LEFT_EYE_OUTER: 33,
  LEFT_EYE_INNER: 133,
  LEFT_EYE_TOP: 159,
  LEFT_EYE_BOTTOM: 145,
  RIGHT_EYE_OUTER: 263,
  RIGHT_EYE_INNER: 362,
  RIGHT_EYE_TOP: 386,
  RIGHT_EYE_BOTTOM: 374,
  LEFT_EAR_TRAGION: 234,
  RIGHT_EAR_TRAGION: 454,
  LEFT_IRIS_CENTER: 468,
  RIGHT_IRIS_CENTER: 473,
};

export const THRESHOLDS = {
  YAW_LEFT: -DEFAULT_PROCTORING_CONFIG.headPose.yawThreshold,
  YAW_RIGHT: DEFAULT_PROCTORING_CONFIG.headPose.yawThreshold,
  PITCH_DOWN: DEFAULT_PROCTORING_CONFIG.headPose.pitchDownThreshold,
  PITCH_UP: DEFAULT_PROCTORING_CONFIG.headPose.pitchUpThreshold,
  ROLL_TILT: DEFAULT_PROCTORING_CONFIG.headPose.rollThreshold,
  EYE_CLOSURE_EAR: 0.12,
};

export function estimateHeadPose(landmarks: Landmark[]): HeadPose {
  if (landmarks.length < 468) {
    return { yaw: 0, pitch: 0, roll: 0 };
  }

  const nose = landmarks[LANDMARKS.NOSE_TIP];
  const leftEar = landmarks[LANDMARKS.LEFT_EAR_TRAGION];
  const rightEar = landmarks[LANDMARKS.RIGHT_EAR_TRAGION];
  const chin = landmarks[LANDMARKS.CHIN];
  const forehead = landmarks[LANDMARKS.FOREHEAD_GLABELLA];
  const leftEyeOuter = landmarks[LANDMARKS.LEFT_EYE_OUTER];
  const rightEyeOuter = landmarks[LANDMARKS.RIGHT_EYE_OUTER];

  const earDistX = rightEar.x - leftEar.x;
  const earMidX = (leftEar.x + rightEar.x) / 2;
  const yawRatio = (nose.x - earMidX) / (Math.abs(earDistX) || 0.001);
  const yaw = Math.max(-90, Math.min(90, yawRatio * 110));

  const faceHeight = Math.abs(chin.y - forehead.y) || 0.001;
  const faceMidY = (forehead.y + chin.y) / 2;
  const pitchRatio = (faceMidY - nose.y) / faceHeight;
  const pitch = Math.max(-90, Math.min(90, pitchRatio * 90));

  const deltaX = rightEyeOuter.x - leftEyeOuter.x;
  const deltaY = rightEyeOuter.y - leftEyeOuter.y;
  const roll = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

  return {
    yaw: Math.round(yaw * 10) / 10,
    pitch: Math.round(pitch * 10) / 10,
    roll: Math.round(roll * 10) / 10,
  };
}

export function estimateEyeGaze(landmarks: Landmark[], headPose: HeadPose): EyeGazeMetrics {
  if (landmarks.length < 478) {
    return {
      leftEyeOpenness: 1,
      rightEyeOpenness: 1,
      isBlinking: false,
      gazeDirection: "center",
    };
  }

  const leftTop = landmarks[LANDMARKS.LEFT_EYE_TOP];
  const leftBottom = landmarks[LANDMARKS.LEFT_EYE_BOTTOM];
  const leftInner = landmarks[LANDMARKS.LEFT_EYE_INNER];
  const leftOuter = landmarks[LANDMARKS.LEFT_EYE_OUTER];

  const leftVertical = Math.hypot(leftTop.x - leftBottom.x, leftTop.y - leftBottom.y);
  const leftHorizontal = Math.hypot(leftOuter.x - leftInner.x, leftOuter.y - leftInner.y) || 0.001;
  const leftEAR = leftVertical / leftHorizontal;

  const rightTop = landmarks[LANDMARKS.RIGHT_EYE_TOP];
  const rightBottom = landmarks[LANDMARKS.RIGHT_EYE_BOTTOM];
  const rightInner = landmarks[LANDMARKS.RIGHT_EYE_INNER];
  const rightOuter = landmarks[LANDMARKS.RIGHT_EYE_OUTER];

  const rightVertical = Math.hypot(rightTop.x - rightBottom.x, rightTop.y - rightBottom.y);
  const rightHorizontal = Math.hypot(rightOuter.x - rightInner.x, rightOuter.y - rightInner.y) || 0.001;
  const rightEAR = rightVertical / rightHorizontal;

  const isBlinking = leftEAR < THRESHOLDS.EYE_CLOSURE_EAR && rightEAR < THRESHOLDS.EYE_CLOSURE_EAR;

  let gazeDirection: "center" | "left" | "right" | "up" | "down" = "center";
  if (headPose.yaw < THRESHOLDS.YAW_LEFT) gazeDirection = "left";
  else if (headPose.yaw > THRESHOLDS.YAW_RIGHT) gazeDirection = "right";
  else if (headPose.pitch < THRESHOLDS.PITCH_DOWN) gazeDirection = "down";
  else if (headPose.pitch > THRESHOLDS.PITCH_UP) gazeDirection = "up";

  return {
    leftEyeOpenness: Math.round(leftEAR * 100) / 100,
    rightEyeOpenness: Math.round(rightEAR * 100) / 100,
    isBlinking,
    gazeDirection,
  };
}

export function getBoundingBox(landmarks: Landmark[]) {
  if (!landmarks || landmarks.length === 0) return null;

  let minX = 1;
  let maxX = 0;
  let minY = 1;
  let maxY = 0;

  for (const p of landmarks) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  const paddingX = (maxX - minX) * 0.1;
  const paddingY = (maxY - minY) * 0.1;

  return {
    x: Math.max(0, minX - paddingX),
    y: Math.max(0, minY - paddingY),
    width: Math.min(1, maxX - minX + paddingX * 2),
    height: Math.min(1, maxY - minY + paddingY * 2),
  };
}

export function analyzeProctoringFrame(
  faceLandmarksList: Landmark[][],
  detectedPhone: DetectedPhone | null,
  cameraTrackState: "live" | "muted" | "ended" | "unavailable",
  fps: number,
  audioMetrics?: { currentVolume: number; isSpeaking: boolean; continuousSpeechMs: number }
): ProctoringFrameResult {
  const timestamp = Date.now();
  const faceCount = faceLandmarksList.length;
  const activeViolations: ViolationType[] = [];

  // Hardware check
  if (cameraTrackState !== "live") {
    activeViolations.push("CAMERA_DISCONNECTED");
  }

  // Phone Detection
  if (detectedPhone && detectedPhone.confidence >= DEFAULT_PROCTORING_CONFIG.phoneDetected.confidenceThreshold) {
    activeViolations.push("PHONE_DETECTED");
  }

  // Audio / Suspicious Voice Check
  if (audioMetrics && audioMetrics.continuousSpeechMs >= DEFAULT_PROCTORING_CONFIG.audioMonitoring.confirmationDurationMs) {
    activeViolations.push("AUDIO_VIOLATION");
  }

  // Rule 1: Face Missing
  if (faceCount === 0) {
    activeViolations.push("FACE_MISSING");
    return {
      faceCount: 0,
      headPose: { yaw: 0, pitch: 0, roll: 0 },
      eyeGaze: { leftEyeOpenness: 0, rightEyeOpenness: 0, isBlinking: false, gazeDirection: "center" },
      isCompliant: false,
      activeViolations,
      detectedPhone,
      audioMetrics,
      landmarks: null,
      boundingBox: null,
      cameraTrackState,
      fps,
      timestamp,
    };
  }

  // Rule 3: Multiple Faces
  if (faceCount > 1) {
    activeViolations.push("MULTIPLE_FACES");
  }

  const primaryLandmarks = faceLandmarksList[0];
  const headPose = estimateHeadPose(primaryLandmarks);
  const eyeGaze = estimateEyeGaze(primaryLandmarks, headPose);
  const boundingBox = getBoundingBox(primaryLandmarks);

  if (headPose.yaw < THRESHOLDS.YAW_LEFT) {
    activeViolations.push("LOOKING_AWAY_LEFT");
  } else if (headPose.yaw > THRESHOLDS.YAW_RIGHT) {
    activeViolations.push("LOOKING_AWAY_RIGHT");
  }

  if (headPose.pitch < THRESHOLDS.PITCH_DOWN) {
    activeViolations.push("LOOKING_DOWN");
  } else if (headPose.pitch > THRESHOLDS.PITCH_UP) {
    activeViolations.push("LOOKING_UP");
  }

  if (Math.abs(headPose.roll) > THRESHOLDS.ROLL_TILT) {
    activeViolations.push("HEAD_TILT");
  }

  return {
    faceCount,
    headPose,
    eyeGaze,
    isCompliant: activeViolations.length === 0,
    activeViolations,
    detectedPhone,
    audioMetrics,
    landmarks: primaryLandmarks,
    boundingBox,
    cameraTrackState,
    fps,
    timestamp,
  };
}

export function getViolationDetails(type: ViolationType): {
  message: string;
  actionRequired: string;
  category: IncidentCategory;
  isSerious: boolean;
} {
  switch (type) {
    // 1. FACE MISSING
    case "FACE_MISSING":
      return {
        message: DEFAULT_PROCTORING_CONFIG.faceMissing.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.faceMissing.actionRequired,
        category: "standard",
        isSerious: false,
      };

    // 2. TAB SWITCHING
    case "TAB_SWITCHING":
      return {
        message: DEFAULT_PROCTORING_CONFIG.tabSwitching.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.tabSwitching.actionRequired,
        category: "standard",
        isSerious: false,
      };

    // 3. MULTIPLE FACES
    case "MULTIPLE_FACES":
      return {
        message: DEFAULT_PROCTORING_CONFIG.multipleFaces.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.multipleFaces.actionRequired,
        category: "serious",
        isSerious: true,
      };

    // 4. AUDIO / VOICE VERIFICATION
    case "AUDIO_VIOLATION":
      return {
        message: DEFAULT_PROCTORING_CONFIG.audioMonitoring.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.audioMonitoring.actionRequired,
        category: "serious",
        isSerious: true,
      };

    // 5. SCREENSHOT / VIDEO PROHIBITION
    case "SCREENSHOT_ATTEMPT":
      return {
        message: DEFAULT_PROCTORING_CONFIG.screenshotProhibition.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.screenshotProhibition.actionRequired,
        category: "standard",
        isSerious: false,
      };

    // 6. PHONE DETECTION
    case "PHONE_DETECTED":
      return {
        message: DEFAULT_PROCTORING_CONFIG.phoneDetected.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.phoneDetected.actionRequired,
        category: "serious",
        isSerious: true,
      };

    case "CAMERA_DISCONNECTED":
      return {
        message: "Camera disconnected or feed interrupted. Ensure your webcam remains active.",
        actionRequired: "Reconnect and allow camera access immediately to continue the exam.",
        category: "critical",
        isSerious: true,
      };

    case "MICROPHONE_OFF":
      return {
        message: DEFAULT_PROCTORING_CONFIG.microphoneOff.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.microphoneOff.actionRequired,
        category: "serious",
        isSerious: true,
      };

    case "FULLSCREEN_EXIT":
      return {
        message: DEFAULT_PROCTORING_CONFIG.fullscreenExit.userWarningMessage,
        actionRequired: DEFAULT_PROCTORING_CONFIG.fullscreenExit.actionRequired,
        category: "standard",
        isSerious: false,
      };

    case "LOOKING_AWAY_LEFT":
      return {
        message: "Candidate looking away to the left. Please keep eyes on the screen.",
        actionRequired: "Refocus your gaze towards the center of your screen.",
        category: "standard",
        isSerious: false,
      };
    case "LOOKING_AWAY_RIGHT":
      return {
        message: "Candidate looking away to the right. Please keep eyes on the screen.",
        actionRequired: "Refocus your gaze towards the center of your screen.",
        category: "standard",
        isSerious: false,
      };
    case "LOOKING_DOWN":
      return {
        message: "Candidate looking down (checking desk or notes). Please face the screen.",
        actionRequired: "Look up at your screen. Checking notes or desk materials is prohibited.",
        category: "standard",
        isSerious: false,
      };
    case "LOOKING_UP":
      return {
        message: "Candidate looking upwards away from the screen.",
        actionRequired: "Look directly forward at the exam interface.",
        category: "standard",
        isSerious: false,
      };
    case "HEAD_TILT":
      return {
        message: "Excessive head tilt detected.",
        actionRequired: "Hold your head upright in a standard exam posture.",
        category: "standard",
        isSerious: false,
      };
    case "EYES_CLOSED":
      return {
        message: "Eyes closed for an extended period.",
        actionRequired: "Keep your eyes open and attentive to the examination questions.",
        category: "standard",
        isSerious: false,
      };
  }
}
