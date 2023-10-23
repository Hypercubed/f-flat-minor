(module
    ;; Import the required fd_write WASI function which will write the given io vectors to stdout
    ;; The function signature for fd_write is:
    ;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
    (import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

    (memory 1)
    (export "memory" (memory 0))

    (func $add (param $lhs i32) (param $rhs i32) (result i32)
      local.get $lhs
      local.get $rhs
      i32.add)

    ;; PUTC
    (func $putc (param $a i64)
      i32.const 8
      local.get $a
      i32.wrap_i64
      i32.store
      
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

    ;; DUP
    ;; MUL
    ;; ADD
    ;; DIV
    ;; MARK
    ;; DEF
    ;; WHEN

    (func $main (export "_start")
        (i64.const 104)
        (call $putc)
        (i64.const 101)
        (call $putc)
        (i64.const 108)
        (call $putc)
        (i64.const 108)
        (call $putc)
        (i64.const 111)
        (call $putc)
        (i64.const 32)
        (call $putc)
        (i64.const 32)
        (call $putc)

        (i64.const 10)
        (call $putc)
    )
)