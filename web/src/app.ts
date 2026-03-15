import coreLib from "../../ff/lib/core.ff?raw";
import helloExample from "../../ff/hello.ffp?raw";
import factExample from "../../ff/fact.ffp?raw";
import fizzbuzzExample from "../../ff/fizzbuzz.ffp?raw";
import bottlesExample from "../../ff/99bottles.ffp?raw";
import pascalExample from "../../ff/pascal.ffp?raw";
import euler1Example from "../../ff/euler/euler1.ffp?raw";
import euler7Example from "../../ff/euler/euler7.ffp?raw";
import primesLib from "../../ff/lib/primes.ffp?raw";
import primesEncoded from "../../ff/lib/primes-encoded.ff?raw";
import { Compiler, Engine, Optimizer, Preprocessor, printLowLevelIr } from "../../typescript/core/src/mod.ts";

import { createBrowserPlatform, createPreprocessHost, type VirtualFiles } from "./runtime.ts";

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
  "/examples/hello.ffp": helloExample,
  "/examples/fact.ffp": factExample,
  "/examples/fizzbuzz.ffp": fizzbuzzExample,
  "/examples/99bottles.ffp": bottlesExample,
  "/examples/pascal.ffp": pascalExample,
  "/examples/euler1.ffp": euler1Example,
  "/examples/euler7.ffp": euler7Example,
};

