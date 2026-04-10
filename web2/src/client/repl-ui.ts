import { html, nothing, type TemplateResult } from "lit-html";
import type { ValueInspection } from "../../../typescript/core/src/engine.ts";
import type { StackItem } from "./repl-session.ts";

export function renderReplShell(): TemplateResult {
  return html`
    <section class="repl-layout">
      <div class="panel repl-pane">
        <div class="panel-header repl-pane-header">
          <div>
            <p class="eyebrow">REPL</p>
            <h2>Persistent session</h2>
          </div>
          <button id="repl-reset" class="ghost-button" type="button">Reset Session</button>
        </div>
        <div class="help-copy repl-help-copy">
          <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/prelude.ffp</code>.</p>
          <p>Special commands: <code>.reset</code>, <code>.clear</code>, <code>.exit</code>, <code>.quit</code>.</p>
        </div>
        <div class="repl-left-body">
          <section class="repl-stack-panel" aria-live="polite">
            <div class="repl-stack-head">
              <span>Stack monitor</span>
              <span id="repl-depth">depth: 0</span>
            </div>
            <ol id="repl-stack" class="repl-stack-list" aria-label="Current stack values"></ol>
          </section>

          <section class="repl-inspect-panel" id="repl-inspect">
            <div class="repl-inspect-header">
              <button id="repl-inspect-back" class="inspect-back" type="button" disabled>&larr; Back</button>
              <span class="inspect-title">Inspector</span>
              <button id="repl-inspect-close" class="inspect-close" type="button">X</button>
            </div>
            <div id="repl-inspect-content" class="repl-inspect-content">
              <div class="inspect-placeholder">Click a stack value to inspect</div>
            </div>
          </section>

          <label class="field repl-input-field" for="repl-command">
            <span>Command</span>
            <input id="repl-command" type="text" autocomplete="off" placeholder="Type code and press Enter" />
          </label>
          <div class="repl-hint">Tip: use ↑ and ↓ for command history.</div>
        </div>
      </div>

      <div class="panel repl-pane">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Console</p>
            <h2>Output & logs</h2>
          </div>
          <span id="repl-status" class="repl-status" aria-live="polite" hidden>
            <span class="repl-status-dot" aria-hidden="true"></span>
            Running...
          </span>
        </div>
        <pre id="repl-output" class="console repl-console"></pre>
      </div>
    </section>
  `;
}

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
