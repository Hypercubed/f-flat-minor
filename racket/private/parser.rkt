#lang brag

ff-program : (ff-call | ff-push | ff-string | ff-string-dq | ff-marker | ff-bra | ff-ket)*

ff-marker : MRKR
ff-string : STR
ff-string-dq : STR-DQ
ff-bra : BRA
ff-ket : KET

ff-call : CALL
ff-push : PUSH