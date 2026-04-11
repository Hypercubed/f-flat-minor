export interface SiteSection {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  details: string[];
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

export const siteSections: SiteSection[] = [
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
  {
    slug: "help",
    title: "Help",
    eyebrow: "Reference",
    summary: "Reference the language model, syntax, directives, and core words.",
    description:
      "Use the reference to look up execution basics, syntax, directives, common words, and example snippets while you work.",
    highlights: [
      "Execution model, syntax, directives, and vocabulary",
      "Examples and snippets alongside the core docs",
      "One place to keep the language reference close at hand",
    ],
    details: [
      "Use it as the companion page for the interactive tools.",
      "Scan common words and examples quickly.",
      "Stay on the same site while moving between docs and tools.",
    ],
  },
];

export const navItems = [
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
