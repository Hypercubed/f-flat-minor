export interface TutorialProblem {
  id: string;
  order: number;
  title: string;
  goal: string;
  concepts: string[];
  source: string;
  expected?: string;
  note?: string;
  stdin?: string;
}

interface TutorialFrontmatter {
  tutorial: string;
  order: number;
  title: string;
  goal: string;
  concepts: string[];
  note?: string;
  stdin?: string;
}

function parseTutorialPath(vitePath: string, filename: string): string {
  const match = /\/ff\/tutorial\/([^/]+)\//.exec(vitePath);

  if (!match) {
    throw new Error(`Unexpected tutorial path for ${filename}: ${vitePath}`);
  }

  return match[1];
}

function parseFrontmatter(readme: string): TutorialFrontmatter {
  const normalized = readme.replaceAll("\r\n", "\n");

  if (!normalized.startsWith("---\n")) {
    throw new Error("Tutorial README is missing frontmatter.");
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) {
    throw new Error("Tutorial README frontmatter is unterminated.");
  }

  const values = new Map<string, unknown>();
  for (const line of normalized.slice(4, end).split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex < 0) {
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    try {
      values.set(key, JSON.parse(rawValue));
    } catch {
      values.set(key, rawValue);
    }
  }

  const tutorial = values.get("tutorial");
  const order = values.get("order");
  const title = values.get("title");
  const goal = values.get("goal");
  const concepts = values.get("concepts");
  const note = values.get("note");
  const stdin = values.get("stdin");

  if (
    typeof tutorial !== "string" ||
    typeof order !== "number" ||
    typeof title !== "string" ||
    typeof goal !== "string" ||
    !Array.isArray(concepts) ||
    concepts.some((concept) => typeof concept !== "string") ||
    (note !== undefined && typeof note !== "string") ||
    (stdin !== undefined && typeof stdin !== "string")
  ) {
    throw new Error("Tutorial README frontmatter is missing required fields.");
  }

  return {
    tutorial,
    order,
    title,
    goal,
    concepts,
    note,
    stdin,
  };
}

const readmes = import.meta.glob("../../../ff/tutorial/*/README.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const solutions = import.meta.glob("../../../ff/tutorial/*/solution.ffp", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const expectedOutputs = import.meta.glob("../../../ff/tutorial/*/solution.out", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const solutionPathsBySlug = new Map<string, string>();

for (const vitePath of Object.keys(solutions)) {
  const slug = parseTutorialPath(vitePath, "solution.ffp");

  if (solutionPathsBySlug.has(slug)) {
    throw new Error(`Multiple tutorial solutions found for ${slug}`);
  }

  solutionPathsBySlug.set(slug, vitePath);
}

export function getTutorialSolutionFilename(slug: string): string {
  const vitePath = solutionPathsBySlug.get(slug);

  if (!vitePath) {
    throw new Error(`Missing tutorial solution for ${slug}`);
  }

  return `/tutorial/${slug}/solution.ffp`;
}

export const TUTORIAL_PROBLEMS: TutorialProblem[] = Object.entries(readmes)
  .map(([vitePath, readme]) => {
    const slug = parseTutorialPath(vitePath, "README.md");
    const solutionPath = solutionPathsBySlug.get(slug);
    const expectedPath = vitePath.replace("/README.md", "/solution.out");
    const solution = solutionPath ? solutions[solutionPath] : undefined;
    const expected = expectedOutputs[expectedPath];

    if (typeof solution !== "string") {
      throw new Error(`Missing tutorial solution for ${slug}`);
    }

    if (typeof expected !== "string") {
      throw new Error(`Missing tutorial expected output for ${slug}`);
    }

    const frontmatter = parseFrontmatter(readme);
    if (frontmatter.tutorial !== slug) {
      throw new Error(`Tutorial README slug mismatch for ${slug}: ${frontmatter.tutorial}`);
    }

    return {
      id: slug,
      order: frontmatter.order,
      title: frontmatter.title,
      goal: frontmatter.goal,
      concepts: frontmatter.concepts,
      source: solution.trimEnd(),
      expected: expected.trimEnd(),
      note: frontmatter.note,
      stdin: frontmatter.stdin,
    } satisfies TutorialProblem;
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
