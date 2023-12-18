import { MpZ } from "./mp";
import { Op } from "./consts";

enum State {
  IDLE,
  RUNNING,
  ERROR_UNDERFLOW,
  ERROR_UNDEFINED,
  ERROR_DIV_BY_ZERO
}

export const stack: MpZ[] = [];
export const rstack: MpZ[] = [];

export const core_defs = new Map<u32, () => void>();
export const user_defs = new Map<u32, MpZ[]>();

let state = State.IDLE;

let _enqueue = 0;
let _nextCode = 256;

export function peek(): MpZ {
  if (stack.length === 0) {
    state = State.ERROR_UNDERFLOW;
    return MpZ.ZERO;
  }
  return stack[stack.length - 1];
}

function pop(): MpZ {
  if (stack.length === 0) {
    state = State.ERROR_UNDERFLOW;
    return MpZ.ZERO;
  }
  return stack.pop();
}

@inline
function push(v: MpZ): void {
  stack.push(v);
}

function poke(v: MpZ): void {
  if (stack.length === 0) {
    state = State.ERROR_UNDERFLOW;
    return;
  }
  stack[stack.length - 1] = v;
}

function call(code: u32): void {
  if (core_defs.has(code)) {
    return core_defs.get(code)();
  }
  if (user_defs.has(code)) {
    return runBC(user_defs.get(code));
  }
  state = State.ERROR_UNDEFINED;
  return;
}

@inline
function nop(): void { }

function clr(): void {
  stack.splice(0, stack.length);
}

function eval(): void {
  call(pop().toU32());
}

export function dump(): void {
  const s = stack.map((v: MpZ) => v.toDecimal()).join(' ');
  process.stdout.write(`[ ${s} ]\n`);
}

function putc(): void {
  process.stdout.write(String.fromCharCode(pop().toU32()));
}

function drop(): void {
  pop();
}

function swap(): void {
  const a = pop();
  const b = pop();
  push(a);
  push(b);
}

function dup(): void {
  push(peek());
}

function add(): void {
  const rhs = pop();
  const lhs = pop();
  push(lhs.add(rhs));
}

function sub(): void {
  const rhs = pop();
  const lhs = pop();
  push(lhs.sub(rhs));
}

function mul(): void {
  const rhs = pop();
  const lhs = pop();
  push(lhs.mul(rhs));
}

function div(): void {
  const rhs = pop();
  const lhs = pop();
  if (rhs.eqz()) {
    state = State.ERROR_DIV_BY_ZERO;
    return;
  }
  push(lhs.div(rhs));
}

function pushr(): void {
  rstack.push(pop());
}

function pullr(): void {
  push(rstack.pop());
}

function when(): void {
  const t = pop();
  if (!pop().eqz()) {
    call(t.toU32());
  }
}

function mark(): void {
  _enqueue++;
  push(MpZ.from(Op.MARK));
}

function _def(): MpZ {
  _enqueue--;
  const def: MpZ[] = [];
  let op = pop();
  let v = pop();

  while (op.toU32() !== Op.MARK) {
    def.unshift(op);
    def.unshift(v);
    op = pop();
    v = pop();
  }

  user_defs.set(v.toU32(), def);

  return v;
}

function def(): void {
  _def();
}

function bra(): void {
  const code = _nextCode++;
  push(MpZ.from(code));
  mark();
}

function ket(): void {
  PUSH(_def());
}

function depth(): void {
  push(MpZ.from(stack.length));
}

function gt(): void {
  const rhs = pop();
  const lhs = pop();
  push(lhs.cmp(rhs) > 0 ? MpZ.ONE : MpZ.ZERO);
}

function eq(): void {
  const rhs = pop();
  const lhs = pop();
  push(lhs.cmp(rhs) === 0 ? MpZ.ONE : MpZ.ZERO);
}

function lt(): void {
  const rhs = pop();
  const lhs = pop();
  push(lhs.cmp(rhs) < 0 ? MpZ.ONE : MpZ.ZERO);
}

function exit(): void {
  const code = pop();
  process.exit(code.toU32());
}

function putn(): void {
  process.stdout.write(pop().toDecimal());
}

export function reset(): void {
  state = State.IDLE;

  stack.splice(0, stack.length);
  rstack.splice(0, rstack.length);

  core_defs.clear();
  user_defs.clear();

  _nextCode = 256;

  core_defs.set(Op.NOP, nop);
  core_defs.set(Op.CALL, eval);
  core_defs.set(Op.PUTC, putc);
  core_defs.set(Op.PUTN, putn);
  core_defs.set(Op.DROP, drop);
  core_defs.set(Op.PUSHR, pushr);
  core_defs.set(Op.PULLR, pullr);
  core_defs.set(Op.DUP, dup);
  core_defs.set(Op.CLR, clr);
  core_defs.set(Op.EXIT, exit);
  core_defs.set(Op.DEPTH, depth);
  core_defs.set(Op.SWAP, swap);
  core_defs.set(Op.MUL, mul);
  core_defs.set(Op.ADD, add);
  core_defs.set(Op.SUB, sub);
  core_defs.set(Op.DUMP, dump);
  core_defs.set(Op.DIV, div);
  core_defs.set(Op.MARK, mark);
  core_defs.set(Op.DEF, def);
  core_defs.set(Op.LT, lt);
  core_defs.set(Op.EQ, eq);
  core_defs.set(Op.GT, gt);
  core_defs.set(Op.WHEN, when);
  core_defs.set(Op.BRA, bra);
  core_defs.set(Op.KET, ket);
}

// interpreter
export function PUSH(v: MpZ): void {
  push(v);

  if (_enqueue > 0) {
    push(MpZ.ZERO);
  }
}

export function CALL(v: u32): void {
  if (_enqueue > 0 && v !== Op.MARK && v !== Op.DEF && v !== Op.BRA && v !== Op.KET) {
    push(MpZ.from(v));
    push(MpZ.ONE);
  } else {
    call(v);
  }
}

export function inError(): bool {
  return state !== State.IDLE && state !== State.RUNNING;
}

export function clearError(): void {
  state = State.IDLE;
}

export function getError(): string {
  switch (state) {
    case State.ERROR_UNDERFLOW:
      return 'Stack underflow';
    case State.ERROR_UNDEFINED:
      return 'Undefined word';
    case State.ERROR_DIV_BY_ZERO:
      return 'Division by zero';
    default:
      return 'Unknown error';
  }
}

function runBC(bc: MpZ[]): void {
  const l = bc.length;

  state = State.RUNNING;

  for (let i = 0; i < l; i++) {
    const v = bc[i++];
    const op = bc[i];

    if (op.eqz()) {
      push(v);
    } else if (op.eq(MpZ.ONE)) {
      call(v.toU32());
    } else {
      push(v);
      call(op.toU32());
    }

    if (inError()) {
      return;
    }
  }

  state = State.IDLE;
}
