
  #include ./wasi.wat
  #include ./strings.wat

  #define DDWORD_SIZE 4

  ;; MEMORY
  (memory (export "memory") 0x640)

  (global $heap (mut i32) (i32.const 10000))

  (func $mpz.print (param $ptr i32)
    (local $src i32)
    (local $len i32)
    (local $dword i32)
    (local $nz i32)

    (i32.load offset=4 (local.get $ptr))
    (local.set $len)

    (i32.load (local.get $ptr))
    (local.set $src)

    (call $i32.emit (i32.const #CHAR_ZERO))
    (call $i32.emit (i32.const #CHAR_X))

    (i32.const 0)
    (local.set $nz)

    (loop $loop
      (i32.sub (local.get $len) (i32.const #DDWORD_SIZE))
      (local.set $len)

      (i32.load (i32.add (local.get $src) (local.get $len)))
      (local.set $dword)

      (i32.eqz (local.get $nz))
      (i32.eqz (local.get $dword))
      i32.and
      if
        nop
      else
        (local.get $dword)
        (call $i32.print_hex_u)
        ;; (call $i32.emit (i32.const #CHAR_UNDERSCORE))

        (i32.const 1)
        (local.set $nz)
      end



      (i32.gt_s (local.get $len) (i32.const 0))
      br_if $loop
    )
  )

  ;; (func $i32.sgn (param $value i32) (result i32)
  ;;   (local.get $value)
  ;;   (i32.const 0)
  ;;   (i32.eq)
  ;;   if
  ;;     (i32.const 0)
  ;;     return
  ;;   else
  ;;     (local.get $value)
  ;;     (i32.const 0)
  ;;     (i32.lt_s)
  ;;     if
  ;;       (i32.const -1)
  ;;       return
  ;;     else
  ;;       (i32.const 1)
  ;;       return
  ;;     end
  ;;   end

  ;;   unreachable
  ;; )

  ;; encode a 32 bit integer as a mp
  (func $mpz.store32 (param $iov i32) (param $value i32)
    (local $dest i32)
    (local $len i32)

    (global.get $heap)
    (local.set $dest)

    (i32.store (local.get $dest) (local.get $value))  ;; store the value

    (i32.add (global.get $heap) (i32.const #DDWORD_SIZE))  ;; move the heap pointer
    (global.set $heap)

    (i32.store (local.get $iov) (local.get $dest))  ;; store the pointer
    (i32.store offset=4 (local.get $iov) (i32.const #DDWORD_SIZE))  ;; store the length
  )

  ;; encode a 64 bit integer as a mp
  (func $mpz.store64 (param $iov i32) (param $value i64)
    (local $dest i32)
    (local $len i32)

    (global.get $heap)
    (local.set $dest)

    (i64.store (local.get $dest) (local.get $value))  ;; store the value

    (i32.add (global.get $heap) (i32.const 8))  ;; move the heap pointer (2 DDWORDs)
    (global.set $heap)

    (i32.store (local.get $iov) (local.get $dest))  ;; store the pointer
    (i32.store offset=4 (local.get $iov) (i32.const 8))  ;; store the length
  )

  (func $i32.max (param $a i32) (param $b i32) (result i32)
    (local.get $a)
    (local.get $b)
    (i32.gt_s)
    if
      (local.get $a)
      return
    else
      (local.get $b)
      return
    end

    unreachable
  )

  (func $mpz.add (param $a i32) (param $b i32) (param $iov i32)
    (local $a_ptr i32)
    (local $a_len i32)
    (local $b_ptr i32)
    (local $b_len i32)
    (local $dest i32)
    (local $len i32)
    (local $max i32)

    (local $a_val i64)
    (local $b_val i64)

    (local $sum i64)
    (local $carry i64)
    (local $value i64)

    ;; TODO: ensure $iov != $a and $iov != $b

    (i32.load (local.get $a))  ;; load the pointer to the value
    (local.set $a_ptr)

    (i32.load offset=4 (local.get $a))  ;; load the length
    (local.set $a_len)

    (i32.load (local.get $b)) ;; load the pointer to the value
    (local.set $b_ptr)

    (i32.load offset=4 (local.get $b))  ;; load the length
    (local.set $b_len)

    (global.get $heap)  ;; get the heap pointer
    (local.set $dest)

    (i32.store (local.get $iov) (local.get $dest))  ;; store the pointer to the result

    ;; get max length
    (local.get $a_len)
    (local.get $b_len)
    (call $i32.max)
    (local.set $max)

    (i32.const 0)
    (local.set $len)

    (i64.const 0)
    (local.set $carry)

    (block $break (loop $loop
      (local.get $len)
      (local.get $a_len)
      (i32.gt_s)
      if
        (i64.const 0)
        (local.set $a_val)
      else
        (i64.load32_u (local.get $a_ptr))
        (local.set $a_val)
      end

      (local.get $len)
      (local.get $b_len)
      (i32.gt_s)
      if
        (i64.const 0)
        (local.set $b_val)
      else
        (i64.load32_u (local.get $b_ptr))
        (local.set $b_val)
      end

      ;; Casting to i64 to avoid overflow
      ;; TODO: check if this can be done with i32
      (local.get $a_val)
      (local.get $b_val)
      (local.get $carry)
      (i64.add)
      (i64.add)
      (local.set $sum)

      ;; get lower 32 bits
      (local.get $sum)
      (i64.const 0xffffffff)
      (i64.and)
      (local.set $value)

      ;; get upper 32 bits
      (local.get $sum)
      (i64.const 32)
      (i64.shr_u)
      (local.set $carry)

      (i32.store
        (local.get $dest) 
        (i32.wrap_i64 (local.get $value))
      )  ;; store the value

    ;; (local.get $len)
    ;; (call $i32.print_u)
    ;; (call $i32.emit (i32.const #CHAR_SPACE))

    ;; (local.get $max)
    ;; (call $i32.print_u)
    ;; (call $i32.emit (i32.const #CHAR_NEWLINE))

      (i32.add (local.get $len) (i32.const #DDWORD_SIZE))  ;; increase the length
      (local.set $len)

    ;; (local.get $len)
    ;; (call $i32.print_u)
    ;; (call $i32.emit (i32.const #CHAR_SPACE))

    ;; (local.get $max)
    ;; (call $i32.print_u)
    ;; (call $i32.emit (i32.const #CHAR_NEWLINE))

      (local.get $len)
      (local.get $max)
      (i32.ge_u)
      br_if $break

      (i32.add (local.get $dest) (i32.const 4))
      (local.set $dest)

      (i32.add (local.get $len) (i32.const 4))
      (local.set $len)

      (i32.add (local.get $a_ptr) (i32.const 4))
      (local.set $a_ptr)

      (i32.add (local.get $b_ptr) (i32.const 4))
      (local.set $b_ptr)

      br $loop
    ))

    (local.get $carry)
    (i64.const 0)
    (i64.gt_u)
    if
      (i32.add (local.get $dest) (i32.const 4))
      (local.set $dest)

      (i32.add (local.get $len) (i32.const 4))  ;; increase the length for carry
      (local.set $len)

      (i32.store
        (local.get $dest) 
        (local.get $carry)
        (i32.wrap_i64)
      )  ;; store carry
    end

    (i32.add (global.get $heap) (local.get $len))  ;; move the heap pointer
    (global.set $heap)

    (i32.store offset=4 (local.get $iov) (local.get $len))  ;; store the final length
  )

  ;; (func $mpz.sgn (param $ptr i32) (result i32)
  ;;   (local.get $ptr)
  ;;   (i32.load)
  ;;   (call $i32.sgn)
  ;; )