import { MpZ } from '@hypercubed/as-mpz/assembly/mp';

import { reset, PUSH, CALL } from './vm';
import { Op } from './consts';

reset();

@inline
const FACT = u32(-1);

PUSH(MpZ.from(FACT));
CALL(Op.MARK);
CALL(Op.DUP);
PUSH(MpZ.ONE);
CALL(Op.SUB);
CALL(Op.BRA);
CALL(Op.DUP);
PUSH(MpZ.ONE);
CALL(Op.SUB);
CALL(FACT);
CALL(Op.MUL);
CALL(Op.KET);
CALL(Op.WHEN);
CALL(Op.DEF);

PUSH(MpZ.from(100));
CALL(FACT);
CALL(Op.DUMP);
