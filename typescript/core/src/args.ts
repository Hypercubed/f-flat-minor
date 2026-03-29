// Shared Arguments interfaces for CLI tools

export interface CommonArgs {
  file?: string;
  prelude?: boolean;
  "preprocessor-prelude"?: boolean;
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
}
