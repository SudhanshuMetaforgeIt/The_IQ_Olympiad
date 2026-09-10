/**
 * Centralized & Configurable Strict Proctoring Rules Configuration
 * Rules execute after start of exam & during pre-exam verification.
 * Standard escalation rule: 1st–3rd occurrences = Warning, 4th occurrence = Terminate / Disqualify.
 * Lifecycle: Detection → Temporal Confirmation → Warning → Escalation → Termination
 */

export interface ViolationRuleConfig {
  name: string;
  isSerious: boolean;
  confirmationDurationMs: number; // Continuous duration required before triggering a confirmed incident
  cooldownDurationMs: number;     // Minimum cooldown between repeated logs of the same violation type
  maxViolationsBeforeTermination: number; // 4th occurrence terminates (1st-3rd warnings, 4th terminate)
  userWarningMessage: string;
  actionRequired: string;         // Explicit student action required to rectify the warning
  terminationMessage: string;
}

export interface PreExamPrompt {
  id: number;
  text: string;
}

export interface GlobalProctoringConfig {
  // 1. FACE_MISSING
  faceMissing: ViolationRuleConfig;

  // 2. TAB_SWITCHING
  tabSwitching: ViolationRuleConfig;

  // 3. MULTIPLE_FACES
  multipleFaces: ViolationRuleConfig & {
    preExamMaxRetries: number; // 2-3 warnings allowed; 4th fails pre-exam verification
  };

  // 4. AUDIO / VOICE VERIFICATION
  audioMonitoring: ViolationRuleConfig & {
    preExamPrompts: PreExamPrompt[];
    preExamMaxRetries: number;
    volumeThreshold: number; // 0 - 100 RMS volume scale
    voiceFrequencyMinHz: number; // Human voice fundamental frequency band
    voiceFrequencyMaxHz: number;
    speechConfirmationDurationMs: number;
  };

  // 5. SCREENSHOT / VIDEO PROHIBITION
  screenshotProhibition: ViolationRuleConfig & {
    clearClipboardOnPrintScreen: boolean;
    interceptDevToolsKeys: boolean;
  };

  // 6. PHONE_DETECTED
  phoneDetected: ViolationRuleConfig & {
    confidenceThreshold: number;
    detectionIntervalMs: number; // Interval between object detector inferences
  };

  // 7. FULLSCREEN_EXIT
  fullscreenExit: ViolationRuleConfig;

  // 8. MICROPHONE_OFF (keyboard mute / track disabled / permission revoked)
  microphoneOff: ViolationRuleConfig;

  // Pre-exam camera health
  cameraHealth: {
    gracePeriodMs: number;
    maxFailuresBeforeDisqualification: number;
  };

  // Global limits
  limits: {
    maxTotalStandardWarnings: number;
    maxTotalSeriousWarnings: number;
  };

  // Head pose thresholds
  headPose: {
    yawThreshold: number;
    pitchDownThreshold: number;
    pitchUpThreshold: number;
    rollThreshold: number;
  };
}

