"use client";

import type { ObjectDetector, FilesetResolver as FilesetResolverType } from "@mediapipe/tasks-vision";
import type { DetectedPhone } from "./types";

const WASM_CDN_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm";
const OBJECT_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite";

class MediaPipeObjectDetectorManager {
  private static instance: MediaPipeObjectDetectorManager | null = null;
  private objectDetector: ObjectDetector | null = null;
  private isInitializing = false;
  private initPromise: Promise<ObjectDetector | null> | null = null;

  private constructor() {}

  public static getInstance(): MediaPipeObjectDetectorManager {
    if (!MediaPipeObjectDetectorManager.instance) {
      MediaPipeObjectDetectorManager.instance = new MediaPipeObjectDetectorManager();
    }
    return MediaPipeObjectDetectorManager.instance;
  }

  /**
   * Initializes the ObjectDetector task asynchronously with GPU / CPU fallback.
   */
  public async getObjectDetector(): Promise<ObjectDetector | null> {
    if (this.objectDetector) {
      return this.objectDetector;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      this.isInitializing = true;
      try {
        const visionModule = await import("@mediapipe/tasks-vision");
        const FilesetResolver = visionModule.FilesetResolver as typeof FilesetResolverType;
        const ObjectDetectorClass = visionModule.ObjectDetector;

        const fileset = await FilesetResolver.forVisionTasks(WASM_CDN_URL);

        try {
          // Attempt GPU delegate first
          this.objectDetector = await ObjectDetectorClass.createFromOptions(fileset, {
            baseOptions: {
              modelAssetPath: OBJECT_MODEL_URL,
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            scoreThreshold: 0.35,
            categoryAllowlist: ["cell phone"],
          });
          console.log("[Phone] MediaPipe ObjectDetector initialized successfully (GPU delegate, scoreThreshold: 0.35)");
        } catch (gpuErr) {
          console.warn("[Phone] GPU delegate failed for ObjectDetector, falling back to CPU delegate:", gpuErr);
          // Fallback to CPU delegate
          this.objectDetector = await ObjectDetectorClass.createFromOptions(fileset, {
            baseOptions: {
              modelAssetPath: OBJECT_MODEL_URL,
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            scoreThreshold: 0.35,
            categoryAllowlist: ["cell phone"],
          });
          console.log("[Phone] MediaPipe ObjectDetector initialized successfully (CPU fallback, scoreThreshold: 0.35)");
        }

        return this.objectDetector;
      } catch (err) {
        console.error("[Phone] MediaPipe ObjectDetector could not be initialized:", err);
        this.initPromise = null;
        return null;
      } finally {
        this.isInitializing = false;
      }
    })();

    return this.initPromise;
  }

  private lastTimestamp = 0;

  /**
   * Checks a video frame for mobile phone presence with confidence score and bounding box.
   */
  public detectPhone(video: HTMLVideoElement, timestamp: number): DetectedPhone | null {
    if (!this.objectDetector || video.readyState < 2) {
      return null;
    }

    try {
      // Ensure monotonically increasing timestamp for MediaPipe Tasks-Vision
      if (timestamp <= this.lastTimestamp) {
        timestamp = this.lastTimestamp + 1;
      }
      this.lastTimestamp = timestamp;

      const detectionsResult = this.objectDetector.detectForVideo(video, timestamp);
      const detections = detectionsResult.detections || [];

      for (const d of detections) {
        const categories = d.categories || [];
        // Match only actual mobile phones (exclude false triggers like remotes, mouse, pens)
        const phoneCategory = categories.find((c) => {
          const name = (c.categoryName || "").toLowerCase().trim();
          return name === "cell phone" || name === "mobile phone" || name === "telephone";
        });

        if (phoneCategory && phoneCategory.score >= 0.40 && d.boundingBox) {
          const vw = video.videoWidth || 640;
          const vh = video.videoHeight || 480;
          const normWidth = d.boundingBox.width / vw;
          const normHeight = d.boundingBox.height / vh;
          const area = normWidth * normHeight;

          // Reject extreme false positives (tiny specks < 0.4% or massive glitches > 70%)
          if (area < 0.004 || area > 0.70) {
            continue;
          }

          const score = Math.round(phoneCategory.score * 100) / 100;
          console.log(`[Phone] Verified cell phone detected: score=${score}, area=${Math.round(area * 100)}%`);
          return {
            confidence: score,
            box: {
              x: d.boundingBox.originX / vw,
              y: d.boundingBox.originY / vh,
              width: normWidth,
              height: normHeight,
            },
          };
        }
      }
    } catch (err) {
      // safe fallback on dropped frame
    }

    return null;
  }

  public close(): void {
    if (this.objectDetector) {
      try {
        this.objectDetector.close();
      } catch {
        // safe close
      }
      this.objectDetector = null;
    }
    this.initPromise = null;
  }
}

export const mediaPipeObjectDetectorManager = MediaPipeObjectDetectorManager.getInstance();
