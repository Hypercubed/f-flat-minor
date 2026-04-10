import { html, nothing, render } from "lit-html";
import { mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import { type RunResult } from "./program-runner.ts";
import { formatVmStepCount } from "./format-vm-steps.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback } from "./run-fx.ts";
import {
  getTutorialSolutionFilename,
  TUTORIAL_PROBLEMS,
  type TutorialProblem,
} from "./tutorial-problems.ts";
import { registerActiveRun } from "./active-run-cancellation.ts";
import { runExitDisplay } from "./program-run-summary.ts";
import { requireElement } from "./require-element.ts";
import { waitForPaint } from "./wait-for-paint.ts";

function renderInlineCopy(value: string) {
  return html`${value.split(/(`[^`]+`)/g).map((part) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return html`<code>${part.slice(1, -1)}</code>`;
    }
    return part;
  })}`;
}

type TutorialSummaryTone = "default" | "success" | "error" | "running" | "pending";

interface TutorialSummaryItem {
  label: string;
  value: string;
  tone?: TutorialSummaryTone;
  showDot?: boolean;
}

function renderTutorialSummaryTemplate(items: TutorialSummaryItem[]) {
  return html`${items.flatMap((item, index) => {
    const toneClass = item.tone && item.tone !== "default" ? ` ${item.tone}` : "";
    const node = html`
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${item.label}</span>
        <span class="tutorial-summary-value${toneClass}">
          ${item.showDot ? html`<span class="tutorial-summary-dot" aria-hidden="true"></span>` : nothing}
          ${item.value}
        </span>
      </span>
    `;
    if (index === 0) {
      return [node];
    }
    return [html`<span class="tutorial-summary-separator" aria-hidden="true">|</span>`, node];
  })}`;
}

function renderProblemCard(problem: TutorialProblem) {
  const expectedBlock = problem.expected
    ? html`
        <div class="tutorial-guidance-block">
          <p class="tutorial-guidance-label">Expected result</p>
          <pre class="tutorial-guidance-value">${problem.expected}</pre>
        </div>
      `
    : nothing;

  const noteBlock = problem.note
    ? html`
        <div class="tutorial-guidance-block">
          <p class="tutorial-guidance-label">Note</p>
          <p class="tutorial-note">${renderInlineCopy(problem.note)}</p>
        </div>
      `
    : nothing;

  const stdinField =
    typeof problem.stdin === "string"
      ? html`
          <label class="field tutorial-stdin-field">
            <span>stdin</span>
            <input data-role="stdin" type="text" .value="${problem.stdin}" />
          </label>
        `
      : nothing;

  return html`
    <article class="panel tutorial-card" data-problem-id="${problem.id}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${problem.order}</p>
            <h2>${problem.title}</h2>
          </div>
          <p class="tutorial-goal">${renderInlineCopy(problem.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${problem.concepts.map((concept) => html`<span class="tutorial-concept">${concept}</span>`)}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div
                class="tutorial-editor"
                data-role="editor"
                aria-label="${problem.title} source editor"
              ></div>
            </div>

            <div class="tutorial-controls">
              ${stdinField}
              <div class="actions tutorial-actions">
                <button type="button" data-role="run" class="primary tutorial-run-btn" aria-label="Run">Run</button>
                <button type="button" data-role="reset" class="ghost-button">Reset</button>
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
          ${expectedBlock}
          ${noteBlock}
        </div>
      </div>
    </article>
  `;
}

function renderTutorialShell() {
  const problems = [...TUTORIAL_PROBLEMS].sort((left, right) => left.order - right.order);

  return html`
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
        ${problems.map((problem) => renderProblemCard(problem))}
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
  if (root.dataset.mounted === "true") {
    return;
  }
  root.dataset.mounted = "true";

  render(renderTutorialShell(), root);

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

    let runAbort: AbortController | null = null;

    runButton.addEventListener("click", async () => {
      if (runAbort !== null) {
        runAbort.abort();
        return;
      }
      startRunProgramRunFeedback(runButton);
      runButton.textContent = "Cancel";
      runButton.setAttribute("aria-label", "Cancel run");
      runButton.classList.add("is-cancel");
      resetButton.disabled = true;
      if (stdin) {
        stdin.disabled = true;
      }
      render(
        renderTutorialSummaryTemplate([
          { label: "compile", value: "Running...", tone: "running", showDot: true },
          { label: "execute", value: "pending", tone: "pending" },
          { label: "exit", value: "pending", tone: "pending" },
        ]),
        summary,
      );
      error.textContent = "";
      error.hidden = true;

      const abortController = new AbortController();
      runAbort = abortController;
      const unregisterAbort = registerActiveRun(abortController);

      try {
        await waitForPaint();

        render(
          renderTutorialSummaryTemplate([
            { label: "compile", value: "Running...", tone: "running", showDot: true },
            { label: "execute", value: "pending", tone: "pending" },
            { label: "exit", value: "pending", tone: "pending" },
          ]),
          summary,
        );

        await waitForPaint();

        const result = await runPlaygroundProgram(sourceEditor.getValue(), stdin?.value ?? "", true, {
          filename: getTutorialSolutionFilename(problem.id),
          signal: abortController.signal,
          onProgress: ({ vmCyclesExecuted, compileMs }) => {
            render(
              renderTutorialSummaryTemplate([
                {
                  label: "compile",
                  value: compileMs !== undefined ? `${compileMs.toFixed(2)} ms` : "…",
                  tone: "running",
                },
                {
                  label: "execute",
                  value: `${formatVmStepCount(vmCyclesExecuted)} vm steps`,
                  tone: "running",
                  showDot: true,
                },
                { label: "exit", value: "pending", tone: "pending" },
              ]),
              summary,
            );
          },
        });

        const exit = runExitDisplay(result);

        render(
          renderTutorialSummaryTemplate([
            { label: "compile", value: `${result.compileMs.toFixed(2)} ms` },
            { label: "execute", value: `${result.executeMs.toFixed(2)} ms` },
            {
              label: "exit",
              value: exit.value,
              tone: exit.tone,
            },
            {
              label: "issues",
              value: result.issues.length === 1 ? "1 compiler issue" : `${result.issues.length} compiler issues`,
              tone: result.issues.length ? "error" : "default",
            },
            ...(result.vmCyclesExecuted !== undefined
              ? [
                  {
                    label: "vm steps",
                    value: formatVmStepCount(result.vmCyclesExecuted),
                    tone: "default" as const,
                  },
                ]
              : []),
          ]),
          summary,
        );
        output.textContent = renderOutput(result);

        if (result.terminal === "error") {
          diagnostics.textContent = "";
          diagnostics.hidden = true;
          error.textContent = result.logs.join("\n") || "Run failed.";
          error.hidden = false;
        } else if (result.issues.length) {
          diagnostics.textContent = `Compiler issues:\n${result.issues.join("\n")}`;
          diagnostics.hidden = false;
          error.textContent = "";
          error.hidden = true;
        } else {
          diagnostics.textContent = "";
          diagnostics.hidden = true;
          error.textContent = "";
          error.hidden = true;
        }
      } catch (runError) {
        const message = runError instanceof Error ? runError.message : String(runError);

        render(
          renderTutorialSummaryTemplate([
            { label: "compile", value: "failed", tone: "error" },
            { label: "execute", value: "pending", tone: "pending" },
            { label: "exit", value: "pending", tone: "pending" },
          ]),
          summary,
        );
        output.textContent = "";
        diagnostics.textContent = "";
        diagnostics.hidden = true;
        error.textContent = message;
        error.hidden = false;
      } finally {
        unregisterAbort();
        runAbort = null;
        stopRunProgramRunFeedback();
        if (stdin) {
          stdin.disabled = false;
        }
        runButton.textContent = "Run";
        runButton.setAttribute("aria-label", "Run");
        runButton.classList.remove("is-cancel");
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