export const DEFAULT_PROCTORING_CONFIG: GlobalProctoringConfig = {
  // Rule 1: FACE MISSING
  // Detect continuous face loss for 5–10 seconds (default: 5 seconds).
  // Brief loss does NOT count. 1st–3rd: Warning. 4th: Terminate.
  faceMissing: {
    name: "Face Missing",
    isSerious: false,
    confirmationDurationMs: 5000, // 5 seconds continuous temporal confirmation
    cooldownDurationMs: 6000,
    maxViolationsBeforeTermination: 4, // 1st-3rd: warning, 4th: terminate
    userWarningMessage: "Your face has been missing from the camera stream for over 5 seconds. Please position your face clearly in the camera view.",
    actionRequired: "Position your face directly in front of the camera and remain in clear view.",
    terminationMessage: "Exam terminated: Candidate face was missing from the camera feed 4 times.",
  },

  // Rule 2: TAB SWITCHING
  // Detect leaving exam page using visibilitychange.
  // One continuous hidden period = only 1 incident. 1st–3rd: Warning. 4th: Terminate.
  tabSwitching: {
    name: "Tab Switch Detected",
    isSerious: false,
    confirmationDurationMs: 300,
    cooldownDurationMs: 3000,
    maxViolationsBeforeTermination: 4, // 1st-3rd: warning, 4th: terminate
    userWarningMessage: "Tab switch detected. You are strictly prohibited from navigating away from the exam interface.",
    actionRequired: "Immediately return to the active exam tab. Do not navigate to other windows or applications.",
    terminationMessage: "Exam terminated: Candidate switched browser tabs or windows 4 times.",
  },

  // Rule 3: MULTIPLE FACES
  // During exam: ~1.2s continuous confirmation. Only 2 warnings, 3rd occurrence direct termination!
  multipleFaces: {
    name: "Multiple Faces Detected",
    isSerious: true,
    confirmationDurationMs: 1200, // ~1.2 seconds continuous temporal confirmation
    cooldownDurationMs: 5000,
    maxViolationsBeforeTermination: 3, // 1st & 2nd: warning, 3rd: direct termination!
    preExamMaxRetries: 4, // Pre-exam: correction attempt
    userWarningMessage: "Multiple faces detected in the camera frame. Only the registered student is permitted in the exam area.",
    actionRequired: "Ensure you are alone in the room. No other persons are allowed in your camera frame.",
    terminationMessage: "Exam terminated: Multiple individuals were repeatedly detected in the examination room.",
  },

  // Rule 4: AUDIO / VOICE VERIFICATION
  // Detects speech and multiple conversational speakers. Only 2 warnings, 3rd occurrence direct termination!
  audioMonitoring: {
    name: "Suspicious Voice / Multiple Speakers",
    isSerious: true,
    confirmationDurationMs: 1500, // 1.5s temporal confirmation
    cooldownDurationMs: 5000,
    maxViolationsBeforeTermination: 3, // 1st & 2nd: warning, 3rd: direct termination!
    preExamMaxRetries: 4,
    volumeThreshold: 8, // Sensitive threshold to pick up background voices and secondary speakers
    voiceFrequencyMinHz: 100, // Human speech & voice acoustic spectrum (100Hz - 3200Hz)
    voiceFrequencyMaxHz: 3200,
    speechConfirmationDurationMs: 1500,
    preExamPrompts: [
      {
        id: 1,
        text: "I hereby confirm that I am taking this exam independently and honestly.",
      },
      {
        id: 2,
        text: "My camera and microphone are functional and I accept the proctoring rules.",
      },
      {
        id: 3,
        text: "I will keep my eyes focused on the computer screen throughout the test.",
      },
    ],
    userWarningMessage: "Continuous human speech or multiple voices detected in the background. Please maintain complete silence.",
    actionRequired: "Maintain complete silence. Talking to others or external voices during the exam is prohibited.",
    terminationMessage: "Exam terminated: Multiple or unauthorized voices were repeatedly detected during the exam.",
  },

  // Rule 5: SCREENSHOT / VIDEO PROHIBITION
  // Detect PrintScreen, Meta+Shift+S, Ctrl+P, DevTools. Clear clipboard. 1st–3rd Warning, 4th terminate.
  screenshotProhibition: {
    name: "Screenshot / Capture Attempt",
    isSerious: false,
    confirmationDurationMs: 100,
    cooldownDurationMs: 3000,
    maxViolationsBeforeTermination: 4, // 1st-3rd: warning, 4th: terminate
    clearClipboardOnPrintScreen: true,
    interceptDevToolsKeys: true,
    userWarningMessage: "Screen capture attempt detected. Screenshots of the exam are blanked out and screen sharing is not allowed.",
    actionRequired: "Do not take screenshots or share your screen. Exam content is protected and will appear black in captures.",
    terminationMessage: "Exam terminated: Repeated unauthorized screen capture or share attempts detected.",
  },

  // Rule 6: PHONE DETECTION
  // MediaPipe Object Detection. Confidence >= 0.40 + temporal confirmation >= 800ms.
  // 1st-2nd: Warning, 3rd: DIRECT TERMINATION!
  phoneDetected: {
    name: "Mobile Phone Detected",
    isSerious: true,
    confidenceThreshold: 0.40,
    confirmationDurationMs: 800, // 800ms sustained presence ensures no false positives while catching real phone usage
    detectionIntervalMs: 200,    // Evaluate object detector every 200ms (5 FPS)
    cooldownDurationMs: 2000,    // 2.0s cooldown
    maxViolationsBeforeTermination: 3, // 1st & 2nd: warning, 3rd: DIRECT TERMINATION!
    userWarningMessage: "A mobile phone or unauthorized electronic device was detected in your camera frame. Put it away immediately.",
    actionRequired: "Remove any phone or electronic device from your desk and view immediately.",
    terminationMessage: "Exam terminated: Mobile phone repeatedly detected in the exam environment.",
  },

  // Rule 7: FULLSCREEN EXIT
  fullscreenExit: {
    name: "Fullscreen Exited",
    isSerious: false,
    confirmationDurationMs: 500,
    cooldownDurationMs: 4000,
    maxViolationsBeforeTermination: 4, // 1st-3rd: warning, 4th: terminate
    userWarningMessage: "Full screen mode exited. The examination requires strict continuous full-screen view.",
    actionRequired: "Re-enter full screen mode immediately to continue your exam.",
    terminationMessage: "Exam terminated: Candidate repeatedly exited full-screen mode.",
  },

  // Rule 8: MICROPHONE OFF
  // Keyboard mute, OS mute, track disabled, or mic permission revoked.
  // Accidental mute gets recovery time: sustained mute before 1st warning,
  // then a long grace after acknowledging before strike 2 can count.
  // 1st & 2nd: Warning, 3rd: DIRECT TERMINATION.
  microphoneOff: {
    name: "Microphone Turned Off",
    isSerious: true,
    confirmationDurationMs: 8000, // 8s continuous mute before a warning (accidental mute recovery)
    cooldownDurationMs: 25000, // 25s grace after dismiss/fix before next strike
    maxViolationsBeforeTermination: 3, // 1st & 2nd: warning, 3rd: terminate
    userWarningMessage:
      "Your microphone was turned off or muted. The exam requires an active microphone at all times for proctoring.",
    actionRequired:
      "Unmute your microphone immediately (keyboard mic key / system mute / browser permission) and keep it on for the rest of the exam.",
    terminationMessage:
      "Exam terminated: Microphone was turned off or muted repeatedly during the exam.",
  },

  cameraHealth: {
    gracePeriodMs: 12000,
    maxFailuresBeforeDisqualification: 4,
  },

  limits: {
    maxTotalStandardWarnings: 8,
    maxTotalSeriousWarnings: 4,
  },

  headPose: {
    yawThreshold: 24,
    pitchDownThreshold: -20,
    pitchUpThreshold: 22,
    rollThreshold: 25,
  },
};
