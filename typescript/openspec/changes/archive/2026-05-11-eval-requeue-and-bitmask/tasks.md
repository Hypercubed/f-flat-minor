## 1. FastQueue Bitmask

- [x] 1.1 Add `private _mask: number` field to `FastQueue`, initialized to `initialCapacity - 1`
- [x] 1.2 Update `expand()` to recompute `this._mask = newCapacity - 1`
- [x] 1.3 Replace all `% this.buffer.length` with `& this._mask` in `pushArray`, `unshiftArray`, `shift`, `pop`, and `get`

## 2. Eval Re-enqueue

- [x] 2.1 Change the CALL opcode in `engine.ts` `setup()` from `this.callOp(x)` to `this.queueUnshift(Q_CALL, x)`

## 3. Verification

- [x] 3.1 Run `euler14.ffp` and compare output and timing against baseline (~51s)
- [x] 3.2 Run the full test suite: `mise exec -- chomp test:deno`
