import { readFileSync } from 'node:fs';
import { WASI } from 'wasi';
import loader from '@assemblyscript/loader';
import t from 'tap';

const wasm = readFileSync('./build/src/test-exports.wasm');
let lib;

let __getString;
let __newString;
let __add;
let __sub;
let __mul;
let __int;
let __cmp;

const VERBOSE = false;
const N = 100; // number of random iterations

const int = (a) => {
  const r = __getString(__int(__newString(String(a))));
  if (VERBOSE) console.log(`int(${a}) = ${r}`);
  return r;
};

const add = (a, b) => {
  let r;
  try {
    r = __getString(__add(__newString(String(a)), __newString(String(b))));
  } catch (e) {
    console.error(`Error: add(${a}, ${b}) = ${r}`, e);
    return `Error: add(${a}, ${b}) = ${r}\n  ${e}`;
  }
  if (VERBOSE) console.log(`add(${a}, ${b}) = ${r}`);
  return r;
};

const sub = (a, b) => {
  let r;
  try {
    r = __getString(__sub(__newString(String(a)), __newString(String(b))));
  } catch (e) {
    console.error(`Error: sub(${a}, ${b}) = ${r}`, e);
    return `Error: sub(${a}, ${b}) = ${r}\n`;
  }
  if (VERBOSE) console.log(`sub(${a}, ${b}) = ${r}`);
  return r;
}

const mul = (a, b) => {
  const r = __getString(__mul(__newString(String(a)), __newString(String(b))));
  if (VERBOSE) console.log(`mul(${a}, ${b}) = ${r}`);
  return r;
};

const cmp = (a, b) => {
  let r;
  try {
    r = __cmp(__newString(String(a)), __newString(String(b)));
  } catch (e) {
    console.error(`Error: cmp(${a}, ${b}) = ${r}`, e);
    return `Error: cmp(${a}, ${b}) = ${r}\n  ${e}`;
  }
  if (VERBOSE) console.log(`cmp(${a}, ${b}) = ${r}`);
  return r;
};

async function reset() {
  const wasi = new WASI({
    version: 'preview1'
  });

  lib = await loader.instantiate(
    wasm,
    wasi.getImportObject()
  );
  wasi.start(lib);

  __getString = lib.exports.__getString;
  __newString = lib.exports.__newString;
  __add = lib.exports.add;
  __sub = lib.exports.sub;
  __mul = lib.exports.mul;
  __int = lib.exports.int;
  __cmp = lib.exports.cmp;
}

function toHex(a) {
  if (typeof a !== 'string') a = a.toString(16);

  a = a.toUpperCase();
  if (a.startsWith('-')) {
    return '-0x' + a.slice(1);
  }
  return '0x' + a;
}

t.beforeEach(async () => {
  await reset();
});

t.test('create', t=> {
  t.test('convert strings to mp integers', t => {
    t.same(int(0), 0);
    t.same(int(0x3), 3);
    t.same(int(0xDEADBEEF), 0xDEADBEEF);
    t.same(int(3735928559), 0xDEADBEEF);
    t.same(int(0xDEADBEEFDEADBEEFn), 0xDEADBEEFDEADBEEFn);
    t.same(int(0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFn), 0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFn);
    
    t.same(int(-0x3), '-0x3');
    t.same(int(-0xDEADBEEF), '-0xDEADBEEF');
    t.same(int(-3735928559), '-0xDEADBEEF');
    t.same(int(-0xDEADBEEFDEADBEEFn), '-0xDEADBEEFDEADBEEF');
    t.same(int(-0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFn), '-0xDEADBEEFDEADBEEFDEADBEEFDEADBEEF');
    
    t.same(int(3735928559373592855937359285593735928559n), 3735928559373592855937359285593735928559n);
  
    t.end();
  });
  
  t.test('convert random strings to mp integers', async t => {
    for (let i = 1; i < N; i++) {
      await reset(); // keep memory usage low
      t.same(int(i), '0x' + i.toString(16).toUpperCase());
      t.same(int(-i), '-0x' + i.toString(16).toUpperCase());
    
      const n = BigInt(Math.random() * Math.pow(2,53));
      t.same(int(n), toHex(n));
      t.same(int(-n), toHex(-n));
    
      const m = BigInt(Math.random() * Math.pow(2,53));
      const v = n + m * 2n**53n;
      t.same(int(v), toHex(v));
      t.same(int(-v), toHex(-v));
    }
    t.end();
  });

  t.end();
});

