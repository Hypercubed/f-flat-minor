import { MpInt } from "../src/mp";

process.stdout.write(`0xFF = ${MpInt.from(0xFF)}\n`);
process.stdout.write(`-0xFF = ${MpInt.from(-0xFF)}\n`);

process.stdout.write(`0xFFFF = ${MpInt.from(0xFFFF)}\n`);
process.stdout.write(`0xDEADBEEF = ${MpInt.from(0xDEADBEEF)}\n`);

process.stdout.write(`0xDEADBEEFDEADBEEF = ${MpInt.from(u64(0xDEADBEEFDEADBEEF))}\n`);
process.stdout.write(`-0xDEADBEEF = ${MpInt.from(i64(-0xDEADBEEF))}\n`);