package utils

import (
	"bufio"
	. "math/big"
)

var SIGNIFICANT_BITS = uint(7)
var CONTINUE = byte(0x80)
var REST_MASK = byte(0x7f)

func ReadVarUint(r *bufio.Reader) (Int, error) {
	res := NewInt(0)
	shift := uint(0)

	for {
		b, err := r.ReadByte()
		if err != nil {
			return *NewInt(0), err
		}
		ib := NewInt(int64(b & REST_MASK))
		ib = ib.Lsh(ib, shift)
		res = res.Or(res, ib)
		if b&CONTINUE == 0 {
			return *res, nil
		}
		shift += SIGNIFICANT_BITS
	}
}

func ReadVarint(r *bufio.Reader) (Int, error) {
	result, err := ReadVarUint(r)
	if err != nil {
		return *NewInt(0), err
	}
	sign := NewInt(0).And(&result, NewInt(1)).Sign()
	result = *result.Rsh(&result, 1)
	if sign == 1 {
		return *result.Neg(&result), nil
	} else {
		return result, nil
	}
}

func AppendUleb128(b []byte, v *Int) []byte {
	for {
		z := NewInt(0).And(v, NewInt(int64(REST_MASK)))
		c := uint8(z.Uint64())
		v = v.Rsh(v, SIGNIFICANT_BITS)
		if v.Sign() != 0 {
			c |= CONTINUE
		}
		b = append(b, c)
		if c&CONTINUE == 0 {
			break
		}
	}
	return b
}

// TODO: needs to use int
func AppendSleb128(b []byte, v *Int) []byte {
	neg := v.Sign() == -1
	v = v.Lsh(v, 1)
	if neg {
		v = v.Abs(v).Add(v, NewInt(1))
	}
	return AppendUleb128(b, v)
}