t.test('addition', t => {
  t.test('positive', t => {
    t.same(add(0, 0), 0);
    t.same(add(0x3, 0x5), 8);
    t.same(add(0xDEAD0000, 0x0000BEEF), 0xDEADBEEF);
    t.same(add(0x00000000DEADBEEFn, 0xDEADBEEF00000000n), 0xDEADBEEFDEADBEEFn);
  
    t.same(add(2950793089775236n, 2160715205785584n), 0x1228e3c4392e74n);
    t.same(add(403105631078710n, 3402969886132728n), 3806075517211438n);
    t.end();
  });

  t.test('negitive (rhs<0)', t => {
    t.same(add(0x8, -0x3), 5);
    t.same(add(0x3, -0x8), '-0x5');  // BUG in subtraction
    t.same(add(0xDEADBEEF, -0x0000BEEF), 0xDEAD0000);
    t.end();
  });

  t.test('negitive (lhs<0, rhs<0)', t => {
    t.same(add(-0x8, -0x3), '-0xB');
    t.same(add(-0x3, -0x8), '-0xB');
    t.same(add(-0xDEAD0000, -0x0000BEEF), '-0xDEADBEEF');
    t.end();
  });
  
  t.test('addition random', async t => {
    for (let i = 0; i < N; i++) {
      const n = BigInt(Math.random() * Math.pow(2,53));
      const m = BigInt(Math.random() * Math.pow(2,53));
      t.same(add(n, m), toHex(n + m));
      await reset(); // keep memory usage low
      t.same(add(-n, m), toHex(-n + m));
      await reset(); // keep memory usage low
      t.same(add(n, -m), toHex(n + -m));
      await reset(); // keep memory usage low
      t.same(add(-n, -m), toHex(-n + -m));
      await reset(); // keep memory usage low
    }
    t.end();
  });

  t.end();
});

t.test('subtraction', t => {
  t.test('lhs>rhs>0', t => {
    t.same(sub(0x8, 0x5), 0x3);
    t.same(sub(0xDEAD0000, 0x0000BEEF), 0xDEAC4111);
    t.same(sub(0xDEADBEEF, 0xBEEF), 0xDEAD0000);
    t.same(sub(0xDEADBEEFDEADBEEFn, 0xDEADBEEF00000000n), 0xDEADBEEFn);
    t.end();
  });

  t.test('rhs>lhs>0)', t => {
    t.same(sub(0x5, 0x8), '-0x3');
    t.end();
  });

  t.test('rhs<0, |lhs|>|rhs|', t => {
    t.same(sub(0x8, -0x3), '0xB');
    t.same(sub(0xDEAD0000, -0x0000BEEF), 0xDEADBEEF);
    t.same( sub(2779068574725052, -2776491312893844), 0x13BCC095A14350n)
    t.end();
  });

  t.test('rhs<0, |rhs|>|lhs|', t => {
    t.same(sub(0x3, -0x8), '0xB');
    t.end();
  });

  t.test('lhs<rhs<0', t => {
    t.same(sub('-0x8', '-0x3'), '-0x5');
    t.same(sub(-0x3, -0x8), '0x5');
    t.same(sub(-0xDEADBEEF, -0x0000BEEF), '-0xDEAD0000');
    t.end();
  });

  t.test('rhs<lhs<0', t => {
    t.same(sub(-0x3, -0x8), '0x5');
    t.end();
  });
  
  t.test('random', async t => {
    for (let i = 0; i < N; i++) {
      
      let n = BigInt(Math.random() * Math.pow(2,53));
      let m = BigInt(Math.random() * Math.pow(2,53));
      
      // lhs>0 rhs>0
      t.same(sub(n, m), toHex(n - m));
      await reset(); // keep memory usage low

      // rhs<0
      t.same(sub(n, -m), toHex(n - -m));
      await reset(); // keep memory usage low

      // lhs<0
      t.same(sub(-n, m), toHex(-n - m));
      await reset(); // keep memory usage low

      // lhs<0 rhs<0
      t.same(sub(-n, -m), toHex(-n - -m));
      await reset(); // keep memory usage low
    }
    t.end();
  });

  t.end();
});

