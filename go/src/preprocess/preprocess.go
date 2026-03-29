package preprocess

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

type Processor struct {
	imported       map[string]bool
	importPrefixes map[string]string
	rootFilename   string
}

var reMacro = regexp.MustCompile(`^\.[^\s]`)
var reSafePath = regexp.MustCompile(`[^A-Za-z0-9]+`)
var reUnderscores = regexp.MustCompile(`_+`)

func New(rootFilename string) *Processor {
	if rootFilename == "-" {
		rootFilename = ""
	}
	return &Processor{
		imported:       make(map[string]bool),
		importPrefixes: make(map[string]string),
		rootFilename:   rootFilename,
	}
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
		filepath := findFile(tokens[1], filename)
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
		filepath := findFile(tokens[1], filename)
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

func findFile(filename string, source string) string {
	if filename != "" && !filepath.IsAbs(filename) && source != "" && source != "-" {
		relative := filepath.Join(filepath.Dir(source), filename)
		if _, err := os.Stat(relative); err == nil {
			return relative
		}
	}
	if _, err := os.Stat(filename); err == nil {
		return filename
	}
	panic(fmt.Sprintf("File not found: %s", filename))
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
