(module
  #include ./include/wasi.wat
  #include ./include/core.wat

  #define PUSH (call $PUSH (i64.const #1))
  #define CALL (call $CALL (i32.const #1))

  ;; THE PROGRAM

  (func $main (export "_start")

    ;; #define FACT -2
    
    #PUSH(#FACT)       ;; &FACT
    #CALL(#OP_MARK)   ;; :
    #CALL(#OP_DUP)    ;; DUP
    #PUSH(1)        ;; 1
    #CALL(#OP_SUB)    ;; SUB
      #CALL(#OP_BRA)  ;; [
      #CALL(#OP_DUP)  ;; DUP
      #PUSH(1)      ;; 1
      #CALL(#OP_SUB)  ;; SUB
      #CALL(#FACT)     ;; FACT
      #CALL(#OP_MUL)  ;; MUL
      #CALL(#OP_KET)  ;; ]
    #CALL(#OP_WHEN)   ;; ?
    #CALL(#OP_DEF)    ;; ;

    #define PRINTI -3

    #PUSH(#PRINTI)       ;; &(prints)
    #CALL(#OP_MARK)   ;; :
    #CALL(#OP_DUP)    ;; DUP
      #CALL(#OP_BRA)  ;; [
      #PUSH(#PRINTI)     ;; (prints)
      #CALL(#OP_DIP)  ;; DIP
      #CALL(#OP_PUTC) ;; PUTC
      #CALL(#OP_KET)  ;; ]
    #CALL(#OP_WHEN)   ;; ?
    #CALL(#OP_DEF)    ;; ;

    ;; #define PRINTS -4

    #PUSH(#PRINTS)       ;; &prints
    #CALL(#OP_MARK)   ;; :
    #CALL(#PRINTI)       ;; (prints)
    #CALL(#OP_DROP)   ;; DROP
    #CALL(#OP_DEF)    ;; ;

    #PUSH(0)        ;; 0
    #PUSH(70)       ;; F
    #PUSH(97)       ;; a
    #PUSH(99)       ;; c
    #PUSH(116)      ;; t
    #PUSH(111)      ;; o
    #PUSH(114)      ;; r
    #PUSH(105)      ;; i
    #PUSH(97)       ;; a
    #PUSH(108)      ;; l
    #PUSH(32)       ;; 32
    #PUSH(49)       ;; 1
    #PUSH(48)       ;; 0
    #PUSH(58)       ;; :
    #PUSH(10)       ;; 10
    #CALL(-4)       ;; prints

    #PUSH(20)       ;; 20
    #CALL(#FACT)       ;; FACT
    #CALL(#OP_DUMP)   ;; .

    ;; (call $prints #FF_ERROR)
  )
)