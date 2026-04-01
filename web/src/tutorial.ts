import { mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import { compileProgram, type RunResult } from "./program-runner.ts";
import { triggerRunProgramFeedback } from "./run-fx.ts";
import { TUTORIAL_PROBLEMS, type TutorialProblem } from "./tutorial-problems.ts";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function requireElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

function renderInlineCopy(value: string) {
  return value
    .split(/(`[^`]+`)/g)
    .map((part) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }

      return escapeHtml(part);
    })
    .join("");
}

type TutorialSummaryTone = "default" | "success" | "error" | "running" | "pending";

interface TutorialSummaryItem {
  label: string;
  value: string;
  tone?: TutorialSummaryTone;
  showDot?: boolean;
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function renderTutorialSummaryItems(items: TutorialSummaryItem[]) {
  return items.map((item) => {
    const toneClass = item.tone && item.tone !== "default" ? ` ${item.tone}` : "";
    const dot = item.showDot ? '<span class="tutorial-summary-dot" aria-hidden="true"></span>' : "";

    return `
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${escapeHtml(item.label)}</span>
        <span class="tutorial-summary-value${toneClass}">${dot}${escapeHtml(item.value)}</span>
      </span>
    `;
  }).join('<span class="tutorial-summary-separator" aria-hidden="true">|</span>');
}

function renderProblemCard(problem: TutorialProblem) {
  const expectedHtml = problem.expected
    ? `
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Expected result</p>
        <pre class="tutorial-guidance-value">${escapeHtml(problem.expected)}</pre>
      </div>
    `
    : "";

  const noteHtml = problem.note
    ? `
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Note</p>
        <p class="tutorial-note">${renderInlineCopy(problem.note)}</p>
      </div>
    `
    : "";

  const stdinHtml = typeof problem.stdin === "string"
    ? `
      <label class="field tutorial-stdin-field">
        <span>stdin</span>
        <input data-role="stdin" type="text" value="${escapeHtml(problem.stdin)}" />
      </label>
    `
    : "";

  return `
    <article class="panel tutorial-card" data-problem-id="${escapeHtml(problem.id)}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${problem.order}</p>
            <h2>${escapeHtml(problem.title)}</h2>
          </div>
          <p class="tutorial-goal">${renderInlineCopy(problem.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${problem.concepts.map((concept) => `<span class="tutorial-concept">${escapeHtml(concept)}</span>`).join("")}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div class="tutorial-editor" data-role="editor" aria-label="${escapeHtml(problem.title)} source editor"></div>
            </div>

            <div class="tutorial-controls">
              ${stdinHtml}
              <div class="actions tutorial-actions">
                <button type="button" data-role="run" class="primary">Run</button>
                <button type="button" data-role="reset" class="ghost">Reset</button>
              </div>
            </div>
          </div>

          <section class="tutorial-result" aria-live="polite">
            <div class="tutorial-run-summary" data-role="summary">Ready to run.</div>
            <pre class="console tutorial-console" data-role="output">Run the snippet to see output.</pre>
            <pre class="tutorial-diagnostics" data-role="diagnostics" hidden></pre>
            <pre class="tutorial-error" data-role="error" hidden></pre>
          </section>
        </div>

        <div class="tutorial-guidance">
          ${expectedHtml}
          ${noteHtml}
        </div>
      </div>
    </article>
  `;
}

function renderTutorialShell() {
  const problems = [...TUTORIAL_PROBLEMS].sort((left, right) => left.order - right.order);

  return `
    <section class="tutorial-page">
      <section class="panel tutorial-intro">
        <div class="tutorial-intro-body">
          <p class="eyebrow">Starter Problems</p>
          <h2>Fifteen runnable lessons, already loaded with working code.</h2>
          <p>
            These cards mirror the completed starter set in <code>_docs/ffm-starter-problems.md</code>.
            Each one starts with the full solution snippet from the doc, so you can run it immediately,
            edit it safely, and compare the result against the expected output guidance.
          </p>
          <p>
            Cards run independently. They do not share stack state, definitions, stdin, or output.
          </p>
        </div>
      </section>

      <section class="tutorial-list" aria-label="Tutorial problems">
        ${problems.map((problem) => renderProblemCard(problem)).join("")}
      </section>
    </section>
  `;
}

function renderOutput(result: RunResult) {
  const stdoutParts: string[] = [];

  if (result.output) {
    stdoutParts.push(result.output.trimEnd());
  }

  if (result.logs.length) {
    stdoutParts.push(result.logs.join("\n"));
  }

  return stdoutParts.filter(Boolean).join("\n") || "(no output)";
}

export function mountTutorial(root: HTMLElement) {
  root.innerHTML = renderTutorialShell();

  const problems = [...TUTORIAL_PROBLEMS].sort((left, right) => left.order - right.order);

  problems.forEach((problem) => {
    const card = requireElement<HTMLElement>(root, `[data-problem-id="${problem.id}"]`);
    const editorHost = requireElement<HTMLElement>(card, "[data-role='editor']");
    const runButton = requireElement<HTMLButtonElement>(card, "[data-role='run']");
    const resetButton = requireElement<HTMLButtonElement>(card, "[data-role='reset']");
    const summary = requireElement<HTMLElement>(card, "[data-role='summary']");
    const output = requireElement<HTMLElement>(card, "[data-role='output']");
    const diagnostics = requireElement<HTMLElement>(card, "[data-role='diagnostics']");
    const error = requireElement<HTMLElement>(card, "[data-role='error']");
    const stdin = card.querySelector<HTMLInputElement>("[data-role='stdin']");
    const sourceEditor = mountSourceEditor(editorHost, problem.source, {
      extraExtensions: [tutorialEditorFlatFeedback],
    });

    function resetCard() {
      sourceEditor.setValue(problem.source);
      if (stdin && typeof problem.stdin === "string") {
        stdin.value = problem.stdin;
      }
      summary.textContent = "Ready to run.";
      output.textContent = "Run the snippet to see output.";
      diagnostics.textContent = "";
      diagnostics.hidden = true;
      error.textContent = "";
      error.hidden = true;
    }

    runButton.addEventListener("click", async () => {
      triggerRunProgramFeedback(runButton);
      runButton.disabled = true;
      resetButton.disabled = true;
      if (stdin) {
        stdin.disabled = true;
      }
      summary.innerHTML = renderTutorialSummaryItems([
        { label: "compile", value: "Running...", tone: "running", showDot: true },
        { label: "execute", value: "pending", tone: "pending" },
        { label: "exit", value: "pending", tone: "pending" },
      ]);
      error.textContent = "";
      error.hidden = true;

      let compiled: ReturnType<typeof compileProgram> | null = null;

      try {
        await waitForPaint();

        compiled = compileProgram(sourceEditor.getValue(), stdin?.value ?? "", true);

        summary.innerHTML = renderTutorialSummaryItems([
          { label: "compile", value: `${compiled.compileMs.toFixed(2)} ms` },
          { label: "execute", value: "Running...", tone: "running", showDot: true },
          { label: "exit", value: "pending", tone: "pending" },
        ]);

        await waitForPaint();

        const executed = compiled.execute();
        const result: RunResult = {
          output: executed.output,
          preprocessed: compiled.preprocessed,
          ir: compiled.ir,
          bytecode: compiled.bytecode,
          issues: compiled.issues,
          stack: executed.stack,
          logs: executed.logs,
          exitCode: executed.exitCode,
          compileMs: compiled.compileMs,
          executeMs: executed.executeMs,
        };

        summary.innerHTML = renderTutorialSummaryItems([
          { label: "compile", value: `${result.compileMs.toFixed(2)} ms` },
          { label: "execute", value: `${result.executeMs.toFixed(2)} ms` },
          {
            label: "exit",
            value: String(result.exitCode),
            tone: result.exitCode === 0 ? "success" : "error",
          },
          {
            label: "issues",
            value: result.issues.length === 1 ? "1 compiler issue" : `${result.issues.length} compiler issues`,
            tone: result.issues.length ? "error" : "default",
          },
        ]);
        output.textContent = renderOutput(result);

        if (result.issues.length) {
          diagnostics.textContent = `Compiler issues:\n${result.issues.join("\n")}`;
          diagnostics.hidden = false;
        } else {
          diagnostics.textContent = "";
          diagnostics.hidden = true;
        }
      } catch (runError) {
        const message = runError instanceof Error ? runError.message : String(runError);

        summary.innerHTML = compiled
          ? renderTutorialSummaryItems([
            { label: "compile", value: `${compiled.compileMs.toFixed(2)} ms` },
            { label: "execute", value: "failed", tone: "error" },
            { label: "exit", value: "error", tone: "error" },
          ])
          : renderTutorialSummaryItems([
            { label: "compile", value: "failed", tone: "error" },
            { label: "execute", value: "pending", tone: "pending" },
            { label: "exit", value: "pending", tone: "pending" },
          ]);
        output.textContent = "";
        diagnostics.textContent = "";
        diagnostics.hidden = true;
        error.textContent = message;
        error.hidden = false;
      } finally {
        if (stdin) {
          stdin.disabled = false;
        }
        runButton.disabled = false;
        resetButton.disabled = false;
      }
    });

    resetButton.addEventListener("click", () => {
      resetCard();
    });

    if (stdin && typeof problem.stdin !== "string") {
      stdin.value = "";
    }
  });
}
