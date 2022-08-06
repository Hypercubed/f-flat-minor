$RecursionLimit = 100000

code = 255

stack = {}
queue = {}
qp = { }

defs = <|
  0 -> nop,
  2 -> putc,
  8 -> drop,
  14 -> qpush,
  15 -> qpull,
  42 -> mul,
  45 -> sub,
  46 -> dump,
  33 -> dup,
  58 -> mark,
  59 -> def,
  62 -> gt,
  63 -> if,
  91 -> bra,
  93 -> ket
|>

NEXT[] := (
  code = code + 1;
  code
)

POP[] := With[{a = Last[stack]},
  stack = Drop[stack, -1];
  a
]

QSHIFT[] := With[{a = First[queue]},
  queue = Drop[queue, 1];
  a
]

IPUSH[x_] := stack = Append[stack, x]
ICALL[x_] := If[x < 0 || x > 255,
    ENQUEUE[ defs[x] ]; RUN[],
    defs[x][]
  ]

PUSH[x_] := If[ Length[qp] > 0,
    ADEF[{ x, 0 }],
    IPUSH[x]
  ]

CALL[x_] := If[ Length[qp] > 0 && x != 58 && x != 59 && x != 91 && x != 93,
    ADEF[{ x, 1 }],
    ICALL[x]
  ]

ENQUEUE[x_] := queue = Join[x, queue];

ADEF[x_] := With[{cqp = Last[qp]},
  defs[cqp] = Join[defs[cqp], x]
]

RUN[] := If[ Length[queue] > 1, 
  qp = {}; LOOP[]
]

LOOP[] := With[{a = QSHIFT[], b = QSHIFT[]},
  If[b == 0,
    IPUSH[a],
    ICALL[a]
  ];
  If[ Length[queue] > 1, LOOP[] ]
]

write[x_] := WriteString["stdout", x];
writesp[x_] := WriteString["stdout", ToString[x] <> " "];

putc[] := write[ FromCharacterCode[ POP[] ] ]

nop[] := With[{}, {}]

dump[] := (
    write["[ "];
    Scan[writesp, stack];
    write["]\n"];
  )

mul[] :=
  With[{a = POP[], b= POP[]},
    IPUSH[a * b]
  ]

sub[] :=
  With[{a = POP[], b = POP[]},
    IPUSH[b - a]
  ]

dup[] :=
  With[{a = POP[]},
    IPUSH[a];
    IPUSH[a]
  ]

qpush[] := (
  queue = Append[ queue, POP[] ]
)

qpull[] := (
  IPUSH[ Last[queue] ];
  queue = Drop[queue, -1]
)

drop[] := POP[]

eval[] := CALL[ POP[] ]

if[] :=
  With[{a = POP[], b = POP[]},
    If[ b != 0, CALL[a] ]
  ]

gt[] :=
  With[{a = POP[], b = POP[]},
    If[ b > a, PUSH[1], PUSH[0] ]
  ]

mark[] := With[{a = POP[]},
  defs[a] = {};
  qp = Append[ qp, a ]
]

def[] := qp = Drop[qp, -1]

bra[] := With[{a = NEXT[]},
  defs[a] = {};
  qp = Append[ qp, a ]
]

ket[] := With[{a = Last[qp]},
  qp = Drop[qp, -1];
  PUSH[a]
]
