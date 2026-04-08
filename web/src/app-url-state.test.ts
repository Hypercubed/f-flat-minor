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
    expect(parseAppTab("#playground?code=txt.dup")).toBe("playground");
    expect(parseAppTab("#repl")).toBe("repl");
    expect(parseAppTab("#codetta")).toBe("codetta");
    expect(parseAppTab("tutorial")).toBe("tutorial");
    expect(parseAppTab(" HELP ")).toBe("help");
  });

  it("keeps the code param on the playground tab", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar",
      tab: "playground",
      codeParam: "txt.dup",
      exampleParam: null,
    })).toBe("/app#playground?foo=bar&code=txt.dup");
  });

  it("keeps the example param on the playground tab when there is no custom code", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar",
      tab: "playground",
      codeParam: null,
      exampleParam: "/examples/fact.ffp",
    })).toBe("/app#playground?foo=bar&example=%2Fexamples%2Ffact.ffp");
  });

  it("drops example when code param is set", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&example=%2Fexamples%2Ffib.ffp",
      tab: "playground",
      codeParam: "txt.dup",
      exampleParam: null,
    })).toBe("/app#playground?foo=bar&code=txt.dup");
  });

  it("removes the code param on non-playground tabs", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&code=txt.dup",
      tab: "help",
      codeParam: "txt.swap",
      exampleParam: null,
    })).toBe("/app#help?foo=bar");
  });

  it("removes the example param on non-playground tabs", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&example=%2Fexamples%2Ffact.ffp",
      tab: "help",
      codeParam: null,
      exampleParam: "/examples/fact.ffp",
    })).toBe("/app#help?foo=bar");
  });

  it("removes the code param for an empty playground source", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?code=txt.dup",
      tab: "playground",
      codeParam: null,
      exampleParam: null,
    })).toBe("/app#playground");
  });
});
