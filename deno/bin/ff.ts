#!/usr/bin/env -S deno -q run --allow-net --allow-read

switch (Deno.args[0] || 'repl') {
  case "compile": {
    (await import("./ff2ffb.ts")).compile(Deno.args[1]);
    break;
  }
  case "execute": {
    (await import("./ffb-interp.ts")).execute(Deno.args[1]);
    break;
  }
  case "run": {
    (await import("./ff-interp.ts")).run(Deno.args[1]);
    break;
  }
  case "repl": {
    const { repl } = await import("./repl.ts");
    await repl();
    break;
  }
}

