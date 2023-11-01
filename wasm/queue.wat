(module
  ;; Import the required fd_write WASI function which will write the given io vectors to stdout
  ;; The function signature for fd_write is:
  ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
  (import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

  ;; Declare linear memory and export it to host. The offset returned by
  ;; $itoa is relative to this memory.
  (memory (export "memory") 1)

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

  ;; Print unsigned integer to stdout
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

  ;; Print signed integer to stdout
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
  (global $toq i32 (i32.const 10000))  ;; Top of queue
  (global $boq (mut i32) (i32.const 10000))  ;; Bottom of queue
  (global $qp (mut i32) (i32.const 10000))  ;; Queue pointer

  (func $qget (param $qp i32) (result i64 i32)
    (local.get $qp)
    i64.load ;; value

    (i32.add (local.get $qp) (i32.const 8))
    i32.load  ;; operation
  )

  ;; (func $qnext
  ;;   (result i64 i32)

  ;;   (global.get $qp)
  ;;   call $qget

  ;;   (i32.add (global.get $qp) (global.get $qsize))
  ;;   global.set $qp
  ;; )

  ;; THE STACK
  (global $size i32 (i32.const 8))     ;; Size of each stack element
  (global $tos i32 (i32.const 20000))  ;; Top of stack
  (global $sp (mut i32) (i32.const 19992))  ;; Stack pointer

  (type $f (func))
  (table 512 funcref)

  (func $inc_sp
    (i32.add (global.get $sp) (global.get $size))
    global.set $sp
  )

  (func $dec_sp
    (i32.sub (global.get $sp) (global.get $size))
    global.set $sp
  )

  (func $push (param $n i64)
    call $inc_sp
    (call $poke (local.get $n))
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
    i32.const 96
    local.get $n
    i32.const 4
    i32.mul
    i32.sub  ;; -1*(n-1)*4 + 100 === 96 - 4n
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

  (func $NOP)
  (elem (i32.const 0) $NOP)

  (func $ADD
    call $pop
    call $peek
    i64.add
    call $poke
  )
  (elem (i32.const 43) $ADD)

  (func $SUB
    (local $a i64)
    (local.set $a (call $pop))
    call $peek
    local.get $a
    i64.sub
    call $poke
  )
  (elem (i32.const 45) $SUB)

  (func $MUL
    call $pop
    call $peek
    i64.mul
    call $poke
  )
  (elem (i32.const 42) $MUL)

  (func $PUTN
    call $pop
    call $print
  )
  (elem (i32.const 5) $PUTN)

  (func $DROP
    call $pop
    drop
  )
  (elem (i32.const 8) $DROP)

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

  (func $DUP
    call $peek
    call $push
  )
  (elem (i32.const 33) $DUP)

  (func $DEPTH
    call $len
    i64.extend_i32_s
    call $push
  )
  (elem (i32.const 35) $DEPTH)

  (func $SWAP
    (local $a i64)
    (local $b i64)

    (local.set $a (call $pop))
    (local.set $b (call $peek))

    (local.get $a)
    call $poke
    (local.get $b)
    call $push
  )
  (elem (i32.const 36) $SWAP)

  (func $EVAL
    call $pop
    i32.wrap_i64
    call $call
  )
  (elem (i32.const 1) $EVAL)

  (func $WHEN
    (local $a i64)
    (local.set $a (call $pop))
    call $pop
    i32.wrap_i64
    if
      (local.get $a)
      i32.wrap_i64
      call $call
    end
  )
  (elem (i32.const 63) $WHEN)

  ;; USER DEFINITIONS
  
  ;; FACT -1
  (data (i32.const 10000)
    ;; (i64 -1) (i32 0)  ;; PUSH -1
    ;; (i64 58) (i32 1)   ;; :
    (i64 33) (i32 1)  ;; DUP
    (i64 1) (i32 0)   ;; PUSH 1
    (i64 45) (i32 1)  ;; SUB
    (i64 -2) (i32 0)  ;; PUSH USER/_fact_
    (i64 63) (i32 1)  ;; WHEN
    (i64 0) (i32 59)  ;; EOF
    ;; (i64 59) (i32 1)  ;; ;
  ;; )

  ;; _FACT_ -2
  ;; (data (i32.const 10072)
    ;; (i64 -1) (i32 0)  ;; PUSH -1
    ;; (i64 58) (i32 1)   ;; :
    (i64 33) (i32 1)  ;; DUP
    (i64 1) (i32 0)  ;; PUSH 1
    (i64 45) (i32 1)  ;; SUB
    (i64 -1) (i32 1)  ;; CALL USER/fact
    (i64 42) (i32 1)  ;; MUL
    (i64 0) (i32 59)  ;; EOF
    ;; (i64 59) (i32 1)  ;; ;
  ;; )

  ;; main
  ;; (data (i32.const 10144)
    (i64 20) (i32 0)  ;; PUSH 20  ;; 0
    (i64 -1) (i32 1)  ;; CALL USER/fact
    (i64 46) (i32 1)  ;; DUMP
    (i64 0) (i32 27)  ;; EXIT
  )

  ;; pointers to user functions
  (data (i32.const 100)
    (i32 10000)  ;; USER/fact (-1)
    (i32 10072)  ;; USER/_fact_ (-2)
  )

  ;; THE PROGRAM

  ;; Runs "bytecode" from the queue
  ;; Starts at $qp
  ;; until it hits an exit instruction
  (func $run (param $qp i32)
    (local $op i32)
    (local $val i64)

    (block $run_block
      (loop $run_loop

        (call $qget (local.get $qp))
        (local.set $op)
        (local.set $val)

        (i32.eq (local.get $op) (i32.const 27)) ;; End of Program
        (i32.eq (local.get $op) (i32.const 59)) ;; End of Function Block
        i32.or
        br_if $run_block

        (local.set $qp (i32.add (local.get $qp) (global.get $qsize)))
        ;; (global.set $qp (local.get $qp))

        ;; fast path for call
        (i32.eq (local.get $op) (i32.const 1))
        if
          local.get $val
          i32.wrap_i64
          call $call
          br $run_loop
        end

        (local.get $val)
        call $push

        ;; fast path for push
        (i32.eq (local.get $op) (i32.const 0))
        br_if $run_loop

        (local.get $op)
        call $call

        br $run_loop
      )
    )
  )

  (func $main (export "_start")
    (global.set $qp (i32.const 10144))

    (global.get $qp)
    (call $run)
  )
)