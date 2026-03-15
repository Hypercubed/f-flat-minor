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

  constructor(host: PreprocessHost, deps: { engine: Engine; compiler?: Compiler }) {
    this.host = host;
    this.engine = deps.engine;
    this.compiler = deps.compiler || new Compiler();
  }

  preprocess(lines: string[], filename = "-"): string {
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
              throw new Error("Preprocessor: .exit requires a host exit handler");
            case ".load": {
              const filepath = this.findFile(rest.join(" "), filename);
              const code = this.host.readTextFile(filepath);
              return this.preprocess(Preprocessor.tokenize(code), filepath);
            }
            case ".import": {
              const filepath = this.findFile(rest.join(" "), filename);
              if (!this.imported.has(filepath)) {
                this.imported.add(filepath);
                const code = this.host.readTextFile(filepath);
                return this.preprocess(Preprocessor.tokenize(code), filepath);
              }
              return "";
            }
            case ".m": {
              const ir = this.compiler.compileToIR(
                Compiler.tokenize(rest.join(" ")),
              );
              this.engine.loadIR(ir);
              this.engine.run();
              const stack = this.engine.getStack();
              this.engine.clear();
              return stack.map(String).join(" ") + ` /* ${line} */`;
            }
          }
          return "";
        }
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
}
