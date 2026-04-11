package preprocess

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"
)

type Options struct {
	StdlibRoots []string
}

type Resolver struct {
	stdlibRoots []string
}

type Processor struct {
	imported       map[string]bool
	importPrefixes map[string]string
	rootFilename   string
	resolver       *Resolver
}

var reMacro = regexp.MustCompile(`^\.[^\s]`)
var reSafePath = regexp.MustCompile(`[^A-Za-z0-9]+`)
var reUnderscores = regexp.MustCompile(`_+`)

func New(rootFilename string) *Processor {
	return NewWithOptions(rootFilename, Options{})
}

func NewWithOptions(rootFilename string, options Options) *Processor {
	if rootFilename == "-" {
		rootFilename = ""
	}
	rootFilename = canonicalizePath(rootFilename)
	return &Processor{
		imported:       make(map[string]bool),
		importPrefixes: make(map[string]string),
		rootFilename:   rootFilename,
		resolver:       NewResolver(options),
	}
}

func NewResolver(options Options) *Resolver {
	return &Resolver{stdlibRoots: normalizePaths(options.StdlibRoots)}
}

func DefaultStdlibRoots() []string {
	roots := make([]string, 0, 2)
	seen := make(map[string]bool)
	add := func(candidate string) {
		if candidate == "" {
			return
		}
		candidate = canonicalizePath(candidate)
		if candidate == "" || seen[candidate] {
			return
		}
		if info, err := os.Stat(candidate); err == nil && info.IsDir() {
			seen[candidate] = true
			roots = append(roots, candidate)
		}
	}

	if executable, err := os.Executable(); err == nil {
		dir := filepath.Dir(canonicalizePath(executable))
		for i := 0; i < 6; i++ {
			add(filepath.Join(dir, "ff", "lib"))
			dir = filepath.Dir(dir)
		}
	}

	if _, currentFile, _, ok := runtime.Caller(0); ok {
		repoRoot := filepath.Clean(filepath.Join(filepath.Dir(currentFile), "..", "..", ".."))
		add(filepath.Join(repoRoot, "ff", "lib"))
	}

	return roots
}

func StdlibRootsFromEnv() []string {
	value := os.Getenv("FBM_STDLIB_PATH")
	if value == "" {
		return nil
	}
	return normalizePaths(filepath.SplitList(value))
}

func BuildStdlibRoots(extra []string) []string {
	roots := make([]string, 0, len(extra)+4)
	roots = append(roots, DefaultStdlibRoots()...)
	roots = append(roots, StdlibRootsFromEnv()...)
	roots = append(roots, normalizePaths(extra)...)
	return dedupePaths(roots)
}

func (p *Processor) Process(code string, filename string) string {
	return p.processCode(code, filename, "", false)
}

func (p *Processor) ProcessLoadedForCompile(code string, filename string) string {
	return p.processCode(code, filename, "", true)
}

func (p *Processor) ProcessImportedForCompile(code string, filename string) string {
	return p.processCode(code, filename, filename, true)
}

func (p *Processor) MarkImported(filename string) bool {
	if p.imported[filename] {
		return false
	}
	p.imported[filename] = true
	return true
}

func (p *Processor) processCode(
	code string,
	filename string,
	importScopeFilename string,
	preserveCompilerDirectives bool,
) string {
	lines := strings.Split(code, "\n")
	result := make([]string, 0, len(lines))
	for _, line := range lines {
		processed := p.processLine(
			line,
			filename,
			importScopeFilename,
			preserveCompilerDirectives,
		)
		if processed != "" {
			result = append(result, processed)
		}
	}
	return strings.Join(result, "\n")
}

