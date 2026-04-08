import fibEtude from "../../ff/golf/fib.ffp?raw";
import fibExpected from "../../ff/golf/fib.out?raw";
import fizzbuzzEtude from "../../ff/golf/fizzbuzz.ffp?raw";
import fizzbuzzExpected from "../../ff/golf/fizzbuzz.out?raw";
import piEtude from "../../ff/golf/pi-digits.ffp?raw";
import piExpected from "../../ff/golf/pi-digits.out?raw";
import { runPlaygroundProgram } from "./run-playground.ts";

interface Etude {
  id: string;
  title: string;
  leader: string;
  bytes: number;
  date: string;
  description: string;
  expected: string;
  solution: string;
}

const ETUDES: Etude[] = [
  {
    id: "fibonacci",
    title: "Fibonacci",
    leader: "alice",
    bytes: 38,
    date: "2026-03-12",
    description: "Print the first 20 Fibonacci numbers, one per line.",
    expected: fibExpected.trimEnd(),
    solution: fibEtude.trimEnd(),
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    leader: "bob",
    bytes: 71,
    date: "2026-03-28",
    description: "Print FizzBuzz from 1 through 100.",
    expected: fizzbuzzExpected.trimEnd(),
    solution: fizzbuzzEtude.trimEnd(),
  },
  {
    id: "pi-digits",
    title: "Pi Digits",
    leader: "hypercubed",
    bytes: 42,
    date: "2026-01-20",
    description: "Print the configured π digits benchmark output.",
    expected: piExpected.trimEnd(),
    solution: piEtude.trimEnd(),
  },
];

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function byteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

function issueBodyFor(etude: Etude, bytes: number, code: string): string {
  return [
    `Étude: ${etude.id}`,
    `Bytes: ${bytes}`,
    "Handle: (your name or GitHub handle)",
    "",
    "```ff",
    code.trimEnd(),
    "```",
  ].join("\n");
}

