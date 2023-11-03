(module
  ;; Import the required fd_write WASI function which will write the given io vectors to stdout
  ;; The function signature for fd_write is:
  ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
  (import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

  ;; Declare linear memory and export it to host. The offset returned by
  ;; $itoa is relative to this memory.
  (memory (export "memory") 1)

  ;; emits a single character to stdout
  (func $emit (param $a i32)
    (i32.store (i32.const 8) (local.get $a))
    
    (i32.store (i32.const 0) (i32.const 8))  ;; iov.iov_base - This is a pointer to the start of the string
    (i32.store (i32.const 4) (i32.const 1))  ;; iov.iov_len - The length of the string
    
    (call $fd_write
        (i32.const 1) ;; file_descriptor - 1 for stdout
        (i32.const 0) ;; *iovs - The pointer to the iov array, which is stored at memory location 0
        (i32.const 1) ;; iovs_len - We're printing 1 string stored in an iov - so one.
        (i32.const 8) ;; nwritten - A place in memory to store the number of bytes written
    )

    drop
  )

  ;; Print unsigned i64 to stdout
  (func $print_u (param $num i64)
    (local $digit i32)
    (local $dchar i32)

    (i64.rem_u (local.get $num) (i64.const 10))  ;; get lowest digit
    (i32.wrap_i64)  ;; convert to i32
    (i32.add (i32.const 48))  ;; convert to ascii
 
    (local.set $num (i64.div_u (local.get $num) (i64.const 10)))  ;; get rid of lowest digit
    (i64.ne (local.get $num) (i64.const 0))  ;; check if we're done
    if
      (call $print_u (local.get $num))
    end

    (call $emit)  ;; emit digit char
  )

  ;; Print signed i64 to stdout
  (func $print (param $num i64)
    (i64.lt_s (local.get $num) (i64.const 0)) 
    if
      (call $emit (i32.const 45))  ;; -
      (local.set $num (i64.sub (i64.const 0) (local.get $num)))  ;; make positive
    end

    (call $print_u (local.get $num))
  )

  ;; THE QUEUE
  (global $qsize i32 (i32.const 12))     ;; Size of each stack element
  (global $qp (mut i32) (i32.const 10000))  ;; Queue pointer (top - size)

  (func $qpush (param $v i64) (param $o i32)
    (local $qp i32)
    global.get $qp
    local.tee $qp

    (i64.store (local.get $v)) ;; push value

    (i32.add (local.get $qp) (i32.const 8))
    local.tee $qp
    (i32.store (local.get $o)) ;; operation

    (i32.add (local.get $qp) (i32.const 4))
    global.set $qp  ;; inc queue pointer
  )

  (func $qget (param $qp i32) (result i64 i32)
    (local.get $qp)
    i64.load ;; value

    (i32.add (local.get $qp) (i32.const 8))
    i32.load  ;; operation
  )

  ;; THE STACK
  (global $size i32 (i32.const 8))     ;; Size of each stack element
  (global $tos i32 (i32.const 20000))  ;; Top of stack
  (global $sp (mut i32) (i32.const 19992))  ;; Stack pointer (tos - size)

  (func $inc_sp
    (i32.add (global.get $sp) (global.get $size))
    global.set $sp
  )

  (func $dec_sp
    (i32.sub (global.get $sp) (global.get $size))
    global.set $sp
  )

  (func $push (param $v i64)
    call $inc_sp
    (call $poke (local.get $v))
  )

  (func $pop
    (result i64)
    call $peek
    call $dec_sp
  )
  
  (func $peek
    (result i64)

    (i32.lt_u (global.get $sp) (global.get $tos))
    if
      unreachable
    end

    global.get $sp
    i64.load
  )

  (func $poke (param $n i64)
    ;; TODO: check out of bounds
    global.get $sp
    local.get $n
    i64.store
  )

  (func $len
    (result i32)
    (global.get $sp)
    (global.get $tos)
    i32.sub
    (global.get $size)
    i32.div_u
  )

  (func $call_internal (param $n i32)
    (local.get $n)
    (call_indirect (type $f))
  )

  (func $call_user (param $n i32)
    local.get $n
    call $get_def_loc
    i32.load
    call $run
  )

  (func $call (param $n i32)
    (i32.lt_s (local.get $n) (i32.const 0))
    if
      (local.get $n)
      call $call_user
      return
    end

    (i32.le_s (local.get $n) (i32.const 256))
    if
      (local.get $n)
      call $call_internal
      return
    end

    ;; (i32.gt_s (local.get $n) (i32.const 256))
    ;; if
    ;;   (local.get $n)
    ;;   call $call_user
    ;;   return
    ;; end
  )

  ;; INTERNAL DEFINITIONS
  (type $f (func))
  (table 512 funcref)

  (func $NOP)
  (elem (i32.const 0) $NOP)
  (global $NOP i32 (i32.const 0))

  (func $ADD
    call $pop
    call $peek
    i64.add
    call $poke
  )
  (global $ADD i32 (i32.const 43))
  (elem (i32.const 43) $ADD)

  (func $SUB
    (local $a i64)
    call $pop
    local.set $a
    call $peek
    local.get $a
    i64.sub
    call $poke
  )
  (global $SUB i32 (i32.const 45))
  (elem (i32.const 45) $SUB)

  (func $MUL
    call $pop
    call $peek
    i64.mul
    call $poke
  )
  (elem (i32.const 42) $MUL)
  (global $MUL i32 (i32.const 42))

  (func $PUTN
    call $pop
    call $print
  )
  (elem (i32.const 5) $PUTN)
  (global $PUTN i32 (i32.const 5))

  (func $DROP
    call $pop
    drop
  )
  (elem (i32.const 8) $DROP)
  (global $DROP i32 (i32.const 8))

  (func $DUMP
    (local $i i32)
    (local.set $i (global.get $tos))

    (call $emit (i32.const 91))  ;; [
    (call $emit (i32.const 32))  ;; space
    
    (loop $DUMPloop (block $breakdumploop
      (i32.gt_u (local.get $i) (global.get $sp))
      br_if $breakdumploop

      (i64.load (local.get $i))
      call $print
      
      (call $emit (i32.const 32))  ;; space

      (local.set $i (i32.add (local.get $i) (global.get $size)))
      br $DUMPloop
    ))

    (call $emit (i32.const 93))  ;; ]
    (call $emit (i32.const 10))  ;; newline
  )
  (elem (i32.const 46) $DUMP)
  (global $DUMP i32 (i32.const 46))

  (func $DUP
    call $peek
    call $push
  )
  (elem (i32.const 33) $DUP)
  (global $DUP i32 (i32.const 33))

  (func $DEPTH
    call $len
    i64.extend_i32_u
    call $push
  )
  (elem (i32.const 35) $DEPTH)
  (global $DEPTH i32 (i32.const 35))

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
  (elem (i32.const 36) $SWAP)
  (global $SWAP i32 (i32.const 36))

  (func $EVAL
    call $pop
    i32.wrap_i64
    call $call
  )
  (elem (i32.const 1) $EVAL)
  (global $EVAL i32 (i32.const 1))

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
  (elem (i32.const 63) $WHEN)
  (global $WHEN i32 (i32.const 63))

  (func $MARK
    (i32.wrap_i64 (call $pop))  ;; get definition id
    (call $get_def_loc) ;; convert to location in def pointer

    (i32.store (global.get $qp)) ;; save pointer

    (global.set $enqueue (i32.const 1))
  )
  (elem (i32.const 58) $MARK)
  (global $MARK i32 (i32.const 58)) 

  (func $DEF
    (call $qpush (i64.const 0) (global.get $DEF))  ;; EOF
    (global.set $enqueue (i32.const 0))
  )
  (elem (i32.const 59) $DEF)
  (global $DEF i32 (i32.const 59))

  ;; USER DEFINITIONS
  (global $dp (mut i32) (i32.const 100))  ;; Def pointer

  (func $get_def_loc (param $n i32) (result i32)
    ;; TODO: handle negitive numbers and positive numbers > 256
    i32.const 96
    local.get $n
    i32.const 4
    i32.mul
    i32.sub  ;; -1*(n-1)*4 + 100 === 96 - 4n
  )

  ;; Runs "bytecode" from the queue
  ;; Starts at $qp
  ;; until it hits an exit instruction
  (func $run (param $qp i32)
    (local $op i32)
    (local $val i64)

    (block $run_block
      (loop $run_loop
        (call $qget (local.get $qp))
        local.set $op
        local.set $val

        (i32.eq (local.get $op) (global.get $DEF)) ;; End of Function Block
        br_if $run_block

        (local.set $qp (i32.add (local.get $qp) (global.get $qsize)))

        ;; fast path for call
        (i32.eq (local.get $op) (i32.const 1))
        if
          local.get $val
          i32.wrap_i64
          call $call
          br $run_loop
        end

        local.get $val
        call $push

        ;; fast path for push
        (i32.eq (local.get $op) (i32.const 0))
        br_if $run_loop

        local.get $op
        call $call

        br $run_loop
      )
    )
  )

  ;; controls if we're writing to the queue or running in the stack
  (global $enqueue (mut i32) (i32.const 0))

  (func $CALL
    (param $n i32)
    
    (i32.ne (local.get $n) (global.get $MARK))
    (i32.ne (local.get $n) (global.get $DEF))
    i32.and
    global.get $enqueue
    i32.and
    if
      (call $qpush (i64.extend_i32_u (local.get $n)) (i32.const 1))
    else
      (call $call (local.get $n))
    end
  )

  (func $PUSH
    (param $n i64)
    global.get $enqueue
    if
      (call $qpush (local.get $n) (i32.const 0))
    else
      (call $push (local.get $n))
    end
  )

  ;; THE PROGRAM

  (func $main (export "_start")
    (call $PUSH (i64.const -1))  ;; _FACT_
    (call $CALL (global.get $MARK))
    (call $CALL (global.get $DUP))
    (call $PUSH (i64.const 1))
    (call $CALL (global.get $SUB))
    (call $CALL (i32.const -2)) ;; FACT
    (call $CALL (global.get $MUL))
    (call $CALL (global.get $DEF))

    (call $PUSH (i64.const -2))  ;; FACT
    (call $CALL (global.get $MARK))
    (call $CALL (global.get $DUP))
    (call $PUSH (i64.const 1))
    (call $CALL (global.get $SUB))
    (call $PUSH (i64.const -1))  ;; [_FACT_]
    (call $CALL (global.get $WHEN))
    (call $CALL (global.get $DEF))

    (call $PUSH (i64.const 20))
    (call $CALL (i32.const -2)) ;; FACT
    (call $CALL (global.get $DUMP))
  )
)