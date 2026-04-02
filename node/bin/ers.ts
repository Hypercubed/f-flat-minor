#!/usr/bin/env -S node --experimental-transform-types --disable-warning=ExperimentalWarning

import fs from "node:fs";
import { parseArgs } from "node:util";

import {
  compileSource,
  type Definition,
  type SourcePosition,
} from "../../typescript/compile-service/src/mod.ts";
import { auditSource, type ErsAuditMode, type ErsAuditResult } from "../../tools/ers/mod.ts";

interface AuditCliArgs {
  _: string[];
  word?: string;
  line?: string;
  character?: string;
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
      "  ers audit <file> (--word <name> | --line <n> --character <n>) [--mode full-floor|structural] [--json]",
      "",
      "Examples:",
      "  ers audit ff/lib/core/core.ff --word slip",
      "  ers audit ff/lib/core/core.ff --line 69 --character 4 --json",
      "  ers audit ff/optimize.ffp --word demo --mode structural --json",
    ].join("\n"),
  );
}

function comparePosition(left: SourcePosition, right: SourcePosition) {
  if (left.line !== right.line) {
    return left.line - right.line;
  }
  return left.character - right.character;
}

function containsPosition(
  range: { start: SourcePosition; end: SourcePosition },
  position: SourcePosition,
) {
  return comparePosition(range.start, position) <= 0 && comparePosition(position, range.end) <= 0;
}

function isSyntheticCoreDefinition(definition: Definition) {
  return definition.bodyRange === null && definition.tokens.length === 0;
}

function parseOneBasedInteger(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required \`--${name}\` argument.`);
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`\`--${name}\` must be a positive 1-based integer.`);
  }

  return parsed;
}

function resolveTargetWord(file: string, source: string, argv: AuditCliArgs) {
  if (argv.word) {
    return argv.word;
  }

  const line = parseOneBasedInteger("line", argv.line);
  const character = parseOneBasedInteger("character", argv.character);
  const position: SourcePosition = { line: line - 1, character: character - 1 };
  const compileResult = compileSource(source, file);

  for (const definition of compileResult.definitions.values()) {
    if (isSyntheticCoreDefinition(definition)) {
      continue;
    }

    if (containsPosition(definition.range, position)) {
      return definition.name;
    }
  }

  throw new Error("Place the cursor inside a user-defined word.");
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

  const mode = argv.mode === "structural" ? "structural" : "full-floor" satisfies ErsAuditMode;
  const readTextFileSync = runtime.readTextFileSync ?? ((path: string) => fs.readFileSync(path, "utf8"));
  const source = readTextFileSync(file);
  const word = resolveTargetWord(file, source, argv);
  const result = auditSource({
    file,
    source,
    word,
    mode,
  });

  if (argv.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(formatAudit(result));
}

if (import.meta.main) {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      word: { type: "string", short: "w" },
      line: { type: "string" },
      character: { type: "string" },
      mode: { type: "string", short: "m", default: "full-floor" },
      json: { type: "boolean", short: "j", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: AuditCliArgs = {
    ...values,
    _: positionals,
  };

  run(argv);
}
