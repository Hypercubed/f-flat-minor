name="temp.ff"
cat - $@ > $name
racket ./ff.rkt $name
