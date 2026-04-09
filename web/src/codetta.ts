import {
  buildAppUrl,
  getSearchStringForStateMerge,
  parseCodettaEtudeParam,
} from "./app-url-state.ts";
import {
  CODETTA_ENTRIES,
  getCodettaSolutionFilename,
  getCodettaSolutionRepoPath,
  type CodettaEntry,
} from "./codetta-data.ts";
import { mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import { getCompiledBytecodeDisplay, getCompiledByteScore } from "./program-runner.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback } from "./run-fx.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { formatVmStepCount } from "./format-vm-steps.ts";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { codettaOutputsMatch, normalizeCodettaOutputForComparison } from "./codetta-compare.ts";
import { abortActiveRuns, registerActiveRun } from "./active-run-cancellation.ts";

const ETUDES: CodettaEntry[] = CODETTA_ENTRIES;
const CODETTA_GITHUB_REPO = "https://github.com/Hypercubed/f-flat-minor";
const markdownProcessor = remark()
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

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
  const validationLines = [
    "- compiler/runtime used: Codetta web playground",
    `- source file target: ${getCodettaSolutionFilename(etude.id)}`,
    `- how output was checked: ${matchedOutput ? "Output matched expected in the Codetta runner." : "Not verified in the Codetta runner."}`,
    `- how compiled byte length was checked: Runner reported ${compiledBytes} bytes including FbAbbCb.`,
    `- current leaderboard bytes: ${etude.bytes}`,
  ];

  return validationLines.join("\n");
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

type SummaryTone = "default" | "success" | "error" | "running" | "pending";

interface SummaryItem {
  label: string;
  value: string;
  tone?: SummaryTone;
  showDot?: boolean;
}

function formatBytecodeByteCount(value: string) {
  const byteCount = value ? getCompiledByteScore(value) : 0;
  const unit = byteCount === 1 ? "byte" : "bytes";
  return `${byteCount} ${unit}`;
}

function renderSummary(items: SummaryItem[]) {
  return items.map((item) => {
    const toneClass = item.tone && item.tone !== "default" ? ` ${item.tone}` : "";
    const dot = item.showDot ? '<span class="summary-running-dot" aria-hidden="true"></span>' : "";

    return `
      <span class="summary-bar-item">
        <span class="label">${escapeHtml(item.label)}</span>
        <span class="value${toneClass}">${dot}${escapeHtml(item.value)}</span>
      </span>
    `;
  }).join("");
}

function requireElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing Codetta UI element: ${selector}`);
  }

  return element;
}

function syncCodettaUrl(
  etudeSlug: string | null,
  mode: "push" | "replace",
  onPushNavigation?: () => void,
) {
  const nextUrl = buildAppUrl({
    pathname: window.location.pathname,
    search: getSearchStringForStateMerge(window.location),
    tab: "codetta",
    codeParam: null,
    exampleParam: null,
    etudeParam: etudeSlug,
  });
  const currentUrl = `${window.location.pathname}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    if (mode === "push") {
      window.history.pushState(window.history.state, "", nextUrl);
      onPushNavigation?.();
    } else {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }
}

function getEtudeFromLocation(location: Pick<Location, "hash" | "search">): CodettaEntry | null {
  return ETUDES.find((item) => item.id === parseCodettaEtudeParam(location)) ?? null;
}

export interface CodettaController {
  syncFromLocation(location?: Pick<Location, "hash" | "search">): void;
}

interface CodettaMountOptions {
  detailNavigation: {
    prevButton: HTMLButtonElement;
    nextButton: HTMLButtonElement;
    onVisibilityChange?: (visible: boolean) => void;
  };
  onPushNavigation?: () => void;
}

