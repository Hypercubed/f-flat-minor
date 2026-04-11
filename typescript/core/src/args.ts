// Shared Arguments interfaces for CLI tools

export interface CommonArgs {
  file?: string;
  prelude?: boolean;
  "preprocessor-prelude"?: boolean;
  "stdlib-root"?: string[];
}

export interface PreprocessArgs extends CommonArgs {
}

export interface CompileArgs extends CommonArgs {
  preprocess?: boolean;
  stats?: boolean;
  validate?: boolean;
  hlir?: boolean;
  opt?: boolean;
  ir?: boolean;
  llir?: boolean;
  disassemble?: boolean;
  enc?: boolean;
  dc?: boolean;
  bc?: boolean;
  dump?: boolean;
}

export interface ExecuteArgs {
  file?: string;
  dump?: boolean;
  hlir?: boolean;
  ir?: boolean;
  disassemble?: boolean;
  trace?: boolean;
  "trace-format"?: string;
  "trace-verbose"?: boolean;
  "trace-queue-max"?: number;
  "trace-stack-max"?: number;
  base?: number;
  stats?: boolean;
  profile?: boolean;
}

export interface RunArgs extends CompileArgs, ExecuteArgs {
  preprocess?: boolean;
  trace?: boolean;
}

export interface ReplArgs {
  core?: boolean;
  prelude?: boolean;
  "preprocessor-prelude"?: boolean;
  "stdlib-root"?: string[];
}

export const FBM_STDLIB_PATH_ENV = "FBM_STDLIB_PATH";

export function normalizeStdlibRootArgs(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
  }
  if (typeof value === "string" && value.length > 0) {
    return [value];
  }
  return [];
}

export function splitStdlibEnvRoots(
  value: string | undefined,
  delimiter: string,
): string[] {
  if (!value) {
    return [];
  }
  return value.split(delimiter).filter((entry) => entry.length > 0);
}

export function buildStdlibRootList(options: {
  defaultRoot: string;
  delimiter: string;
  envValue?: string;
  cliRoots?: unknown;
}): string[] {
  return [
    options.defaultRoot,
    ...splitStdlibEnvRoots(options.envValue, options.delimiter),
    ...normalizeStdlibRootArgs(options.cliRoots),
  ];
}
