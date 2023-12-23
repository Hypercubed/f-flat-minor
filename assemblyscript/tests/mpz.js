import { readFileSync } from "node:fs";
import t from "tap";
import { instantiate } from "../build/src/mp-exports.js";
import { WASI } from "wasi";

let wasi = new WASI({
  version: "preview1",
});

const wasm = readFileSync("./build/src/mp-exports.wasm");
const module = await WebAssembly.compile(wasm);

let exports = await instantiate(module, wasi.getImportObject());

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

const N = 100; // number of random iterations

t.beforeEach(async () => {
  const module = await WebAssembly.compile(wasm);
  exports = await instantiate(module, wasi.getImportObject());
});

t.test("toString", (t) => {
  t.test("convert strings to mp integers", (t) => {
    t.equal(exports.int('0'), '0x0');
    t.equal(exports.int('3'), '0x3');
    t.equal(exports.int('0xdeadbeef'), '0xDEADBEEF');
    t.equal(exports.int('3735928559'), '0xDEADBEEF');
    t.equal(exports.int('0xdeadbeefdeadbeef'), '0xDEADBEEFDEADBEEF');
    t.equal(
      exports.int('0xdeadbeefdeadbeefdeadbeefdeadbeef'),
      '0xDEADBEEFDEADBEEFDEADBEEFDEADBEEF'
    );

    t.equal(exports.int('-0x3'), "-0x3");
    t.equal(exports.int('-0xdeadbeef'), "-0xDEADBEEF");
    t.equal(exports.int('-3735928559'), "-0xDEADBEEF");
    t.equal(exports.int('-0xdeadbeefdeadbeef'), "-0xDEADBEEFDEADBEEF");
    t.equal(
      exports.int('-0xdeadbeefdeadbeefdeadbeefdeadbeef'),
      "-0xDEADBEEFDEADBEEFDEADBEEFDEADBEEF"
    );

    t.equal(
      exports.int('3735928559373592855937359285593735928559'),
      toHex(3735928559373592855937359285593735928559n)
    );

    t.end();
  });

  t.test("convert random strings to mp integers", async (t) => {
    for (let i = 1; i < N; i++) {
      t.equal(exports.int(String(i)), toHex(i));
      t.equal(exports.int(String(-i)), toHex(-i));

      const n = random();
      t.equal(exports.int(String(n)), toHex(n));
      t.equal(exports.int(String(-n)), toHex(-n));

      const m = random();
      const v = n + m * 2n ** 53n;
      t.equal(exports.int(String(v)), toHex(v));
      t.equal(exports.int(String(-v)), toHex(-v));
    }
    t.end();
  });

  t.end();
});

t.test("addition", (t) => {
  t.test("positive", (t) => {
    t.same(exports.add(0, 0), 0);
    t.same(exports.add('0x3', '0x5'), 8);
    t.same(exports.add('0xdead0000', '0x0000beef'), 0xdeadbeef);
    t.same(exports.add('0x00000000deadbeef', '0xdeadbeef00000000'), 0xdeadbeefdeadbeefn);

    t.same(exports.add('2950793089775236', '2160715205785584'), 0x1228e3c4392e74n);
    t.same(exports.add('403105631078710', '3402969886132728'), 3806075517211438n);
    t.end();
  });

  t.test("negitive (rhs<0)", (t) => {
    t.same(exports.add('0x8', '-0x3'), 5);
    t.same(exports.add('0x3', '-0x8'), "-0x5");
    t.same(exports.add('0xdeadbeef', '-0x0000beef'), 0xdead0000);
    t.end();
  });

  t.test("negitive (lhs<0, rhs<0)", (t) => {
    t.same(exports.add('-0x8', '-0x3'), '-0xB');
    t.same(exports.add('-0x3', '-0x8'), '-0xB');
    t.same(exports.add('-0xdead0000', '-0x0000beef'), '-0xDEADBEEF');
    t.end();
  });

  t.test("addition random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      const m = random();
      t.same(exports.add(String(n), String(m)), toHex(n + m));
      t.same(exports.add(String(-n), String(m)), toHex(-n + m));
      t.same(exports.add(String(n), String(-m)), toHex(n + -m));
      t.same(exports.add(String(-n), String(-m)), toHex(-n + -m));
    }
    t.end();
  });

  t.end();
});

