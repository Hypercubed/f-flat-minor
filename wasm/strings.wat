(module
  #include ./include/strings.wat

  (memory (export "memory") 0x640)

  (func $main (export "_start")
    (call $log (i32.const #FF_ERROR))
    (call $log (i32.const #UNDERFLOW_ERROR))
    (call $log (i32.const #NEST_ERROR))
    (call $log (i32.const #UNDEFINED_FUNCTION))

    (call $error (i32.const #UNDERFLOW_ERROR))
    (call $error (i32.const #NEST_ERROR))
    (call $error (i32.const #UNDEFINED_FUNCTION))
  )
)