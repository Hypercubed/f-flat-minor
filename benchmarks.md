| Command | Mean [ms] | Min [ms] | Max [ms] | Relative |
|:---|---:|---:|---:|---:|
| `./cpp/build/fact` | 1.1 ± 1.1 | 0.1 | 9.8 | 1.00 |
| `./deno/build/execute ./ff/example.ffb` | 34.3 ± 4.1 | 29.2 | 47.1 | 30.47 ± 30.68 |
| `./go/build/execute --in ./ff/example.ffb` | 6.6 ± 1.1 | 4.7 | 13.8 | 5.88 ± 5.97 |
| `./cpp/build/run ./ff/example.ff` | 6.7 ± 0.8 | 5.5 | 11.3 | 5.92 ± 5.95 |
| `cat ./ff/example_v0.ff \| ./dart/bin/dart.exe` | 17.3 ± 2.5 | 14.1 | 27.5 | 15.38 ± 15.54 |
| `cat ./ff/example.ff \| ./python/execute.py` | 26.9 ± 5.1 | 20.1 | 45.1 | 23.93 ± 24.34 |
| `cat ./ff/example.ff \| ./ruby/execute.rb` | 63.3 ± 6.7 | 56.9 | 87.0 | 56.19 ± 56.47 |
| `./racket/build/example` | 225.9 ± 14.3 | 209.2 | 251.4 | 200.68 ± 200.96 |
