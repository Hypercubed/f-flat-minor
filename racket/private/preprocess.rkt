#lang racket

(require racket/path)
(require racket/set)

(define imported (mutable-set '()))

(define (get-path path [base (current-directory)])
  (set! path (string-replace path "\"" ""))
  (set! path (build-path (current-directory) (path-only base) path))
  (set! path (find-relative-path	(current-directory) (normalize-path path)))
  path)

(define (do-load path line)
  (begin
    (define filepath (get-path (second (string-split line)) path))

    (define port (open-input-file filepath))
    (preprocess filepath port)
  ))

(define (do-import path line)
  (begin
    (define filepath (get-path (second (string-split line)) path))
    (define code "")
    (unless (set-member? imported filepath)
      (set-add! imported filepath)
      (set! code (preprocess filepath (open-input-file filepath)))          
    )
    code
  ))

(define (process-line line [path (current-directory)])
  (cond
    [(string-prefix? line "#") ""]
    [(< (string-length line) 2) line]
    [(string-prefix? line ".")
      (define cmd (string-trim (car (string-split line))))
      (cond
        [(< (string-length cmd) 2) line]
        [(equal? cmd ".load") (do-load path line)]
        [(equal? cmd ".import") (do-import path line)]
        [(equal? cmd ".m") line]  ;;; For now let the interpertor handle these
        [else ""]
      )
    ]
    [else line]
  )

  ;;; (define cmd (first (string-split line)))
  ;;; (displayln cmd)

  ;;; (cond
  ;;;   [(= (string-length line) 0) ""]
  ;;;   [(string-prefix? line "#") ""]
  ;;;   [(string-prefix? line ".load") 
  ;;;     (begin
  ;;;       (define filepath (get-path (second (string-split line)) path))

  ;;;       (define port (open-input-file filepath))
  ;;;       (preprocess filepath port)
  ;;;     )
  ;;;   ]
  ;;;   [(string-prefix? line ".import") 
  ;;;     (begin
  ;;;       (define filepath (get-path (second (string-split line)) path))
  ;;;       (define code "")
  ;;;       (unless (set-member? imported filepath)
  ;;;         (set-add! imported filepath)
  ;;;         (set! code (preprocess filepath (open-input-file filepath)))          
  ;;;       )
  ;;;       code
  ;;;     )
  ;;;   ]
  ;;;   [(string-prefix? line ".") ""]  ;;; be carefull
  ;;;   [else line]
  ;;; )
)

(define (preprocess path port)
  (define lines (port->lines port))
  (define processed (map (lambda (line) (process-line line path)) lines))
  (define code (string-join processed "\n"))
  code
)

(provide preprocess)