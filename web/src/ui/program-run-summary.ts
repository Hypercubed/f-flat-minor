import type { RunResult } from "../program-runner.ts";
import { formatVmStepCount } from "../format-vm-steps.ts";
import type { SummaryBarItem, SummaryTone } from "./summary-bar.ts";

export function runExitDisplay(
  run: Pick<RunResult, "terminal" | "exitCode">,
): { value: string; tone: SummaryTone } {
  const value =
    run.terminal === "cancelled"
      ? "cancelled"
      : run.terminal === "error"
        ? "error"
        : String(run.exitCode);
  const tone: SummaryTone =
    run.terminal === "cancelled"
      ? "pending"
      : run.terminal === "error"
        ? "error"
        : run.exitCode === 0
          ? "success"
          : "error";
  return { value, tone };
}

export function idleProgramRunSummaryItems(): SummaryBarItem[] {
  return [
    { label: "compile", value: "—", tone: "pending" },
    { label: "execute", value: "—", tone: "pending" },
    { label: "vm steps", value: "—", tone: "pending" },
    { label: "exit", value: "—", tone: "pending" },
  ];
}

export function initialRunningProgramRunSummaryItems(): SummaryBarItem[] {
  return [
    { label: "compile", value: "Running...", tone: "running", showDot: true },
    { label: "execute", value: "…", tone: "pending" },
    { label: "vm steps", value: "…", tone: "pending" },
    { label: "exit", value: "pending", tone: "pending" },
  ];
}

export function progressProgramRunSummaryItems(opts: {
  vmCyclesExecuted: number | undefined;
  compileMs?: number;
  executeElapsedMs?: number;
}): SummaryBarItem[] {
  const { vmCyclesExecuted, compileMs, executeElapsedMs } = opts;
  return [
    {
      label: "compile",
      value: compileMs !== undefined ? `${compileMs.toFixed(2)} ms` : "…",
      tone: "running",
    },
    {
      label: "execute",
      value: executeElapsedMs !== undefined ? `${executeElapsedMs.toFixed(2)} ms` : "…",
      tone: "running",
      showDot: true,
    },
    {
      label: "vm steps",
      value: formatVmStepCount(vmCyclesExecuted),
      tone: "running",
    },
    { label: "exit", value: "pending", tone: "pending" },
  ];
}

export function failedProgramRunSummaryItems(): SummaryBarItem[] {
  return [
    { label: "compile", value: "failed", tone: "error" },
    { label: "execute", value: "—", tone: "pending" },
    { label: "vm steps", value: "—", tone: "pending" },
    { label: "exit", value: "pending", tone: "pending" },
  ];
}

export function completedProgramRunSummaryItems(
  run: Pick<RunResult, "compileMs" | "executeMs" | "vmCyclesExecuted" | "exitCode" | "terminal">,
): SummaryBarItem[] {
  const exit = runExitDisplay(run);
  return [
    { label: "compile", value: `${run.compileMs.toFixed(2)} ms` },
    { label: "execute", value: `${run.executeMs.toFixed(2)} ms` },
    {
      label: "vm steps",
      value: run.vmCyclesExecuted !== undefined ? formatVmStepCount(run.vmCyclesExecuted) : "—",
    },
    { label: "exit", value: exit.value, tone: exit.tone },
  ];
}
