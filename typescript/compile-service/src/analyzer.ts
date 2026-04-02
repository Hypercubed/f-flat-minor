import { IROp, type IrInstruction } from "../../core/src/ir.ts";
import { OpCodes } from "../../core/src/opcodes.ts";
import type { SourceRange } from "./source-map.ts";
import {
  WORD_SIGNATURES,
  type AbstractValueType,
  type WordSignature,
} from "./word-signatures.ts";

export interface Diagnostic {
  severity: "error" | "warning";
  message: string;
  range: SourceRange;
}

type AbstractValue =
  | { type: "literal"; value?: bigint }
  | { type: "pointer"; source?: string }
  | { type: "unknown" };

function inferValue(instruction: IrInstruction): AbstractValue {
  if (instruction.op === IROp.push) {
    if (instruction.meta?.pointer) {
      return { type: "pointer", source: instruction.meta?.name };
    }
    return { type: "literal", value: instruction.value };
  }
  return { type: "unknown" };
}

function matchesType(value: AbstractValue | undefined, expected: AbstractValueType) {
  if (expected === "unknown") {
    return true;
  }
  if (!value) {
    return false;
  }
  return value.type === expected || value.type === "unknown";
}

function abstractFromType(type: AbstractValueType): AbstractValue {
  if (type === "literal") {
    return { type };
  }
  if (type === "pointer") {
    return { type };
  }
  return { type: "unknown" };
}

function getInstructionRange(instruction: IrInstruction): SourceRange | null {
  const line = instruction.meta?.line;
  const character = instruction.meta?.character;
  const length = instruction.meta?.length;
  if (
    typeof line !== "number" ||
    typeof character !== "number" ||
    typeof length !== "number"
  ) {
    return null;
  }
  return {
    start: { line, character },
    end: { line, character: character + Math.max(length, 1) },
  };
}

function isSystemCall(instruction: IrInstruction, opcode: number) {
  return instruction.op === IROp.call && instruction.value === BigInt(opcode);
}

export function analyzeIr(
  ir: IrInstruction[],
  signatures: Record<string, WordSignature> = WORD_SIGNATURES,
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const stack: AbstractValue[] = [];

  for (const instruction of ir) {
    if (instruction.op === IROp.push) {
      stack.push(inferValue(instruction));
      continue;
    }

    if (isSystemCall(instruction, OpCodes.MARK)) {
      continue;
    }

    if (isSystemCall(instruction, OpCodes.DEF)) {
      continue;
    }

    const signature = instruction.meta?.name
      ? signatures[instruction.meta.name.toLowerCase()]
      : undefined;
    if (!signature) {
      stack.length = 0;
      continue;
    }

    const inputs = stack.slice(-signature.inputs.length);
    let mismatch = false;
    for (let index = 0; index < signature.inputs.length; index++) {
      const expected = signature.inputs[index];
      const actual = inputs[index];
      if (!matchesType(actual, expected)) {
        mismatch = true;
        break;
      }
    }

    if (mismatch) {
      const range = getInstructionRange(instruction);
      if (range) {
        diagnostics.push({
          severity: "error",
          message: `Static analysis: \`${instruction.meta?.name}\` received incompatible stack input`,
          range,
        });
      }
      stack.length = 0;
      continue;
    }

    stack.splice(Math.max(stack.length - signature.inputs.length, 0), signature.inputs.length);
    for (const output of signature.outputs) {
      stack.push(abstractFromType(output));
    }
  }

  return diagnostics;
}
