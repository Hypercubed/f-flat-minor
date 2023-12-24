import { MpZ } from '../mp';
import { BigInt } from 'as-bigint/assembly/BigInt';

const a = 300;
const b = 200;
const mpzA = blackbox(MpZ.from(a));

const bigIntA = blackbox(BigInt.from(a));

bench('MpZ#pow', () => {
  blackbox(mpzA.pow(b));
});

bench('BigInt#pow', () => {
  blackbox(bigIntA.pow(b));
});
