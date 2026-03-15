import { describe, expect, it } from "vitest";

import {
  C64_MIN,
  TXT_MAX,
  decodeCodeFromUrlParam,
  encodeCodeForUrlParam,
} from "./url-codec.ts";

describe("url-codec", () => {
  it("uses the expected heuristic boundaries", () => {
    expect(encodeCodeForUrlParam("a".repeat(45))?.startsWith("txt.")).toBe(true);
    expect(encodeCodeForUrlParam("a".repeat(46))?.startsWith("b64.")).toBe(true);
    expect(encodeCodeForUrlParam("a".repeat(69))?.startsWith("b64.")).toBe(true);
    expect(encodeCodeForUrlParam("a".repeat(70))?.startsWith("c64.")).toBe(true);
  });

  it("round-trips txt payloads", () => {
    const source = "dup 1 + putn";
    const encoded = encodeCodeForUrlParam(source);
    expect(encoded?.startsWith("txt.")).toBe(true);
    expect(decodeCodeFromUrlParam(encoded ?? null)).toBe(source);
  });

  it("round-trips b64 payloads for medium snippets", () => {
    const source = "fact: dup 1 - [ dup 1 - fact * ] ? ; 6 fact putn";
    expect(source.length).toBeGreaterThan(TXT_MAX);
    expect(source.length).toBeLessThan(C64_MIN);

    const encoded = encodeCodeForUrlParam(source);
    expect(encoded?.startsWith("b64.")).toBe(true);
    expect(decodeCodeFromUrlParam(encoded ?? null)).toBe(source);
  });

  it("round-trips c64 payloads for larger snippets", () => {
    const source = `${"dup 1 - [ dup 1 - fact * ] ? ; ".repeat(8)}putn`;
    expect(source.length).toBeGreaterThanOrEqual(C64_MIN);

    const encoded = encodeCodeForUrlParam(source);
    expect(encoded?.startsWith("c64.")).toBe(true);
    expect(decodeCodeFromUrlParam(encoded ?? null)).toBe(source);
  });

  it("uses strict ascii gate for txt payloads", () => {
    const source = "hello π";
    expect(source.length).toBeLessThanOrEqual(TXT_MAX);

    const encoded = encodeCodeForUrlParam(source);
    expect(encoded?.startsWith("b64.")).toBe(true);
    expect(decodeCodeFromUrlParam(encoded ?? null)).toBe(source);
  });

  it("falls back from c64 to b64 when compression fails", () => {
    const source = `${"12345 ".repeat(20)}done`;
    const encoded = encodeCodeForUrlParam(source, {
      encodeCompressed: () => {
        throw new Error("c64 unavailable");
      },
    });

    expect(encoded?.startsWith("b64.")).toBe(true);
    expect(decodeCodeFromUrlParam(encoded ?? null)).toBe(source);
  });

  it("falls back from b64 to txt when b64 fails and source is ascii", () => {
    const source = "alpha beta gamma delta epsilon zeta eta theta iota";
    expect(source.length).toBeGreaterThan(TXT_MAX);
    expect(source.length).toBeLessThan(C64_MIN);

    const encoded = encodeCodeForUrlParam(source, {
      encodeBase64: () => {
        throw new Error("b64 unavailable");
      },
    });

    expect(encoded?.startsWith("txt.")).toBe(true);
    expect(decodeCodeFromUrlParam(encoded ?? null)).toBe(source);
  });

  it("returns null when all safe fallbacks fail", () => {
    const source = `${"中".repeat(80)}🚀`;
    const encoded = encodeCodeForUrlParam(source, {
      encodeCompressed: () => {
        throw new Error("c64 unavailable");
      },
      encodeBase64: () => {
        throw new Error("b64 unavailable");
      },
    });

    expect(encoded).toBeNull();
  });

  it("keeps backward compatibility for b64 links", () => {
    const source = "2 3 + putn";
    const legacy = `b64.${btoa(source).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "")}`;
    expect(decodeCodeFromUrlParam(legacy)).toBe(source);
  });

  it("returns null for invalid or unsupported payloads", () => {
    expect(decodeCodeFromUrlParam("c64.this-is-not-valid")).toBeNull();
    expect(decodeCodeFromUrlParam("xyz.value")).toBeNull();
    expect(decodeCodeFromUrlParam(null)).toBeNull();
  });
});
