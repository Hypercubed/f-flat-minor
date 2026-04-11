import {
  Compiler,
  Engine,
  HEADER,
  Optimizer,
  Preprocessor,
  formatFfCompatibleIr,
  type EngineRunAsyncOptions,
  type IrInstruction,
} from "../../../typescript/core/src/mod.ts";

import { createVirtualFiles } from "./examples.ts";
import { createBrowserPlatform, createPreprocessHost } from "./runtime.ts";

const PRELUDE = "/lib/prelude.ffp";
const DEFAULT_PROGRAM_FILENAME = "/main.ffp";

export type RunTerminalState = "done" | "cancelled" | "error";

export interface RunResult {
  output: string;
  preprocessed: string;
  ir: string;
  bytecode: string;
  compiledBytes: number;
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
  compiledBytes: number;
  issues: string[];
  compileMs: number;
  execute: () => ExecuteResult;
  executeAsync: (options?: ExecuteAsyncOptions) => Promise<ExecuteResult>;
}

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

export interface ProgramRunOptions {
  filename?: string;
}

export function getCompiledByteScore(bytecode: string): number {
  return HEADER.length + bytecode.length;
}

export function getCompiledBytecodeDisplay(bytecode: string): string {
  return bytecode ? `${HEADER}${bytecode}` : "";
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

function createProgramContext(source: string, stdin: string, options: ProgramRunOptions = {}) {
  let output = "";
  const logs: string[] = [];
  let exitCode = 0;
  const filename = options.filename ?? DEFAULT_PROGRAM_FILENAME;

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
  const files = createVirtualFiles(source, filename);
  const preprocessor = new Preprocessor(
    createPreprocessHost(files),
    {
      engine: macroEngine,
      compiler: macroCompiler,
    },
    {
      macroEngineBootstrapFile: PRELUDE,
    },
  );

  return {
    compiler,
    engine,
    preprocessor,
    filename,
    logs,
    getOutput() {
      return output;
    },
    getExitCode() {
      return exitCode;
    },
  };
}

export function compileProgram(
  source: string,
  stdin: string,
  optimize: boolean,
  options: ProgramRunOptions = {},
): PreparedProgram {
  const context = createProgramContext(source, stdin, options);

  const compileStart = performance.now();
  const compiled = withCapturedConsole((message) => context.logs.push(message), () => {
    const preprocessed = context.preprocessor.preprocess(
      Preprocessor.tokenize(source),
      context.filename,
    );

    let ir: IrInstruction[] = context.compiler.compileToIR(
      Compiler.tokenize(preprocessed),
      context.filename,
    );
    const issues = context.compiler.validate(ir);

    if (optimize) {
      ir = new Optimizer().optimize(ir);
    }

    const formattedIr = formatFfCompatibleIr(ir);
    const bytecode = Compiler.compileToBase64(ir);
    const compiledBytes = getCompiledByteScore(bytecode);

    context.engine.loadIR(ir);

    return {
      preprocessed,
      formattedIr,
      bytecode,
      compiledBytes,
      issues,
    };
  });
  const compileEnd = performance.now();

  return {
    preprocessed: compiled.preprocessed,
    ir: compiled.formattedIr,
    bytecode: compiled.bytecode,
    compiledBytes: compiled.compiledBytes,
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
