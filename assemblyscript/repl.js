import repl from 'node:repl';
import createPlugin from "@extism/extism";

let plugin;

async function start() {
  const plugin = await createPlugin("./build/src/plugin.wasm", { useWasi: true });
  await plugin.call("_start");
  return plugin
}

async function myEval(cmd, _ctx, _fn, callback) {
  try {
    await plugin.call("run", cmd + " .");
  } catch (e) {
    console.error(e);
    plugin = await start();
  } finally {
    callback();
  }
}

plugin = await start();
repl.start({ prompt: '> ', eval: myEval });