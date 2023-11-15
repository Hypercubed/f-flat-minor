#ifndef HAVE_WASI
  #include ./wasi.wat
#endif

#define HAVE_STRINGS

(data (i32.const 256)
  "FF Error:"
  "Stack underflow"
  "Cannot nest definitions"
  "Undefined function call"
)

(data (i32.const 100)  ;; *iovs, iovs_len (i32 little endian)
  "\00\01\00\00" "\09\00\00\00" #define FF_ERROR 100
  "\09\01\00\00" "\0F\00\00\00" #define UNDERFLOW_ERROR 108
  "\18\01\00\00" "\17\00\00\00" #define NEST_ERROR 116
  "\2F\01\00\00" "\17\00\00\00" #define UNDEFINED_FUNCTION 124
)

(func $error (param $prt i32)
  (call $iov.write (i32.const #FF_ERROR))
  (call $i32.emit (i32.const #CHAR_SPACE))
  (call $log (local.get $prt))
)