import {
  compileSource,
  type Definition,
  type DefinitionToken,
  type Diagnostic,
  type SourcePosition,
  type SourceRange,
} from "../../typescript/compile-service/src/mod.ts";
import { systemWords } from "../../typescript/core/src/opcodes.ts";

export type ErsAuditMode = "full-floor" | "structural";
export type ErsSafetyVerdict =
  | "safe-local"
  | "safe-with-analysis"
  | "review-required"
  | "unsafe"
  | "blocked";
export type QueueRegionKind = "local-balanced" | "cross-boundary" | "starts-with-q>";
export type RegionDisposition =
  | "rewritable"
  | "kept-intentionally"
  | "review-required"
  | "blocked";
export type RewriteConfidence = "safe-local" | "safe-with-analysis" | "review-required";

export interface QueueRegion {
  kind: QueueRegionKind;
  range: SourceRange;
  text: string;
  content: string;
  depth: number;
  nested: boolean;
  disposition: RegionDisposition;
  reason: string;
}

export interface PointerCandidate {
  range: SourceRange;
  text: string;
  inner: string;
  normalized: boolean;
  preferredText: string;
  reason: string;
}

export interface RewriteCandidate {
  rule: string;
  confidence: RewriteConfidence;
  range: SourceRange;
  before: string;
  after: string;
  reason: string;
}

export interface ErsAuditResult {
  word: string;
  file: string;
  mode: ErsAuditMode;
  resolvedBody: string;
  definitionRange?: SourceRange;
  queueRegions: QueueRegion[];
  pointerCandidates: PointerCandidate[];
  rewrites: RewriteCandidate[];
  safety: {
    verdict: ErsSafetyVerdict;
    reasons: string[];
  };
  diagnostics: Diagnostic[];
}

export interface ErsAuditParams {
  file: string;
  word: string;
  mode?: ErsAuditMode;
}

export interface ErsAuditSourceParams extends ErsAuditParams {
  source: string;
}

const PRIMITIVE_WORDS = new Set(Object.keys(systemWords));
const FOUNDATION_FREEZE_WORDS = new Set(["slip", "swapd", "dupd"]);
const WRAPPER_ALIASES = new Map<string, string>([
  ["eval", "slip"],
  ["dup", "dupd"],
  ["swap", "swapd"],
]);

const PEEPHOLE_RULES: Array<{
  match: string[];
  rule: string;
  after: string;
  reason: string;
}> = [
  {
    match: ["swap", "+"],
    rule: "commutative-add",
    after: "+",
    reason: "`swap +` is equivalent to `+`.",
  },
  {
    match: ["swap", "*"],
    rule: "commutative-mul",
    after: "*",
    reason: "`swap *` is equivalent to `*`.",
  },
  {
    match: ["0", "+"],
    rule: "add-zero-no-op",
    after: "",
    reason: "`0 +` is a no-op on the current top value.",
  },
  {
    match: ["1", "*"],
    rule: "mul-one-no-op",
    after: "",
    reason: "`1 *` is a no-op on the current top value.",
  },
  {
    match: ["dup", "drop"],
    rule: "dup-drop-no-op",
    after: "",
    reason: "`dup drop` cancels within the same local stack region.",
  },
  {
    match: ["swap", "swap"],
    rule: "double-swap-no-op",
    after: "",
    reason: "`swap swap` restores the original order.",
  },
];

function comparePosition(left: SourcePosition, right: SourcePosition) {
  if (left.line !== right.line) {
    return left.line - right.line;
  }
  return left.character - right.character;
}

function compareRange(left: SourceRange, right: SourceRange) {
  return comparePosition(left.start, right.start) || comparePosition(left.end, right.end);
}

function maxPosition(left: SourcePosition, right: SourcePosition): SourcePosition {
  return comparePosition(left, right) >= 0 ? { ...left } : { ...right };
}

function minPosition(left: SourcePosition, right: SourcePosition): SourcePosition {
  return comparePosition(left, right) <= 0 ? { ...left } : { ...right };
}

