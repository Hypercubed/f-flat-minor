import coreLib from "../../ff/lib/core.ff?raw";
import atanLib from "../../ff/lib/atan.ffp?raw";
import cbrtLib from "../../ff/lib/cbrt.ffp?raw";
import sqrtLib from "../../ff/lib/sqrt.ffp?raw";
import gcdLib from "../../ff/lib/gcd.ffp?raw";
import ackLib from "../../ff/lib/ack.ffp?raw";
import factExample from "../../ff/fact.ffp?raw";
import fizzbuzzExample from "../../ff/fizzbuzz.ffp?raw";
import bottlesExample from "../../ff/99bottles.ffp?raw";
import pascalExample from "../../ff/pascal.ffp?raw";
import cbrtExample from "../../ff/cbrt.ffp?raw";
import sqrtExample from "../../ff/sqrt.ffp?raw";
import gcdExample from "../../ff/gcd.ffp?raw";
import ackExample from "../../ff/ack.ffp?raw";
import piExample from "../../ff/pi.ffp?raw";
import fibExample from "../../ff/fib.ffp?raw";
import catalanExample from "../../ff/catalan.ffp?raw";
import collatzExample from "../../ff/collatz.ffp?raw";
import hanoiExample from "../../ff/hanoi.ffp?raw";
import euler1Example from "../../ff/euler/euler1.ffp?raw";
import euler7Example from "../../ff/euler/euler7.ffp?raw";
import primesLib from "../../ff/lib/primes.ffp?raw";
import primesEncoded from "../../ff/lib/primes-encoded.ff?raw";
import { Compiler, Engine, Optimizer, Preprocessor, formatFfCompatibleIr } from "../../typescript/core/src/mod.ts";

import { mountReadonlySourceViewer, mountSourceEditor } from "./editor.ts";
import { createBrowserPlatform, createPreprocessHost, type VirtualFiles } from "./runtime.ts";
import { decodeCodeFromUrlParam, encodeCodeForUrlParam } from "./url-codec.ts";

interface RunResult {
  output: string;
  preprocessed: string;
  ir: string;
  bytecode: string;
  issues: string[];
  stack: string[];
  logs: string[];
  exitCode: number;
  compileMs: number;
  executeMs: number;
}

interface ReplResult {
  output: string;
  logs: string[];
  stack: string[];
  error?: string;
  clearTranscript?: boolean;
}

const EXAMPLES: Record<string, string> = {
  "/examples/fact.ffp": factExample,
  "/examples/fizzbuzz.ffp": fizzbuzzExample,
  "/examples/99bottles.ffp": bottlesExample,
  "/examples/pascal.ffp": pascalExample,
  "/examples/cbrt.ffp": cbrtExample,
  "/examples/sqrt.ffp": sqrtExample,
  "/examples/gcd.ffp": gcdExample,
  "/examples/ack.ffp": ackExample,
  "/examples/pi.ffp": piExample,
  "/examples/fib.ffp": fibExample,
  "/examples/catalan.ffp": catalanExample,
  "/examples/collatz.ffp": collatzExample,
  "/examples/hanoi.ffp": hanoiExample,
  "/examples/euler1.ffp": euler1Example,
  "/examples/euler7.ffp": euler7Example,
};

const DEFAULT_SOURCE = factExample;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function createVirtualFiles(source: string, filename = "/main.ffp"): VirtualFiles {
  return {
    [filename]: source,
    "/lib/core.ff": coreLib,
    "/lib/atan.ffp": atanLib,
    "/lib/cbrt.ffp": cbrtLib,
    "/lib/sqrt.ffp": sqrtLib,
    "/lib/gcd.ffp": gcdLib,
    "/lib/ack.ffp": ackLib,
    "/lib/primes.ffp": primesLib,
    "/lib/primes-encoded.ff": primesEncoded,
    ...EXAMPLES,
  };
}

function withCapturedConsole<T>(
  collector: (message: string) => void,
  fn: () => T,
): T {
  const originalConsoleLog = console.log;
  console.log = (...args: unknown[]) => {
    collector(args.map(String).join(" "));
  };

  try {
    return fn();
  } finally {
    console.log = originalConsoleLog;
  }
}

