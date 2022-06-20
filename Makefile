SHELL := /bin/bash
SUBDIRS := deno go python ruby dart

define FOREACH
	@for DIR in $(SUBDIRS);\
	do \
		$(MAKE) -s -C $$DIR $(1) --no-print-directory; \
	done
endef

.DEFAULT_GOAL := default

.PHONY: default
default: test

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