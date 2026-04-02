import { PlaygroundWorkerHost } from "./playground-worker-client.ts";
import { compileProgram, type RunResult } from "./program-runner.ts";

let sharedHost: PlaygroundWorkerHost | null = null;

function getWorkerHost(): PlaygroundWorkerHost {
  if (!sharedHost) {
    sharedHost = new PlaygroundWorkerHost();
  }
  return sharedHost;
}

/** `?worker=0` disables the worker (main-thread async execution). */
export function playgroundUseWorker(): boolean {
  if (typeof Worker === "undefined" || typeof window === "undefined") {
    return false;
  }
  try {
    const params = new URLSearchParams(window.location.search);
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
  /** Present after preprocess+compile completes (worker sends this before VM progress). */
  compileMs?: number;
}

export interface RunPlaygroundOptions {
  yieldEvery?: number;
  signal?: AbortSignal;
  onProgress?: (state: RunPlaygroundProgress) => void;
}

function runFailedResult(message: string): RunResult {
  return {
    output: "",
    preprocessed: "",
    ir: "",
    bytecode: "",
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

/**
 * Preprocess + compile + execute for the playground and tutorial.
 * Uses a Web Worker by default (see {@link playgroundUseWorker}) so the UI thread stays responsive.
 */
export async function runPlaygroundProgram(
  source: string,
  stdin: string,
  optimize: boolean,
  options: RunPlaygroundOptions = {},
): Promise<RunResult> {
  const yieldEvery = options.yieldEvery ?? 2048;

  if (playgroundUseWorker()) {
    try {
      return await getWorkerHost().runProgram({
        source,
        stdin,
        optimize,
        yieldEvery,
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
    const compiled = compileProgram(source, stdin, optimize);
    const compileMs = compiled.compileMs;
    options.onProgress?.({ vmCyclesExecuted: 0, compileMs });

    const executed = await compiled.executeAsync({
      yieldEvery,
      shouldContinue: () => !options.signal?.aborted,
      onChunk: ({ vmCyclesExecuted }) => {
        options.onProgress?.({ vmCyclesExecuted, compileMs });
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

/** Soft cancel for the current worker run (cooperative). */
export function cancelPlaygroundRunSoft(): void {
  if (playgroundUseWorker()) {
    getWorkerHost().cancelSoft();
  }
}

/** Hard cancel: terminates the worker (guaranteed stop; next run recreates it). */
export function cancelPlaygroundRunHard(): void {
  if (playgroundUseWorker()) {
    getWorkerHost().cancelHard();
  }
}
