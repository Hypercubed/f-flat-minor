| Command | Mean [ms] | Min [ms] | Max [ms] | Relative |
|:---|---:|---:|---:|---:|
| `./deno/build/execute ./ff/example.ffb` | 25.7 ± 0.4 | 25.1 | 27.1 | 6.42 ± 0.63 |
| `./go/build/execute --in ./ff/example.ffb` | 4.0 ± 0.4 | 2.7 | 5.6 | 1.00 |
| `cat ./ff/example.ff \| ./cpp/build/run` | 4.5 ± 0.3 | 4.0 | 5.7 | 1.12 ± 0.13 |
| `cat ./ff/example_v0.ff \| ./dart/bin/dart.exe` | 12.1 ± 0.7 | 11.0 | 14.7 | 3.03 ± 0.34 |
| `cat ./ff/example.ff \| ./python/execute.py` | 16.5 ± 0.3 | 15.8 | 17.9 | 4.12 ± 0.41 |
| `cat ./ff/example.ff \| ./ruby/execute.rb` | 49.2 ± 0.9 | 47.8 | 53.9 | 12.30 ± 1.21 |
| `./racket/build/example` | 175.6 ± 0.4 | 174.7 | 176.4 | 43.88 ± 4.25 |
