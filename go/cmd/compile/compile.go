package main

import (
	"io/ioutil"
	"m/src/compiler"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	compiler.Setup()

	data, err := ioutil.ReadAll(os.Stdin)
	check(err)
	code := string(data)

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIR(tokens)

	base64Code := compiler.CompileToBase64(ir)

	header := []byte("FbAbbCb")

	os.Stdout.Write(header)
	os.Stdout.Write([]byte(base64Code))
}
