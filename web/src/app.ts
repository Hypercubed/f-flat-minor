import { mountReadonlySourceViewer, mountSourceEditor } from "./editor.ts";
import { DEFAULT_SOURCE, EXAMPLES, EXAMPLE_OPTIONS_HTML } from "./examples.ts";
import { runProgram } from "./program-runner.ts";
import { ReplSession } from "./repl-session.ts";
import appShellTemplate from "./templates/app-shell.html?raw";
import helpTemplate from "./templates/help.html?raw";
import { mountTutorial } from "./tutorial.ts";
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
  const replInspect = requireElement<HTMLElement>(root, "#repl-inspect");
  const replInspectBack = requireElement<HTMLButtonElement>(root, "#repl-inspect-back");
  const replInspectContent = requireElement<HTMLElement>(root, "#repl-inspect-content");
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
  const inspectHistory: ValueInspection[] = [];
  let inspectCurrentIndex = -1;
  let stackErrorTimer: number | undefined;

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

  function renderInspectPanel(info: ValueInspection, showBack: boolean = false) {
    const parts: string[] = [];

    // Header with value and name
    parts.push(`<div class="inspect-header">`);
    parts.push(`<code class="inspect-value">${escapeHtml(String(info.value))}</code>`);
    if (info.name) {
      parts.push(`<span class="inspect-name">${escapeHtml(info.name)}</span>`);
    }
    parts.push(`</div>`);

    // Tags
    const tags: string[] = [];
    if (info.isSystem) tags.push(`<span class="inspect-tag system">system</span>`);
    else if (info.isDefined) tags.push(`<span class="inspect-tag user">user-defined</span>`);

    if (tags.length) {
      parts.push(`<div class="inspect-tags">${tags.join("")}</div>`);
    }

    // Definition with clickable tokens
    if (info.definition && info.definition.length > 0) {
      parts.push(`<div class="inspect-label">Definition:</div>`);
      parts.push(`<div class="inspect-definition">`);

      for (const token of info.definition) {
        const display = token.name ?? String(token.value);
        const tokenClass = token.isCall ? "token-call" : "token-literal";
        const inspectable = token.isCall ? "inspectable" : "";

        parts.push(
          `<span class="inspect-token ${tokenClass} ${inspectable}" ` +
            `data-value="${escapeHtml(String(token.value))}" ` +
            `title="${token.isCall ? "Click to inspect" : "Literal value"}">` +
            `${escapeHtml(display)}` +
            `</span>`,
        );
      }

      parts.push(`</div>`);
    } else if (!info.isSystem && !info.isDefined) {
      parts.push(`<div class="inspect-note">Plain value (not a word)</div>`);
    }

    replInspectContent.innerHTML = parts.join("");
    replInspectBack.disabled = !showBack;
    replInspect.classList.add("is-visible");
  }

  function pushInspection(info: ValueInspection) {
    // Truncate forward history if we're not at the end
    if (inspectCurrentIndex < inspectHistory.length - 1) {
      inspectHistory.splice(inspectCurrentIndex + 1);
    }
    inspectHistory.push(info);
    inspectCurrentIndex++;
    renderInspectPanel(info, inspectHistory.length > 1);
  }

  function goBack() {
    if (inspectCurrentIndex > 0) {
      inspectCurrentIndex--;
      renderInspectPanel(inspectHistory[inspectCurrentIndex], inspectCurrentIndex > 0);
    }
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

  void renderPlayground();
  mountTutorial(tutorialRoot);
  renderReplStack([]);
  renderReplTranscript();
  replCommand.focus();
}
