import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";

export class Preprocessor {
  static tokenize(s: string) {
    return s.split(/[\r\n]+/);
  }

  private readonly engine = new Engine();
  private readonly compiler = new Compiler();

  preprocess(lines: string[]): string {
    return lines.map(line => {
      if (line.length > 1 && line[0] === ".") {
        const [cmd, ...rest] = line.split(" ");
        switch (cmd) {
          case ".exit":
            Deno.exit();
            break;
          case ".load": {
            const code = Deno.readTextFileSync(rest.join(' '));
            return this.preprocess(Preprocessor.tokenize(code));
          }
          case ".m": {
            const ir = this.compiler.compileToIR(Compiler.tokenize(rest.join(' ')));
            this.engine.loadIR(ir);
            this.engine.run();
            const stack = this.engine.getStack();
            this.engine.clear();
            return stack.map(String).join(" ") + ` /* ${line} */`;
          }
        }
      }
      return line;
    }).join("\n");
  }
}