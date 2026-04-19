import * as vscode from "vscode";

export interface TraceQueueToken {
  tag: "literal" | "call";
  value: string;
  action: string;
}

export interface TraceStep {
  step: number;
  immediate: boolean;
  tag: "literal" | "call";
  value: string;
  action: string;
  stackBefore: string[];
  stackAfter: string[];
  queuePreview: TraceQueueToken[];
  queueDepth: number;
  /** Program stdout written during this VM step (PRN, PUTC, PUTN), when the runtime records it. */
  stdoutSinceLast?: string;
}

export interface TraceRun {
  fileName: string;
  optimized: boolean;
  ir: string;
  programOutput: string;
  stderr: string;
  exitCode: number;
  steps: TraceStep[];
}

function escapeScriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function createNonce(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let index = 0; index < 32; index++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}

export function getTraceViewerHtml(webview: vscode.Webview, run: TraceRun): string {
  const nonce = createNonce();
  const csp = [
    "default-src 'none'",
    `img-src ${webview.cspSource} https: data:`,
    `style-src ${webview.cspSource} 'nonce-${nonce}'`,
    `script-src 'nonce-${nonce}'`,
  ].join("; ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="${csp}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>F-flat-minor Trace Viewer</title>
  <style nonce="${nonce}">
    :root {
      color-scheme: light dark;
      --border: var(--vscode-panel-border, rgba(128, 128, 128, 0.35));
      --muted: var(--vscode-descriptionForeground, #888);
      --font-mono: var(--vscode-editor-font-family, monospace);
      --code-bg: var(--vscode-textCodeBlock-background, rgba(127, 127, 127, 0.12));
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
      margin: 0;
    }

    body {
      font-family: var(--vscode-font-family);
      font-size: 13px;
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      overflow: hidden;
    }

    button,
    input {
      font: inherit;
    }

    button {
      border: 1px solid var(--vscode-button-border, var(--vscode-contrastBorder, var(--border)));
      color: var(--vscode-button-secondaryForeground, var(--vscode-foreground));
      background: var(--vscode-button-secondaryBackground, var(--vscode-editor-background));
      padding: 3px 8px;
      border-radius: 2px;
      cursor: pointer;
      min-width: 2rem;
    }

    button:hover:not(:disabled) {
      color: var(--vscode-button-secondaryForeground, var(--vscode-foreground));
      background: var(
        --vscode-button-secondaryHoverBackground,
        var(--vscode-toolbar-hoverBackground, var(--vscode-list-hoverBackground))
      );
    }

    button:active:not(:disabled) {
      background: var(
        --vscode-toolbar-activeBackground,
        var(--vscode-button-secondaryHoverBackground, var(--vscode-list-activeBackground))
      );
    }

    button:focus-visible {
      outline: 1px solid var(--vscode-focusBorder, var(--border));
      outline-offset: 1px;
    }

    button:disabled {
      cursor: default;
      opacity: 0.45;
    }

    input[type="range"] {
      flex: 1 1 120px;
      min-width: 80px;
    }

    input[type="number"] {
      width: 4.5rem;
      padding: 3px 6px;
      border: 1px solid var(--border);
      border-radius: 3px;
      color: inherit;
      background: var(--vscode-input-background);
    }

    .app {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 100vh;
      overflow: hidden;
    }

    .app-top-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      border-bottom: 1px solid var(--border);
      background: var(--vscode-editor-background);
    }

    .run-context {
      padding: 8px 14px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      min-width: 0;
    }

    .app-top-bar-actions {
      flex-shrink: 0;
      padding-inline-end: 8px;
    }

    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      height: 2rem;
      padding: 0 6px;
      font-size: 14px;
      line-height: 1;
    }

    .options-backdrop {
      position: fixed;
      inset: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.28);
    }

    .options-panel {
      position: fixed;
      top: 44px;
      right: 10px;
      z-index: 100;
      width: min(340px, calc(100vw - 20px));
      max-height: min(72vh, 440px);
      overflow: auto;
      padding: 12px 14px 14px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--vscode-editor-background);
      box-shadow: 0 6px 28px rgba(0, 0, 0, 0.22);
    }

    .options-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 12px;
    }

    .options-panel-title {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
    }

    .options-panel .options-close {
      min-width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      font-size: 12px;
    }

    .options-field {
      margin-bottom: 14px;
    }

    .options-field label {
      display: block;
      margin-bottom: 6px;
      color: var(--vscode-foreground);
    }

    .options-field input[type="number"] {
      width: 100%;
      max-width: 8rem;
    }

    .options-field .options-hint {
      display: block;
      margin-top: 6px;
      font-size: 11px;
      color: var(--muted);
    }

    .options-field--inline label {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 0;
      cursor: pointer;
    }

    .options-field--inline input[type="checkbox"] {
      margin-top: 2px;
      flex-shrink: 0;
    }

    .options-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 4px;
      padding-top: 10px;
      border-top: 1px solid var(--border);
    }

    .hidden {
      display: none !important;
    }

    .scrubber {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 12px;
      padding: 8px 14px 10px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      background: var(--vscode-editor-background);
    }

    .scrubber-btns {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
    }

    #play-button {
      margin-inline-start: 10px;
    }

    .scrubber-slider {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1 1 200px;
      min-width: min(100%, 200px);
    }

    .scrubber-idx {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      white-space: nowrap;
    }

    .main-scroll {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .main {
      display: flex;
      flex-direction: column;
      min-height: 0;
      flex: 1;
      overflow: hidden;
      align-items: stretch;
    }

    .col {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      flex: 1;
    }

    .trace-col {
      min-height: 0;
    }

    .trace-panels-with-ir {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-height: 0;
      min-width: 0;
      align-items: stretch;
    }

    .trace-panels-scroll {
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: auto;
      overflow-x: hidden;
    }

    .trace-panels-with-ir.main--ir-collapsed .ir-sidebar {
      flex: 0 0 1.375rem;
      width: 1.375rem;
      min-width: 1.375rem;
      max-width: 1.375rem;
    }

    .trace-panels-with-ir.main--ir-expanded .ir-sidebar {
      flex: 0 0 clamp(12rem, 30vw, 28rem);
      min-width: 12rem;
      max-width: 28rem;
    }

    .ir-sidebar {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      border-left: 1px solid var(--border);
      background: var(--vscode-sideBar-background, var(--vscode-editor-background));
    }

    .ir-rail {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      flex: 1;
      align-self: stretch;
      min-height: 4rem;
      width: 100%;
      margin: 0;
      padding-block: 6px 4px;
      padding-inline: 0;
      text-align: center;
      appearance: none;
      -webkit-appearance: none;
      border: none;
      font: inherit;
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      line-height: 1.15;
      color: var(--muted);
      background: var(--vscode-sideBar-background, var(--vscode-editor-background));
      cursor: pointer;
    }

    .ir-rail:hover {
      color: var(--vscode-foreground);
      background: var(--vscode-list-hoverBackground, rgba(127, 127, 127, 0.12));
    }

    .ir-rail-icon {
      font-size: 12px;
      line-height: 1;
      opacity: 0.85;
      flex-shrink: 0;
    }

    .ir-rail-word {
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: clip;
    }

    .trace-panels-with-ir.main--ir-collapsed .ir-rail {
      display: flex;
    }

    .ir-sidebar-inner {
      display: none;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    }

    .trace-panels-with-ir.main--ir-expanded .ir-sidebar-inner {
      display: flex;
    }

    .ir-sidebar-header {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 6px 10px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      background: var(--vscode-sideBar-background, var(--vscode-editor-background));
    }

    .ir-sidebar-title {
      flex-shrink: 0;
    }

    #ir-note {
      font-weight: 400;
      text-transform: none;
      letter-spacing: 0;
      color: var(--muted);
      font-size: 10px;
    }

    .ir-collapse-btn {
      flex-shrink: 0;
      padding: 2px 8px;
      font-size: 11px;
      min-width: unset;
      color: var(--muted);
      background: transparent;
      border-color: transparent;
    }

    .ir-collapse-btn:hover:not(:disabled) {
      color: var(--vscode-foreground);
      background: var(--vscode-toolbar-hoverBackground, var(--vscode-list-hoverBackground));
      border-color: var(--vscode-button-border, transparent);
    }

    .ir-header-note {
      flex: 1;
      min-width: 0;
      text-align: end;
    }

    .col-h {
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
    }

    .scroll-fill {
      min-height: 4rem;
    }

    .ir-pane {
      flex: 1;
      min-height: 0;
      overflow: auto;
      background: var(--vscode-sideBar-background, var(--code-bg));
      color: var(--vscode-descriptionForeground, var(--vscode-foreground));
    }

    .ir-line {
      display: grid;
      grid-template-columns: 2rem 1fr;
      gap: 6px;
      padding: 1px 8px;
      white-space: pre-wrap;
      font-family: var(--font-mono);
      font-size: 10px;
      line-height: 1.4;
      opacity: 0.95;
    }

    .ir-line-number {
      color: var(--muted);
      text-align: right;
      user-select: none;
      opacity: 0.75;
    }

    .trace-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .trace-step-meta {
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      min-height: 2.25rem;
      border-bottom: 1px solid var(--border);
      background: var(--vscode-editor-background);
    }

    .trace-step-meta:empty {
      display: none;
      padding: 0;
      min-height: 0;
      border-bottom: none;
    }

    .meta-chip {
      display: inline-flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
      border: 1px solid var(--border);
      user-select: none;
    }

    .meta-chip--immediate {
      color: var(--vscode-gitDecoration-addedResourceForeground, var(--vscode-foreground));
      background: var(--vscode-diffEditor-insertedTextBackground, rgba(80, 200, 120, 0.18));
      border-color: transparent;
    }

    .meta-chip--queued {
      color: var(--vscode-descriptionForeground);
      background: var(--vscode-textCodeBlock-background, rgba(127, 127, 127, 0.12));
    }

    .meta-chip--empty {
      font-weight: 500;
      font-style: italic;
      color: var(--muted);
      border-style: dashed;
      background: transparent;
    }

    .next-section {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 100%;
      border-bottom: 1px solid var(--border);
    }

    .next-section .mono-pre {
      min-height: 2.25rem;
    }

    .queue-section {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
    }

    .queue-section .mono-pre {
      min-height: 2.5rem;
    }

    .trace-panels-scroll .dual .stack-section .mono-pre {
      min-height: 2.5rem;
    }

    .dual {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: start;
      width: 100%;
    }

    .dual > div {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .dual > .stack-section {
      border-right: 1px solid var(--border);
    }

    .subhead {
      margin: 0;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .subhead-count {
      font-weight: 600;
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      color: var(--vscode-foreground);
      background: var(--vscode-badge-background, rgba(127, 127, 127, 0.25));
      padding: 1px 7px;
      border-radius: 10px;
      line-height: 1.35;
    }

    .subhead-count:empty {
      display: none;
    }

    .mono-pre {
      margin: 0;
      padding: 8px 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 1.4;
      white-space: pre-wrap;
      word-break: break-word;
      background: var(--code-bg);
    }

    .bottom-io-panel {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      border-top: 2px solid var(--border);
      background: var(--vscode-panel-background, var(--vscode-sideBar-background, var(--vscode-editor-background)));
      height: clamp(160px, 32vh, 420px);
      min-height: 0;
    }

    /* Both I/O sections collapsed: dock only the tab strip so trace/stack area can grow */
    .bottom-io-panel:has(.bottom-io-stdout.collapsed):has(.bottom-io-stderr.collapsed) {
      height: auto;
      max-height: none;
    }

    .bottom-io-panel:has(.bottom-io-stdout.collapsed):has(.bottom-io-stderr.collapsed) .bottom-io-split {
      flex: 0 0 auto;
    }

    .bottom-io-split {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .bottom-io-pane {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .bottom-io-pane.bottom-io-stdout:not(.collapsed) {
      flex: 3 1 0;
      min-height: 0;
      border-bottom: 1px solid var(--border);
    }

    .bottom-io-pane.bottom-io-stderr:not(.collapsed) {
      flex: 2 1 0;
      min-height: 0;
    }

    .bottom-io-pane.collapsed {
      flex: 0 0 auto;
    }

    .bottom-io-pane.bottom-io-stdout.collapsed {
      border-bottom: 1px solid var(--border);
    }

    .bottom-io-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .bottom-io-pane.collapsed .bottom-io-body {
      display: none;
    }

    button.bottom-io-tab-toggle {
      flex-shrink: 0;
      width: 100%;
      margin: 0;
      min-width: 0;
      padding: 5px 10px;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid var(--border);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--muted);
      background: var(--vscode-sideBarSectionHeader-background, var(--vscode-editorWidget-background, rgba(127, 127, 127, 0.08)));
      display: flex;
      align-items: center;
      gap: 6px;
      text-align: left;
      cursor: pointer;
    }

    button.bottom-io-tab-toggle:hover:not(:disabled) {
      color: var(--vscode-sideBarSectionHeader-foreground, var(--vscode-foreground));
      background: var(--vscode-toolbar-hoverBackground, var(--vscode-list-hoverBackground, rgba(127, 127, 127, 0.12)));
    }

    .bottom-io-chevron {
      display: inline-block;
      flex-shrink: 0;
      font-size: 8px;
      line-height: 1;
      opacity: 0.8;
      transition: transform 0.12s ease;
    }

    .bottom-io-pane.collapsed .bottom-io-chevron {
      transform: rotate(-90deg);
    }

    .bottom-io-pre {
      margin: 0;
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 6px 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 1.4;
      white-space: pre-wrap;
      word-break: break-word;
      background: var(--code-bg);
    }

    .empty {
      color: var(--muted);
      font-style: italic;
    }

    @media (max-width: 900px) {
      .trace-panels-with-ir {
        flex-direction: column;
      }

      .trace-panels-with-ir.main--ir-collapsed .ir-sidebar,
      .trace-panels-with-ir.main--ir-expanded .ir-sidebar {
        flex: 0 0 auto;
        width: 100%;
        min-width: 0;
        max-width: none;
        border-left: none;
        border-top: 1px solid var(--border);
      }

      .trace-panels-with-ir.main--ir-collapsed .ir-sidebar {
        min-height: 2.75rem;
      }

      .trace-panels-with-ir.main--ir-expanded .ir-sidebar {
        min-height: min(40vh, 16rem);
        max-height: 50vh;
      }

      .ir-sidebar {
        flex-direction: row;
      }

      .ir-rail {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-block: 4px;
        padding-inline: 0;
        min-height: unset;
        flex: 1;
      }

      .ir-sidebar-inner {
        flex: 1;
        min-width: 0;
        min-height: 0;
      }

      .dual {
        grid-template-columns: 1fr;
      }

      .dual > .stack-section {
        border-right: none;
        border-bottom: 1px solid var(--border);
      }
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="app-top-bar">
      <div class="run-context" id="run-context" title=""></div>
      <div class="app-top-bar-actions">
        <button type="button" id="options-toggle" class="icon-btn" aria-expanded="false" aria-controls="options-panel" title="Viewer options">⚙</button>
      </div>
    </div>
    <div id="options-backdrop" class="options-backdrop hidden" aria-hidden="true"></div>
    <div id="options-panel" class="options-panel hidden" role="dialog" aria-labelledby="options-panel-title" aria-modal="true">
      <div class="options-panel-header">
        <h2 id="options-panel-title" class="options-panel-title">Trace viewer options</h2>
        <button type="button" id="options-close" class="options-close" aria-label="Close options">✕</button>
      </div>
      <div class="options-field">
        <label for="playback-delay-ms">Playback step delay (ms)</label>
        <input id="playback-delay-ms" type="number" min="10" max="5000" step="10" value="50" />
        <span class="options-hint">Time between automatic steps while playing. Range 10–5000.</span>
      </div>
      <div class="options-field options-field--inline">
        <label for="ir-expanded-default">
          <input id="ir-expanded-default" type="checkbox" />
          <span>Open IR panel when this viewer loads</span>
        </label>
      </div>
      <div class="options-actions">
        <button type="button" id="options-reset-defaults">Reset to defaults</button>
      </div>
    </div>
    <div class="scrubber">
      <div class="scrubber-btns">
        <button id="first-button" type="button" title="First step">|◀</button>
        <button id="prev-button" type="button" title="Previous step">◀</button>
        <button id="next-button" type="button" title="Next step">▶</button>
        <button id="last-button" type="button" title="Last step">▶|</button>
        <button id="play-button" type="button" title="Auto-step while playing">Play</button>
        <button id="pause-button" type="button" title="Stop auto-step" disabled>Pause</button>
      </div>
      <div class="scrubber-slider">
        <input id="step-slider" type="range" min="0" step="1" />
      </div>
      <div class="scrubber-idx">
        <input id="step-input" type="number" min="0" step="1" aria-label="Step index" />
        <span id="step-of"></span>
      </div>
    </div>
    <div class="main-scroll">
    <div class="main">
      <div class="col trace-col">
        <div class="col-h">Trace</div>
        <div class="trace-body">
          <div class="trace-step-meta" id="trace-step-meta" aria-live="polite"></div>
          <div class="trace-panels-with-ir main--ir-collapsed" id="main-grid">
            <div class="trace-panels-scroll">
              <div class="next-section">
                <h3 class="subhead"><span>Next token</span></h3>
                <pre class="mono-pre" id="next-pre"></pre>
              </div>
              <div class="dual">
                <div class="stack-section">
                  <h3 class="subhead">
                    <span>Stack</span>
                    <span class="subhead-count" id="stack-depth-count" title="Values on stack before this step"></span>
                  </h3>
                  <pre class="mono-pre" id="stack-pre"></pre>
                </div>
                <div class="queue-section">
                  <h3 class="subhead">
                    <span>Queue</span>
                    <span class="subhead-count" id="queue-depth-count" title="Queue depth before this step"></span>
                  </h3>
                  <pre class="mono-pre" id="queue-pre"></pre>
                </div>
              </div>
            </div>
            <aside class="ir-sidebar" id="ir-sidebar" aria-label="Compiled IR (reference)">
        <div class="ir-sidebar-inner" id="ir-sidebar-inner" role="region" aria-label="IR listing">
          <div class="ir-sidebar-header">
            <button type="button" class="ir-collapse-btn" id="ir-collapse-btn" title="Hide IR panel" aria-expanded="false">▶</button>
            <span class="ir-sidebar-title">IR</span>
            <span id="ir-note" class="ir-header-note"></span>
          </div>
          <div class="scroll-fill ir-pane" id="ir-pane"></div>
        </div>
        <button type="button" class="ir-rail" id="ir-expand-btn" aria-expanded="false" aria-controls="ir-sidebar-inner" title="Show IR">
          <span class="ir-rail-icon" aria-hidden="true">◀</span>
          <span class="ir-rail-word">IR</span>
        </button>
      </aside>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="bottom-io-panel" role="region" aria-label="Trace program output">
      <div class="bottom-io-split">
        <section class="bottom-io-pane bottom-io-stdout" id="bottom-io-stdout-pane">
          <button type="button" class="bottom-io-tab-toggle" id="bottom-io-stdout-toggle" aria-expanded="true" aria-controls="bottom-io-stdout-body" title="Show or hide stdout">
            <span class="bottom-io-chevron" aria-hidden="true">▼</span>
            <span>Stdout</span>
          </button>
          <div class="bottom-io-body" id="bottom-io-stdout-body">
            <pre class="bottom-io-pre" id="step-stdout-pre"></pre>
          </div>
        </section>
        <section class="bottom-io-pane bottom-io-stderr" id="bottom-io-stderr-pane">
          <button type="button" class="bottom-io-tab-toggle" id="bottom-io-stderr-toggle" aria-expanded="true" aria-controls="bottom-io-stderr-body" title="Show or hide stderr and trace notes">
            <span class="bottom-io-chevron" aria-hidden="true">▼</span>
            <span>Stderr</span>
          </button>
          <div class="bottom-io-body" id="bottom-io-stderr-body">
            <pre class="bottom-io-pre" id="trace-stderr"></pre>
          </div>
        </section>
      </div>
    </div>
  </div>
  <script id="trace-run-data" type="application/json">${escapeScriptJson(run)}</script>
  <script nonce="${nonce}">
    (() => {
      const run = JSON.parse(document.getElementById("trace-run-data").textContent);
      const rawSteps = Array.isArray(run.steps) ? run.steps : [];

      function buildViewSteps(raw) {
        if (!raw.length) {
          return [];
        }
        const last = raw[raw.length - 1];
        const after = Array.isArray(last.stackAfter) ? last.stackAfter.slice() : [];
        const qPrev = Array.isArray(last.queuePreview) ? last.queuePreview.slice() : [];
        const synthetic = {
          step: last.step + 1,
          immediate: false,
          tag: "literal",
          value: "",
          action: "(end: final stack)",
          stackBefore: after,
          stackAfter: after,
          queuePreview: qPrev,
          queueDepth: typeof last.queueDepth === "number" ? last.queueDepth : 0,
          stdoutSinceLast: undefined,
          isSyntheticEnd: true,
        };
        return raw.map((s) => Object.assign({}, s, { isSyntheticEnd: false })).concat([synthetic]);
      }

      const viewSteps = buildViewSteps(rawSteps);
      const irLines = String(run.ir || "").split(/\\r?\\n/);
      let selectedIndex = 0;
      let playbackTimer = null;

      const runContext = document.getElementById("run-context");
      const stepOf = document.getElementById("step-of");
      const traceStepMeta = document.getElementById("trace-step-meta");
      const stackDepthCount = document.getElementById("stack-depth-count");
      const queueDepthCount = document.getElementById("queue-depth-count");
      const nextPre = document.getElementById("next-pre");
      const stackPre = document.getElementById("stack-pre");
      const queuePre = document.getElementById("queue-pre");
      const stepStdoutPre = document.getElementById("step-stdout-pre");
      const stepSlider = document.getElementById("step-slider");
      const stepInput = document.getElementById("step-input");
      const mainGrid = document.getElementById("main-grid");
      const irExpandBtn = document.getElementById("ir-expand-btn");
      const irCollapseBtn = document.getElementById("ir-collapse-btn");
      const irPane = document.getElementById("ir-pane");
      const irNote = document.getElementById("ir-note");
      const traceStderr = document.getElementById("trace-stderr");
      const bottomIoStdoutPane = document.getElementById("bottom-io-stdout-pane");
      const bottomIoStderrPane = document.getElementById("bottom-io-stderr-pane");
      const bottomIoStdoutToggle = document.getElementById("bottom-io-stdout-toggle");
      const bottomIoStderrToggle = document.getElementById("bottom-io-stderr-toggle");
      const firstButton = document.getElementById("first-button");
      const prevButton = document.getElementById("prev-button");
      const nextButton = document.getElementById("next-button");
      const lastButton = document.getElementById("last-button");
      const playButton = document.getElementById("play-button");
      const pauseButton = document.getElementById("pause-button");
      const optionsToggle = document.getElementById("options-toggle");
      const optionsPanel = document.getElementById("options-panel");
      const optionsBackdrop = document.getElementById("options-backdrop");
      const optionsClose = document.getElementById("options-close");
      const optionsResetDefaults = document.getElementById("options-reset-defaults");
      const playbackDelayInput = document.getElementById("playback-delay-ms");
      const irExpandedDefaultInput = document.getElementById("ir-expanded-default");

      const STORAGE_PLAYBACK_MS = "ffm.traceViewer.playbackStepMs";
      const STORAGE_IR_EXPANDED_DEFAULT = "ffm.traceViewer.irExpandedDefault";

      function clampPlaybackMs(value) {
        const n = Math.round(Number(value));
        if (!Number.isFinite(n)) {
          return 50;
        }
        return Math.min(5000, Math.max(10, n));
      }

      function readStoredPlaybackMs() {
        const raw = localStorage.getItem(STORAGE_PLAYBACK_MS);
        if (raw === null || raw === "") {
          return 50;
        }
        return clampPlaybackMs(raw);
      }

      function readIrExpandedDefault() {
        return localStorage.getItem(STORAGE_IR_EXPANDED_DEFAULT) === "1";
      }

      let playbackStepMs = readStoredPlaybackMs();

      function updatePlayButtonTitle() {
        playButton.title = "Auto-step every " + String(playbackStepMs) + " ms while playing";
      }

      function applyPlaybackDelayFromInput() {
        playbackStepMs = clampPlaybackMs(playbackDelayInput.value);
        playbackDelayInput.value = String(playbackStepMs);
        localStorage.setItem(STORAGE_PLAYBACK_MS, String(playbackStepMs));
        updatePlayButtonTitle();
        if (playbackTimer !== null) {
          clearInterval(playbackTimer);
          playbackTimer = setInterval(playbackTick, playbackStepMs);
        }
      }

      function syncOptionsFormFromState() {
        playbackDelayInput.value = String(playbackStepMs);
        irExpandedDefaultInput.checked = readIrExpandedDefault();
      }

      function setOptionsOpen(open) {
        const on = Boolean(open);
        optionsPanel.classList.toggle("hidden", !on);
        optionsBackdrop.classList.toggle("hidden", !on);
        optionsToggle.setAttribute("aria-expanded", on ? "true" : "false");
        if (on) {
          syncOptionsFormFromState();
          playbackDelayInput.focus();
        }
      }

      function optionsOpen() {
        return !optionsPanel.classList.contains("hidden");
      }

      function fileBasename(filePath) {
        const normalized = String(filePath).replace(/\\\\/g, "/");
        const parts = normalized.split("/");
        return parts[parts.length - 1] || filePath;
      }

      function createEmpty(message) {
        const node = document.createElement("div");
        node.className = "empty";
        node.textContent = message;
        return node;
      }

      function renderIr() {
        irPane.replaceChildren();
        if (irLines.length === 0 || (irLines.length === 1 && irLines[0] === "")) {
          irPane.appendChild(createEmpty("No IR text was captured for this run."));
          irNote.textContent = "";
          return;
        }
        irNote.textContent = " · read-only";
        irLines.forEach((line, index) => {
          const row = document.createElement("div");
          row.className = "ir-line";
          const number = document.createElement("div");
          number.className = "ir-line-number";
          number.textContent = String(index + 1);
          const text = document.createElement("div");
          text.textContent = line || " ";
          row.append(number, text);
          irPane.appendChild(row);
        });
      }

      function formatStackCells(values) {
        if (!values.length) {
          return "(empty)";
        }
        return values.map((v, i) => "[" + i + "] " + v).join("\\n");
      }

      function formatQueue(step) {
        if (!step.queuePreview.length) {
          return "(empty)";
        }
        return step.queuePreview.map((t, i) => {
          return "[" + i + "] " + t.action + "  (" + t.tag + " · " + t.value + ")";
        }).join("\\n");
      }

      function renderTraceStepMeta(container, step) {
        container.replaceChildren();
        if (!step) {
          const chip = document.createElement("span");
          chip.className = "meta-chip meta-chip--empty";
          chip.textContent = "No trace";
          container.appendChild(chip);
          return;
        }
        if (step.isSyntheticEnd) {
          return;
        }
        const chip = document.createElement("span");
        chip.className = step.immediate
          ? "meta-chip meta-chip--immediate"
          : "meta-chip meta-chip--queued";
        chip.textContent = step.immediate ? "Immediate" : "Deferred";
        chip.title = step.immediate
          ? "This token runs in the same turn (immediate)"
          : "This token is queued for a later turn";
        container.appendChild(chip);
      }

      function formatNextLikeQueueRow(step) {
        if (step.isSyntheticEnd) {
          return "[next] " + step.action;
        }
        return "[next] " + step.action + "  (" + step.tag + " · " + step.value + ")";
      }

      function accumulatedStdoutThroughIndex(steps, endInclusive) {
        let acc = "";
        const end = Math.min(endInclusive, steps.length - 1);
        for (let i = 0; i <= end; i++) {
          const chunk = steps[i].stdoutSinceLast;
          if (typeof chunk === "string" && chunk.length) {
            acc += chunk;
          }
        }
        return acc.length ? acc : "(nothing printed yet)";
      }

      function playbackTick() {
        if (selectedIndex >= viewSteps.length - 1) {
          stopPlayback();
          return;
        }
        setSelectedIndex(selectedIndex + 1);
      }

      function stopPlayback() {
        if (playbackTimer !== null) {
          clearInterval(playbackTimer);
          playbackTimer = null;
        }
        playButton.disabled = viewSteps.length === 0;
        pauseButton.disabled = true;
      }

      function startPlayback() {
        if (playbackTimer !== null || viewSteps.length === 0) {
          return;
        }
        if (selectedIndex >= viewSteps.length - 1) {
          selectedIndex = 0;
          renderSelectedStep();
        }
        playButton.disabled = true;
        pauseButton.disabled = false;
        playbackTimer = setInterval(playbackTick, playbackStepMs);
      }

      function togglePlayback() {
        if (playbackTimer !== null) {
          stopPlayback();
        } else {
          startPlayback();
        }
      }

      function renderSelectedStep() {
        const step = viewSteps[selectedIndex];
        const lastIdx = Math.max(viewSteps.length - 1, 0);

        stepSlider.max = String(lastIdx);
        stepSlider.value = String(selectedIndex);
        stepInput.min = "0";
        stepInput.max = String(lastIdx);
        stepInput.value = String(selectedIndex);
        stepOf.textContent = viewSteps.length ? " * " + String(viewSteps.length) + " positions" : "";

        firstButton.disabled = selectedIndex <= 0 || viewSteps.length === 0;
        prevButton.disabled = selectedIndex <= 0 || viewSteps.length === 0;
        nextButton.disabled = viewSteps.length === 0 || selectedIndex >= lastIdx;
        lastButton.disabled = viewSteps.length === 0 || selectedIndex >= lastIdx;

        if (!step) {
          renderTraceStepMeta(traceStepMeta, null);
          stackDepthCount.textContent = "";
          queueDepthCount.textContent = "";
          nextPre.textContent = "(no trace)";
          stackPre.textContent = "—";
          queuePre.textContent = "—";
          stepStdoutPre.textContent = "—";
          playButton.disabled = true;
          pauseButton.disabled = true;
          return;
        }

        renderTraceStepMeta(traceStepMeta, step);
        const stackDepth = Array.isArray(step.stackBefore) ? step.stackBefore.length : 0;
        const qDepth = typeof step.queueDepth === "number" ? step.queueDepth : 0;
        stackDepthCount.textContent = String(stackDepth);
        queueDepthCount.textContent = String(qDepth);

        nextPre.textContent = formatNextLikeQueueRow(step);

        stackPre.textContent = formatStackCells(step.stackBefore || []);
        queuePre.textContent = formatQueue(step);
        stepStdoutPre.textContent = accumulatedStdoutThroughIndex(viewSteps, selectedIndex);

        playButton.disabled = viewSteps.length === 0 || playbackTimer !== null;
        pauseButton.disabled = playbackTimer === null;
      }

      function setSelectedIndex(index, opts) {
        const manual = opts && opts.manual;
        if (manual) {
          stopPlayback();
        }
        if (!viewSteps.length) {
          selectedIndex = 0;
          renderSelectedStep();
          return;
        }
        selectedIndex = Math.max(0, Math.min(index, viewSteps.length - 1));
        renderSelectedStep();
      }

      const modeLabel = run.optimized ? "optimized" : "unoptimized";
      runContext.textContent =
        fileBasename(run.fileName)
        + " · "
        + modeLabel
        + " · "
        + String(rawSteps.length)
        + " VM steps · exit "
        + String(run.exitCode);
      runContext.title = run.fileName;

      const errRaw = (run.stderr || "").trim();
      traceStderr.textContent = errRaw.length ? errRaw : "—";

      function setIrPanelExpanded(expanded) {
        const on = Boolean(expanded);
        mainGrid.classList.toggle("main--ir-expanded", on);
        mainGrid.classList.toggle("main--ir-collapsed", !on);
        irExpandBtn.setAttribute("aria-expanded", on ? "true" : "false");
        irCollapseBtn.setAttribute("aria-expanded", on ? "true" : "false");
      }

      irExpandBtn.addEventListener("click", () => setIrPanelExpanded(true));
      irCollapseBtn.addEventListener("click", () => setIrPanelExpanded(false));

      playbackDelayInput.addEventListener("change", () => {
        applyPlaybackDelayFromInput();
      });

      irExpandedDefaultInput.addEventListener("change", () => {
        localStorage.setItem(STORAGE_IR_EXPANDED_DEFAULT, irExpandedDefaultInput.checked ? "1" : "0");
      });

      optionsToggle.addEventListener("click", () => {
        setOptionsOpen(!optionsOpen());
      });
      optionsClose.addEventListener("click", () => setOptionsOpen(false));
      optionsBackdrop.addEventListener("click", () => setOptionsOpen(false));

      optionsResetDefaults.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_PLAYBACK_MS);
        localStorage.removeItem(STORAGE_IR_EXPANDED_DEFAULT);
        playbackStepMs = 50;
        playbackDelayInput.value = "50";
        irExpandedDefaultInput.checked = false;
        updatePlayButtonTitle();
        if (playbackTimer !== null) {
          clearInterval(playbackTimer);
          playbackTimer = setInterval(playbackTick, playbackStepMs);
        }
        setIrPanelExpanded(false);
      });

      renderIr();
      if (readIrExpandedDefault()) {
        setIrPanelExpanded(true);
      }
      updatePlayButtonTitle();
      syncOptionsFormFromState();
      stopPlayback();
      renderSelectedStep();

      firstButton.addEventListener("click", () => setSelectedIndex(0, { manual: true }));
      prevButton.addEventListener("click", () => setSelectedIndex(selectedIndex - 1, { manual: true }));
      nextButton.addEventListener("click", () => setSelectedIndex(selectedIndex + 1, { manual: true }));
      lastButton.addEventListener("click", () => setSelectedIndex(viewSteps.length - 1, { manual: true }));
      stepSlider.addEventListener("input", (event) => {
        setSelectedIndex(Number(event.target.value), { manual: true });
      });
      stepInput.addEventListener("change", (event) => {
        setSelectedIndex(Number(event.target.value), { manual: true });
      });
      playButton.addEventListener("click", () => startPlayback());
      pauseButton.addEventListener("click", () => stopPlayback());

      function wireBottomIoToggle(toggle, pane) {
        toggle.addEventListener("click", () => {
          const collapsed = pane.classList.toggle("collapsed");
          toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
        });
      }
      wireBottomIoToggle(bottomIoStdoutToggle, bottomIoStdoutPane);
      wireBottomIoToggle(bottomIoStderrToggle, bottomIoStderrPane);

      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && optionsOpen()) {
          event.preventDefault();
          setOptionsOpen(false);
          return;
        }
        if (optionsOpen()) {
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setSelectedIndex(selectedIndex - 1, { manual: true });
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setSelectedIndex(selectedIndex + 1, { manual: true });
        }
      });

      window.addEventListener("message", (event) => {
        const data = event.data;
        if (data && data.type === "tracePlayback" && data.action === "toggle") {
          togglePlayback();
        }
      });
    })();
  </script>
</body>
</html>`;
}
