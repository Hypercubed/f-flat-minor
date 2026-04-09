interface CodettaEntry {
  id: string;
  title: string;
  leader: string;
  bytes: number;
  date: string;
  description: string;
  expected: string;
  solution: string;
}

const CODETTA_SOURCE_ROOT = "../../ff/codetta";
const HIDDEN_CODETTA_IDS = new Set([
  "catalans-constant",
  // "ln-2"
]);

interface CodettaFrontmatter {
  etude: string;
  title: string;
  leader: string;
  bytes: number;
  date: string;
}

function parseCodettaPath(vitePath: string, filename: string): string {
  const match = /^\.\.\/\.\.\/ff\/codetta\/([^/]+)\//.exec(vitePath);

  if (!match) {
    throw new Error(`Unexpected Codetta path for ${filename}: ${vitePath}`);
  }

  return match[1];
}

function parseFrontmatter(readme: string): { frontmatter: CodettaFrontmatter; body: string } {
  const normalized = readme.replaceAll("\r\n", "\n");

  if (!normalized.startsWith("---\n")) {
    throw new Error("Codetta README is missing frontmatter.");
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) {
    throw new Error("Codetta README frontmatter is unterminated.");
  }

  const frontmatterLines = normalized.slice(4, end).split("\n");
  const body = normalized.slice(end + "\n---\n".length).trim();
  const values = new Map<string, string>();

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex < 0) {
      continue;
    }
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    const value = rawValue.startsWith('"') && rawValue.endsWith('"') ? rawValue.slice(1, -1) : rawValue;
    values.set(key, value);
  }

  const etude = values.get("etude");
  const title = values.get("title");
  const leader = values.get("leader");
  const bytesText = values.get("bytes");
  const date = values.get("date");

  if (!etude || !title || !leader || !bytesText || !date) {
    throw new Error("Codetta README frontmatter is missing required fields.");
  }

  const bytes = Number(bytesText);
  if (!Number.isFinite(bytes)) {
    throw new Error(`Invalid Codetta byte count: ${bytesText}`);
  }

  return {
    frontmatter: { etude, title, leader, bytes, date },
    body,
  };
}

const readmes = import.meta.glob("../../ff/codetta/*/README.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const solutions = import.meta.glob("../../ff/codetta/*/solution.{ff,ffp}", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const expectedOutputs = import.meta.glob("../../ff/codetta/*/solution.out", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const solutionPathsBySlug = new Map<string, string>();

for (const vitePath of Object.keys(solutions)) {
  const slug = parseCodettaPath(vitePath, "solution");

  if (solutionPathsBySlug.has(slug)) {
    throw new Error(`Multiple Codetta solutions found for ${slug}`);
  }

  solutionPathsBySlug.set(slug, vitePath);
}

export function getCodettaSolutionFilename(slug: string): string {
  if (HIDDEN_CODETTA_IDS.has(slug)) {
    throw new Error(`Codetta solution is hidden for ${slug}`);
  }

  const vitePath = solutionPathsBySlug.get(slug);

  if (!vitePath) {
    throw new Error(`Missing Codetta solution for ${slug}`);
  }

  const basename = vitePath.slice(vitePath.lastIndexOf("/") + 1);
  return `/codetta/${slug}/${basename}`;
}

export function getCodettaSolutionRepoPath(slug: string): string {
  if (HIDDEN_CODETTA_IDS.has(slug)) {
    throw new Error(`Codetta solution is hidden for ${slug}`);
  }

  const vitePath = solutionPathsBySlug.get(slug);

  if (!vitePath) {
    throw new Error(`Missing Codetta solution for ${slug}`);
  }

  return vitePath.replace(/^\.\.\/\.\.\//, "");
}

export const CODETTA_ENTRIES: CodettaEntry[] = Object.entries(readmes)
  .map(([vitePath, readme]) => {
    const slug = parseCodettaPath(vitePath, "README.md");
    const solutionPath = solutionPathsBySlug.get(slug);
    const expectedPath = `${CODETTA_SOURCE_ROOT}/${slug}/solution.out`;
    const solution = solutionPath ? solutions[solutionPath] : undefined;
    const expected = expectedOutputs[expectedPath];

    if (typeof solution !== "string") {
      throw new Error(`Missing Codetta solution for ${slug}`);
    }

    if (typeof expected !== "string") {
      throw new Error(`Missing Codetta expected output for ${slug}`);
    }

    const { frontmatter, body } = parseFrontmatter(readme);

    if (frontmatter.etude !== slug) {
      throw new Error(`Codetta README etude mismatch for ${slug}: ${frontmatter.etude}`);
    }

    return {
      id: slug,
      title: frontmatter.title,
      leader: frontmatter.leader,
      bytes: frontmatter.bytes,
      date: frontmatter.date,
      description: body,
      expected: expected.trimEnd(),
      solution: solution.trimEnd(),
    } satisfies CodettaEntry;
  })
  .filter((entry) => !HIDDEN_CODETTA_IDS.has(entry.id))
  .sort((a, b) => a.title.localeCompare(b.title));

export type { CodettaEntry };
