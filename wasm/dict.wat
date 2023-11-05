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
  (func $print_i64_u (param $num i64)
    (local $digit i32)
    (local $dchar i32)

    (i64.rem_u (local.get $num) (i64.const 10))  ;; get lowest digit
    (i32.wrap_i64)  ;; convert to i32
    (i32.add (i32.const 48))  ;; convert to ascii
 
    (local.set $num (i64.div_u (local.get $num) (i64.const 10)))  ;; get rid of lowest digit
    (i64.ne (local.get $num) (i64.const 0))  ;; check if we're done
    if
      (call $print_i64_u (local.get $num))
    end

    (call $emit)  ;; emit digit char
  )

  ;; (func $print_i32_u (param $num i32)
  ;;   (local $digit i32)
  ;;   (local $dchar i32)

  ;;   (i32.rem_u (local.get $num) (i32.const 10))  ;; get lowest digit
  ;;   (i32.add (i32.const 48))  ;; convert to ascii
 
  ;;   (local.set $num (i32.div_u (local.get $num) (i32.const 10)))  ;; get rid of lowest digit
  ;;   (i32.ne (local.get $num) (i32.const 0))  ;; check if we're done
  ;;   if
  ;;     (call $print_i32_u (local.get $num))
  ;;   end

  ;;   (call $emit)  ;; emit digit char
  ;; )

  ;; Print signed i64 to stdout
  (func $print (param $num i64)
    (i64.lt_s (local.get $num) (i64.const 0)) 
    if
      (call $emit (i32.const 45))  ;; -
      (local.set $num (i64.sub (i64.const 0) (local.get $num)))  ;; make positive
    end

    (call $print_i64_u (local.get $num))
  )

  ;; (func $println
  ;;   (call $emit (i32.const 10))  ;; newline
  ;; )

  ;; (func $print_i32_s (param $num i32)
  ;;   (i32.lt_s (local.get $num) (i32.const 0)) 
  ;;   if
  ;;     (call $emit (i32.const 45))  ;; -
  ;;     (local.set $num (i32.sub (i32.const 0) (local.get $num)))  ;; make positive
  ;;   end

  ;;   (call $print_i32_u (local.get $num))
  ;; )

  ;; THE DICTIONARY
  (global $dict_pointer (mut i32) (i32.const 10000))  ;; Dictionary pointer
  (global $def_pointer (mut i32) (i32.const 100))  ;; Definition pointer

  ;; Converts a definition id to a location in the def pointer
  (func $get_def_loc (param $n i32) (result i32)
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

  ;; THE STACK
  (global $stack_pointer (mut i32) (i32.const 0))  ;; Stack pointer (offset 30000)

  (func $inc_stack_pointer
    (i32.add (global.get $stack_pointer) (i32.const 8))
    global.set $stack_pointer
  )

  (func $dec_stack_pointer
    (i32.sub (global.get $stack_pointer) (i32.const 8))
    global.set $stack_pointer
  )

  (func $push (param $v i64)
    call $inc_stack_pointer
    local.get $v
    call $poke
  )

  (func $pop
    (result i64)
    call $peek
    call $dec_stack_pointer
  )
  
  (func $peek
    (result i64)

    (i32.lt_u (global.get $stack_pointer) (i32.const 8))
    if
      unreachable
    end

    (i64.load offset=29992
      global.get $stack_pointer
    ) ;; Top of stack - 8
  )

  (func $peekn
    (param $n i32)
    (result i64)

    (i32.lt_u (local.get $n) (i32.const 0))
    if
      unreachable
    end

    (i64.load offset=30000 ;; Top of stack
      (local.get $n)             
    )
  )

  (func $poke (param $n i64)
    (i32.lt_u (global.get $stack_pointer) (i32.const 0))
    if
      unreachable
    end

    (i64.store offset=29992 ;; Top of stack - 8
      global.get $stack_pointer
      local.get $n
    )
  )

  (func $len
    (result i32)
    (i32.div_u
      (global.get $stack_pointer)
      (i32.const 8)
    )
  )

  (func $call_user (param $n i32)
    (call $get_def_loc (local.get $n))
    (call $run (i32.load offset=100))
  )

  (func $call (param $n i32)
    (i32.lt_s (local.get $n) (i32.const 0))
    if
      (call $call_user (local.get $n))
      return
    end

    (i32.le_s (local.get $n) (i32.const 256))
    if
      (call_indirect (type $f) (local.get $n))
      return
    end

    (call $run (local.get $n))
  )

  ;; INTERNAL DEFINITIONS

  (type $f (func))
  (table 256 funcref)

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

  (func $DIV
    (local $a i64)
    call $pop
    local.set $a
    call $peek
    local.get $a
    i64.div_s
    call $poke
  )
  (elem (i32.const 47) $DIV)
  (global $DIV i32 (i32.const 47))

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
    (local.set $i (i32.const 0))

    (call $emit (i32.const 91))  ;; [
    (call $emit (i32.const 32))  ;; space
    
    (loop $loop (block $break
      (i32.ge_u (local.get $i) (global.get $stack_pointer))
      br_if $break

      local.get $i
      call $peekn
      call $print
      
      (call $emit (i32.const 32))  ;; space

      (local.set $i (i32.add (local.get $i) (i32.const 8)))
      br $loop
    ))

    (call $emit (i32.const 93))  ;; ]
    (call $emit (i32.const 10))  ;; newline
  )
  (elem (i32.const 46) $DUMP)
  (global $DUMP i32 (i32.const 46))

  (func $DUP
    (local $i i64)
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
    (global.get $enqueue)
    if
      unreachable
    end

    (call $push (i64.extend_i32_s (global.get $MARK)))
    (call $push (i64.const 1))

    (global.set $enqueue (i32.add (global.get $enqueue) (i32.const 1)))
  )
  (elem (i32.const 58) $MARK)
  (global $MARK i32 (i32.const 58))

  (func $backtrackToMark
    (local $i i32)

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
      (i32.ne (global.get $MARK))
      br_if $loop

      br $break
    ))

    (local.tee $i (i32.sub (local.get $i) (i32.const 8)))
    (global.set $stack_pointer)
  )

  (func $DEF
    (local $src i32)
    (local $size i32)
    (local $dst i32)
    (local $sp i32)

    (global.get $enqueue)
    if
      (call $push (i64.extend_i32_s (global.get $DEF)))
      (call $push (i64.extend_i32_s (global.get $DEF)))

      (global.get $stack_pointer)
      local.set $sp

      call $backtrackToMark

      (i32.add (i32.const 16) (global.get $stack_pointer))
      local.set $src

      (i32.sub (local.get $sp) (local.get $src))
      local.set $size


      (global.get $dict_pointer)
      (local.set $dst)

      (i32.add (local.get $src) (i32.const 30000))
      (local.set $src)

      (memory.copy
        (local.get $dst)
        (local.get $src)
        (local.get $size)
      )

      (i32.wrap_i64 (call $pop)) ;; Get user def id
      call $get_def_loc  ;; get location of definition
      local.get $dst     ;; get location of dictionary
      (i32.store offset=100)

      (i32.add (local.get $size) (global.get $dict_pointer))
      (global.set $dict_pointer)

      (global.set $enqueue (i32.sub (global.get $enqueue) (i32.const 1)))
    else
      unreachable
    end
  )
  (elem (i32.const 59) $DEF)
  (global $DEF i32 (i32.const 59))

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

        (i32.eq (local.get $op) (global.get $DEF)) ;; End of Function Block
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

  ;; controls if we're writing to the queue or running in the stack
  (global $enqueue (mut i32) (i32.const 0))

  (func $CALL (export "CALL")
    (param $n i32)
    
    (i32.and
      (i32.and
        (i32.ne (local.get $n) (global.get $MARK))
        (i32.ne (local.get $n) (global.get $DEF))
      )
      (global.get $enqueue)
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
    global.get $enqueue
    if
      (call $push (local.get $n))
      (call $push (i64.const 0))
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
    (call $CALL (i32.const -1)) ;; FACT
    (call $CALL (global.get $DUMP))
  )
)