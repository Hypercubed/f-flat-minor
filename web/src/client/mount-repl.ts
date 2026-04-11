import { html, render } from "lit-html";
import type { ValueInspection } from "../../../typescript/core/src/engine.ts";
import { ReplSession, type StackItem } from "./repl-session.ts";
import { renderReplShell, replInspectContentTemplate, replStackListTemplate } from "./repl-ui.ts";
import { triggerReplKeyFeedback } from "./run-fx.ts";

function requireElement<T extends Element>(
  root: ParentNode,
  selector: string,
  kind = "required element",
): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing ${kind}: ${selector}`);
  }

  return element;
}

function scrollElementToBottom(element: HTMLElement) {
  element.scrollTop = element.scrollHeight;
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export function mountRepl(root: HTMLElement) {
  if (root.dataset.mounted === "true") {
    return;
  }

  render(renderReplShell(), root);
  root.dataset.mounted = "true";

  const replCommand = requireElement<HTMLInputElement>(root, "#repl-command");
  const replReset = requireElement<HTMLButtonElement>(root, "#repl-reset");
  const replStatus = requireElement<HTMLElement>(root, "#repl-status");
  const replOutput = requireElement<HTMLElement>(root, "#repl-output");
  const replOutputWrap = requireElement<HTMLInputElement>(root, "#repl-output-wrap");
  const replStack = requireElement<HTMLElement>(root, "#repl-stack");
  const replDepth = requireElement<HTMLElement>(root, "#repl-depth");
  const replInspect = requireElement<HTMLElement>(root, "#repl-inspect");
  const replInspectBack = requireElement<HTMLButtonElement>(root, "#repl-inspect-back");
  const replInspectClose = requireElement<HTMLButtonElement>(root, "#repl-inspect-close");
  const replInspectContent = requireElement<HTMLElement>(root, "#repl-inspect-content");

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

  function setReplOutputWrap(enabled: boolean) {
    replOutput.classList.toggle("is-wrapped", enabled);
  }

  function renderInspectPanel(info: ValueInspection | null) {
    if (info === null) {
      replInspect.classList.remove("is-visible");
      return;
    }

    render(replInspectContentTemplate(info), replInspectContent);
    replInspectBack.disabled = inspectCurrentIndex <= 0;
    replInspectClose.style.display = "inline-block";
    replInspect.classList.add("is-visible");
  }

  function pushInspection(info: ValueInspection) {
    if (inspectCurrentIndex < inspectHistory.length - 1) {
      inspectHistory.splice(inspectCurrentIndex + 1);
    }
    inspectHistory.push(info);
    inspectCurrentIndex++;
    renderInspectPanel(info);
  }

  function clearInspection() {
    inspectHistory.length = 0;
    inspectCurrentIndex = -1;
    replInspect.classList.remove("is-visible");
  }

  function goBack() {
    if (inspectCurrentIndex > 0) {
      inspectCurrentIndex--;
      renderInspectPanel(inspectHistory[inspectCurrentIndex] ?? null);
      return;
    }

    if (inspectCurrentIndex === 0) {
      clearInspection();
    }
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
      clearInspection();
    } finally {
      setReplRunningState(false);
      replCommand.focus();
    }
  });

  replOutputWrap.addEventListener("change", () => {
    setReplOutputWrap(replOutputWrap.checked);
  });

  replStack.addEventListener("click", (event) => {
    const row = (event.target as HTMLElement).closest(".repl-stack-row");
    if (!row) {
      return;
    }

    const valueStr = row.getAttribute("data-value");
    if (!valueStr) {
      return;
    }

    clearInspection();
    pushInspection(replSession.inspectValue(valueStr));
  });

  replInspectContent.addEventListener("click", (event) => {
    const token = (event.target as HTMLElement).closest(".inspect-token.inspectable");
    if (!token) {
      return;
    }

    const valueStr = token.getAttribute("data-value");
    if (!valueStr) {
      return;
    }

    pushInspection(replSession.inspectValue(valueStr));
  });

  replInspectBack.addEventListener("click", () => {
    goBack();
  });

  replInspectClose.addEventListener("click", () => {
    clearInspection();
  });

  renderReplStack([]);
  setReplOutputWrap(replOutputWrap.checked);
  renderReplTranscript();
  replCommand.focus();
}
