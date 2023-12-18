import * as core from './core';

const SHORT = "F♭m";
const LONG = "F♭A𝄫C♭";
const GREETINGS = `Welcome to ${LONG}`;
const PROMPT = `${SHORT}> `;

core.reset();

const silent = process.argv.includes('--silent') || process.argv.includes('-s');

if (!silent) console.log(GREETINGS);
if (!silent) console.log();

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

while (true) {
  const buf = new ArrayBuffer(0x10000);
  
  if (!silent) process.stderr.write(PROMPT);
  const read = process.stdin.read(buf);
  if (read === 0) break;

  const str = String.UTF8.decode(buf.slice(0, read)).trim();

  if (replCommands.has(str)) {
    replCommands.get(str)();
    continue;
  }

  core.run(str);
}