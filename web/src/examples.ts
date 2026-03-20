import ackLib from "../../ff/lib/ack.ffp?raw";
import atanLib from "../../ff/lib/atan.ffp?raw";
import cbrtLib from "../../ff/lib/cbrt.ffp?raw";
import coreLib from "../../ff/lib/core.ff?raw";
import gcdLib from "../../ff/lib/gcd.ffp?raw";
import primesEncoded from "../../ff/lib/primes-encoded.ff?raw";
import primesLib from "../../ff/lib/primes.ffp?raw";
import seqLib from "../../ff/lib/seq.ffp?raw";
import sqrtLib from "../../ff/lib/sqrt.ffp?raw";
import testingLib from "../../ff/lib/testing.ffp?raw";

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

const LIBRARY_FILES = {
  "/lib/ack.ffp": ackLib,
  "/lib/atan.ffp": atanLib,
  "/lib/cbrt.ffp": cbrtLib,
  "/lib/core.ff": coreLib,
  "/lib/gcd.ffp": gcdLib,
  "/lib/primes-encoded.ff": primesEncoded,
  "/lib/primes.ffp": primesLib,
  "/lib/seq.ffp": seqLib,
  "/lib/sqrt.ffp": sqrtLib,
  "/lib/testing.ffp": testingLib
} satisfies VirtualFiles;

export const EXAMPLES: Record<string, string> = Object.fromEntries(
  EXAMPLE_ENTRIES.map(({ path, source }) => [path, source]),
);

export const EXAMPLE_OPTIONS_HTML = EXAMPLE_ENTRIES
  .map(({ path, label }) => `<option value="${path}">${label}</option>`)
  .join("\n");

export const DEFAULT_SOURCE = factExample;

export function createVirtualFiles(source: string, filename = "/main.ffp"): VirtualFiles {
  return {
    [filename]: source,
    ...LIBRARY_FILES,
    ...EXAMPLES,
  };
}
