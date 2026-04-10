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
    summary: "A static Astro home for the editor, output views, examples, and compiler inspection panels.",
    description:
      "This route is ready to become the landing page for the existing browser playground once the current Vite surface is embedded into Astro instead of being rewritten.",
    status: "Interactive editor remains in `web` for now.",
    highlights: [
      "Warm shell and panel framing from the current playground",
      "Room for future docs and examples around the interactive surface",
      "A stable route for future embeds and content pages",
    ],
    nextSteps: [
      "Embed the current playground shell inside Astro.",
      "Move static explanatory copy out of the Vite app.",
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
    summary: "A future Astro home for challenge discovery, problem detail pages, and the embedded attempt runner.",
    description:
      "Codettas already have a distinct visual voice in the current site. This route preserves that direction while splitting the content into proper pages.",
    status: "Interactive attempt runner remains in `web` for now.",
    highlights: [
      "Route-level space for collections and individual exercises",
      "Static framing content can move first, interactive panels later",
      "Supports richer explanation around each exercise",
    ],
    nextSteps: [
      "Introduce list and detail page content in Astro.",
      "Embed the attempt editor and result panels once ready.",
      "Keep the challenge data model reusable between sites.",
    ],
  },
  {
    slug: "tutorial",
    title: "Tutorial",
    eyebrow: "Guided learning",
    summary: "An Astro route for structured lessons, walkthrough copy, and later tutorial workbenches.",
    description:
      "The tutorial experience benefits from Astro page organization even before the live runner moves over, so this route focuses on information architecture first.",
    status: "Interactive lesson runner remains in `web` for now.",
    highlights: [
      "Natural fit for file-based routing and lesson structure",
      "Clear separation between static lesson copy and live tooling",
      "Reusable layout shared with the rest of the site",
    ],
    nextSteps: [
      "Move lesson introductions and navigation into Astro content.",
      "Embed tutorial runners after the content shell is stable.",
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
