import { describe, expect, it } from "vitest";

import { ReplSession } from "./repl-session.ts";

describe("ReplSession", () => {
  it("keeps prelude words available after reset", () => {
    const session = new ReplSession();

    expect(session.execute("space").stack.map(({ value }) => value)).toEqual(["32"]);

    expect(session.execute(".reset")).toMatchObject({
      output: "Session reset. Prelude reloaded.",
      clearTranscript: true,
    });

    expect(session.execute("space").stack.map(({ value }) => value)).toEqual(["32"]);
  });
});
