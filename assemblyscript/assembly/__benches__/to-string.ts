import { MpZ } from '../mp';
import { BigInt } from '../../node_modules/as-bigint/assembly/BigInt';

const s = '0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF';
const mpz = blackbox(MpZ.from(s));
const bigInt = blackbox(BigInt.from(s));

bench('MpZ#toDecimal', () => {
  blackbox(mpz.toDecimal());
});

bench('MpZ#toHex', () => {
  blackbox(mpz.toHex());
});

bench('BigInt#toString()', () => {
  blackbox(bigInt.toString());
});

bench('BigInt#toString(16)', () => {
  blackbox(bigInt.toString(16));
});
