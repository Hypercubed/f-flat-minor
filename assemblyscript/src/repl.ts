import * as core from './core';

const SHORT = "F♭m";
const LONG = "F♭A𝄫C♭";
const GREETINGS = `Welcome to ${LONG}`;
const PROMPT = `${SHORT}> `;

core.reset();

const silent = process.argv.includes('--silent') || process.argv.includes('-s');

const replCommands = new Map<string, () => void>();

replCommands.set('.reset', () => {
  core.reset();
  console.log('Reset.');

  console.log(GREETINGS);
  console.log();
});

replCommands.set('.dump', core.dump);
replCommands.set('.peek', () => {
  const v = core.peek();
  process.stdout.write(v.toString() + '\n');
});

if (!silent) {
  console.log(GREETINGS);
  console.log();
}

const CHUNK_SIZE = 0x100000;

function readLine(cb: (s: string) => void): boolean {
  let chunk = '';

  while (true) {
    const buf = new ArrayBuffer(CHUNK_SIZE);
    const read = process.stdin.read(buf);
    if (read === 0) return false;

    chunk += String.UTF8.decode(buf.slice(0, read));
    const lines = chunk.split('\n');
    if (lines.length === 1) continue;

    for (let i = 0; i < lines.length - 1; i++) {
      cb(lines[i]);
    }

    chunk = lines[lines.length - 1];
    
    if (read < CHUNK_SIZE) {
      cb(chunk);
      return true;
    }
  }
}

while (true) {
  if (!silent) process.stderr.write(PROMPT);

  const r = readLine(line => {
    if (replCommands.has(line)) {
      replCommands.get(line)();
      return;
    }
    core.run(line);
  });

  if (!r) break;
}