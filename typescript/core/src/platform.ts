export interface CoreIO {
  write(data: Uint8Array): void;
  writeError?(data: Uint8Array): void;
  readByte(): number | null;
  setRaw?(raw: boolean): void;
}

export interface CorePlatform {
  io: CoreIO;
  exit(code: number): void;
  now(): number;
}

export interface CompilerHost {
  exit?: (code?: number) => void;
  log?: (...args: Array<string | number | bigint>) => void;
}

export interface PathHost {
  isAbsolute(path: string): boolean;
  dirname(path: string): string;
  relative(from: string, to: string): string;
  resolve(...parts: string[]): string;
}

export interface PreprocessHost {
  exit?: (code?: number) => void;
  readTextFile(path: string): string;
  fileExists(path: string): boolean;
  path: PathHost;
}
