import { MpZ } from '../mp';
const input = blackbox(MpZ.from('0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF'));

bench("toDecimal", () => {
    blackbox(input.toDecimal());
});

bench("toHex", () => {
    blackbox(input.toHex());
});
