| Command | Mean [ms] | Min [ms] | Max [ms] | Relative |
|:---|---:|---:|---:|---:|
| `./deno/build/run ./ff/example.ff` | 52.0 ± 1.1 | 49.7 | 55.8 | 31.29 ± 4.00 |
| `./go/build/run --in ./ff/example.ff` | 1.7 ± 0.2 | 1.3 | 3.0 | 1.00 |
| `cat ./ff/example.ff \| ./cpp/build/run` | 3.7 ± 0.3 | 3.3 | 7.0 | 2.21 ± 0.35 |
| `cat ./ff/example_v0.ff \| ./dart/bin/dart.exe` | 5.4 ± 0.4 | 4.7 | 7.3 | 3.23 ± 0.47 |
| `cat ./ff/example.ff \| ./python/execute.py` | 21.6 ± 1.0 | 20.4 | 31.9 | 12.96 ± 1.74 |
| `cat ./ff/example.ff \| ./ruby/execute.rb` | 44.2 ± 1.3 | 42.8 | 50.3 | 26.59 ± 3.44 |
| `racket ./racket/main.rkt ./ff/example.ff` | 864.9 ± 10.1 | 853.9 | 883.6 | 520.02 ± 65.80 |
