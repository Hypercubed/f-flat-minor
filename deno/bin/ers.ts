#!/usr/bin/env -S deno run --allow-read --no-check
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";

import { auditSource, type ErsAuditMode, type ErsAuditResult } from "../../tools/ers/mod.ts";

interface AuditCliArgs {
  _: string[];
  word?: string;
  mode?: string;
  json?: boolean;
  help?: boolean;
}

interface ErsCliRuntime {
  readTextFileSync?: (path: string) => string;
}

function usage() {
  console.log(
    [
      "Usage:",
      "  ers audit <file> --word <name> [--mode full-floor|structural] [--json]",
      "",
      "Examples:",
      "  ers audit ff/lib/core/core.ff --word slip",
      "  ers audit ff/optimize.ffp --word demo --mode structural --json",
    ].join("\n"),
  );
}

function formatRange(range: ErsAuditResult["definitionRange"]) {
  if (!range) {
    return "unknown";
  }
  return `${range.start.line + 1}:${range.start.character + 1}-${range.end.line + 1}:${range.end.character + 1}`;
}

function formatAudit(result: ErsAuditResult) {
  const lines: string[] = [];
  lines.push(`ERS audit: ${result.word}`);
  lines.push(`File: ${result.file}`);
  lines.push(`Mode: ${result.mode}`);
  lines.push(`Definition range: ${formatRange(result.definitionRange)}`);
  lines.push(`Body: ${result.resolvedBody || "(empty)"}`);
  lines.push(`Safety: ${result.safety.verdict}`);

  if (result.safety.reasons.length > 0) {
    lines.push("Safety reasons:");
    for (const reason of result.safety.reasons) {
      lines.push(`- ${reason}`);
    }
  }

  lines.push("Queue regions:");
  if (result.queueRegions.length === 0) {
    lines.push("- none");
  } else {
    for (const region of result.queueRegions) {
      lines.push(
        `- ${region.kind} ${formatRange(region.range)} :: ${region.text} :: ${region.disposition} (${region.reason})`,
      );
    }
  }

  lines.push("Pointer candidates:");
  if (result.pointerCandidates.length === 0) {
    lines.push("- none");
  } else {
    for (const candidate of result.pointerCandidates) {
      lines.push(
        `- ${formatRange(candidate.range)} :: ${candidate.text} -> ${candidate.preferredText} (${candidate.reason})`,
      );
    }
  }

  lines.push("Rewrite candidates:");
  if (result.rewrites.length === 0) {
    lines.push("- none");
  } else {
    for (const rewrite of result.rewrites) {
      lines.push(
        `- ${rewrite.rule} [${rewrite.confidence}] ${formatRange(rewrite.range)} :: ${rewrite.before} -> ${rewrite.after || "(remove)"} (${rewrite.reason})`,
      );
    }
  }

  lines.push("Diagnostics:");
  if (result.diagnostics.length === 0) {
    lines.push("- none");
  } else {
    for (const diagnostic of result.diagnostics) {
      lines.push(
        `- ${diagnostic.severity} ${formatRange(diagnostic.range)} :: ${diagnostic.message}`,
      );
    }
  }

  return lines.join("\n");
}

export function run(argv: AuditCliArgs, runtime: ErsCliRuntime = {}) {
  const [command, file] = argv._;
  if (argv.help || !command) {
    usage();
    return;
  }

  if (command !== "audit") {
    throw new Error(`Unsupported ers command \`${command}\`.`);
  }

  if (!file) {
    throw new Error("Missing file path for `ers audit`.");
  }

  if (!argv.word) {
    throw new Error("Missing required `--word` argument.");
  }

  const mode = argv.mode === "structural" ? "structural" : "full-floor" satisfies ErsAuditMode;
  const readTextFileSync = runtime.readTextFileSync ?? Deno.readTextFileSync;
  const source = readTextFileSync(file);
  const result = auditSource({
    file,
    source,
    word: argv.word,
    mode,
  });

  if (argv.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(formatAudit(result));
}

if (import.meta.main) {
  const argv = parseArgs(Deno.args, {
    string: ["word", "mode"],
    boolean: ["json", "help"],
    alias: {
      word: ["w"],
      mode: ["m"],
      json: ["j"],
      help: ["h"],
    },
    default: {
      mode: "full-floor",
      json: false,
      help: false,
    },
  }) as unknown as AuditCliArgs;

  run(argv);
}
