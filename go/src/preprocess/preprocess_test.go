package preprocess

import (
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"
)

func TestProcessManglingImportedPrivateWords(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	privateFile := filepath.Join(tmpDir, "lib", "private.ffp")
	loadedFile := filepath.Join(tmpDir, "lib", "loaded.ffp")

	check(os.MkdirAll(filepath.Dir(privateFile), 0o755))
	check(os.WriteFile(
		mainFile,
		[]byte(".import ./lib/private.ffp\n.load ./lib/loaded.ffp\n[__root_symbol]\n"),
		0o644,
	))
	check(os.WriteFile(
		privateFile,
		[]byte("__local: __local [__local] __(wrapped) (__local)\n"),
		0o644,
	))
	check(os.WriteFile(
		loadedFile,
		[]byte("__loaded: __loaded [__loaded]\n"),
		0o644,
	))

	output := New(mainFile).Process(
		".import ./lib/private.ffp\n.load ./lib/loaded.ffp\n[__root_symbol]\n",
		mainFile,
	)

	assertMatch(t, output, `__lib_private_ffp_[a-z0-9]+__local:`)
	assertMatch(t, output, `\[__lib_private_ffp_[a-z0-9]+__local\]`)
	assertMatch(t, output, `__lib_private_ffp_[a-z0-9]+__\(wrapped\)`)
	assertContains(t, output, "(__local)")
	assertContains(t, output, "__loaded: __loaded [__loaded]")
	assertContains(t, output, "[__root_symbol]")
}

func TestProcessUsesDistinctPrefixesWhenSanitizedPathsCollide(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	firstPrivate := filepath.Join(tmpDir, "a-b", "private.ffp")
	secondPrivate := filepath.Join(tmpDir, "a", "b-private.ffp")

	check(os.MkdirAll(filepath.Dir(firstPrivate), 0o755))
	check(os.MkdirAll(filepath.Dir(secondPrivate), 0o755))
	check(os.WriteFile(
		mainFile,
		[]byte(".import ./a-b/private.ffp\n.import ./a/b-private.ffp\n"),
		0o644,
	))
	check(os.WriteFile(firstPrivate, []byte("__hidden: __hidden\n"), 0o644))
	check(os.WriteFile(secondPrivate, []byte("__hidden: __hidden\n"), 0o644))

	output := New(mainFile).Process(
		".import ./a-b/private.ffp\n.import ./a/b-private.ffp\n",
		mainFile,
	)

	matches := regexp.MustCompile(`__a_b_private_ffp_[a-z0-9]+__`).FindAllString(output, -1)
	if len(matches) != 4 {
		t.Fatalf("expected 4 mangled prefix matches, got %d in %q", len(matches), output)
	}
	if len(mapFromSlice(matches)) != 2 {
		t.Fatalf("expected 2 distinct prefixes, got %v", matches)
	}
}

func assertContains(t *testing.T, output string, want string) {
	t.Helper()
	if !strings.Contains(output, want) {
		t.Fatalf("expected output to contain %q, got %q", want, output)
	}
}

func assertMatch(t *testing.T, output string, pattern string) {
	t.Helper()
	if !regexp.MustCompile(pattern).MatchString(output) {
		t.Fatalf("expected output to match %q, got %q", pattern, output)
	}
}

func mapFromSlice(values []string) map[string]bool {
	ret := make(map[string]bool, len(values))
	for _, value := range values {
		ret[value] = true
	}
	return ret
}
