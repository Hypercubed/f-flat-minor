SHELL := /bin/bash
SUBDIRS := deno go python ruby

define FOREACH
	@for DIR in $(SUBDIRS);\
	do \
		$(MAKE) -C $$DIR $(1) --no-print-directory; \
	done
endef

.DEFAULT_GOAL := default

.PHONY: default
default: test clean

.PHONY: clean
clean:
	$(call FOREACH,$@)

.PHONY: test
test:
	$(call FOREACH,$@)