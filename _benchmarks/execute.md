| Command | Mean [µs] | Min [µs] | Max [µs] | Relative |
|:---|---:|---:|---:|---:|
| `./cpp/build/fact` | 759.4 ± 47.3 | 659.8 | 1555.2 | 1.00 |
| `./go/build/execute --in ./ff/example.ffb` | 1245.0 ± 75.8 | 1035.2 | 1697.6 | 1.64 ± 0.14 |
| `./bun/build/ff-execute ./ff/example.ffb` | 21536.7 ± 733.6 | 19965.7 | 23459.2 | 28.36 ± 2.01 |
| `./deno/build/ff-execute ./ff/example.ffb` | 28636.7 ± 1887.0 | 26393.8 | 36643.5 | 37.71 ± 3.42 |
| `./node/bin/ff-execute.ts ./ff/example.ffb` | 82682.7 ± 2357.6 | 77782.2 | 88177.7 | 108.88 ± 7.47 |
| `./racket/main.rkt ./ff/example.ffb` | 202982.5 ± 8105.4 | 191259.6 | 224673.0 | 267.30 ± 19.79 |
