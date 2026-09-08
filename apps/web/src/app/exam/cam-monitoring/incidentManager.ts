import type { ViolationType, DetectorLifecycleState } from "./types";

export interface IncidentTrackerOptions {
  confirmationDurationMs: number;
  recoveryDurationMs?: number;
  isSerious?: boolean;
  cooldownDurationMs?: number;
  graceDurationMs?: number;
}

export interface IncidentTrackerCallbacks {
  onConfirmed: (type: ViolationType, durationMs: number, meta?: any) => void;
  onResolved?: (type: ViolationType, durationMs: number) => void;
  onStateChange?: (state: DetectorLifecycleState) => void;
}

export class IncidentTracker {
  private type: ViolationType;
  private options: IncidentTrackerOptions;
  private callbacks: IncidentTrackerCallbacks;

  private state: DetectorLifecycleState = "IDLE";
  private pendingStartTime: number = 0;
  private pendingDropSince: number | null = null;
  private confirmedTime: number = 0;
  private recoveryStartTime: number | null = null;
  private cooldownStartTime: number = 0;
  private pendingMeta: any = null;

  constructor(
    type: ViolationType,
    options: IncidentTrackerOptions,
    callbacks: IncidentTrackerCallbacks
  ) {
    this.type = type;
    this.options = {
      recoveryDurationMs: 1200,
      cooldownDurationMs: 2000,
      graceDurationMs: 600,
      ...options,
    };
    this.callbacks = callbacks;
  }

  public getState(): DetectorLifecycleState {
    return this.state;
  }

  private setState(newState: DetectorLifecycleState): void {
    if (this.state !== newState) {
      this.state = newState;
      this.callbacks.onStateChange?.(newState);
    }
  }

  public update(isFlagged: boolean, timestamp: number = Date.now(), meta?: any): void {
    if (isFlagged) {
      // Flagged active
      this.recoveryStartTime = null;

      if (this.state === "IDLE") {
        if (this.options.confirmationDurationMs <= 0) {
          // Instant confirmation
          this.pendingStartTime = timestamp;
          this.confirmedTime = timestamp;
          this.setState("CONFIRMED");
          this.callbacks.onConfirmed(this.type, 0, meta);
        } else {
          this.pendingStartTime = timestamp;
          this.pendingDropSince = null;
          this.pendingMeta = meta;
          this.setState("PENDING");
        }
      } else if (this.state === "PENDING") {
        // Clear any momentary frame drop within grace window
        this.pendingDropSince = null;
        if (meta !== undefined) {
          this.pendingMeta = meta;
        }

        const elapsed = timestamp - this.pendingStartTime;
        if (elapsed >= this.options.confirmationDurationMs) {
          this.confirmedTime = timestamp;
          this.setState("CONFIRMED");
          this.callbacks.onConfirmed(this.type, elapsed, meta || this.pendingMeta);
        }
      } else if (this.state === "COOLDOWN") {
        const cooldownElapsed = timestamp - this.cooldownStartTime;
        if (cooldownElapsed >= (this.options.cooldownDurationMs || 2000)) {
          // Cooldown finished, restart cycle
          this.pendingStartTime = timestamp;
          this.pendingDropSince = null;
          this.pendingMeta = meta;
          this.setState("PENDING");
        }
      }
    } else {
      // Not flagged in this frame
      if (this.state === "PENDING") {
        const graceMs = this.options.graceDurationMs ?? 600;
        if (this.pendingDropSince === null) {
          this.pendingDropSince = timestamp;
        } else if (timestamp - this.pendingDropSince >= graceMs) {
          // Sustained absence: drop pending
          this.pendingStartTime = 0;
          this.pendingDropSince = null;
          this.pendingMeta = null;
          this.setState("IDLE");
        }
      } else if (this.state === "CONFIRMED") {
        const recoveryMs = this.options.recoveryDurationMs || 1200;
        if (this.recoveryStartTime === null) {
          this.recoveryStartTime = timestamp;
        } else if (timestamp - this.recoveryStartTime >= recoveryMs) {
          const confirmedDuration = timestamp - this.confirmedTime;
          this.setState("RESOLVED");
          this.callbacks.onResolved?.(this.type, confirmedDuration);
          this.cooldownStartTime = timestamp;
          this.setState("COOLDOWN");
        }
      } else if (this.state === "COOLDOWN") {
        const cooldownElapsed = timestamp - this.cooldownStartTime;
        if (cooldownElapsed >= (this.options.cooldownDurationMs || 2000)) {
          this.setState("IDLE");
        }
      }
    }
  }

  public triggerSingleIncident(timestamp: number = Date.now(), reason?: string): void {
    this.pendingStartTime = timestamp;
    this.confirmedTime = timestamp;
    this.setState("CONFIRMED");
    this.callbacks.onConfirmed(this.type, 0, { reason });
    this.cooldownStartTime = timestamp;
    this.setState("COOLDOWN");
  }

  public resolveInstant(timestamp: number = Date.now()): void {
    if (this.state === "CONFIRMED" || this.state === "PENDING") {
      this.callbacks.onResolved?.(this.type, timestamp - (this.confirmedTime || timestamp));
    }
    this.resetToIdle();
  }

  public resetToIdle(): void {
    this.state = "IDLE";
    this.pendingStartTime = 0;
    this.pendingDropSince = null;
    this.confirmedTime = 0;
    this.recoveryStartTime = null;
    this.cooldownStartTime = 0;
    this.pendingMeta = null;
  }

  public reset(): void {
    this.resetToIdle();
  }
}
