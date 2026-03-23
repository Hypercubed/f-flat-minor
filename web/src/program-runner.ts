import {
  Compiler,
  Engine,
  Optimizer,
  Preprocessor,
  formatFfCompatibleIr,
} from "../../typescript/core/src/mod.ts";

import { createVirtualFiles } from "./examples.ts";
import { createBrowserPlatform, createPreprocessHost } from "./runtime.ts";

const PRELUDE = "/lib/prelude.ffp";

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

export function runProgram(source: string, stdin: string, optimize: boolean): RunResult {
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
  }, {
    bootstrapFile: PRELUDE,
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
