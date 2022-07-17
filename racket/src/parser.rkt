#lang brag

ff-program : (ff-call | ff-push | ff-string | ff-marker)*

ff-marker : MRKR
ff-string : STR

ff-call : CALL
ff-push : PUSH