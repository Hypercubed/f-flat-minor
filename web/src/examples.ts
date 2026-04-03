import factExample from "../../ff/fact.ffp?raw";
import fizzbuzzExample from "../../ff/fizzbuzz.ffp?raw";
import bottlesExample from "../../ff/99bottles.ffp?raw";
import pascalExample from "../../ff/pascal.ffp?raw";
import cbrtExample from "../../ff/cbrt.ffp?raw";
import sqrtExample from "../../ff/sqrt.ffp?raw";
import gcdExample from "../../ff/gcd.ffp?raw";
import ackExample from "../../ff/ack.ffp?raw";
import piExample from "../../ff/pi.ffp?raw";
import fibExample from "../../ff/fib.ffp?raw";
import catalanExample from "../../ff/catalan.ffp?raw";
import collatzExample from "../../ff/collatz.ffp?raw";
import hanoiExample from "../../ff/hanoi.ffp?raw";
import euler1Example from "../../ff/euler/euler1.ffp?raw";
import euler7Example from "../../ff/euler/euler7.ffp?raw";

import type { VirtualFiles } from "./runtime.ts";

interface ExampleEntry {
  path: string;
  label: string;
  source: string;
}

function toVirtualLibraryPath(sourcePath: string): string {
  const libraryRoot = "../../ff/lib/";

  if (!sourcePath.startsWith(libraryRoot)) {
    throw new Error(`Unexpected library source path: ${sourcePath}`);
  }

  return `/lib/${sourcePath.slice(libraryRoot.length)}`;
}

const EXAMPLE_ENTRIES: ExampleEntry[] = [
  { path: "/examples/fact.ffp", label: "fact.ffp", source: factExample },
  { path: "/examples/fizzbuzz.ffp", label: "fizzbuzz.ffp", source: fizzbuzzExample },
  { path: "/examples/99bottles.ffp", label: "99bottles.ffp", source: bottlesExample },
  { path: "/examples/pascal.ffp", label: "pascal.ffp", source: pascalExample },
  { path: "/examples/cbrt.ffp", label: "cbrt.ffp", source: cbrtExample },
  { path: "/examples/sqrt.ffp", label: "sqrt.ffp", source: sqrtExample },
  { path: "/examples/gcd.ffp", label: "gcd.ffp", source: gcdExample },
  { path: "/examples/ack.ffp", label: "ack.ffp", source: ackExample },
  { path: "/examples/pi.ffp", label: "pi.ffp", source: piExample },
  { path: "/examples/fib.ffp", label: "fib.ffp", source: fibExample },
  { path: "/examples/catalan.ffp", label: "catalan.ffp", source: catalanExample },
  { path: "/examples/collatz.ffp", label: "collatz.ffp", source: collatzExample },
  { path: "/examples/hanoi.ffp", label: "hanoi.ffp", source: hanoiExample },
  { path: "/examples/euler1.ffp", label: "euler1.ffp", source: euler1Example },
  { path: "/examples/euler7.ffp", label: "euler7.ffp", source: euler7Example },
];

const librarySources = import.meta.glob(
  ["../../ff/lib/**/*.{ff,ffp}", "!../../ff/lib/**/__tests__/**"],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
) as Record<string, string>;

const LIBRARY_FILES: VirtualFiles = Object.fromEntries(
  Object.entries(librarySources).map(([path, source]) => [
    toVirtualLibraryPath(path),
    source,
  ]),
);

export const EXAMPLES: Record<string, string> = Object.fromEntries(
  EXAMPLE_ENTRIES.map(({ path, source }) => [path, source]),
);

/** Sentinel value for the playground “Custom” row (not a real file path). */
export const CUSTOM_EXAMPLE_VALUE = "__custom__";

/** Path for the default starter snippet (`DEFAULT_SOURCE` / fact). */
export const DEFAULT_EXAMPLE_PATH = "/examples/fact.ffp";

export const EXAMPLE_OPTIONS_HTML = [
  ...EXAMPLE_ENTRIES.map(({ path, label }) => `<option value="${path}">${label}</option>`),
  `<option value="${CUSTOM_EXAMPLE_VALUE}">Custom</option>`,
].join("\n");

export const DEFAULT_SOURCE = factExample;

export function createVirtualFiles(source: string, filename = "/main.ffp"): VirtualFiles {
  return {
    [filename]: source,
    ...LIBRARY_FILES,
    ...EXAMPLES,
  };
}
