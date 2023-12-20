import { readFileSync } from "node:fs";
import { WASI } from "wasi";
import loader from "@assemblyscript/loader";
import t from "tap";

const wasm = readFileSync("./build/src/test-exports.wasm");

let wasi = new WASI({
  version: "preview1",
});

let lib = await loader.instantiate(wasm, wasi.getImportObject());
wasi.start(lib);

let {
  __getString,
  __newString,
  __add,
  __sub,
  __mul,
  __int,
  __cmp,
  __div,
  __pow,
  __collect,
  __fact,
  __factDiv,
  __shl,
  __inv,
} = lib.exports;

const VERBOSE = false;
const N = 100; // number of random iterations

async function reset() {
  wasi = new WASI({
    version: "preview1",
  });

  lib = await loader.instantiate(wasm, wasi.getImportObject());
  wasi.start(lib);

  __getString = lib.exports.__getString;
  __newString = lib.exports.__newString;
  __add = lib.exports.__add;
  __sub = lib.exports.__sub;
  __mul = lib.exports.__mul;
  __int = lib.exports.__int;
  __cmp = lib.exports.__cmp;
  __div = lib.exports.__div;
  __collect = lib.exports.__collect;
  __fact = lib.exports.__fact;
  __factDiv = lib.exports.__factDiv;
  __shl = lib.exports.__shl;
  __inv = lib.exports.__inv;
  __pow = lib.exports.__pow;
}

const int = (a) => {
  const r = __getString(__int(__newString(String(a))));
  __collect();
  if (VERBOSE) console.log(`int(${a}) = ${r}`);
  return r;
};

const add = (a, b) => {
  let r;
  try {
    r = __getString(__add(__newString(String(a)), __newString(String(b))));
    __collect();
  } catch (e) {
    console.error(`Error: add(${a}, ${b}) = ${r}`, e);
    return `Error: add(${a}, ${b}) = ${r}`;
  }
  if (VERBOSE) console.log(`add(${a}, ${b}) = ${r}`);
  return r;
};

const sub = (a, b) => {
  let r;
  try {
    r = __getString(__sub(__newString(String(a)), __newString(String(b))));
    __collect();
  } catch (e) {
    console.error(`Error: sub(${a}, ${b}) = ${r}`, e);
    return `Error: sub(${a}, ${b}) = ${r}`;
  }
  if (VERBOSE) console.log(`sub(${a}, ${b}) = ${r}`);
  return r;
};

const mul = (a, b) => {
  let r;
  try {
    r = __getString(__mul(__newString(String(a)), __newString(String(b))));
    __collect();
  } catch (e) {
    console.error(`Error: mul(${a}, ${b}) = ${r}`, e);
    return `Error: mul(${a}, ${b}) = ${r}`;
  }
  if (VERBOSE) console.log(`mul(${a}, ${b}) = ${r}`);
  return r;
};

const div = (a, b) => {
  let r;
  try {
    r = __getString(__div(__newString(String(a)), __newString(String(b))));
    __collect();
  } catch (e) {
    console.error(`Error: div(${a}, ${b}) = ${r}`, e);
    return `Error: div(${a}, ${b}) = ${r}`;
  }
  if (VERBOSE) console.log(`div(${a}, ${b}) = ${r}`);
  return r;
};

const pow = (a, b) => {
  let r;
  try {
    r = __getString(__pow(__newString(String(a)), __newString(String(b))));
    __collect();
  } catch (e) {
    console.error(`Error: div(${a}, ${b}) = ${r}`, e);
    return `Error: div(${a}, ${b}) = ${r}`;
  }
  if (VERBOSE) console.log(`div(${a}, ${b}) = ${r}`);
  return r;
};

const cmp = (a, b) => {
  let r;
  try {
    r = __cmp(__newString(String(a)), __newString(String(b)));
    __collect();
  } catch (e) {
    console.error(`Error: cmp(${a}, ${b}) = ${r}`, e);
    return `Error: cmp(${a}, ${b}) = ${r}`;
  }
  if (VERBOSE) console.log(`cmp(${a}, ${b}) = ${r}`);
  return r;
};

