import fs from "node:fs";
import path from "node:path";

import type {
  CompilerHost,
  CorePlatform,
  PreprocessHost,
} from "../../typescript/core/src/platform.ts";

export function createBunPlatform(): CorePlatform {
  return {
    io: {
      write(data: Uint8Array) {
        process.stdout.write(Buffer.from(data));
      },
      readByte() {
        const input = Buffer.alloc(1);
        const n = fs.readSync(process.stdin.fd, input, 0, 1, null);
        return n === 0 ? null : input[0];
      },
      setRaw(raw: boolean) {
        if (process.stdin.isTTY) {
          process.stdin.setRawMode(raw);
        }
      },
    },
    exit(code: number) {
      process.exit(code);
    },
    now() {
      return Date.now();
    },
  };
}

export function createBunCompilerHost(): CompilerHost {
  return {
    exit(code?: number) {
      process.exit(code ?? 0);
    },
    log(...args: Array<string | number | bigint>) {
      console.log(...args);
    },
  };
}

export function createBunPreprocessHost(): PreprocessHost {
  return {
    exit(code?: number) {
      process.exit(code ?? 0);
    },
    readTextFile(pathname: string) {
      return fs.readFileSync(pathname, "utf8");
    },
    fileExists(pathname: string) {
      return fs.existsSync(pathname);
    },
    path,
  };
}