t.test("subtraction", (t) => {
  t.test("lhs>rhs>0", (t) => {
    t.same(exports.sub('0x8', '0x5'), 0x3);
    t.same(exports.sub('0xdead0000', '0x0000beef'), 0xdeac4111);
    t.same(exports.sub('0xdeadbeef', '0xbeef'), 0xdead0000);
    t.same(exports.sub('0xdeadbeefdeadbeef', '0xdeadbeef00000000'), 0xdeadbeefn);
    t.end();
  });

  t.test("rhs>lhs>0)", (t) => {
    t.same(exports.sub('0x5', '0x8'), "-0x3");
    t.end();
  });

  t.test("rhs<0, |lhs|>|rhs|", (t) => {
    t.same(exports.sub('0x8', '-0x3'), "0xB");
    t.same(exports.sub('0xdead0000', '-0x0000beef'), 0xdeadbeef);
    t.same(exports.sub('2779068574725052', '-2776491312893844'), 0x13bcc095a14350n);
    t.end();
  });

  t.test("rhs<0, |rhs|>|lhs|", (t) => {
    t.same(exports.sub('0x3', '-0x8'), "0xB");
    t.end();
  });

  t.test("lhs<rhs<0", (t) => {
    t.same(exports.sub("-0x8", "-0x3"), "-0x5");
    t.same(exports.sub('-0x3', '-0x8'), "0x5");
    t.same(exports.sub('-0xdeadbeef', '-0x0000beef'), "-0xDEAD0000");
    t.end();
  });

  t.test("rhs<lhs<0", (t) => {
    t.same(exports.sub('-0x3', '-0x8'), "0x5");
    t.end();
  });

  t.test("random", async (t) => {
    for (let i = 0; i < N; i++) {
      let n = random();
      let m = random();

      // lhs>0 rhs>0
      t.same(exports.sub(String(n), String(m)), toHex(n - m));

      // rhs<0
      t.same(exports.sub(String(n), String(-m)), toHex(n - -m));

      // lhs<0
      t.same(exports.sub(String(-n), String(m)), toHex(-n - m));

      // lhs<0 rhs<0
      t.same(exports.sub(String(-n), String(-m)), toHex(-n - -m));
    }
    t.end();
  });

  t.end();
});

t.test("multiplication", (t) => {
  t.test("n>0, m>0", (t) => {
    t.same(exports.mul('0x0', '0x0'), 0);
    t.same(exports.mul('0x1', '0x1'), 1);
    t.same(exports.mul('0x10', '0x10'), 0x100);
    t.same(exports.mul('0xffff', '0xffff'), 0xfffe0001n);
    t.same(exports.mul('0xffffffff', '0xffffffff'), 0xfffffffe00000001n);

    t.same(
      exports.mul(
        "0x2E75F2AA067132A276C13262E7268D7CECC8190A00000",
        "0x35F29E388C20BFBAC4964BFBA000"
      ),
      "0x9CA7373A70FFDE7FC610FC43850F3BB95922DD391B0C36B388502F72F5F8A74400000000"
    );

    t.end();
  });

  t.test("n<0, m<0", (t) => {
    t.same(exports.mul('-0x10', '-0x10'), 0x100);
    t.same(exports.mul('-0xffff', '-0xffff'), 0xfffe0001n);
    t.same(exports.mul('-0xffffffff', '-0xffffffff'), 0xfffffffe00000001n);
    t.end();
  });

  t.test("n>0, m<0", (t) => {
    t.same(exports.mul('0x10', '-0x10'), "-0x100");
    t.same(exports.mul('0xffff', '-0xffff'), "-0xFFFE0001");
    t.same(exports.mul('0xffffffff', '-0xffffffff'), "-0xFFFFFFFE00000001");
    t.end();
  });

  t.test("n<0, m>0", (t) => {
    t.same(exports.mul('-0x10', '0x10'), "-0x100");
    t.same(exports.mul('-0xffff', '0xffff'), "-0xFFFE0001");
    t.same(exports.mul('-0xffffffff', '0xffffffff'), "-0xFFFFFFFE00000001");
    t.end();
  });

  t.test("multiplication random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      const m = random();
      const v = n * m;
      t.same(exports.mul(String(n), String(m)), toHex(v));
      t.same(exports.mul(String(-n), String(-m)), toHex(v));
      t.same(exports.mul(String(n), String(-m)), toHex(-v));
      t.same(exports.mul(String(-n), String(m)), toHex(-v));
    }
  });

  t.end();
});

