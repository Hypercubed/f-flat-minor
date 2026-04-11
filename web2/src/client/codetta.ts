import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { CODETTA_ENTRIES, getCodettaSolutionFilename, type CodettaEntry } from "./codetta-data.ts";
import { mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback } from "./run-fx.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { codettaOutputsMatch, normalizeCodettaOutputForComparison } from "./codetta-compare.ts";
import { abortActiveRuns, registerActiveRun } from "./active-run-cancellation.ts";
import { setBytecodeCountLabel, setBytecodePlainText } from "./bytecode-display.ts";
import { syncBytecodeDetailTabChrome, syncSubtabActiveState } from "./detail-tabs.ts";
import {
  completedProgramRunSummaryItems,
  failedProgramRunSummaryItems,
  idleProgramRunSummaryItems,
  initialRunningProgramRunSummaryItems,
  progressProgramRunSummaryItems,
} from "./program-run-summary.ts";
import { requireElement } from "./require-element.ts";
import { getMergedRouteSearchParams } from "./location-search.ts";
import { renderSummaryBar } from "./summary-bar.ts";

const ETUDES: CodettaEntry[] = CODETTA_ENTRIES;
const CODETTA_GITHUB_REPO = "https://github.com/Hypercubed/f-flat-minor";

const markdownProcessor = remark()
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

function renderMarkdown(markdown: string): string {
  const normalized = markdown.replaceAll("\r\n", "\n").trim();
  if (!normalized) {
    return "";
  }
  const rendered = String(markdownProcessor.processSync(normalized));
  return rendered.replaceAll("<a ", '<a target="_blank" rel="noreferrer" ');
}

function getCodettaIssueTitle(slug: string, compiledBytes: number): string {
  return `[Codetta] ${slug} - ${compiledBytes} bytes`;
}

function getCodettaValidationNotes(etude: CodettaEntry, compiledBytes: number, matchedOutput: boolean): string {
  return [
    "- compiler/runtime used: Codetta web playground",
    `- source file target: ${getCodettaSolutionFilename(etude.id)}`,
    `- how output was checked: ${matchedOutput ? "Output matched expected in the Codetta runner." : "Not verified in the Codetta runner."}`,
    `- how compiled byte length was checked: Runner reported ${compiledBytes} bytes including FbAbbCb.`,
    `- current leaderboard bytes: ${etude.bytes}`,
  ].join("\n");
}

function getCodettaSubmitUrl(etude: CodettaEntry, compiledBytes: number, source: string, matchedOutput: boolean): string {
  const url = new URL(`${CODETTA_GITHUB_REPO}/issues/new`);
  url.searchParams.set("template", "codetta-submission.yml");
  url.searchParams.set("title", getCodettaIssueTitle(etude.id, compiledBytes));
  url.searchParams.set("etude", etude.id);
  url.searchParams.set("bytes", String(compiledBytes));
  url.searchParams.set("solution", source);
  url.searchParams.set("validation", getCodettaValidationNotes(etude, compiledBytes, matchedOutput));
  return url.toString();
}

