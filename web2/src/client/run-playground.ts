import { PlaygroundWorkerHost } from "./playground-worker-client.ts";
import { compileProgram, type RunResult } from "./program-runner.ts";
import { getCurrentSearchString } from "./location-search.ts";

let sharedHost: PlaygroundWorkerHost | null = null;

function getWorkerHost(): PlaygroundWorkerHost {
  if (!sharedHost) {
    sharedHost = new PlaygroundWorkerHost();
  }
  return sharedHost;
}

function playgroundUseWorker(): boolean {
  if (typeof Worker === "undefined" || typeof window === "undefined") {
    return false;
  }

  try {
    const params = new URLSearchParams(getCurrentSearchString().replace(/^\?/, ""));
    if (params.get("worker") === "0") {
      return false;
    }
  } catch {
    /* ignore */
  }

  return true;
}

export interface RunPlaygroundProgress {
  vmCyclesExecuted: number;
  executeElapsedMs?: number;
  compileMs?: number;
  preprocessed?: string;
  ir?: string;
  bytecode?: string;
  compiledBytes?: number;
}

export interface RunPlaygroundOptions {
  yieldIntervalMs?: number;
  yieldSliceMax?: number;
  yieldEvery?: number;
  filename?: string;
  signal?: AbortSignal;
  onProgress?: (state: RunPlaygroundProgress) => void;
}

function runFailedResult(message: string): RunResult {
  return {
    output: "",
    preprocessed: "",
    ir: "",
    bytecode: "",
    compiledBytes: 0,
    issues: [],
    stack: [],
    logs: [],
    exitCode: 1,
    compileMs: 0,
    executeMs: 0,
    terminal: "error",
    vmCyclesExecuted: 0,
  };
}

export async function runPlaygroundProgram(
  source: string,
  stdin: string,
  optimize: boolean,
  options: RunPlaygroundOptions = {},
): Promise<RunResult> {
  const yieldIntervalMs = options.yieldIntervalMs ?? 160;
  const yieldSliceMax = options.yieldSliceMax ?? options.yieldEvery ?? 655360;

  if (playgroundUseWorker()) {
    try {
      return await getWorkerHost().runProgram({
        source,
        stdin,
        optimize,
        filename: options.filename,
        yieldIntervalMs,
        yieldSliceMax,
        signal: options.signal,
        onProgress: options.onProgress,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        ...runFailedResult(message),
        logs: [message],
      };
    }
  }

  try {
    const compiled = compileProgram(source, stdin, optimize, {
      filename: options.filename,
    });
    const compileMs = compiled.compileMs;
    options.onProgress?.({
      vmCyclesExecuted: 0,
      compileMs,
      executeElapsedMs: 0,
      preprocessed: compiled.preprocessed,
      ir: compiled.ir,
      bytecode: compiled.bytecode,
      compiledBytes: compiled.compiledBytes,
    });

    const executeStart = performance.now();
    const executed = await compiled.executeAsync({
      yieldIntervalMs,
      yieldSliceMax,
      shouldContinue: () => !options.signal?.aborted,
      onChunk: ({ vmCyclesExecuted }) => {
        options.onProgress?.({
          vmCyclesExecuted,
          compileMs,
          executeElapsedMs: performance.now() - executeStart,
        });
      },
      scheduler: () =>
        new Promise<void>((resolve) => {
          globalThis.setTimeout(resolve, 0);
        }),
    });

    const terminal = executed.cancelled ? "cancelled" : "done";

    return {
      output: executed.output,
      preprocessed: compiled.preprocessed,
      ir: compiled.ir,
      bytecode: compiled.bytecode,
      compiledBytes: compiled.compiledBytes,
      issues: compiled.issues,
      stack: executed.stack,
      logs: executed.logs,
      exitCode: executed.exitCode,
      compileMs: compiled.compileMs,
      executeMs: executed.executeMs,
      terminal,
      vmCyclesExecuted: executed.vmCyclesExecuted,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ...runFailedResult(message),
      logs: [message],
    };
  }
}
