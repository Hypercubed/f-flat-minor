export interface SiteSection {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  details: string[];
}

export interface NavItem {
  href: string;
  path: string;
  label: string;
}

const siteBasePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}

export function stripBasePath(pathname: string): string {
  if (!siteBasePath || (pathname !== siteBasePath && !pathname.startsWith(`${siteBasePath}/`))) {
    return pathname;
  }

  const stripped = pathname.slice(siteBasePath.length);
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export const interactiveSections: SiteSection[] = [
  {
    slug: "playground",
    title: "Playground",
    eyebrow: "Browser tools",
    summary: "Write, run, and inspect F-flat-minor programs in the browser.",
    description:
      "Write code, load examples, inspect expanded source and bytecode, and run programs directly in the browser.",
    highlights: [
      "Editor, examples, diagnostics, and bytecode details in one place",
      "Shareable URLs load directly into the editor",
      "Programs run entirely in the browser",
    ],
    details: [
      "Use bundled examples or bring your own source.",
      "Inspect expanded source, IR, output, and bytecode side by side.",
      "Stay in the browser from editing through execution.",
    ],
  },
  {
    slug: "repl",
    title: "REPL",
    eyebrow: "Persistent session",
    summary: "Work interactively with a long-lived browser session.",
    description:
      "Keep your stack and definitions between commands while watching the transcript, stack monitor, and inspector update in real time.",
    highlights: [
      "Persistent browser session with stack monitoring",
      "Transcript and value inspection built in",
      "Command history and preload behavior ready to use",
    ],
    details: [
      "Definitions and stack state carry across commands.",
      "Inspect values directly from the live stack.",
      "Use history and reset controls without leaving the page.",
    ],
  },
  {
    slug: "codettas",
    title: "Codettas",
    eyebrow: "Practice challenges",
    summary: "Browse F-flat-minor challenges and measure your byte count.",
    description:
      "Browse challenges, open a specific challenge, compare output, inspect bytecode, and see how your compiled size stacks up.",
    highlights: [
      "Challenge list, detail view, and runner on one route",
      "Output comparison and compiled byte count feedback",
      "Direct links open a specific challenge instantly",
    ],
    details: [
      "Review challenge descriptions, expected output, and current best scores.",
      "Run your attempt and check the result immediately.",
      "Keep the leaderboard context next to the runner.",
    ],
  },
  {
    slug: "tutorial",
    title: "Tutorial",
    eyebrow: "Guided learning",
    summary: "Learn F-flat-minor with runnable lesson cards.",
    description:
      "Work through editable lessons with expected results, embedded editors, and quick run/reset controls.",
    highlights: [
      "Starter lessons with runnable examples",
      "Expected results and guidance beside the editor",
      "Quick reset and rerun flow for each card",
    ],
    details: [
      "Move card by card without losing the surrounding lesson context.",
      "Try the provided solutions, then edit them safely.",
      "Keep the lesson notes visible while you work.",
    ],
  },
];

export const referenceSection: SiteSection = {
  slug: "reference",
  title: "Reference",
  eyebrow: "Language docs",
  summary: "Browse the reference manual, quick help, and core primitives in one docs section.",
  description:
    "Use the integrated reference section to move between the overview, quick help, and primitive reference without leaving the active site.",
  highlights: [
    "Reference landing page with curated entry points",
    "Quick help and primitive docs rendered from source Markdown",
    "Docs navigation that keeps related reference pages together",
  ],
  details: [
    "Start at the overview page, then drill into specific reference topics.",
    "Follow source-authored links between reference pages.",
    "Keep docs and interactive tools under one site navigation.",
  ],
};

export const siteSections: SiteSection[] = [...interactiveSections, referenceSection];

export const navItems: NavItem[] = [
  { href: withBasePath("/"), path: "/", label: "Overview" },
  ...siteSections.map((section) => ({
    href: withBasePath(`/${section.slug}/`),
    path: `/${section.slug}/`,
    label: section.title,
  })),
];

export function getSectionBySlug(slug: string): SiteSection | undefined {
  return siteSections.find((section) => section.slug === slug);
}