const shl = (a, b) => {
  let r = __getString(__shl(__newString(String(a)), b));
  __collect();
  if (VERBOSE) console.log(`shl(${a}, ${b}) = ${r}`);
  return r;
};

const inv = (a, b) => {
  let r = __getString(__inv(__newString(String(a)), b));
  __collect();
  if (VERBOSE) console.log(`shl(${a}, ${b}) = ${r}`);
  return r;
};

const fact = (a) => {
  const r = __getString(__fact(a));
  __collect();
  if (VERBOSE) console.log(`fact(${a}) = ${r}`);
  return r;
};

const factDiv = (a, b) => {
  const r = __getString(__factDiv(a, b));
  __collect();
  if (VERBOSE) console.log(`fact(${a}) = ${r}`);
  return r;
};

function toHex(a) {
  if (typeof a !== "string") a = a.toString(16);

  a = a.toUpperCase();
  if (a.startsWith("-")) {
    return "-0x" + a.slice(1);
  }
  return "0x" + a;
}

function random() {
  const limbs = Math.floor(32 * Math.random());
  return new Uint32Array(limbs)
    .reduce((a, _, k) => {
      const p = 2n**BigInt(k * 32);
      const l = BigInt(Math.floor(Math.random() * Math.pow(2, 32)));
      return a + l*p;
    }, 0n);
}

t.beforeEach(async () => {
  await reset();
});

t.test("create", (t) => {
  t.test("convert strings to mp integers", (t) => {
    t.same(int(0), 0);
    t.same(int(0x3), 3);
    t.same(int(0xdeadbeef), 0xdeadbeef);
    t.same(int(3735928559), 0xdeadbeef);
    t.same(int(0xdeadbeefdeadbeefn), 0xdeadbeefdeadbeefn);
    t.same(
      int(0xdeadbeefdeadbeefdeadbeefdeadbeefn),
      0xdeadbeefdeadbeefdeadbeefdeadbeefn
    );

    t.same(int(-0x3), "-0x3");
    t.same(int(-0xdeadbeef), "-0xDEADBEEF");
    t.same(int(-3735928559), "-0xDEADBEEF");
    t.same(int(-0xdeadbeefdeadbeefn), "-0xDEADBEEFDEADBEEF");
    t.same(
      int(-0xdeadbeefdeadbeefdeadbeefdeadbeefn),
      "-0xDEADBEEFDEADBEEFDEADBEEFDEADBEEF"
    );

    t.same(
      int(3735928559373592855937359285593735928559n),
      3735928559373592855937359285593735928559n
    );

    t.end();
  });

  t.test("convert random strings to mp integers", async (t) => {
    for (let i = 1; i < N; i++) {
      __collect();
      t.same(int(i), "0x" + i.toString(16).toUpperCase());
      t.same(int(-i), "-0x" + i.toString(16).toUpperCase());

      const n = random();
      t.same(int(n), toHex(n));
      t.same(int(-n), toHex(-n));

      const m = random();
      const v = n + m * 2n ** 53n;
      t.same(int(v), toHex(v));
      t.same(int(-v), toHex(-v));
    }
    t.end();
  });

  t.end();
});

t.test("addition", (t) => {
  t.test("positive", (t) => {
    t.same(add(0, 0), 0);
    t.same(add(0x3, 0x5), 8);
    t.same(add(0xdead0000, 0x0000beef), 0xdeadbeef);
    t.same(add(0x00000000deadbeefn, 0xdeadbeef00000000n), 0xdeadbeefdeadbeefn);

    t.same(add(2950793089775236n, 2160715205785584n), 0x1228e3c4392e74n);
    t.same(add(403105631078710n, 3402969886132728n), 3806075517211438n);
    t.end();
  });

  t.test("negitive (rhs<0)", (t) => {
    t.same(add(0x8, -0x3), 5);
    t.same(add(0x3, -0x8), "-0x5"); // BUG in subtraction
    t.same(add(0xdeadbeef, -0x0000beef), 0xdead0000);
    t.end();
  });

  t.test("negitive (lhs<0, rhs<0)", (t) => {
    t.same(add(-0x8, -0x3), "-0xB");
    t.same(add(-0x3, -0x8), "-0xB");
    t.same(add(-0xdead0000, -0x0000beef), "-0xDEADBEEF");
    t.end();
  });

  t.test("addition random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      const m = random();
      t.same(add(n, m), toHex(n + m));
      t.same(add(-n, m), toHex(-n + m));
      t.same(add(n, -m), toHex(n + -m));
      t.same(add(-n, -m), toHex(-n + -m));
    }
    t.end();
  });

  t.end();
});

