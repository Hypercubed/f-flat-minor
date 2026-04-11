import { html, nothing, type TemplateResult } from "lit-html";

export type SummaryTone = "default" | "success" | "error" | "running" | "pending";

export interface SummaryBarItem {
  label: string;
  value: string;
  tone?: SummaryTone;
  showDot?: boolean;
}

export function renderSummaryBar(items: SummaryBarItem[]): TemplateResult {
  return html`${items.map(
    (item) => html`
      <span class="summary-bar-item">
        <span class="label">${item.label}</span>
        <span class="value${item.tone && item.tone !== "default" ? ` ${item.tone}` : ""}">
          ${item.showDot ? html`<span class="summary-running-dot" aria-hidden="true"></span>` : nothing}
          ${item.value}
        </span>
      </span>
    `,
  )}`;
}
