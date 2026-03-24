import { describe, expect, it } from "vitest";

import { buildAppUrl, parseAppTab } from "./app-url-state.ts";

describe("app-url-state", () => {
  it("defaults to playground when the hash is missing or unknown", () => {
    expect(parseAppTab("")).toBe("playground");
    expect(parseAppTab(null)).toBe("playground");
    expect(parseAppTab("#unknown")).toBe("playground");
  });

  it("parses known tabs from hashes and raw names", () => {
    expect(parseAppTab("#playground")).toBe("playground");
    expect(parseAppTab("#repl")).toBe("repl");
    expect(parseAppTab("tutorial")).toBe("tutorial");
    expect(parseAppTab(" HELP ")).toBe("help");
  });

  it("keeps the code param on the playground tab", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar",
      tab: "playground",
      codeParam: "txt.dup",
    })).toBe("/app?foo=bar&code=txt.dup#playground");
  });

  it("removes the code param on non-playground tabs", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&code=txt.dup",
      tab: "help",
      codeParam: "txt.swap",
    })).toBe("/app?foo=bar#help");
  });

  it("removes the code param for an empty playground source", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?code=txt.dup",
      tab: "playground",
      codeParam: null,
    })).toBe("/app#playground");
  });
});
