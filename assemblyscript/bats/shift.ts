import { MpZ } from "../src/mp";

function shl(a: MpZ, b: u32): void {
  process.stdout.write(`${a} << ${b} = ${a << b}\n`);
}

function shr(a: MpZ, b: u32): void {
  process.stdout.write(`${a} >> ${b} = ${a >> b}\n`);
}

shl(MpZ.from("0x1"), 1);
shl(MpZ.from("0x1234567890ABCDEF"), 0);
shl(MpZ.from("0x1234567890ABCDEF"), 4);
shl(MpZ.from("0x1234567890ABCDEF"), 8);
shl(MpZ.from("0x1234567890ABCDEF"), 32);
shl(MpZ.from("0x1234567890ABCDEF"), 64);
shl(MpZ.from("0x1234567890ABCDEF"), 128);

shr(MpZ.from("0x2"), 1);
shr(MpZ.from("0x1234567890ABCDEF"), 0);
shr(MpZ.from("0x1234567890ABCDEF"), 4);
shr(MpZ.from("0x1234567890ABCDEF"), 8);
shr(MpZ.from("0x1234567890ABCDEF"), 32);
shr(MpZ.from("0x1234567890ABCDEF"), 64);

shr(MpZ.from("0x1234567890ABCDEF00000000000000000000000000000000"), 0);
shr(MpZ.from("0x1234567890ABCDEF00000000000000000000000000000000"), 4);
shr(MpZ.from("0x1234567890ABCDEF00000000000000000000000000000000"), 8);
shr(MpZ.from("0x1234567890ABCDEF00000000000000000000000000000000"), 32);
shr(MpZ.from("0x1234567890ABCDEF00000000000000000000000000000000"), 64);
shr(MpZ.from("0x1234567890ABCDEF00000000000000000000000000000000"), 128);
