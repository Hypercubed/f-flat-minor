export function syncSubtabActiveState(
  tabs: readonly HTMLButtonElement[],
  panels: readonly HTMLElement[],
  activeName: string,
  readTabName: (tab: HTMLButtonElement) => string | undefined,
  readPanelName: (panel: HTMLElement) => string | undefined,
): void {
  for (const tab of tabs) {
    tab.classList.toggle("is-active", readTabName(tab) === activeName);
  }
  for (const panel of panels) {
    panel.classList.toggle("is-active", readPanelName(panel) === activeName);
  }
}

export function syncDetailFooterActiveState(
  footers: readonly HTMLElement[],
  activeName: string,
): void {
  for (const footer of footers) {
    const footerTabs = `${footer.dataset.detailFooter ?? ""} ${footer.dataset.codettaDetailFooter ?? ""}`
      .trim()
      .split(/\s+/);
    footer.hidden = !footerTabs.includes(activeName);
  }
}