export function mountCodetta(root: HTMLElement) {
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
                <th>Bytes</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody id="codetta-etude-list"></tbody>
          </table>
          <button type="button" class="ghost codetta-suggest-btn">+ Suggest an étude</button>
        </div>
      </section>

      <section class="codetta-screen" data-screen="detail" hidden>
        <div class="codetta-detail-head">
          <button type="button" class="ghost codetta-back-btn" id="codetta-back">← Études</button>
          <div class="codetta-detail-title">
            <p class="panel-label">F♭m Codetta</p>
            <h2 id="codetta-title"></h2>
          </div>
        </div>

        <section class="codetta-detail-grid">
          <article class="panel">
            <div class="panel-header"><h2>Étude</h2></div>
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
              <p><span>Bytes:</span> <strong id="codetta-bytes"></strong></p>
              <p><span>Date:</span> <strong id="codetta-date"></strong></p>
            </div>
          </article>
        </section>

        <article class="panel codetta-attempt-panel">
          <div class="panel-header">
            <h2>Your attempt</h2>
            <button id="codetta-load-best" type="button" class="ghost">Load Current Best</button>
          </div>
          <div class="codetta-panel-body">
            <textarea id="codetta-attempt" class="codetta-editor" spellcheck="false"></textarea>
            <p id="codetta-byte-status" class="codetta-byte-status"></p>
            <button id="codetta-run" type="button" class="primary codetta-run-btn">▶ Run</button>
          </div>
        </article>

        <article class="panel">
          <div class="panel-header"><h2>Output</h2></div>
          <div class="codetta-panel-body">
            <pre id="codetta-output" class="console codetta-output">(Run your attempt to compare output.)</pre>
            <p id="codetta-result" class="codetta-result">Status: pending</p>
            <button id="codetta-submit" type="button" class="primary" disabled>✦ Submit</button>
            <section id="codetta-submit-help" class="codetta-submit-help" hidden>
              <p class="codetta-submit-head">🏆 New record! Ready to submit?</p>
              <p>Copy the payload below and open a GitHub issue.</p>
              <p id="codetta-issue-title" class="codetta-issue-title"></p>
              <textarea id="codetta-issue-body" class="codetta-issue-body" readonly></textarea>
              <div class="codetta-submit-actions">
                <button id="codetta-copy" type="button" class="ghost">Copy</button>
                <a
                  class="repo-link codetta-issues-link"
                  href="https://github.com/Hypercubed/f-flat-minor/issues/new"
                  target="_blank"
                  rel="noreferrer"
                >Open GitHub Issues ↗</a>
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
  const output = root.querySelector<HTMLElement>("#codetta-output");
  const result = root.querySelector<HTMLElement>("#codetta-result");
  const submit = root.querySelector<HTMLButtonElement>("#codetta-submit");
  const submitHelp = root.querySelector<HTMLElement>("#codetta-submit-help");
  const issueTitle = root.querySelector<HTMLElement>("#codetta-issue-title");
  const issueBody = root.querySelector<HTMLTextAreaElement>("#codetta-issue-body");
  const copyButton = root.querySelector<HTMLButtonElement>("#codetta-copy");

  if (
    !listScreen || !detailScreen || !listBody || !backButton || !title || !description || !expected ||
    !leader || !bytes || !date || !attempt || !loadBest || !byteStatus || !runButton || !output ||
    !result || !submit || !submitHelp || !issueTitle || !issueBody || !copyButton
  ) {
    throw new Error("Missing Codetta UI elements.");
  }

  let activeEtude = ETUDES[0];
  let latestMatchedOutput = false;

  function updateByteStatus() {
    const currentBytes = byteLength(attempt.value);
    const delta = currentBytes - activeEtude.bytes;

    if (delta < 0) {
      byteStatus.textContent = `Bytes: ${currentBytes} ← new record candidate (${Math.abs(delta)} under ${activeEtude.bytes})`;
      byteStatus.dataset.tone = "good";
      return currentBytes;
    }

    if (delta === 0) {
      byteStatus.textContent = `Bytes: ${currentBytes} ← tied with current best (${activeEtude.bytes})`;
      byteStatus.dataset.tone = "neutral";
      return currentBytes;
    }

    byteStatus.textContent = `Bytes: ${currentBytes} ← over current best (${activeEtude.bytes})`;
    byteStatus.dataset.tone = "bad";
    return currentBytes;
  }

  function syncSubmitState() {
    const currentBytes = byteLength(attempt.value);
    const isRecord = latestMatchedOutput && currentBytes < activeEtude.bytes;
    submit.disabled = !isRecord;
  }

  function renderEtudeList() {
    listBody.innerHTML = ETUDES.map((etude) => `
      <tr data-etude-id="${etude.id}" role="button" tabindex="0">
        <td>› ${escapeHtml(etude.title)}</td>
        <td>${escapeHtml(etude.leader)}</td>
        <td>${etude.bytes}</td>
        <td>${escapeHtml(etude.date)}</td>
      </tr>
    `).join("");
  }

  function openDetail(etude: Etude) {
    activeEtude = etude;
    latestMatchedOutput = false;
    title.textContent = etude.title;
    description.textContent = etude.description;
    expected.textContent = etude.expected;
    leader.textContent = etude.leader;
    bytes.textContent = String(etude.bytes);
    date.textContent = etude.date;
    attempt.value = etude.solution;
    output.textContent = "(Run your attempt to compare output.)";
    result.textContent = "Status: pending";
    result.dataset.tone = "pending";
    submit.disabled = true;
    submitHelp.hidden = true;
    updateByteStatus();
    listScreen.hidden = true;
    detailScreen.hidden = false;
  }

  function openList() {
    detailScreen.hidden = true;
    listScreen.hidden = false;
  }

  renderEtudeList();
  openDetail(activeEtude);
  openList();

  listBody.addEventListener("click", (event) => {
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

  listBody.addEventListener("keydown", (event) => {
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

  backButton.addEventListener("click", openList);

  loadBest.addEventListener("click", () => {
    attempt.value = activeEtude.solution;
    submitHelp.hidden = true;
    updateByteStatus();
    syncSubmitState();
  });

  attempt.addEventListener("input", () => {
    submitHelp.hidden = true;
    updateByteStatus();
    syncSubmitState();
  });

  runButton.addEventListener("click", async () => {
    runButton.disabled = true;
    runButton.textContent = "Running...";
    submitHelp.hidden = true;

    try {
      const run = await runPlaygroundProgram(attempt.value, "", true);

      if (run.terminal === "error") {
        latestMatchedOutput = false;
        output.textContent = run.logs.join("\n") || "Run failed.";
        result.textContent = "Status: error";
        result.dataset.tone = "bad";
        syncSubmitState();
        return;
      }

      const actual = run.output.trimEnd();
      const expectedOutput = activeEtude.expected.trimEnd();
      latestMatchedOutput = actual === expectedOutput;
      output.textContent = actual || "(no output)";
      result.textContent = latestMatchedOutput ? "✓ Output matches expected" : "✗ Output does not match expected";
      result.dataset.tone = latestMatchedOutput ? "good" : "bad";
      syncSubmitState();
    } catch (error) {
      latestMatchedOutput = false;
      output.textContent = error instanceof Error ? error.message : String(error);
      result.textContent = "Status: error";
      result.dataset.tone = "bad";
      syncSubmitState();
    } finally {
      runButton.disabled = false;
      runButton.textContent = "▶ Run";
    }
  });

  submit.addEventListener("click", () => {
    const bytesNow = byteLength(attempt.value);
    const titleValue = `Issue title: codetta: ${activeEtude.id} (${bytesNow} bytes)`;
    const bodyValue = issueBodyFor(activeEtude, bytesNow, attempt.value);

    issueTitle.textContent = titleValue;
    issueBody.value = bodyValue;
    submitHelp.hidden = false;
  });

  copyButton.addEventListener("click", async () => {
    const value = issueBody.value;

    try {
      await navigator.clipboard.writeText(value);
      copyButton.textContent = "Copied!";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1200);
    } catch {
      issueBody.focus();
      issueBody.select();
    }
  });
}
