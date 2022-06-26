include defs.mk

.DEFAULT_GOAL := test

./ff/lib/primes-encoded.ff: ./ff/encode-primes.ffp
	@./deno/bin/ff run ./ff/encode-primes.ffp > ./ff/lib/primes-encoded.ff
	@echo ""

.PHONY: build
build:
	@$(MAKE) -s -C deno $@ --no-print-directory;
	@$(MAKE) -s -C go $@ --no-print-directory;
	@$(MAKE) -s -C dart $@ --no-print-directory;
	@echo ""

.PHONY: clean
clean:
	$(call FOREACH,$@)

.PHONY: test
test: build
	$(call FOREACH,$@)

.PHONY: ff
ff: build
	$(call FOREACH,$@)

.PHONY: interpret
interpret: build
	$(call FOREACH,$@)

.PHONY: compile
compile: build
	$(call FOREACH,$@)

.PHONY: execute
execute: build
	$(call FOREACH,$@)