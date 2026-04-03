import * as vscode from "vscode";
import coreVocabularyJson from "./core-vocabulary.json";

export interface CoreVocabularyEntry {
  mnemonic: string;
  syntax: string;
  stackEffect: string;
  description: string;
  opcode: number;
}

/** Matches `tools/ers/audit.ts` WRAPPER_ALIASES: canonical syntax → library spelling. */
const CANONICAL_TO_ALIAS: Record<string, string> = {
  eval: "slip",
  dup: "dupd",
  swap: "swapd",
};

const ALIAS_TO_CANONICAL: Record<string, string> = Object.fromEntries(
  Object.entries(CANONICAL_TO_ALIAS).map(([c, a]) => [a, c]),
);

const bySyntax = new Map<string, CoreVocabularyEntry>();
for (const w of coreVocabularyJson.words) {
  bySyntax.set(w.syntax, w as CoreVocabularyEntry);
}

/**
 * Resolve a source token to a core vocabulary entry (primitive opcode surface).
 * Handles library spellings `slip`, `dupd`, `swapd`.
 */
export function lookupCoreVocabularyEntry(token: string): CoreVocabularyEntry | undefined {
  const canonical = ALIAS_TO_CANONICAL[token];
  if (canonical !== undefined) {
    return bySyntax.get(canonical);
  }
  return bySyntax.get(token);
}

/** Whitespace-delimited token under the cursor (same heuristic as spaced F♭m tokens). */
export function whitespaceTokenRangeAt(
  line: vscode.TextLine,
  character: number,
): vscode.Range | null {
  const text = line.text;
  if (text.length === 0 || character < 0 || character > text.length) {
    return null;
  }
  let col = character;
  if (col === text.length) {
    col = text.length - 1;
  }
  if (/\s/.test(text[col]!)) {
    return null;
  }
  let start = col;
  while (start > 0 && !/\s/.test(text[start - 1]!)) {
    start--;
  }
  let end = col + 1;
  while (end < text.length && !/\s/.test(text[end]!)) {
    end++;
  }
  return new vscode.Range(line.lineNumber, start, line.lineNumber, end);
}

const NUMERIC_LITERAL = /^-?(?:0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+)$/;

export function shouldOfferCoreVocabHover(token: string): boolean {
  if (!token || token.startsWith(".") || token.startsWith("'")) {
    return false;
  }
  if (NUMERIC_LITERAL.test(token)) {
    return false;
  }
  return lookupCoreVocabularyEntry(token) !== undefined;
}

/**
 * Markdown aligned with the web REPL inspector (`renderInspectPanel` vocabulary block):
 * header value, KNOWN AS (mnemonic), system tag, stack effect (code), description.
 */
export function markdownForCorePrimitiveHover(
  displayToken: string,
  entry: CoreVocabularyEntry,
): vscode.MarkdownString {
  const md = new vscode.MarkdownString();
  md.isTrusted = false;
  md.supportHtml = false;

  md.appendMarkdown(`### \`${displayToken}\`\n\n`);
  md.appendMarkdown(`*system*\n\n`);
  md.appendMarkdown(`**KNOWN AS:** ${entry.mnemonic}  \n`);
  md.appendMarkdown(`**Opcode:** ${entry.opcode}  \n\n`);

  if (displayToken !== entry.syntax) {
    md.appendMarkdown(
      `*Primitive syntax in core vocabulary: \`${entry.syntax}\`.*  \n\n`,
    );
  }

  md.appendMarkdown("**Stack effect**\n\n");
  md.appendCodeblock(entry.stackEffect, "plaintext");
  md.appendMarkdown("\n\n**Description**\n\n");
  md.appendText(entry.description);

  return md;
}
