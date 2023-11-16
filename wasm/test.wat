(module
  #include ./include/core.wat

  (memory (export "memory") 0x640)

  (func $main (export "_start")
    (call $PUSH (i64.const 13))
    (call $PUSH (i64.const 21))
    (call $ADD)
    (call $DUMP)
  )
)