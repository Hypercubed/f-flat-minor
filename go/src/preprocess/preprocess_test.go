package preprocess

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"
)

func TestProcessPreservesRelativeImports(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	libFile := filepath.Join(tmpDir, "lib", "helper.ffp")

	check(os.MkdirAll(filepath.Dir(libFile), 0o755))
	check(os.WriteFile(libFile, []byte("41\n"), 0o644))

	output := New(mainFile).Process(".load ./lib/helper.ffp\n", mainFile)
	assertContains(t, output, "41")
}

func TestProcessResolvesStdlibImports(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	stdlibRoot := filepath.Join(tmpDir, "stdlib")
	stdlibFile := filepath.Join(stdlibRoot, "prelude.ffp")

	check(os.MkdirAll(filepath.Dir(stdlibFile), 0o755))
	check(os.WriteFile(stdlibFile, []byte("99\n"), 0o644))

	output := NewWithOptions(mainFile, Options{StdlibRoots: []string{stdlibRoot}}).Process(
		".import <prelude>\n",
		mainFile,
	)
	assertContains(t, output, "99")
}

func TestProcessResolvesStdlibDirectoryIndex(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	stdlibRoot := filepath.Join(tmpDir, "stdlib")
	indexFile := filepath.Join(stdlibRoot, "math", "math.ffp")

	check(os.MkdirAll(filepath.Dir(indexFile), 0o755))
	check(os.WriteFile(indexFile, []byte("7\n"), 0o644))

	output := NewWithOptions(mainFile, Options{StdlibRoots: []string{stdlibRoot}}).Process(
		".load <math>\n",
		mainFile,
	)
	assertContains(t, output, "7")
}

func TestProcessStdlibRootOrdering(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	firstRoot := filepath.Join(tmpDir, "first")
	secondRoot := filepath.Join(tmpDir, "second")
	firstFile := filepath.Join(firstRoot, "prelude.ffp")
	secondFile := filepath.Join(secondRoot, "prelude.ffp")

	check(os.MkdirAll(filepath.Dir(firstFile), 0o755))
	check(os.MkdirAll(filepath.Dir(secondFile), 0o755))
	check(os.WriteFile(firstFile, []byte("1\n"), 0o644))
	check(os.WriteFile(secondFile, []byte("2\n"), 0o644))

	output := NewWithOptions(mainFile, Options{StdlibRoots: []string{firstRoot, secondRoot}}).Process(
		".load <prelude>\n",
		mainFile,
	)
	assertContains(t, output, "1")
	assertNotContains(t, output, "2")
}

func TestProcessStdlibImportErrorIncludesRoots(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	firstRoot := filepath.Join(tmpDir, "first")
	secondRoot := filepath.Join(tmpDir, "second")

	message := panicMessage(func() {
		NewWithOptions(mainFile, Options{StdlibRoots: []string{firstRoot, secondRoot}}).Process(
			".import <missing>\n",
			mainFile,
		)
	})
	assertContains(t, message, "Stdlib import not found: <missing>")
	assertContains(t, message, firstRoot)
	assertContains(t, message, secondRoot)
}

func TestProcessDedupesStdlibEquivalentSpellings(t *testing.T) {
	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	stdlibRoot := filepath.Join(tmpDir, "stdlib")
	stdlibFile := filepath.Join(stdlibRoot, "math", "sqrt.ffp")

	check(os.MkdirAll(filepath.Dir(stdlibFile), 0o755))
	check(os.WriteFile(stdlibFile, []byte("__hidden: __hidden\n"), 0o644))

	output := NewWithOptions(mainFile, Options{StdlibRoots: []string{stdlibRoot}}).Process(
		".import <math/sqrt>\n.import <math/sqrt.ffp>\n",
		mainFile,
	)
	if matches := regexp.MustCompile(`__[a-z0-9_]+_[a-z0-9]+__hidden`).FindAllString(output, -1); len(matches) != 2 {
		t.Fatalf("expected one imported file mangled once, got %d matches in %q", len(matches), output)
	}
}

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

func TestBuildStdlibRootsOrdersDefaultEnvAndCLI(t *testing.T) {
	t.Setenv("FBM_STDLIB_PATH", strings.Join([]string{"env-one", "env-two"}, string(os.PathListSeparator)))
	roots := BuildStdlibRoots([]string{"cli-one", "cli-two"})
	if len(roots) < 4 {
		t.Fatalf("expected built roots to include env and cli entries, got %v", roots)
	}
	assertContains(t, strings.Join(roots, "\n"), canonicalizePath("env-one"))
	assertContains(t, strings.Join(roots, "\n"), canonicalizePath("env-two"))
	assertContains(t, strings.Join(roots, "\n"), canonicalizePath("cli-one"))
	assertContains(t, strings.Join(roots, "\n"), canonicalizePath("cli-two"))
	assertPathOrder(t, roots, canonicalizePath("env-one"), canonicalizePath("cli-one"))
	assertPathOrder(t, roots, canonicalizePath("env-two"), canonicalizePath("cli-two"))
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

func assertNotContains(t *testing.T, output string, want string) {
	t.Helper()
	if strings.Contains(output, want) {
		t.Fatalf("expected output not to contain %q, got %q", want, output)
	}
}

func assertPathOrder(t *testing.T, values []string, earlier string, later string) {
	t.Helper()
	earlierIndex := -1
	laterIndex := -1
	for i, value := range values {
		if value == earlier && earlierIndex == -1 {
			earlierIndex = i
		}
		if value == later && laterIndex == -1 {
			laterIndex = i
		}
	}
	if earlierIndex == -1 || laterIndex == -1 || earlierIndex >= laterIndex {
		t.Fatalf("expected %q before %q in %v", earlier, later, values)
	}
}

func panicMessage(fn func()) string {
	var recovered any
	func() {
		defer func() {
			recovered = recover()
		}()
		fn()
	}()
	if recovered == nil {
		return ""
	}
	return fmt.Sprint(recovered)
}

func mapFromSlice(values []string) map[string]bool {
	ret := make(map[string]bool, len(values))
	for _, value := range values {
		ret[value] = true
	}
	return ret
}