func (p *Processor) processLine(
	line string,
	filename string,
	importScopeFilename string,
	preserveCompilerDirectives bool,
) string {
	if !reMacro.MatchString(line) {
		if importScopeFilename != "" {
			return p.mangleImportedLine(line, importScopeFilename)
		}
		return line
	}

	tokens := regexp.MustCompile(`\s`).Split(line, 2)
	cmd := tokens[0]

	switch cmd {
	case ".load":
		if len(tokens) < 2 {
			return ""
		}
		filepath := p.ResolveImport(tokens[1], filename)
		dat, err := os.ReadFile(filepath)
		check(err)
		return p.processCode(
			string(dat),
			filepath,
			"",
			preserveCompilerDirectives,
		)
	case ".import":
		if len(tokens) < 2 {
			return ""
		}
		filepath := p.ResolveImport(tokens[1], filename)
		if !p.MarkImported(filepath) {
			return ""
		}
		dat, err := os.ReadFile(filepath)
		check(err)
		return p.processCode(
			string(dat),
			filepath,
			filepath,
			preserveCompilerDirectives,
		)
	case ".exit":
		if preserveCompilerDirectives {
			return line
		}
		os.Exit(0)
		return ""
	case ".m", ".ff", ".ffp":
		if preserveCompilerDirectives {
			return line
		}
		return ""
	default:
		if preserveCompilerDirectives {
			return line
		}
		return ""
	}
}

func (p *Processor) ResolveImport(specifier string, source string) string {
	return p.resolver.ResolveImport(specifier, source)
}

func (p *Processor) mangleImportedLine(line string, importScopeFilename string) string {
	prefix := p.getImportPrefix(importScopeFilename)
	var builder strings.Builder
	for i := 0; i < len(line); {
		if isWhitespace(line[i]) {
			j := i + 1
			for j < len(line) && isWhitespace(line[j]) {
				j++
			}
			builder.WriteString(line[i:j])
			i = j
			continue
		}

		j := i + 1
		for j < len(line) && !isWhitespace(line[j]) {
			j++
		}
		builder.WriteString(mangleImportedToken(line[i:j], prefix))
		i = j
	}
	return builder.String()
}

func mangleImportedToken(token string, prefix string) string {
	if strings.HasPrefix(token, "[__") {
		return "[" + prefix + token[3:]
	}
	if strings.HasPrefix(token, "__") {
		return prefix + token[2:]
	}
	return token
}

func (p *Processor) getImportPrefix(importScopeFilename string) string {
	if prefix, ok := p.importPrefixes[importScopeFilename]; ok {
		return prefix
	}

	normalizedPath := p.getNormalizedImportPath(importScopeFilename)
	safePath := reSafePath.ReplaceAllString(normalizedPath, "_")
	safePath = strings.Trim(safePath, "_")
	safePath = reUnderscores.ReplaceAllString(safePath, "_")
	if safePath == "" {
		safePath = "module"
	}

	prefix := fmt.Sprintf("__%s_%s__", safePath, hashPath(importScopeFilename))
	p.importPrefixes[importScopeFilename] = prefix
	return prefix
}

func (p *Processor) getNormalizedImportPath(importScopeFilename string) string {
	if p.rootFilename != "" {
		rootDir := filepath.Dir(p.rootFilename)
		if relativePath, err := filepath.Rel(rootDir, importScopeFilename); err == nil && relativePath != "" {
			return filepath.ToSlash(relativePath)
		}
	}
	return filepath.ToSlash(importScopeFilename)
}

func hashPath(importScopeFilename string) string {
	hash := uint32(0x811c9dc5)
	for i := 0; i < len(importScopeFilename); i++ {
		hash ^= uint32(importScopeFilename[i])
		hash *= 0x01000193
	}
	return toBase36(uint64(hash))
}

func toBase36(value uint64) string {
	if value == 0 {
		return "0"
	}

	const digits = "0123456789abcdefghijklmnopqrstuvwxyz"
	buf := make([]byte, 0, 8)
	for value > 0 {
		buf = append(buf, digits[value%36])
		value /= 36
	}
	for i, j := 0, len(buf)-1; i < j; i, j = i+1, j-1 {
		buf[i], buf[j] = buf[j], buf[i]
	}
	return string(buf)
}

func (r *Resolver) ResolveImport(specifier string, source string) string {
	if isStdlibSpecifier(specifier) {
		return r.resolveStdlibImport(specifier)
	}
	return r.resolveFilesystemImport(specifier, source)
}

