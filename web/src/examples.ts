import factExample from "../../ff/fact.ffp?raw";
import cbrtExample from "../../ff/cbrt.ffp?raw";
import sqrtExample from "../../ff/sqrt.ffp?raw";
import gcdExample from "../../ff/gcd.ffp?raw";
import ackExample from "../../ff/ack.ffp?raw";
import piExample from "../../ff/pi.ffp?raw";

import type { VirtualFiles } from "./runtime.ts";

interface ExampleEntry {
  path: string;
  label: string;
  source: string;
}

const HIDDEN_EULER_EXAMPLE_PATHS = new Set([
  "../../ff/euler/euler4.ffp",
  "../../ff/euler/euler10.ffp",
  "../../ff/euler/euler14.ffp",
  "../../ff/euler/euler46.ffp",
]);

function toVirtualLibraryPath(sourcePath: string): string {
  const libraryRoot = "../../ff/lib/";

  if (!sourcePath.startsWith(libraryRoot)) {
    throw new Error(`Unexpected library source path: ${sourcePath}`);
  }

  return `/lib/${sourcePath.slice(libraryRoot.length)}`;
}

const eulerExampleSources = import.meta.glob("../../ff/euler/*.ffp", {
    eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function eulerExampleSortKey(vitePath: string): [number, string] {
  const base = vitePath.split("/").pop() ?? vitePath;
  const match = /^euler(\d+)\.ffp$/.exec(base);
  if (match) return [Number(match[1]), base];
  return [Number.POSITIVE_INFINITY, base];
}

const EULER_EXAMPLE_ENTRIES: ExampleEntry[] = Object.entries(eulerExampleSources)
  .filter(([vitePath]) => !HIDDEN_EULER_EXAMPLE_PATHS.has(vitePath))
  .sort((a, b) => {
    const ka = eulerExampleSortKey(a[0]);
    const kb = eulerExampleSortKey(b[0]);
    if (ka[0] !== kb[0]) return ka[0] - kb[0];
    return ka[1].localeCompare(kb[1]);
  })
  .map(([vitePath, source]) => {
    return {
      path: examplePath(vitePath),
      label: exampleLabel(vitePath),
      source
    };
  });

function examplePath(globKey: string): string {
  const slash = globKey.lastIndexOf("/");
  const name = slash >= 0 ? globKey.slice(slash + 1) : globKey;
  return `/examples/${name}`;
}

function exampleLabel(globKey: string): string {
  const ffIndex = globKey.indexOf("../../ff/");
  const relative = ffIndex >= 0 ? globKey.slice(ffIndex + "../../ff/".length) : globKey;
  return relative;
}

const EXAMPLE_ENTRIES: ExampleEntry[] = [
  { path: "/examples/fact.ffp", label: "fact.ffp", source: factExample },
  { path: "/examples/cbrt.ffp", label: "cbrt.ffp", source: cbrtExample },
  { path: "/examples/sqrt.ffp", label: "sqrt.ffp", source: sqrtExample },
  { path: "/examples/gcd.ffp", label: "gcd.ffp", source: gcdExample },
  { path: "/examples/ack.ffp", label: "ack.ffp", source: ackExample },
  { path: "/examples/pi.ffp", label: "pi.ffp", source: piExample },
  ...EULER_EXAMPLE_ENTRIES,
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
