import type { EditorView } from "@codemirror/view";

import { RUN_FEEDBACK } from "./run-feedback.ts";

/**
 * Feedback when the user runs a program: floating ♭ symbols rise from the run button
 * for the whole run; the F♭ minor chord plays when execution finishes.
 *
 * REPL: one ♭ per qualifying keypress from the caret; chord only on Enter.
 *
 * Tutorial editors (CodeMirror): one ♭ from the caret on qualifying keys (no chord).
 */

let sharedAudio: AudioContext | null = null;

function getAudioContext(): AudioContext {
  sharedAudio ??= new AudioContext();
  return sharedAudio;
}

/** Equal-temperament frequencies for F♭ minor triad (enharmonic to E minor). */
const FB_MINOR_HZ = [329.6275569128699, 391.99543598174927, 493.8833013781249] as const;

const FLAT_COUNT = 10;

/** How often new ♭ particles spawn while a program run is in progress. */
const RUN_PROGRAM_FEEDBACK_TICK_MS = 420;

/** Particles per tick during a run (continuous stream; smaller bursts than a one-shot burst). */
const RUN_PROGRAM_FEEDBACK_PARTICLES_PER_TICK = 3;

let runProgramFeedbackInterval: ReturnType<typeof setInterval> | null = null;
let runProgramFeedbackButton: HTMLButtonElement | null = null;
let runProgramFeedbackSessionActive = false;

function stopRunProgramFeedbackInterval(): void {
  if (runProgramFeedbackInterval !== null) {
    clearInterval(runProgramFeedbackInterval);
    runProgramFeedbackInterval = null;
  }
  runProgramFeedbackButton = null;
}

/**
 * Starts floating ♭ feedback from the run button for an in-flight program run.
 * Call {@link stopRunProgramRunFeedback} when the run completes (success, error, or cancel).
 */
export function startRunProgramRunFeedback(button: HTMLButtonElement): void {
  stopRunProgramFeedbackInterval();
  if (!RUN_FEEDBACK.enabled) {
    return;
  }
  runProgramFeedbackSessionActive = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  runProgramFeedbackButton = button;

  const tick = (): void => {
    if (!RUN_FEEDBACK.enabled) {
      stopRunProgramFeedbackInterval();
      return;
    }
    if (runProgramFeedbackButton) {
      spawnFloatingFlatsFromButton(runProgramFeedbackButton, RUN_PROGRAM_FEEDBACK_PARTICLES_PER_TICK);
    }
  };
  tick();
  runProgramFeedbackInterval = setInterval(tick, RUN_PROGRAM_FEEDBACK_TICK_MS);
}

/** Ends run feedback: stops ♭ animation and plays the completion chord (if feedback is on). */
export function stopRunProgramRunFeedback(): void {
  const hadSession = runProgramFeedbackSessionActive;
  runProgramFeedbackSessionActive = false;
  stopRunProgramFeedbackInterval();
  if (hadSession) {
    playFlatMinorChord();
  }
}

export function playFlatMinorChord(): void {
  if (!RUN_FEEDBACK.enabled) {
    return;
  }
  try {
    const ctx = getAudioContext();
    void ctx.resume().then(() => {
      const t0 = ctx.currentTime;
      const duration = 0.42;
      const peak = 0.09;

      for (let i = 0; i < FB_MINOR_HZ.length; i++) {
        const freq = FB_MINOR_HZ[i];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t0);

        gain.gain.setValueAtTime(0, t0);
        gain.gain.linearRampToValueAtTime(peak, t0 + 0.018 + i * 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0008, t0 + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + duration + 0.06);
      }
    });
  } catch {
    // No audio device or AudioContext unsupported
  }
}

/** True when the key should trigger REPL ♭ animation (not history / shortcuts). */
export function shouldTriggerReplKeyFeedback(event: KeyboardEvent): boolean {
  if (event.isComposing) {
    return false;
  }
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  if (event.key === "Tab" || event.key === "Escape") {
    return false;
  }
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    return false;
  }
  if (event.repeat) {
    return false;
  }
  return true;
}

/**
 * REPL feedback: one ♭ from the caret on each qualifying key; F♭m chord only on Enter.
 * Reduced motion skips the ♭ only.
 */
