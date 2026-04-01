/**
 * Master switch for run feedback: F♭ chord audio and floating ♭ animations
 * (playground run, REPL, tutorial run buttons, tutorial editors).
 *
 * Default is on; `loadRunFeedbackPreference()` applies `localStorage` before mount.
 */

const STORAGE_KEY = "ffm-run-feedback-enabled";

export const RUN_FEEDBACK = {
  enabled: true,
};

export function loadRunFeedbackPreference(): void {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "0") {
      RUN_FEEDBACK.enabled = false;
    } else if (v === "1") {
      RUN_FEEDBACK.enabled = true;
    }
  } catch {
    // ignore (private mode, quota)
  }
}

function persistRunFeedbackPreference(): void {
  try {
    localStorage.setItem(STORAGE_KEY, RUN_FEEDBACK.enabled ? "1" : "0");
  } catch {
    // ignore
  }
}

/** Flips sound + animations; persists to localStorage. Returns new enabled state. */
export function toggleRunFeedback(): boolean {
  RUN_FEEDBACK.enabled = !RUN_FEEDBACK.enabled;
  persistRunFeedbackPreference();
  return RUN_FEEDBACK.enabled;
}

/** Updates toggle appearance to match `RUN_FEEDBACK.enabled`. */
export function syncRunFeedbackToggleButton(button: HTMLButtonElement): void {
  const on = RUN_FEEDBACK.enabled;
  button.setAttribute("aria-pressed", on ? "true" : "false");
  button.setAttribute(
    "aria-label",
    on ? "Run sound and animations on" : "Run sound and animations off",
  );
  button.classList.toggle("run-feedback-toggle--off", !on);
  button.title = on
    ? "Turn off run sound and animations"
    : "Turn on run sound and animations";
}