function rangesOverlap(left: SourceRange, right: SourceRange) {
  return comparePosition(left.start, right.end) < 0 && comparePosition(right.start, left.end) < 0;
}

function mergeRange(...ranges: SourceRange[]): SourceRange {
  const start = ranges.reduce((best, range) => minPosition(best, range.start), ranges[0]!.start);
  const end = ranges.reduce((best, range) => maxPosition(best, range.end), ranges[0]!.end);
  return { start, end };
}

function rangeFromTokens(tokens: DefinitionToken[]): SourceRange {
  return mergeRange(...tokens.map((token) => token.range));
}

function textFromTokens(tokens: DefinitionToken[]) {
  return tokens.map((token) => token.text).join(" ");
}

function isCompactSingleWordPointer(text: string) {
  return /^\[[^\s\[\]]+\]$/.test(text);
}

function isWordLikeToken(text: string) {
  return text !== "[" && text !== "]" && text !== "q<" && text !== "q>";
}

function uniqueRewrites(rewrites: RewriteCandidate[]) {
  const seen = new Set<string>();
  return rewrites.filter((rewrite) => {
    const key = `${rewrite.rule}:${rewrite.range.start.line}:${rewrite.range.start.character}:${rewrite.range.end.line}:${rewrite.range.end.character}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function definitionIsSyntheticCore(definition: Definition | undefined) {
  if (!definition) {
    return true;
  }
  return definition.bodyRange === null && definition.tokens.length === 0;
}

function filterDefinitionDiagnostics(definition: Definition, diagnostics: Diagnostic[]) {
  return diagnostics
    .filter((diagnostic) => rangesOverlap(diagnostic.range, definition.range))
    .sort((left, right) => compareRange(left.range, right.range));
}

function buildPointerInventory(
  tokens: DefinitionToken[],
  mode: ErsAuditMode,
) {
  const pointerCandidates: PointerCandidate[] = [];
  const rewrites: RewriteCandidate[] = [];

  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]!;

    if (isCompactSingleWordPointer(token.text)) {
      const inner = token.text.slice(1, -1);
      pointerCandidates.push({
        range: token.range,
        text: token.text,
        inner,
        normalized: true,
        preferredText: mode === "full-floor" ? `[ ${inner} ]` : token.text,
        reason: "Compact single-word pointer candidate.",
      });

      if (mode === "full-floor") {
        rewrites.push({
          rule: "expand-single-word-pointer",
          confidence: "safe-local",
          range: token.range,
          before: token.text,
          after: `[ ${inner} ]`,
          reason: "Full-floor audits normalize compact single-word pointers to spaced form.",
        });
      }
      continue;
    }

    const next = tokens[index + 1];
    const afterNext = tokens[index + 2];
    if (
      token.text === "[" &&
      next &&
      afterNext &&
      isWordLikeToken(next.text) &&
      afterNext.text === "]"
    ) {
      const range = mergeRange(token.range, next.range, afterNext.range);
      const text = textFromTokens([token, next, afterNext]);
      const compact = `[${next.text}]`;

      pointerCandidates.push({
        range,
        text,
        inner: next.text,
        normalized: false,
        preferredText: mode === "structural" ? compact : text,
        reason: "Spaced single-word quotation candidate.",
      });

      if (mode === "structural") {
        rewrites.push({
          rule: "compact-single-word-pointer",
          confidence: "safe-local",
          range,
          before: text,
          after: compact,
          reason: "Structural audits prefer compact form for one-token quotations.",
        });
      }

      index += 2;
    }
  }

  return { pointerCandidates, rewrites };
}

function buildPeepholeCandidates(tokens: DefinitionToken[]) {
  const rewrites: RewriteCandidate[] = [];

  for (const rule of PEEPHOLE_RULES) {
    for (let index = 0; index <= tokens.length - rule.match.length; index++) {
      const window = tokens.slice(index, index + rule.match.length);
      if (window.every((token, offset) => token.text === rule.match[offset])) {
        rewrites.push({
          rule: rule.rule,
          confidence: "safe-local",
          range: mergeRange(...window.map((token) => token.range)),
          before: textFromTokens(window),
          after: rule.after,
          reason: rule.reason,
        });
      }
    }
  }

  return rewrites;
}

function isPrimitiveWrapperDefinition(definition: Definition, startIndex: number, endIndex: number) {
  if (startIndex !== 0 || endIndex !== definition.tokens.length - 1) {
    return false;
  }
  if (definition.tokens.length !== 3) {
    return false;
  }
  const inner = definition.tokens[1]?.text;
  return typeof inner === "string" && PRIMITIVE_WORDS.has(inner);
}

function buildQueueInventory(definition: Definition) {
  const queueRegions: QueueRegion[] = [];
  const rewrites: RewriteCandidate[] = [];
  const queueStack: number[] = [];
  let sawQueueToken = false;

  for (let index = 0; index < definition.tokens.length; index++) {
    const token = definition.tokens[index]!;

    if (token.text === "q<") {
      queueStack.push(index);
      sawQueueToken = true;
      continue;
    }

    if (token.text !== "q>") {
      continue;
    }

    sawQueueToken = true;

    if (queueStack.length === 0) {
      queueRegions.push({
        kind: sawQueueToken && index === 0 ? "starts-with-q>" : "cross-boundary",
        range: token.range,
        text: token.text,
        content: "",
        depth: 0,
        nested: false,
        disposition: "blocked",
        reason: index === 0
          ? "Leading `q>` depends on caller queue state."
          : "Unmatched `q>` closes queue state outside this definition.",
      });
      continue;
    }

    const startIndex = queueStack.pop()!;
    const regionTokens = definition.tokens.slice(startIndex, index + 1);
    const contentTokens = definition.tokens.slice(startIndex + 1, index);
    const nested = contentTokens.some((inner) => inner.text === "q<" || inner.text === "q>");
    const wrapperAlias = contentTokens.length === 1 ? WRAPPER_ALIASES.get(contentTokens[0]!.text) : undefined;
    const fullText = textFromTokens(regionTokens);
    const contentText = textFromTokens(contentTokens);
    const range = rangeFromTokens(regionTokens);
    const depth = queueStack.length + 1;

    let disposition: RegionDisposition = "rewritable";
    let reason = "Balanced local queue region can be rewritten mechanically.";

    if (isPrimitiveWrapperDefinition(definition, startIndex, index)) {
      disposition = "kept-intentionally";
      reason = FOUNDATION_FREEZE_WORDS.has(definition.name)
        ? "Foundational primitive queue wrapper definition is frozen."
        : "Single-word primitive queue wrapper definition is intentionally irreducible.";
    } else if (nested) {
      disposition = "review-required";
      reason = "Nested queue usage should be reduced inside-out before rewriting this outer region.";
    }

    queueRegions.push({
      kind: "local-balanced",
      range,
      text: fullText,
      content: contentText,
      depth,
      nested,
      disposition,
      reason,
    });

    if (disposition !== "rewritable") {
      continue;
    }

    if (contentTokens.length === 0) {
      rewrites.push({
        rule: "empty-queue-no-op",
        confidence: "safe-local",
        range,
        before: fullText,
        after: "",
        reason: "`q< q>` is a local no-op queue pair.",
      });
      continue;
    }

    if (wrapperAlias) {
      rewrites.push({
        rule: "wrapper-use-canonicalization",
        confidence: "safe-local",
        range,
        before: fullText,
        after: wrapperAlias,
        reason: `Use the named wrapper word \`${wrapperAlias}\` instead of raw queue form.`,
      });
      continue;
    }

    rewrites.push({
      rule: "queue-to-dip",
      confidence: "safe-local",
      range,
      before: fullText,
      after: `[ ${contentText} ] dip`,
      reason: "Balanced local queue regions are definitionally equivalent to quotation-plus-`dip`.",
    });
  }

  while (queueStack.length > 0) {
    const startIndex = queueStack.pop()!;
    const token = definition.tokens[startIndex]!;
    queueRegions.push({
      kind: "cross-boundary",
      range: token.range,
      text: token.text,
      content: "",
      depth: 0,
      nested: false,
      disposition: "blocked",
      reason: "Unmatched `q<` leaves queue state open across the definition boundary.",
    });
  }

  queueRegions.sort((left, right) => compareRange(left.range, right.range));
  return { queueRegions, rewrites };
}

