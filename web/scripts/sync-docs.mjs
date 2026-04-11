import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(webRoot, "..");
const targetRoot = path.resolve(webRoot, "src/content/docs");
const githubBlobBase = "https://github.com/Hypercubed/f-flat-minor/blob/main";
const watchIntervalMs = 750;

const docSources = [
  {
    section: "reference",
    sourceRoot: path.resolve(repoRoot, "_docs/reference"),
    targetPrefix: "",
  },
  {
    section: "manual",
    sourceRoot: path.resolve(repoRoot, "_docs/manual"),
    targetPrefix: "manual",
  },
];

async function walkMarkdownFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await walkMarkdownFiles(entryPath)));
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(entryPath);
      }
    }

    return files.sort();
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return { data: {}, body: markdown };
  }

  const endIndex = markdown.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { data: {}, body: markdown };
  }

  const rawFrontmatter = markdown.slice(4, endIndex);
  const body = markdown.slice(endIndex + 5);
  const data = {};

  for (const line of rawFrontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (value === "true") {
      data[key] = true;
      continue;
    }

    if (value === "false") {
      data[key] = false;
      continue;
    }

    if (/^-?\d+$/.test(value)) {
      data[key] = Number(value);
      continue;
    }

    value = value.replace(/^['"]|['"]$/g, "");
    data[key] = value;
  }

  return { data, body };
}

function serializeFrontmatter(data) {
  const lines = Object.entries(data).map(([key, value]) => {
    if (typeof value === "number" || typeof value === "boolean") {
      return `${key}: ${value}`;
    }

    return `${key}: ${JSON.stringify(String(value))}`;
  });

  return `---\n${lines.join("\n")}\n---\n\n`;
}

function stripLeadingHeading(body) {
  return body.replace(/^\s*#\s+.+\n+/, "");
}

function toSlug(targetRelativePath) {
  const normalized = targetRelativePath.split(path.sep).join("/").replace(/\.md$/, "");
  return normalized === "index" ? "" : normalized.replace(/\/index$/, "");
}

function toRoutePath(slug) {
  return slug ? `/reference/${slug}/` : "/reference/";
}

function toRelativeRoute(fromRoute, toRoute) {
  const fromPath = fromRoute.replace(/^\//, "");
  const toPath = toRoute.replace(/^\//, "");
  let relativePath = path.posix.relative(fromPath, toPath);

  if (!relativePath) {
    return "./";
  }

  if (toRoute.endsWith("/") && !relativePath.endsWith("/")) {
    relativePath += "/";
  }

  return relativePath;
}

function rewriteMarkdownLinks(body, currentDoc, docsBySourcePath) {
  return body.replace(/(!?\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, (match, prefix, rawTarget, suffix) => {
    if (/^(?:[a-z]+:|#|\/)/i.test(rawTarget)) {
      return match;
    }

    const [targetPath, hash = ""] = rawTarget.split("#");
    if (!targetPath.endsWith(".md")) {
      return match;
    }

    const absoluteTarget = path.resolve(path.dirname(currentDoc.sourcePath), targetPath);
    const hashSuffix = hash ? `#${hash}` : "";
    const docTarget = docsBySourcePath.get(absoluteTarget);

    if (docTarget) {
      return `${prefix}${toRelativeRoute(currentDoc.routePath, docTarget.routePath)}${hashSuffix}${suffix}`;
    }

    if (absoluteTarget.startsWith(repoRoot)) {
      const repoRelativePath = path.relative(repoRoot, absoluteTarget).split(path.sep).join("/");
      return `${prefix}${githubBlobBase}/${repoRelativePath}${hashSuffix}${suffix}`;
    }

    return match;
  });
}

async function ensureTargetDirectory() {
  const relativeToWebRoot = path.relative(webRoot, targetRoot);
  if (relativeToWebRoot.startsWith("..") || path.isAbsolute(relativeToWebRoot)) {
    throw new Error(`Refusing to clean unexpected target directory: ${targetRoot}`);
  }

  await fs.mkdir(targetRoot, { recursive: true });
}

async function removeEmptyDirectories(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const entryPath = path.join(dir, entry.name);
        await removeEmptyDirectories(entryPath);

        const remainingEntries = await fs.readdir(entryPath);
        if (remainingEntries.length === 0) {
          await fs.rmdir(entryPath);
        }
      }),
  );
}

async function buildDocIndex() {
  const docs = [];

  for (const source of docSources) {
    const files = await walkMarkdownFiles(source.sourceRoot);

    for (const sourcePath of files) {
      const relativeSourcePath = path.relative(source.sourceRoot, sourcePath);
      const targetRelativePath = source.targetPrefix
        ? path.join(source.targetPrefix, relativeSourcePath)
        : relativeSourcePath;
      const slug = toSlug(targetRelativePath);

      docs.push({
        section: source.section,
        sourcePath,
        targetPath: path.join(targetRoot, targetRelativePath),
        targetRelativePath,
        routePath: toRoutePath(slug),
      });
    }
  }

  return docs;
}

async function syncDocs() {
  const docs = await buildDocIndex();
  const docsBySourcePath = new Map(docs.map((doc) => [doc.sourcePath, doc]));
  const expectedTargetPaths = new Set(docs.map((doc) => doc.targetPath));

  await ensureTargetDirectory();

  for (const doc of docs) {
    const markdown = await fs.readFile(doc.sourcePath, "utf8");
    const { data, body } = parseFrontmatter(markdown);
    const normalizedFrontmatter = {
      ...data,
      section: doc.section,
    };
    const normalizedBody = rewriteMarkdownLinks(stripLeadingHeading(body), doc, docsBySourcePath).trim();
    const output = `${serializeFrontmatter(normalizedFrontmatter)}${normalizedBody}\n`;

    await fs.mkdir(path.dirname(doc.targetPath), { recursive: true });
    await fs.writeFile(doc.targetPath, output, "utf8");
  }

  const existingTargetPaths = await walkMarkdownFiles(targetRoot);

  for (const targetPath of existingTargetPaths) {
    if (!expectedTargetPaths.has(targetPath)) {
      await fs.rm(targetPath, { force: true });
    }
  }

  await removeEmptyDirectories(targetRoot);
}

async function createSourceSnapshot() {
  const snapshot = [];

  for (const source of docSources) {
    const files = await walkMarkdownFiles(source.sourceRoot);

    for (const file of files) {
      try {
        const stats = await fs.stat(file);
        snapshot.push(`${file}:${stats.mtimeMs}:${stats.size}`);
      } catch (error) {
        if (!error || error.code !== "ENOENT") {
          throw error;
        }
      }
    }
  }

  return snapshot.sort().join("\n");
}

function timestamp() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function log(message) {
  console.log(`[sync-docs ${timestamp()}] ${message}`);
}

async function runOnce() {
  await syncDocs();
}

async function watchDocs() {
  let lastSnapshot = await createSourceSnapshot();
  let scheduled = null;
  let syncing = false;
  let rerunRequested = false;
  let shuttingDown = false;
  let resolveShutdown;

  const runSync = async (reason) => {
    if (syncing) {
      rerunRequested = true;
      return;
    }

    syncing = true;

    try {
      await syncDocs();
      log(`synced (${reason})`);
    } catch (error) {
      console.error(`[sync-docs] Sync failed (${reason})`);
      console.error(error);

      if (!shuttingDown) {
        scheduleSync("retry");
      }
    } finally {
      syncing = false;

      if (rerunRequested && !shuttingDown) {
        rerunRequested = false;
        await runSync("queued change");
      }
    }
  };

  const scheduleSync = (reason) => {
    rerunRequested = true;

    if (scheduled !== null) {
      clearTimeout(scheduled);
    }

    scheduled = setTimeout(async () => {
      scheduled = null;
      rerunRequested = false;
      await runSync(reason);
    }, 150);
  };

  await runSync("initial");

  const poller = setInterval(async () => {
    if (syncing || shuttingDown) {
      return;
    }

    try {
      const nextSnapshot = await createSourceSnapshot();
      if (nextSnapshot !== lastSnapshot) {
        lastSnapshot = nextSnapshot;
        scheduleSync("source change");
      }
    } catch (error) {
      console.error("[sync-docs] Watch poll failed");
      console.error(error);
    }
  }, watchIntervalMs);

  const shutdown = () => {
    if (shuttingDown) {
      return;
    }

    shuttingDown = true;
    clearInterval(poller);

    if (scheduled !== null) {
      clearTimeout(scheduled);
      scheduled = null;
    }

    if (resolveShutdown) {
      resolveShutdown();
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  log(`watching _docs/reference and _docs/manual every ${watchIntervalMs}ms`);

  await new Promise((resolve) => {
    resolveShutdown = resolve;
  });
}

if (process.argv.includes("--watch")) {
  await watchDocs();
} else {
  await runOnce();
}
