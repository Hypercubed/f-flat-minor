| Command | Mean [ms] | Min [ms] | Max [ms] | Relative |
|:---|---:|---:|---:|---:|
| `./cpp/build/fact` | 1.0 ± 0.2 | 0.7 | 6.7 | 1.00 |
| `./deno/build/execute ./ff/example.ffb` | 47.5 ± 2.3 | 44.1 | 56.1 | 45.24 ± 10.47 |
| `./go/build/execute --in ./ff/example.ffb` | 1.8 ± 0.2 | 1.3 | 3.3 | 1.69 ± 0.44 |
| `./cpp/build/run ./ff/example.ff` | 3.9 ± 0.6 | 3.3 | 9.5 | 3.74 ± 1.02 |
| `cat ./ff/example_v0.ff \| ./dart/bin/dart.exe` | 6.0 ± 0.5 | 5.1 | 8.1 | 5.68 ± 1.38 |
| `cat ./ff/example.ff \| ./python/execute.py` | 24.3 ± 2.3 | 22.1 | 34.0 | 23.11 ± 5.68 |
| `cat ./ff/example.ff \| ./ruby/execute.rb` | 50.6 ± 3.5 | 46.9 | 60.9 | 48.22 ± 11.41 |
| `./racket/build/example` | 354.2 ± 8.8 | 345.7 | 373.2 | 337.52 ± 76.77 |