t.test("division", (t) => {
  t.test("m=1", (t) => {
    t.same(exports.div('0x1', '0x1'), 1);
    t.same(exports.div('0x2', '0x1'), 2);
    t.same(exports.div('0x4', '0x1'), 4);
    t.end();
  });

  // t.test("m=0", (t) => {
  //   t.same(exports.div('0x1', '0x0'), "Error: div(1, 0) = undefined");
  //   t.end();
  // });

  t.test("n<m", (t) => {
    t.same(exports.div('0x2', '0x4'), 0);
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFFF"), 0);
    t.end();
  });

  t.test("n=m", (t) => {
    t.same(exports.div('0x2', '0x2'), 1);
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFF"), 1);
    t.end();
  });

  t.test("1<m<0xFFFFFFFF, 1<n<0xFFFFFFFF", (t) => {
    t.same(exports.div('0x2', '0x2'), 1);
    t.same(exports.div('0x4', '0x2'), 2);
    t.same(exports.div('0x8', '0x2'), 4);

    t.same(exports.div('0xbeef', '16'), 0xbee);
    t.same(exports.div('0x1000', '0x10'), 0x100);
    t.same(exports.div('0x10000000', '0x10'), 0x1000000);
    t.same(exports.div("0xDEADBEEF", '16'), 0xdeadbee);
    t.same(exports.div("0xDEADBEEF", '0x100'), 0xdeadbe);
    t.same(exports.div("0xDEADBEEF", '0x10000000'), 0xd);
    t.same(exports.div("0xFFFFFFFF", '0xf'), 0x11111111);
    t.same(exports.div("0xFFFFFFFF", '0xffffffff'), 0x1);
    t.same(exports.div("0xFFFFFFFF", '0xfffffff'), 0x10);

    t.end();
  });

  t.test("n>0xFFFFFFFF, 1<m<0xFFFFFFFF", (t) => {
    t.same(exports.div("0xDEADBEEFDEADBEEF", '0x1'), "0xDEADBEEFDEADBEEF");
    t.same(exports.div("0xDEADBEEFDEADBEEF", '0x10'), "0xDEADBEEFDEADBEE");
    t.same(exports.div("0xDEADBEEFDEADBEEF", '0x100'), "0xDEADBEEFDEADBE");
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", '0xf'), "0x1111111111111111");
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", '0xffffffff'), "0x100000001");
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", '0xfffffff'), "0x1000000100");
    t.end();
  });

  t.test("n>m>0xFFFFFFFF", (t) => {
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFF"), 0x10);
    t.same(exports.div("0xFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFF"), 0x1000);

    t.same(exports.div("0xFFFFFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFFFFF"), 0x10);
    t.same(exports.div("0xFFFFFFFFFFFFFFFFFFFF", "0xFFFFFFFFFFFFFFFFF"), 0x1000);

    t.same(
      exports.div("0xDEADBEEFDEADBEEF00000000", "0xDEADBEEFDEADBEEF0000"),
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
      t.same(exports.div(String(n), String(m)), toHex(v));
      t.same(exports.div(String(-n), String(-m)), toHex(v));
      t.same(exports.div(String(-n), String(m)), toHex(-v));
      t.same(exports.div(String(n), String(-m)), toHex(-v));
    }
  });

  t.end();
});

t.test("inverse", t => {
  t.same(exports.inv('0x1', 0), 1);
  t.same(exports.inv('0x1', 16), 2**16);
  t.same(exports.inv('0x1', 32), 2**32);
  t.same(exports.inv('0x1', 64), 2**64);

  t.same(exports.inv('0x3', 32), 0x55555555);
  t.same(exports.inv('0xBEEF', 32), 0x1573D);
  t.same(exports.inv('0xDEADBEEF', 64), 0x1264EB565);

  t.same(exports.inv('0xDEADBEEFDEADBEEF', 64), 0x1);

  for (let i = 0; i < N; i++) {
    let n = random();
    if (n === 0n) n++;

    t.same(exports.inv(String(n), 8), 2n**8n/n);
    t.same(exports.inv(String(n), 16), 2n**16n/n);
    t.same(exports.inv(String(n), 32), 2n**32n/n);
    t.same(exports.inv(String(n), 64), 2n**64n/n);
  }

  t.end();
});

