import { mountTutorial } from "./tutorial.ts";

export function mountTutorialSurface(root: HTMLElement) {
  if (root.dataset.mounted === "true") {
    return;
  }

  root.dataset.mounted = "true";
  mountTutorial(root);
}