function determineSafety(
  diagnostics: Diagnostic[],
  queueRegions: QueueRegion[],
  rewrites: RewriteCandidate[],
) {
  const reasons: string[] = [];
  const blockedQueueRegions = queueRegions.filter((region) => region.disposition === "blocked");
  if (blockedQueueRegions.length > 0) {
    if (diagnostics.length > 0) {
      reasons.push(`Static analysis reported ${diagnostics.length} diagnostic(s) in the target definition.`);
    }
    reasons.push(...blockedQueueRegions.map((region) => region.reason));
    return {
      verdict: "blocked" as const,
      reasons,
    };
  }

  const reviewQueueRegions = queueRegions.filter((region) => region.disposition === "review-required");
  if (reviewQueueRegions.length > 0) {
    if (diagnostics.length > 0) {
      reasons.push(`Static analysis reported ${diagnostics.length} diagnostic(s) in the target definition.`);
    }
    reasons.push(...reviewQueueRegions.map((region) => region.reason));
    return {
      verdict: "review-required" as const,
      reasons,
    };
  }

  if (rewrites.some((rewrite) => rewrite.confidence === "review-required")) {
    if (diagnostics.length > 0) {
      reasons.push(`Static analysis reported ${diagnostics.length} diagnostic(s) in the target definition.`);
    }
    reasons.push("At least one candidate rewrite still requires manual review.");
    return {
      verdict: "review-required" as const,
      reasons,
    };
  }

  if (rewrites.some((rewrite) => rewrite.confidence === "safe-with-analysis")) {
    if (diagnostics.length > 0) {
      reasons.push(`Static analysis reported ${diagnostics.length} diagnostic(s) in the target definition.`);
    }
    reasons.push("At least one candidate rewrite depends on additional effect analysis.");
    return {
      verdict: "safe-with-analysis" as const,
      reasons,
    };
  }

  if (diagnostics.length > 0) {
    reasons.push(`Static analysis reported ${diagnostics.length} diagnostic(s) in the target definition.`);
  }
  reasons.push("Audit found only local, deterministic candidates.");
  return {
    verdict: "safe-local" as const,
    reasons,
  };
}

export function auditSource(params: ErsAuditSourceParams): ErsAuditResult {
  const mode = params.mode ?? "full-floor";
  const compileResult = compileSource(params.source, params.file);
  const definition = compileResult.definitions.get(params.word);

  if (!definition || definitionIsSyntheticCore(definition)) {
    throw new Error(`User-defined word \`${params.word}\` was not found in ${params.file}.`);
  }

  const diagnostics = filterDefinitionDiagnostics(definition, compileResult.diagnostics);
  const { queueRegions, rewrites: queueRewrites } = buildQueueInventory(definition);
  const { pointerCandidates, rewrites: pointerRewrites } = buildPointerInventory(definition.tokens, mode);
  const rewrites = uniqueRewrites([
    ...queueRewrites,
    ...pointerRewrites,
    ...buildPeepholeCandidates(definition.tokens),
  ]).sort((left, right) => compareRange(left.range, right.range));
  const safety = determineSafety(diagnostics, queueRegions, rewrites);

  return {
    word: definition.name,
    file: params.file,
    mode,
    resolvedBody: definition.body,
    definitionRange: definition.range,
    queueRegions,
    pointerCandidates,
    rewrites,
    safety,
    diagnostics,
  };
}

