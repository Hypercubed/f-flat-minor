import {
  assert,
  assertEquals,
  assertMatch,
  assertStringIncludes,
} from "std/assert/mod.ts";
import * as path from "std/path/mod.ts";

import { Preprocessor } from "../../typescript/core/src/preprocess.ts";
import type { PreprocessHost } from "../../typescript/core/src/platform.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";

function createMemoryPreprocessHost(
  files: Record<string, string>,
): PreprocessHost {
  return {
    readTextFile(pathname: string) {
      const file = files[pathname];
      if (file === undefined) {
        throw new Error(`Missing test file: ${pathname}`);
      }
      return file;
    },
    fileExists(pathname: string) {
      return files[pathname] !== undefined;
    },
    path,
  };
}

Deno.test("mangles private words from imported files only", () => {
  const files = {
    "/proj/app/main.ffp": [
      ".import ./lib/private.ffp",
      "[__root_symbol]",
    ].join("\n"),
    "/proj/app/lib/private.ffp": [
      "__local: __local [__local] __(wrapped) (__local)",
    ].join("\n"),
  };

  const preprocessor = new Preprocessor(createMemoryPreprocessHost(files), {
    engine: new Engine(),
    compiler: new Compiler(),
  });
  const output = preprocessor.preprocess(
    Preprocessor.tokenize(files["/proj/app/main.ffp"]),
    "/proj/app/main.ffp",
  );

  assertMatch(output, /__lib_private_ffp_[a-z0-9]+__local:/);
  assertMatch(output, /\[__lib_private_ffp_[a-z0-9]+__local\]/);
  assertMatch(output, /__lib_private_ffp_[a-z0-9]+__\(wrapped\)/);
  assertStringIncludes(output, "(__local)");
  assertStringIncludes(output, "[__root_symbol]");
  assert(!output.split(/\s+/).includes("__local:"));
});

Deno.test(".load does not apply import privacy mangling", () => {
  const files = {
    "/proj/app/main.ffp": [
      ".import ./lib/private.ffp",
      ".load ./lib/loaded.ffp",
    ].join("\n"),
    "/proj/app/lib/private.ffp": "__hidden: __hidden",
    "/proj/app/lib/loaded.ffp": "__loaded: __loaded [__loaded]",
  };

  const preprocessor = new Preprocessor(createMemoryPreprocessHost(files), {
    engine: new Engine(),
    compiler: new Compiler(),
  });
  const output = preprocessor.preprocess(
    Preprocessor.tokenize(files["/proj/app/main.ffp"]),
    "/proj/app/main.ffp",
  );

  assertMatch(output, /__lib_private_ffp_[a-z0-9]+__hidden:/);
  assertStringIncludes(output, "__loaded: __loaded [__loaded]");
});

Deno.test("different imported files get distinct prefixes even when sanitized paths collide", () => {
  const files = {
    "/proj/app/main.ffp": [
      ".import ./a-b/private.ffp",
      ".import ./a/b-private.ffp",
    ].join("\n"),
    "/proj/app/a-b/private.ffp": "__x: __x",
    "/proj/app/a/b-private.ffp": "__x: __x",
  };

  const preprocessor = new Preprocessor(createMemoryPreprocessHost(files), {
    engine: new Engine(),
    compiler: new Compiler(),
  });
  const output = preprocessor.preprocess(
    Preprocessor.tokenize(files["/proj/app/main.ffp"]),
    "/proj/app/main.ffp",
  );

  const prefixes = Array.from(
    output.matchAll(/__a_b_private_ffp_([a-z0-9]+)__/g),
    (match) => match[0],
  );

  assertEquals(prefixes.length, 4);
  assertEquals(new Set(prefixes).size, 2);
});
