import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import type { PreprocessHost } from "./platform.ts";

export class Preprocessor {
  static tokenize(s: string) {
    return s.split(/[\r\n]+/);
  }

  private readonly host: PreprocessHost;
  private readonly engine: Engine;
  private readonly compiler: Compiler;
  private readonly imported = new Set<string>();
  private readonly importPrefixes = new Map<string, string>();
  private macroPreludeReady = false;
  private rootFilename: string | null = null;

  constructor(
    host: PreprocessHost,
    deps: { engine: Engine; compiler?: Compiler },
    options?: { macroEngineBootstrapFile?: string },
  ) {
    this.host = host;
    this.engine = deps.engine;
    this.compiler = deps.compiler || new Compiler();
    if (options?.macroEngineBootstrapFile) {
      this.bootstrapMacroEngine(options.macroEngineBootstrapFile);
    }
  }

  preprocess(lines: string[], filename = "-"): string {
    const isTopLevel = this.rootFilename === null;
    if (isTopLevel && filename !== "-") {
      this.rootFilename = filename;
    }
    try {
      return this.preprocessLines(lines, filename);
    } finally {
      if (isTopLevel) {
        this.rootFilename = null;
      }
    }
  }

  private preprocessLines(
    lines: string[],
    filename: string,
    importScopeFilename?: string,
  ): string {
    return lines.map((line) => {
      if (line.length > 1 && (line[0] === ".")) {
        const [cmd, ...rest] = line.split(" ");
        if (cmd[0] === "." && cmd.length > 1) {
          switch (cmd) {
            case ".exit":
              if (this.host.exit) {
                this.host.exit();
                break;
              }
              throw new Error(
                "Preprocessor: .exit requires a host exit handler",
              );
            case ".load": {
              const filepath = this.findFile(rest.join(" "), filename);
              const code = this.host.readTextFile(filepath);
              return this.preprocessLines(
                Preprocessor.tokenize(code),
                filepath,
              );
            }
            case ".import": {
              const filepath = this.findFile(rest.join(" "), filename);
              if (!this.imported.has(filepath)) {
                this.imported.add(filepath);
                const code = this.host.readTextFile(filepath);
                return this.preprocessLines(
                  Preprocessor.tokenize(code),
                  filepath,
                  filepath,
                );
              }
              return "";
            }
            case ".m": {
              return this.runMacro(rest.join(" "), line);
            }
            case ".ff": {
              return this.runMacro(rest.join(" "), line);
            }
            case ".ffp": {
              if (!this.macroPreludeReady) {
                throw new Error(
                  "Preprocessor: .ffp requires prelude-enabled macro context",
                );
              }
              return this.runMacro(rest.join(" "), line);
            }
          }
          return "";
        }
      }
      if (importScopeFilename) {
        return this.mangleImportedLine(line, importScopeFilename);
      }
      return line;
    }).join("\n");
  }

  findFile(filename: string, source = "-"): string {
    if (source && source !== "-" && !this.host.path.isAbsolute(filename)) {
      const dir = this.host.path.dirname(source);
      const relative = this.host.path.resolve(dir, filename);
      if (this.host.fileExists(relative)) {
        return relative;
      }
    }

    if (this.host.fileExists(filename)) {
      return filename;
    }

    throw 'File not found: "' + filename + '"';
  }

  private bootstrapMacroEngine(filename: string) {
    const filepath = this.findFile(filename);
    const code = this.host.readTextFile(filepath);
    // Bootstrap through an isolated child preprocessor so .import state does
    // not leak, while keeping `.ffp` unavailable until bootstrap completes.
    const bootstrapPreprocessor = new Preprocessor(this.host, {
      engine: this.engine,
      compiler: this.compiler,
    });
    const preprocessed = bootstrapPreprocessor.preprocess(
      Preprocessor.tokenize(code),
      filepath,
    );
    const ir = this.compiler.compileToIR(
      Compiler.tokenize(preprocessed),
      filepath,
    );
    this.engine.loadIR(ir);
    this.engine.run();
    this.engine.clear();
    this.macroPreludeReady = true;
  }

  private runMacro(macroCode: string, sourceLine: string) {
    const ir = this.compiler.compileToIR(
      Compiler.tokenize(macroCode),
    );
    this.engine.loadIR(ir);
    this.engine.run();
    const stack = this.engine.getStack();
    this.engine.clear();
    return stack.map(String).join(" ") + ` /* ${sourceLine} */`;
  }

  private mangleImportedLine(
    line: string,
    importScopeFilename: string,
  ): string {
    const prefix = this.getImportPrefix(importScopeFilename);
    return line.split(/(\s+)/).map((part) => {
      if (!part || /\s+/.test(part)) {
        return part;
      }
      return this.mangleImportedToken(part, prefix);
    }).join("");
  }

  private mangleImportedToken(token: string, prefix: string): string {
    if (token.startsWith("[__")) {
      return `[${prefix}${token.slice(3)}`;
    }
    if (token.startsWith("__")) {
      return `${prefix}${token.slice(2)}`;
    }
    return token;
  }

  private getImportPrefix(importScopeFilename: string): string {
    const cached = this.importPrefixes.get(importScopeFilename);
    if (cached) {
      return cached;
    }

    const normalizedPath = this.getNormalizedImportPath(importScopeFilename);
    const safePath = normalizedPath
      .replace(/[^A-Za-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .replace(/_+/g, "_") || "module";
    const hash = this.hashPath(importScopeFilename);
    const prefix = `__${safePath}_${hash}__`;
    this.importPrefixes.set(importScopeFilename, prefix);
    return prefix;
  }

  private getNormalizedImportPath(importScopeFilename: string): string {
    if (this.rootFilename && this.rootFilename !== "-") {
      const rootDir = this.host.path.dirname(this.rootFilename);
      const relativePath = this.host.path.relative(
        rootDir,
        importScopeFilename,
      );
      if (relativePath) {
        return relativePath.replace(/\\/g, "/");
      }
    }
    return importScopeFilename.replace(/\\/g, "/");
  }

  private hashPath(importScopeFilename: string): string {
    let hash = 0x811c9dc5;
    for (let i = 0; i < importScopeFilename.length; i++) {
      hash ^= importScopeFilename.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(36);
  }
}
