package stdlibroots

import "strings"

type Flag struct {
	values []string
}

func (f *Flag) String() string {
	return strings.Join(f.values, ",")
}

func (f *Flag) Set(value string) error {
	f.values = append(f.values, value)
	return nil
}

func (f *Flag) Values() []string {
	ret := make([]string, len(f.values))
	copy(ret, f.values)
	return ret
}
