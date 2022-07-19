| Command                                         |   Mean [ms] | Min [ms] | Max [ms] |       Relative |
| :---------------------------------------------- | ----------: | -------: | -------: | -------------: |
| `./cpp/build/fact`                              |   0.8 ± 0.2 |      0.3 |      1.8 |           1.00 |
| `./deno/build/execute ./ff/example.ffb`         |  27.7 ± 0.4 |     26.8 |     29.0 |   34.58 ± 8.03 |
| `./go/build/execute --in ./ff/example.ffb`      |   5.9 ± 0.4 |      4.5 |      7.6 |    7.43 ± 1.79 |
| `cat ./ff/example.ff \| ./cpp/build/run`        |   6.5 ± 0.3 |      5.9 |      8.0 |    8.12 ± 1.91 |
| `cat ./ff/example_v0.ff \| ./dart/bin/dart.exe` |  14.2 ± 0.7 |     13.0 |     16.7 |   17.71 ± 4.19 |
| `cat ./ff/example.ff \| ./python/execute.py`    |  18.6 ± 0.4 |     17.9 |     20.9 |   23.17 ± 5.40 |
| `cat ./ff/example.ff \| ./ruby/execute.rb`      |  51.3 ± 0.7 |     50.5 |     55.2 |  64.11 ± 14.90 |
| `./racket/build/example`                        | 178.0 ± 0.8 |    176.8 |    179.6 | 222.29 ± 51.57 |
