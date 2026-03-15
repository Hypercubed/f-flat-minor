import coreLib from "../../ff/lib/core.ff?raw";
import helloExample from "../../ff/hello.ffp?raw";
import { Compiler, Engine, Optimizer, Preprocessor } from "../../typescript/core/src/mod.ts";

import { createBrowserPlatform, createPreprocessHost, type VirtualFiles } from "./runtime.ts";

interface RunResult {
  output: string;
  preprocessed: string;
  bytecode: string;
  issues: string[];
  stack: string[];
  logs: string[];
  exitCode: number;
  compileMs: number;
  executeMs: number;
}

const EXAMPLES: Record<string, string> = {
  "/examples/hello.ffp": helloExample,
};

const DEFAULT_SOURCE = helloExample;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function createVirtualFiles(source: string): VirtualFiles {
  return {
    "/main.ffp": source,
    "/lib/core.ff": coreLib,
    ...EXAMPLES,
  };
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

  const originalConsoleLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(" "));
  };

  try {
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

    engine.loadIR(ir);

    const executeStart = performance.now();
    engine.run();
    const executeEnd = performance.now();

    return {
      output,
      preprocessed,
      bytecode: Compiler.compileToBase64(ir),
      issues,
      stack: engine.getStack().map(String),
      logs,
      exitCode,
      compileMs: compileEnd - compileStart,
      executeMs: executeEnd - executeStart,
    };
  } finally {
    console.log = originalConsoleLog;
  }
}

export function mountApp(root: HTMLElement) {
  root.innerHTML = `
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">f-flat-minor / web</p>
        <h1>Run F-flat-minor in the browser.</h1>
        <p class="lede">
          This SPA uses the shared TypeScript core for preprocessing, compiling, and execution.
          The bundled browser shim provides virtual files, stdin, stdout, and timing.
        </p>
      </section>

      <section class="workspace">
        <div class="panel editor-panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">Editor</p>
              <h2>Main source</h2>
            </div>
            <label class="toggle">
              <input id="optimize" type="checkbox" checked />
              <span>Optimize</span>
            </label>
          </div>
          <textarea id="source" spellcheck="false"></textarea>
          <div class="controls">
            <label class="field">
              <span>Example</span>
              <select id="example">
                <option value="/examples/hello.ffp">hello.ffp</option>
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
                <p class="panel-label">Output</p>
                <h2>stdout and diagnostics</h2>
              </div>
            </div>
            <pre id="output" class="console"></pre>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Preprocess</p>
                <h2>Expanded source</h2>
              </div>
            </div>
            <pre id="preprocessed" class="code-block"></pre>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Compile</p>
                <h2>Bytecode</h2>
              </div>
            </div>
            <pre id="bytecode" class="code-block"></pre>
          </div>
        </div>
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
  const preprocessed = root.querySelector<HTMLElement>("#preprocessed");
  const bytecode = root.querySelector<HTMLElement>("#bytecode");

  if (
    !source ||
    !stdin ||
    !optimize ||
    !example ||
    !loadExample ||
    !run ||
    !summary ||
    !output ||
    !preprocessed ||
    !bytecode
  ) {
    throw new Error("App failed to mount");
  }

  source.value = DEFAULT_SOURCE;

  function render() {
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
      preprocessed.innerHTML = escapeHtml(result.preprocessed);
      bytecode.innerHTML = escapeHtml(result.bytecode);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      summary.innerHTML = `
        <article class="summary-card">
          <span class="summary-k">status</span>
          <strong>run failed</strong>
        </article>
      `;
      output.innerHTML = escapeHtml(message);
      preprocessed.innerHTML = "";
      bytecode.innerHTML = "";
    }
  }

  loadExample.addEventListener("click", () => {
    source.value = EXAMPLES[example.value] ?? DEFAULT_SOURCE;
    render();
  });

  run.addEventListener("click", render);
  render();
}
