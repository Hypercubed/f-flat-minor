package main

import (
	"bufio"
	"io"
	"m/src/engine"
	. "m/src/utils"
	. "math/big"
	"os"
)

func main() {
	engine.Setup()

	reader := bufio.NewReader(os.Stdin)

	header := []byte("F♭A𝄫C♭")

	for i := 0; i < len(header); i++ {
		c, err := reader.ReadByte()
		if (err == io.EOF) || (c != header[i]) {
			panic("Invalid Header")
		}
	}

	var out = make([]Int, 0)

	for {
		c, err := ReadVarint(reader)
		if err != nil {
			break
		}

		op := new(Int).And(&c, NewInt(1))
		v := new(Int).Rsh(&c, 1)
		if op.Sign() == 0 {
			out = append(out, *op)
		}
		out = append(out, *v)
	}

	// fmt.Println(" ")
	// printBigIntArray(bout)
	// fmt.Println(" ")
	// fmt.Println(" ")

	engine.ExecuteBigIntCode(out)
}
