import 'xterm/css/xterm.css';

import type { Instance } from '@wasmer/sdk';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { Wasmer, init } from '@wasmer/sdk';

const encoder = new TextEncoder();

async function main() {
  await init();
  // initializeLogger("debug");

  const term = new Terminal({ cursorBlink: true, convertEol: true });
  const fit = new FitAddon();
  term.loadAddon(fit);

  term.open(document.getElementById('terminal'));
  fit.fit();

  const pkg = await Wasmer.fromRegistry('hypercubed/f-flat-minor');

  const instance = await pkg.entrypoint.run();
  connectStreams(instance, term);
}

function connectStreams(instance: Instance, term: Terminal) {
  const stdin = instance.stdin.getWriter();
  term.onData((data) => stdin?.write(encoder.encode(data)));
  instance.stdout.pipeTo(
    new WritableStream({ write: (chunk) => term.write(chunk) }),
  );
  instance.stderr.pipeTo(
    new WritableStream({ write: (chunk) => term.write(chunk) }),
  );
}

main();