const DEFAULT_SOURCE = helloExample;
const URL_SYNC_DELAY_MS = 400;

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

    const irLines: string[] = [];
    withCapturedConsole((message) => irLines.push(message), () => {
      printLowLevelIr(ir);
    });

    engine.loadIR(ir);

    const executeStart = performance.now();
    engine.run();
    const executeEnd = performance.now();

    return {
      output,
      preprocessed,
      ir: irLines.join("\n"),
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
            <textarea id="source" spellcheck="false"></textarea>
            <div class="controls">
              <label class="field">
                <span>Example</span>
                <select id="example">
                <option value="/examples/hello.ffp">hello.ffp</option>
                <option value="/examples/fact.ffp">fact.ffp</option>
                <option value="/examples/fizzbuzz.ffp">fizzbuzz.ffp</option>
                <option value="/examples/99bottles.ffp">99bottles.ffp</option>
                <option value="/examples/pascal.ffp">pascal.ffp</option>
                <option value="/examples/euler1.ffp">euler1.ffp</option>
                <option value="/examples/euler7.ffp">euler7.ffp</option>
              </select>
              </label>
              <label class="field">
                <span>stdin</span>
                <input id="stdin" type="text" placeholder="Optional input for getc" />
              </label>
              <div class="actions">
                <button id="load-example" class="ghost">Load Example</button>
                <button id="run" class="primary">Run Program</button>
              </div>
            </div>
          </div>

          <div class="results">
            <div class="panel summary-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Status</p>
                  <h2>Run summary</h2>
                </div>
              </div>
              <div id="summary" class="summary-grid"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Inspect</p>
                  <h2>Program details</h2>
                </div>
              </div>
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
                <pre id="preprocessed" class="code-block detail-panel" data-detail-panel="preprocessed"></pre>
                <pre id="ir" class="code-block detail-panel" data-detail-panel="ir"></pre>
                <pre id="bytecode" class="code-block detail-panel" data-detail-panel="bytecode"></pre>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="repl">
        <section class="workspace repl-workspace">
          <div class="panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">REPL</p>
                <h2>Persistent session</h2>
              </div>
            </div>
            <div class="help-copy">
              <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/core.ff</code>.</p>
              <p>Special commands: <code>.reset</code>, <code>.clear</code>, <code>.exit</code>, <code>.quit</code>.</p>
            </div>
            <div class="controls repl-controls">
              <label class="field repl-field">
                <span>Line</span>
                <input id="repl-input" type="text" placeholder="Try: 2 3 + putn 10 putc" />
              </label>
              <div class="actions">
                <button id="repl-reset" class="ghost">Reset Session</button>
                <button id="repl-run" class="primary">Run Line</button>
              </div>
            </div>
          </div>

          <div class="results">
            <div class="panel summary-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">State</p>
                  <h2>Current stack</h2>
                </div>
              </div>
              <div id="repl-stack" class="summary-grid"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Transcript</p>
                  <h2>REPL output</h2>
                </div>
              </div>
              <pre id="repl-output" class="console"></pre>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="help">
        ${HELP_HTML}
      </section>
    </main>
  `;

  const source = root.querySelector<HTMLTextAreaElement>("#source");
  const stdin = root.querySelector<HTMLInputElement>("#stdin");
  const optimize = root.querySelector<HTMLInputElement>("#optimize");
  const example = root.querySelector<HTMLSelectElement>("#example");
  const loadExample = root.querySelector<HTMLButtonElement>("#load-example");
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

  const replInput = root.querySelector<HTMLInputElement>("#repl-input");
  const replRun = root.querySelector<HTMLButtonElement>("#repl-run");
  const replReset = root.querySelector<HTMLButtonElement>("#repl-reset");
  const replOutput = root.querySelector<HTMLElement>("#repl-output");
  const replStack = root.querySelector<HTMLElement>("#repl-stack");

  if (
    !source ||
    !stdin ||
    !optimize ||
    !example ||
    !loadExample ||
    !run ||
    !summary ||
    !output ||
    !errorOutput ||
    !preprocessed ||
    !ir ||
    !bytecode ||
    !detailTools ||
    !replInput ||
    !replRun ||
    !replReset ||
    !replOutput ||
    !replStack
  ) {
    throw new Error("App failed to mount");
  }

  const searchParams = new URLSearchParams(window.location.search);
  const sourceFromUrl = searchParams.get("code");
  source.value = sourceFromUrl ?? DEFAULT_SOURCE;

  let syncUrlTimeout: ReturnType<typeof setTimeout> | undefined;

  function syncCodeParamToUrl() {
    if (syncUrlTimeout) {
      clearTimeout(syncUrlTimeout);
    }

    syncUrlTimeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (source.value) {
        params.set("code", source.value);
      } else {
        params.delete("code");
      }

      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
      window.history.replaceState(window.history.state, "", nextUrl);
    }, URL_SYNC_DELAY_MS);
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
      const result = runProgram(source.value, stdin.value, optimize.checked);
      const issueCount = result.issues.length;
      const diagnostics = [
        result.output ? result.output.trimEnd() : "(no stdout)",
        issueCount ? `\n\n${issueCount} compiler issue(s):\n${result.issues.join("\n")}` : "",
        result.logs.length ? `\n\nconsole log:\n${result.logs.join("\n")}` : "",
      ].join("");

      summary.innerHTML = `
        <article class="summary-card">
          <span class="summary-k">compile</span>
          <strong>${result.compileMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">execute</span>
          <strong>${result.executeMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">stack</span>
          <strong>${result.stack.length ? escapeHtml(result.stack.join(" ")) : "(empty)"}</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">exit</span>
          <strong>${result.exitCode}</strong>
        </article>
      `;

      output.innerHTML = escapeHtml(diagnostics);
      errorOutput.textContent = "";
      preprocessed.innerHTML = escapeHtml(result.preprocessed);
      ir.innerHTML = escapeHtml(result.ir);
      bytecode.innerHTML = escapeHtml(result.bytecode);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      summary.innerHTML = `
        <article class="summary-card">
          <span class="summary-k">status</span>
          <strong>run failed</strong>
        </article>
      `;
      output.innerHTML = "";
      errorOutput.innerHTML = escapeHtml(message);
      preprocessed.innerHTML = "";
      ir.innerHTML = "";
      bytecode.innerHTML = "";
    } finally {
      document.body.dataset.ready = "true";
    }
  }

  const replSession = new ReplSession();
  const replTranscript: string[] = [
    "Core library loaded. Try defining words, evaluating quotes, or printing values.",
  ];

  function renderReplStack(stack: string[]) {
    replStack.innerHTML = `
      <article class="summary-card">
        <span class="summary-k">depth</span>
        <strong>${stack.length}</strong>
      </article>
      <article class="summary-card">
        <span class="summary-k">stack</span>
        <strong>${stack.length ? escapeHtml(stack.join(" ")) : "(empty)"}</strong>
      </article>
    `;
  }

  function renderReplTranscript() {
    replOutput.innerHTML = escapeHtml(replTranscript.join("\n\n"));
  }

  function runReplLine() {
    const line = replInput.value;
    const result = replSession.execute(line);

    if (result.clearTranscript) {
      replTranscript.splice(0, replTranscript.length);
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
    }

    replTranscript.push(`[ ${result.stack.join(" ")} ]`);

    renderReplStack(result.stack);
    renderReplTranscript();
    replInput.value = "";
    replInput.focus();
  }

  loadExample.addEventListener("click", () => {
    source.value = EXAMPLES[example.value] ?? DEFAULT_SOURCE;
    syncCodeParamToUrl();
    void renderPlayground();
  });

  run.addEventListener("click", () => {
    void renderPlayground();
  });
  optimize.addEventListener("change", () => {
    void renderPlayground();
  });
  source.addEventListener("input", syncCodeParamToUrl);

  replRun.addEventListener("click", runReplLine);
  replReset.addEventListener("click", () => {
    replSession.reset();
    replTranscript.splice(0, replTranscript.length, "Session reset. Core library reloaded.");
    renderReplStack([]);
    renderReplTranscript();
  });
  replInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runReplLine();
    }
  });

  void renderPlayground();
  renderReplStack([]);
  renderReplTranscript();
}
