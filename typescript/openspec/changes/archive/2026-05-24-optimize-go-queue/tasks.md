## 1. Implement FastQueue

- [x] 1.1 Implement `FastQueue` struct and its initialization constructor in `go/src/engine/engine.go`.
- [x] 1.2 Implement ring buffer methods on `FastQueue`: `expand()`, `Push()`, `UnshiftArray()`, `Shift()`, `Pop()`, and `Len()`.


## 2. Refactor Engine execution

- [x] 2.1 Update global queue variable `queue` in `go/src/engine/engine.go` to use `*FastQueue`.
- [x] 2.2 Refactor `queuePush()`, `queuePop()`, and other queue interactions to use `FastQueue` operations.
- [x] 2.3 Refactor the VM loop in `Run()` and the word lookup prepending in `call()` to use `FastQueue` methods.


## 3. Verification & Benchmark

- [x] 3.1 Run Go engine tests (`mise exec -- chomp test:go` or go tests) to verify behavior correctness.
- [x] 3.2 Run and time `ff/euler/euler7.ffp` using the Go VM runner to measure performance improvement.


