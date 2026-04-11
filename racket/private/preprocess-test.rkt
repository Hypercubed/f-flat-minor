#lang racket/base

(require rackunit
         rackunit/text-ui
         racket/file
         racket/path
         racket/port
         "preprocess.rkt")

(define (write-text-file path content)
  (call-with-output-file path
    (lambda (out) (display content out))
    #:exists 'truncate/replace))

(define (preprocess-path path)
  (call-with-input-file path
    (lambda (in) (preprocess path in))))

(define (with-temp-dir proc)
  (define dir (make-temporary-file "fbm-racket-preprocess-~a" 'directory))
  (dynamic-wind
    void
    (lambda () (proc dir))
    (lambda () (delete-directory/files dir))))

(define preprocess-tests
  (test-suite
   "preprocess smoke"

   (test-case "legacy relative imports stay file-relative and dedupe canonically"
     (with-temp-dir
      (lambda (dir)
        (define helper-path (build-path dir "helper.ffp"))
        (define main-path (build-path dir "main.ffp"))
        (write-text-file helper-path "helper-word: 1 ;\n")
        (write-text-file main-path ".import helper.ffp\n.import ./helper.ffp\nmain-word: helper-word ;\n")
        (check-equal?
         (preprocess-path main-path)
         "helper-word: 1 ;\n\nmain-word: helper-word ;"))))

   (test-case "default stdlib root resolves angle imports with directory indexes"
     (with-temp-dir
      (lambda (dir)
        (define main-path (build-path dir "main.ffp"))
        (write-text-file main-path ".import <seq>\n")
        (define code (preprocess-path main-path))
        (check-true (regexp-match? #rx"unit:" code))
        (check-true (regexp-match? #rx"reduce!:" code)))))

   (test-case "ordered stdlib roots prefer earlier matches and dedupe resolved paths"
     (with-temp-dir
      (lambda (dir)
        (define root-a (build-path dir "root-a"))
        (define root-b (build-path dir "root-b"))
        (define main-path (build-path dir "main.ffp"))
        (make-directory* (build-path root-a "pkg"))
        (make-directory* root-b)
        (write-text-file (build-path root-a "pkg" "pkg.ffp") "from-a: 1 ;\n")
        (write-text-file (build-path root-b "pkg.ffp") "from-b: 2 ;\n")
        (write-text-file main-path ".import <pkg>\n.import <pkg/pkg.ffp>\n")
        (parameterize ([current-stdlib-roots (list (simplify-path root-a #t)
                                                   (simplify-path root-b #t))])
          (check-equal? (preprocess-path main-path) "from-a: 1 ;\n")))))))

(module+ test
  (exit (if (zero? (run-tests preprocess-tests)) 0 1)))
