import { MpZ } from "../src/mp";
import { assertEquals } from "../src/assert";

function fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

// toString(16)
assertEquals(MpZ.from(0xFF).toString(16), "0xFF");
assertEquals(MpZ.from(-0xFF).toString(16), "-0xFF");

assertEquals(MpZ.from(0xFFFF).toString(16), "0xFFFF");
assertEquals(MpZ.from(-0xFFFF).toString(16), "-0xFFFF");

assertEquals(MpZ.from(0xDEADBEEF).toString(16), "0xDEADBEEF");
assertEquals(MpZ.from(i64(-0xDEADBEEF)).toString(16), "-0xDEADBEEF");

assertEquals(MpZ.from('0xDEADBEEFDEADBEEF').toString(16), "0xDEADBEEFDEADBEEF");
assertEquals(MpZ.from('-0xDEADBEEFDEADBEEF').toString(16), "-0xDEADBEEFDEADBEEF");

// toString(10)
assertEquals(MpZ.from('0xDEADBEEF').toString(10), "3735928559");
assertEquals(MpZ.from('-0xDEADBEEF').toString(10), "-3735928559");

assertEquals(MpZ.from(10).pow(10).toString(10), "10000000000");

const f = fact(100).toDecimal();
assertEquals(f.slice(0, 10), '9332621544');
assertEquals(f.slice(-10), '0000000000');

const p = MpZ.from(5).pow(MpZ.from(4).pow(3).pow(2).pow(1)).toDecimal();
assertEquals(p.slice(0, 10), '9574977460');
assertEquals(p.slice(-10), '8212890625');
