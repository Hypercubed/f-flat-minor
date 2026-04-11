import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

function directoryExists(pathname: string): boolean {
  try {
    return Deno.statSync(pathname).isDirectory;
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

  startDirs.push(path.dirname(path.fromFileUrl(moduleUrl)));

  try {
    startDirs.push(Deno.cwd());
  } catch {
    // Ignore cwd lookup failures.
  }

  try {
    startDirs.push(path.dirname(Deno.execPath()));
  } catch {
    // Ignore executable lookup failures.
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

  return path.resolve(path.dirname(path.fromFileUrl(moduleUrl)), "../../ff/lib");
}