export function triggerReplKeyFeedback(input: HTMLInputElement, event: KeyboardEvent): void {
  if (!RUN_FEEDBACK.enabled || input.disabled || !shouldTriggerReplKeyFeedback(event)) {
    return;
  }
  const { x, y } = getCaretClientPosition(input);
  spawnOneFloatingFlat(x, y, { centerOnPoint: true });
  if (event.key === "Enter") {
    playFlatMinorChord();
  }
}

/** One ♭ from the CodeMirror caret (tutorial source editors); no sound. */
export function triggerEditorKeyFlatFeedback(view: EditorView, event: KeyboardEvent): void {
  if (!RUN_FEEDBACK.enabled || !shouldTriggerReplKeyFeedback(event)) {
    return;
  }
  const pos = view.state.selection.main.head;
  const coords = view.coordsAtPos(pos);
  if (!coords) {
    return;
  }
  const x = coords.left;
  const y = (coords.top + coords.bottom) / 2;
  spawnOneFloatingFlat(x, y, { centerOnPoint: true });
}

function getCaretClientPosition(input: HTMLInputElement): { x: number; y: number } {
  const rect = input.getBoundingClientRect();
  const style = window.getComputedStyle(input);
  const borderLeft = parseFloat(style.borderLeftWidth) || 0;
  const padLeft = parseFloat(style.paddingLeft) || 0;
  const caretIndex = input.selectionStart ?? 0;

  const mirror = document.createElement("span");
  mirror.setAttribute("aria-hidden", "true");
  mirror.style.visibility = "hidden";
  mirror.style.position = "absolute";
  mirror.style.whiteSpace = "pre";
  mirror.style.top = "0";
  mirror.style.left = "0";
  mirror.style.font = style.font;
  mirror.style.fontSize = style.fontSize;
  mirror.style.fontFamily = style.fontFamily;
  mirror.style.fontWeight = style.fontWeight;
  mirror.style.letterSpacing = style.letterSpacing;
  mirror.style.fontVariant = style.fontVariant;
  mirror.style.textTransform = style.textTransform;

  mirror.textContent = input.value.slice(0, caretIndex);
  document.body.appendChild(mirror);
  const textWidth = mirror.offsetWidth;
  mirror.remove();

  const x = rect.left + borderLeft + padLeft + textWidth - input.scrollLeft;
  const y = rect.top + rect.height / 2;
  return { x, y };
}

type SpawnFlatOptions = {
  animationDelay?: string;
  /** Center the ♭ glyph on (x, y); default is top-left at (x, y) for run-button bursts */
  centerOnPoint?: boolean;
};

function spawnOneFloatingFlat(x: number, y: number, options?: SpawnFlatOptions): void {
  if (!RUN_FEEDBACK.enabled) {
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const anchor = document.createElement("span");
  anchor.className = "run-flat-anchor";
  anchor.style.left = `${x}px`;
  anchor.style.top = `${y}px`;
  if (options?.centerOnPoint) {
    anchor.style.transform = "translate(-50%, -50%)";
  }

  const el = document.createElement("span");
  el.className = "run-flat-particle";
  el.setAttribute("aria-hidden", "true");
  el.textContent = "♭";

  if (options?.animationDelay) {
    el.style.animationDelay = options.animationDelay;
  }

  const driftRem = (Math.random() - 0.5) * 2.25;
  const rot0 = -6 + Math.random() * 12;
  const rot1 = rot0 + 8 + Math.random() * 10;
  el.style.setProperty("--drift-x", `${driftRem}rem`);
  el.style.setProperty("--rot-0", `${rot0}deg`);
  el.style.setProperty("--rot-1", `${rot1}deg`);

  anchor.appendChild(el);
  document.body.appendChild(anchor);
  el.addEventListener(
    "animationend",
    () => {
      anchor.remove();
    },
    { once: true },
  );
}

function spawnFloatingFlatsFromButton(button: HTMLButtonElement, particleCount: number = FLAT_COUNT): void {
  if (!RUN_FEEDBACK.enabled) {
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const rect = button.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return;
  }

  for (let i = 0; i < particleCount; i++) {
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + rect.height * (0.35 + Math.random() * 0.35);
    spawnOneFloatingFlat(x, y, { animationDelay: `${i * 0.045}s` });
  }
}
