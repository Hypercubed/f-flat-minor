#lang br/quicklang

(require racket/cmdline "./src/reader.rkt")
(require racket/match)

(command-line
  #:args (filename)


  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in))))

  ;;; eval module form in a namespace with racket/base
  (define ns (make-base-namespace))
    (namespace-attach-module (current-namespace) 'br ns)
    (namespace-attach-module (current-namespace) 'racket ns)
    (current-namespace ns)
    (namespace-require 'br)
    (namespace-require 'racket)

  (eval module-syntax ns)

  ;; require the module in the namespace to run it
  (eval `(require ',(second (syntax->datum module-syntax))) ns)
)