import { Compiler, Engine, Preprocessor } from "../../typescript/core/src/mod.ts";

import { createVirtualFiles } from "./examples.ts";
import { createBrowserPlatform, createPreprocessHost, type VirtualFiles } from "./runtime.ts";

export interface ReplResult {
  output: string;
  logs: string[];
  stack: string[];
  error?: string;
  clearTranscript?: boolean;
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

export class ReplSession {
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
