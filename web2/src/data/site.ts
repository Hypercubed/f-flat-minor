export interface SiteSection {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  status: string;
  highlights: string[];
  nextSteps: string[];
}

export const siteSections: SiteSection[] = [
  {
    slug: "playground",
    title: "Playground",
    eyebrow: "Browser tools",
    summary: "An Astro route for the editor, output views, examples, and compiler inspection panels.",
    description:
      "This route now mounts the existing browser playground behavior inside the Astro shell while keeping the current lit-html rendering and runtime architecture.",
    status: "Live lit-html playground mounted here; custom element extraction comes later.",
    highlights: [
      "The existing editor, examples, program runner, and detail views now run inside web2",
      "Shareable source URLs still work through query-encoded code loading",
      "The surface keeps its current runtime model while Astro owns the page shell",
    ],
    nextSteps: [
      "Factor the mounted playground into a reusable boundary that can later become a custom element.",
      "Move more surrounding explanatory copy into Astro-authored content.",
      "Keep compiler and runtime logic client-side.",
    ],
  },
  {
    slug: "repl",
    title: "REPL",
    eyebrow: "Persistent session",
    summary: "A dedicated Astro route for the long-lived browser session, stack monitor, and console guidance.",
    description:
      "This route now embeds the existing browser REPL behavior inside the Astro shell while still using the current lit-html rendering approach instead of a custom element.",
    status: "Live lit-html REPL mounted here; custom element extraction comes later.",
    highlights: [
      "A standalone route instead of a tab inside one large SPA",
      "The existing stack monitor, transcript, and inspector behavior now run inside web2",
      "Shared site chrome without forcing a LitElement rewrite yet",
    ],
    nextSteps: [
      "Factor the mounted REPL into a reusable boundary that can later become a custom element.",
      "Document preload behavior and special commands around the embedded surface.",
      "Repeat this migration pattern for the other interactive tools.",
    ],
  },
  {
    slug: "codettas",
    title: "Codettas",
    eyebrow: "Practice etudes",
    summary: "An Astro home for challenge discovery, problem detail pages, and the embedded attempt runner.",
    description:
      "Codettas now run inside the Astro shell with the existing lit-html attempt runner, bytecode details, and leaderboard comparison flow preserved.",
    status: "Live lit-html Codetta runner mounted here; custom element extraction comes later.",
    highlights: [
      "The existing challenge list and attempt workflow now live on their own route",
      "Detail navigation and output comparison stay interactive without reviving the old tab shell",
      "Supports richer explanation around each exercise",
    ],
    nextSteps: [
      "Deep-link Codetta detail state to proper Astro routes instead of query-driven screen switches.",
      "Factor the mounted runner into a reusable boundary that can later become a custom element.",
      "Keep the challenge data model reusable between sites.",
    ],
  },
  {
    slug: "tutorial",
    title: "Tutorial",
    eyebrow: "Guided learning",
    summary: "An Astro route for structured lessons, walkthrough copy, and runnable tutorial workbenches.",
    description:
      "The tutorial cards now mount inside Astro with their existing lit-html rendering, editors, and run/reset behavior preserved.",
    status: "Live lit-html tutorial runners mounted here; custom element extraction comes later.",
    highlights: [
      "The full starter problem set now runs directly inside web2",
      "Lesson framing sits under Astro while the current client-side runner stays intact",
      "Reusable layout shared with the rest of the site",
    ],
    nextSteps: [
      "Split tutorial cards into deeper Astro routes when page structure becomes worthwhile.",
      "Factor the mounted runner into a reusable boundary that can later become a custom element.",
      "Preserve direct links to individual lessons.",
    ],
  },
  {
    slug: "help",
    title: "Help",
    eyebrow: "Reference",
    summary: "A documentation route for core vocabulary, runtime notes, and guidance currently tucked inside the SPA.",
    description:
      "Help content is the easiest migration candidate because most of it is already static. This route provides the destination without pulling over the entire legacy shell.",
    status: "Reference content can migrate first.",
    highlights: [
      "File-based docs instead of injected HTML inside the app shell",
      "Shared visual language with better page-level navigation",
      "A clean place for future reference pages and guides",
    ],
    nextSteps: [
      "Move static help copy into Astro-authored pages.",
      "Split larger docs into smaller routed documents.",
      "Keep links back to the current tools while migration continues.",
    ],
  },
];

export const navItems = [
  { href: "/", label: "Overview" },
  ...siteSections.map((section) => ({
    href: `/${section.slug}/`,
    label: section.title,
  })),
];

export function getSectionBySlug(slug: string): SiteSection | undefined {
  return siteSections.find((section) => section.slug === slug);
}
