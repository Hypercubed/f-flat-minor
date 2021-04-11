#!/usr/bin/env -S deno -q run --allow-net --allow-read

const command = Deno.args[0] || 'repl';

switch (command) {
  case "compile": {
    (await import("./ff2ffb.ts")).compile();
    break;
  }
  case "execute": {
    (await import("./ffb-interp.ts")).execute();
    break;
  }
  case "run": {
    (await import("./ff-interp.ts")).run();
    break;
  }
  case "repl": {
    const { repl } = await import("./repl.ts");
    await repl();
    break;
  }
}

