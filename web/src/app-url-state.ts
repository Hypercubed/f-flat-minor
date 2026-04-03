export const APP_TABS = ["playground", "repl", "tutorial", "help"] as const;

export type AppTab = typeof APP_TABS[number];

const APP_TAB_SET = new Set<string>(APP_TABS);

export function parseAppTab(value: string | null | undefined): AppTab {
  const beforeQuery = value?.replace(/^#/, "").split("?")[0]?.trim().toLowerCase() ?? "";

  if (beforeQuery && APP_TAB_SET.has(beforeQuery)) {
    return beforeQuery as AppTab;
  }

  return "playground";
}

/**
 * Merged query string for app state: path `?…` plus `#tab?…` fragment (fragment keys override path).
 * Used when building URLs and when reading `code` / `example` / e.g. `worker`.
 */
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

/** Query key for loading a bundled playground example by path (e.g. `/examples/fact.ffp`). */
export const EXAMPLE_QUERY_PARAM = "example";

export function buildAppUrl(options: {
  pathname: string;
  search: string;
  tab: AppTab;
  codeParam: string | null;
  /** When set (playground only), shareable example path; omitted when `codeParam` is set. */
  exampleParam: string | null;
}): string {
  const params = new URLSearchParams(options.search);

  if (options.tab === "playground") {
    if (options.codeParam) {
      params.set("code", options.codeParam);
      params.delete(EXAMPLE_QUERY_PARAM);
    } else if (options.exampleParam) {
      params.delete("code");
      params.set(EXAMPLE_QUERY_PARAM, options.exampleParam);
    } else {
      params.delete("code");
      params.delete(EXAMPLE_QUERY_PARAM);
    }
  } else {
    params.delete("code");
    params.delete(EXAMPLE_QUERY_PARAM);
  }

  const query = params.toString();
  return `${options.pathname}#${options.tab}${query ? `?${query}` : ""}`;
}
