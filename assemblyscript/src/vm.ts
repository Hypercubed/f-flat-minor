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

function nop(): void { }

function clr(): void {
  stack.splice(0, stack.length);
}

function eval(): void {
  call(pop().toU32());
}

export function dump(): void {
  const s = stack.map((v: MpZ) => v.toString()).join(' ');
  console.log(`[ ${s} ]`);
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
  stack.push(a);
  stack.push(b);
}

function dup(): void {
  stack.push(peek());
}

function add(): void {
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.add(rhs));
}

function sub(): void {
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.sub(rhs));
}

function mul(): void {
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.mul(rhs));
}

function div(): void {
  const rhs = pop();
  const lhs = pop();
  if (rhs.eqz()) {
    state = State.ERROR_DIV_BY_ZERO;
    return;
  }
  stack.push(lhs.div(rhs));
}

function pushr(): void {
  rstack.push(pop());
}

function pullr(): void {
  stack.push(rstack.pop());
}

function when(): void {
  const t = pop();
  if (!pop().eqz()) {
    call(t.toU32());
  }
}

function mark(): void {
  _enqueue++;
  stack.push(MpZ.from(Op.MARK));
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
  stack.push(MpZ.from(code));
  mark();
}

function ket(): void {
  PUSH(_def());
}

function depth(): void {
  stack.push(MpZ.from(stack.length));
}

function gt(): void {
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.cmp(rhs) > 0 ? MpZ.ONE : MpZ.ZERO);
}

function eq(): void {
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.cmp(rhs) === 0 ? MpZ.ONE : MpZ.ZERO);
}

function lt(): void {
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.cmp(rhs) < 0 ? MpZ.ONE : MpZ.ZERO);
}

export function reset(): void {
  stack.splice(0, stack.length);
  rstack.splice(0, rstack.length);

  core_defs.clear();
  user_defs.clear();

  _nextCode = 256;

  core_defs.set(Op.NOP, nop);
  core_defs.set(Op.CALL, eval);
  core_defs.set(Op.PUTC, putc);
  core_defs.set(Op.DROP, drop);
  core_defs.set(Op.PUSHR, pushr);
  core_defs.set(Op.PULLR, pullr);
  core_defs.set(Op.DUP, dup);
  core_defs.set(Op.CLR, clr);
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

export function PUSH(v: MpZ): void {
  if (_enqueue > 0) {
    stack.push(v);
    stack.push(MpZ.ZERO);
  } else {
    stack.push(v);
  }
}

export function CALL(v: u32): void {
  if (_enqueue > 0 && v !== Op.MARK && v !== Op.DEF && v !== Op.BRA && v !== Op.KET) {
    stack.push(MpZ.from(v));
    stack.push(MpZ.ONE);
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
    const op = bc[i].toU32();

    if (op === 0) {
      stack.push(v);
    } else if (op === 1) {
      call(v.toU32());
    } else {
      stack.push(v);
      call(op);
    }

    if (inError()) {
      break;
    }
  }

  state = State.IDLE;
}
