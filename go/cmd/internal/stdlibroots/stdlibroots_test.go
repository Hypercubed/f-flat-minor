package stdlibroots

import "testing"

func TestFlagCollectsRepeatedValues(t *testing.T) {
	var flag Flag
	if err := flag.Set("one"); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if err := flag.Set("two"); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	values := flag.Values()
	if len(values) != 2 || values[0] != "one" || values[1] != "two" {
		t.Fatalf("unexpected values: %v", values)
	}
}
