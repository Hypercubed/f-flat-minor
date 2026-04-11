import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { withBasePath } from "./site";

export interface ReferencePage {
  slugSegments: string[];
  routePath: string;
  title: string;
  summary: string;
  order: number;
  showInSidebar: boolean;
  sourcePath: string;
}

interface ReferenceFrontmatter {
  title?: string;
  summary?: string;
  order?: number;
  showInSidebar?: boolean;
}

interface ParsedMarkdownFile {
  frontmatter: ReferenceFrontmatter;
  body: string;
}

type MarkdownNode = {
  type?: string;
  url?: string;
  children?: MarkdownNode[];
};

const REPO_ROOT = path.resolve(process.cwd(), "..");
const REFERENCE_ROOT = path.resolve(REPO_ROOT, "_docs/reference");
const GITHUB_BLOB_BASE = "https://github.com/Hypercubed/f-flat-minor/blob/main";
const INCLUDED_REFERENCE_FILES = new Set(["index.md", "quickhelp.md", "core-primitives.md"]);
const INCLUDED_REFERENCE_PREFIXES = [path.join("generated", "lib") + path.sep];

function isIncludedReferenceFile(filePath: string): boolean {
  const relativePath = path.relative(REFERENCE_ROOT, filePath);

  if (INCLUDED_REFERENCE_FILES.has(relativePath)) {
    return true;
  }

  return INCLUDED_REFERENCE_PREFIXES.some((prefix) => relativePath.startsWith(prefix));
}

function walkMarkdownFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md") && isIncludedReferenceFile(entryPath)) {
      files.push(entryPath);
    }
  }

  return files;
}

function parseFrontmatterValue(rawValue: string): string | number | boolean {
  const value = rawValue.trim();

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (/^-?\d+$/.test(value)) {
    return Number(value);
  }

  return value.replace(/^['"]|['"]$/g, "");
}

function parseMarkdownFile(markdown: string): ParsedMarkdownFile {
  if (!markdown.startsWith("---\n")) {
    return { frontmatter: {}, body: markdown };
  }

  const endIndex = markdown.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    return { frontmatter: {}, body: markdown };
  }

  const rawFrontmatter = markdown.slice(4, endIndex);
  const body = markdown.slice(endIndex + 5);
  const frontmatter: ReferenceFrontmatter = {};

  for (const line of rawFrontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim() as keyof ReferenceFrontmatter;
    const rawValue = line.slice(separatorIndex + 1);

    frontmatter[key] = parseFrontmatterValue(rawValue) as never;
  }

  return { frontmatter, body };
}

function getSlugSegments(filePath: string): string[] {
  const relativePath = path.relative(REFERENCE_ROOT, filePath);
  const withoutExtension = relativePath.replace(/\.md$/, "");
  const segments = withoutExtension.split(path.sep).filter(Boolean);

  if (segments.at(-1) === "index") {
    segments.pop();
  }

  return segments;
}

function getRoutePath(slugSegments: string[]): string {
  return slugSegments.length === 0 ? "/reference/" : `/reference/${slugSegments.join("/")}/`;
}

function getTitle(markdownBody: string, frontmatter: ReferenceFrontmatter, fallback: string): string {
  if (frontmatter.title) {
    return frontmatter.title;
  }

  const headingMatch = markdownBody.match(/^#\s+(.+)$/m);
  return headingMatch?.[1]?.trim() || fallback;
}

function getSummary(markdownBody: string, frontmatter: ReferenceFrontmatter): string {
  if (frontmatter.summary) {
    return frontmatter.summary;
  }

  const lines = markdownBody.replace(/^#\s+.+\n+/, "").split("\n");
  const collected: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (collected.length > 0) {
        break;
      }
      continue;
    }

    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("```") ||
      /^[-*+]\s/.test(trimmed)
    ) {
      if (collected.length > 0) {
        break;
      }
      continue;
    }

    collected.push(trimmed);
  }

  return collected.join(" ");
}

function compareReferencePages(a: ReferencePage, b: ReferencePage): number {
  if (a.order !== b.order) {
    return a.order - b.order;
  }

  if (a.routePath === "/reference/") {
    return -1;
  }

  if (b.routePath === "/reference/") {
    return 1;
  }

  return a.title.localeCompare(b.title);
}

function loadReferencePages(): ReferencePage[] {
  return walkMarkdownFiles(REFERENCE_ROOT)
    .map((filePath) => {
      const markdown = readFileSync(filePath, "utf8");
      const { frontmatter, body } = parseMarkdownFile(markdown);
      const slugSegments = getSlugSegments(filePath);

      return {
        slugSegments,
        routePath: getRoutePath(slugSegments),
        title: getTitle(body, frontmatter, slugSegments.at(-1) ?? "Reference"),
        summary: getSummary(body, frontmatter),
        order: typeof frontmatter.order === "number" ? frontmatter.order : 100,
        showInSidebar: frontmatter.showInSidebar !== false,
        sourcePath: filePath,
      };
    })
    .sort(compareReferencePages);
}

const referencePages = loadReferencePages();

function walkNodes(node: MarkdownNode, visit: (currentNode: MarkdownNode) => void): void {
  visit(node);

  for (const child of node.children ?? []) {
    walkNodes(child, visit);
  }
}

function rewriteMarkdownUrl(url: string, currentSourcePath: string): string {
  if (/^(?:[a-z]+:|#|\/)/i.test(url)) {
    return url;
  }

  const [urlPath, hash = ""] = url.split("#");

  if (!urlPath || !urlPath.endsWith(".md")) {
    return url;
  }

  const absoluteTarget = path.resolve(path.dirname(currentSourcePath), urlPath);
  const hashSuffix = hash ? `#${hash}` : "";

  if (absoluteTarget.startsWith(REFERENCE_ROOT)) {
    return `${withBasePath(getRoutePath(getSlugSegments(absoluteTarget)))}${hashSuffix}`;
  }

  if (absoluteTarget.startsWith(REPO_ROOT)) {
    const repoRelativePath = path.relative(REPO_ROOT, absoluteTarget).split(path.sep).join("/");
    return `${GITHUB_BLOB_BASE}/${repoRelativePath}${hashSuffix}`;
  }

  return url;
}

function referenceLinkPlugin(currentSourcePath: string) {
  return () => (tree: MarkdownNode) => {
    walkNodes(tree, (node) => {
      if (node.type === "link" && typeof node.url === "string") {
        node.url = rewriteMarkdownUrl(node.url, currentSourcePath);
      }
    });
  };
}

export function getReferencePages(): ReferencePage[] {
  return referencePages;
}

export function getReferenceSidebarPages(): ReferencePage[] {
  return referencePages.filter((page) => page.showInSidebar);
}

export function getReferencePageBySlug(slugSegments: string[]): ReferencePage | undefined {
  const normalizedSlug = slugSegments.filter(Boolean).join("/");
  return referencePages.find((page) => page.slugSegments.join("/") === normalizedSlug);
}

export async function renderReferencePage(page: ReferencePage): Promise<string> {
  const markdown = readFileSync(page.sourcePath, "utf8");
  const { body } = parseMarkdownFile(markdown);
  const rendered = await remark()
    .use(remarkGfm)
    .use(referenceLinkPlugin(page.sourcePath))
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(body.replace(/^#\s+.+\n+/, ""));

  return rendered.toString();
}
