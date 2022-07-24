#!/usr/bin/env racket

#lang br/quicklang

(require ff/private/reader ff/private/preprocess ff/commands/run ff/commands/repl)
(provide read-syntax ff-eval ff-run-file ff-run-repl)

(module+ main
  (require racket/cmdline)
  (require racket/match)

  (define pp-only (make-parameter #f))
  (define evaluate (make-parameter #f))
  (define pp (make-parameter #t))

  (command-line
    #:usage-help
    "Run with a filename to execute the file."
    "Run with `-` as the filename to read from stdin."
    "Run without filename to enter the REPL."

    #:once-each
    [("--pp-only")
      "run preprocessor to stdout and exit"
      (pp-only #t)]

    [("-e" "--eval") EVALUATE
      "Evaluate expression and exit"
      (evaluate EVALUATE)]

    [("--no-pp")
      "Disable preprocessor"
      (pp #f)]

    #:args ([filename #f])

    (when (evaluate)
      (ff-eval (evaluate))
      (exit)
    )

    (when (pp-only)
      (define port (open-input-file filename))
      (displayln (preprocess filename port))
      (exit)
    )

    (cond
      [(not filename) (ff-run-repl #:pp (pp))]
      [(equal? filename "-") (ff-run-repl #:pp (pp) #:echo #f)]
      [else (ff-run-file filename #:pp (pp))])
  )
)
