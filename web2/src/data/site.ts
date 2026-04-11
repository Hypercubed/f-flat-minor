export interface SiteSection {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  details: string[];
}

export const siteSections: SiteSection[] = [
  {
    slug: "playground",
    title: "Playground",
    eyebrow: "Browser tools",
    summary: "An Astro route for the editor, output views, examples, and compiler inspection panels.",
    description:
      "This route now mounts the existing browser playground behavior inside the Astro shell while keeping the current lit-html rendering and runtime architecture.",
    highlights: [
      "The existing editor, examples, program runner, and detail views now run inside web2",
      "Shareable source URLs still work through query-encoded code loading",
      "The surface keeps its current runtime model while Astro owns the page shell",
    ],
    details: [
      "Editor, examples, bytecode, and diagnostics all stay available on this route.",
      "Shared source URLs continue to load directly into the mounted playground.",
      "Compiler and runtime logic remain client-side in the browser.",
    ],
  },
  {
    slug: "repl",
    title: "REPL",
    eyebrow: "Persistent session",
    summary: "A dedicated Astro route for the long-lived browser session, stack monitor, and console guidance.",
    description:
      "This route now embeds the existing browser REPL behavior inside the Astro shell while still using the current lit-html rendering approach instead of a custom element.",
    highlights: [
      "A standalone route instead of a tab inside one large SPA",
      "The existing stack monitor, transcript, and inspector behavior now run inside web2",
      "Shared site chrome without forcing a LitElement rewrite yet",
    ],
    details: [
      "The REPL keeps its stack, transcript, and inspector behavior on a dedicated route.",
      "Prelude loading and command history stay available in the browser session.",
      "Reference content can sit alongside the live tool without changing its behavior.",
    ],
  },
  {
    slug: "codettas",
    title: "Codettas",
    eyebrow: "Practice etudes",
    summary: "An Astro home for challenge discovery, problem detail pages, and the embedded attempt runner.",
    description:
      "Codettas now run inside the Astro shell with the existing lit-html attempt runner, bytecode details, and leaderboard comparison flow preserved.",
    highlights: [
      "The existing challenge list and attempt workflow now live on their own route",
      "Detail navigation and output comparison stay interactive without reviving the old tab shell",
      "Supports richer explanation around each exercise",
    ],
    details: [
      "The route includes challenge discovery, detail view, runner output, and byte count feedback.",
      "Direct links can still open a specific Codetta inside the routed shell.",
      "Submission guidance and leaderboard context remain available with the live runner.",
    ],
  },
  {
    slug: "tutorial",
    title: "Tutorial",
    eyebrow: "Guided learning",
    summary: "An Astro route for structured lessons, walkthrough copy, and runnable tutorial workbenches.",
    description:
      "The tutorial cards now mount inside Astro with their existing lit-html rendering, editors, and run/reset behavior preserved.",
    highlights: [
      "The full starter problem set now runs directly inside web2",
      "Lesson framing sits under Astro while the current client-side runner stays intact",
      "Reusable layout shared with the rest of the site",
    ],
    details: [
      "Lesson cards, runnable editors, and reset/run behavior all stay on this route.",
      "The full starter problem set remains available in one browsable tutorial page.",
      "Lesson framing and supporting copy now live in Astro-owned content.",
    ],
  },
  {
    slug: "help",
    title: "Help",
    eyebrow: "Reference",
    summary: "A documentation route for core vocabulary, runtime notes, and guidance currently tucked inside the SPA.",
    description:
      "Help content is the easiest migration candidate because most of it is already static. This route provides the destination without pulling over the entire legacy shell.",
    highlights: [
      "File-based docs instead of injected HTML inside the app shell",
      "Shared visual language with better page-level navigation",
      "A clean place for future reference pages and guides",
    ],
    details: [
      "Reference panels cover the execution model, syntax, directives, vocabulary, and examples.",
      "This page now carries Astro-owned help content rather than SPA-injected markup.",
      "It serves as the documentation companion to the interactive routes.",
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
