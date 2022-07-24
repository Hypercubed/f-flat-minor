import * as fs from "https://deno.land/std/fs/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";

export class Preprocessor {
  static tokenize(s: string) {
    return s.split(/[\r\n]+/);
  }

  private readonly engine = new Engine();
  private readonly compiler = new Compiler();
  private readonly imported = new Set<string>();

  preprocess(lines: string[], filename = "-"): string {
    return lines.map((line) => {
      if (line.length > 1 && (line[0] === ".")) {
        const [cmd, ...rest] = line.split(" ");
        if (cmd[0] === "." && cmd.length > 1) {
          switch (cmd) {
            case ".exit":
              Deno.exit();
              break;
            case ".load": {
              const filepath = this.findFile(rest.join(" "), filename);
              const code = Deno.readTextFileSync(filepath);
              return this.preprocess(Preprocessor.tokenize(code), filepath);
            }
            case ".import": {
              const filepath = this.findFile(rest.join(" "), filename);
              if (!this.imported.has(filepath)) {
                this.imported.add(filepath);
                const code = Deno.readTextFileSync(filepath);
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
    if (source && source !== "-" && !path.isAbsolute(filename)) {
      const dir = path.dirname(source);
      const relative = path.resolve(dir, filename);
      if (fs.existsSync(relative)) {
        return relative;
      }
    }

    if (fs.existsSync(filename)) {
      return filename;
    }

    throw 'File not found: "' + filename + '"';
  }
}
