"use client";

import { DEFAULT_PROCTORING_CONFIG } from "./proctoringConfig";

export interface ScreenshotViolationDetail {
  actionTriggered: string;
  timestamp: number;
}

export class ScreenshotPreventionManager {
  private isMonitoring = false;
  private onViolationCallback: ((detail: ScreenshotViolationDetail) => void) | null = null;
  private styleElement: HTMLStyleElement | null = null;

  constructor() {}

  /**
   * Starts monitoring browser-level keyboard and visibility events associated with screenshots.
   */
  public start(onViolation: (detail: ScreenshotViolationDetail) => void): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.onViolationCallback = onViolation;

    // 1. Inject anti-print and anti-selection styles
    this.injectProtectiveStyles();

    // 2. Attach keyboard event listener
    window.addEventListener("keydown", this.handleKeyDown, true);
    window.addEventListener("keyup", this.handleKeyUp, true);

    // 3. Prevent right-click context menu (often used to inspect or save images)
    window.addEventListener("contextmenu", this.handleContextMenu, true);
  }

  public stop(): void {
    if (!this.isMonitoring) return;
    this.isMonitoring = false;
    this.onViolationCallback = null;

    window.removeEventListener("keydown", this.handleKeyDown, true);
    window.removeEventListener("keyup", this.handleKeyUp, true);
    window.removeEventListener("contextmenu", this.handleContextMenu, true);

    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  private injectProtectiveStyles(): void {
    if (typeof document === "undefined") return;

    this.styleElement = document.createElement("style");
    this.styleElement.id = "proctoring-screenshot-protection";
    this.styleElement.innerHTML = `
      @media print {
        body {
          display: none !important;
          visibility: hidden !important;
        }
      }
      .exam-protected-content {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (!this.isMonitoring) return;

    const key = e.key;
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    let triggerReason = "";

    // 1. PrintScreen key (standard & combinations)
    if (key === "PrintScreen" || e.keyCode === 44) {
      triggerReason = "PrintScreen Key";
      this.wipeClipboard();
    }
    // 2. Windows Snipping Tool: Meta + Shift + S
    else if (e.metaKey && isShift && (key === "S" || key === "s")) {
      triggerReason = "Snipping Tool Shortcut (Meta+Shift+S)";
      this.wipeClipboard();
    }
    // 3. Firefox/Browser Screenshot: Ctrl + Shift + S
    else if (e.ctrlKey && isShift && (key === "S" || key === "s")) {
      triggerReason = "Browser Screenshot Shortcut (Ctrl+Shift+S)";
      this.wipeClipboard();
    }
    // 4. Print command: Ctrl + P / Meta + P
    else if (isCtrlOrMeta && (key === "P" || key === "p")) {
      e.preventDefault();
      triggerReason = "Print Command (Ctrl+P)";
    }
    // 5. Developer Tools inspect: F12 or Ctrl+Shift+I / J / C
    else if (
      key === "F12" ||
      (isCtrlOrMeta && isShift && ["I", "i", "J", "j", "C", "c"].includes(key))
    ) {
      e.preventDefault();
      triggerReason = "DevTools Inspection Key";
    }

    if (triggerReason) {
      e.stopPropagation();
      this.onViolationCallback?.({
        actionTriggered: triggerReason,
        timestamp: Date.now(),
      });
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    if (!this.isMonitoring) return;
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      this.wipeClipboard();
    }
  };

  private handleContextMenu = (e: MouseEvent) => {
    if (!this.isMonitoring) return;
    // Allow right-click only if not on an exam element
    e.preventDefault();
  };

  /**
   * Clears the system clipboard to prevent pasting captured exam questions.
   */
  private wipeClipboard(): void {
    if (!DEFAULT_PROCTORING_CONFIG.screenshotProhibition.clearClipboardOnPrintScreen) return;
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText("").catch(() => {});
      }
    } catch {}
  }
}

export const screenshotPreventionManager = new ScreenshotPreventionManager();
