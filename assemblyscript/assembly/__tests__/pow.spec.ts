import { MpZ } from "../mp";
import { assertSame } from "./assertions";

describe('pow', () => {
  it('retrun correct results', () => {
    assertSame(MpZ.from(0x0) ** MpZ.from(0x1), '0x0');
    assertSame(MpZ.from(0x1) ** MpZ.from(0x1), '0x1');
    assertSame(MpZ.from(0xDEADBEEF) ** MpZ.ONE, '0xDEADBEEF');
    
    assertSame(MpZ.from(0x0) ** MpZ.from(0x2), '0x0');
    assertSame(MpZ.from(0x1) ** MpZ.from(0x2), '0x1');
    assertSame(MpZ.from(0xDEADBEEF) ** MpZ.from(0x2), '0xC1B1CD12216DA321');
    
    assertSame(MpZ.from(5).pow(4).pow(3).pow(2).pow(1), '0xD3C21BCECCEDA1');
    
    const p = (MpZ.from(5) ** MpZ.from(4) ** MpZ.from(3) ** MpZ.from(2) ** MpZ.from(1)).toString();
    assertSame(p.substring(0, 10), '0xB75B3786');
    assertSame(p.substring(p.length - 10), '4899F00001');
  });
});

