import type { RunResult } from "./program-runner.ts";

export type PlaygroundWorkerInbound =
  | {
      type: "RUN";
      runId: number;
      source: string;
      stdin: string;
      optimize: boolean;
      filename?: string;
      yieldIntervalMs: number;
      yieldSliceMax: number;
    }
  | { type: "CANCEL"; runId: number };

export type PlaygroundWorkerOutbound =
  | {
      type: "COMPILED";
      runId: number;
      compileMs: number;
      preprocessed: string;
      ir: string;
      bytecode: string;
      compiledBytes: number;
    }
  | { type: "PROGRESS"; runId: number; vmCyclesExecuted: number; executeElapsedMs: number }
  | { type: "RESULT"; runId: number; result: RunResult }
  | { type: "ERROR"; runId: number; message: string };
