import * as core from './core';

core.reset();

while (true) {
  const buf = new ArrayBuffer(1024);
  const read = process.stdin.read(buf);
  if (read === 0) break;

  const str = String.UTF8.decode(buf.slice(0, read)).trim();
  core.run(str);
}