import { mountReadonlySourceViewer, mountSourceEditor } from "./editor.ts";
import { DEFAULT_SOURCE, EXAMPLES, EXAMPLE_OPTIONS_HTML } from "./examples.ts";
import { runProgram } from "./program-runner.ts";
import { ReplSession } from "./repl-session.ts";
import appShellTemplate from "./templates/app-shell.html?raw";
import helpTemplate from "./templates/help.html?raw";
import { mountTutorial } from "./tutorial.ts";
import { decodeCodeFromUrlParam, encodeCodeForUrlParam } from "./url-codec.ts";

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

function renderAppShell() {
  return appShellTemplate
    .replace("{{EXAMPLE_OPTIONS}}", EXAMPLE_OPTIONS_HTML)
    .replace("{{HELP_HTML}}", helpTemplate);
}

export function mountApp(root: HTMLElement) {
  root.innerHTML = renderAppShell();

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
  const detailTools = requireElement<HTMLElement>(root, "#detail-tools");
  const replCommand = requireElement<HTMLInputElement>(root, "#repl-command");
  const replReset = requireElement<HTMLButtonElement>(root, "#repl-reset");
  const replOutput = requireElement<HTMLElement>(root, "#repl-output");
  const replStack = requireElement<HTMLElement>(root, "#repl-stack");
  const replDepth = requireElement<HTMLElement>(root, "#repl-depth");
  const tutorialRoot = requireElement<HTMLElement>(root, "#tutorial-root");

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".mode-tab"));
  const panels = Array.from(root.querySelectorAll<HTMLElement>(".tab-panel"));
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".subtab"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>(".detail-panel"));

  const searchParams = new URLSearchParams(window.location.search);
  const sourceFromUrl = decodeCodeFromUrlParam(searchParams.get("code"));
  const sourceEditor = mountSourceEditor(source, sourceFromUrl ?? DEFAULT_SOURCE);
  const preprocessedViewer = mountReadonlySourceViewer(preprocessed, "");
  const irViewer = mountReadonlySourceViewer(ir, "");

  function syncCodeParamToUrl() {
    const params = new URLSearchParams(window.location.search);
    const sourceValue = sourceEditor.getValue();

    if (sourceValue) {
      const encodedSource = encodeCodeForUrlParam(sourceValue);

      if (encodedSource === null) {
        return;
      }

      params.set("code", encodedSource);
    } else {
      params.delete("code");
    }

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }

  function setTab(name: string) {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.classList.toggle("is-active", active);
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === name;
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

    detailTools.hidden = !(name === "ir" || name === "bytecode");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setTab(tab.dataset.tab ?? "playground");
    });
  });

  detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setDetailTab(tab.dataset.detailTab ?? "output");
    });
  });

  async function renderPlayground() {
    document.body.dataset.ready = "false";

    try {
      const result = runProgram(sourceEditor.getValue(), stdin.value, optimize.checked);
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

      summary.innerHTML = `
        <span class="summary-bar-item">
          <span class="label">compile</span>
          <span class="value">${result.compileMs.toFixed(2)} ms</span>
        </span>
        <span class="summary-bar-item">
          <span class="label">execute</span>
          <span class="value">${result.executeMs.toFixed(2)} ms</span>
        </span>
        <span class="summary-bar-item">
          <span class="label">exit</span>
          <span class="value ${result.exitCode === 0 ? "success" : "error"}">${result.exitCode}</span>
        </span>
      `;

      output.innerHTML = escapeHtml(diagnostics);
      errorOutput.textContent = "";
      preprocessedViewer.setValue(result.preprocessed);
      irViewer.setValue(result.ir);
      bytecode.innerHTML = escapeHtml(result.bytecode);
      scrollToBottom(output);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      summary.innerHTML = `
        <span class="summary-bar-item">
          <span class="label">status</span>
          <span class="value error">failed</span>
        </span>
      `;
      output.innerHTML = "";
      errorOutput.innerHTML = escapeHtml(message);
      preprocessedViewer.setValue("");
      irViewer.setValue("");
      bytecode.innerHTML = "";
      scrollToBottom(errorOutput);
    } finally {
      document.body.dataset.ready = "true";
    }
  }

  const replSession = new ReplSession();
  const replTranscript: string[] = [
    "Core library loaded. Try defining words, evaluating quotes, or printing values.",
  ];
  const replHistory: string[] = [];
  let replHistoryIndex = -1;
  let stackErrorTimer: number | undefined;

  function renderReplStack(stack: string[]) {
    replDepth.textContent = `depth: ${stack.length}`;

    if (!stack.length) {
      replStack.innerHTML = '<li class="repl-stack-empty">(empty stack)</li>';
      scrollToBottom(replStack);
      return;
    }

    replStack.innerHTML = stack
      .map(
        (value, depth) => `
          <li class="repl-stack-row">
            <span class="repl-stack-index">${stack.length - depth - 1}:</span>
            <code class="repl-stack-value">${escapeHtml(value)}</code>
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

  function runReplLine() {
    const line = replCommand.value;
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

    replTranscript.push(`[ ${result.stack.join(" ")} ]`);

    renderReplStack(result.stack);
    renderReplTranscript();
    replCommand.value = "";
    replCommand.focus();
  }

  example.addEventListener("change", () => {
    sourceEditor.setValue(EXAMPLES[example.value] ?? DEFAULT_SOURCE);
    syncCodeParamToUrl();
    void renderPlayground();
  });

  run.addEventListener("click", () => {
    syncCodeParamToUrl();
    void renderPlayground();
  });

  optimize.addEventListener("change", () => {
    syncCodeParamToUrl();
    void renderPlayground();
  });

  replCommand.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runReplLine();
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

  replReset.addEventListener("click", () => {
    replSession.reset();
    replTranscript.splice(0, replTranscript.length, "Session reset. Core library reloaded.");
    replHistory.splice(0, replHistory.length);
    replHistoryIndex = 0;
    renderReplStack([]);
    renderReplTranscript();
    replCommand.value = "";
    replCommand.focus();
  });

  void renderPlayground();
  mountTutorial(tutorialRoot);
  renderReplStack([]);
  renderReplTranscript();
  replCommand.focus();
}
