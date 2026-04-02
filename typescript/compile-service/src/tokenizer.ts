import { Compiler, type CompilerToken } from "../../core/src/compiler.ts";

export interface SourcePosition {
  line: number;
  character: number;
}

export interface SourceRange {
  start: SourcePosition;
  end: SourcePosition;
}

export interface SourceToken extends CompilerToken {
  range: SourceRange;
  word?: string;
}

export function normalizeWordToken(raw: string): string | undefined {
  if (!raw || raw === "/*" || raw === "*/") {
    return undefined;
  }

  if (raw.startsWith("'")) {
    return undefined;
  }

  if (raw.endsWith(":") && raw.length > 1) {
    return raw.slice(0, -1);
  }

  if (raw.startsWith("[") && raw.endsWith("]") && raw.length > 2) {
    return raw.slice(1, -1);
  }

  return raw;
}

export function tokenToRange(token: CompilerToken): SourceRange {
  return {
    start: {
      line: token.line,
      character: token.character,
    },
    end: {
      line: token.line,
      character: token.character + token.length,
    },
  };
}

export function tokenizeSource(source: string): SourceToken[] {
  return Compiler.tokenizeWithSpans(source).map((token) => ({
    ...token,
    range: tokenToRange(token),
    word: normalizeWordToken(token.raw),
  }));
}
