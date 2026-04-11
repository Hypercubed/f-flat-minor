export const APP_TABS = ["playground", "repl", "codetta", "tutorial", "help", "reference"] as const;

export type AppTab = typeof APP_TABS[number];

const APP_TAB_SET = new Set<string>(APP_TABS);
const TAB_ROUTE_PATHS: Record<AppTab, string> = {
  playground: "/playground/",
  repl: "/repl/",
  codetta: "/codettas/",
  tutorial: "/tutorial/",
  help: "/reference/",
  reference: "/reference/",
};
const SITE_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalizedPath}`;
}

export function parseAppTab(value: string | null | undefined): AppTab {
  const beforeQuery = value?.replace(/^#/, "").split("?")[0]?.trim().toLowerCase() ?? "";

  if (beforeQuery && APP_TAB_SET.has(beforeQuery)) {
    return beforeQuery as AppTab;
  }

  return "playground";
}

export function hasLegacyHashTab(value: string | null | undefined): boolean {
  const beforeQuery = value?.replace(/^#/, "").split("?")[0]?.trim().toLowerCase() ?? "";
  return beforeQuery.length > 0 && APP_TAB_SET.has(beforeQuery);
}

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

export function getMergedRouteSearchParams(location: Pick<Location, "hash" | "search">): URLSearchParams {
  return new URLSearchParams(getSearchStringForStateMerge(location).replace(/^\?/, ""));
}

export function getCurrentSearchString(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return getSearchStringForStateMerge(window.location);
}

function normalizeParamsForTab(tab: AppTab, params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);

  if (tab !== "playground") {
    next.delete("code");
    next.delete("example");
  }

  if (tab !== "codetta") {
    next.delete("codetta");
    next.delete("etude");
  } else {
    const legacyEtude = next.get("etude");
    if (!next.has("codetta") && legacyEtude) {
      next.set("codetta", legacyEtude);
    }
    next.delete("etude");
  }

  return next;
}

export function getLegacyRouteRedirectUrl(
  location: Pick<Location, "hash" | "search" | "pathname">,
): string | null {
  if (!hasLegacyHashTab(location.hash)) {
    return null;
  }

  const tab = parseAppTab(location.hash);
  const params = normalizeParamsForTab(tab, getMergedRouteSearchParams(location));
  const targetPathname = withBasePath(TAB_ROUTE_PATHS[tab]);
  const query = params.toString();
  const targetUrl = `${targetPathname}${query ? `?${query}` : ""}`;
  const currentUrl = `${location.pathname}${location.search}`;

  return targetUrl === currentUrl ? null : targetUrl;
}
