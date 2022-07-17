#lang racket/base

(require br/quicklang)
(require "./ops.rkt")

;;; helpers

(define (flip f)
  (λ (x y . args)
    (apply f y x args)))

(define next-code!
  (let ([n 256])
  (λ ()
    (set! n (add1 n))
    n)))

;;; engine
(define stack empty)
(define queue empty)

(define depth-stack empty)
(define definitions (make-hash))
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
  (push! stack (* (pop! stack) (pop! stack))))

(define (div!)
  (push! stack ((flip quotient) (pop! stack) (pop! stack))))

(define (sub!)
  (push! stack ((flip -) (pop! stack) (pop! stack))))

(define (pow!)
  (push! stack ((flip expt) (pop! stack) (pop! stack))))

(define (mod!)
  (push! stack ((flip modulo) (pop! stack) (pop! stack))))

(define (and!)
  (push! stack ((flip bitwise-and) (pop! stack) (pop! stack))))

(define (or!)
  (push! stack ((flip bitwise-ior) (pop! stack) (pop! stack))))

(define (not!)
  (push! stack (bitwise-not (pop! stack))))

(define (shiftr!)
  (push! stack ((flip arithmetic-shift) (- (pop! stack)) (pop! stack))))

(define (shiftl!)
  (push! stack ((flip arithmetic-shift) (pop! stack) (pop! stack))))

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
  (push! depth-stack (length queue)))

(define (bra!)
  (push! depth-stack (length queue)))

(define (def!)
  (define l (- (length queue) (pop! depth-stack)))
  (define s (pop! stack))
  (define def empty)
  (for ([i l])
    (push! def (pop! queue))
  )
  (hash-set! definitions s def)
)

(define (ket!)
  (define l (- (length queue) (pop! depth-stack)))
  (define s (next-code!))
  (define def empty)
  (for ([i l])
    (push! def (pop! queue))
  )
  (hash-set! definitions s def)
  (push s)
)

(define (eval!)
  (call (pop! stack)))

(define (depth!)
  (push! stack (length stack)))

(define system_defs (hash
  op_nop #f
  op_eval eval!
  op_putc putc!
  ;;; op_getc
  op_putn putn!
  ;;; clock
  op_drop drop!
  op_pushr pushr!
  op_pullr pullr!
  op_shiftr shiftr!
  op_shiftl shiftl!
  op_clr clr!
  op_rand rand!
  ;;; exit 
  op_dup dup!
  op_depth depth!
  op_swap swap!
  op_mod mod!
  op_and and!
  ;;; stash
  ;;; fetch 
  op_mul mul!
  op_add add!
  op_sub sub!
  op_dump dump!
  op_div div!
  op_mark mark!
  op_def def!
  op_lt lt!
  op_eq eq!
  op_gt gt!
  op_when when!
  op_bra bra!
  op_ket ket!
  op_pow pow!
  op_or or!
  op_not not!
))

;;; IR ops
;;; (: unthunk (-> Any None))
(define (unthunk x) (x))

;;; (: push (-> Integer None))
(define (push v)
  (when trace (printf "~a\t - ~a\t - ~a~N" (reverse stack) v queue))

  (if (> (length depth-stack) 0)
    (push! queue [thunk (push v)])
    (push! stack v))
)

;;; (: call (-> Integer None))
(define (call op)
  (when trace (printf "~a\t - ~a\t - ~a~N" (reverse stack) op queue))

  (cond
    [(eq? op_bra op) (bra!)]
    [(eq? op_ket op) (ket!)]
    [(eq? op_def op) (def!)]
    [(and (> (length depth-stack) 0) (hash-has-key? system_defs op))
      (let ([def (hash-ref system_defs op)])
        (push! queue def)
      )
    ]
    [(> (length depth-stack) 0) (push! queue [thunk (call op)])]
    [(hash-has-key? system_defs op) ((hash-ref system_defs op))]
    [(hash-has-key? definitions op) (for-each unthunk (hash-ref definitions op))]
    [else (error "unknown op: ~s" op)]
  )

  (void)
)

(provide stack queue definitions)
(provide call push)