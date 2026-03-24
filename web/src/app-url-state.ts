export const APP_TABS = ["playground", "repl", "tutorial", "help"] as const;

export type AppTab = typeof APP_TABS[number];

const APP_TAB_SET = new Set<string>(APP_TABS);

export function parseAppTab(value: string | null | undefined): AppTab {
  const normalized = value
    ?.replace(/^#/, "")
    .trim()
    .toLowerCase();

  if (normalized && APP_TAB_SET.has(normalized)) {
    return normalized as AppTab;
  }

  return "playground";
}

export function buildAppUrl(options: {
  pathname: string;
  search: string;
  tab: AppTab;
  codeParam: string | null;
}): string {
  const params = new URLSearchParams(options.search);

  if (options.tab === "playground" && options.codeParam) {
    params.set("code", options.codeParam);
  } else {
    params.delete("code");
  }

  const query = params.toString();
  return `${options.pathname}${query ? `?${query}` : ""}#${options.tab}`;
}
