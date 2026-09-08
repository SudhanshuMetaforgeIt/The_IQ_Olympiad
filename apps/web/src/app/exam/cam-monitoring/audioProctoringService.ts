"use client";

import { DEFAULT_PROCTORING_CONFIG, type PreExamPrompt } from "./proctoringConfig";

export interface AudioAnalysisMetrics {
  currentVolume: number;        // 0 to 100
  isSpeaking: boolean;          // Voice frequency detected
  continuousSpeechDurationMs: number;
  suspiciousNoiseDetected: boolean;
}

export interface PreExamVoiceVerificationResult {
  passed: boolean;
  promptId: number;
  spokenText?: string;
  volumeLevel: number;
  attemptCount: number;
  error?: string;
}

export class AudioProctoringEngine {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphoneSource: MediaStreamAudioSourceNode | null = null;
  private audioStream: MediaStream | null = null;

  private isRunning = false;
  private speechStartTimestamp: number | null = null;
  private lastSpeechDetectedTime: number | null = null;
  private continuousSpeechMs = 0;

  // Web Speech recognition if available
  private recognition: any = null;

  constructor() {}

  /**
   * Initializes audio analysis from an active MediaStream.
   * If stream has no audio tracks, gracefully acquires dedicated microphone stream.
   */
  public async startMonitoring(stream: MediaStream): Promise<void> {
    this.stopMonitoring();
    this.audioStream = stream;

    let targetStream = stream;
    let audioTracks = targetStream.getAudioTracks();

    if (audioTracks.length === 0) {
      console.warn("[Audio] Stream contains no audio tracks. Attempting fallback getUserMedia({ audio: true })...");
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.audioStream = micStream;
          targetStream = micStream;
          audioTracks = micStream.getAudioTracks();
        }
      } catch (err) {
        console.warn("[Audio] Could not acquire fallback audio track:", err);
      }
    }

    if (audioTracks.length === 0) {
      console.warn("[Audio] Warning: No active microphone track available for audio proctoring!");
      return;
    }

    const primaryTrack = audioTracks[0];
    console.log(`[Audio] Initializing audio analysis on track: ${primaryTrack.label || "default"}, readyState: ${primaryTrack.readyState}`);

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("[Audio] Web Audio API is not supported in this browser environment.");
        return;
      }

      this.audioContext = new AudioContextClass();
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume().catch(() => {});
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.5;

      this.microphoneSource = this.audioContext.createMediaStreamSource(targetStream);
      this.microphoneSource.connect(this.analyser);

      this.isRunning = true;
      this.speechStartTimestamp = null;
      this.lastSpeechDetectedTime = null;
      this.continuousSpeechMs = 0;
      console.log("[Audio] Audio monitoring successfully running. AudioContext state:", this.audioContext.state);
    } catch (err) {
      console.error("[Audio] Audio monitoring initialization failed:", err);
    }
  }

  public async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === "suspended") {
      try {
        await this.audioContext.resume();
        console.log("[Audio] AudioContext resumed successfully by user gesture.");
      } catch (err) {
        console.warn("[Audio] Failed to resume AudioContext:", err);
      }
    }
  }

  /**
   * Samples current audio frame: calculates RMS volume and detects human vocal frequency activity.
   */
  public sampleAudio(): AudioAnalysisMetrics {
    if (!this.isRunning || !this.analyser) {
      return {
        currentVolume: 0,
        isSpeaking: false,
        continuousSpeechDurationMs: 0,
        suspiciousNoiseDetected: false,
      };
    }

    // Auto-resume AudioContext if browser suspended it in background
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume().catch(() => {});
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const timeData = new Uint8Array(bufferLength);
    const freqData = new Uint8Array(bufferLength);

    this.analyser.getByteTimeDomainData(timeData);
    this.analyser.getByteFrequencyData(freqData);

    // 1. Calculate RMS volume (0 - 100)
    let sumSquares = 0;
    for (let i = 0; i < bufferLength; i++) {
      const normalized = (timeData[i] - 128) / 128;
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / bufferLength);
    const volume = Math.min(100, Math.round(rms * 280));

    // 2. Check energy in human speech acoustic spectrum (100Hz to 3200Hz, covering formants and conversation)
    const sampleRate = this.audioContext?.sampleRate || 44100;
    const binWidth = sampleRate / this.analyser.fftSize;
    const minBin = Math.max(1, Math.floor(DEFAULT_PROCTORING_CONFIG.audioMonitoring.voiceFrequencyMinHz / binWidth));
    const maxBin = Math.min(bufferLength - 1, Math.ceil(DEFAULT_PROCTORING_CONFIG.audioMonitoring.voiceFrequencyMaxHz / binWidth));

    let voiceEnergy = 0;
    for (let b = minBin; b <= maxBin; b++) {
      voiceEnergy += freqData[b];
    }
    const avgVoiceEnergy = voiceEnergy / Math.max(1, maxBin - minBin + 1);

    // Speech detected: volume threshold or vocal energy in conversational speech range
    const isSpeaking =
      volume >= DEFAULT_PROCTORING_CONFIG.audioMonitoring.volumeThreshold && avgVoiceEnergy >= 16;

    const now = Date.now();
    if (isSpeaking) {
      if (this.speechStartTimestamp === null) {
        this.speechStartTimestamp = now;
        console.log(`[Audio] Speech activity detected (vol: ${volume}%, voiceEnergy: ${Math.round(avgVoiceEnergy)})`);
      }
      this.lastSpeechDetectedTime = now;
      this.continuousSpeechMs = now - this.speechStartTimestamp;
    } else {
      // Allow 1200ms natural conversational pause between words/sentences before resetting
      if (this.lastSpeechDetectedTime && now - this.lastSpeechDetectedTime > 1200) {
        this.speechStartTimestamp = null;
        this.continuousSpeechMs = 0;
        this.lastSpeechDetectedTime = null;
      }
    }

    // Suspicious if speech persists continuously past the confirmation threshold
    const suspiciousNoiseDetected =
      this.continuousSpeechMs >= DEFAULT_PROCTORING_CONFIG.audioMonitoring.confirmationDurationMs;

    return {
      currentVolume: volume,
      isSpeaking,
      continuousSpeechDurationMs: this.continuousSpeechMs,
      suspiciousNoiseDetected,
    };
  }

  /**
   * Pre-Exam Voice Verification: Verifies candidate can read and speak a prompt sentence.
   * Requires either transcription words OR >= 1.4s of verified speech frequency energy.
   * Silence or noise will correctly fail.
   */
  public verifyPromptSpeech(
    prompt: PreExamPrompt,
    onProgress: (volume: number, secondsRemaining: number) => void
  ): Promise<PreExamVoiceVerificationResult> {
    return new Promise((resolve) => {
      this.resumeAudioContext();
      console.log(`[Audio] Starting pre-exam voice verification for prompt #${prompt.id}: "${prompt.text}"`);

      let secondsRemaining = 5;
      let highestVolume = 0;
      let totalVoiceFrames = 0;
      let spokenWords: string[] = [];

      // Check if browser SpeechRecognition is available
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.lang = "en-US";
          this.recognition.continuous = false;
          this.recognition.interimResults = true;

          this.recognition.onresult = (e: any) => {
            for (let i = 0; i < e.results.length; i++) {
              const transcript = e.results[i]?.[0]?.transcript || "";
              if (transcript && !spokenWords.includes(transcript)) {
                spokenWords.push(transcript);
                console.log(`[Audio] Speech transcript recognized: "${transcript}"`);
              }
            }
          };

          this.recognition.onerror = (err: any) => {
            console.log("[Audio] Web Speech recognition fallback:", err?.error || "unavailable");
          };
          this.recognition.start();
        } catch (e) {
          // Fallback to voice energy
        }
      }

      const checkInterval = setInterval(() => {
        const metrics = this.sampleAudio();
        if (metrics.currentVolume > highestVolume) {
          highestVolume = metrics.currentVolume;
        }
        if (metrics.isSpeaking) {
          totalVoiceFrames += 1;
        }

        onProgress(metrics.currentVolume, secondsRemaining);
      }, 100);

      const countdown = setInterval(() => {
        secondsRemaining -= 1;
        if (secondsRemaining <= 0) {
          clearInterval(countdown);
          clearInterval(checkInterval);

          if (this.recognition) {
            try {
              this.recognition.stop();
            } catch {}
          }

          // Strict verification criteria:
          // Must have transcribed text with > 3 letters OR at least 14 voice frames (1.4s of speech energy)
          const voiceFramesRequired = 14;
          const hasTranscribedSpeech = spokenWords.length > 0 && spokenWords.join(" ").trim().length > 3;
          const hasSustainedVoiceEnergy = totalVoiceFrames >= voiceFramesRequired;

          const passed = hasTranscribedSpeech || hasSustainedVoiceEnergy;
          console.log(`[Audio] Voice verification evaluation: passed=${passed} (transcribed=${hasTranscribedSpeech}, voiceFrames=${totalVoiceFrames}/${voiceFramesRequired}, maxVol=${highestVolume}%)`);

          resolve({
            passed,
            promptId: prompt.id,
            spokenText: spokenWords.join(" ") || undefined,
            volumeLevel: highestVolume,
            attemptCount: 1,
            error: passed
              ? undefined
              : totalVoiceFrames === 0
              ? "No speech activity detected. Please unmute your microphone and read the sentence aloud."
              : "Speech was too brief or unclear. Please read the entire sentence aloud into your microphone.",
          });
        }
      }, 1000);
    });
  }

  public stopMonitoring(): void {
    this.isRunning = false;
    if (this.microphoneSource) {
      try {
        this.microphoneSource.disconnect();
      } catch {}
      this.microphoneSource = null;
    }
    if (this.analyser) {
      this.analyser = null;
    }
    if (this.audioContext && this.audioContext.state !== "closed") {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {}
      this.recognition = null;
    }
    this.audioStream = null;
  }
}

export const audioProctoringEngine = new AudioProctoringEngine();
