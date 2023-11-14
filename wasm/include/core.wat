;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; f-flat-minor (WASM)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  #define STACK_TOP 30000
  #define STACK_ELEMENT_SIZE 8
  #define STACK_OFFSET 29992
  
  ;; MEMORY

  ;; Declare linear memory and export it to host.
  (memory (export "memory") 0x640)

  ;; **** MEMORY LAYOUT ****
  ;; 0 - 8 - string pointers for io vectors
  ;; 100 - String Constants
  ;; 1000 - Definition Base
  ;; 10000 - Dictionary Base
  ;; 30000 - Stack Base

  ;; STRINGS

  (data (i32.const 120) "\09" "FF Error:")
  #define FF_ERROR (i32.const 120)

  (data (i32.const 130) "\0F" "Stack underflow")
  #define UNDERFLOW_ERROR (i32.const 130)

  (data (i32.const 146) "\17" "Cannot nest definitions")
  #define NEST_ERROR (i32.const 146)

  (data (i32.const 170) "\17" "Undefined function call")
  #define UNDEFINED_FUNCTION (i32.const 170)

  (func $logError (param $base i32)
    (call $prints #FF_ERROR)
    (call $i32.emit (i32.const #CHAR_SPACE))
    (call $log (local.get $base))
  )

  ;; THE DICTIONARY
  (global $dict_pointer (mut i32) (i32.const 10000))  ;; Dictionary pointer
  (global $def_pointer (mut i32) (i32.const 1000))  ;; Definition pointer

  ;; Converts a definition id to a location in the def pointer
  (func $lookupRuntimeDef (param $n i32) (result i32)
    local.get $n
    i32.const 1
    i32.add
    i32.const -4
    i32.mul
  )

  (func $dict_get (param $dict_pointer i32) (result i64 i32)
    (local.get $dict_pointer)
    i64.load ;; value

    (local.get $dict_pointer)
    (i64.load offset=8)  ;; operation
    i32.wrap_i64
  )

  ;; move the stack, starting at the mark on the stack to end od stack, to the dictionary
  (func $moveStackToDict
    (param $dst i32)
    (local $src i32)
    (local $size i32)
    (local $sp i32)

    (global.get $stack_pointer)
    local.set $sp

    call $backtrackToLastMarkOnStack

    (i32.add (i32.const 16) (global.get $stack_pointer))
    local.set $src

    (i32.sub (local.get $sp) (local.get $src))
    local.set $size

    (i32.add (local.get $src) (i32.const #STACK_TOP))
    (local.set $src)

    (memory.copy
      (local.get $dst)
      (local.get $src)
      (local.get $size)
    )

    (i32.add (local.get $size) (global.get $dict_pointer))
    (global.set $dict_pointer)
  )

  (func $call (param $n i32)
    ;; compile time user definition
    (i32.lt_s (local.get $n) (i32.const 0))
    if
      (call $lookupRuntimeDef (local.get $n))

      (i32.load offset=1000)
      (local.tee $n)
      (i32.eqz)
      if
        (call $logError #UNDEFINED_FUNCTION)
        unreachable
      end


      (call $run (local.get $n))
      return
    end

    ;; internal definition
    (i32.le_s (local.get $n) (i32.const 256))
    if
      (call_indirect (type $f) (local.get $n))
      return
    end

    ;; run time user definition
    (call $run (local.get $n))
  )

  ;; THE STACK
  (global $stack_pointer (mut i32) (i32.const 0))  ;; Stack pointer (offset 30000)

  #define CALL_INC (global.set $stack_pointer (i32.add (global.get $stack_pointer) (i32.const 8)))
  #define CALL_DEC (global.set $stack_pointer (i32.sub (global.get $stack_pointer) (i32.const 8)))

  (func $push (param $v i64)
    #CALL_INC
    local.get $v
    call $poke
  )

  (func $pop
    (result i64)
    call $peek
    #CALL_DEC
  )
  
  (func $peek
    (result i64)

    (i32.lt_u (global.get $stack_pointer) (i32.const #STACK_ELEMENT_SIZE))
    if
      (call $logError #UNDERFLOW_ERROR)
      unreachable
    end

    (i64.load offset=#STACK_OFFSET
      (global.get $stack_pointer)
    )
  )

  (func $peekn
    (param $n i32)
    (result i64)

    (i32.lt_u (local.get $n) (i32.const 0))
    if
      (call $logError #UNDERFLOW_ERROR)
      unreachable
    end

    (i64.load offset=#STACK_TOP ;; Top of stack
      (local.get $n )        
    )
  )

  (func $poke (param $n i64)
    (i32.lt_u (global.get $stack_pointer) (i32.const 0))
    if
      (call $logError #UNDERFLOW_ERROR)
      unreachable
    end

    (i64.store offset=#STACK_OFFSET ;; Top of stack - 8
      (global.get $stack_pointer)
      (local.get $n)
    )
  )

  (func $len
    (result i32)
    (global.get $stack_pointer)
    (i32.const #STACK_ELEMENT_SIZE)
    i32.div_u
  )

  ;; INTERNAL CORE DEFINITIONS

  #define OP_NOP 0
  #define OP_EVAL 1
  #define OP_PUTC 2
  #define OP_PUTN 5
  #define OP_DROP 8
  #define OP_DIP 30
  #define OP_DUP 33
  #define OP_DEPTH 35
  #define OP_SWAP 36
  #define OP_MUL 42
  #define OP_ADD 43
  #define OP_SUB 45
  #define OP_DUMP 46
  #define OP_DIV 47
  #define OP_MARK 58
  #define OP_DEF 59
  #define OP_WHEN 63
  #define OP_BRA 91
  #define OP_KET 93

  (type $f (func))
  (table 256 funcref)

  (func $NOP)
  (elem (i32.const #OP_NOP) $NOP)

  (func $EVAL
    call $pop
    i32.wrap_i64
    call $call
  )
  (elem (i32.const #OP_EVAL) $EVAL)

  (func $PUTC
    call $pop
    i32.wrap_i64
    call $i32.emit
  )
  (elem (i32.const #OP_PUTC) $PUTC)

  (func $ADD
    call $pop
    call $peek
    i64.add
    call $poke
  )
  (elem (i32.const #OP_ADD) $ADD)

  (func $SUB
    (local $a i64)
    call $pop
    local.set $a
    call $peek
    local.get $a
    i64.sub
    call $poke
  )
  (elem (i32.const #OP_SUB) $SUB)

  (func $MUL
    call $pop
    call $peek
    i64.mul
    call $poke
  )
  (elem (i32.const #OP_MUL) $MUL)

  (func $DIV
    (local $a i64)
    call $pop
    local.set $a
    call $peek
    local.get $a
    i64.div_s
    call $poke
  )
  (elem (i32.const #OP_DIV) $DIV)

  (func $PUTN
    call $pop
    call $i64.print_s
  )
  (elem (i32.const #OP_PUTN) $PUTN)

  (func $DROP
    call $pop
    drop
  )
  (elem (i32.const #OP_DROP) $DROP)

  (func $DUMP
    (local $i i32)
    (local.set $i (i32.const 0))

    (call $i32.emit (i32.const #CHAR_BRA))
    (call $i32.emit (i32.const #CHAR_SPACE))
    
    (loop $loop (block $break
      (i32.ge_u (local.get $i) (global.get $stack_pointer))
      br_if $break

      local.get $i
      call $peekn
      call $i64.print_s
      
      (call $i32.emit (i32.const #CHAR_SPACE))

      (local.set $i (i32.add (local.get $i) (i32.const 8)))
      br $loop
    ))

    (call $i32.emit (i32.const #CHAR_KET))  ;; ]
    (call $i32.emit (i32.const #CHAR_NEWLINE))  ;; newline
  )
  (elem (i32.const #OP_DUMP) $DUMP)

  (func $DUP
    (local $i i64)
    call $peek
    call $push
  )
  (elem (i32.const #OP_DUP) $DUP)

  (func $DEPTH
    call $len
    i64.extend_i32_u
    call $push
  )
  (elem (i32.const #OP_DEPTH) $DEPTH)

  (func $SWAP
    (local $a i64)
    (local $b i64)

    call $pop
    local.tee $a
    call $peek
    local.set $b
    call $poke
    local.get $b
    call $push
  )
  (elem (i32.const #OP_SWAP) $SWAP)
  
  (func $WHEN
    (local $a i64)
    
    call $pop
    call $pop
    i32.wrap_i64

    if (param i64)
      i32.wrap_i64
      call $call
    else
      drop
    end
  )
  (elem (i32.const #OP_WHEN) $WHEN)

  (func $DIP
    (local $op i32)
    
    call $pop
    i32.wrap_i64
    local.set $op

    call $pop

    local.get $op
    call $call
    call $push
  )
  (elem (i32.const #OP_DIP) $DIP)

  (func $MARK
    (i32.ne (global.get $enqueue) (i32.const 0))
    if
      (call $logError #NEST_ERROR)
      unreachable
    end

    (call $push (i64.const #OP_MARK))
    (call $push (i64.const 1))

    (global.set $enqueue (i32.add (global.get $enqueue) (i32.const 1)))
  )
  (elem (i32.const #OP_MARK) $MARK)

  (func $DEF
    (local $dst i32)

    (i32.eq (global.get $enqueue) (i32.const 0))
    if
      unreachable
    end

    (call $push (i64.const #OP_DEF))
    (call $push (i64.const #OP_DEF))

    (global.get $dict_pointer)
    (local.tee $dst)

    call $moveStackToDict

    (global.set $enqueue (i32.sub (global.get $enqueue) (i32.const 1)))

    (i32.wrap_i64 (call $pop)) ;; Get user def id
    call $lookupRuntimeDef  ;; get location of dictionary pointer
    local.get $dst     ;; get location of dictionary
    (i32.store offset=1000)
  )
  (elem (i32.const #OP_DEF) $DEF)

  (func $BRA
    (call $push (i64.const #OP_BRA))
    (call $push (i64.const 1))

    (global.set $enqueue (i32.add (global.get $enqueue) (i32.const 1)))
  )
  (elem (i32.const #OP_BRA) $BRA)

  (func $KET
    (local $dst i32)

    (i32.eq (global.get $enqueue) (i32.const 0))
    if
      unreachable
    end

    (call $push (i64.const #OP_KET))
    (call $push (i64.const #OP_KET))

    (global.get $dict_pointer)
    (local.tee $dst)

    call $moveStackToDict

    (global.set $enqueue (i32.sub (global.get $enqueue) (i32.const 1)))

    (call $PUSH (i64.extend_i32_u (local.get $dst))) ;; push location of dictionary entry
  )
  (elem (i32.const #OP_KET) $KET)

  ;; controls if we're writing to the queue or running in the stack
  (global $enqueue (mut i32) (i32.const 0))

  (func $CALL (export "CALL")
    (param $n i32)
    
    (i32.and
      (i32.and
        (i32.ne (local.get $n) (i32.const #OP_MARK))
        (i32.ne (local.get $n) (i32.const #OP_DEF))
      )
      (i32.and
        (i32.ne (local.get $n) (i32.const #OP_BRA))
        (i32.ne (local.get $n) (i32.const #OP_KET))
      )
      (i32.and)
      (i32.ne (global.get $enqueue) (i32.const 0))
    )
    if
      (call $push (i64.extend_i32_s (local.get $n)))
      (call $push (i64.const 1))
    else
      (call $call (local.get $n))
    end
  )

  (func $PUSH (export "PUSH")
    (param $n i64)
    (i32.ne (global.get $enqueue) (i32.const 0))
    if
      (call $push (local.get $n))
      (call $push (i64.const 0))
    else
      (call $push (local.get $n))
    end
  )

  ;; Runs "bytecode" from the dictionary
  ;; Starts at $dict_pointer
  ;; until it hits an exit instruction
  (func $run (param $ip i32)
    (local $op i32)
    (local $val i64)

    (block $run_block
      (loop $run_loop
        (call $dict_get (local.get $ip))
        local.set $op
        local.set $val

        (i32.or
          (i32.eq (local.get $op) (i32.const #OP_DEF)) ;; End of Defintion Block
          (i32.eq (local.get $op) (i32.const #OP_KET)) ;; End of Bracket Block
        )
        br_if $run_block

        (local.set $ip (i32.add (local.get $ip) (i32.const 16)))  ;; dict pointer size

        ;; fast path for call
        (i32.eq (local.get $op) (i32.const 1))
        if
          (i32.wrap_i64 (local.get $val))
          call $call
          br $run_loop
        end

        (call $push (local.get $val))

        ;; fast path for push
        (i32.eq (local.get $op) (i32.const 0))
        br_if $run_loop
        
        (call $call (local.get $op))

        br $run_loop
      )
    )
  )

  ;; moves the stack pointer back to previous mark
  (func $backtrackToLastMarkOnStack
    (local $i i32)
    (local $op i32)

    (local.set $i (i32.add (global.get $stack_pointer) (i32.const 8)))

    (block $break (loop $loop
      (local.tee $i (i32.sub (local.get $i) (i32.const 16)))
      (i32.le_s (i32.const 0))
      br_if $break

      (local.get $i)
      call $peekn
      (i64.ne (i64.const 1))
      br_if $loop

      (i32.sub (local.get $i) (i32.const 8))
      call $peekn
      i32.wrap_i64
      local.set $op

      (i32.and
        (i32.ne (i32.const #OP_MARK) (local.get $op))
        (i32.ne (i32.const #OP_BRA) (local.get $op))
      )
      br_if $loop

      br $break
    ))
    
    (local.tee $i (i32.sub (local.get $i) (i32.const 8)))
    (global.set $stack_pointer)

    (i32.lt_u (global.get $stack_pointer) (i32.const 0))
    if
      (call $logError #UNDERFLOW_ERROR)
      unreachable
    end
  )