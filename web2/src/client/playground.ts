import { html, nothing, render, type TemplateResult } from "lit-html";

import { mountReadonlySourceViewer, mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import {
  CUSTOM_EXAMPLE_VALUE,
  DEFAULT_EXAMPLE_PATH,
  DEFAULT_SOURCE,
  EXAMPLES,
  EXAMPLE_ENTRIES,
} from "./examples.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { decodeCodeFromUrlParam, encodeCodeForUrlParam } from "./url-codec.ts";
import { registerActiveRun } from "./active-run-cancellation.ts";
import { renderBytecodeToPre, setBytecodeCountLabel } from "./bytecode-display.ts";
import { syncBytecodeDetailTabChrome, syncSubtabActiveState } from "./detail-tabs.ts";
import {
  completedProgramRunSummaryItems,
  failedProgramRunSummaryItems,
  idleProgramRunSummaryItems,
  initialRunningProgramRunSummaryItems,
  progressProgramRunSummaryItems,
} from "./program-run-summary.ts";
import { requireElement } from "./require-element.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback } from "./run-fx.ts";
import { getMergedRouteSearchParams } from "./location-search.ts";
import { scrollElementToBottom } from "./scroll-element.ts";
import { renderSummaryBar } from "./summary-bar.ts";
import { waitForPaint } from "./wait-for-paint.ts";

function exampleLoadSelectOptions(): TemplateResult[] {
  return [
    ...EXAMPLE_ENTRIES.map(({ path, label }) => html`<option value="${path}">${label}</option>`),
    html`<option value="${CUSTOM_EXAMPLE_VALUE}">Custom</option>`,
  ];
}

function renderPlaygroundShell(): TemplateResult {
  return html`
    <section class="page-section">
      <section class="workspace">
        <div class="panel editor-panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">Editor</p>
              <h2>Main source</h2>
            </div>
          </div>
          <div id="source" aria-label="Main source editor"></div>
          <div class="controls">
            <label class="field">
              <span>Load example</span>
              <select id="example" class="example-load-select" aria-label="Load example">
                ${exampleLoadSelectOptions()}
              </select>
            </label>
            <label class="field">
              <span>stdin</span>
              <input id="stdin" type="text" placeholder="Optional input for getc" />
            </label>
            <div class="actions">
              <label class="toggle optimize-toggle">
                <input id="optimize" type="checkbox" checked />
                <span>Optimize</span>
              </label>
              <button id="run" type="button" class="primary" aria-label="Run program">Run Program</button>
            </div>
          </div>
        </div>

        <div class="panel details-panel-shell">
          <div class="panel-header">
            <div>
              <p class="panel-label">Inspect</p>
              <h2>Program details</h2>
            </div>
          </div>
          <div id="summary" class="summary-bar"></div>
          <div class="detail-toolbar">
            <div class="subtabs" aria-label="Program details">
              <button class="subtab is-active" data-detail-tab="output">Output</button>
              <button class="subtab" data-detail-tab="preprocessed">Expanded Source</button>
              <button class="subtab" data-detail-tab="ir">IR</button>
              <button class="subtab" data-detail-tab="bytecode">Bytecode</button>
            </div>
            <label id="output-wrap-toggle" class="toggle output-wrap-toggle">
              <input id="output-wrap" type="checkbox" checked />
              <span>Wrap Output</span>
            </label>
          </div>
          <div class="detail-panels">
            <pre id="output" class="console is-wrapped detail-panel is-active" data-detail-panel="output"></pre>
            <pre id="error" class="console detail-panel is-active" data-detail-panel="output"></pre>
            <div id="preprocessed" class="code-block detail-panel" data-detail-panel="preprocessed"></div>
            <div id="ir" class="code-block detail-panel" data-detail-panel="ir"></div>
            <pre id="bytecode" class="code-block bytecode-wrap detail-panel" data-detail-panel="bytecode"></pre>
          </div>
          <div id="bytecode-meta" class="detail-meta" hidden>
            <span class="label">Byte count</span>
            <span id="bytecode-count" class="value">0 bytes</span>
          </div>
        </div>
      </section>
    </section>
  `;
}

function setPlaygroundRouteSearch(params: URLSearchParams) {
  const nextSearch = params.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}`;
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  if (nextUrl !== currentUrl) {
    window.history.replaceState(window.history.state, "", nextUrl);
  }
}

export function mountPlayground(root: HTMLElement) {
  if (root.dataset.mounted === "true") {
    return;
  }

  render(renderPlaygroundShell(), root);
  root.dataset.mounted = "true";

  const source = requireElement<HTMLElement>(root, "#source");
  const stdin = requireElement<HTMLInputElement>(root, "#stdin");
  const optimize = requireElement<HTMLInputElement>(root, "#optimize");
  const example = requireElement<HTMLSelectElement>(root, "#example");
  const run = requireElement<HTMLButtonElement>(root, "#run");
  const summary = requireElement<HTMLDivElement>(root, "#summary");
  const output = requireElement<HTMLElement>(root, "#output");
  const outputWrap = requireElement<HTMLInputElement>(root, "#output-wrap");
  const outputWrapToggle = requireElement<HTMLElement>(root, "#output-wrap-toggle");
  const errorOutput = requireElement<HTMLElement>(root, "#error");
  const preprocessed = requireElement<HTMLElement>(root, "#preprocessed");
  const ir = requireElement<HTMLElement>(root, "#ir");
  const bytecode = requireElement<HTMLElement>(root, "#bytecode");
  const bytecodeMeta = requireElement<HTMLElement>(root, "#bytecode-meta");
  const bytecodeCount = requireElement<HTMLElement>(root, "#bytecode-count");

  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".subtab"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>(".detail-panel"));

  const searchParams = getMergedRouteSearchParams(window.location);
  const sourceFromUrl = decodeCodeFromUrlParam(searchParams.get("code"));
  const exampleFromUrl = searchParams.get("example");

  let initialPlaygroundSource = DEFAULT_SOURCE;
  let initialExampleValue = DEFAULT_EXAMPLE_PATH;

  if (sourceFromUrl != null) {
    initialPlaygroundSource = sourceFromUrl;
    initialExampleValue = CUSTOM_EXAMPLE_VALUE;
  } else if (exampleFromUrl !== null && exampleFromUrl in EXAMPLES) {
    initialPlaygroundSource = EXAMPLES[exampleFromUrl];
    initialExampleValue = exampleFromUrl;
  }

  let skipProgrammaticExampleSync = false;
  const sourceEditor = mountSourceEditor(source, initialPlaygroundSource, {
    extraExtensions: [tutorialEditorFlatFeedback],
    onDocumentChange: () => {
      if (skipProgrammaticExampleSync) {
        return;
      }
      example.value = CUSTOM_EXAMPLE_VALUE;
      syncUrlToRouteState();
    },
  });
  example.value = initialExampleValue;
  const preprocessedViewer = mountReadonlySourceViewer(preprocessed, "");
  const irViewer = mountReadonlySourceViewer(ir, "");

  function syncUrlToRouteState() {
    const nextParams = getMergedRouteSearchParams(window.location);

    if (example.value === CUSTOM_EXAMPLE_VALUE) {
      const sourceValue = sourceEditor.getValue();

      if (sourceValue) {
        const codeParam = encodeCodeForUrlParam(sourceValue);
        if (codeParam === null) {
          return;
        }
        nextParams.set("code", codeParam);
      } else {
        nextParams.delete("code");
      }

      nextParams.delete("example");
    } else {
      nextParams.delete("code");
      nextParams.set("example", example.value);
    }

    setPlaygroundRouteSearch(nextParams);
  }

  function setOutputWrap(enabled: boolean) {
    output.classList.toggle("is-wrapped", enabled);
    preprocessedViewer.setWrapped(enabled);
    irViewer.setWrapped(enabled);
  }

  function setPlaygroundRunningState(isRunning: boolean) {
    example.disabled = isRunning;
    stdin.disabled = isRunning;
    optimize.disabled = isRunning;
    run.textContent = isRunning ? "Cancel" : "Run Program";
    run.setAttribute("aria-label", isRunning ? "Cancel run" : "Run program");
    run.classList.toggle("is-cancel", isRunning);
    summary.dataset.state = isRunning ? "running" : "idle";
  }

  function setDetailTab(name: string) {
    syncSubtabActiveState(
      detailTabs,
      detailPanels,
      name,
      (tab) => tab.dataset.detailTab,
      (panel) => panel.dataset.detailPanel,
    );
    syncBytecodeDetailTabChrome(name, outputWrapToggle, bytecodeMeta);
  }

  function setBytecodeDisplay(value: string) {
    renderBytecodeToPre(bytecode, value);
    setBytecodeCountLabel(bytecodeCount, value);
  }

  detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setDetailTab(tab.dataset.detailTab ?? "output");
    });
  });

  setOutputWrap(outputWrap.checked);
  outputWrap.addEventListener("change", () => {
    setOutputWrap(outputWrap.checked);
  });

  setDetailTab(
    detailTabs.find((tab) => tab.classList.contains("is-active"))?.dataset.detailTab ?? "output",
  );

  let playgroundAbort: AbortController | null = null;

  async function renderPlayground() {
    setPlaygroundRunningState(true);
    render(renderSummaryBar(initialRunningProgramRunSummaryItems()), summary);
    errorOutput.textContent = "";

    const abortController = new AbortController();
    playgroundAbort = abortController;
    const unregisterAbort = registerActiveRun(abortController);

    await waitForPaint();

    try {
      const result = await runPlaygroundProgram(sourceEditor.getValue(), stdin.value, optimize.checked, {
        signal: abortController.signal,
        onProgress: ({
          vmCyclesExecuted,
          compileMs,
          executeElapsedMs,
          preprocessed: expandedSrc,
          ir: irText,
          bytecode: bcText,
        }) => {
          if (expandedSrc !== undefined) {
            preprocessedViewer.setValue(expandedSrc);
            irViewer.setValue(irText ?? "");
            setBytecodeDisplay(bcText ?? "");
          }

          render(
            renderSummaryBar(
              progressProgramRunSummaryItems({
                vmCyclesExecuted,
                compileMs,
                executeElapsedMs,
              }),
            ),
            summary,
          );
        },
      });

      const issueCount = result.issues.length;
      const stdoutParts: string[] = [];

      if (result.output) {
        stdoutParts.push(result.output.trimEnd());
      }
      if (result.logs.length) {
        stdoutParts.push(result.logs.join("\n"));
      }

      const stdoutContent = stdoutParts.length ? stdoutParts.join("\n") : "(no output)";
      const diagnostics = [
        stdoutContent,
        issueCount ? `\n\n${issueCount} compiler issue(s):\n${result.issues.join("\n")}` : "",
      ].join("");

      render(renderSummaryBar(completedProgramRunSummaryItems(result)), summary);

      if (result.terminal === "error") {
        render(nothing, output);
        render(html`${result.logs.join("\n") || "Run failed."}`, errorOutput);
        preprocessedViewer.setValue("");
        irViewer.setValue("");
        setBytecodeDisplay("");
        scrollElementToBottom(errorOutput);
      } else {
        render(html`${diagnostics}`, output);
        errorOutput.textContent = "";
        preprocessedViewer.setValue(result.preprocessed);
        irViewer.setValue(result.ir);
        setBytecodeDisplay(result.bytecode);
        scrollElementToBottom(output);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      render(renderSummaryBar(failedProgramRunSummaryItems()), summary);
      render(nothing, output);
      render(html`${message}`, errorOutput);
      preprocessedViewer.setValue("");
      irViewer.setValue("");
      setBytecodeDisplay("");
      scrollElementToBottom(errorOutput);
    } finally {
      unregisterAbort();
      playgroundAbort = null;
      stopRunProgramRunFeedback();
      setPlaygroundRunningState(false);
    }
  }

  function setPlaygroundIdle() {
    render(renderSummaryBar(idleProgramRunSummaryItems()), summary);
    summary.dataset.state = "idle";
    render(html`(Click Run Program to execute.)`, output);
    errorOutput.textContent = "";
    preprocessedViewer.setValue("");
    irViewer.setValue("");
    setBytecodeDisplay("");
  }

  example.addEventListener("change", () => {
    if (example.value === CUSTOM_EXAMPLE_VALUE) {
      syncUrlToRouteState();
      setPlaygroundIdle();
      return;
    }

    skipProgrammaticExampleSync = true;
    sourceEditor.setValue(EXAMPLES[example.value] ?? DEFAULT_SOURCE);
    skipProgrammaticExampleSync = false;
    syncUrlToRouteState();
    setPlaygroundIdle();
  });

  optimize.addEventListener("change", () => {
    syncUrlToRouteState();
    setPlaygroundIdle();
  });

  run.addEventListener("click", () => {
    if (playgroundAbort !== null) {
      playgroundAbort.abort();
      return;
    }
    startRunProgramRunFeedback(run);
    syncUrlToRouteState();
    void renderPlayground();
  });

  setPlaygroundIdle();
}