function runProgram(source: string, stdin: string, optimize: boolean): RunResult {
  let output = "";
  const logs: string[] = [];
  let exitCode = 0;

  const platform = createBrowserPlatform({
    stdin,
    onWrite(text) {
      output += text;
    },
    onExit(code) {
      exitCode = code;
    },
  });

  const compiler = new Compiler();
  const engine = new Engine(platform);
  const files = createVirtualFiles(source);
  const preprocessor = new Preprocessor(createPreprocessHost(files), {
    engine,
    compiler,
  });

  return withCapturedConsole((message) => logs.push(message), () => {
    const preprocessed = preprocessor.preprocess(
      Preprocessor.tokenize(source),
      "/main.ffp",
    );

    const compileStart = performance.now();
    let ir = compiler.compileToIR(Compiler.tokenize(preprocessed), "/main.ffp");
    const compileEnd = performance.now();
    const issues = compiler.validate(ir);

    if (optimize) {
      ir = new Optimizer().optimize(ir);
    }

    const formattedIr = formatFfCompatibleIr(ir);

    engine.loadIR(ir);

    const executeStart = performance.now();
    engine.run();
    const executeEnd = performance.now();

    return {
      output,
      preprocessed,
      ir: formattedIr,
      bytecode: Compiler.compileToBase64(ir),
      issues,
      stack: engine.getStack().map(String),
      logs,
      exitCode,
      compileMs: compileEnd - compileStart,
      executeMs: executeEnd - executeStart,
    };
  });
}

class ReplSession {
  private compiler!: Compiler;
  private engine!: Engine;
  private preprocessor!: Preprocessor;
  private files!: VirtualFiles;
  private output = "";

  constructor() {
    this.reset();
  }

  reset() {
    this.output = "";
    this.files = createVirtualFiles("", "/repl.ffp");

    const platform = createBrowserPlatform({
      onWrite: (text) => {
        this.output += text;
      },
    });

    this.compiler = new Compiler();
    this.engine = new Engine(platform);
    this.preprocessor = new Preprocessor(createPreprocessHost(this.files), {
      engine: this.engine,
      compiler: this.compiler,
    });

    this.execute(".load /lib/core.ff");
  }

  execute(line: string): ReplResult {
    const trimmed = line.trim();
    const logs: string[] = [];

    if (!trimmed) {
      return {
        output: "",
        logs,
        stack: this.engine.getStack().map(String),
      };
    }

    if (trimmed === ".reset") {
      this.reset();
      return {
        output: "Session reset. Core library reloaded.",
        clearTranscript: true,
        logs,
        stack: this.engine.getStack().map(String),
      };
    }

    if (trimmed === ".clear") {
      return {
        output: "Transcript cleared.",
        clearTranscript: true,
        logs,
        stack: this.engine.getStack().map(String),
      };
    }

    if (trimmed === ".exit" || trimmed === ".quit") {
      return {
        output: "Browser REPL sessions stay open. Use .reset to clear state.",
        logs,
        stack: this.engine.getStack().map(String),
      };
    }

    this.files["/repl.ffp"] = line;
    this.output = "";

    return withCapturedConsole((message) => logs.push(message), () => {
      try {
        const code = this.preprocessor.preprocess([line], "/repl.ffp");
        const ir = this.compiler.compileToIR(Compiler.tokenize(code), "/repl.ffp");
        this.engine.loadIR(ir);
        this.engine.run();

        return {
          output: this.output,
          logs,
          stack: this.engine.getStack().map(String),
        };
      } catch (error) {
        return {
          output: this.output,
          logs,
          stack: this.engine.getStack().map(String),
          error: error instanceof Error ? error.message : String(error),
        };
      }
    });
  }
}