export function mountCodetta(root: HTMLElement, options: CodettaMountOptions): CodettaController {
  if (ETUDES.length === 0) {
    throw new Error("No Codetta entries found.");
  }

  root.innerHTML = `
    <section class="codetta">
      <section class="codetta-screen codetta-list-screen" data-screen="list">
        <article class="panel codetta-intro-panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">How Codetta Works</p>
              <h2>Small code-golf like challenges</h2>
            </div>
          </div>
          <div class="codetta-panel-body codetta-intro-body">
            <p>Codettas are small F-flat-minor code-golf like challenges with fixed expected output. Many mirror <code>code.golf</code> holes, with a few repo-defined variants.</p>
            <p>Leaderboard rank is based on optimized compiled <code>.ffb</code> byte count, not source length. Output has to match the expected result before the byte score matters.</p>
          </div>
        </article>

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
              <pre id="codetta-output" class="console is-wrapped codetta-output detail-panel is-active" data-codetta-detail-panel="output">(Run your attempt to compare output.)</pre>
              <pre id="codetta-bytecode" class="code-block bytecode-wrap codetta-bytecode detail-panel" data-codetta-detail-panel="bytecode">(Run your attempt to inspect bytecode.)</pre>
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

  const listScreen = root.querySelector<HTMLElement>('[data-screen="list"]');
  const detailScreen = root.querySelector<HTMLElement>('[data-screen="detail"]');
  const listBody = root.querySelector<HTMLElement>("#codetta-etude-list");
  const title = root.querySelector<HTMLElement>("#codetta-title");
  const description = root.querySelector<HTMLElement>("#codetta-description");
  const expected = root.querySelector<HTMLElement>("#codetta-expected");
  const leader = root.querySelector<HTMLElement>("#codetta-leader");
  const bytes = root.querySelector<HTMLElement>("#codetta-bytes");
  const date = root.querySelector<HTMLElement>("#codetta-date");
  const attemptHost = requireElement<HTMLElement>(root, "#codetta-attempt");
  const loadBest = root.querySelector<HTMLButtonElement>("#codetta-load-best");
  const byteStatus = root.querySelector<HTMLElement>("#codetta-byte-status");
  const runButton = root.querySelector<HTMLButtonElement>("#codetta-run");
  const summary = root.querySelector<HTMLElement>("#codetta-summary");
  const output = root.querySelector<HTMLElement>("#codetta-output");
  const outputWrap = root.querySelector<HTMLInputElement>("#codetta-output-wrap");
  const outputWrapToggle = root.querySelector<HTMLElement>("#codetta-output-wrap-toggle");
  const bytecode = root.querySelector<HTMLElement>("#codetta-bytecode");
  const bytecodeMeta = root.querySelector<HTMLElement>("#codetta-bytecode-meta");
  const bytecodeCount = root.querySelector<HTMLElement>("#codetta-bytecode-count");
  const result = root.querySelector<HTMLElement>("#codetta-result");
  const submit = root.querySelector<HTMLButtonElement>("#codetta-submit");
  const submitHelp = root.querySelector<HTMLElement>("#codetta-submit-help");
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-codetta-detail-tab]"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>("[data-codetta-detail-panel]"));

  if (
    !listScreen || !detailScreen || !listBody || !title || !description || !expected ||
    !leader || !bytes || !date || !loadBest || !byteStatus || !runButton || !summary ||
    !output || !outputWrap || !outputWrapToggle || !bytecode || !bytecodeMeta || !bytecodeCount || !result || !submit || !submitHelp
  ) {
    throw new Error("Missing Codetta UI elements.");
  }

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
    prevButton: options.detailNavigation.prevButton,
    nextButton: options.detailNavigation.nextButton,
    title,
    description,
    expected,
    leader,
    bytes,
    date,
    attemptEditor,
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
    ui.detailTabs.forEach((tab) => {
      const active = tab.dataset.codettaDetailTab === name;
      tab.classList.toggle("is-active", active);
    });

    ui.detailPanels.forEach((panel) => {
      const active = panel.dataset.codettaDetailPanel === name;
      panel.classList.toggle("is-active", active);
    });

    ui.outputWrapToggle.hidden = name === "bytecode";
    ui.bytecodeMeta.hidden = name !== "bytecode";
  }

  function setBytecodeDisplay(value: string) {
    ui.bytecode.textContent = getCompiledBytecodeDisplay(value) || "(Run your attempt to inspect bytecode.)";
    ui.bytecodeCount.textContent = formatBytecodeByteCount(value);
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
    ui.runButton.textContent = isRunning ? "Running..." : "▶ Run";
    ui.runButton.setAttribute("aria-label", isRunning ? "Running Codetta attempt" : "Run Codetta attempt");
  }

  function setIdleSummary() {
    ui.summary.innerHTML = renderSummary([
      { label: "compile", value: "—", tone: "pending" },
      { label: "execute", value: "—", tone: "pending" },
      { label: "vm steps", value: "—", tone: "pending" },
      { label: "exit", value: "—", tone: "pending" },
    ]);
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

  function getEtudeIndex(etude: CodettaEntry): number {
    return ETUDES.findIndex((item) => item.id === etude.id);
  }

  function syncDetailNavigation() {
    const index = getEtudeIndex(activeEtude);
    ui.prevButton.disabled = index <= 0;
    ui.nextButton.disabled = index === -1 || index >= ETUDES.length - 1;
  }

  function setDetailNavigationVisible(visible: boolean) {
    options.detailNavigation.onVisibilityChange?.(visible);
  }

  function syncSubmitState() {
    const isRecord = latestMatchedOutput && latestCompiledBytes !== null && latestCompiledBytes < activeEtude.bytes;
    ui.submit.disabled = !isRecord;
    ui.submitHelp.hidden = !isRecord;
  }

  function renderEtudeList() {
    ui.listBody.innerHTML = ETUDES.map((etude) => `
      <button
        type="button"
        class="codetta-list-card"
        role="listitem"
        data-etude-id="${etude.id}"
        aria-label="Open codetta ${escapeHtml(etude.title)}, led by ${escapeHtml(etude.leader)}, ${etude.bytes} compiled bytes"
      >
        <span class="codetta-list-card-title">${escapeHtml(etude.title)}</span>
        <span class="codetta-list-card-meta">${escapeHtml(etude.leader)}</span>
        <span class="codetta-list-card-bytes">${etude.bytes}</span>
      </button>
    `).join("");
  }

  function openDetail(etude: CodettaEntry, navigationOptions?: { history?: "push" | "replace" | "none" }) {
    abortActiveRuns();
    activeEtude = etude;
    ui.title.textContent = etude.title;
    ui.description.innerHTML = renderMarkdown(etude.description);
    ui.expected.textContent = etude.expected;
    ui.leader.textContent = etude.leader;
    ui.bytes.textContent = String(etude.bytes);
    ui.date.textContent = etude.date;
    ui.attemptEditor.setValue(etude.solution);
    setDetailTab("output");
    invalidateLatestRun();
    syncSubmitState();
    syncDetailNavigation();
    ui.listScreen.hidden = true;
    ui.detailScreen.hidden = false;
    setDetailNavigationVisible(true);

    if (navigationOptions?.history && navigationOptions.history !== "none") {
      syncCodettaUrl(
        etude.id,
        navigationOptions.history,
        navigationOptions.history === "push" ? options.onPushNavigation : undefined,
      );
    }

    ui.attemptEditor.focus();
  }

  function openList(navigationOptions?: { history?: "push" | "replace" | "none" }) {
    abortActiveRuns();
    ui.detailScreen.hidden = true;
    ui.listScreen.hidden = false;
    setDetailNavigationVisible(false);

    if (navigationOptions?.history && navigationOptions.history !== "none") {
      syncCodettaUrl(
        null,
        navigationOptions.history,
        navigationOptions.history === "push" ? options.onPushNavigation : undefined,
      );
    }
  }

  function syncFromLocation(location: Pick<Location, "hash" | "search"> = window.location) {
    const etude = getEtudeFromLocation(location);

    if (etude) {
      openDetail(etude, { history: "none" });
      return;
    }

    openList({ history: "none" });
  }

  renderEtudeList();
  setIdleSummary();
  setCodettaRunningState(false);
  openDetail(activeEtude, { history: "none" });
  syncFromLocation();

  ui.detailTabs.forEach((tab) => {
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
    if (!etude) {
      return;
    }
    openDetail(etude, { history: "push" });
  });

  ui.prevButton.addEventListener("click", () => {
    const index = getEtudeIndex(activeEtude);

    if (index <= 0) {
      return;
    }

    openDetail(ETUDES[index - 1], { history: "push" });
  });

  ui.nextButton.addEventListener("click", () => {
    const index = getEtudeIndex(activeEtude);

    if (index === -1 || index >= ETUDES.length - 1) {
      return;
    }

    openDetail(ETUDES[index + 1], { history: "push" });
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
    ui.summary.innerHTML = renderSummary([
      { label: "compile", value: "Running...", tone: "running", showDot: true },
      { label: "execute", value: "…", tone: "pending" },
      { label: "vm steps", value: "…", tone: "pending" },
      { label: "exit", value: "pending", tone: "pending" },
    ]);

    try {
      const run = await runPlaygroundProgram(ui.attemptEditor.getValue(), "", true, {
        filename: getCodettaSolutionFilename(activeEtude.id),
        signal: abortController.signal,
        onProgress: ({ vmCyclesExecuted, compileMs, executeElapsedMs, bytecode: bcText }) => {
          if (bcText !== undefined) {
            setBytecodeDisplay(bcText);
          }

          ui.summary.innerHTML = renderSummary([
            {
              label: "compile",
              value: compileMs !== undefined ? `${compileMs.toFixed(2)} ms` : "…",
              tone: "running",
            },
            {
              label: "execute",
              value: executeElapsedMs !== undefined ? `${executeElapsedMs.toFixed(2)} ms` : "…",
              tone: "running",
              showDot: true,
            },
            {
              label: "vm steps",
              value: formatVmStepCount(vmCyclesExecuted),
              tone: "running",
            },
            { label: "exit", value: "pending", tone: "pending" },
          ]);
        },
      });

      const exitLabel =
        run.terminal === "cancelled"
          ? "cancelled"
          : run.terminal === "error"
          ? "error"
          : String(run.exitCode);
      const exitTone =
        run.terminal === "cancelled"
          ? "pending"
          : run.terminal === "error"
          ? "error"
          : run.exitCode === 0
          ? "success"
          : "error";

      ui.summary.dataset.state = "idle";
      ui.summary.innerHTML = renderSummary([
        { label: "compile", value: `${run.compileMs.toFixed(2)} ms` },
        { label: "execute", value: `${run.executeMs.toFixed(2)} ms` },
        {
          label: "vm steps",
          value: run.vmCyclesExecuted !== undefined ? formatVmStepCount(run.vmCyclesExecuted) : "—",
        },
        { label: "exit", value: exitLabel, tone: exitTone },
      ]);

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
      ui.summary.innerHTML = renderSummary([
        { label: "compile", value: "failed", tone: "error" },
        { label: "execute", value: "—", tone: "pending" },
        { label: "vm steps", value: "—", tone: "pending" },
        { label: "exit", value: "pending", tone: "pending" },
      ]);
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
    if (ui.submit.disabled) {
      return;
    }

    if (latestCompiledBytes === null) {
      return;
    }

    window.location.assign(getCodettaSubmitUrl(
      activeEtude,
      latestCompiledBytes,
      ui.attemptEditor.getValue(),
      latestMatchedOutput,
    ));
  });

  return {
    syncFromLocation,
  };
}
