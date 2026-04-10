import { html, render } from "lit-html";
import { getCompiledBytecodeDisplay, getCompiledByteScore } from "../../../web/src/program-runner.ts";

export function formatBytecodeByteCount(value: string): string {
  const byteCount = value ? getCompiledByteScore(value) : 0;
  const unit = byteCount === 1 ? "byte" : "bytes";
  return `${byteCount} ${unit}`;
}

export function renderBytecodeToPre(bytecodeEl: HTMLElement, bytecode: string): void {
  render(html`${getCompiledBytecodeDisplay(bytecode)}`, bytecodeEl);
}

export function setBytecodeCountLabel(countEl: HTMLElement, bytecode: string): void {
  countEl.textContent = formatBytecodeByteCount(bytecode);
}

export function setBytecodePlainText(bytecodeEl: HTMLElement, bytecode: string, emptyFallback: string): void {
  bytecodeEl.textContent = getCompiledBytecodeDisplay(bytecode) || emptyFallback;
}