function codettaShellTemplate() {
  return html`
    <section class="codetta">
      <section class="codetta-screen codetta-list-screen" data-screen="list">
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">F♭m Codetta</p>
              <h2>Codettas</h2>
            </div>
          </div>
          <div class="codetta-list-wrap">
            <div id="codetta-etude-list" class="codetta-list-grid" role="list" aria-label="Codettas list"></div>
            <a
              class="ghost codetta-suggest-btn"
              href="https://github.com/Hypercubed/f-flat-minor/issues/new?template=codetta-suggestion.yml"
            >+ Suggest a Codetta</a>
          </div>
        </section>
      </section>

      <section class="codetta-screen" data-screen="detail" hidden>
        <section class="codetta-detail-grid">
          <article class="panel">
            <div class="panel-header codetta-etude-header">
              <div>
                <p class="panel-label">F♭m Codetta</p>
                <h2 id="codetta-title"></h2>
              </div>
            </div>
            <div class="codetta-panel-body">
              <div id="codetta-description" class="codetta-description"></div>
              <details class="codetta-expected-details">
                <summary class="panel-label">Expected output</summary>
                <pre id="codetta-expected" class="code-block codetta-expected"></pre>
              </details>
            </div>
          </article>
          <article class="panel">
            <div class="panel-header"><h2>Current best</h2></div>
            <div class="codetta-panel-body codetta-meta">
              <p><span>Leader:</span> <strong id="codetta-leader"></strong></p>
              <p><span>Compiled bytes:</span> <strong id="codetta-bytes"></strong></p>
              <p><span>Date:</span> <strong id="codetta-date"></strong></p>
            </div>
          </article>
        </section>

        <section class="codetta-attempt-layout">
          <article class="panel codetta-attempt-panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Editor</p>
                <h2>Your attempt</h2>
              </div>
            </div>
            <div class="codetta-attempt-body">
              <div id="codetta-attempt" class="codetta-editor-shell" aria-label="Codetta attempt editor"></div>
              <div class="codetta-attempt-controls">
                <button id="codetta-back" type="button" class="ghost">Back to list</button>
                <button id="codetta-load-best" type="button" class="ghost">Load Current Best</button>
                <button id="codetta-run" type="button" class="primary codetta-run-btn">▶ Run</button>
              </div>
            </div>
          </article>

          <article class="panel codetta-output-panel details-panel-shell">
            <div class="panel-header">
              <div>
                <p class="panel-label">Inspect</p>
                <h2>Program details</h2>
              </div>
            </div>
            <div id="codetta-summary" class="summary-bar"></div>
            <div class="detail-toolbar">
              <div class="subtabs" aria-label="Codetta program details">
                <button type="button" class="subtab is-active" data-codetta-detail-tab="output">Output</button>
                <button type="button" class="subtab" data-codetta-detail-tab="bytecode">Bytecode</button>
              </div>
              <label id="codetta-output-wrap-toggle" class="toggle output-wrap-toggle">
                <input id="codetta-output-wrap" type="checkbox" checked />
                <span>Wrap Output</span>
              </label>
            </div>
            <div class="detail-panels codetta-detail-panels">
              <pre
                id="codetta-output"
                class="console is-wrapped codetta-output detail-panel is-active"
                data-codetta-detail-panel="output"
              >(Run your attempt to compare output.)</pre>
              <pre
                id="codetta-bytecode"
                class="code-block bytecode-wrap codetta-bytecode detail-panel"
                data-codetta-detail-panel="bytecode"
              >(Run your attempt to inspect bytecode.)</pre>
            </div>
            <div id="codetta-bytecode-meta" class="detail-meta" hidden>
              <span class="label">Byte count</span>
              <span id="codetta-bytecode-count" class="value">0 bytes</span>
            </div>
          </article>
        </section>

        <article class="panel codetta-submit-panel">
          <div class="codetta-panel-body codetta-submit-body">
            <p id="codetta-byte-status" class="codetta-byte-status"></p>
            <p id="codetta-result" class="codetta-result">Status: pending</p>
            <section id="codetta-submit-help" class="codetta-submit-help" hidden>
              <p class="codetta-submit-head">🏆 New record! Ready to submit?</p>
              <p>Submit opens a prefilled GitHub issue for this Codetta submission.</p>
              <div class="codetta-submit-actions">
                <button id="codetta-submit" type="button" class="primary" disabled>✦ Submit</button>
              </div>
            </section>
          </div>
        </article>
      </section>
    </section>
  `;
}

interface HistoryState {
  etude: string | null;
}

function readEtudeFromUrl(): string | null {
  const params = getMergedRouteSearchParams(window.location);
  return params.get("codetta") ?? params.get("etude");
}

function writeEtudeToUrl(etudeSlug: string | null, mode: "push" | "replace") {
  const url = new URL(window.location.href);
  if (etudeSlug) {
    url.searchParams.set("codetta", etudeSlug);
  } else {
    url.searchParams.delete("codetta");
  }
  const state: HistoryState = { etude: etudeSlug };
  if (mode === "push") {
    window.history.pushState(state, "", url);
  } else {
    window.history.replaceState(state, "", url);
  }
}

