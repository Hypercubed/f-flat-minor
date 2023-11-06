const fs = require('fs');
const WASI = require('wasi');

const wasmBuffer = fs.readFileSync('./build/interpret.wasm');

const mod = new WebAssembly.Module(wasmBuffer);

const wasi = new WASI({});

const inst = new WebAssembly.Instance(mod, {
  wasi_unstable: wasi.exports
});
wasi.setMemory(inst.exports.memory);

const { PUSH, CALL } = inst.exports;

const Op = {
  NOP: 0,
  CALL: 1,
  PUTC: 2,
  PUTN: 5,
  DROP: 8,
  DIP: 30,
  DUP: "!".charCodeAt(0),
  DEPTH: "#".charCodeAt(0),
  SWAP: "$".charCodeAt(0),
  MUL: "*".charCodeAt(0),
  ADD: "+".charCodeAt(0),
  SUB: "-".charCodeAt(0),
  DUMP: ".".charCodeAt(0),
  DIV: "/".charCodeAt(0),
  MARK: ":".charCodeAt(0),
  DEF: ";".charCodeAt(0),
  WHEN: "?".charCodeAt(0),
  BRA: "[".charCodeAt(0),
  KET: "]".charCodeAt(0)
}

// PUSH   -1         ; FACT
// CALL   58         ; :
// CALL   33         ; DUP
// PUSH   1
// CALL   45         ; -
// CALL   91         ; [
// CALL   33         ; DUP
// PUSH   1
// CALL   45         ; -
// CALL   -1         ; FACT
// CALL   42         ; *
// CALL   93         ; ]
// CALL   63         ; ?
// CALL   59         ; ;
// PUSH   20
// CALL   -1         ; FACT
// CALL   46         ; .

PUSH(-1n);
CALL(Op.MARK);
CALL(Op.DUP);
PUSH(1n);
CALL(Op.SUB);
CALL(Op.BRA);
CALL(Op.DUP);
PUSH(1n);
CALL(Op.SUB);
CALL(-1);
CALL(Op.MUL);
CALL(Op.KET);
CALL(Op.WHEN);
CALL(Op.DEF);

PUSH(20n);
CALL(-1);
CALL(Op.DUMP);
