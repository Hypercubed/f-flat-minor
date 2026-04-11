import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

import type {
  CompilerHost,
  CorePlatform,
  PreprocessHost,
} from "../../typescript/core/src/platform.ts";

export function createDenoPlatform(): CorePlatform {
  return {
    io: {
      write(data: Uint8Array) {
        Deno.stdout.writeSync(data);
      },
      writeError(data: Uint8Array) {
        Deno.stderr.writeSync(data);
      },
      readByte() {
        const input = new Uint8Array(1);
        const n = Deno.stdin.readSync(input);
        if (n === null) return null;
        return input[0];
      },
      setRaw(raw: boolean) {
        Deno.stdin.setRaw(raw);
      },
    },
    exit(code: number) {
      Deno.exit(code);
    },
    now() {
      return Date.now();
    },
  };
}

export function createDenoCompilerHost(): CompilerHost {
  return {
    exit(code?: number) {
      Deno.exit(code ?? 0);
    },
    log(...args: Array<string | number | bigint>) {
      console.log(...args);
    },
  };
}

export function createDenoPreprocessHost(): PreprocessHost {
  return {
    exit(code?: number) {
      Deno.exit(code ?? 0);
    },
    readTextFile(pathname: string) {
      return Deno.readTextFileSync(pathname);
    },
    fileExists(pathname: string) {
      try {
        return Deno.statSync(pathname).isFile;
      } catch {
        return false;
      }
    },
    directoryExists(pathname: string) {
      try {
        return Deno.statSync(pathname).isDirectory;
      } catch {
        return false;
      }
    },
    realpath(pathname: string) {
      return Deno.realPathSync(pathname);
    },
    path,
  };
}
