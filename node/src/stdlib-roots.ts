import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function directoryExists(pathname: string): boolean {
  try {
    return fs.statSync(pathname).isDirectory();
  } catch {
    return false;
  }
}

function candidateRootsFrom(startDir: string): string[] {
  const candidates: string[] = [];
  let current = path.resolve(startDir);

  for (;;) {
    candidates.push(path.join(current, "ff", "lib"));

    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }

  return candidates;
}

export function resolveDefaultStdlibRoot(moduleUrl: string): string {
  const seen = new Set<string>();
  const startDirs: string[] = [];

  try {
    startDirs.push(path.dirname(fileURLToPath(moduleUrl)));
  } catch {
    // Ignore non-file module URLs.
  }

  try {
    startDirs.push(process.cwd());
  } catch {
    // Ignore cwd lookup failures.
  }

  if (process.execPath) {
    startDirs.push(path.dirname(process.execPath));
  }

  for (const startDir of startDirs) {
    for (const candidate of candidateRootsFrom(startDir)) {
      const normalized = path.resolve(candidate);
      if (seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      if (directoryExists(normalized)) {
        return normalized;
      }
    }
  }

  return path.resolve(startDirs[0] ?? process.cwd(), "../../ff/lib");
}
