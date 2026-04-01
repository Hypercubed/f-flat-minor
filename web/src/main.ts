import "./style.css";

import { mountApp } from "./app.ts";
import { loadRunFeedbackPreference } from "./run-feedback.ts";

loadRunFeedbackPreference();

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root");
}

mountApp(root);
