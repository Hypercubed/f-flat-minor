import type { VirtualFiles } from "./runtime.ts";

const librarySources = import.meta.glob(
  ["../../../ff/lib/**/*.{ff,ffp}", "!../../../ff/lib/**/__tests__/**"],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
) as Record<string, string>;

function toVirtualLibraryPath(sourcePath: string): string {
  const marker = "/ff/lib/";
  const markerIndex = sourcePath.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Unexpected library source path: ${sourcePath}`);
  }

  return `/lib/${sourcePath.slice(markerIndex + marker.length)}`;
}

const LIBRARY_FILES: VirtualFiles = Object.fromEntries(
  Object.entries(librarySources).map(([path, source]) => [
    toVirtualLibraryPath(path),
    source,
  ]),
);

export function createReplVirtualFiles(source = "", filename = "/repl.ffp"): VirtualFiles {
  return {
    [filename]: source,
    ...LIBRARY_FILES,
  };
}
