| Mnemonic | Syntax | Stack Effect                         | Op (Ascii)    | Version           |
| -------- | :----: | ------------------------------------ | :-----------: | :---------------: |
| NOP      |  nop   | `… nop == …`                         |   0 (null)    |        F♭m        |
| EVAL     |  eval  | `[A] eval == a*`                     |       1       |        F♭m        |
| PUTC     |  putc  | `n putc == {prints char(n)}`         |       2       |        F♭m        |
| GETC     |  getc  | `getc == n {reads char}`             |       3       |        F♭m        |
| PUTN     |  putn  | `n putn == {prints n}`               |       5       |        F♭m        |
| CLOCK    | clock  | `clock == n {reads clock}`           |       6       |        F♭m        |
| DROP     |  drop  | `a drop ==`                          | 8 (backspace) |        F♭m        |
| PUSHR    |   q<   | `a q< == \| …a`                      |      14       |        F♭m        |
| PULLR    |   q>   | `q> == a \| a…`                      |      15       |        F♭m        |
| SHIFTL   |   <<   | `a b << == n`                        |      16       |        F♭m        |
| SHIFTR   |   >>   | `a b >> == n`                        |      17       |        F♭m        |
| CLR      |  clr   | `… clr ==`                           |      24       |        F♭m        |
| RAND     |  rand  | `n rand == r {0 <= r < n}`           |      26       |        F♭m        |
| EXIT     |  exit  | `n exit == {exits with code n}`      |   27 (ESC)    |        F♭m        |
| DUP      |  dup   | `a dup == a a`                       |    33 (!)     | F♭m<sup>o</sup>   |
| DEPTH    | depth  | `… depth == … n`                     |    35 (#)     |        F♭m        |
| SWAP     |  swap  | `a b swap == b a`                    |    36 ($)     |        F♭m        |
| MOD      |   %    | `a b % == n`                         |    37 (%)     |        F♭m        |
| AND      |   &    | `a b & == n`                         |    38 (&)     |        F♭m        |
| STASH    |   (    | `… ( == {moves stack to queue}`      |    40 (()     |        F♭m        |
| FETCH    |   )    | `) == … {restores stack from queue}` |    41 ())     |        F♭m        |
| MUL      |   \*   | `a b * == n`                         |    42 (\*)    | F♭m<sup>o</sup>   |
| ADD      |   +    | `a b + == n`                         |    43 (+)     | F♭m<sup>o</sup>   |
| SUB      |   -    | `a b - == n`                         |    45 (-)     | F♭m<sup>o</sup>   |
| DUMP     |   .    | `… . == … {prints stack}`            |    46 (.)     | F♭m<sup>o</sup>   |
| DIV      |   /    | `a b / == n`                         |    47 (/)     | F♭m<sup>o</sup>   |
| MARK     |   :    | `n : == {begin definition(n)}`       |    58 (:)     | F♭m<sup>o</sup>   |
| DEF      |   ;    | `; == {end definition}`              |    59 (;)     | F♭m<sup>o</sup>   |
| LT       |   <    | `a b < == flag`                      |    60 (<)     |        F♭m        |
| EQ       |   =    | `a b = == flag`                      |    61 (=)     |        F♭m        |
| GT       |   >    | `a b > == flag`                      |    62 (>)     |        F♭m        |
| WHEN     |   ?    | `flag [A] ? == a*`                   |    63 (?)     | F♭m<sup>o</sup>   |
| BRA      |   [    | `[ == {begin quotation}`             |    91 ([)     |        F♭m        |
| KET      |   ]    | `] == [A] {end quotation}`           |    93 (])     |        F♭m        |
| POW      |   ^    | `a b ^ == n`                         |    94 (^)     |        F♭m        |
| OR       |   \|   | `a b \| == n`                        |   124 (\|)    |        F♭m        |
| NOT      |   ~    | `a ~ == n'`                          |    126 (~)    |        F♭m        |
