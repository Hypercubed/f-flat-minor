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
  queueBeforePreview: TraceQueueToken[];
  queueBeforeDepth: number;
  queuePreview: TraceQueueToken[];
  queueDepth: number;
  outputBefore: string;
  outputAfter: string;
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
      --accent: var(--vscode-textLink-foreground, #3794ff);
      --bg-subtle: var(--vscode-editorWidget-background, rgba(127, 127, 127, 0.08));
      --bg-selected: var(--vscode-list-activeSelectionBackground, rgba(55, 148, 255, 0.18));
      --fg-selected: var(--vscode-list-activeSelectionForeground, inherit);
      --font-mono: var(--vscode-editor-font-family, monospace);
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
    }

    body {
      margin: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      overflow: hidden;
    }

    button,
    input {
      font: inherit;
    }

    button {
      border: 1px solid var(--border);
      color: var(--vscode-button-foreground);
      background: var(--vscode-button-background);
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: var(--vscode-button-hoverBackground);
    }

    button:disabled {
      cursor: default;
      opacity: 0.6;
    }

    input[type="range"] {
      width: 100%;
    }

    input[type="number"] {
      width: 90px;
      padding: 4px 6px;
      border: 1px solid var(--border);
      border-radius: 4px;
      color: inherit;
      background: var(--vscode-input-background);
    }

    .layout {
      display: grid;
      grid-template-rows: auto auto minmax(0, 1fr);
      height: 100vh;
    }

    .sticky-top {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--vscode-editor-background);
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: var(--bg-subtle);
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: var(--vscode-editor-background);
    }

    .main-scroll {
      overflow: auto;
      padding: 12px 16px 16px;
    }

    .main {
      display: grid;
      grid-template-columns: minmax(380px, 1.35fr) minmax(380px, 1fr);
      gap: 12px;
      align-items: start;
    }

    .meta-card,
    .panel {
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--bg-subtle);
    }

    .meta-card {
      padding: 10px 12px;
    }

    .meta-label {
      color: var(--muted);
      font-size: 12px;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .meta-value {
      word-break: break-word;
      font-family: var(--font-mono);
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border);
      font-weight: 600;
    }

    .panel-content {
      padding: 10px 12px 12px;
    }

    .mono {
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .muted {
      color: var(--muted);
    }

    .ir-pane {
      max-height: 70vh;
      overflow: auto;
      border-radius: 4px;
      border: 1px solid var(--border);
      background: var(--vscode-textCodeBlock-background, var(--bg-subtle));
    }

    .ir-line {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 12px;
      padding: 2px 10px;
      white-space: pre-wrap;
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.5;
    }

    .ir-line-number {
      color: var(--muted);
      text-align: right;
      user-select: none;
    }

    .state-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .token-list,
    .queue-list,
    .step-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .stack-item,
    .queue-item,
    .step-item {
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 6px 8px;
      background: var(--vscode-input-background);
      font-family: var(--font-mono);
      font-size: 12px;
      overflow-wrap: anywhere;
    }

    .step-item.is-selected {
      background: var(--bg-selected);
      color: var(--fg-selected);
      border-color: var(--accent);
    }

    .step-list {
      max-height: 300px;
      overflow: auto;
    }

    .step-item button {
      all: unset;
      display: block;
      width: 100%;
      cursor: pointer;
    }

    .queue-item small,
    .step-item small {
      display: block;
      margin-top: 4px;
      color: var(--muted);
      font-family: var(--vscode-font-family);
    }

    .output-block {
      white-space: pre-wrap;
      word-break: break-word;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 8px 10px;
      background: var(--vscode-textCodeBlock-background, var(--bg-subtle));
      max-height: 180px;
      overflow: auto;
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .empty {
      color: var(--muted);
      font-style: italic;
    }

    @media (max-width: 1100px) {
      .main {
        grid-template-columns: 1fr;
      }

      .state-columns {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="layout">
    <div class="sticky-top">
      <div class="toolbar">
        <button id="first-button" type="button">|&lt;</button>
        <button id="prev-button" type="button">&lt;</button>
        <button id="next-button" type="button">&gt;</button>
        <button id="last-button" type="button">&gt;|</button>
        <div class="toolbar-spacer"></div>
        <label class="mono" for="step-input">State</label>
        <input id="step-input" type="number" min="0" step="1" />
      </div>
      <div class="meta">
        <div class="meta-card">
          <div class="meta-label">File</div>
          <div class="meta-value" id="meta-file"></div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Mode</div>
          <div class="meta-value" id="meta-mode"></div>
        </div>
        <div class="meta-card">
          <div class="meta-label">States</div>
          <div class="meta-value" id="meta-steps"></div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Exit code</div>
          <div class="meta-value" id="meta-exit"></div>
        </div>
      </div>
    </div>
    <div class="main-scroll">
      <div class="main">
        <section class="panel">
          <div class="panel-header">
            <span>Executed IR</span>
            <span class="muted mono" id="ir-note"></span>
          </div>
          <div class="panel-content">
            <div class="ir-pane" id="ir-pane"></div>
          </div>
        </section>
        <section class="panel">
          <div class="panel-header">
            <span>Recorded trace state</span>
            <span class="muted mono" id="step-summary"></span>
          </div>
          <div class="panel-content">
            <div class="meta" style="padding: 0; border-bottom: 0; margin-bottom: 12px;">
              <div class="meta-card">
                <div class="meta-label">Action</div>
                <div class="meta-value" id="current-action"></div>
              </div>
              <div class="meta-card">
                <div class="meta-label">Tag / immediate</div>
                <div class="meta-value" id="current-tag"></div>
              </div>
              <div class="meta-card">
                <div class="meta-label">Queue depth</div>
                <div class="meta-value" id="current-queue-depth"></div>
              </div>
              <div class="meta-card">
                <div class="meta-label">Value</div>
                <div class="meta-value" id="current-value"></div>
              </div>
            </div>
            <div class="state-columns">
              <div class="panel">
                <div class="panel-header">Stack after selected state</div>
                <div class="panel-content">
                  <div id="stack-list" class="token-list"></div>
                </div>
              </div>
              <div class="panel">
                <div class="panel-header">Queue before selected step</div>
                <div class="panel-content">
                  <div id="queue-list" class="queue-list"></div>
                </div>
              </div>
            </div>
            <div class="panel" style="margin-top: 12px;">
              <div class="panel-header">Trace timeline</div>
              <div class="panel-content">
                <input id="step-slider" type="range" min="0" step="1" />
                <div class="step-list" id="step-list" style="margin-top: 10px;"></div>
              </div>
            </div>
            <div class="panel" style="margin-top: 12px;">
              <div class="panel-header">Output through selected state</div>
              <div class="panel-content">
                <div class="output-block" id="program-output"></div>
              </div>
            </div>
            <div class="panel" style="margin-top: 12px;">
              <div class="panel-header">Final program output</div>
              <div class="panel-content">
                <div class="output-block" id="final-program-output"></div>
              </div>
            </div>
            <div class="panel" style="margin-top: 12px;">
              <div class="panel-header">Trace stderr / notes</div>
              <div class="panel-content">
                <div class="output-block" id="trace-stderr"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <script id="trace-run-data" type="application/json">${escapeScriptJson(run)}</script>
  <script nonce="${nonce}">
    (() => {
      const run = JSON.parse(document.getElementById("trace-run-data").textContent);
      const steps = Array.isArray(run.steps) ? run.steps : [];
      const irLines = String(run.ir || "").split(/\\r?\\n/);
      const initialState = {
        label: "Initial state",
        stepNumber: -1,
        action: "(start)",
        tag: "—",
        immediate: false,
        value: "",
        stackAfter: [],
        queueBeforePreview: steps.length > 0 ? steps[0].queueBeforePreview || [] : [],
        queueBeforeDepth: steps.length > 0 ? steps[0].queueBeforeDepth || 0 : 0,
        outputAfter: "",
      };
      let selectedIndex = 0;

      const metaFile = document.getElementById("meta-file");
      const metaMode = document.getElementById("meta-mode");
      const metaSteps = document.getElementById("meta-steps");
      const metaExit = document.getElementById("meta-exit");
      const stepSummary = document.getElementById("step-summary");
      const currentAction = document.getElementById("current-action");
      const currentTag = document.getElementById("current-tag");
      const currentQueueDepth = document.getElementById("current-queue-depth");
      const currentValue = document.getElementById("current-value");
      const stackList = document.getElementById("stack-list");
      const queueList = document.getElementById("queue-list");
      const stepList = document.getElementById("step-list");
      const stepSlider = document.getElementById("step-slider");
      const stepInput = document.getElementById("step-input");
      const irPane = document.getElementById("ir-pane");
      const irNote = document.getElementById("ir-note");
      const programOutput = document.getElementById("program-output");
      const finalProgramOutput = document.getElementById("final-program-output");
      const traceStderr = document.getElementById("trace-stderr");
      const firstButton = document.getElementById("first-button");
      const prevButton = document.getElementById("prev-button");
      const nextButton = document.getElementById("next-button");
      const lastButton = document.getElementById("last-button");

      function setText(element, value, emptyText = "—") {
        element.textContent = value && value.length ? value : emptyText;
      }

      function createEmpty(message) {
        const node = document.createElement("div");
        node.className = "empty";
        node.textContent = message;
        return node;
      }

      function getStateCount() {
        return steps.length + 1;
      }

      function getSelectedState() {
        if (selectedIndex === 0) {
          return initialState;
        }
        const step = steps[selectedIndex - 1];
        return {
          label: "#" + step.step + " " + step.action,
          stepNumber: step.step,
          action: step.action,
          tag: step.tag,
          immediate: step.immediate,
          value: step.value,
          stackAfter: Array.isArray(step.stackAfter) ? step.stackAfter : [],
          queueBeforePreview: Array.isArray(step.queueBeforePreview) ? step.queueBeforePreview : [],
          queueBeforeDepth: typeof step.queueBeforeDepth === "number" ? step.queueBeforeDepth : 0,
          outputAfter: typeof step.outputAfter === "string" ? step.outputAfter : "",
        };
      }

      function renderIr() {
        irPane.replaceChildren();
        if (irLines.length === 0 || (irLines.length === 1 && irLines[0] === "")) {
          irPane.appendChild(createEmpty("IR output unavailable."));
          irNote.textContent = "";
          return;
        }
        irNote.textContent = "Read-only POC view";
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

      function renderStepList() {
        stepList.replaceChildren();
        const stateCount = getStateCount();
        const windowSize = 60;
        const start = Math.max(0, selectedIndex - Math.floor(windowSize / 2));
        const end = Math.min(stateCount, start + windowSize);

        for (let index = start; index < end; index++) {
          const row = document.createElement("div");
          row.className = "step-item" + (index === selectedIndex ? " is-selected" : "");
          const button = document.createElement("button");
          button.type = "button";
          button.addEventListener("click", () => setSelectedIndex(index));

          const title = document.createElement("div");
          const meta = document.createElement("small");
          if (index === 0) {
            title.textContent = "Initial state";
            meta.textContent = "empty stack | queue " + initialState.queueBeforeDepth;
          } else {
            const step = steps[index - 1];
            title.textContent = "#" + step.step + " " + step.action;
            meta.textContent = step.tag + " | stack " + step.stackAfter.length + " | queue " + step.queueBeforeDepth;
          }

          button.append(title, meta);
          row.appendChild(button);
          stepList.appendChild(row);
        }
      }

      function renderSelectedState() {
        const stateCount = getStateCount();
        const state = getSelectedState();

        stepSlider.max = String(Math.max(stateCount - 1, 0));
        stepSlider.value = String(selectedIndex);
        stepInput.max = String(Math.max(stateCount - 1, 0));
        stepInput.value = String(selectedIndex);

        firstButton.disabled = selectedIndex <= 0;
        prevButton.disabled = selectedIndex <= 0;
        nextButton.disabled = selectedIndex >= stateCount - 1;
        lastButton.disabled = selectedIndex >= stateCount - 1;

        stepSummary.textContent = selectedIndex === 0
          ? "Selected initial state"
          : "Selected state after step " + state.stepNumber + " (" + selectedIndex + "/" + (stateCount - 1) + ")";
        setText(currentAction, state.action);
        setText(currentTag, selectedIndex === 0 ? "initial" : state.tag + " / immediate=" + String(state.immediate));
        setText(currentQueueDepth, String(state.queueBeforeDepth));
        setText(currentValue, state.value);

        stackList.replaceChildren();
        if (state.stackAfter.length === 0) {
          stackList.appendChild(createEmpty(selectedIndex === 0
            ? "Stack starts empty before execution."
            : "Stack is empty after this step."));
        } else {
          state.stackAfter.forEach((value, index) => {
            const item = document.createElement("div");
            item.className = "stack-item";
            item.textContent = "[" + index + "] " + value;
            stackList.appendChild(item);
          });
        }

        queueList.replaceChildren();
        if (state.queueBeforePreview.length === 0) {
          queueList.appendChild(createEmpty("Queue preview is empty for this state."));
        } else {
          state.queueBeforePreview.forEach((token, index) => {
            const item = document.createElement("div");
            item.className = "queue-item";
            item.textContent = "[" + index + "] " + token.action;
            const meta = document.createElement("small");
            meta.textContent = token.tag + " | value=" + token.value;
            item.appendChild(meta);
            queueList.appendChild(item);
          });
        }

        programOutput.textContent = state.outputAfter || "—";
        renderStepList();
      }

      function setSelectedIndex(index) {
        const bounded = Math.max(0, Math.min(index, getStateCount() - 1));
        selectedIndex = bounded;
        renderSelectedState();
      }

      metaFile.textContent = run.fileName;
      metaMode.textContent = run.optimized ? "Optimized" : "Unoptimized";
      metaSteps.textContent = String(getStateCount());
      metaExit.textContent = String(run.exitCode);
      finalProgramOutput.textContent = run.programOutput || "—";
      traceStderr.textContent = run.stderr || "—";

      renderIr();
      renderSelectedState();

      firstButton.addEventListener("click", () => setSelectedIndex(0));
      prevButton.addEventListener("click", () => setSelectedIndex(selectedIndex - 1));
      nextButton.addEventListener("click", () => setSelectedIndex(selectedIndex + 1));
      lastButton.addEventListener("click", () => setSelectedIndex(getStateCount() - 1));
      stepSlider.addEventListener("input", (event) => {
        setSelectedIndex(Number(event.target.value));
      });
      stepInput.addEventListener("change", (event) => {
        setSelectedIndex(Number(event.target.value));
      });
      window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setSelectedIndex(selectedIndex - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setSelectedIndex(selectedIndex + 1);
        }
      });
    })();
  </script>
</body>
</html>`;
}
