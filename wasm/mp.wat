(module
  ;; Import the required fd_write WASI function which will write the given io vectors to stdout
  ;; The function signature for fd_write is:
  ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
  (import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

  ;; MEMORY

  ;; Declare linear memory and export it to host.
  (memory (export "memory") 0x640)

  ;; emits a single character to stdout
  (func $emit (param $ptr_a i32)
    (i32.store (i32.const 8) (local.get $ptr_a))
    
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
      (call $i32.print_hex_u (local.get $num))
    end

    (call $emit)  ;; emit digit char
  )

  (func $mpz.print (param $ptr i32)
    (local.get $ptr)
    (i32.load)
    (i32.lt_s (i32.const 0))
    if
      (call $emit (i32.const 45))
    end

    (call $emit (i32.const 48))
    (call $emit (i32.const 98))

    (i32.load offset=8 (local.get $ptr))  ;; for now all i32 are size 1
    call $i32.print_hex_u
  )

  (func $i32.sgn (param $value i32) (result i32)
    (local.get $value)
    (i32.const 0)
    (i32.eq)
    if
      (i32.const 0)
      return
    else
      (local.get $value)
      (i32.const 0)
      (i32.lt_s)
      if
        (i32.const -1)
        return
      else
        (i32.const 1)
        return
      end
    end

    unreachable
  )

  ;; encode a 32 bit integer as a mp
  ;; returns the number of bytes written
  (func $mpz.store_32 (param $dest i32) (param $value i32) (result i32)
    (local $sgn i32)

    (call $i32.sgn (local.get $value))
    (local.set $sgn)

    (local.get $sgn)
    (i32.const -1)
    (i32.eq)
    if
      (local.get $value)
      (i32.const -1)
      (i32.mul)
      (local.set $value)
    end

    (i32.store (local.get $dest) (local.get $sgn))
    (i32.store offset=8 (local.get $dest) (local.get $value))

    (i32.const 1)
    return
  )

  (func $mpz.add (param $ptr_a i32) (param $ptr_b i32) (param $ptr_c i32)
    (local.get $ptr_c)
    (i32.load offset=8 (local.get $ptr_a))
    (i32.load offset=8 (local.get $ptr_b))
    i32.add

    (call $mpz.store_32)
    drop
  )

  (func $mpz.sgn (param $ptr i32) (result i32)
    (local.get $ptr)
    (i32.load)
    (call $i32.sgn)
  )

  (global $ptr_a (mut i32) (i32.const 1000))
  (global $ptr_b (mut i32) (i32.const 2000))
  (global $ptr_c (mut i32) (i32.const 3000))

  (func $main (export "_start")
    (call $mpz.store_32 (global.get $ptr_a) (i32.const 0xF0))
    drop

    (call $mpz.store_32 (global.get $ptr_b) (i32.const 0xC))
    drop
    
    (call $mpz.add (global.get $ptr_a) (global.get $ptr_b) (global.get $ptr_c))

    (call $mpz.print (global.get $ptr_a))
    (call $emit (i32.const 10))
    (call $mpz.print (global.get $ptr_b))
    (call $emit (i32.const 10))
    (call $mpz.print (global.get $ptr_c))
    (call $emit (i32.const 10))

    (call $mpz.sgn (global.get $ptr_c))
    call $i32.print_hex_u
  )
)