t.test('multiplication', t => {
  t.test('n>0, m>0', t => {
    t.same(mul(0x0, 0x0), 0);
    t.same(mul(0x1, 0x1), 1);
    t.same(mul(0x10, 0x10), 0x100);
    t.same(mul(0xFFFF, 0xFFFF), 0xFFFE0001n);
    t.same(mul(0xFFFFFFFF, 0xFFFFFFFF), 0xFFFFFFFE00000001n);
    t.end();
  });

  t.test('n<0, m<0', t => {
    t.same(mul(-0x10, -0x10), 0x100);
    t.same(mul(-0xFFFF, -0xFFFF), 0xFFFE0001n);
    t.same(mul(-0xFFFFFFFF, -0xFFFFFFFF), 0xFFFFFFFE00000001n);
    t.end();
  });

  t.test('n>0, m<0', t => {
    t.same(mul(0x10, -0x10), '-0x100');
    t.same(mul(0xFFFF, -0xFFFF), '-0xFFFE0001');
    t.same(mul(0xFFFFFFFF, -0xFFFFFFFF), '-0xFFFFFFFE00000001');
    t.end();
  });

  t.test('n<0, m>0', t => {
    t.same(mul(-0x10, 0x10), '-0x100');
    t.same(mul(-0xFFFF, 0xFFFF), '-0xFFFE0001');
    t.same(mul(-0xFFFFFFFF, 0xFFFFFFFF), '-0xFFFFFFFE00000001');
    t.end();
  });
  
  t.test('multiplication random', async t => {
    for (let i = 0; i < N; i++) {
      const n = BigInt(Math.random() * Math.pow(2,53));
      const m = BigInt(Math.random() * Math.pow(2,53));
      const r = toHex(n*m);
      t.same(mul(n, m), r);
      await reset(); // keep memory usage low
      t.same(mul(-n, -m), r);
      await reset(); // keep memory usage low
      t.same(mul(n, -m), `-${r}`);
      await reset(); // keep memory usage low
      t.same(mul(-n, m), `-${r}`);
      await reset(); // keep memory usage low
    }
  });

  t.end();
});

t.test('cmp', async t => {
  t.test('n>0, m>0', t => {
    t.equal(cmp(0x0, 0x0), 0);
    t.equal(cmp(0x3, 0x1), 1);
    t.equal(cmp(0x1, 0x3), -1);

    t.equal(cmp(0x3, 0x3), 0);
    t.equal(cmp(0x3, 0x5), -1);
    t.equal(cmp(0x5, 0x3), 1);

    t.equal(cmp(0xDEAD0000, 0x0000BEEF), 1);
    t.equal(cmp(0x0000BEEF, 0xDEAD0000), -1);
    t.end();
  });

  t.test('n<0, m<0', t => {
    t.equal(cmp(-0x3, 0x1), -1);
    t.equal(cmp(-0x1, 0x3), -1);

    t.equal(cmp(-0x3, -0x3), 0);
    t.equal(cmp(-0x3, -0x5), 1);
    t.equal(cmp(-0x5, -0x3), -1);

    t.equal(cmp(-0xDEAD0000, -0x0000BEEF), -1);
    t.equal(cmp(-0x0000BEEF, -0xDEAD0000), 1);

    t.end();
  });

  t.test('n>0, m<0', t => {
    t.equal(cmp(0x3, -0x1), 1);
    t.equal(cmp(0x1, -0x3), 1);

    t.equal(cmp(0x3, -0x3), 1);
    t.equal(cmp(0x3, -0x5), 1);
    t.equal(cmp(0x5, -0x3), 1);

    t.equal(cmp(0xDEAD0000, -0x0000BEEF), 1);
    t.equal(cmp(0x0000BEEF, -0xDEAD0000), 1);

    t.end();
  });

  t.test('n<0, m>0', t => {
    t.equal(cmp(-0x3, 0x1), -1);
    t.equal(cmp(-0x1, 0x3), -1);

    t.equal(cmp(-0x3, 0x3), -1);
    t.equal(cmp(-0x3, 0x5), -1);
    t.equal(cmp(-0x5, 0x3), -1);

    t.equal(cmp(-0xDEAD0000, 0x0000BEEF), -1);
    t.equal(cmp(-0x0000BEEF, 0xDEAD0000), -1);

    t.end();
  });

  t.test('random', async t => {
    for (let i = 0; i < N; i++) {
      const n = BigInt(Math.random() * Math.pow(2,53));
      const m = BigInt(Math.random() * Math.pow(2,53));
      t.equal(cmp(n, m), n > m ? 1 : n < m ? -1 : 0);
      t.equal(cmp(-n, -m), n > m ? -1 : n < m ? 1 : 0);
      await reset(); // keep memory usage low
    }
    t.end();
  });
  t.end();
});
