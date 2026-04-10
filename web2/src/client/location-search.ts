export function getSearchStringForStateMerge(location: Pick<Location, "hash" | "search">): string {
  const merged = new URLSearchParams(location.search.replace(/^\?/, ""));
  const hash = location.hash;
  const q = hash.indexOf("?");

  if (q !== -1) {
    const fromHash = new URLSearchParams(hash.slice(q + 1));

    for (const [key, value] of fromHash) {
      merged.set(key, value);
    }
  }

  const s = merged.toString();
  return s ? `?${s}` : "";
}

export function getCurrentSearchString(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return getSearchStringForStateMerge(window.location);
}
