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
	// printIr(ir)
	// fmt.Println("")
	// fmt.Println("")

	// var bigCode = compileToBigIntArray(ir)
	// printBigIntArray(bigCode)
	// fmt.Println("")
	// fmt.Println("")

	byteCode := compiler.CompileToByteArray(ir)
	// printByteArray(byteCode)
	// fmt.Println("")
	// fmt.Println("")

	// var out = make([]byte, 0)
	// for _, element := range AppendSleb128(out, 123456) {
	// 	fmt.Printf("%X ", element)
	// }
	// fmt.Println("")

	header := []byte("F♭A𝄫C♭")

	os.Stdout.Write(header)
	os.Stdout.Write(byteCode)
}
