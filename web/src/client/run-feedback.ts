const STORAGE_KEY = "ffm-run-feedback-enabled";

export const RUN_FEEDBACK = {
  enabled: true,
};

export function loadRunFeedbackPreference(): void {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "0") {
      RUN_FEEDBACK.enabled = false;
    } else if (value === "1") {
      RUN_FEEDBACK.enabled = true;
    }
  } catch {
    // Ignore private mode / storage issues.
  }
}

function persistRunFeedbackPreference(): void {
  try {
    localStorage.setItem(STORAGE_KEY, RUN_FEEDBACK.enabled ? "1" : "0");
  } catch {
    // Ignore private mode / storage issues.
  }
}

export function toggleRunFeedback(): boolean {
  RUN_FEEDBACK.enabled = !RUN_FEEDBACK.enabled;
  persistRunFeedbackPreference();
  return RUN_FEEDBACK.enabled;
}

export function syncRunFeedbackToggleButton(button: HTMLButtonElement): void {
  const enabled = RUN_FEEDBACK.enabled;
  button.setAttribute("aria-pressed", enabled ? "true" : "false");
  button.setAttribute(
    "aria-label",
    enabled ? "Run sound and animations on" : "Run sound and animations off",
  );
  button.classList.toggle("run-feedback-toggle--off", !enabled);
  button.title = enabled
    ? "Turn off run sound and animations"
    : "Turn on run sound and animations";
}
