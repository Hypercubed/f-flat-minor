import type { RunResult } from "./program-runner.ts";

/** Main thread → worker */
export type PlaygroundWorkerInbound =
  | {
    type: "RUN";
    runId: number;
    source: string;
    stdin: string;
    optimize: boolean;
    yieldIntervalMs: number;
    yieldSliceMax: number;
  }
  | { type: "CANCEL"; runId: number };

/** Worker → main thread */
export type PlaygroundWorkerOutbound =
  | {
    type: "COMPILED";
    runId: number;
    compileMs: number;
    preprocessed: string;
    ir: string;
    bytecode: string;
  }
  | { type: "PROGRESS"; runId: number; vmCyclesExecuted: number; executeElapsedMs: number }
  | { type: "RESULT"; runId: number; result: RunResult }
  | { type: "ERROR"; runId: number; message: string };
