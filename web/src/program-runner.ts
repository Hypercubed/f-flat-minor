import {
  Compiler,
  Engine,
  Optimizer,
  Preprocessor,
  formatFfCompatibleIr,
  type EngineRunAsyncOptions,
  type IrInstruction,
} from "../../typescript/core/src/mod.ts";

import { createVirtualFiles } from "./examples.ts";
import { createBrowserPlatform, createPreprocessHost } from "./runtime.ts";

const PRELUDE = "/lib/prelude.ffp";

/** How the run finished (playground / worker). */
export type RunTerminalState = "done" | "cancelled" | "error";

export interface RunResult {
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
  terminal: RunTerminalState;
  vmCyclesExecuted?: number;
}

export interface PreparedProgram {
  preprocessed: string;
  ir: string;
  bytecode: string;
  issues: string[];
  compileMs: number;
  execute: () => ExecuteResult;
  executeAsync: (options?: ExecuteAsyncOptions) => Promise<ExecuteResult>;
}

/** Async VM execution options (see {@link EngineRunAsyncOptions}). */
export type ExecuteAsyncOptions = EngineRunAsyncOptions;

export interface ExecuteResult {
  output: string;
  stack: string[];
  logs: string[];
  exitCode: number;
  executeMs: number;
  cancelled: boolean;
  vmCyclesExecuted: number;
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

async function withCapturedConsoleAsync<T>(
  collector: (message: string) => void,
  fn: () => Promise<T>,
): Promise<T> {
  const originalConsoleLog = console.log;
  console.log = (...args: unknown[]) => {
    collector(args.map(String).join(" "));
  };

  try {
    return await fn();
  } finally {
    console.log = originalConsoleLog;
  }
}

function createProgramContext(source: string, stdin: string) {
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
  const macroCompiler = new Compiler();
  const macroEngine = new Engine(platform);
  const files = createVirtualFiles(source);
  const preprocessor = new Preprocessor(createPreprocessHost(files), {
    engine: macroEngine,
    compiler: macroCompiler,
  }, {
    macroEngineBootstrapFile: PRELUDE,
  });

  return {
    compiler,
    engine,
    preprocessor,
    logs,
    getOutput() {
      return output;
    },
    getExitCode() {
      return exitCode;
    },
  };
}

export function compileProgram(source: string, stdin: string, optimize: boolean): PreparedProgram {
  const context = createProgramContext(source, stdin);

  const compileStart = performance.now();
  const compiled = withCapturedConsole((message) => context.logs.push(message), () => {
    const preprocessed = context.preprocessor.preprocess(
      Preprocessor.tokenize(source),
      "/main.ffp",
    );

    let ir: IrInstruction[] = context.compiler.compileToIR(
      Compiler.tokenize(preprocessed),
      "/main.ffp",
    );
    const issues = context.compiler.validate(ir);

    if (optimize) {
      ir = new Optimizer().optimize(ir);
    }

    const formattedIr = formatFfCompatibleIr(ir);
    const bytecode = Compiler.compileToBase64(ir);

    context.engine.loadIR(ir);

    return {
      preprocessed,
      formattedIr,
      bytecode,
      issues,
    };
  });
  const compileEnd = performance.now();

  return {
    preprocessed: compiled.preprocessed,
    ir: compiled.formattedIr,
    bytecode: compiled.bytecode,
    issues: compiled.issues,
    compileMs: compileEnd - compileStart,
    execute() {
      const executeStart = performance.now();

      withCapturedConsole((message) => context.logs.push(message), () => {
        context.engine.run();
      });

      const executeEnd = performance.now();

      return {
        output: context.getOutput(),
        stack: context.engine.getStack().map(String),
        logs: [...context.logs],
        exitCode: context.getExitCode(),
        executeMs: executeEnd - executeStart,
        cancelled: false,
        vmCyclesExecuted: 0,
      };
    },
    async executeAsync(options: ExecuteAsyncOptions = {}) {
      const executeStart = performance.now();

      const runResult = await withCapturedConsoleAsync((message) => context.logs.push(message), async () => {
        return await context.engine.runAsync(options);
      });

      const executeEnd = performance.now();

      return {
        output: context.getOutput(),
        stack: context.engine.getStack().map(String),
        logs: [...context.logs],
        exitCode: context.getExitCode(),
        executeMs: executeEnd - executeStart,
        cancelled: runResult.cancelled,
        vmCyclesExecuted: runResult.vmCyclesExecuted,
      };
    },
  };
}

export function runProgram(source: string, stdin: string, optimize: boolean): RunResult {
  const compiled = compileProgram(source, stdin, optimize);
  const executed = compiled.execute();

  return {
    output: executed.output,
    preprocessed: compiled.preprocessed,
    ir: compiled.ir,
    bytecode: compiled.bytecode,
    issues: compiled.issues,
    stack: executed.stack,
    logs: executed.logs,
    exitCode: executed.exitCode,
    compileMs: compiled.compileMs,
    executeMs: executed.executeMs,
    terminal: "done",
    vmCyclesExecuted: executed.vmCyclesExecuted,
  };
}
