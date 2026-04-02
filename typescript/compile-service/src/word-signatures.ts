export type AbstractValueType = "literal" | "pointer" | "unknown";

export interface WordSignature {
  inputs: AbstractValueType[];
  outputs: AbstractValueType[];
  description?: string;
}

export const WORD_SIGNATURES: Record<string, WordSignature> = {
  eval: {
    inputs: ["pointer"],
    outputs: [],
    description: "Evaluate a quotation or user-defined word pointer.",
  },
  "+": {
    inputs: ["literal", "literal"],
    outputs: ["literal"],
    description: "Add two literals.",
  },
  "-": {
    inputs: ["literal", "literal"],
    outputs: ["literal"],
    description: "Subtract two literals.",
  },
  "*": {
    inputs: ["literal", "literal"],
    outputs: ["literal"],
    description: "Multiply two literals.",
  },
  "/": {
    inputs: ["literal", "literal"],
    outputs: ["literal"],
    description: "Divide two literals.",
  },
  drop: {
    inputs: ["unknown"],
    outputs: [],
    description: "Drop the top of the stack.",
  },
  dup: {
    inputs: ["unknown"],
    outputs: ["unknown", "unknown"],
    description: "Duplicate the top of the stack.",
  },
  swap: {
    inputs: ["unknown", "unknown"],
    outputs: ["unknown", "unknown"],
    description: "Swap the top two stack items.",
  },
};
