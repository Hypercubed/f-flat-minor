#!/usr/bin/env wolframscript

<< ./src/engine.wls

(* Generated IR from example.ff *)

CALL @ 0    (* NOP factorial *)
PUSH @ -1   (* FACT *)
CALL @ 58   (* : *)
CALL @ 33   (* DUP *)
PUSH @ 1
CALL @ 62   (* > *)
CALL @ 91   (* [ *)
CALL @ 33   (* DUP *)
PUSH @ 1
CALL @ 45   (* - *)
CALL @ -1   (* FACT *)
CALL @ 42   (* * *)
CALL @ 93   (* ] *)
CALL @ 63   (* ? *)
CALL @ 59   (* ; *)
CALL @ 0    (* NOP string printing *)
PUSH @ -2   (* (PRINTS) *)
CALL @ 58   (* : *)
CALL @ 33   (* DUP *)
CALL @ 91   (* [ *)
CALL @ 14   (* Q< *)
CALL @ -2   (* (PRINTS) *)
CALL @ 15   (* Q> *)
CALL @ 2    (* PUTC *)
CALL @ 93   (* ] *)
CALL @ 63   (* ? *)
CALL @ 59   (* ; *)
PUSH @ -3   (* PRINTS *)
CALL @ 58   (* : *)
CALL @ -2   (* (PRINTS) *)
CALL @ 8    (* DROP *)
CALL @ 59
PUSH @ 0
PUSH @ 70   (* F *)
PUSH @ 97   (* a *)
PUSH @ 99   (* c *)
PUSH @ 116  (* t *)
PUSH @ 111  (* o *)
PUSH @ 114  (* r *)
PUSH @ 105  (* i *)
PUSH @ 97   (* a *)
PUSH @ 108  (* l *)
PUSH @ 32
PUSH @ 49   (* 1 *)
PUSH @ 48   (* 0 *)
PUSH @ 48   (* 0 *)
PUSH @ 58   (* : *)
PUSH @ 10
CALL @ -3   (* PRINTS *)
PUSH @ 100
CALL @ -1   (* FACT *)
CALL @ 46   (* . *)