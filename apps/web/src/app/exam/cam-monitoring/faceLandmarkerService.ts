"use client";

import type { FaceLandmarker, FilesetResolver as FilesetResolverType } from "@mediapipe/tasks-vision";

const WASM_CDN_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm";
const MODEL_ASSET_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

class MediaPipeVisionManager {
  private static instance: MediaPipeVisionManager | null = null;
  private faceLandmarker: FaceLandmarker | null = null;
  private isInitializing = false;
  private initPromise: Promise<FaceLandmarker> | null = null;

  private constructor() {}

  public static getInstance(): MediaPipeVisionManager {
    if (!MediaPipeVisionManager.instance) {
      MediaPipeVisionManager.instance = new MediaPipeVisionManager();
    }
    return MediaPipeVisionManager.instance;
  }

  /**
   * Initializes the FaceLandmarker task asynchronously with GPU acceleration (falling back to CPU if needed).
   */
  public async getFaceLandmarker(): Promise<FaceLandmarker> {
    if (this.faceLandmarker) {
      return this.faceLandmarker;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      this.isInitializing = true;
      try {
        // Dynamically load vision package in browser runtime
        const visionModule = await import("@mediapipe/tasks-vision");
        const FilesetResolver = visionModule.FilesetResolver as typeof FilesetResolverType;
        const FaceLandmarkerClass = visionModule.FaceLandmarker;

        const fileset = await FilesetResolver.forVisionTasks(WASM_CDN_URL);

        try {
          // Attempt GPU delegate first for optimal real-time performance
          this.faceLandmarker = await FaceLandmarkerClass.createFromOptions(fileset, {
            baseOptions: {
              modelAssetPath: MODEL_ASSET_URL,
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numFaces: 4,
            minFaceDetectionConfidence: 0.5,
            minFacePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
          });
          console.log("[Face] MediaPipe FaceLandmarker successfully initialized (GPU delegate, numFaces: 4, VIDEO mode)");
        } catch (gpuErr) {
          console.warn("[Face] GPU delegate failed, falling back to CPU delegate:", gpuErr);
          // Fallback to CPU delegate if WebGL is unavailable
          this.faceLandmarker = await FaceLandmarkerClass.createFromOptions(fileset, {
            baseOptions: {
              modelAssetPath: MODEL_ASSET_URL,
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            numFaces: 4,
            minFaceDetectionConfidence: 0.5,
            minFacePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
          });
          console.log("[Face] MediaPipe FaceLandmarker successfully initialized (CPU fallback, numFaces: 4, VIDEO mode)");
        }

        return this.faceLandmarker;
      } catch (err) {
        console.error("[Face] MediaPipe FaceLandmarker fatal init error:", err);
        this.initPromise = null;
        throw err;
      } finally {
        this.isInitializing = false;
      }
    })();

    return this.initPromise;
  }

  /**
   * Check if the vision model is already initialized and ready.
   */
  public isReady(): boolean {
    return this.faceLandmarker !== null;
  }

  /**
   * Clean up and release the landmarker instance.
   */
  public close(): void {
    if (this.faceLandmarker) {
      try {
        this.faceLandmarker.close();
      } catch {
        // Safe dispose
      }
      this.faceLandmarker = null;
    }
    this.initPromise = null;
  }
}

export const mediaPipeVisionManager = MediaPipeVisionManager.getInstance();