const HELP_HTML = `
  <div class="help-grid">
    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Overview</p>
          <h2>What F-flat-minor is</h2>
        </div>
      </div>
      <div class="help-copy">
        <p>F-flat-minor is a tiny stack-oriented language built around one value type: big integers.</p>
        <p>Programs manipulate a data stack, a queue used during execution, and a vocabulary of built-in and user-defined words.</p>
        <p>The shared TypeScript core in this repo preprocesses source, compiles it to IR and bytecode, and executes the result.</p>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Execution</p>
          <h2>Core model</h2>
        </div>
      </div>
      <div class="help-copy">
        <ul class="help-list">
          <li>Numbers are pushed onto the stack.</li>
          <li>Non-numeric tokens are treated as words and executed.</li>
          <li>The language compiles to base64 VLQ encoded big integers.</li>
          <li>Pointers to words are also just integers, so code and data share the same stack.</li>
        </ul>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Syntax</p>
          <h2>Language details</h2>
        </div>
      </div>
      <div class="help-copy">
        <dl class="help-defs">
          <dt>Numbers</dt>
          <dd><code>42</code>, <code>-3</code>, and other integers are pushed directly.</dd>
          <dt>Words</dt>
          <dd><code>dup</code>, <code>swap</code>, <code>+</code>, <code>putc</code>, and user definitions execute when encountered.</dd>
          <dt>Definitions</dt>
          <dd><code>fact: dup 1 - [ dup 1 - fact * ] ? ;</code> defines a new word.</dd>
          <dt>Quotes</dt>
          <dd><code>[ dup * ]</code> creates an unnamed word and leaves its pointer on the stack.</dd>
          <dt>Pointers</dt>
          <dd><code>[+]</code> pushes a pointer to a word instead of calling it.</dd>
          <dt>Strings</dt>
          <dd><code>'Hello\\sWorld!\\n'</code> expands to character codes on the stack.</dd>
        </dl>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Preprocessor</p>
          <h2>Supported directives</h2>
        </div>
      </div>
      <div class="help-copy">
        <ul class="help-list">
          <li><code>.load path</code>: inline another file every time it appears.</li>
          <li><code>.import path</code>: inline a file once per preprocessor session.</li>
          <li><code>.m ...</code>: evaluate a compile-time macro and splice the resulting stack values into the source.</li>
          <li><code>.exit</code>: request termination from the host.</li>
        </ul>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Useful words</p>
          <h2>Common vocabulary</h2>
        </div>
      </div>
      <div class="help-copy">
        <div class="word-grid">
          <code>dup</code><span>duplicate the top stack item</span>
          <code>swap</code><span>swap the top two items</span>
          <code>drop</code><span>discard the top item</span>
          <code>+</code><span>add the top two values</span>
          <code>*</code><span>multiply the top two values</span>
          <code>?</code><span>conditional execution</span>
          <code>:</code> <span>begin a definition</span>
          <code>;</code> <span>end a definition</span>
          <code>putc</code><span>print a character</span>
          <code>putn</code><span>print a number in the current base</span>
          <code>.</code><span>print the stack to the console/log channel</span>
        </div>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Examples</p>
          <h2>Try these</h2>
        </div>
      </div>
      <div class="help-copy">
        <pre class="code-block help-code">0 'Hello\\sWorld!\\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn</pre>
      </div>
    </section>
  </div>
`;

