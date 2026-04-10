import { mountCodetta } from "./codetta.ts";

export function mountCodettas(root: HTMLElement) {
  if (root.dataset.mounted === "true") {
    return;
  }

  const prevButton = root.querySelector<HTMLButtonElement>("#codetta-mode-prev");
  const nextButton = root.querySelector<HTMLButtonElement>("#codetta-mode-next");
  const nav = root.querySelector<HTMLElement>("#codetta-mode-nav");

  if (!prevButton || !nextButton || !nav) {
    throw new Error("Missing Codetta navigation chrome.");
  }

  mountCodetta(root, {
    detailNavigation: {
      prevButton,
      nextButton,
      onVisibilityChange: (visible) => {
        nav.hidden = !visible;
      },
    },
  });

  root.dataset.mounted = "true";
}
