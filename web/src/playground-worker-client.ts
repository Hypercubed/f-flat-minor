import type { PlaygroundWorkerOutbound } from "./playground-worker-protocol.ts";
import type { RunResult } from "./program-runner.ts";

function cancelledResult(): RunResult {
  return {
    output: "",
    preprocessed: "",
    ir: "",
    bytecode: "",
    compiledBytes: 0,
    issues: [],
    stack: [],
    logs: [],
    exitCode: 0,
    compileMs: 0,
    executeMs: 0,
    terminal: "cancelled",
    vmCyclesExecuted: 0,
  };
}

function workerErrorResult(message: string): RunResult {
  return {
    output: "",
    preprocessed: "",
    ir: "",
    bytecode: "",
    compiledBytes: 0,
    issues: [],
    stack: [],
    logs: [message],
    exitCode: 1,
    compileMs: 0,
    executeMs: 0,
    terminal: "error",
    vmCyclesExecuted: 0,
  };
}

export interface PlaygroundRunProgress {
  vmCyclesExecuted: number;
  /** Wall-clock ms elapsed since execute started (0 right after compile). */
  executeElapsedMs?: number;
  /** Set once preprocess+compile has finished (same ms as final result). */
  compileMs?: number;
  /** Present after preprocess+compile so UI can show IR/bytecode while the VM runs. */
  preprocessed?: string;
  ir?: string;
  bytecode?: string;
  compiledBytes?: number;
}

export interface PlaygroundWorkerRunOptions {
  source: string;
  stdin: string;
  optimize: boolean;
  filename?: string;
  yieldIntervalMs: number;
  yieldSliceMax: number;
  signal?: AbortSignal;
  onProgress?: (state: PlaygroundRunProgress) => void;
}

/**
 * Manages a dedicated worker for preprocess + compile + execute. Recreates the worker after hard cancel.
 */
export class PlaygroundWorkerHost {
  private worker: Worker | null = null;
  private nextRunId = 1;
  private pending: {
    runId: number;
    resolve: (r: RunResult) => void;
    onProgress?: (state: PlaygroundRunProgress) => void;
    compileMs?: number;
  } | null = null;
  private activeRunId: number | null = null;

  private ensureWorker() {
    if (this.worker) {
      return;
    }
    this.worker = new Worker(new URL("./ff-playground-worker.ts", import.meta.url), {
      type: "module",
    });
    this.worker.onmessage = (event: MessageEvent<PlaygroundWorkerOutbound>) => {
      this.handleMessage(event.data);
    };
  }

  private handleMessage(msg: PlaygroundWorkerOutbound) {
    if (msg.type === "COMPILED") {
      if (this.pending?.runId === msg.runId) {
        this.pending.compileMs = msg.compileMs;
        this.pending.onProgress?.({
          vmCyclesExecuted: 0,
          compileMs: msg.compileMs,
          executeElapsedMs: 0,
          preprocessed: msg.preprocessed,
          ir: msg.ir,
          bytecode: msg.bytecode,
          compiledBytes: msg.compiledBytes,
        });
      }
      return;
    }

    if (msg.type === "PROGRESS") {
      if (this.pending?.runId === msg.runId) {
        const compileMs = this.pending.compileMs;
        this.pending.onProgress?.({
          vmCyclesExecuted: msg.vmCyclesExecuted,
          compileMs,
          executeElapsedMs: msg.executeElapsedMs,
        });
      }
      return;
    }

    if (msg.type === "ERROR") {
      if (this.pending?.runId !== msg.runId) {
        return;
      }
      const pending = this.pending;
      this.pending = null;
      this.activeRunId = null;
      pending.resolve(workerErrorResult(msg.message));
      return;
    }

    if (msg.type === "RESULT") {
      if (this.pending?.runId !== msg.runId) {
        return;
      }
      const pending = this.pending;
      this.pending = null;
      this.activeRunId = null;
      pending.resolve(msg.result);
    }
  }

  runProgram(options: PlaygroundWorkerRunOptions): Promise<RunResult> {
    this.ensureWorker();
    const runId = this.nextRunId++;
    this.activeRunId = runId;

    let hardCancelTimer: number | undefined;
    const onAbort = () => {
      this.cancelSoft(runId);
      hardCancelTimer = window.setTimeout(() => {
        if (this.pending?.runId === runId) {
          this.cancelHard();
          if (this.pending?.runId === runId) {
            const pending = this.pending;
            this.pending = null;
            this.activeRunId = null;
            pending.resolve(cancelledResult());
          }
        }
      }, 750);
    };

    const signal = options.signal;
    if (signal) {
      if (signal.aborted) {
        return Promise.resolve(cancelledResult());
      }
      signal.addEventListener("abort", onAbort, { once: true });
    }

    return new Promise<RunResult>((resolve) => {
      this.pending = {
        runId,
        resolve,
        onProgress: options.onProgress,
      };

      this.worker!.postMessage({
        type: "RUN",
        runId,
        source: options.source,
        stdin: options.stdin,
        optimize: options.optimize,
        filename: options.filename,
        yieldIntervalMs: options.yieldIntervalMs,
        yieldSliceMax: options.yieldSliceMax,
      });
    }).finally(() => {
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }
      window.clearTimeout(hardCancelTimer);
    });
  }

  cancelSoft(runId?: number) {
    const id = runId ?? this.activeRunId;
    if (id !== null) {
      this.worker?.postMessage({ type: "CANCEL", runId: id });
    }
  }

  /** Terminates the worker immediately (used for hard cancel or stuck compile). */
  cancelHard() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