t.test("subtraction", (t) => {
  t.test("lhs>rhs>0", (t) => {
    t.same(sub(0x8, 0x5), 0x3);
    t.same(sub(0xdead0000, 0x0000beef), 0xdeac4111);
    t.same(sub(0xdeadbeef, 0xbeef), 0xdead0000);
    t.same(sub(0xdeadbeefdeadbeefn, 0xdeadbeef00000000n), 0xdeadbeefn);
    t.end();
  });

  t.test("rhs>lhs>0)", (t) => {
    t.same(sub(0x5, 0x8), "-0x3");
    t.end();
  });

  t.test("rhs<0, |lhs|>|rhs|", (t) => {
    t.same(sub(0x8, -0x3), "0xB");
    t.same(sub(0xdead0000, -0x0000beef), 0xdeadbeef);
    __collect();
    t.same(sub(2779068574725052, -2776491312893844), 0x13bcc095a14350n);
    t.end();
  });

  t.test("rhs<0, |rhs|>|lhs|", (t) => {
    t.same(sub(0x3, -0x8), "0xB");
    t.end();
  });

  t.test("lhs<rhs<0", (t) => {
    t.same(sub("-0x8", "-0x3"), "-0x5");
    t.same(sub(-0x3, -0x8), "0x5");
    t.same(sub(-0xdeadbeef, -0x0000beef), "-0xDEAD0000");
    t.end();
  });

  t.test("rhs<lhs<0", (t) => {
    t.same(sub(-0x3, -0x8), "0x5");
    t.end();
  });

  t.test("random", async (t) => {
    for (let i = 0; i < N; i++) {
      let n = random();
      let m = random();

      // lhs>0 rhs>0
      t.same(sub(n, m), toHex(n - m));

      // rhs<0
      t.same(sub(n, -m), toHex(n - -m));

      // lhs<0
      t.same(sub(-n, m), toHex(-n - m));

      // lhs<0 rhs<0
      t.same(sub(-n, -m), toHex(-n - -m));
    }
    t.end();
  });

  t.end();
});

t.test("multiplication", (t) => {
  t.test("n>0, m>0", (t) => {
    t.same(mul(0x0, 0x0), 0);
    t.same(mul(0x1, 0x1), 1);
    t.same(mul(0x10, 0x10), 0x100);
    t.same(mul(0xffff, 0xffff), 0xfffe0001n);
    t.same(mul(0xffffffff, 0xffffffff), 0xfffffffe00000001n);

    t.same(
      mul(
        "0x2E75F2AA067132A276C13262E7268D7CECC8190A00000",
        "0x35F29E388C20BFBAC4964BFBA000"
      ),
      "0x9CA7373A70FFDE7FC610FC43850F3BB95922DD391B0C36B388502F72F5F8A74400000000"
    );

    t.end();
  });

  t.test("n<0, m<0", (t) => {
    t.same(mul(-0x10, -0x10), 0x100);
    t.same(mul(-0xffff, -0xffff), 0xfffe0001n);
    t.same(mul(-0xffffffff, -0xffffffff), 0xfffffffe00000001n);
    t.end();
  });

  t.test("n>0, m<0", (t) => {
    t.same(mul(0x10, -0x10), "-0x100");
    t.same(mul(0xffff, -0xffff), "-0xFFFE0001");
    t.same(mul(0xffffffff, -0xffffffff), "-0xFFFFFFFE00000001");
    t.end();
  });

  t.test("n<0, m>0", (t) => {
    t.same(mul(-0x10, 0x10), "-0x100");
    t.same(mul(-0xffff, 0xffff), "-0xFFFE0001");
    t.same(mul(-0xffffffff, 0xffffffff), "-0xFFFFFFFE00000001");
    t.end();
  });

  t.test("multiplication random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      const m = random();
      const v = n * m;
      t.same(mul(n, m), toHex(v));
      __collect();
      t.same(mul(-n, -m), toHex(v));
      __collect();
      t.same(mul(n, -m), toHex(-v));
      __collect();
      t.same(mul(-n, m), toHex(-v));
      __collect();
    }
  });

  t.end();
});

