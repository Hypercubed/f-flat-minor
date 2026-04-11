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
  private readonly stdlibRoots: string[];
  private macroPreludeReady = false;
  private rootFilename: string | null = null;

  constructor(
    host: PreprocessHost,
    deps: { engine: Engine; compiler?: Compiler },
    options?: { macroEngineBootstrapFile?: string; stdlibRoots?: string[] },
  ) {
    this.host = host;
    this.engine = deps.engine;
    this.compiler = deps.compiler || new Compiler();
    this.stdlibRoots = options?.stdlibRoots ?? [];
    if (options?.macroEngineBootstrapFile) {
      this.bootstrapMacroEngine(options.macroEngineBootstrapFile);
    }
  }

  preprocess(lines: string[], filename = "-"): string {
    const resolvedFilename = filename !== "-" && this.host.fileExists(filename)
      ? this.host.realpath(filename)
      : filename;
    const isTopLevel = this.rootFilename === null;
    if (isTopLevel && resolvedFilename !== "-") {
      this.rootFilename = resolvedFilename;
    }
    try {
      return this.preprocessLines(lines, resolvedFilename);
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
    const specifier = filename.trim();
    if (!specifier) {
      throw new Error("Preprocessor: missing import path");
    }

    if (this.isStdlibImport(specifier)) {
      return this.resolveStdlibImport(specifier);
    }

    return this.resolveFilesystemImport(specifier, source);
  }

  private isStdlibImport(specifier: string): boolean {
    return specifier.startsWith("<") && specifier.endsWith(">") && specifier.length > 2;
  }

  private resolveFilesystemImport(specifier: string, source: string): string {
    if (source && source !== "-" && !this.host.path.isAbsolute(specifier)) {
      const dir = this.host.path.dirname(source);
      const relative = this.host.path.resolve(dir, specifier);
      const resolved = this.resolveFileOrDirectory(relative);
      if (resolved) {
        return resolved;
      }
    }

    const resolved = this.resolveFileOrDirectory(specifier);
    if (resolved) {
      return resolved;
    }

    throw new Error(`File not found: "${specifier}"`);
  }

  private resolveStdlibImport(specifier: string): string {
    const logicalPath = specifier.slice(1, -1).trim();
    const searchedRoots: string[] = [];

    for (const root of this.stdlibRoots) {
      searchedRoots.push(root);
      const basePath = this.host.path.resolve(root, logicalPath);
      const resolved = this.resolveFileOrDirectory(basePath, {
        extensions: [".ffp", ".ff"],
      });
      if (resolved) {
        return resolved;
      }
    }

    const rootsMessage = searchedRoots.length > 0
      ? searchedRoots.join(", ")
      : "(no stdlib roots configured)";
    throw new Error(
      `Stdlib import not found: ${specifier} (searched roots: ${rootsMessage})`,
    );
  }

  private resolveFileOrDirectory(
    path: string,
    options?: { extensions?: string[] },
  ): string | null {
    if (this.host.fileExists(path)) {
      return this.host.realpath(path);
    }

    for (const extension of options?.extensions ?? []) {
      const withExtension = `${path}${extension}`;
      if (this.host.fileExists(withExtension)) {
        return this.host.realpath(withExtension);
      }
    }

    if (this.host.directoryExists(path)) {
      const basename = this.getBasename(path);
      for (const extension of [".ffp", ".ff"]) {
        const indexPath = this.host.path.resolve(path, `${basename}${extension}`);
        if (this.host.fileExists(indexPath)) {
          return this.host.realpath(indexPath);
        }
      }
    }

    return null;
  }

  private getBasename(path: string): string {
    const trimmed = path.replace(/[\\/]+$/, "");
    const parts = trimmed.split(/[\\/]+/).filter(Boolean);
    return parts[parts.length - 1] ?? trimmed;
  }

  private bootstrapMacroEngine(filename: string) {
    const filepath = this.findFile(filename);
    const code = this.host.readTextFile(filepath);
    // Bootstrap through an isolated child preprocessor so .import state does
    // not leak, while keeping `.ffp` unavailable until bootstrap completes.
    const bootstrapPreprocessor = new Preprocessor(this.host, {
      engine: this.engine,
      compiler: this.compiler,
    }, {
      stdlibRoots: this.stdlibRoots,
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
