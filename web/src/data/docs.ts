import { getCollection, type CollectionEntry } from "astro:content";

export type DocsEntry = CollectionEntry<"docs">;

export interface DocsSidebarGroup {
  id: "manual" | "reference";
  label: string;
  entries: DocsEntry[];
}

const docsBasePath = "/reference/";
const sidebarGroupOrder: Array<DocsSidebarGroup["id"]> = ["manual", "reference"];
const sidebarGroupLabels: Record<DocsSidebarGroup["id"], string> = {
  manual: "Manual",
  reference: "Reference",
};

function getOrder(entry: DocsEntry): number {
  return entry.data.order ?? 100;
}

export function getDocsSlug(entry: DocsEntry): string {
  const withoutExtension = entry.id.replace(/\.md$/, "");
  return withoutExtension === "index" ? "" : withoutExtension.replace(/\/index$/, "");
}

export function getDocsRoutePath(entry: DocsEntry): string {
  const slug = getDocsSlug(entry);
  return slug ? `${docsBasePath}${slug}/` : docsBasePath;
}

function compareDocsEntries(a: DocsEntry, b: DocsEntry): number {
  if (getOrder(a) !== getOrder(b)) {
    return getOrder(a) - getOrder(b);
  }

  if (getDocsSlug(a) === "") {
    return -1;
  }

  if (getDocsSlug(b) === "") {
    return 1;
  }

  return a.data.title.localeCompare(b.data.title);
}

export async function getSortedDocsEntries(): Promise<DocsEntry[]> {
  const entries = await getCollection("docs");
  return entries.sort(compareDocsEntries);
}

export async function getDocsSidebarGroups(): Promise<DocsSidebarGroup[]> {
  const entries = (await getSortedDocsEntries()).filter((entry) => entry.data.showInSidebar !== false);

  return sidebarGroupOrder
    .map((groupId) => ({
      id: groupId,
      label: sidebarGroupLabels[groupId],
      entries: entries.filter((entry) => (entry.data.section ?? "reference") === groupId),
    }))
    .filter((group) => group.entries.length > 0);
}
