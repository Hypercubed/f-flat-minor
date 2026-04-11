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
    status: "Live playground route running inside the Astro shell.",
    highlights: [
      "The existing editor, examples, program runner, and detail views now run inside web2",
      "Shareable source URLs still work through query-encoded code loading",
      "The surface keeps its current runtime model while Astro owns the page shell",
    ],
    nextSteps: [
      "Move more surrounding explanatory copy into Astro-authored content.",
      "Keep compiler and runtime logic client-side.",
      "Continue tightening route-specific page structure as needed.",
    ],
  },
  {
    slug: "repl",
    title: "REPL",
    eyebrow: "Persistent session",
    summary: "A dedicated Astro route for the long-lived browser session, stack monitor, and console guidance.",
    description:
      "This route now embeds the existing browser REPL behavior inside the Astro shell while still using the current lit-html rendering approach instead of a custom element.",
    status: "Live REPL route running inside the Astro shell.",
    highlights: [
      "A standalone route instead of a tab inside one large SPA",
      "The existing stack monitor, transcript, and inspector behavior now run inside web2",
      "Shared site chrome without forcing a LitElement rewrite yet",
    ],
    nextSteps: [
      "Document preload behavior and special commands around the embedded surface.",
      "Add richer Astro-owned reference content around the live tool.",
      "Continue tightening route-specific page structure as needed.",
    ],
  },
  {
    slug: "codettas",
    title: "Codettas",
    eyebrow: "Practice etudes",
    summary: "An Astro home for challenge discovery, problem detail pages, and the embedded attempt runner.",
    description:
      "Codettas now run inside the Astro shell with the existing lit-html attempt runner, bytecode details, and leaderboard comparison flow preserved.",
    status: "Live Codetta route running inside the Astro shell.",
    highlights: [
      "The existing challenge list and attempt workflow now live on their own route",
      "Detail navigation and output comparison stay interactive without reviving the old tab shell",
      "Supports richer explanation around each exercise",
    ],
    nextSteps: [
      "Deep-link Codetta detail state to proper Astro routes instead of query-driven screen switches.",
      "Keep the challenge data model reusable between sites.",
      "Expand route-level content around discovery and submissions.",
    ],
  },
  {
    slug: "tutorial",
    title: "Tutorial",
    eyebrow: "Guided learning",
    summary: "An Astro route for structured lessons, walkthrough copy, and runnable tutorial workbenches.",
    description:
      "The tutorial cards now mount inside Astro with their existing lit-html rendering, editors, and run/reset behavior preserved.",
    status: "Live tutorial route running inside the Astro shell.",
    highlights: [
      "The full starter problem set now runs directly inside web2",
      "Lesson framing sits under Astro while the current client-side runner stays intact",
      "Reusable layout shared with the rest of the site",
    ],
    nextSteps: [
      "Split tutorial cards into deeper Astro routes when page structure becomes worthwhile.",
      "Preserve direct links to individual lessons.",
      "Expand lesson navigation and page-level tutorial structure.",
    ],
  },
  {
    slug: "help",
    title: "Help",
    eyebrow: "Reference",
    summary: "A documentation route for core vocabulary, runtime notes, and guidance currently tucked inside the SPA.",
    description:
      "Help content is the easiest migration candidate because most of it is already static. This route provides the destination without pulling over the entire legacy shell.",
    status: "Astro-owned reference content lives here.",
    highlights: [
      "File-based docs instead of injected HTML inside the app shell",
      "Shared visual language with better page-level navigation",
      "A clean place for future reference pages and guides",
    ],
    nextSteps: [
      "Split larger docs into smaller routed documents.",
      "Add richer cross-links between docs and the interactive tools.",
      "Continue moving site-owned reference material into Astro-authored pages.",
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
