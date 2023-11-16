(module
  #include ./include/mp.wat

  (global $a (mut i32) (i32.const 100))  ;; pointers to memory locations for the values
  (global $b (mut i32) (i32.const 200))
  (global $c (mut i32) (i32.const 300))

  (func $test-add (param $a i32) (param $b i32) (param $c i32)

    (call $mpz.add (local.get $a) (local.get $b) (local.get $c))

    (call $mpz.print (local.get $a))
    (call $i32.emit (i32.const #CHAR_SPACE))
    (call $i32.emit (i32.const #CHAR_PLUS))
    (call $i32.emit (i32.const #CHAR_SPACE))
    (call $mpz.print (local.get $b))
    (call $i32.emit (i32.const #CHAR_SPACE))
    (call $i32.emit (i32.const #CHAR_EQUAL))
    (call $i32.emit (i32.const #CHAR_SPACE))

    (call $mpz.print (local.get $c))
    (call $i32.emit (i32.const #CHAR_NEWLINE))
  )

  (func $main (export "_start")
    (call $mpz.store32 (global.get $a) (i32.const 0xF))
    (call $test-add (global.get $a) (global.get $a) (global.get $c))

    (call $mpz.store64 (global.get $a) (i64.const 0xF))
    (call $test-add (global.get $a) (global.get $a) (global.get $c))

    (call $mpz.store32 (global.get $a) (i32.const 0xF))
    (call $mpz.store64 (global.get $b) (i64.const 0xF))
    (call $test-add (global.get $a) (global.get $b) (global.get $c))

    (call $mpz.store64 (global.get $a) (i64.const 0xF))
    (call $mpz.store32 (global.get $b) (i32.const 0xF))
    (call $test-add (global.get $a) (global.get $b) (global.get $c))

    (call $mpz.store32 (global.get $a) (i32.const 0xDEAD0000))
    (call $mpz.store32 (global.get $b) (i32.const 0xBEEF))
    (call $test-add (global.get $a) (global.get $b) (global.get $c))

    (call $mpz.store64 (global.get $a) (i64.const 0xDEAD00000000BEEF))
    (call $mpz.store64 (global.get $b) (i64.const 0x0000BEEFDEAD0000))
    (call $test-add (global.get $a) (global.get $b) (global.get $c))

    (call $mpz.store32 (global.get $a) (i32.const 0xFFFFFFFF))
    (call $test-add (global.get $a) (global.get $a) (global.get $c))

    (call $mpz.store64 (global.get $a) (i64.const 0xFFFFFFFFFFFFFFFF))
    (call $test-add (global.get $a) (global.get $a) (global.get $c))

    (call $mpz.store64 (global.get $a) (i64.const 0xFFFFFFFFFFFFFFFF))
    (call $mpz.add (global.get $a) (global.get $a) (global.get $b))
    (call $mpz.add (global.get $b) (global.get $b) (global.get $c))
    (call $mpz.add (global.get $c) (global.get $c) (global.get $a))
    (call $test-add (global.get $a) (global.get $b) (global.get $c))
  )
)