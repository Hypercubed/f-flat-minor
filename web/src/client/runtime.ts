import type { CorePlatform, PreprocessHost } from "../../../typescript/core/src/platform.ts";

export interface BrowserRuntimeOptions {
  stdin?: string;
  onExit?: (code: number) => void;
  onWrite?: (text: string) => void;
}

export interface VirtualFiles {
  [path: string]: string;
}

function normalizePath(path: string): string {
  const absolute = path.startsWith("/");
  const parts = path.split("/").filter(Boolean);
  const normalized: string[] = [];

  for (const part of parts) {
    if (part === ".") {
      continue;
    }
    if (part === "..") {
      normalized.pop();
      continue;
    }
    normalized.push(part);
  }

  return `${absolute ? "/" : ""}${normalized.join("/")}` || (absolute ? "/" : ".");
}

function dirname(path: string): string {
  const normalized = normalizePath(path);
  const index = normalized.lastIndexOf("/");

  if (index <= 0) {
    return normalized.startsWith("/") ? "/" : ".";
  }

  return normalized.slice(0, index);
}

function resolve(...parts: string[]): string {
  const joined = parts
    .filter(Boolean)
    .join("/")
    .replaceAll(/\/+/g, "/");

  return normalizePath(joined);
}

function relative(from: string, to: string): string {
  const fromParts = normalizePath(from).split("/").filter(Boolean);
  const toParts = normalizePath(to).split("/").filter(Boolean);

  let common = 0;
  while (
    common < fromParts.length &&
    common < toParts.length &&
    fromParts[common] === toParts[common]
  ) {
    common++;
  }

  const ups = fromParts.length - common;
  const remainder = toParts.slice(common);
  const result = Array<string>(ups).fill("..").concat(remainder);
  return result.join("/") || ".";
}

export function createPreprocessHost(files: VirtualFiles): PreprocessHost {
  return {
    readTextFile(path: string) {
      const normalized = normalizePath(path);
      const file = files[normalized];

      if (typeof file !== "string") {
        throw new Error(`Virtual file not found: ${normalized}`);
      }

      return file;
    },
    fileExists(path: string) {
      return typeof files[normalizePath(path)] === "string";
    },
    path: {
      isAbsolute(path: string) {
        return path.startsWith("/");
      },
      dirname,
      relative,
      resolve,
    },
  };
}

export function createBrowserPlatform(
  options: BrowserRuntimeOptions = {},
): CorePlatform {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stdin = Array.from(encoder.encode(options.stdin ?? ""));

  return {
    io: {
      write(data: Uint8Array) {
        options.onWrite?.(decoder.decode(data));
      },
      readByte() {
        return stdin.shift() ?? null;
      },
    },
    exit(code: number) {
      options.onExit?.(code);
    },
    now() {
      return Date.now();
    },
  };
}
