---
id: benchmark-profiling-stuck-processes
title: Benchmarks obstructed by lingering runtimes
date: 2026-05-11
---

## Symptom

When measuring performance changes or running engine benchmarks, results appear surprisingly slow, inconsistent, or unchanged between different code iterations. CPU usage might be unexpectedly high before the benchmark even starts.

## Cause

Previous benchmark runs or cancelled Deno/Bun executions may have left lingering background processes (e.g., `deno run` or `bun run`) that are silently consuming CPU cycles, thus skewing benchmark timings.

## Fix

Before running critical benchmarks, clean up the environment by killing stray processes.

```bash
pkill -f deno
pkill -f bun
```

After doing so, ensure you have a clean environment and run your benchmarks again.
