import { describe, expect, it } from "vitest";

import { createVirtualFiles, EXAMPLES } from "./examples.ts";
import { runProgram } from "./program-runner.ts";

describe("virtual library files", () => {
  it("auto-includes ff/lib source files and excludes tests and non-source files", () => {
    const files = createVirtualFiles("", "/main.ffp");
    const paths = Object.keys(files);

    expect(files["/lib/math/log.ffp"]).toBeDefined();
    expect(files["/lib/core/core.ff"]).toBeDefined();
    expect(paths.some((path) => path.includes("/__tests__/"))).toBe(false);
    expect(paths.some((path) => path.endsWith(".out"))).toBe(false);
    expect(files["/lib/README.md"]).toBeUndefined();
  });

  it("includes every ff/euler/*.ffp example in the virtual example map", () => {
    const eulerModules = import.meta.glob("../../ff/euler/*.ffp", {
      eager: true,
      import: "default",
      query: "?raw",
    }) as Record<string, string>;
    const files = createVirtualFiles("", "/main.ffp");
    const hiddenBases = new Set(["euler4.ffp", "euler10.ffp", "euler14.ffp", "euler46.ffp"]);

    for (const vitePath of Object.keys(eulerModules)) {
      const base = vitePath.split("/").pop()!;
      if (hiddenBases.has(base)) {
        expect(files[`/examples/${base}`]).toBeUndefined();
        continue;
      }
      expect(files[`/examples/${base}`]).toBeDefined();
    }
    expect(Object.keys(eulerModules).length).toBeGreaterThan(0);
  });

  it("loads an auto-discovered library file at runtime", () => {
    const result = runProgram(".load /lib/math/log.ffp\n1 putn", "", true);

    expect(result.output.trimEnd()).toBe("1");
    expect(result.exitCode).toBe(0);
    expect(result.issues).toEqual([]);
  });

  it("runs a Codetta program relative to its virtual source path", () => {
    const result = runProgram(".import ../../lib/prelude.ffp\n1 putn", "", true, {
      filename: "/codetta/test/solution.ffp",
    });

    expect(result.output.trimEnd()).toBe("1");
    expect(result.exitCode).toBe(0);
    expect(result.issues).toEqual([]);
  });
});
