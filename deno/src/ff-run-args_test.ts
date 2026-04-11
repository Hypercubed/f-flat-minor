import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

import {
  buildStdlibRootList,
  normalizeStdlibRootArgs,
} from "../../typescript/core/src/args.ts";
import { normalizeRunArgs } from "../../typescript/core/src/ff-run-args.ts";

Deno.test("normalizeRunArgs preserves repeated stdlib roots", () => {
  const args = normalizeRunArgs({
    "stdlib-root": ["/cli-a", "/cli-b"],
  });

  assertEquals(args["stdlib-root"], ["/cli-a", "/cli-b"]);
});

Deno.test("normalizeStdlibRootArgs wraps a single string", () => {
  assertEquals(normalizeStdlibRootArgs("/cli"), ["/cli"]);
});

Deno.test("buildStdlibRootList appends env and cli roots in order", () => {
  assertEquals(buildStdlibRootList({
    defaultRoot: "/default",
    delimiter: ":",
    envValue: "/env-a:/env-b",
    cliRoots: ["/cli-a", "/cli-b"],
  }), ["/default", "/env-a", "/env-b", "/cli-a", "/cli-b"]);
});
