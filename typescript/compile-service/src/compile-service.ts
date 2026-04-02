import { Compiler } from "../../core/src/compiler.ts";
import type { IrInstruction } from "../../core/src/ir.ts";
import { IROp } from "../../core/src/ir.ts";
import { OpCodes, systemWords } from "../../core/src/opcodes.ts";
import { analyzeIr, type Diagnostic } from "./analyzer.ts";
import {
  createSourceMap,
  type SourceMap,
  type SourcePosition,
  type SourceRange,
} from "./source-map.ts";
import { tokenizeSource, type SourceToken } from "./tokenizer.ts";

export interface DefinitionToken {
  text: string;
  range: SourceRange;
}

export interface Definition {
  name: string;
  body: string;
  range: SourceRange;
  nameRange: SourceRange;
  bodyRange: SourceRange | null;
  filename?: string;
  tokens: DefinitionToken[];
}

export interface CompileResult {
  definitions: Map<string, Definition>;
  diagnostics: Diagnostic[];
  sourceMap: SourceMap;
  tokens: SourceToken[];
  ir: IrInstruction[];
}

const MARK = BigInt(OpCodes.MARK);
const DEF = BigInt(OpCodes.DEF);

function comparePosition(a: SourcePosition, b: SourcePosition) {
  if (a.line !== b.line) {
    return a.line - b.line;
  }
  return a.character - b.character;
}

function createRangeFromToken(token: SourceToken): SourceRange {
  return {
    start: { line: token.line, character: token.character },
    end: {
      line: token.line,
      character: token.character + token.length,
    },
  };
}

function expandRange(start: SourcePosition, end: SourcePosition): SourceRange {
  return {
    start: { ...start },
    end: { ...end },
  };
}

function definitionNameFromInstruction(instruction: IrInstruction): string | null {
  const name = instruction.meta?.name;
  return typeof name === "string" && name.length > 0 ? name : null;
}

function buildDefinition(
  filename: string | undefined,
  definingInstruction: IrInstruction,
  bodyInstructions: IrInstruction[],
  sourceMap: SourceMap,
): Definition | null {
  const name = definitionNameFromInstruction(definingInstruction);
  if (!name) {
    return null;
  }

  const definingToken = sourceMap.tokenAtOffset(definingInstruction.meta?.offset ?? -1);
  if (!definingToken) {
    return null;
  }

  const nameRange = createRangeFromToken(definingToken);
  const bodyTokens = bodyInstructions
    .map((instruction) => sourceMap.tokenAtOffset(instruction.meta?.offset ?? -1))
    .filter((token): token is SourceToken => token !== undefined)
    .filter((token) => token.raw !== "/*" && token.raw !== "*/");

  let bodyRange: SourceRange | null = null;
  if (bodyTokens.length > 0) {
    const first = bodyTokens[0]!;
    const last = bodyTokens[bodyTokens.length - 1]!;
    bodyRange = expandRange(
      { line: first.line, character: first.character },
      { line: last.line, character: last.character + last.length },
    );
  }

  const range = bodyRange
    ? expandRange(nameRange.start, bodyRange.end)
    : expandRange(nameRange.start, nameRange.end);

  return {
    name,
    body: bodyTokens.map((token) => token.raw).join(" "),
    range,
    nameRange,
    bodyRange,
    filename,
    tokens: bodyTokens.map((token) => ({
      text: token.raw,
      range: createRangeFromToken(token),
    })),
  };
}

function extractDefinitions(ir: IrInstruction[], sourceMap: SourceMap): Map<string, Definition> {
  const definitions = new Map<string, Definition>();

  for (let index = 0; index < ir.length; index++) {
    const instruction = ir[index];
    if (!instruction || instruction.op !== IROp.call || instruction.value !== DEF) {
      continue;
    }

    let markIndex = index - 1;
    while (markIndex >= 0) {
      const candidate = ir[markIndex];
      if (candidate?.op === IROp.call && candidate.value === MARK) {
        break;
      }
      markIndex--;
    }

    const definingInstruction = ir[markIndex - 1];
    if (!definingInstruction || definingInstruction.op !== IROp.push || !definingInstruction.meta?.pointer) {
      continue;
    }

    const definition = buildDefinition(
      definingInstruction.meta?.filename,
      definingInstruction,
      ir.slice(markIndex + 1, index),
      sourceMap,
    );
    if (!definition) {
      continue;
    }

    definitions.set(definition.name, definition);
  }

  return definitions;
}

function coreWordDefinitions(): Map<string, Definition> {
  const definitions = new Map<string, Definition>();
  for (const word of Object.keys(systemWords)) {
    definitions.set(word, {
      name: word,
      body: "",
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 0 },
      },
      nameRange: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 0 },
      },
      bodyRange: null,
      filename: undefined,
      tokens: [],
    });
  }
  return definitions;
}

export function compileSource(source: string, uri = "/main.ffp"): CompileResult {
  const tokens = tokenizeSource(source);
  const compiler = new Compiler();
  const ir = compiler.compileToIR(tokens, uri);
  const sourceMap = createSourceMap(tokens);
  const definitions = coreWordDefinitions();

  for (const [name, definition] of extractDefinitions(ir, sourceMap)) {
    definitions.set(name, definition);
  }

  const diagnostics = analyzeIr(ir);
  diagnostics.sort((left, right) => comparePosition(left.range.start, right.range.start));

  return {
    definitions,
    diagnostics,
    sourceMap,
    tokens,
    ir,
  };
}