func (r *Resolver) resolveFilesystemImport(specifier string, source string) string {
	if specifier != "" && !filepath.IsAbs(specifier) && source != "" && source != "-" {
		relative := filepath.Join(filepath.Dir(source), specifier)
		if resolved, ok := resolveFilesystemCandidate(relative); ok {
			return resolved
		}
	}
	if resolved, ok := resolveFilesystemCandidate(specifier); ok {
		return resolved
	}
	panic(fmt.Sprintf("File not found: %s", specifier))
}

func (r *Resolver) resolveStdlibImport(specifier string) string {
	logicalPath := specifier[1 : len(specifier)-1]
	logicalPath = filepath.FromSlash(logicalPath)
	for _, root := range r.stdlibRoots {
		base := filepath.Join(root, logicalPath)
		if resolved, ok := resolveStdlibCandidate(base); ok {
			return resolved
		}
	}
	panic(fmt.Sprintf(
		"Stdlib import not found: %s (searched roots: %s)",
		specifier,
		strings.Join(r.stdlibRoots, ", "),
	))
}

func resolveFilesystemCandidate(candidate string) (string, bool) {
	if resolved, ok := resolveExistingFile(candidate); ok {
		return resolved, true
	}
	return resolveDirectoryIndex(candidate, false)
}

func resolveStdlibCandidate(candidate string) (string, bool) {
	if resolved, ok := resolveExistingFile(candidate); ok {
		return resolved, true
	}
	if resolved, ok := resolveExistingFile(candidate + ".ffp"); ok {
		return resolved, true
	}
	if resolved, ok := resolveExistingFile(candidate + ".ff"); ok {
		return resolved, true
	}
	if resolved, ok := resolveDirectoryIndex(candidate, true); ok {
		return resolved, true
	}
	return "", false
}

func resolveDirectoryIndex(candidate string, allowFF bool) (string, bool) {
	info, err := os.Stat(candidate)
	if err != nil || !info.IsDir() {
		return "", false
	}
	basename := filepath.Base(filepath.Clean(candidate))
	if basename == "." || basename == string(filepath.Separator) || basename == "" {
		return "", false
	}
	if resolved, ok := resolveExistingFile(filepath.Join(candidate, basename+".ffp")); ok {
		return resolved, true
	}
	if allowFF {
		if resolved, ok := resolveExistingFile(filepath.Join(candidate, basename+".ff")); ok {
			return resolved, true
		}
	}
	return "", false
}

func resolveExistingFile(candidate string) (string, bool) {
	info, err := os.Stat(candidate)
	if err != nil || info.IsDir() {
		return "", false
	}
	return canonicalizePath(candidate), true
}

func isStdlibSpecifier(specifier string) bool {
	return strings.HasPrefix(specifier, "<") && strings.HasSuffix(specifier, ">") && len(specifier) > 2
}

func normalizePaths(paths []string) []string {
	normalized := make([]string, 0, len(paths))
	for _, candidate := range paths {
		candidate = strings.TrimSpace(candidate)
		if candidate == "" {
			continue
		}
		normalized = append(normalized, canonicalizePath(candidate))
	}
	return dedupePaths(normalized)
}

func dedupePaths(paths []string) []string {
	ret := make([]string, 0, len(paths))
	seen := make(map[string]bool, len(paths))
	for _, candidate := range paths {
		if candidate == "" || seen[candidate] {
			continue
		}
		seen[candidate] = true
		ret = append(ret, candidate)
	}
	return ret
}

func canonicalizePath(path string) string {
	if path == "" {
		return ""
	}
	abs, err := filepath.Abs(path)
	if err != nil {
		abs = filepath.Clean(path)
	}
	resolved, err := filepath.EvalSymlinks(abs)
	if err == nil {
		return resolved
	}
	return filepath.Clean(abs)
}

func isWhitespace(b byte) bool {
	switch b {
	case ' ', '\t', '\n', '\r', '\f', '\v':
		return true
	default:
		return false
	}
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
