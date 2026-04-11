import factExample from "../../../ff/fact.ffp?raw";

import type { VirtualFiles } from "./runtime.ts";

interface ExampleEntry {
  path: string;
  label: string;
  source: string;
}

const HIDDEN_EULER_EXAMPLE_PATHS = new Set([
  "../../../ff/euler/euler4.ffp",
  "../../../ff/euler/euler10.ffp",
  "../../../ff/euler/euler14.ffp",
  "../../../ff/euler/euler46.ffp",
]);

function toVirtualLibraryPath(sourcePath: string): string {
  const marker = "/ff/lib/";
  const markerIndex = sourcePath.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Unexpected library source path: ${sourcePath}`);
  }

  return `/lib/${sourcePath.slice(markerIndex + marker.length)}`;
}

const eulerExampleSources = import.meta.glob("../../../ff/euler/*.ffp", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const exampleSources = import.meta.glob("../../../ff/examples/*.ffp", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function eulerExampleSortKey(vitePath: string): [number, string] {
  const base = vitePath.split("/").pop() ?? vitePath;
  const match = /^euler(\d+)\.ffp$/.exec(base);
  if (match) {
    return [Number(match[1]), base];
  }
  return [Number.POSITIVE_INFINITY, base];
}

const EULER_EXAMPLE_ENTRIES: ExampleEntry[] = Object.entries(eulerExampleSources)
  .filter(([vitePath]) => !HIDDEN_EULER_EXAMPLE_PATHS.has(vitePath))
  .sort((a, b) => {
    const ka = eulerExampleSortKey(a[0]);
    const kb = eulerExampleSortKey(b[0]);
    if (ka[0] !== kb[0]) {
      return ka[0] - kb[0];
    }
    return ka[1].localeCompare(kb[1]);
  })
  .map(([vitePath, source]) => ({
    path: examplePath(vitePath),
    label: exampleLabel(vitePath),
    source,
  }));

const ROOT_EXAMPLE_ENTRIES: ExampleEntry[] = Object.entries(exampleSources)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([vitePath, source]) => ({
    path: examplePath(vitePath),
    label: exampleName(vitePath),
    source,
  }));

function examplePath(globKey: string): string {
  const slash = globKey.lastIndexOf("/");
  const name = slash >= 0 ? globKey.slice(slash + 1) : globKey;
  return `/examples/${name}`;
}

function exampleLabel(globKey: string): string {
  const marker = "/ff/";
  const index = globKey.indexOf(marker);
  const relative = index >= 0 ? globKey.slice(index + marker.length) : globKey;
  return relative;
}

function exampleName(globKey: string): string {
  const slash = globKey.lastIndexOf("/");
  return slash >= 0 ? globKey.slice(slash + 1) : globKey;
}

export const EXAMPLE_ENTRIES: ExampleEntry[] = [
  { path: "/examples/fact.ffp", label: "fact.ffp", source: factExample },
  ...ROOT_EXAMPLE_ENTRIES,
  ...EULER_EXAMPLE_ENTRIES,
];

const librarySources = import.meta.glob(
  ["../../../ff/lib/**/*.{ff,ffp}", "!../../../ff/lib/**/__tests__/**"],
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

export const CUSTOM_EXAMPLE_VALUE = "__custom__";
export const DEFAULT_EXAMPLE_PATH = "/examples/fact.ffp";
export const DEFAULT_SOURCE = factExample;

export function createVirtualFiles(source: string, filename = "/main.ffp"): VirtualFiles {
  return {
    [filename]: source,
    ...LIBRARY_FILES,
    ...EXAMPLES,
  };
}
