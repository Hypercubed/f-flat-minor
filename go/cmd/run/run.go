package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"m/src/compiler"
	"m/src/engine"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

var imported = make(map[string]bool)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func findFile(filename string, source string) string {
	if filename != "" && !path.IsAbs(filename) && source != "" && source != "-" {
		relative := path.Join(filepath.Dir(source), filename)
		if _, err := os.Stat(relative); err == nil {
			return relative
		}
	}
	if _, err := os.Stat(filename); err == nil {
		return filename
	}
	panic(fmt.Sprintf("File not found: %s", filename))
}

func preprocessLine(line string, filename string) string {
	reMacro := regexp.MustCompile(`^\.[^\s]`)
	if !reMacro.MatchString(line) {
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
		return preprocess(string(dat), filepath)
	case ".import":
		if len(tokens) < 2 {
			return ""
		}
		filepath := findFile(tokens[1], filename)
		if !imported[filepath] {
			imported[filepath] = true
			dat, err := os.ReadFile(filepath)
			check(err)
			return preprocess(string(dat), filepath)
		}
		return ""
	case ".exit":
		os.Exit(0)
		return ""
	case ".m", ".ff", ".ffp":
		// For now, skip macro execution in preprocess mode
		// The Python version doesn't support macros anyway
		return ""
	default:
		// Unknown directive, skip it
		return ""
	}
}

func preprocess(code string, filename string) string {
	lines := strings.Split(code, "\n")
	var result []string
	for _, line := range lines {
		processed := preprocessLine(line, filename)
		if processed != "" {
			result = append(result, processed)
		}
	}
	return strings.Join(result, "\n")
}

func main() {
	compiler.Setup()
	engine.Setup()

	preprocessFlagPtr := flag.Bool("preprocess", false, "only preprocess, don't execute")
	inFlagPtr := flag.String("in", "-", "the input file")
	flag.Parse()

	code := ""

	if *inFlagPtr != "" && *inFlagPtr != "-" {
		data, err := os.ReadFile(*inFlagPtr)
		check(err)
		code = string(data)
	} else {
		data, err := ioutil.ReadAll(os.Stdin)
		check(err)
		code = string(data)
	}

	if *preprocessFlagPtr {
		// Preprocess mode: resolve imports and output flat .ff source
		preprocessed := preprocess(code, *inFlagPtr)
		fmt.Println(preprocessed)
		return
	}

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIR(tokens, *inFlagPtr)

	bigInt := compiler.CompileToBigIntArray(ir)

	engine.Run(bigInt)
}
