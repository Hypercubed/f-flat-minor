import {
  assert,
  assertEquals,
  assertMatch,
  assertStringIncludes,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

import { Preprocessor } from "../../typescript/core/src/preprocess.ts";
import type { PreprocessHost } from "../../typescript/core/src/platform.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import { createPreprocessHost } from "../../web/src/client/runtime.ts";

function createMemoryPreprocessHost(
  files: Record<string, string>,
): PreprocessHost {
  const normalizedFiles = Object.fromEntries(
    Object.entries(files).map(([pathname, source]) => [path.normalize(pathname), source]),
  );

  return {
    readTextFile(pathname: string) {
      const file = normalizedFiles[path.normalize(pathname)];
      if (file === undefined) {
        throw new Error(`Missing test file: ${pathname}`);
      }
      return file;
    },
    fileExists(pathname: string) {
      return normalizedFiles[path.normalize(pathname)] !== undefined;
    },
    directoryExists(pathname: string) {
      const normalized = path.normalize(pathname).replace(/\/+$/, "");
      const prefix = normalized === "/" ? "/" : `${normalized}/`;
      return Object.keys(normalizedFiles).some((entry) => entry.startsWith(prefix));
    },
    realpath(pathname: string) {
      return path.normalize(pathname);
    },
    path,
  };
}

function createPreprocessor(
  files: Record<string, string>,
  options?: { stdlibRoots?: string[] },
): Preprocessor {
  return new Preprocessor(createMemoryPreprocessHost(files), {
    engine: new Engine(),
    compiler: new Compiler(),
  }, options);
}

Deno.test("relative imports stay source-file-relative", () => {
  const files = {
    "/proj/main.ffp": ".import lib/private.ffp\nmain",
    "/proj/lib/private.ffp": "helper",
  };

  const output = createPreprocessor(files).preprocess(
    Preprocessor.tokenize(files["/proj/main.ffp"]),
    "/proj/main.ffp",
  );

  assertEquals(output, "helper\nmain");
});

Deno.test("stdlib imports resolve through ordered roots", () => {
  const files = {
    "/project/main.ffp": ".import <prelude>",
    "/stdlib-default/prelude.ffp": "default",
    "/stdlib-extra/prelude.ffp": "extra",
  };

  const output = createPreprocessor(files, {
    stdlibRoots: ["/stdlib-extra", "/stdlib-default"],
  }).preprocess(
    Preprocessor.tokenize(files["/project/main.ffp"]),
    "/project/main.ffp",
  );

  assertEquals(output, "extra");
});

Deno.test("stdlib imports try .ffp and directory indexes", () => {
  const files = {
    "/project/main.ffp": [
      ".import <prelude>",
      ".import <math>",
    ].join("\n"),
    "/stdlib/prelude.ffp": "prelude",
    "/stdlib/math/math.ffp": "sqrt",
  };

  const output = createPreprocessor(files, {
    stdlibRoots: ["/stdlib"],
  }).preprocess(
    Preprocessor.tokenize(files["/project/main.ffp"]),
    "/project/main.ffp",
  );

  assertEquals(output, "prelude\nsqrt");
});

Deno.test("filesystem imports resolve directory indexes", () => {
  const files = {
    "/project/main.ffp": ".import ./math",
    "/project/math/math.ffp": "square",
  };

  const output = createPreprocessor(files).preprocess(
    Preprocessor.tokenize(files["/project/main.ffp"]),
    "/project/main.ffp",
  );

  assertEquals(output, "square");
});

Deno.test("missing stdlib imports report searched roots", () => {
  const files = {
    "/project/main.ffp": ".import <missing>",
  };

  let message = "";
  try {
    createPreprocessor(files, { stdlibRoots: ["/stdlib-a", "/stdlib-b"] }).preprocess(
      Preprocessor.tokenize(files["/project/main.ffp"]),
      "/project/main.ffp",
    );
  } catch (error) {
    message = error instanceof Error ? error.message : String(error);
  }

  assertStringIncludes(message, "Stdlib import not found: <missing>");
  assertStringIncludes(message, "/stdlib-a");
  assertStringIncludes(message, "/stdlib-b");
});

Deno.test("canonical resolved paths dedupe equivalent imports", () => {
  const files = {
    "/proj/main.ffp": [
      ".import ./lib/private.ffp",
      ".import ./lib/../lib/private.ffp",
    ].join("\n"),
    "/proj/lib/private.ffp": "__x: __x",
  };

  const output = createPreprocessor(files).preprocess(
    Preprocessor.tokenize(files["/proj/main.ffp"]),
    "/proj/main.ffp",
  );

  assertEquals(output.match(/__lib_private_ffp_[a-z0-9]+__x:/g)?.length ?? 0, 1);
});

Deno.test("browser preprocess host resolves stdlib imports from /lib", () => {
  const files = {
    "/main.ffp": ".import <prelude>",
    "/lib/prelude.ffp": "browser-prelude",
  };

  const preprocessor = new Preprocessor(createPreprocessHost(files), {
    engine: new Engine(),
    compiler: new Compiler(),
  }, {
    stdlibRoots: ["/lib"],
  });
  const output = preprocessor.preprocess(
    Preprocessor.tokenize(files["/main.ffp"]),
    "/main.ffp",
  );

  assertEquals(output, "browser-prelude");
});

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

  const output = createPreprocessor(files).preprocess(
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

  const output = createPreprocessor(files).preprocess(
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

  const output = createPreprocessor(files).preprocess(
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
