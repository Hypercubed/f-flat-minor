import { Compiler, Engine, Preprocessor } from "../../typescript/core/src/mod.ts";
import type { ValueInspection } from "../../typescript/core/src/engine.ts";

import { createVirtualFiles } from "./examples.ts";
import { createBrowserPlatform, createPreprocessHost, type VirtualFiles } from "./runtime.ts";

const PRELUDE = "/lib/prelude.ffp";

export interface StackItem {
  value: string;
  index: number;
}

export interface ReplResult {
  output: string;
  logs: string[];
  stack: StackItem[];
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

    const macroCompiler = new Compiler();
    const macroEngine = new Engine(platform);

    this.preprocessor = new Preprocessor(createPreprocessHost(this.files), {
      engine: macroEngine,
      compiler: macroCompiler,
    }, {
      macroEngineBootstrapFile: PRELUDE,
    });

    this.execute(`.import ${PRELUDE}`);
  }

  inspectValue(valueStr: string): ValueInspection {
    const value = BigInt(valueStr);
    return this.engine.inspectValue(value);
  }

  private createStackItems(): StackItem[] {
    return this.engine.getStack().map((value, index) => ({
      value: String(value),
      index,
    }));
  }

  execute(line: string): ReplResult {
    const trimmed = line.trim();
    const logs: string[] = [];

    if (!trimmed) {
      return {
        output: "",
        logs,
        stack: this.createStackItems(),
      };
    }

    if (trimmed === ".reset") {
      this.reset();
      return {
        output: "Session reset. Prelude reloaded.",
        clearTranscript: true,
        logs,
        stack: this.createStackItems(),
      };
    }

    if (trimmed === ".clear") {
      return {
        output: "Transcript cleared.",
        clearTranscript: true,
        logs,
        stack: this.createStackItems(),
      };
    }

    if (trimmed === ".exit" || trimmed === ".quit") {
      return {
        output: "Browser REPL sessions stay open. Use .reset to clear state.",
        logs,
        stack: this.createStackItems(),
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
          stack: this.createStackItems(),
        };
      } catch (error) {
        return {
          output: this.output,
          logs,
          stack: this.createStackItems(),
          error: error instanceof Error ? error.message : String(error),
        };
      }
    });
  }
}
