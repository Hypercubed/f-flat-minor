(module
  ;; Import the required fd_write WASI function which will write the given io vectors to stdout
  ;; The function signature for fd_write is:
  ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
  (import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

  ;; MEMORY

  ;; Declare linear memory and export it to host.
  (memory (export "memory") 0x640)

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

  (func $i32.print_bin_u (param $num i32)
    (local $dchar i32)

    (i32.rem_u (local.get $num) (i32.const 2))  ;; get lowest digit
    (i32.add (i32.const 48))  ;; convert to ascii

    (local.set $num (i32.div_u (local.get $num) (i32.const 2)))  ;; get rid of lowest digit
    (i32.ne (local.get $num) (i32.const 0))  ;; check if we're done
    if
      (call $i32.print_bin_u (local.get $num))
    end

    (call $emit)  ;; emit digit char
  )

  (func $i32.print_hex_u (param $num i32)
    (local $dchar i32)

    (i32.rem_u (local.get $num) (i32.const 16))  ;; get lowest digit
    (i32.add (i32.const 48))  ;; convert to ascii
    (local.tee $dchar)

    (i32.gt_u (i32.const 57))  ;; if > 9
    if
      (i32.add (local.get $dchar) (i32.const 7))  ;; convert to ascii\
      (local.set $dchar)
    end

    (local.get $dchar)
    (local.set $num (i32.div_u (local.get $num) (i32.const 16)))  ;; get rid of lowest digit
    (i32.ne (local.get $num) (i32.const 0))  ;; check if we're done
    if
      (call $i32.print_u (local.get $num))
    end

    (call $emit)  ;; emit digit char
  )

  (func $i32.print_u (param $num i32)
    (local $digit i32)
    (local $dchar i32)

    (i32.rem_u (local.get $num) (i32.const 10))  ;; get lowest digit
    (i32.add (i32.const 48))  ;; convert to ascii
 
    (local.set $num (i32.div_u (local.get $num) (i32.const 10)))  ;; get rid of lowest digit
    (i32.ne (local.get $num) (i32.const 0))  ;; check if we're done
    if
      (call $i32.print_u (local.get $num))
    end

    (call $emit)  ;; emit digit char
  )

  (func $i32.print_s (param $num i32)
    (i32.lt_s (local.get $num) (i32.const 0)) 
    if
      (call $emit (i32.const 45))  ;; -
      (local.set $num (i32.mul (i32.const -1) (local.get $num)))  ;; make positive
    end

    (call $i32.print_u (local.get $num))
  )

  (func $leb128.print_hex (param $ptr i32) (param $carry i32) (param $shift i32)
    (local $byte i32)  ;; current byte
    (local $res i32)  ;; current result

    (i32.load8_u (local.get $ptr)) ;; load byte
    (local.set $byte)

    (i32.lt_s (local.get $byte) (i32.const 0xf0))
    if
      (call $i32.print_hex_u (local.get $byte))
      return
    end

    (i32.and (local.get $byte) (i32.const 0x7f))  ;; get lowest 7 bits
    (local.set $byte)

    (i32.shl (local.get $byte) (local.get $shift))  ;; add carry
    (i32.or (local.get $carry))
    (local.set $byte)

    (i32.const 0)
    (local.set $res)

    (i32.add (local.get $shift) (i32.const 7)) ;; increment shift amount
    (local.set $shift)

    (block $break (loop $loop
      (i32.lt_u (local.get $byte) (i32.const 0x10))
      br_if $break

      (i32.and (local.get $byte) (i32.const 0xf)) ;; get lowest 4 bits
      (i32.shl (local.get $res) (i32.const 4))  ;; shift the result
      i32.or  ;; add
      (local.set $res)

      (i32.shr_u (local.get $byte) (i32.const 4))  ;; shift right 4 bits
      (local.set $byte)

      (i32.sub (local.get $shift) (i32.const 4)) ;; dec shift amount
      (local.set $shift)

      br $loop
    ))

    (i32.add (local.get $ptr) (i32.const 1)) ;; increment read ptr
    (local.get $byte) ;; carry
    (local.get $shift) ;; shift amount
    (call $leb128.print_hex) ;; recurse
    (call $emit (i32.const 95))

    (local.get $res)
    call $i32.print_hex_u
  )

  (func $leb128.print (param $ptr i32)
    (call $emit (i32.const 48))
    (call $emit (i32.const 98))
    (local.get $ptr)
    (i32.const 0)
    (i32.const 0)
    call $leb128.print_hex
  )

  ;; encode a 32 bit integer as a leb128
  ;; returns the number of bytes written
  (func $leb128.store_32_u (param $dest i32) (param $value i32) (result i32)
    (local $n i32)  ;; write ptr
    (local $byte i32)  ;; current byte

    (local.set $n (local.get $dest))  ;; write ptr

    (loop $loop
      (i32.and (local.get $value) (i32.const 0x7f))  ;; get lowest 7 bits
      (local.set $byte)

      (i32.shr_u (local.get $value) (i32.const 7))  ;; shift right 7 bits
      (local.set $value)

      (i32.ne (local.get $value) (i32.const 0))
      if
        (i32.or (local.get $byte) (i32.const 0x80))  ;; set highest bit
        (local.set $byte)
      end

      (i32.store8 (local.get $n) (local.get $byte)) ;; store byte

      (i32.add (local.get $n) (i32.const 1)) ;; increment write ptr
      (local.set $n)

      (i32.ne (local.get $value) (i32.const 0))
      br_if $loop
    )

    (i32.sub (local.get $n) (local.get $dest))
    return
  )

  (func $leb128.add (param $a i32) (param $b i32) (param $dest i32)
    (local $byte_a i32)
    (local $byte_b i32)

    (i32.load8_u (local.get $a))
    (local.set $byte_a)

    (i32.load8_u (local.get $b))
    (local.set $byte_b)

    (i32.lt_u (local.get $byte_a) (i32.const 0x7f))
    (i32.lt_u (local.get $byte_b) (i32.const 0x7f))
    i32.and
    if
      (i32.add (local.get $byte_a) (local.get $byte_b))
      (local.set $byte_a)

      (call $leb128.store_32_u (local.get $dest) (local.get $byte_a))
      return
    end

    unreachable
  )

  ;; (func $leb128.sgn (param $a i32) (result i32)
  ;;   (local.get $a)
  ;;   i32.load
  ;;   i32.const 0
  ;;   i32.gt_s
  ;;   if (result i32)
  ;;     i32.const 1
  ;;   else
  ;;     i32.const -1
  ;;   end
  ;; )

  (global $a (mut i32) (i32.const 1000))
  (global $b (mut i32) (i32.const 2000))
  (global $c (mut i32) (i32.const 3000))

  (func $main (export "_start")
    (call $leb128.store_32_u (global.get $a) (i32.const 0x5))
    drop

    (call $leb128.store_32_u (global.get $b) (i32.const 0x8))
    drop
    
    (call $leb128.add (global.get $a) (global.get $b) (global.get $c))

    (call $leb128.print (global.get $a))
    (call $emit (i32.const 10))
    (call $leb128.print (global.get $b))
    (call $emit (i32.const 10))
    (call $leb128.print (global.get $c))
    (call $emit (i32.const 10))

    ;; (call $leb128.sgn (global.get $c))
    ;; (call $i32.print_s)
  )
)