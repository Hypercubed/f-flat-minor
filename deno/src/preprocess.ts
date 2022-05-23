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
            return code;
          }
          case ".m": {
            const ir = this.compiler.compileToIR(Compiler.tokenize(rest.join(' ')));
            const bigCode = Compiler.compileToBigArray(ir);
            this.engine.executeBigIntCode(bigCode);
            const stack = this.engine.getStack();
            this.engine.clear();
            return stack.map(String).join(" ") + ` /* ${line} */`;
          }
          default:
            throw new Error(`Unknown preprocessor command: ${cmd}`);
        }
      } else {
        return line;
      }
    }).join("\n");
  }
}