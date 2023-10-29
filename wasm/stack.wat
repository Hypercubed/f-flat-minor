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

  ;; THE STACK

  (global $size i32 (i32.const 8))     ;; Size of each stack element
  (global $tos i32 (i32.const 10000))  ;; Top of stack
  (global $sp (mut i32) (i32.const 9992))  ;; Stack pointer

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

  (func $call (param $n i32) (local.get $n)
    (call_indirect (type $f))
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
  (elem (i32.const 1) $SWAP)

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
  (elem (i32.const 63) $SWAP)

  ;; USER FUNCTIONS
  
  (func $USER/_fact_
    call $DUP
    (call $push (i64.const 1))
    call $SUB
    call $USER/fact
    call $MUL
  )
  (elem (i32.const 256) $USER/_fact_)

  (func $USER/fact
    call $DUP
    (call $push (i64.const 1))
    call $SUB
    (call $push (i64.const 256)) ;; $__fact__
    call $WHEN
  )
  (elem (i32.const 257) $USER/fact)

  ;; THE PROGRAM

  (func $main (export "_start")
    (call $push (i64.const 20))
    call $USER/fact
    call $DUMP
  )

  ;; (func $main (export "_start")
  ;;   (call $push (i64.const 20))
  ;;   (call $call (i32.const 257))
  ;;   (call $call (i32.const 46))
  ;; )
)