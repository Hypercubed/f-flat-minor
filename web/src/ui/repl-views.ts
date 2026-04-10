import { html, nothing, type TemplateResult } from "lit-html";
import type { ValueInspection } from "../../../typescript/core/src/engine.ts";
import type { StackItem } from "../repl-session.ts";

export function replStackListTemplate(stack: StackItem[]): TemplateResult {
  if (!stack.length) {
    return html`<li class="repl-stack-empty">(empty stack)</li>`;
  }

  return html`${stack.map(
    (item) => html`
      <li class="repl-stack-row" data-value="${item.value}">
        <span class="repl-stack-index">${item.index}:</span>
        <code class="repl-stack-value">${item.value}</code>
      </li>
    `,
  )}`;
}

export function replInspectContentTemplate(info: ValueInspection): TemplateResult {
  const isQuote = !info.name && info.value > 255n;

  const definitionSection =
    info.definition && info.definition.length > 0
      ? html`
          <div class="inspect-label">Definition:</div>
          <div class="inspect-definition">
            ${info.definition.map((token) => {
              const display = token.name ?? String(token.value);
              const tokenClass = token.isCall ? "token-call" : "token-literal";
              const inspectable = token.isCall || token.isDefined ? "inspectable" : "";
              const title = token.isCall || token.isDefined ? "Click to inspect" : "Literal value";
              return html`
                <span
                  class="inspect-token ${tokenClass} ${inspectable}"
                  data-value="${String(token.value)}"
                  title="${title}"
                >${display}</span>
              `;
            })}
          </div>
        `
      : !info.isSystem && !info.isDefined
        ? html`<div class="inspect-note">Plain value (not a word)</div>`
        : nothing;

  return html`
    <div class="inspect-header">
      <code class="inspect-value">${String(info.value)}</code>
      ${info.name
        ? html`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${info.name}</span>`
        : nothing}
      ${info.isSystem
        ? html`<span class="inspect-tag system">system</span>`
        : info.isDefined
          ? html`<span class="inspect-tag ${isQuote ? "quote" : "user"}">${isQuote ? "quote" : "user-defined"}</span>`
          : nothing}
    </div>
    ${info.isSystem && (info.stackEffect || info.description)
      ? html`
          <div class="inspect-vocabulary">
            ${info.stackEffect
              ? html`<div class="inspect-stack-effect"><code>${info.stackEffect}</code></div>`
              : nothing}
            ${info.description
              ? html`<div class="inspect-description">${info.description}</div>`
              : nothing}
          </div>
        `
      : nothing}
    ${definitionSection}
  `;
}