t.test("division", (t) => {
  t.test("m=1", (t) => {
    t.same(div(0x1, 0x1), 1);
    t.same(div(0x2, 0x1), 2);
    t.same(div(0x4, 0x1), 4);
    t.end();
  });

  t.test("m=0", (t) => {
    t.same(div(0x1, 0x0), "Error: div(1, 0) = undefined");
    t.end();
  });

  t.test("n<m", (t) => {
    t.same(div(0x2, 0x4), 0);
    t.same(div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFFF"), 0);
    t.end();
  });

  t.test("n=m", (t) => {
    t.same(div(0x2, 0x2), 1);
    t.same(div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFF"), 1);
    t.end();
  });

  t.test("1<m<0xFFFFFFFF, 1<n<0xFFFFFFFF", (t) => {
    t.same(div(0x2, 0x2), 1);
    t.same(div(0x4, 0x2), 2);
    t.same(div(0x8, 0x2), 4);

    t.same(div(0xbeef, 16), 0xbee);
    t.same(div(0x1000, 0x10), 0x100);
    t.same(div(0x10000000, 0x10), 0x1000000);
    t.same(div("0xDEADBEEF", 16), 0xdeadbee);
    t.same(div("0xDEADBEEF", 0x100), 0xdeadbe);
    t.same(div("0xDEADBEEF", 0x10000000), 0xd);
    t.same(div("0xFFFFFFFF", 0xf), 0x11111111);
    t.same(div("0xFFFFFFFF", 0xffffffff), 0x1);
    t.same(div("0xFFFFFFFF", 0xfffffff), 0x10);

    t.end();
  });

  t.test("n>0xFFFFFFFF, 1<m<0xFFFFFFFF", (t) => {
    t.same(div("0xDEADBEEFDEADBEEF", 0x1), "0xDEADBEEFDEADBEEF");
    t.same(div("0xDEADBEEFDEADBEEF", 0x10), "0xDEADBEEFDEADBEE");
    t.same(div("0xDEADBEEFDEADBEEF", 0x100), "0xDEADBEEFDEADBE");
    t.same(div("0xFFFFFFFFFFFFFFFF", 0xf), "0x1111111111111111");
    t.same(div("0xFFFFFFFFFFFFFFFF", 0xffffffff), "0x100000001");
    t.same(div("0xFFFFFFFFFFFFFFFF", 0xfffffff), "0x1000000100");
    t.end();
  });

  t.test("n>m>0xFFFFFFFF", (t) => {
    t.same(div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFF"), 0x10);
    t.same(div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFF"), 0x1000);

    t.same(div("0xFFFFFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFFFFF"), 0x10);
    t.same(div("0xFFFFFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFFF"), 0x1000);

    t.same(
      div("0xDEADBEEFDEADBEEF00000000", "0xDEADBEEFDEADBEEF0000"),
      0x10000
    );

    t.end();
  });

  t.test("division random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      let m = random();
      if (m === 0n) m++;

      const v = n / m;
      t.same(div(n, m), toHex(v));
      t.same(div(-n, -m), toHex(v));
      t.same(div(-n, m), toHex(-v));
      t.same(div(n, -m), toHex(-v));
    }
  });

  t.end();
});

t.test("inverse", t => {
  t.same(inv(0x1, 0), 1);
  t.same(inv(0x1, 16), 2**16);
  t.same(inv(0x1, 32), 2**32);
  t.same(inv(0x1, 64), 2**64);
0
  t.same(inv(0x3, 32), 0x55555555);
  t.same(inv(0xBEEF, 32), 0x1573D);
  t.same(inv(0xDEADBEEF, 64), 0x1264EB565);

  t.same(inv('0xDEADBEEFDEADBEEF', 64), 0x1);

  for (let i = 0; i < N; i++) {
    let n = random();
    if (n === 0n) n++;

    t.same(inv(n, 8), 2n**8n/n);
    t.same(inv(n, 16), 2n**16n/n);
    t.same(inv(n, 32), 2n**32n/n);
    t.same(inv(n, 64), 2n**64n/n);
  }

  t.end();
});

t.test("cmp", async (t) => {
  t.test("n>0, m>0", (t) => {
    t.equal(cmp(0x0, 0x0), 0);
    t.equal(cmp(0x3, 0x1), 1);
    t.equal(cmp(0x1, 0x3), -1);

    t.equal(cmp(0x3, 0x3), 0);
    t.equal(cmp(0x3, 0x5), -1);
    t.equal(cmp(0x5, 0x3), 1);

    t.equal(cmp(0xdead0000, 0x0000beef), 1);
    t.equal(cmp(0x0000beef, 0xdead0000), -1);
    t.end();
  });

  t.test("n<0, m<0", (t) => {
    t.equal(cmp(-0x3, 0x1), -1);
    t.equal(cmp(-0x1, 0x3), -1);

    t.equal(cmp(-0x3, -0x3), 0);
    t.equal(cmp(-0x3, -0x5), 1);
    t.equal(cmp(-0x5, -0x3), -1);

    t.equal(cmp(-0xdead0000, -0x0000beef), -1);
    t.equal(cmp(-0x0000beef, -0xdead0000), 1);

    t.end();
  });

  t.test("n>0, m<0", (t) => {
    t.equal(cmp(0x3, -0x1), 1);
    t.equal(cmp(0x1, -0x3), 1);

    t.equal(cmp(0x3, -0x3), 1);
    t.equal(cmp(0x3, -0x5), 1);
    t.equal(cmp(0x5, -0x3), 1);

    t.equal(cmp(0xdead0000, -0x0000beef), 1);
    t.equal(cmp(0x0000beef, -0xdead0000), 1);

    t.end();
  });

  t.test("n<0, m>0", (t) => {
    t.equal(cmp(-0x3, 0x1), -1);
    t.equal(cmp(-0x1, 0x3), -1);

    t.equal(cmp(-0x3, 0x3), -1);
    t.equal(cmp(-0x3, 0x5), -1);
    t.equal(cmp(-0x5, 0x3), -1);

    t.equal(cmp(-0xdead0000, 0x0000beef), -1);
    t.equal(cmp(-0x0000beef, 0xdead0000), -1);

    t.end();
  });

  t.test("random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      const m = random();
      t.equal(cmp(n, m), n > m ? 1 : n < m ? -1 : 0);
      t.equal(cmp(-n, -m), n > m ? -1 : n < m ? 1 : 0);
    }
    t.end();
  });
  t.end();
});

t.test("factorials", (t) => {
  t.same(fact(0), "0x1");
  t.same(fact(10), 3628800);
  t.same(
    fact(100),
    "0x1B30964EC395DC24069528D54BBDA40D16E966EF9A70EB21B5B2943A321CDF10391745570CCA9420C6ECB3B72ED2EE8B02EA2735C61A000000000000000000000000"
  );

  t.same(factDiv(0, 0), "0x1");
  t.same(factDiv(100, 99), 100);
  t.same(factDiv(1000, 999), 1000);

  t.end();
});

t.test("shl", (t) => {
  t.same(shl(0x1, 1), "0x2");
  t.same(shl("0xDEADBEEF", 1), 0x1bd5b7dde);
  t.same(shl("0xDEADBEEF", 8), "0xDEADBEEF00");
  t.same(shl("0xDEADBEEF", 32), "0xDEADBEEF00000000");
  t.same(shl("0xDEADBEEF", 64), "0xDEADBEEF0000000000000000");
  t.end();
});

t.test("pow", t => {
  t.same(pow(0x1, 1), "0x2");
});