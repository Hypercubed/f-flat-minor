import { assert, assertEquals, assertStringIncludes } from "std/assert/mod.ts";
import * as path from "std/path/mod.ts";

import { auditSource } from "../../tools/ers/mod.ts";
import { run as runErs } from "../bin/ers.ts";

Deno.test("ERS audit inventories primitive wrapper definitions conservatively", () => {
  const result = auditSource({
    file: "/virtual/core.ff",
    word: "slip",
    source: "slip: q< eval q> ;",
  });

  assertEquals(result.safety.verdict, "safe-local");
  assertEquals(result.queueRegions.length, 1);
  assertEquals(result.queueRegions[0]?.disposition, "kept-intentionally");
  assertStringIncludes(
    result.queueRegions[0]?.reason ?? "",
    "Foundational primitive queue wrapper definition is frozen.",
  );
  assertEquals(result.rewrites.length, 0);
});

Deno.test("ERS audit reports cross-boundary queue words as blocked", () => {
  const result = auditSource({
    file: "/virtual/unsafe.ff",
    word: "unsafe_word",
    source: "unsafe_word: q> dup ;",
  });

  assertEquals(result.safety.verdict, "blocked");
  assertEquals(result.queueRegions.length, 1);
  assertEquals(result.queueRegions[0]?.kind, "starts-with-q>");
  assertEquals(result.queueRegions[0]?.disposition, "blocked");
});

Deno.test("ERS audit suggests local queue and peephole rewrites", () => {
  const result = auditSource({
    file: "/virtual/demo.ff",
    word: "demo",
    source: "demo: q< foo q> swap + dup drop ;",
  });

  assertEquals(result.safety.verdict, "safe-local");
  assert(result.rewrites.some((rewrite) => rewrite.rule === "queue-to-dip"));
  assert(result.rewrites.some((rewrite) => rewrite.rule === "commutative-add"));
  assert(result.rewrites.some((rewrite) => rewrite.rule === "dup-drop-no-op"));
});

Deno.test("ERS audit tracks single-word quotation normalization by mode", () => {
  const source = "demo: [ foo ] [bar] ;";
  const structural = auditSource({
    file: "/virtual/pointers.ff",
    word: "demo",
    source,
    mode: "structural",
  });
  const fullFloor = auditSource({
    file: "/virtual/pointers.ff",
    word: "demo",
    source,
    mode: "full-floor",
  });

  assertEquals(structural.pointerCandidates.length, 2);
  assert(structural.rewrites.some((rewrite) => rewrite.rule === "compact-single-word-pointer"));
  assert(fullFloor.rewrites.some((rewrite) => rewrite.rule === "expand-single-word-pointer"));
});

Deno.test("ERS CLI emits JSON output", () => {
  const file = path.resolve(Deno.cwd(), "ff/optimize.ffp");
  const source = "a: q< foo q> ;";

  const originalLog = console.log;
  const writes: string[] = [];
  console.log = (...args: unknown[]) => {
    writes.push(args.map((value) => String(value)).join(" "));
  };

  try {
    runErs({
      _: ["audit", file],
      word: "a",
      mode: "full-floor",
      json: true,
    }, {
      readTextFileSync: () => source,
    });
  } finally {
    console.log = originalLog;
  }

  assertEquals(writes.length, 1);
  const parsed = JSON.parse(writes[0] ?? "{}");
  assertEquals(parsed.word, "a");
  assert(Array.isArray(parsed.queueRegions));
});
