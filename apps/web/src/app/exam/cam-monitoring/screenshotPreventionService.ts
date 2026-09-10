"use client";

import { DEFAULT_PROCTORING_CONFIG } from "./proctoringConfig";

export interface ScreenshotViolationDetail {
  actionTriggered: string;
  timestamp: number;
}

/**
 * Exam screen guard:
 * - On screenshot / snip / print shortcuts, briefly black out so captures are blank
 * - Block getDisplayMedia (in-page screen share)
 * - Does NOT black out on normal focus/blur (that was causing false black screens)
 */
export class ScreenshotPreventionManager {
  private isMonitoring = false;
  private onViolationCallback: ((detail: ScreenshotViolationDetail) => void) | null = null;
  private styleElement: HTMLStyleElement | null = null;
  private blackoutElement: HTMLDivElement | null = null;
  private blackoutHideTimer: number | null = null;
  private originalGetDisplayMedia:
    | ((constraints?: MediaStreamConstraints) => Promise<MediaStream>)
    | null = null;

  constructor() {}

  public start(onViolation: (detail: ScreenshotViolationDetail) => void): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.onViolationCallback = onViolation;

    this.injectProtectiveStyles();
    this.ensureBlackoutElement();
    this.blockDisplayMedia();

    window.addEventListener("keydown", this.handleKeyDown, true);
    window.addEventListener("keyup", this.handleKeyUp, true);
    window.addEventListener("contextmenu", this.handleContextMenu, true);
    document.documentElement.classList.add("exam-screen-guard-active");
  }

  public stop(): void {
    if (!this.isMonitoring) return;
    this.isMonitoring = false;
    this.onViolationCallback = null;

    window.removeEventListener("keydown", this.handleKeyDown, true);
    window.removeEventListener("keyup", this.handleKeyUp, true);
    window.removeEventListener("contextmenu", this.handleContextMenu, true);

    this.clearBlackoutTimer();
    this.hideBlackout();
    this.restoreDisplayMedia();
    document.documentElement.classList.remove("exam-screen-guard-active");

    if (this.styleElement?.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
    if (this.blackoutElement?.parentNode) {
      this.blackoutElement.parentNode.removeChild(this.blackoutElement);
      this.blackoutElement = null;
    }
  }

  /** Force a black frame for a short, timed duration only. */
  public flashBlackout(durationMs = 1200): void {
    this.showBlackout(durationMs);
  }

  private injectProtectiveStyles(): void {
    if (typeof document === "undefined") return;
    if (document.getElementById("proctoring-screenshot-protection")) return;

    this.styleElement = document.createElement("style");
    this.styleElement.id = "proctoring-screenshot-protection";
    this.styleElement.textContent = `
      @media print {
        html, body, body * {
          background: #000 !important;
          color: #000 !important;
          box-shadow: none !important;
          text-shadow: none !important;
          border-color: #000 !important;
        }
        body * {
          visibility: hidden !important;
        }
        body::after {
          content: "";
          position: fixed;
          inset: 0;
          background: #000 !important;
          visibility: visible !important;
          z-index: 2147483647 !important;
        }
      }

      .exam-protected-content,
      .exam-screen-guard-active body {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }

      #exam-capture-blackout {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        background: #000 !important;
        z-index: 2147483646 !important;
        pointer-events: none !important;
        opacity: 0;
        visibility: hidden;
        transition: none !important;
      }

      #exam-capture-blackout.is-active {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private ensureBlackoutElement(): void {
    if (typeof document === "undefined") return;
    const existing = document.getElementById("exam-capture-blackout");
    if (existing instanceof HTMLDivElement) {
      this.blackoutElement = existing;
      return;
    }

    this.blackoutElement = document.createElement("div");
    this.blackoutElement.id = "exam-capture-blackout";
    this.blackoutElement.setAttribute("aria-hidden", "true");
    document.body.appendChild(this.blackoutElement);
  }

  private clearBlackoutTimer(): void {
    if (this.blackoutHideTimer !== null) {
      window.clearTimeout(this.blackoutHideTimer);
      this.blackoutHideTimer = null;
    }
  }

  private showBlackout(durationMs = 1200): void {
    this.ensureBlackoutElement();
    if (!this.blackoutElement) return;

    this.clearBlackoutTimer();
    this.blackoutElement.classList.add("is-active");
    // Force a synchronous paint so PrintScreen / snip captures the black frame
    void this.blackoutElement.offsetHeight;

    this.blackoutHideTimer = window.setTimeout(() => {
      this.hideBlackout();
    }, durationMs);
  }

  private hideBlackout(): void {
    this.clearBlackoutTimer();
    this.blackoutElement?.classList.remove("is-active");
  }

  private blockDisplayMedia(): void {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getDisplayMedia) return;
    if (this.originalGetDisplayMedia) return;

    this.originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(
      navigator.mediaDevices
    );

    navigator.mediaDevices.getDisplayMedia = async () => {
      this.emitViolation("Screen Share Blocked (getDisplayMedia)");
      throw new DOMException(
        "Screen sharing is not allowed during the exam.",
        "NotAllowedError"
      );
    };
  }

  private restoreDisplayMedia(): void {
    if (!this.originalGetDisplayMedia || !navigator.mediaDevices) return;
    navigator.mediaDevices.getDisplayMedia = this.originalGetDisplayMedia;
    this.originalGetDisplayMedia = null;
  }

  private emitViolation(actionTriggered: string): void {
    this.onViolationCallback?.({
      actionTriggered,
      timestamp: Date.now(),
    });
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.isMonitoring) return;

    const key = e.key;
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    let triggerReason = "";

    // PrintScreen — blackout briefly so the capture is blank
    if (key === "PrintScreen" || e.keyCode === 44) {
      triggerReason = "PrintScreen Key";
      this.showBlackout(1500);
      this.wipeClipboard();
    }
    // Snipping / browser screenshot: Meta|Ctrl + Shift + S
    else if (isShift && (key === "S" || key === "s") && (e.metaKey || e.ctrlKey)) {
      triggerReason = e.metaKey
        ? "Snipping Tool Shortcut (Meta+Shift+S)"
        : "Browser Screenshot Shortcut (Ctrl+Shift+S)";
      // Timed only — never hold forever on focus loss
      this.showBlackout(3000);
      this.wipeClipboard();
      if (e.ctrlKey) e.preventDefault();
    }
    // macOS screenshot shortcuts
    else if (e.metaKey && isShift && ["3", "4", "5"].includes(key)) {
      triggerReason = `macOS Screenshot Shortcut (Cmd+Shift+${key})`;
      this.showBlackout(2000);
    }
    // Print
    else if (isCtrlOrMeta && (key === "P" || key === "p")) {
      e.preventDefault();
      triggerReason = "Print Command (Ctrl+P)";
      this.showBlackout(1500);
    }
    // DevTools — block, but do not black out the exam
    else if (
      key === "F12" ||
      (isCtrlOrMeta && isShift && ["I", "i", "J", "j", "C", "c"].includes(key))
    ) {
      e.preventDefault();
      triggerReason = "DevTools Inspection Key";
    }

    if (triggerReason) {
      e.stopPropagation();
      this.emitViolation(triggerReason);
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    if (!this.isMonitoring) return;
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      this.showBlackout(800);
      this.wipeClipboard();
    }
  };

  private handleContextMenu = (e: MouseEvent) => {
    if (!this.isMonitoring) return;
    e.preventDefault();
  };

  private wipeClipboard(): void {
    if (!DEFAULT_PROCTORING_CONFIG.screenshotProhibition.clearClipboardOnPrintScreen) return;
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText("").catch(() => {});
      }
    } catch {
      // ignore
    }
  }
}

export const screenshotPreventionManager = new ScreenshotPreventionManager();
