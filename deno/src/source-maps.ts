export interface SourceMap {
  file: string;
  sourceRoot: string;
  names: string[];
  symbols: Record<string, string>;
}
