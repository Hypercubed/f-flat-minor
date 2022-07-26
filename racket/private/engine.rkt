#lang racket

(require ff/private/ops)
(require br/define (for-syntax racket/base syntax/parse))

;;; helpers
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

(define definitions (make-hash))

(define current-definition '())
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

(define (mark-def! op)
  (push! current-definition op)
  (hash-set! definitions op empty)
)

(define (mark!)
  (mark-def! (pop! stack)))

(define (bra!)
  (mark-def! (next-code!)))

(define (def!)
  (pop! current-definition)
)

(define (ket!)
  (define qp (pop! current-definition))
  (push qp)
)

(define (eval!)
  (call (pop! stack)))

(define (depth!)
  (push! stack (length stack)))

(define system_defs (hash
  op_nop void
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

(define-macro (call-user OP)
    #'(call-sentence (hash-ref definitions OP)))

(define-macro (call-system OP)
    #'((hash-ref system_defs OP)))

;;; Actually call an op on the stack
(define (call-immediate op)
  (when trace (do-trace op))
  (cond
    [(hash-has-key? system_defs op) (call-system op)]
    [(hash-has-key? definitions op) (call-user op)]
    [else (error "unknown op: ~s" op)]
  )
)

;;; Actually push a value to the stack
(define (push-immediate val)
  (when trace (do-trace val))
  (push! stack val)
)

;;; Run the defintion (list of defferd ops)
(define (call-sentence def)
  (unless (empty? def)
    (let ([v (pop! def)] [op (pop! def)])
      ;;; Nieve
      ; (push-immediate v)
      ; (call-immediate op)

      ;;; Smart
      (if (zero? op)
        (push-immediate v)
        (call-immediate v)
      )
      (call-sentence def)
    )
  )
)

;;; Adds a deferred operation to the current definition
(define-macro (deferred VAL OP)
  #'(hash-set! definitions (peek! current-definition) (append (hash-ref definitions (peek! current-definition)) `(,VAL ,OP)))
)

;;; public calls

(define (push val)
  (if (empty? current-definition)
    (push-immediate val)
    (deferred val op_nop) ;;; currently in a definition
))

(define (call op)
  (cond
    [(eq? op_mark op) (mark!)]
    [(eq? op_def op) (def!)]
    [(eq? op_bra op) (bra!)]
    [(eq? op_ket op) (ket!)]
    [(empty? current-definition) (call-immediate op)]
    [else (deferred op op_eval)] ;;; currently in a definition
  )
)

(provide stack queue definitions)
(provide call push)

(module+ test
  (require rackunit)

  (push -1)      ;;; define factorial
  (call op_mark)
  (call op_dup)
  (push 1)
  (call op_gt)
  (call op_bra)
  (call op_dup)
  (push 1)
  (call op_sub)
  (call -1)
  (call op_mul)
  (call op_ket)
  (call op_when)
  (call op_def)

  (push 100)  ;;; factorial of 100
  (call -1)

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