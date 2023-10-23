(module
  ;; Import the required fd_write WASI function which will write the given io vectors to stdout
  ;; The function signature for fd_write is:
  ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
  (import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

  ;; (import "host" "print" (func $print (param i32)))
  ;; (import "" "host" (func (param i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)))

  ;; (import "extmod" "exttag" (tag $tagname (param i32)))
  ;; (import "extmod" "throwExnWithStack" (func $throwExnWithStack (param i32)))

  ;; Declare linear memory and export it to host. The offset returned by
  ;; $itoa is relative to this memory.
  (memory (export "memory") 1)

  ;; Using some memory for a number-->digit ASCII lookup-table, and then the
  ;; space for writing the result of $itoa.
  (data (i32.const 8000) "0123456789")
  (global $itoa_out_buf i32 (i32.const 8010))

  ;; itoa: convert an integer to its string representation. Only supports
  ;; numbers >= 0.
  ;; Parameter: the number to convert
  ;; Result: address and length of string in memory.
  ;; Note: this result is only valid until the next call to $itoa which will
  ;; overwrite it; obviously, this isn't concurrency-safe either.
  (func $itoa (param $num i32) (result i32)
      (local $numtmp i32)
      (local $numlen i32)
      (local $writeidx i32)
      (local $digit i32)
      (local $dchar i32)

      ;; Count the number of characters in the output, save it in $numlen.
      (i32.lt_s (local.get $num) (i32.const 10))
      if
          (local.set $numlen (i32.const 1))
      else
          (local.set $numlen (i32.const 0))
          (local.set $numtmp (local.get $num))
          (loop $countloop (block $breakcountloop
              (i32.eqz (local.get $numtmp))
              br_if $breakcountloop

              (local.set $numtmp (i32.div_u (local.get $numtmp) (i32.const 10)))
              (local.set $numlen (i32.add (local.get $numlen) (i32.const 1)))
              br $countloop
          ))
      end

      ;; Now that we know the length of the output, we will start populating
      ;; digits into the buffer. E.g. suppose $numlen is 4:
      ;;
      ;;                     _  _  _  _
      ;;
      ;;                     ^        ^
      ;;  $itoa_out_buf -----|        |---- $writeidx
      ;;
      ;;
      ;; $writeidx starts by pointing to $itoa_out_buf+3 and decrements until
      ;; all the digits are populated.
      (local.set $writeidx
          (i32.sub
              (i32.add (global.get $itoa_out_buf) (local.get $numlen))
              (i32.const 1)))

      (loop $writeloop (block $breakwriteloop
          ;; digit <- $num % 10
          (local.set $digit (i32.rem_u (local.get $num) (i32.const 10)))
          ;; set the char value from the lookup table of digit chars
          (local.set $dchar (i32.load8_u offset=8000 (local.get $digit)))

          ;; mem[writeidx] <- dchar
          (i32.store8 (local.get $writeidx) (local.get $dchar))

          ;; num <- num / 10
          (local.set $num (i32.div_u (local.get $num) (i32.const 10)))

          ;; If after writing a number we see we wrote to the first index in
          ;; the output buffer, we're done.
          (i32.eq (local.get $writeidx) (global.get $itoa_out_buf))
          br_if $breakwriteloop

          (local.set $writeidx (i32.sub (local.get $writeidx) (i32.const 1)))
          br $writeloop
      ))

      (local.get $numlen)
  )

  (func $putc (param $a i32)
    (i32.store (i32.const 8) (local.get $a))
    
    (i32.store (i32.const 0) (i32.const 8))  ;; iov.iov_base - This is a pointer to the start of the 'hello world\n' string
    (i32.store (i32.const 4) (i32.const 1))  ;; iov.iov_len - The length of the 'hello world\n' string
    
    (call $fd_write
        (i32.const 1) ;; file_descriptor - 1 for stdout
        (i32.const 0) ;; *iovs - The pointer to the iov array, which is stored at memory location 0
        (i32.const 1) ;; iovs_len - We're printing 1 string stored in an iov - so one.
        (i32.const 8) ;; nwritten - A place in memory to store the number of bytes written
    )

    drop
  )

  (func $print (param $num i32)
      (i32.store
        (i32.const 0)
        (global.get $itoa_out_buf)
      )  ;; iov.iov_base - This is a pointer to the start of the string

      (i32.store
        (i32.const 4)
        (local.get $num)
        (call $itoa)
      )  ;; iov.iov_len - The length of th' string

      (call $fd_write
        (i32.const 1) ;; file_descriptor - 1 for stdout
        (i32.const 0) ;; *iovs - The pointer to the iov array, which is stored at memory location 0
        (i32.const 1) ;; iovs_len - We're printing 1 string stored in an iov - so one.
        (i32.const 8) ;; nwritten - A place in memory to store the number of bytes written
      )
      drop
  )

  (global $size i32 (i32.const 8))     ;; Size of each stack element
  (global $tos i32 (i32.const 10000))  ;; Top of stack
  (global $sp (mut i32) (i32.const 9992))  ;; Stack pointer

  (func $inc_sp
    (i32.add (global.get $sp) (global.get $size))
    global.set $sp
  )

  (func $dec_sp
    (i32.sub (global.get $sp) (global.get $size))
    global.set $sp
  )

  (func $push (param $n i32)
    call $inc_sp
    (call $poke (local.get $n))
  )

  (func $pop
    (result i32)
    call $peek
    call $dec_sp
  )
  
  (func $peek
    ;; TODO: check out of bounds
    (result i32)
    global.get $sp
    i32.load
  )

  (func $poke (param $n i32)
    ;; TODO: check out of bounds
    global.get $sp
    local.get $n
    i32.store
  )

  (func $len
    (result i32)
    (global.get $sp)
    (global.get $tos)
    i32.sub
    (global.get $size)
    i32.div_u
  )

  (func $NOP)

  (func $ADD
    call $pop
    call $peek
    i32.add
    call $poke
  )

  (func $SUB
    (local $a i32)
    (local.set $a (call $pop))
    call $peek
    local.get $a
    i32.sub
    call $poke
  )

  (func $MUL
    call $pop
    call $peek
    i32.mul
    call $poke
  )

  (func $PUTN
    call $pop
    call $print
  )

  (func $DROP
    call $pop
    drop
  )

  (func $DUMP
    (local $i i32)
    (local.set $i (global.get $tos))

    (call $putc (i32.const 91))
    (call $putc (i32.const 32))
    
    (loop $DUMPloop (block $breakdumploop
      (i32.gt_u (local.get $i) (global.get $sp))
      br_if $breakdumploop

      (i32.load (local.get $i))
      call $print
      
      (call $putc (i32.const 32))

      (local.set $i (i32.add (local.get $i) (global.get $size)))
      br $DUMPloop
    ))

    (call $putc (i32.const 93))
    (call $putc (i32.const 10))
  )

  (func $DUP
    call $peek
    call $push
  )

  (func $DEPTH
    call $len
    call $push
  )

  (func $SWAP
    (local $a i32)
    (local $b i32)

    (local.set $a (call $pop))
    (local.set $b (call $peek))

    (local.get $a)
    call $poke
    (local.get $b)
    call $push
  )

  (func $main (export "_start")
    (call $push (i32.const 42))
    (call $push (i32.const 13))

    call $DUMP

    call $ADD
    call $DUMP

    call $DUP
    call $DUMP

    call $MUL
    call $DUMP

    call $DUP

    call $DEPTH
    call $DUMP

    call $SUB
    call $DUMP

    call $SWAP
    call $DUMP
  )
)