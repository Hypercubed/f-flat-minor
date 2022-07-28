#lang racket

(require ff/private/ops)
(require br/define (for-syntax racket/base syntax/parse))

;;; helpers
(define-macro (boolean->integer B)
  #'(if B 1 0))

(define next-code!
  (let ([n 256])
  (λ ()
    (set! n (add1 n))
    n)))

; (define-type Stack (Listof Integer))

;;; engine
; (: stack Stack)
(define stack '())

; (: stash Stack)
(define stash '())

; (define-type Definitions (Mutable-HashTable Integer Stack))
(define definitions (make-hash))

; (: current-definition Stack)
(define current-definition '())

(define trace #f)
(define running #f)

;;; stack macros

; (: push! (-> Stack Void))
(define-macro (push! S VAL)
  #'(set! S (cons VAL S)))

; (: pop! (-> Stack Integer))
(define-macro (pop! S)
  #'(let ([x (car S)])
      (set! S (cdr S))
      x))

(define-macro (print! S)
  #'(void (printf "[ ")
  (for ([x (reverse S)]) (printf "~s " x))
  (printf "]\n")))

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
  (define rhs (pop! stack))
  (push! stack (quotient (pop! stack) rhs)))

(define (sub!)
  (define rhs (pop! stack))
  (push! stack (- (pop! stack) rhs)))

(define (pow!)
  (define rhs (pop! stack))
  (push! stack (expt (pop! stack) rhs)))

(define (mod!)
  (define rhs (pop! stack))
  (push! stack (modulo (pop! stack) rhs)))

(define (and!)
  (define rhs (pop! stack))
  (push! stack (bitwise-and (pop! stack) rhs)))

(define (or!)
  (define rhs (pop! stack))
  (push! stack (bitwise-ior (pop! stack) rhs)))

(define (not!)
  (push! stack (bitwise-not (pop! stack))))

(define (shiftr!)
  (define rhs (pop! stack))
  (push! stack (arithmetic-shift (pop! stack) (- rhs))))

(define (shiftl!)
  (define rhs (pop! stack))
  (push! stack (arithmetic-shift (pop! stack) rhs)))

(define (lt!)
    (push! stack (boolean->integer (> (pop! stack) (pop! stack)))))

(define (gt!)
    (push! stack (boolean->integer (< (pop! stack) (pop! stack)))))

(define (eq!)
    (push! stack (boolean->integer (= (pop! stack) (pop! stack)))))

(define (swap!)
  (define rhs (pop! stack))
  (define lhs (pop! stack))
  (push! stack rhs)
  (push! stack lhs))

(define (dup!)
  (push! stack (car stack)))

(define (dump!)
  (print! stack))

(define (clr!)
  (set! stack '()))

(define (rand!)
  (push! stack (random (pop! stack))))

(define (pullr!)
  (push! stack (pop! stash)))

(define (pushr!)
  (push! stash (pop! stack)))

(define (when!)
  (define rhs (pop! stack))
  (define lhs (pop! stack))
  (unless (zero? lhs)
    (call rhs)))

(define (mark-def! op)
  (push! current-definition op)
  (hash-set! definitions op '()))

(define (mark!)
  (mark-def! (pop! stack)))

(define (bra!)
  (mark-def! (next-code!)))

; (: def! (-> Void))
(define (def!)
  (pop! current-definition))

(define (ket!)
  (push (pop! current-definition)))

(define (eval!)
  (call (pop! stack)))

; (: depth! (-> Void))
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
  op_not not!))

;;; internal macros
(define-macro (do-trace V)
  #'(printf "~a\t - ~a\t - ~a~N" (reverse stack) V stash))

(define-macro (call-user OP)
  #'(call-definition (hash-ref definitions OP)))

(define-macro (call-system OP)
  #'((hash-ref system_defs OP)))

;;; Actually call an op on the stack
; (: call-immediate (-> Integer Void))
(define (call-immediate op)
  (when trace (do-trace op))
  (cond
    [(hash-has-key? system_defs op) (call-system op)]
    [(hash-has-key? definitions op) (call-user op)]
    [else (error "unknown op: ~s" op)]))

;;; Actually push a value to the stack
; (: push-immediate (-> Integer Void))
(define (push-immediate val)
  (when trace (do-trace val))
  (push! stack val))

;;; Run the definition (list of deferred ops)
; (: call-definition (-> Integer Void))
(define (call-definition def)
  (unless (empty? def)
    (if (zero? (cadr def))
      (push-immediate (car def))
      (call-immediate (car def))
    )
    (call-definition (cddr def))
  ))

;;; Adds a deferred operation to the current definition
(define-macro (deferred VAL OP)
  #'(hash-set! definitions (car current-definition) (append (hash-ref definitions (car current-definition)) `(,VAL ,OP))))

;;; public calls

; (: push (-> Integer Void))
(define (push val)
  (if (empty? current-definition)
    (push-immediate val)
    (deferred val op_nop))) ;;; currently in a definition

; (: call (-> Integer Void))
(define (call op)
  (cond
    [(empty? current-definition) (call-immediate op)]
    [(eq? op_mark op) (mark!)]
    [(eq? op_def op) (def!)]
    [(eq? op_bra op) (bra!)]
    [(eq? op_ket op) (ket!)]
    [else (deferred op op_eval)] ;;; currently in a definition
  ))

(provide stack stash definitions)
(provide call push)

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

  (check-equal? stack '[91686]))