export function mountCodetta(root: HTMLElement) {
  if (ETUDES.length === 0) {
    throw new Error("No Codetta entries found.");
  }

  render(codettaShellTemplate(), root);

  const listScreen = requireElement<HTMLElement>(root, '[data-screen="list"]');
  const detailScreen = requireElement<HTMLElement>(root, '[data-screen="detail"]');
  const listBody = requireElement<HTMLElement>(root, "#codetta-etude-list");
  const title = requireElement<HTMLElement>(root, "#codetta-title");
  const description = requireElement<HTMLElement>(root, "#codetta-description");
  const expected = requireElement<HTMLElement>(root, "#codetta-expected");
  const leader = requireElement<HTMLElement>(root, "#codetta-leader");
  const bytes = requireElement<HTMLElement>(root, "#codetta-bytes");
  const date = requireElement<HTMLElement>(root, "#codetta-date");
  const attemptHost = requireElement<HTMLElement>(root, "#codetta-attempt", "Codetta UI element");
  const backButton = requireElement<HTMLButtonElement>(root, "#codetta-back");
  const loadBest = requireElement<HTMLButtonElement>(root, "#codetta-load-best");
  const byteStatus = requireElement<HTMLElement>(root, "#codetta-byte-status");
  const runButton = requireElement<HTMLButtonElement>(root, "#codetta-run");
  const summary = requireElement<HTMLElement>(root, "#codetta-summary");
  const output = requireElement<HTMLElement>(root, "#codetta-output");
  const outputWrap = requireElement<HTMLInputElement>(root, "#codetta-output-wrap");
  const outputWrapToggle = requireElement<HTMLElement>(root, "#codetta-output-wrap-toggle");
  const bytecode = requireElement<HTMLElement>(root, "#codetta-bytecode");
  const bytecodeMeta = requireElement<HTMLElement>(root, "#codetta-bytecode-meta");
  const bytecodeCount = requireElement<HTMLElement>(root, "#codetta-bytecode-count");
  const result = requireElement<HTMLElement>(root, "#codetta-result");
  const submit = requireElement<HTMLButtonElement>(root, "#codetta-submit");
  const submitHelp = requireElement<HTMLElement>(root, "#codetta-submit-help");
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-codetta-detail-tab]"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>("[data-codetta-detail-panel]"));

  const attemptEditor = mountSourceEditor(attemptHost, ETUDES[0]?.solution ?? "", {
    extraExtensions: [tutorialEditorFlatFeedback],
    onDocumentChange: () => {
      invalidateLatestRun();
      syncSubmitState();
    },
  });

  const ui = {
    listScreen,
    detailScreen,
    listBody,
    title,
    description,
    expected,
    leader,
    bytes,
    date,
    attemptEditor,
    backButton,
    loadBest,
    byteStatus,
    runButton,
    summary,
    output,
    outputWrap,
    outputWrapToggle,
    bytecode,
    bytecodeMeta,
    bytecodeCount,
    result,
    submit,
    submitHelp,
    detailTabs,
    detailPanels,
  };

  let activeEtude = ETUDES[0];
  let latestMatchedOutput = false;
  let latestCompiledBytes: number | null = null;

  function invalidateLatestRun() {
    latestMatchedOutput = false;
    latestCompiledBytes = null;
    ui.output.textContent = "(Run your attempt to compare output.)";
    setBytecodeDisplay("");
    setIdleSummary();
    ui.byteStatus.textContent = "Compiled bytes: run to compute and compare against the current best.";
    delete ui.byteStatus.dataset.tone;
    ui.result.textContent = "Status: run required";
    ui.result.dataset.tone = "pending";
  }

  function setDetailTab(name: string) {
    syncSubtabActiveState(
      ui.detailTabs,
      ui.detailPanels,
      name,
      (tab) => tab.dataset.codettaDetailTab,
      (panel) => panel.dataset.codettaDetailPanel,
    );
    syncBytecodeDetailTabChrome(name, ui.outputWrapToggle, ui.bytecodeMeta);
  }

  function setBytecodeDisplay(value: string) {
    setBytecodePlainText(ui.bytecode, value, "(Run your attempt to inspect bytecode.)");
    setBytecodeCountLabel(ui.bytecodeCount, value);
  }

  function setOutputWrap(enabled: boolean) {
    ui.output.classList.toggle("is-wrapped", enabled);
  }

  setOutputWrap(ui.outputWrap.checked);
  ui.outputWrap.addEventListener("change", () => {
    setOutputWrap(ui.outputWrap.checked);
  });

  function setCodettaRunningState(isRunning: boolean) {
    ui.runButton.disabled = isRunning;
    ui.backButton.disabled = isRunning;
    ui.loadBest.disabled = isRunning;
    ui.runButton.textContent = isRunning ? "Running..." : "▶ Run";
    ui.runButton.setAttribute("aria-label", isRunning ? "Running Codetta attempt" : "Run Codetta attempt");
  }

  function setIdleSummary() {
    render(renderSummaryBar(idleProgramRunSummaryItems()), ui.summary);
    ui.summary.dataset.state = "idle";
  }

  function updateByteStatus(currentBytes: number | null) {
    latestCompiledBytes = currentBytes;

    if (currentBytes === null) {
      ui.byteStatus.textContent = "Compiled bytes: run to compute and compare against the current best.";
      delete ui.byteStatus.dataset.tone;
      return null;
    }

    const delta = currentBytes - activeEtude.bytes;
    if (delta < 0) {
      ui.byteStatus.textContent = `Compiled bytes: ${currentBytes} ← new record candidate (${Math.abs(delta)} under ${activeEtude.bytes})`;
      ui.byteStatus.dataset.tone = "good";
      return currentBytes;
    }
    if (delta === 0) {
      ui.byteStatus.textContent = `Compiled bytes: ${currentBytes} ← tied with current best (${activeEtude.bytes})`;
      ui.byteStatus.dataset.tone = "neutral";
      return currentBytes;
    }

    ui.byteStatus.textContent = `Compiled bytes: ${currentBytes} ← over current best (${activeEtude.bytes})`;
    ui.byteStatus.dataset.tone = "bad";
    return currentBytes;
  }

  function syncSubmitState() {
    const isRecord = latestMatchedOutput && latestCompiledBytes !== null && latestCompiledBytes < activeEtude.bytes;
    ui.submit.disabled = !isRecord;
    ui.submitHelp.hidden = !isRecord;
  }

  function renderEtudeList() {
    render(
      html`${ETUDES.map(
        (etude) => html`
          <button
            type="button"
            class="codetta-list-card"
            role="listitem"
            data-etude-id="${etude.id}"
            aria-label="Open codetta ${etude.title}, led by ${etude.leader}, ${etude.bytes} compiled bytes"
          >
            <span class="codetta-list-card-title">${etude.title}</span>
            <span class="codetta-list-card-meta">${etude.leader}</span>
            <span class="codetta-list-card-bytes">${etude.bytes}</span>
          </button>
        `,
      )}`,
      ui.listBody,
    );
  }

  function openDetail(etude: CodettaEntry, historyMode: "push" | "replace" | "none" = "none") {
    abortActiveRuns();
    activeEtude = etude;
    ui.title.textContent = etude.title;
    render(unsafeHTML(renderMarkdown(etude.description)), ui.description);
    ui.expected.textContent = etude.expected;
    ui.leader.textContent = etude.leader;
    ui.bytes.textContent = String(etude.bytes);
    ui.date.textContent = etude.date;
    ui.attemptEditor.setValue(etude.solution);
    setDetailTab("output");
    invalidateLatestRun();
    syncSubmitState();
    ui.listScreen.hidden = true;
    ui.detailScreen.hidden = false;
    if (historyMode !== "none") {
      writeEtudeToUrl(etude.id, historyMode);
    }
    ui.attemptEditor.focus();
  }

  function openList(historyMode: "push" | "replace" | "none" = "none") {
    abortActiveRuns();
    ui.detailScreen.hidden = true;
    ui.listScreen.hidden = false;
    if (historyMode !== "none") {
      writeEtudeToUrl(null, historyMode);
    }
  }

  function syncFromUrl(historyMode: "replace" | "none" = "none") {
    const slug = readEtudeFromUrl();
    const etude = slug ? ETUDES.find((item) => item.id === slug) ?? null : null;
    if (etude) {
      openDetail(etude, historyMode);
      return;
    }
    openList(historyMode);
  }

  renderEtudeList();
  setIdleSummary();
  setCodettaRunningState(false);
  syncFromUrl("replace");

  detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setDetailTab(tab.dataset.codettaDetailTab ?? "output");
    });
  });

  ui.listBody.addEventListener("click", (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-etude-id]");
    if (!card) {
      return;
    }
    const etude = ETUDES.find((item) => item.id === card.getAttribute("data-etude-id"));
    if (etude) {
      openDetail(etude, "push");
    }
  });

  ui.backButton.addEventListener("click", () => {
    openList("push");
  });

  window.addEventListener("popstate", () => {
    syncFromUrl("none");
  });

  ui.loadBest.addEventListener("click", () => {
    ui.attemptEditor.setValue(activeEtude.solution);
    ui.attemptEditor.focus();
  });

  ui.runButton.addEventListener("click", async () => {
    const abortController = new AbortController();
    const unregisterAbort = registerActiveRun(abortController);

    startRunProgramRunFeedback(ui.runButton);
    setCodettaRunningState(true);
    ui.summary.dataset.state = "running";
    render(renderSummaryBar(initialRunningProgramRunSummaryItems()), ui.summary);

    try {
      const run = await runPlaygroundProgram(ui.attemptEditor.getValue(), "", true, {
        filename: getCodettaSolutionFilename(activeEtude.id),
        signal: abortController.signal,
        onProgress: ({ vmCyclesExecuted, compileMs, executeElapsedMs, bytecode: bcText }) => {
          if (bcText !== undefined) {
            setBytecodeDisplay(bcText);
          }
          render(
            renderSummaryBar(
              progressProgramRunSummaryItems({
                vmCyclesExecuted,
                compileMs,
                executeElapsedMs,
              }),
            ),
            ui.summary,
          );
        },
      });

      ui.summary.dataset.state = "idle";
      render(renderSummaryBar(completedProgramRunSummaryItems(run)), ui.summary);
      setBytecodeDisplay(run.bytecode);
      updateByteStatus(run.compiledBytes);

      if (run.terminal === "error") {
        latestMatchedOutput = false;
        ui.output.textContent = run.logs.join("\n") || "Run failed.";
        ui.result.textContent = "Status: error";
        ui.result.dataset.tone = "bad";
        syncSubmitState();
        return;
      }

      const actual = normalizeCodettaOutputForComparison(run.output);
      latestMatchedOutput = codettaOutputsMatch(run.output, activeEtude.expected);
      ui.output.textContent = actual || "(no output)";
      ui.result.textContent = latestMatchedOutput ? "✓ Output matches expected" : "✗ Output does not match expected";
      ui.result.dataset.tone = latestMatchedOutput ? "good" : "bad";
      syncSubmitState();
    } catch (error) {
      latestMatchedOutput = false;
      latestCompiledBytes = null;
      ui.output.textContent = error instanceof Error ? error.message : String(error);
      setBytecodeDisplay("");
      updateByteStatus(null);
      ui.summary.dataset.state = "idle";
      render(renderSummaryBar(failedProgramRunSummaryItems()), ui.summary);
      ui.result.textContent = "Status: error";
      ui.result.dataset.tone = "bad";
      syncSubmitState();
    } finally {
      unregisterAbort();
      stopRunProgramRunFeedback();
      setCodettaRunningState(false);
    }
  });

  ui.submit.addEventListener("click", () => {
    if (ui.submit.disabled || latestCompiledBytes === null) {
      return;
    }
    window.location.assign(
      getCodettaSubmitUrl(activeEtude, latestCompiledBytes, ui.attemptEditor.getValue(), latestMatchedOutput),
    );
  });
}
