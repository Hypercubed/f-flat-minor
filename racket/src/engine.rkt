#lang br/quicklang

(require "./ops.rkt")

;;; engine
(define stack empty)
(define queue empty)

(define definitions (make-hash))
(define depth 0)
(define trace #f)

;;; engine ops

(define (peek-stack!)
  (first stack))

(define (print! s)
  (printf "[ ")
  (for ([x (reverse s)]) (printf "~s " x))
  (printf "]\n")
  )

(define (boolean->integer b)
  (sub1 (length (memv b '(#t #f)))))

;;; system ops
(define (add!)
  (push! stack (+ (pop! stack) (pop! stack))))

(define (putc!)
  (display (integer->char (pop! stack))))

(define (putn!)
  (display (pop! stack)))

(define (drop!)
  (pop! stack))

(define (mul!)
  (push! stack ((pop! stack) . * . (pop! stack))))

(define (div!)
  (let ([a (pop! stack)] [b (pop! stack)])
    (push! stack (quotient b a))))

(define (sub!)
  (let ([a (pop! stack)])
    (push! stack ((pop! stack) . - . a))))

(define (pow!)
  (let ([a (pop! stack)])
    (push! stack (expt (pop! stack) a))))

(define (mod!)
  (let ([a (pop! stack)])
    (push! stack (modulo (pop! stack) a))))

(define (and!)
  (let ([a (pop! stack)])
    (push! stack (bitwise-and (pop! stack) a))))

(define (or!)
  (let ([a (pop! stack)])
    (push! stack (bitwise-ior (pop! stack) a))))

(define (not!)
    (push! stack (bitwise-not (pop! stack))))

(define (shiftr!)
  (let ([a (pop! stack)])
    (push! stack (arithmetic-shift (pop! stack) (- a)))))

(define (shiftl!)
  (let ([a (pop! stack)])
    (push! stack (arithmetic-shift (pop! stack) a))))

(define (lt!)
    (push! stack (boolean->integer ((pop! stack) . > . (pop! stack)))))

(define (gt!)
    (push! stack (boolean->integer ((pop! stack) . < . (pop! stack)))))

(define (eq!)
    (push! stack (boolean->integer ((pop! stack) . = . (pop! stack)))))

(define (swap!)
  (let ([a (pop! stack)] [b (pop! stack)])
    (push! stack a)
    (push! stack b)))

(define (dup!)
  (push! stack (peek-stack!)))

(define (dump!)
  (print! stack)
  ;;; (print! queue)
  )

(define (clr!)
  (set! stack empty))

(define (rand!)
  (push! stack (random (pop! stack))))

(define (pullr!)
  (push! stack (pop! queue)))

(define (pushr!)
  (push! queue (pop! stack)))

(define (when!)
  (let ([a (pop! stack)] [b (pop! stack)])
    (when (not (zero? b))
      (call a)
    )
  ))

(define (mark!)
  (set! depth (+ depth 1))
  (push! stack (length queue)))

(define (def!)
  (set! depth (- depth 1))
  (define l (- (length queue) (pop! stack)))
  (define s (pop! stack))
  (define def empty)
  (for ([i l])
    (set! def (cons (pop! queue) def))
  )
  (hash-set! definitions s def)
)

(define (eval!)
  (call (pop! stack)))

(define (depth!)
  (push! stack (length stack)))

;;; System ops
(hash-set! definitions op_nop #f)
(hash-set! definitions op_eval eval!)
(hash-set! definitions op_putc putc!)
;;; getc
(hash-set! definitions op_putn putn!)
;;; clock
(hash-set! definitions op_drop drop!)
(hash-set! definitions op_pushr pushr!)
(hash-set! definitions op_pullr pullr!)
(hash-set! definitions op_shiftr shiftr!)
(hash-set! definitions op_shiftl shiftl!)
(hash-set! definitions op_clr clr!)
(hash-set! definitions op_rand rand!)
;;; exit
(hash-set! definitions op_dup dup!)
(hash-set! definitions op_depth depth!)
(hash-set! definitions op_swap swap!)
(hash-set! definitions op_mod mod!)
(hash-set! definitions op_and and!)
;;; stash 
;;; fetch 
(hash-set! definitions op_mul mul!)
(hash-set! definitions op_add add!)
(hash-set! definitions op_sub sub!)
(hash-set! definitions op_dump dump!)
(hash-set! definitions op_div div!)
(hash-set! definitions op_mark mark!)
(hash-set! definitions op_def def!)
(hash-set! definitions op_lt lt!)
(hash-set! definitions op_eq eq!)
(hash-set! definitions op_gt gt!)
(hash-set! definitions op_when when!)
;;; bra 
;;; ket
(hash-set! definitions op_pow pow!)
(hash-set! definitions op_or or!)
(hash-set! definitions op_not not!)

;;; IR ops
(define (call-internal op)
  (if (procedure? op)
    (op)
    (for-each (lambda (x) ((car x) (cadr x))) op))
)

(define (push v)
  (if (depth . > . 0)
    (push! queue `(,push ,v))
    (push! stack v))
)

(define (call op)
  (cond
    [(eq? op_def op) (def!)]
    [(depth . > . 0) (push! queue `(,call ,op))]
    [(hash-has-key? definitions op) (call-internal (hash-ref definitions op))]
    [#t (error "unknown op: ~s" op)]
  )

  (when trace (printf "~a\t -> ~a~N" op stack))
)

(provide stack queue definitions)
(provide call push)