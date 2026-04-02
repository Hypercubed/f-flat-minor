import type { TokenSpan } from "../../core/src/compiler.ts";
import {
  normalizeWordToken,
  tokenToRange,
  type SourcePosition,
  type SourceRange,
  type SourceToken,
} from "./tokenizer.ts";

export class CompileSourceMap {
  readonly tokens: SourceToken[];

  constructor(tokens: SourceToken[]) {
    this.tokens = tokens;
  }

  rangeForToken(token: Pick<TokenSpan, "line" | "character" | "length">): SourceRange {
    return tokenToRange({
      raw: "",
      value: "",
      offset: 0,
      ...token,
    });
  }

  tokenAt(position: SourcePosition): SourceToken | undefined {
    return this.tokens.find((token) => {
      if (token.line !== position.line) {
        return false;
      }
      return position.character >= token.character
        && position.character < token.character + token.length;
    });
  }

  tokenAtOffset(offset: number): SourceToken | undefined {
    return this.tokens.find((token) => {
      return offset >= token.offset && offset < token.offset + token.length;
    });
  }

  wordAt(position: SourcePosition): string | undefined {
    const token = this.tokenAt(position);
    if (!token) {
      return undefined;
    }
    return token.word ?? normalizeWordToken(token.raw);
  }

  getToken(index: number): SourceToken | undefined {
    return this.tokens[index];
  }
}

export type SourceMap = CompileSourceMap;

export type { SourcePosition, SourceRange, SourceToken };

export function createSourceMap(tokens: SourceToken[]): SourceMap {
  return new CompileSourceMap(tokens);
}
