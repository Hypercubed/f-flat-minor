import { mountSourceEditor } from "./editor.ts";
import { runProgram, type RunResult } from "./program-runner.ts";
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
            These cards mirror the completed starter set in <code>docs/ffm-starter-problems.md</code>.
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

function renderSummary(result: RunResult) {
  const issueLabel = result.issues.length === 1 ? "1 compiler issue" : `${result.issues.length} compiler issues`;

  return [
    `compile ${result.compileMs.toFixed(2)} ms`,
    `execute ${result.executeMs.toFixed(2)} ms`,
    `exit ${result.exitCode}`,
    result.issues.length ? issueLabel : "no compiler issues",
  ].join(" | ");
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
    const sourceEditor = mountSourceEditor(editorHost, problem.source);

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

    runButton.addEventListener("click", () => {
      runButton.disabled = true;
      resetButton.disabled = true;
      summary.textContent = "Running...";
      error.textContent = "";
      error.hidden = true;

      try {
        const result = runProgram(sourceEditor.getValue(), stdin?.value ?? "", true);

        summary.textContent = renderSummary(result);
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

        summary.textContent = "Run failed.";
        output.textContent = "";
        diagnostics.textContent = "";
        diagnostics.hidden = true;
        error.textContent = message;
        error.hidden = false;
      } finally {
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
