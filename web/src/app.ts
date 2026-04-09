import { mountReadonlySourceViewer, mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import {
  CUSTOM_EXAMPLE_VALUE,
  DEFAULT_EXAMPLE_PATH,
  DEFAULT_SOURCE,
  EXAMPLES,
  EXAMPLE_OPTIONS_HTML,
} from "./examples.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { getCompiledBytecodeDisplay, getCompiledByteScore } from "./program-runner.ts";
import { ReplSession } from "./repl-session.ts";
import {
  buildAppUrl,
  getMergedAppSearchParams,
  getSearchStringForStateMerge,
  parseAppTab,
  parseCodettaEtudeParam,
  type AppTab,
} from "./app-url-state.ts";
import appShellTemplate from "./templates/app-shell.html?raw";
import helpTemplate from "./templates/help.html?raw";
import { mountTutorial } from "./tutorial.ts";
import { mountCodetta } from "./codetta.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback, triggerReplKeyFeedback } from "./run-fx.ts";
import { syncRunFeedbackToggleButton, toggleRunFeedback } from "./run-feedback.ts";
import { formatVmStepCount } from "./format-vm-steps.ts";
import { decodeCodeFromUrlParam, encodeCodeForUrlParam } from "./url-codec.ts";
import { abortActiveRuns, registerActiveRun } from "./active-run-cancellation.ts";
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

function formatBytecodeByteCount(value: string) {
  const byteCount = value ? getCompiledByteScore(value) : 0;
  const unit = byteCount === 1 ? "byte" : "bytes";
  return `${byteCount} ${unit}`;
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
  const outputWrap = requireElement<HTMLInputElement>(root, "#output-wrap");
  const outputWrapToggle = requireElement<HTMLElement>(root, "#output-wrap-toggle");
  const errorOutput = requireElement<HTMLElement>(root, "#error");
  const preprocessed = requireElement<HTMLElement>(root, "#preprocessed");
  const ir = requireElement<HTMLElement>(root, "#ir");
  const bytecode = requireElement<HTMLElement>(root, "#bytecode");
  const bytecodeMeta = requireElement<HTMLElement>(root, "#bytecode-meta");
  const bytecodeCount = requireElement<HTMLElement>(root, "#bytecode-count");
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
  const codettaRoot = requireElement<HTMLElement>(root, "#codetta-root");
  const codettaModeNav = requireElement<HTMLElement>(root, "#codetta-mode-nav");
  const codettaModePrev = requireElement<HTMLButtonElement>(root, "#codetta-mode-prev");
  const codettaModeNext = requireElement<HTMLButtonElement>(root, "#codetta-mode-next");

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".mode-tab"));
  const panels = Array.from(root.querySelectorAll<HTMLElement>(".tab-panel"));
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".subtab"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>(".detail-panel"));

  const searchParams = getMergedAppSearchParams(window.location);
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

  let activeTab: AppTab = parseAppTab(window.location.hash);
  let codettaShowsDetailNavigation = false;

  function syncCodettaModeNavigationVisibility() {
    codettaModeNav.hidden = activeTab !== "codetta" || !codettaShowsDetailNavigation;
  }

  let skipProgrammaticExampleSync = false;
  const sourceEditor = mountSourceEditor(source, initialPlaygroundSource, {
    extraExtensions: [tutorialEditorFlatFeedback],
    onDocumentChange: () => {
      if (skipProgrammaticExampleSync) {
        return;
      }
      example.value = CUSTOM_EXAMPLE_VALUE;
      syncUrlToAppState();
    },
  });
  example.value = initialExampleValue;
  const preprocessedViewer = mountReadonlySourceViewer(preprocessed, "");
  const irViewer = mountReadonlySourceViewer(ir, "");

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

  function syncUrlToAppState() {
    let codeParam: string | null = null;
    let exampleParam: string | null = null;
    let etudeParam: string | null = null;

    if (activeTab === "playground") {
      if (example.value === CUSTOM_EXAMPLE_VALUE) {
        const sourceValue = sourceEditor.getValue();

        if (sourceValue) {
          codeParam = encodeCodeForUrlParam(sourceValue);

          if (codeParam === null) {
            return;
          }
        }
      } else {
        exampleParam = example.value;
      }
    } else if (activeTab === "codetta") {
      etudeParam = parseCodettaEtudeParam(window.location);
    }

    const nextUrl = buildAppUrl({
      pathname: window.location.pathname,
      search: getSearchStringForStateMerge(window.location),
      tab: activeTab,
      codeParam,
      exampleParam,
      etudeParam,
    });
    const currentUrl = `${window.location.pathname}${window.location.hash}`;

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

    syncCodettaModeNavigationVisibility();
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

    outputWrapToggle.hidden = name === "bytecode";
    bytecodeMeta.hidden = name !== "bytecode";
  }

  function setBytecodeDisplay(value: string) {
    bytecode.innerHTML = escapeHtml(getCompiledBytecodeDisplay(value));
    bytecodeCount.textContent = formatBytecodeByteCount(value);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextTab = parseAppTab(tab.dataset.tab);

      if (nextTab === activeTab) {
        if (nextTab === "codetta") {
          const nextUrl = buildAppUrl({
            pathname: window.location.pathname,
            search: getSearchStringForStateMerge(window.location),
            tab: "codetta",
            codeParam: null,
            exampleParam: null,
            etudeParam: null,
          });

          const currentUrl = `${window.location.pathname}${window.location.hash}`;

          if (nextUrl !== currentUrl) {
            window.location.hash = nextUrl.slice(nextUrl.indexOf("#") + 1);
          }
        } else {
          syncUrlToAppState();
        }
        return;
      }

      window.location.hash = nextTab;
    });
  });

  const codettaController = mountCodetta(codettaRoot, {
    detailNavigation: {
      prevButton: codettaModePrev,
      nextButton: codettaModeNext,
      onVisibilityChange: (visible) => {
        codettaShowsDetailNavigation = visible;
        syncCodettaModeNavigationVisibility();
      },
    },
  });

  function applyUrlStateFromLocation() {
    abortActiveRuns();
    setTab(window.location.hash);

    if (activeTab === "codetta") {
      codettaController.syncFromLocation();
    }

    syncUrlToAppState();
  }

  window.addEventListener("hashchange", applyUrlStateFromLocation);
  window.addEventListener("popstate", applyUrlStateFromLocation);

  applyUrlStateFromLocation();

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
    document.body.dataset.ready = "false";
    setPlaygroundRunningState(true);
    summary.innerHTML = renderSummary([
      { label: "compile", value: "Running...", tone: "running", showDot: true },
      { label: "execute", value: "…", tone: "pending" },
      { label: "vm steps", value: "…", tone: "pending" },
      { label: "exit", value: "pending", tone: "pending" },
    ]);
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
          summary.innerHTML = renderSummary([
            {
              label: "compile",
              value: compileMs !== undefined ? `${compileMs.toFixed(2)} ms` : "…",
              tone: "running",
            },
            {
              label: "execute",
              value:
                executeElapsedMs !== undefined ? `${executeElapsedMs.toFixed(2)} ms` : "…",
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

      const exitLabel =
        result.terminal === "cancelled"
          ? "cancelled"
          : result.terminal === "error"
          ? "error"
          : String(result.exitCode);
      const exitTone =
        result.terminal === "cancelled"
          ? "pending"
          : result.terminal === "error"
          ? "error"
          : result.exitCode === 0
          ? "success"
          : "error";

      const summaryItems: SummaryItem[] = [
        { label: "compile", value: `${result.compileMs.toFixed(2)} ms` },
        { label: "execute", value: `${result.executeMs.toFixed(2)} ms` },
        {
          label: "vm steps",
          value:
            result.vmCyclesExecuted !== undefined
              ? formatVmStepCount(result.vmCyclesExecuted)
              : "—",
        },
        {
          label: "exit",
          value: exitLabel,
          tone: exitTone,
        },
      ];

      summary.innerHTML = renderSummary(summaryItems);

      if (result.terminal === "error") {
        output.innerHTML = "";
        errorOutput.innerHTML = escapeHtml(result.logs.join("\n") || "Run failed.");
        preprocessedViewer.setValue("");
        irViewer.setValue("");
        setBytecodeDisplay("");
        scrollToBottom(errorOutput);
      } else {
        output.innerHTML = escapeHtml(diagnostics);
        errorOutput.textContent = "";
        preprocessedViewer.setValue(result.preprocessed);
        irViewer.setValue(result.ir);
        setBytecodeDisplay(result.bytecode);
        scrollToBottom(output);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      summary.innerHTML = renderSummary([
        { label: "compile", value: "failed", tone: "error" },
        { label: "execute", value: "—", tone: "pending" },
        { label: "vm steps", value: "—", tone: "pending" },
        { label: "exit", value: "pending", tone: "pending" },
      ]);
      output.innerHTML = "";
      errorOutput.innerHTML = escapeHtml(message);
      preprocessedViewer.setValue("");
      irViewer.setValue("");
      setBytecodeDisplay("");
      scrollToBottom(errorOutput);
    } finally {
      unregisterAbort();
      playgroundAbort = null;
      stopRunProgramRunFeedback();
      setPlaygroundRunningState(false);
      document.body.dataset.ready = "true";
    }
  }

  function setPlaygroundIdle() {
    summary.innerHTML = renderSummary([
      { label: "compile", value: "—", tone: "pending" },
      { label: "execute", value: "—", tone: "pending" },
      { label: "vm steps", value: "—", tone: "pending" },
      { label: "exit", value: "—", tone: "pending" },
    ]);
    summary.dataset.state = "idle";
    output.innerHTML = escapeHtml("(Click Run Program to execute.)");
    errorOutput.textContent = "";
    preprocessedViewer.setValue("");
    irViewer.setValue("");
    setBytecodeDisplay("");
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
    if (example.value === CUSTOM_EXAMPLE_VALUE) {
      syncUrlToAppState();
      setPlaygroundIdle();
      return;
    }

    skipProgrammaticExampleSync = true;
    sourceEditor.setValue(EXAMPLES[example.value] ?? DEFAULT_SOURCE);
    skipProgrammaticExampleSync = false;
    syncUrlToAppState();
    setPlaygroundIdle();
  });

  run.addEventListener("click", () => {
    if (playgroundAbort !== null) {
      playgroundAbort.abort();
      return;
    }
    startRunProgramRunFeedback(run);
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
