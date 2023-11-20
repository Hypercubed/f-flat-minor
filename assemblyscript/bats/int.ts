import { MpZ } from "../src/mp";

process.stdout.write(`0xFF = ${MpZ.from(0xFF)}\n`);
process.stdout.write(`-0xFF = ${MpZ.from(-0xFF)}\n`);

process.stdout.write(`0xFFFF = ${MpZ.from(0xFFFF)}\n`);
process.stdout.write(`0xDEADBEEF = ${MpZ.from(0xDEADBEEF)}\n`);

process.stdout.write(`0xDEADBEEFDEADBEEF = ${MpZ.from(u64(0xDEADBEEFDEADBEEF))}\n`);
process.stdout.write(`-0xDEADBEEF = ${MpZ.from(i64(-0xDEADBEEF))}\n`);