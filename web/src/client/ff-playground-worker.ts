/// <reference lib="webworker" />

import { compileProgram, type ExecuteResult, type RunResult } from "./program-runner.ts";
import type { PlaygroundWorkerInbound, PlaygroundWorkerOutbound } from "./playground-worker-protocol.ts";

function post(message: PlaygroundWorkerOutbound) {
  (self as DedicatedWorkerGlobalScope).postMessage(message);
}

let cancelRequested = false;
let activeRunId: number | null = null;

function buildRunResult(
  compiled: ReturnType<typeof compileProgram>,
  executed: ExecuteResult,
): RunResult {
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
}

self.onmessage = (event: MessageEvent<PlaygroundWorkerInbound>) => {
  const msg = event.data;
  if (msg.type === "CANCEL") {
    if (activeRunId === msg.runId) {
      cancelRequested = true;
    }
    return;
  }

  if (msg.type !== "RUN") {
    return;
  }

  const { runId, source, stdin, optimize, filename, yieldIntervalMs, yieldSliceMax } = msg;

  void (async () => {
    cancelRequested = false;
    activeRunId = runId;

    try {
      const compiled = compileProgram(source, stdin, optimize, { filename });

      if (activeRunId !== runId) {
        return;
      }

      post({
        type: "COMPILED",
        runId,
        compileMs: compiled.compileMs,
        preprocessed: compiled.preprocessed,
        ir: compiled.ir,
        bytecode: compiled.bytecode,
        compiledBytes: compiled.compiledBytes,
      });

      const executeStart = performance.now();
      const executed = await compiled.executeAsync({
        yieldIntervalMs,
        yieldSliceMax,
        shouldContinue: () => !cancelRequested && activeRunId === runId,
        onChunk: ({ vmCyclesExecuted }) => {
          if (activeRunId === runId) {
            post({
              type: "PROGRESS",
              runId,
              vmCyclesExecuted,
              executeElapsedMs: performance.now() - executeStart,
            });
          }
        },
        scheduler: () =>
          new Promise<void>((resolve) => {
            globalThis.setTimeout(resolve, 0);
          }),
      });

      if (activeRunId !== runId) {
        return;
      }

      post({ type: "RESULT", runId, result: buildRunResult(compiled, executed) });
    } catch (error) {
      if (activeRunId !== runId) {
        return;
      }
      const message = error instanceof Error ? error.message : String(error);
      post({ type: "ERROR", runId, message });
    } finally {
      if (activeRunId === runId) {
        activeRunId = null;
      }
    }
  })();
};
