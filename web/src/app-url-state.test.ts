import { describe, expect, it } from "vitest";

import {
  buildAppUrl,
  getMergedAppSearchParams,
  getSearchStringForStateMerge,
  parseAppTab,
  parseCodettaEtudeParam,
} from "./app-url-state.ts";

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
      etudeParam: null,
    })).toBe("/app#playground?foo=bar&code=txt.dup");
  });

  it("keeps the example param on the playground tab when there is no custom code", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar",
      tab: "playground",
      codeParam: null,
      exampleParam: "/examples/fact.ffp",
      etudeParam: null,
    })).toBe("/app#playground?foo=bar&example=%2Fexamples%2Ffact.ffp");
  });

  it("drops example when code param is set", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&example=%2Fexamples%2Ffib.ffp",
      tab: "playground",
      codeParam: "txt.dup",
      exampleParam: null,
      etudeParam: null,
    })).toBe("/app#playground?foo=bar&code=txt.dup");
  });

  it("removes the code param on non-playground tabs", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&code=txt.dup",
      tab: "help",
      codeParam: "txt.swap",
      exampleParam: null,
      etudeParam: null,
    })).toBe("/app#help?foo=bar");
  });

  it("removes the example param on non-playground tabs", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&example=%2Fexamples%2Ffact.ffp",
      tab: "help",
      codeParam: null,
      exampleParam: "/examples/fact.ffp",
      etudeParam: null,
    })).toBe("/app#help?foo=bar");
  });

  it("removes the code param for an empty playground source", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?code=txt.dup",
      tab: "playground",
      codeParam: null,
      exampleParam: null,
      etudeParam: null,
    })).toBe("/app#playground");
  });

  it("writes the codetta param on the codetta tab", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar",
      tab: "codetta",
      codeParam: null,
      exampleParam: null,
      etudeParam: "fib",
    })).toBe("/app#codetta?foo=bar&codetta=fib");
  });

  it("removes codetta and legacy etude params outside codetta or when clearing the selection", () => {
    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&codetta=fib&etude=old-fib",
      tab: "codetta",
      codeParam: null,
      exampleParam: null,
      etudeParam: null,
    })).toBe("/app#codetta?foo=bar");

    expect(buildAppUrl({
      pathname: "/app",
      search: "?foo=bar&codetta=fib&etude=old-fib",
      tab: "help",
      codeParam: null,
      exampleParam: null,
      etudeParam: "fib",
    })).toBe("/app#help?foo=bar");
  });

  it("merges codetta from the hash query over the path query", () => {
    expect(getSearchStringForStateMerge({
      hash: "#codetta?codetta=fib&foo=baz",
      search: "?foo=bar",
    } as Pick<Location, "hash" | "search">)).toBe("?foo=baz&codetta=fib");
  });

  it("parses merged search params from the path and hash", () => {
    const params = getMergedAppSearchParams({
      hash: "#codetta?codetta=fib&foo=baz",
      search: "?foo=bar&worker=1",
    } as Pick<Location, "hash" | "search">);

    expect(params.get("foo")).toBe("baz");
    expect(params.get("worker")).toBe("1");
    expect(params.get("codetta")).toBe("fib");
  });

  it("parses the codetta deep link only on the codetta tab", () => {
    expect(parseCodettaEtudeParam({
      hash: "#codetta?codetta=fib",
      search: "",
    } as Pick<Location, "hash" | "search">)).toBe("fib");

    expect(parseCodettaEtudeParam({
      hash: "#help?codetta=fib",
      search: "",
    } as Pick<Location, "hash" | "search">)).toBeNull();
  });

  it("accepts legacy etude deep links for codetta", () => {
    expect(parseCodettaEtudeParam({
      hash: "#codetta?etude=fib",
      search: "",
    } as Pick<Location, "hash" | "search">)).toBe("fib");
  });

  it("prefers codetta over legacy etude when both are present", () => {
    expect(parseCodettaEtudeParam({
      hash: "#codetta?codetta=fizzbuzz&etude=fib",
      search: "",
    } as Pick<Location, "hash" | "search">)).toBe("fizzbuzz");
  });
});
