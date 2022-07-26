#lang racket

(require ff/private/ops)
(require br/define (for-syntax racket/base syntax/parse))

;;; helpers
(define (unthunk x) (x))

(define (boolean->integer b)
  (sub1 (length (memv b '(#t #f)))))

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

;;; stack macros

(define-macro (push! S VAL)
  #'(set! S (cons VAL S)))

(define-macro (pop! S)
  #'(let ([x (car S)])
         (set! S (cdr S))
         x))

(define-macro (peek! S)
  #'(car S))

(define-macro (print! S)
  #'(void (printf "[ ")
  (for ([x (reverse S)]) (printf "~s " x))
  (printf "]\n"))
)

;;; system ops
(define (add!)
  (push! stack (+ (pop! stack) (pop! stack))))

(define (putc!)
  (display (integer->char (pop! stack))))

(define (putn!)
  (display (pop! stack)))

(define (drop!)
  (set! stack (cdr stack)))

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
  (push! stack (peek! stack)))

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

;;; internal macros
(define-macro (do-trace V)
    #'(printf "~a\t - ~a\t - ~a~N" (reverse stack) V queue))

(define-macro (call-user DEF)
    #'(for-each unthunk DEF))

(define-macro (call-system OP)
    #'(OP))

(define-macro (call-defered OP)
  #'(cond
    [(hash-has-key? system_defs OP) (push! queue (hash-ref system_defs OP))]
    [(hash-has-key? definitions OP) (let ([def (hash-ref definitions OP)])
      (push! queue [thunk (call-user def)])
    )]
    [else (push! queue [thunk (call-user (hash-ref definitions OP))])]  ; need this for recursive definitions
  )
)

;;; public calls

(define (push v)
  (when trace (do-trace v))

  (if (> (length depth-stack) 0)
    (push! queue [thunk (push v)])
    (push! stack v))
)

(define (call op)
  (when trace (do-trace op))

  (cond
    [(eq? op_bra op) (bra!)]
    [(eq? op_ket op) (ket!)]
    [(eq? op_def op) (def!)]
    [(positive? (length depth-stack)) (call-defered op)]
    [(hash-has-key? system_defs op) (call-system (hash-ref system_defs op))]
    [(hash-has-key? definitions op) (call-user (hash-ref definitions op))]
    [else (error "unknown op: ~s" op)]
  )

  (void)
)

(provide stack queue definitions)
(provide call push)
(provide dump!)

(module+ test
  (require rackunit)

  (define fact -1)

  (push fact)      ;;; define factorial
  (call op_mark)
  (call op_dup)
  (push 1)
  (call op_gt)
  (call op_bra)
  (call op_dup)
  (push 1)
  (call op_sub)
  (call fact)
  (call op_mul)
  (call op_ket)
  (call op_when)
  (call op_def)

  (push 100)  ;;; factorial of 100
  (call fact)

  (push 10)   ;;; remove lower 25 digits
  (push 25)
  (call op_pow)
  (call op_div)

  (push 10)  ;;; get lower 6 digits
  (push 6)
  (call op_pow)
  (call op_mod)

  (check-equal? stack '[91686])
)