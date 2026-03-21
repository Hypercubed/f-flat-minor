import coreVocabularyJson from "../../../_shared/core-vocabulary.json" with { type: "json" };

export interface CoreVocabularyEntry {
  mnemonic: string;
  syntax: string;
  stackEffect: string;
  description: string;
  opcode: number;
}

/**
 * Map of opcode to core vocabulary entry for quick lookup
 */
const coreVocabularyByOpcode = new Map<number, CoreVocabularyEntry>();

// Build the map from the JSON data
for (const word of coreVocabularyJson.words) {
  coreVocabularyByOpcode.set(word.opcode, word as CoreVocabularyEntry);
}

/**
 * Get the core vocabulary entry for a given opcode
 * @param opcode - The opcode number (0-255)
 * @returns The vocabulary entry if found, undefined otherwise
 */
export function getCoreVocabularyEntry(opcode: number): CoreVocabularyEntry | undefined {
  return coreVocabularyByOpcode.get(opcode);
}
