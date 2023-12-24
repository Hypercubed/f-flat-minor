import { MpZ } from '../mp';
import { BigInt } from '../../node_modules/as-bigint/assembly/BigInt';

const a = '0xFEEBDAEDFEEBDAEDFEEBDAEDFEEBDAEDFEEBDAEDFEEBDAEDFEEBDAEDFEEBDAED';
const b = '0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF';
const mpzA = blackbox(MpZ.from(a));
const mpzB = blackbox(MpZ.from(b));

const bigIntA = blackbox(BigInt.from(a));
const bigIntB = blackbox(BigInt.from(b));

bench('MpZ#mul', () => {
  blackbox(mpzA.mul(mpzB));
});

bench('BigInt#mul', () => {
  blackbox(bigIntA.mul(bigIntB));
});
