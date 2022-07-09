#lang br/quicklang

(define op_dump (char->integer #\.))
(define op_add  (char->integer #\+))
(define op_sub  (char->integer #\-))
(define op_mul  (char->integer #\*))
(define op_div  (char->integer #\/))
(define op_pow  (char->integer #\^))
(define op_swap (char->integer #\$))
(define op_mod  (char->integer #\%))
(define op_mark (char->integer #\:))
(define op_def  (char->integer #\;))
(define op_pushr 14)
(define op_pullr 15)
(define op_clr 24)
(define op_dup (char->integer #\!))
(define op_when (char->integer #\?))

(define symbols (make-hash))
(hash-set! symbols "." op_dump)
(hash-set! symbols "+" op_add)
(hash-set! symbols "-" op_sub)
(hash-set! symbols "*" op_mul)
(hash-set! symbols "/" op_div)
(hash-set! symbols "^" op_pow)
(hash-set! symbols "swap" op_swap)
(hash-set! symbols "%" op_mod)
(hash-set! symbols ":" op_mark)
(hash-set! symbols ";" op_def)
(hash-set! symbols "q<" op_pushr)
(hash-set! symbols "q>" op_pullr)
(hash-set! symbols "clr" op_clr)
(hash-set! symbols "?" op_when)
(hash-set! symbols "dup" op_dup)

(define next-op 0)

(define (pointer->token str)
  ;;; (displayln str)
  (substring str 1 (- (string-length str) 1))
  ;;; (displayln (substring str 1 (- (string-length str) 1)))
)

(define (add-token token)
  (set! next-op (- next-op 1))
  (hash-set! symbols token next-op)
  next-op
)

(define (lookup token)
  (cond
    [(integer? (string->number token)) token]
    [(pointer? token)
      (define x (pointer->token token))
      (if (hash-has-key? symbols x)
        (hash-ref symbols x)
        (add-token x)
      )
    ]
    [(hash-has-key? symbols token) (hash-ref symbols token)]
    [#t 
      (add-token token)
    ]
  )
)

;;; Reader
(define (pointer? token)
  (and (string? token)
       (string-length token)
       (eq? (string-ref token 0) #\[)
  )
)

(define (op token)
  (cond
    [(integer? (string->number token)) "push"]
    [(pointer? token) "push"]
    [#t "call"]
  ))

(define (tokenize port)
  (flatten (map string-split (port->lines port))))

(define (read src-tokens)
  (define values (map lookup src-tokens))
  (define ops (map op src-tokens))
  (define src-datums (format-datums '(~a ~a) ops values))
  ;;; (displayln src-datums)
  (define module-datum `(module anything
    "ff.rkt"
    ;;; br
  ,@src-datums))
  (datum->syntax #f module-datum)
)

(define (read-syntax path port)
  (read (tokenize port)))
(provide read-syntax)

;;; expander
(define-macro (stacker-module-begin HANDLE-EXPR ...)
  #'(#%module-begin HANDLE-EXPR ... ))
(provide (rename-out [stacker-module-begin #%module-begin]))

;;; engine
(define stack empty)
(define queue empty)
(define depth 0)

;;; engine ops
(define (pop-stack!)
  (define arg (first stack))
  (set! stack (rest stack))
  arg)

(define (push-stack! arg)
  (set! stack (cons arg stack)))

(define (pop-queue!)
  (define arg (first queue))
  (set! queue (rest queue))
  arg)

(define (push-queue! arg)
  (set! queue (cons arg queue)))

(define (prn-list! s)
  (printf "[ ")
  (for ([x (reverse s)]) (printf "~s " x))
  (printf "]\n")
  )

;;; system ops
(define (add-stack!)
  (push-stack! (+ (pop-stack!) (pop-stack!))))

(define (mul-stack!)
  (push-stack! (* (pop-stack!) (pop-stack!))))

(define (div-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (quotient b a))))

(define (sub-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (- b a))))

(define (pow-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (expt b a))))

(define (mod-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (modulo b a))))

(define (swap-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! a)
    (push-stack! b)))

(define (dup-stack!)
  (let ([a (pop-stack!)])
    (push-stack! a)
    (push-stack! a)))

(define (prn-stack!)
  (prn-list! stack)
  ;;; (prn-list! queue)
  )

(define (clr-stack!)
  (set! stack empty))

(define (pullr!)
  (push-stack! (pop-queue!)))

(define (pushr!)
  (push-queue! (pop-stack!)))

(define (when!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (when (not (eq? b 0))
      (call-op a)
    )
  ))

(define (mark!)
  (set! depth (+ depth 1))
  (push-stack! (length queue)))

(define (def!)
  (set! depth (- depth 1))
  (define l (- (length queue) (pop-stack!)))
  (define s (pop-stack!))
  (define def empty)
  (for ([i l])
    (set! def (cons (pop-queue!) def))
  )
  (hash-set! definitions s def)
)

(define definitions (make-hash))
(hash-set! definitions op_add add-stack!)
(hash-set! definitions op_mul mul-stack!)
(hash-set! definitions op_pow pow-stack!)
(hash-set! definitions op_sub sub-stack!)
(hash-set! definitions op_div div-stack!)
(hash-set! definitions op_mod mod-stack!)
(hash-set! definitions op_swap swap-stack!)
(hash-set! definitions op_clr clr-stack!)
(hash-set! definitions op_pushr pushr!)
(hash-set! definitions op_pullr pullr!)
(hash-set! definitions op_dump prn-stack!)
(hash-set! definitions op_def def!)
(hash-set! definitions op_mark mark!)
(hash-set! definitions op_when when!)
(hash-set! definitions op_dup dup-stack!)

;;; IR ops
(define (push x)
  (cond
    [(> depth 0) (push-queue! `(push ,x))]
    [#t (push-stack! x)]
  )
)

(define (eval* op) 
  (match op
    [(list 'push b) (push b)]
    [(list 'call b) (call b)]
  )
)

(define (call-op op)
  (define def (hash-ref definitions op))
  (cond
    [(list? def) (map eval* def)]
    [#t (def)]
  )
)

(define trace #f)

(define (call [arg #f])

  ;;; (displayln (string? arg))

  (cond
    [(eq? op_def arg) (def!)]
    [(eq? op_mark arg) (mark!)]
    [(> depth 0) (push-queue! `(call ,arg))]
    [(hash-has-key? definitions arg) (call-op arg)]
    [#t (error "unknown op: ~s" arg)]
  )

  (when trace (printf "~a\t -> ~a~N" arg stack))
)

(provide call push)