t.test("cmp", async (t) => {
  t.test("n>0, m>0", (t) => {
    t.equal(exports.cmp('0x0', '0x0'), 0);
    t.equal(exports.cmp('0x3', '0x1'), 1);
    t.equal(exports.cmp('0x1', '0x3'), -1);

    t.equal(exports.cmp('0x3', '0x3'), 0);
    t.equal(exports.cmp('0x3', '0x5'), -1);
    t.equal(exports.cmp('0x5', '0x3'), 1);

    t.equal(exports.cmp('0xdead0000', '0x0000beef'), 1);
    t.equal(exports.cmp('0x0000beef', '0xdead0000'), -1);
    t.end();
  });

  t.test("n<0, m<0", (t) => {
    t.equal(exports.cmp('-0x3', '0x1'), -1);
    t.equal(exports.cmp('-0x1', '0x3'), -1);

    t.equal(exports.cmp('-0x3', '-0x3'), 0);
    t.equal(exports.cmp('-0x3', '-0x5'), 1);
    t.equal(exports.cmp('-0x5', '-0x3'), -1);

    t.equal(exports.cmp('-0xdead0000', '-0x0000beef'), -1);
    t.equal(exports.cmp('-0x0000beef', '-0xdead0000'), 1);

    t.end();
  });

  t.test("n>0, m<0", (t) => {
    t.equal(exports.cmp('0x3', '-0x1'), 1);
    t.equal(exports.cmp('0x1', '-0x3'), 1);

    t.equal(exports.cmp('0x3', '-0x3'), 1);
    t.equal(exports.cmp('0x3', '-0x5'), 1);
    t.equal(exports.cmp('0x5', '-0x3'), 1);

    t.equal(exports.cmp('0xdead0000', '-0x0000beef'), 1);
    t.equal(exports.cmp('0x0000beef', '-0xdead0000'), 1);

    t.end();
  });

  t.test("n<0, m>0", (t) => {
    t.equal(exports.cmp('-0x3', '0x1'), -1);
    t.equal(exports.cmp('-0x1', '0x3'), -1);

    t.equal(exports.cmp('-0x3', '0x3'), -1);
    t.equal(exports.cmp('-0x3', '0x5'), -1);
    t.equal(exports.cmp('-0x5', '0x3'), -1);

    t.equal(exports.cmp('-0xdead0000', '0x0000beef'), -1);
    t.equal(exports.cmp('-0x0000beef', '0xdead0000'), -1);

    t.end();
  });

  t.test("random", async (t) => {
    for (let i = 0; i < N; i++) {
      const n = random();
      const m = random();
      t.equal(exports.cmp(String(n), String(m)), n > m ? 1 : n < m ? -1 : 0);
      t.equal(exports.cmp(String(-n), String(-m)), n > m ? -1 : n < m ? 1 : 0);
    }
    t.end();
  });
  t.end();
});

t.test("shl", (t) => {
  t.same(exports.shl('0x1', 1), "0x2");
  t.same(exports.shl("0xDEADBEEF", 1), 0x1bd5b7dde);
  t.same(exports.shl("0xDEADBEEF", 8), "0xDEADBEEF00");
  t.same(exports.shl("0xDEADBEEF", 32), "0xDEADBEEF00000000");
  t.same(exports.shl("0xDEADBEEF", 64), "0xDEADBEEF0000000000000000");
  t.end();
});

t.test("pow", t => {
  t.same(exports.pow('1', '1'), "0x1");
  t.same(exports.pow('1', '2'), "0x1");
  t.same(exports.pow('2', '2'), "0x4");
  t.same(exports.pow("0xDEADBEEF", '1'), "0xDEADBEEF");
  t.end();
});

t.test("factorials", (t) => {
  t.same(exports.fact('0'), "0x1");
  t.same(exports.fact('10'), 3628800);
  t.same(
    exports.fact('100'),
    "0x1B30964EC395DC24069528D54BBDA40D16E966EF9A70EB21B5B2943A321CDF10391745570CCA9420C6ECB3B72ED2EE8B02EA2735C61A000000000000000000000000"
  );

  t.same(exports.factDiv('0', '0'), "0x1");
  t.same(exports.factDiv('100', '99'), 100);
  t.same(exports.factDiv('1000', '999'), 1000);

  t.end();
});

t.end();