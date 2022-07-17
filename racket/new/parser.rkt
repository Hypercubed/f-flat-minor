#lang brag

ff-program : (ff-call | ff-push | ff-string | ff-pointer | ff-marker)*

ff-marker : MRKR
ff-pointer : PTR
ff-string : STR

ff-call : CALL
ff-push : PUSH