export function mountApp(root: HTMLElement) {
  root.innerHTML = `
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">f-flat-minor / web</p>
        <h1>Run F-flat-minor in the browser.</h1>
        <p class="lede">
          Playground, REPL, and language help powered by the shared TypeScript core.
        </p>
        <p class="hero-links">
          <a
            class="repo-link"
            href="https://github.com/Hypercubed/f-flat-minor"
            target="_blank"
            rel="noreferrer"
          >View the GitHub repository</a>
        </p>
      </section>

      <nav class="mode-tabs" aria-label="Application modes">
        <button class="mode-tab is-active" data-tab="playground">Playground</button>
        <button class="mode-tab" data-tab="repl">REPL</button>
        <button class="mode-tab" data-tab="help">Help</button>
      </nav>

      <section class="tab-panel is-active" data-panel="playground">
        <section class="workspace">
          <div class="panel editor-panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Editor</p>
                <h2>Main source</h2>
              </div>
            </div>
            <div id="source" aria-label="Main source editor"></div>
            <div class="controls">
              <label class="field">
                <span>Example</span>
                <select id="example">
                <option value="/examples/fact.ffp">fact.ffp</option>
                <option value="/examples/fizzbuzz.ffp">fizzbuzz.ffp</option>
                <option value="/examples/99bottles.ffp">99bottles.ffp</option>
                <option value="/examples/pascal.ffp">pascal.ffp</option>
                <option value="/examples/cbrt.ffp">cbrt.ffp</option>
                <option value="/examples/sqrt.ffp">sqrt.ffp</option>
                <option value="/examples/gcd.ffp">gcd.ffp</option>
                <option value="/examples/ack.ffp">ack.ffp</option>
                <option value="/examples/pi.ffp">pi.ffp</option>
                <option value="/examples/fib.ffp">fib.ffp</option>
                <option value="/examples/catalan.ffp">catalan.ffp</option>
                <option value="/examples/collatz.ffp">collatz.ffp</option>
                <option value="/examples/hanoi.ffp">hanoi.ffp</option>
                <option value="/examples/euler1.ffp">euler1.ffp</option>
                <option value="/examples/euler7.ffp">euler7.ffp</option>
              </select>
              </label>
              <label class="field">
                <span>stdin</span>
                <input id="stdin" type="text" placeholder="Optional input for getc" />
              </label>
              <div class="actions">
                <button id="run" class="primary">Run Program</button>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Inspect</p>
                <h2>Program details</h2>
              </div>
            </div>
            <div id="summary" class="summary-bar"></div>
            <div class="subtabs" aria-label="Program details">
              <button class="subtab is-active" data-detail-tab="output">Output</button>
              <button class="subtab" data-detail-tab="preprocessed">Expanded Source</button>
              <button class="subtab" data-detail-tab="ir">IR</button>
              <button class="subtab" data-detail-tab="bytecode">Bytecode</button>
            </div>
            <div id="detail-tools" class="detail-tools" hidden>
              <label class="toggle">
                <input id="optimize" type="checkbox" checked />
                <span>Optimize</span>
              </label>
            </div>
            <div class="detail-panels">
              <pre id="output" class="console detail-panel is-active" data-detail-panel="output"></pre>
              <pre id="error" class="console detail-panel is-active" data-detail-panel="output"></pre>
              <div id="preprocessed" class="code-block detail-panel" data-detail-panel="preprocessed"></div>
              <div id="ir" class="code-block detail-panel" data-detail-panel="ir"></div>
              <pre id="bytecode" class="code-block detail-panel" data-detail-panel="bytecode"></pre>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="repl">
        <section class="repl-layout">
          <div class="panel repl-pane">
            <div class="panel-header repl-pane-header">
              <div>
                <p class="panel-label">REPL</p>
                <h2>Persistent session</h2>
              </div>
              <button id="repl-reset" class="ghost">Reset Session</button>
            </div>
            <div class="help-copy repl-help-copy">
              <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/core.ff</code>.</p>
              <p>Special commands: <code>.reset</code>, <code>.clear</code>, <code>.exit</code>, <code>.quit</code>.</p>
            </div>
            <div class="repl-left-body">
              <section class="repl-stack-panel" aria-live="polite">
                <div class="repl-stack-head">
                  <span>Stack monitor</span>
                  <span id="repl-depth">0 item(s)</span>
                </div>
                <ol id="repl-stack" class="repl-stack-list" aria-label="Current stack values"></ol>
              </section>
              <label class="field repl-input-field" for="repl-command">
                <span>Command</span>
                <input id="repl-command" type="text" autocomplete="off" placeholder="Type code and press Enter" />
              </label>
              <div class="repl-hint">Tip: use ↑ and ↓ for command history.</div>
            </div>
          </div>

          <div class="panel repl-pane">
            <div class="panel-header">
              <div>
                <p class="panel-label">Console</p>
                <h2>Output & logs</h2>
              </div>
            </div>
            <pre id="repl-output" class="console repl-console"></pre>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="help">
        ${HELP_HTML}
      </section>
    </main>
  `;

  const source = root.querySelector<HTMLElement>("#source");
  const stdin = root.querySelector<HTMLInputElement>("#stdin");
  const optimize = root.querySelector<HTMLInputElement>("#optimize");
  const example = root.querySelector<HTMLSelectElement>("#example");
  const run = root.querySelector<HTMLButtonElement>("#run");
  const summary = root.querySelector<HTMLDivElement>("#summary");
  const output = root.querySelector<HTMLElement>("#output");
  const errorOutput = root.querySelector<HTMLElement>("#error");
  const preprocessed = root.querySelector<HTMLElement>("#preprocessed");
  const ir = root.querySelector<HTMLElement>("#ir");
  const bytecode = root.querySelector<HTMLElement>("#bytecode");
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".mode-tab"));
  const panels = Array.from(root.querySelectorAll<HTMLElement>(".tab-panel"));
  const detailTabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".subtab"));
  const detailPanels = Array.from(root.querySelectorAll<HTMLElement>(".detail-panel"));
  const detailTools = root.querySelector<HTMLElement>("#detail-tools");

  const replCommand = root.querySelector<HTMLInputElement>("#repl-command");
  const replReset = root.querySelector<HTMLButtonElement>("#repl-reset");
  const replOutput = root.querySelector<HTMLElement>("#repl-output");
  const replStack = root.querySelector<HTMLElement>("#repl-stack");
  const replDepth = root.querySelector<HTMLElement>("#repl-depth");

  if (
    !source ||
    !stdin ||
    !optimize ||
    !example ||
    !run ||
    !summary ||
    !output ||
    !errorOutput ||
    !preprocessed ||
    !ir ||
    !bytecode ||
    !detailTools ||
    !replCommand ||
    !replReset ||
    !replOutput ||
    !replStack ||
    !replDepth
  ) {
    throw new Error("App failed to mount");
  }

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

      // If all URL encodings fail, keep the existing URL unchanged.
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

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setTab(tab.dataset.tab ?? "playground");
    });
  });

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
    replDepth.textContent = `${stack.length} item(s)`;

    if (!stack.length) {
      replStack.innerHTML = '<li class="repl-stack-empty">(empty stack)</li>';
      replStack.scrollTop = 0;
      return;
    }

    replStack.innerHTML = stack
      .map(
        (value, depth) => `
          <li class="repl-stack-row">
            <span class="repl-stack-index">${depth}:</span>
            <code class="repl-stack-value">${escapeHtml(value)}</code>
          </li>
        `,
      )
      .join("");
    replStack.scrollTop = 0;
  }

  function renderReplTranscript() {
    replOutput.innerHTML = escapeHtml(replTranscript.join("\n\n"));
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
  renderReplStack([]);
  renderReplTranscript();
  replCommand.focus();
}
