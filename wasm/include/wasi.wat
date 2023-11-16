#define HAVE_WASI

#define CHAR_NEWLINE 10
#define CHAR_SPACE 32
#define CHAR_PLUS 43
#define CHAR_DASH 45
#define CHAR_ZERO 48
#define CHAR_EQUAL 61
#define CHAR_BRA 91
#define CHAR_KET 93
#define CHAR_UNDERSCORE 95
#define CHAR_X 120

;; Import the required fd_write WASI function which will write the given io vectors to stdout
;; The function signature for fd_write is:
;; (File Descriptor, *iovs, iovs_len, nwritten) -> Returns number of bytes written
(import "wasi_unstable" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

;; Prints a string to stdout
;; $base is a pointer to the start of the string
;; The string starts with a length byte
(func $iov.write (param $prt i32)
  (call $fd_write
    (i32.const 1) ;; file_descriptor - 1 for stdout
    (local.get $prt) ;; *iovs - The pointer to the iov array, which is stored at memory location 0
    (i32.const 1) ;; iovs_len - We're printing 1 string stored in an iov - so one.
    (i32.const 20) ;; nwritten - A place in memory to store the number of bytes written
  )
  drop
)

(func $log (param $prt i32)
  (call $iov.write (local.get $prt))
  (call $i32.emit (i32.const #CHAR_NEWLINE))  ;; lf
)

;; emits a single character to stdout
(func $i32.emit (param $a i32)
  (i32.store (i32.const 0) (i32.const 8))  ;; iov.iov_base - This is a pointer to the start of the string
  (i32.store (i32.const 4) (i32.const 1))  ;; iov.iov_len - The length of the string
  (i32.store (i32.const 8) (local.get $a)) ;; this is the character we want to print
  
  (call $iov.write (i32.const 0))
)

;; Print unsigned i64 to stdout
(func $i64.print_u (param $num i64)
  (local $digit i32)
  (local $dchar i32)

  (i64.rem_u (local.get $num) (i64.const 10))  ;; get lowest digit
  i32.wrap_i64  ;; convert to i32
  (i32.add (i32.const #CHAR_ZERO))  ;; convert to ascii

  (local.set $num (i64.div_u (local.get $num) (i64.const 10)))  ;; get rid of lowest digit
  (i64.ne (local.get $num) (i64.const 0))  ;; check if we're done
  if
    (call $i64.print_u (local.get $num))
  end

  call $i32.emit  ;; emit digit char
)

;; Print signed i64 to stdout
(func $i64.print_s (param $num i64)
  (i64.lt_s (local.get $num) (i64.const 0)) 
  if
    (call $i32.emit (i32.const #CHAR_DASH))
    (local.set $num (i64.sub (i64.const 0) (local.get $num)))  ;; make positive
  end

  (call $i64.print_u (local.get $num))
)

;; Print unsigned i32 to stdout
(func $i32.print_u (param $num i32)
  (local $digit i32)
  (local $dchar i32)

  (i32.rem_u (local.get $num) (i32.const 10))  ;; get lowest digit
  (i32.add (i32.const #CHAR_ZERO))  ;; convert to ascii

  (local.set $num (i32.div_u (local.get $num) (i32.const 10)))  ;; get rid of lowest digit
  (i32.ne (local.get $num) (i32.const 0))  ;; check if we're done
  if
    (call $i32.print_u (local.get $num))
  end

  call $i32.emit  ;; emit digit char
)

;; Print signed i32 to stdout
(func $i32.print_s (param $num i32)
  (i32.lt_s (local.get $num) (i32.const 0)) 
  if
    (call $i32.emit (i32.const #CHAR_DASH))
    (local.set $num (i32.sub (i32.const 0) (local.get $num)))  ;; make positive
  end

  (call $i32.print_u (local.get $num))
)

(func $i32.print_hex_u (param $num i32)
  (local $dchar i32)

  (i32.rem_u (local.get $num) (i32.const 16))  ;; get lowest byte
  (i32.add (i32.const 48))  ;; convert to ascii
  (local.tee $dchar)

  (i32.gt_u (i32.const 57))  ;; if > 9
  if
    (i32.add (local.get $dchar) (i32.const 7))  ;; convert to ascii
    (local.set $dchar)
  end

  (local.get $dchar)
  (local.set $num (i32.div_u (local.get $num) (i32.const 16)))  ;; get rid of lowest digit
  (i32.ne (local.get $num) (i32.const 0))  ;; check if we're done
  if
    (call $i32.print_hex_u (local.get $num))  ;; tail recurse to print next digit
  end

  (call $i32.emit)  ;; emit digit char
)

(func $i32.print_hex_s (param $num i32)
    (i32.lt_s (local.get $num) (i32.const 0)) 
  if
    (call $i32.emit (i32.const #CHAR_DASH))
    (local.set $num (i32.sub (i32.const 0) (local.get $num)))  ;; make positive
  end

  (call $i32.print_hex_u (local.get $num))
)