import { mountReadonlySourceViewer, mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import { DEFAULT_SOURCE, EXAMPLES, EXAMPLE_OPTIONS_HTML } from "./examples.ts";
import { compileProgram } from "./program-runner.ts";
import { ReplSession } from "./repl-session.ts";
import { buildAppUrl, parseAppTab, type AppTab } from "./app-url-state.ts";
import appShellTemplate from "./templates/app-shell.html?raw";
import helpTemplate from "./templates/help.html?raw";
import { mountTutorial } from "./tutorial.ts";
import { triggerReplKeyFeedback, triggerRunProgramFeedback } from "./run-fx.ts";
import { syncRunFeedbackToggleButton, toggleRunFeedback } from "./run-feedback.ts";
import { decodeCodeFromUrlParam, encodeCodeForUrlParam } from "./url-codec.ts";
import type { ValueInspection } from "../../typescript/core/src/engine.ts";
import type { StackItem } from "./repl-session.ts";

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

function scrollToBottom(element: HTMLElement) {
  element.scrollTop = element.scrollHeight;
}

type SummaryTone = "default" | "success" | "error" | "running" | "pending";

interface SummaryItem {
  label: string;
  value: string;
  tone?: SummaryTone;
  showDot?: boolean;
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function renderSummary(items: SummaryItem[]) {
  return items.map((item) => {
    const toneClass = item.tone && item.tone !== "default" ? ` ${item.tone}` : "";
    const dot = item.showDot ? '<span class="summary-running-dot" aria-hidden="true"></span>' : "";

    return `
      <span class="summary-bar-item">
        <span class="label">${item.label}</span>
        <span class="value${toneClass}">${dot}${escapeHtml(item.value)}</span>
      </span>
    `;
  }).join("");
}

function renderAppShell() {
  return appShellTemplate
    .replace("{{EXAMPLE_OPTIONS}}", EXAMPLE_OPTIONS_HTML)
    .replace("{{HELP_HTML}}", helpTemplate);
}

export function mountApp(root: HTMLElement) {
  root.innerHTML = renderAppShell();

  const runFeedbackToggle = requireElement<HTMLButtonElement>(root, "#run-feedback-toggle");
  runFeedbackToggle.addEventListener("click", () => {
    toggleRunFeedback();
    syncRunFeedbackToggleButton(runFeedbackToggle);
  });
  syncRunFeedbackToggleButton(runFeedbackToggle);

  const source = requireElement<HTMLElement>(root, "#source");
  const stdin = requireElement<HTMLInputElement>(root, "#stdin");
  const optimize = requireElement<HTMLInputElement>(root, "#optimize");
  const example = requireElement<HTMLSelectElement>(root, "#example");
  const run = requireElement<HTMLButtonElement>(root, "#run");
  const summary = requireElement<HTMLDivElement>(root, "#summary");
  const output = requireElement<HTMLElement>(root, "#output");
  const errorOutput = requireElement<HTMLElement>(root, "#error");
  const preprocessed = requireElement<HTMLElement>(root, "#preprocessed");
  const ir = requireElement<HTMLElement>(root, "#ir");
  const bytecode = requireElement<HTMLElement>(root, "#bytecode");
  const replCommand = requireElement<HTMLInputElement>(root, "#repl-command");
  const replReset = requireElement<HTMLButtonElement>(root, "#repl-reset");
  const replStatus = requireElement<HTMLElement>(root, "#repl-status");
  const replOutput = requireElement<HTMLElement>(root, "#repl-output");
  const replStack = requireElement<HTMLElement>(root, "#repl-stack");
  const replDepth = requireElement<HTMLElement>(root, "#repl-depth");
  const replInspect = requireElement<HTMLElement>(root, "#repl-inspect");
  const replInspectBack = requireElement<HTMLButtonElement>(root, "#repl-inspect-back");
  const replInspectClose = requireElement<HTMLButtonElement>(root, "#repl-inspect-close");
  const replInspectContent = requireElement<HTMLElement>(root, "#repl-inspect-content");
  const tutorialRoot = requireElement<HTMLElement>(root, "#tutorial-root");

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".mode-tab"));
  const panels = Array.from(root.querySelectorAll<HTMLElement>(".tab-panel"));
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".subtab"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>(".detail-panel"));

  const searchParams = new URLSearchParams(window.location.search);
  const sourceFromUrl = decodeCodeFromUrlParam(searchParams.get("code"));
  const sourceEditor = mountSourceEditor(source, sourceFromUrl ?? DEFAULT_SOURCE, {
    extraExtensions: [tutorialEditorFlatFeedback],
  });
  const preprocessedViewer = mountReadonlySourceViewer(preprocessed, "");
  const irViewer = mountReadonlySourceViewer(ir, "");
  let activeTab: AppTab = parseAppTab(window.location.hash);

  function setPlaygroundRunningState(isRunning: boolean) {
    example.disabled = isRunning;
    stdin.disabled = isRunning;
    optimize.disabled = isRunning;
    run.disabled = isRunning;
    run.textContent = isRunning ? "Running..." : "Run Program";
    summary.dataset.state = isRunning ? "running" : "idle";
  }

  function syncUrlToAppState() {
    let codeParam: string | null = null;

    if (activeTab === "playground") {
      const sourceValue = sourceEditor.getValue();

      if (sourceValue) {
        codeParam = encodeCodeForUrlParam(sourceValue);

        if (codeParam === null) {
          return;
        }
      }
    }

    const nextUrl = buildAppUrl({
      pathname: window.location.pathname,
      search: window.location.search,
      tab: activeTab,
      codeParam,
    });
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }

  function setTab(name: string) {
    activeTab = parseAppTab(name);
    document.body.dataset.mode = activeTab;

    tabs.forEach((tab) => {
      const active = tab.dataset.tab === activeTab;
      tab.classList.toggle("is-active", active);
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === activeTab;
      panel.classList.toggle("is-active", active);
    });
  }

  function setDetailTab(name: string) {
    detailTabs.forEach((tab) => {
      const active = tab.dataset.detailTab === name;
      tab.classList.toggle("is-active", active);
    });

    detailPanels.forEach((panel) => {
      const active = panel.dataset.detailPanel === name;
      panel.classList.toggle("is-active", active);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextTab = parseAppTab(tab.dataset.tab);

      if (nextTab === activeTab) {
        syncUrlToAppState();
        return;
      }

      window.location.hash = nextTab;
    });
  });

  function applyUrlStateFromLocation() {
    setTab(window.location.hash);
    syncUrlToAppState();
  }

  window.addEventListener("hashchange", applyUrlStateFromLocation);

  applyUrlStateFromLocation();

  detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setDetailTab(tab.dataset.detailTab ?? "output");
    });
  });

  async function renderPlayground() {
    document.body.dataset.ready = "false";
    setPlaygroundRunningState(true);
    summary.innerHTML = renderSummary([
      { label: "compile", value: "Running...", tone: "running", showDot: true },
      { label: "execute", value: "pending", tone: "pending" },
      { label: "exit", value: "pending", tone: "pending" },
    ]);
    errorOutput.textContent = "";

    await waitForPaint();

    let compiled: ReturnType<typeof compileProgram> | null = null;

    try {
      compiled = compileProgram(sourceEditor.getValue(), stdin.value, optimize.checked);

      summary.innerHTML = renderSummary([
        { label: "compile", value: `${compiled.compileMs.toFixed(2)} ms` },
        { label: "execute", value: "Running...", tone: "running", showDot: true },
        { label: "exit", value: "pending", tone: "pending" },
      ]);

      await waitForPaint();

      const executed = await compiled.executeAsync();
      const issueCount = compiled.issues.length;
      const stdoutParts: string[] = [];

      if (executed.output) {
        stdoutParts.push(executed.output.trimEnd());
      }
      if (executed.logs.length) {
        stdoutParts.push(executed.logs.join("\n"));
      }

      const stdoutContent = stdoutParts.length ? stdoutParts.join("\n") : "(no output)";
      const diagnostics = [
        stdoutContent,
        issueCount ? `\n\n${issueCount} compiler issue(s):\n${compiled.issues.join("\n")}` : "",
      ].join("");

      summary.innerHTML = renderSummary([
        { label: "compile", value: `${compiled.compileMs.toFixed(2)} ms` },
        { label: "execute", value: `${executed.executeMs.toFixed(2)} ms` },
        {
          label: "exit",
          value: String(executed.exitCode),
          tone: executed.exitCode === 0 ? "success" : "error",
        },
      ]);

      output.innerHTML = escapeHtml(diagnostics);
      errorOutput.textContent = "";
      preprocessedViewer.setValue(compiled.preprocessed);
      irViewer.setValue(compiled.ir);
      bytecode.innerHTML = escapeHtml(compiled.bytecode);
      scrollToBottom(output);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      summary.innerHTML = compiled
        ? renderSummary([
          { label: "compile", value: `${compiled.compileMs.toFixed(2)} ms` },
          { label: "execute", value: "failed", tone: "error" },
          { label: "exit", value: "error", tone: "error" },
        ])
        : renderSummary([
          { label: "compile", value: "failed", tone: "error" },
          { label: "execute", value: "pending", tone: "pending" },
          { label: "exit", value: "pending", tone: "pending" },
        ]);
      output.innerHTML = "";
      errorOutput.innerHTML = escapeHtml(message);
      preprocessedViewer.setValue("");
      irViewer.setValue("");
      bytecode.innerHTML = "";
      scrollToBottom(errorOutput);
    } finally {
      setPlaygroundRunningState(false);
      document.body.dataset.ready = "true";
    }
  }

  function setPlaygroundIdle() {
    summary.innerHTML = renderSummary([
      { label: "compile", value: "—", tone: "pending" },
      { label: "execute", value: "—", tone: "pending" },
      { label: "exit", value: "—", tone: "pending" },
    ]);
    summary.dataset.state = "idle";
    output.innerHTML = escapeHtml("(Click Run Program to execute.)");
    errorOutput.textContent = "";
    preprocessedViewer.setValue("");
    irViewer.setValue("");
    bytecode.innerHTML = "";
    document.body.dataset.ready = "true";
  }

  const replSession = new ReplSession();
  const replTranscript: string[] = [
    "Core library loaded. Try defining words, evaluating quotes, or printing values.",
  ];
  const replHistory: string[] = [];
  let replHistoryIndex = -1;
  const inspectHistory: ValueInspection[] = [];
  let inspectCurrentIndex = -1;
  let stackErrorTimer: number | undefined;
  let replIsRunning = false;

  function setReplRunningState(isRunning: boolean) {
    replIsRunning = isRunning;
    replCommand.disabled = isRunning;
    replReset.disabled = isRunning;
    replStatus.hidden = !isRunning;
    replStatus.setAttribute("aria-hidden", String(!isRunning));
  }

  function shouldShowReplRunningState(line: string) {
    const trimmed = line.trim();

    return trimmed.length > 0 && ![".clear", ".exit", ".quit"].includes(trimmed);
  }

  function renderReplStack(stack: StackItem[]) {
    replDepth.textContent = `depth: ${stack.length}`;

    if (!stack.length) {
      replStack.innerHTML = '<li class="repl-stack-empty">(empty stack)</li>';
      scrollToBottom(replStack);
      return;
    }

    replStack.innerHTML = stack
      .map(
        (item) => `
          <li class="repl-stack-row" data-value="${escapeHtml(item.value)}">
            <span class="repl-stack-index">${item.index}:</span>
            <code class="repl-stack-value">${escapeHtml(item.value)}</code>
          </li>
        `,
      )
      .join("");
    scrollToBottom(replStack);
  }

  function renderReplTranscript() {
    replOutput.innerHTML = escapeHtml(replTranscript.join("\n\n"));
    scrollToBottom(replOutput);
  }

  async function runReplLine() {
    if (replIsRunning) {
      return;
    }

    const line = replCommand.value;
    const showRunningState = shouldShowReplRunningState(line);

    if (showRunningState) {
      setReplRunningState(true);
      await waitForPaint();
    }

    try {
      const result = replSession.execute(line);

      if (result.clearTranscript) {
        replTranscript.splice(0, replTranscript.length);
      }

      if (line.trim()) {
        replHistory.push(line);
        replHistoryIndex = replHistory.length;
      }

      replTranscript.push(`ff> ${line}`);

      if (result.output.trim()) {
        replTranscript.push(result.output.trimEnd());
      }

      if (result.logs.length) {
        replTranscript.push(result.logs.join("\n"));
      }

      if (result.error) {
        replTranscript.push(`Error: ${result.error}`);
        replStack.classList.add("is-error");
        if (stackErrorTimer !== undefined) {
          window.clearTimeout(stackErrorTimer);
        }
        stackErrorTimer = window.setTimeout(() => {
          replStack.classList.remove("is-error");
        }, 500);
      }

      replTranscript.push(`[ ${result.stack.map((item) => item.value).join(" ")} ]`);

      renderReplStack(result.stack);
      renderReplTranscript();
      replCommand.value = "";
    } finally {
      if (showRunningState) {
        setReplRunningState(false);
      }
      replCommand.focus();
    }
  }

  function renderInspectPanel(info: ValueInspection | null) {
    // If info is null, close the panel
    if (info === null) {
      replInspect.classList.remove("is-visible");
      return;
    }

    const parts: string[] = [];
    const isNested = inspectCurrentIndex > 0;

    // Header with value, name, and tags all on one line
    parts.push(`<div class="inspect-header">`);
    parts.push(`<code class="inspect-value">${escapeHtml(String(info.value))}</code>`);
    if (info.name) {
      parts.push(`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${escapeHtml(info.name)}</span>`);
    }
    // Tags on same line
    if (info.isSystem) parts.push(`<span class="inspect-tag system">system</span>`);
    else if (info.isDefined) {
      // Check if it's an anonymous word (quote): defined but no name and value > 255
      const isQuote = !info.name && info.value > 255n;
      parts.push(`<span class="inspect-tag ${isQuote ? "quote" : "user"}">${isQuote ? "quote" : "user-defined"}</span>`);
    }
    parts.push(`</div>`);

    // Stack effect and description for core words (system words)
    if (info.isSystem && (info.stackEffect || info.description)) {
      parts.push(`<div class="inspect-vocabulary">`);
      if (info.stackEffect) {
        parts.push(`<div class="inspect-stack-effect"><code>${escapeHtml(info.stackEffect)}</code></div>`);
      }
      if (info.description) {
        parts.push(`<div class="inspect-description">${escapeHtml(info.description)}</div>`);
      }
      parts.push(`</div>`);
    }

    // Definition with clickable tokens
    if (info.definition && info.definition.length > 0) {
      parts.push(`<div class="inspect-label">Definition:</div>`);
      parts.push(`<div class="inspect-definition">`);

      for (const token of info.definition) {
        const display = token.name ?? String(token.value);
        const tokenClass = token.isCall ? "token-call" : "token-literal";
        // Make inspectable if it's a call OR if it's a defined word (even if stored as literal)
        const inspectable = token.isCall || token.isDefined ? "inspectable" : "";
        const title = token.isCall || token.isDefined ? "Click to inspect" : "Literal value";

        parts.push(
          `<span class="inspect-token ${tokenClass} ${inspectable}" ` +
            `data-value="${escapeHtml(String(token.value))}" ` +
            `title="${title}">` +
            `${escapeHtml(display)}` +
            `</span>`,
        );
      }

      parts.push(`</div>`);
    } else if (!info.isSystem && !info.isDefined) {
      parts.push(`<div class="inspect-note">Plain value (not a word)</div>`);
    }

    replInspectContent.innerHTML = parts.join("");
    // Back button: disabled at root level, enabled when nested
    replInspectBack.disabled = !isNested;
    // Close button: always visible when panel is open
    replInspectClose.style.display = "inline-block";
    replInspect.classList.add("is-visible");
  }

  function pushInspection(info: ValueInspection) {
    // Truncate forward history if we're not at the end
    if (inspectCurrentIndex < inspectHistory.length - 1) {
      inspectHistory.splice(inspectCurrentIndex + 1);
    }
    inspectHistory.push(info);
    inspectCurrentIndex++;
    renderInspectPanel(info);
  }

  function goBack() {
    if (inspectCurrentIndex > 0) {
      // Go back to previous item in history
      inspectCurrentIndex--;
      renderInspectPanel(inspectHistory[inspectCurrentIndex]);
    } else if (inspectCurrentIndex === 0) {
      // At top level, close the panel
      inspectHistory.length = 0;
      inspectCurrentIndex = -1;
      renderInspectPanel(null);
    }
  }

  example.addEventListener("change", () => {
    sourceEditor.setValue(EXAMPLES[example.value] ?? DEFAULT_SOURCE);
    syncUrlToAppState();
    setPlaygroundIdle();
  });

  run.addEventListener("click", () => {
    triggerRunProgramFeedback(run);
    syncUrlToAppState();
    void renderPlayground();
  });

  optimize.addEventListener("change", () => {
    syncUrlToAppState();
    setPlaygroundIdle();
  });

  replCommand.addEventListener("keydown", (event) => {
    triggerReplKeyFeedback(replCommand, event);

    if (event.key === "Enter") {
      event.preventDefault();
      void runReplLine();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!replHistory.length) {
        return;
      }

      replHistoryIndex = Math.max(0, replHistoryIndex - 1);
      replCommand.value = replHistory[replHistoryIndex] ?? "";
      replCommand.setSelectionRange(replCommand.value.length, replCommand.value.length);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!replHistory.length) {
        return;
      }

      replHistoryIndex = Math.min(replHistory.length, replHistoryIndex + 1);
      replCommand.value = replHistory[replHistoryIndex] ?? "";
      replCommand.setSelectionRange(replCommand.value.length, replCommand.value.length);
    }
  });

  replReset.addEventListener("click", async () => {
    if (replIsRunning) {
      return;
    }

    setReplRunningState(true);
    await waitForPaint();

    try {
      replSession.reset();
      replTranscript.splice(0, replTranscript.length, "Session reset. Prelude reloaded.");
      replHistory.splice(0, replHistory.length);
      replHistoryIndex = 0;
      renderReplStack([]);
      renderReplTranscript();
      replCommand.value = "";
    } finally {
      setReplRunningState(false);
      replCommand.focus();
    }
  });

  // Stack click handler for inspection
  replStack.addEventListener("click", (event) => {
    const row = (event.target as HTMLElement).closest(".repl-stack-row");
    if (!row) return;

    const valueStr = row.getAttribute("data-value");
    if (!valueStr) return;

    const info = replSession.inspectValue(valueStr);
    inspectHistory.length = 0; // Clear history on new root inspection
    inspectCurrentIndex = -1;
    pushInspection(info);
  });

  // Definition token click handler for nested inspection
  replInspectContent.addEventListener("click", (event) => {
    const token = (event.target as HTMLElement).closest(".inspect-token.inspectable");
    if (!token) return;

    const valueStr = token.getAttribute("data-value");
    if (!valueStr) return;

    const info = replSession.inspectValue(valueStr);
    pushInspection(info);
  });

  // Back button handler
  replInspectBack.addEventListener("click", () => {
    goBack();
  });

  // Close button handler - closes the inspector at any level
  replInspectClose.addEventListener("click", () => {
    inspectHistory.length = 0;
    inspectCurrentIndex = -1;
    replInspect.classList.remove("is-visible");
  });

  setPlaygroundIdle();
  mountTutorial(tutorialRoot);
  renderReplStack([]);
  renderReplTranscript();
  replCommand.focus();
}
