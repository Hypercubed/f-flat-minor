import {
  CODETTA_ENTRIES,
  getCodettaSolutionFilename,
  getCodettaSolutionRepoPath,
  type CodettaEntry,
} from "./codetta-data.ts";
import { getCompiledBytecodeDisplay, getCompiledByteScore } from "./program-runner.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback } from "./run-fx.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { formatVmStepCount } from "./format-vm-steps.ts";

const ETUDES: CodettaEntry[] = CODETTA_ENTRIES;
const CODETTA_GITHUB_REPO = "https://github.com/Hypercubed/f-flat-minor";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getCodettaSubmitUrl(slug: string): string {
  return `${CODETTA_GITHUB_REPO}/edit/main/${getCodettaSolutionRepoPath(slug)}`;
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

export function mountCodetta(root: HTMLElement) {
  if (ETUDES.length === 0) {
    throw new Error("No Codetta entries found.");
  }

  root.innerHTML = `
    <section class="codetta">
      <section class="panel codetta-screen" data-screen="list">
        <div class="panel-header">
          <div>
            <p class="panel-label">F♭m Codetta</p>
            <h2>Coda Études</h2>
          </div>
        </div>
        <div class="codetta-list-wrap">
          <table class="codetta-list-table" aria-label="Codetta études list">
            <thead>
              <tr>
                <th>Étude</th>
                <th>Leader</th>
                <th>Compiled bytes</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody id="codetta-etude-list"></tbody>
          </table>
          <a
            class="ghost codetta-suggest-btn"
            href="https://github.com/Hypercubed/f-flat-minor/issues/new?template=codetta-etude.yml"
          >+ Suggest an étude</a>
        </div>
      </section>

      <section class="codetta-screen" data-screen="detail" hidden>
        <div class="codetta-detail-head">
          <button type="button" class="ghost codetta-back-btn" id="codetta-back">← Études</button>
          <div class="codetta-detail-nav" aria-label="Navigate études">
            <button type="button" class="ghost codetta-detail-nav-btn" id="codetta-prev">Previous</button>
            <button type="button" class="ghost codetta-detail-nav-btn" id="codetta-next">Next</button>
          </div>
        </div>

        <section class="codetta-detail-grid">
          <article class="panel">
            <div class="panel-header codetta-etude-header">
              <div>
                <p class="panel-label">F♭m Codetta</p>
                <h2 id="codetta-title"></h2>
              </div>
            </div>
            <div class="codetta-panel-body">
              <p id="codetta-description"></p>
              <p class="panel-label">Expected output</p>
              <pre id="codetta-expected" class="code-block codetta-expected"></pre>
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
              <textarea id="codetta-attempt" class="codetta-editor" spellcheck="false"></textarea>
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
            <div class="subtabs" aria-label="Codetta program details">
              <button type="button" class="subtab is-active" data-codetta-detail-tab="output">Output</button>
              <button type="button" class="subtab" data-codetta-detail-tab="bytecode">Bytecode</button>
            </div>
            <div class="detail-controls">
              <label class="toggle output-wrap-toggle">
                <input id="codetta-output-wrap" type="checkbox" checked />
                <span>Warp output</span>
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
            <button id="codetta-submit" type="button" class="primary" disabled>✦ Submit</button>
            <section id="codetta-submit-help" class="codetta-submit-help" hidden>
              <p class="codetta-submit-head">🏆 New record! Ready to submit?</p>
              <p>Submit opens GitHub's file editor for this etude. GitHub will offer to fork the repository first if needed.</p>
              <p id="codetta-issue-title" class="codetta-issue-title"></p>
              <textarea id="codetta-issue-body" class="codetta-issue-body" readonly></textarea>
              <div class="codetta-submit-actions">
                <button id="codetta-copy" type="button" class="ghost">Copy</button>
                <a
                  class="repo-link codetta-issues-link"
                  href="https://github.com/Hypercubed/f-flat-minor/blob/main/.github/PULL_REQUEST_TEMPLATE/codetta-solution.md"
                  target="_blank"
                  rel="noreferrer"
                >View Codetta PR template ↗</a>
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
  const backButton = root.querySelector<HTMLButtonElement>("#codetta-back");
  const prevButton = root.querySelector<HTMLButtonElement>("#codetta-prev");
  const nextButton = root.querySelector<HTMLButtonElement>("#codetta-next");
  const title = root.querySelector<HTMLElement>("#codetta-title");
  const description = root.querySelector<HTMLElement>("#codetta-description");
  const expected = root.querySelector<HTMLElement>("#codetta-expected");
  const leader = root.querySelector<HTMLElement>("#codetta-leader");
  const bytes = root.querySelector<HTMLElement>("#codetta-bytes");
  const date = root.querySelector<HTMLElement>("#codetta-date");
  const attempt = root.querySelector<HTMLTextAreaElement>("#codetta-attempt");
  const loadBest = root.querySelector<HTMLButtonElement>("#codetta-load-best");
  const byteStatus = root.querySelector<HTMLElement>("#codetta-byte-status");
  const runButton = root.querySelector<HTMLButtonElement>("#codetta-run");
  const summary = root.querySelector<HTMLElement>("#codetta-summary");
  const output = root.querySelector<HTMLElement>("#codetta-output");
  const outputWrap = root.querySelector<HTMLInputElement>("#codetta-output-wrap");
  const bytecode = root.querySelector<HTMLElement>("#codetta-bytecode");
  const bytecodeMeta = root.querySelector<HTMLElement>("#codetta-bytecode-meta");
  const bytecodeCount = root.querySelector<HTMLElement>("#codetta-bytecode-count");
  const result = root.querySelector<HTMLElement>("#codetta-result");
  const submit = root.querySelector<HTMLButtonElement>("#codetta-submit");
  const submitHelp = root.querySelector<HTMLElement>("#codetta-submit-help");
  const issueTitle = root.querySelector<HTMLElement>("#codetta-issue-title");
  const issueBody = root.querySelector<HTMLTextAreaElement>("#codetta-issue-body");
  const copyButton = root.querySelector<HTMLButtonElement>("#codetta-copy");
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-codetta-detail-tab]"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>("[data-codetta-detail-panel]"));

  if (
    !listScreen || !detailScreen || !listBody || !backButton || !prevButton || !nextButton || !title || !description || !expected ||
    !leader || !bytes || !date || !attempt || !loadBest || !byteStatus || !runButton || !summary ||
    !output || !outputWrap || !bytecode || !bytecodeMeta || !bytecodeCount || !result || !submit || !submitHelp ||
    !issueTitle || !issueBody || !copyButton
  ) {
    throw new Error("Missing Codetta UI elements.");
  }

  const ui = {
    listScreen,
    detailScreen,
    listBody,
    backButton,
    prevButton,
    nextButton,
    title,
    description,
    expected,
    leader,
    bytes,
    date,
    attempt,
    loadBest,
    byteStatus,
    runButton,
    summary,
    output,
    outputWrap,
    bytecode,
    bytecodeMeta,
    bytecodeCount,
    result,
    submit,
    submitHelp,
    issueTitle,
    issueBody,
    copyButton,
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

  function syncSubmitState() {
    const isRecord = latestMatchedOutput && latestCompiledBytes !== null && latestCompiledBytes < activeEtude.bytes;
    ui.submit.disabled = !isRecord;
    ui.submitHelp.hidden = !isRecord;

    if (!isRecord || latestCompiledBytes === null) {
      ui.issueTitle.textContent = "";
      ui.issueBody.value = "";
      return;
    }

    const submitUrl = getCodettaSubmitUrl(activeEtude.id);
    const solutionPath = getCodettaSolutionRepoPath(activeEtude.id);
    ui.issueTitle.textContent = `Target file: ${solutionPath}`;
    ui.issueBody.value = [
      submitUrl,
      "",
      `GitHub edit target: ${solutionPath}`,
      `Current winning score: ${activeEtude.bytes} bytes`,
      `Your verified score: ${latestCompiledBytes} bytes`,
      "",
      "After committing the file edit in GitHub:",
      "1. Choose Create pull request.",
      "2. Use the Codetta PR template.",
      "3. Include validation notes and the new byte count.",
    ].join("\n");
  }

  function renderEtudeList() {
    ui.listBody.innerHTML = ETUDES.map((etude) => `
      <tr data-etude-id="${etude.id}" role="button" tabindex="0">
        <td>› ${escapeHtml(etude.title)}</td>
        <td>${escapeHtml(etude.leader)}</td>
        <td>${etude.bytes}</td>
        <td>${escapeHtml(etude.date)}</td>
      </tr>
    `).join("");
  }

  function openDetail(etude: CodettaEntry) {
    activeEtude = etude;
    ui.title.textContent = etude.title;
    ui.description.textContent = etude.description;
    ui.expected.textContent = etude.expected;
    ui.leader.textContent = etude.leader;
    ui.bytes.textContent = String(etude.bytes);
    ui.date.textContent = etude.date;
    ui.attempt.value = etude.solution;
    setDetailTab("output");
    invalidateLatestRun();
    syncSubmitState();
    syncDetailNavigation();
    ui.listScreen.hidden = true;
    ui.detailScreen.hidden = false;
  }

  function openList() {
    ui.detailScreen.hidden = true;
    ui.listScreen.hidden = false;
  }

  renderEtudeList();
  setIdleSummary();
  setCodettaRunningState(false);
  openDetail(activeEtude);
  openList();

  ui.detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setDetailTab(tab.dataset.codettaDetailTab ?? "output");
    });
  });

  ui.listBody.addEventListener("click", (event) => {
    const row = (event.target as HTMLElement).closest("tr[data-etude-id]");
    if (!row) {
      return;
    }
    const etude = ETUDES.find((item) => item.id === row.getAttribute("data-etude-id"));
    if (!etude) {
      return;
    }
    openDetail(etude);
  });

  ui.listBody.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    const row = (event.target as HTMLElement).closest("tr[data-etude-id]");
    if (!row) {
      return;
    }
    const etude = ETUDES.find((item) => item.id === row.getAttribute("data-etude-id"));
    if (!etude) {
      return;
    }
    event.preventDefault();
    openDetail(etude);
  });

  ui.backButton.addEventListener("click", openList);
  ui.prevButton.addEventListener("click", () => {
    const index = getEtudeIndex(activeEtude);

    if (index <= 0) {
      return;
    }

    openDetail(ETUDES[index - 1]);
  });

  ui.nextButton.addEventListener("click", () => {
    const index = getEtudeIndex(activeEtude);

    if (index === -1 || index >= ETUDES.length - 1) {
      return;
    }

    openDetail(ETUDES[index + 1]);
  });

  ui.loadBest.addEventListener("click", () => {
    ui.attempt.value = activeEtude.solution;
    invalidateLatestRun();
    syncSubmitState();
  });

  ui.attempt.addEventListener("input", () => {
    invalidateLatestRun();
    syncSubmitState();
  });

  ui.runButton.addEventListener("click", async () => {
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
      const run = await runPlaygroundProgram(ui.attempt.value, "", true, {
        filename: getCodettaSolutionFilename(activeEtude.id),
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

      const actual = run.output.trimEnd();
      const expectedOutput = activeEtude.expected.trimEnd();
      latestMatchedOutput = actual === expectedOutput;
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
      stopRunProgramRunFeedback();
      setCodettaRunningState(false);
    }
  });

  ui.submit.addEventListener("click", () => {
    if (ui.submit.disabled) {
      return;
    }

    window.location.assign(getCodettaSubmitUrl(activeEtude.id));
  });

  ui.copyButton.addEventListener("click", async () => {
    const value = ui.issueBody.value;

    try {
      await navigator.clipboard.writeText(value);
      ui.copyButton.textContent = "Copied!";
      window.setTimeout(() => {
        ui.copyButton.textContent = "Copy";
      }, 1200);
    } catch {
      ui.issueBody.focus();
      ui.issueBody.select();
    }
  });
}
