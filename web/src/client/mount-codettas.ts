import { mountCodetta } from "./codetta.ts";

export function mountCodettas(root: HTMLElement) {
  if (root.dataset.mounted === "true") {
    return;
  }

  mountCodetta(root);
  root.dataset.mounted = "true";
}
