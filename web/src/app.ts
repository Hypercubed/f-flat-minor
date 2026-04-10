import { html, nothing, render } from "lit-html";
import { mountReadonlySourceViewer, mountSourceEditor, tutorialEditorFlatFeedback } from "./editor.ts";
import {
  CUSTOM_EXAMPLE_VALUE,
  DEFAULT_EXAMPLE_PATH,
  DEFAULT_SOURCE,
  EXAMPLES,
} from "./examples.ts";
import { runPlaygroundProgram } from "./run-playground.ts";
import { ReplSession } from "./repl-session.ts";
import {
  buildAppUrl,
  getMergedAppSearchParams,
  getSearchStringForStateMerge,
  parseAppTab,
  parseCodettaEtudeParam,
  type AppTab,
} from "./app-url-state.ts";
import { renderAppShell } from "./templates/app-shell.ts";
import { mountTutorial } from "./tutorial.ts";
import { mountCodetta } from "./codetta.ts";
import { startRunProgramRunFeedback, stopRunProgramRunFeedback, triggerReplKeyFeedback } from "./run-fx.ts";
import { syncRunFeedbackToggleButton, toggleRunFeedback } from "./run-feedback.ts";
import { decodeCodeFromUrlParam, encodeCodeForUrlParam } from "./url-codec.ts";
import { abortActiveRuns, registerActiveRun } from "./active-run-cancellation.ts";
import type { ValueInspection } from "../../typescript/core/src/engine.ts";
import type { StackItem } from "./repl-session.ts";
import { renderBytecodeToPre, setBytecodeCountLabel } from "./ui/bytecode-display.ts";
import { syncBytecodeDetailTabChrome, syncSubtabActiveState } from "./ui/detail-tabs.ts";
import {
  completedProgramRunSummaryItems,
  failedProgramRunSummaryItems,
  idleProgramRunSummaryItems,
  initialRunningProgramRunSummaryItems,
  progressProgramRunSummaryItems,
} from "./ui/program-run-summary.ts";
import { requireElement } from "./ui/require-element.ts";
import { replInspectContentTemplate, replStackListTemplate } from "./ui/repl-views.ts";
import { scrollElementToBottom } from "./ui/scroll-element.ts";
import { renderSummaryBar } from "./ui/summary-bar.ts";
import { waitForPaint } from "./ui/wait-for-paint.ts";

export function mountApp(root: HTMLElement) {
  render(renderAppShell(), root);

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
      document.body.dataset.ready = "true";
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
    render(replStackListTemplate(stack), replStack);
    scrollElementToBottom(replStack);
  }

  function renderReplTranscript() {
    render(html`${replTranscript.join("\n\n")}`, replOutput);
    scrollElementToBottom(replOutput);
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
    if (info === null) {
      replInspect.classList.remove("is-visible");
      return;
    }

    const isNested = inspectCurrentIndex > 0;
    render(replInspectContentTemplate(info), replInspectContent);
    replInspectBack.disabled = !isNested;
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
