// import "wasi";

import { ev, tokenize } from './core';

// ev(tokenize(`1 2 3 4 5 6 7 8 9 10 * * * * * * * * * .`));

ev(tokenize(`

  /* define factorial */
  (fact): dup 1 - fact * ;
  fact: dup 1 - &(fact) ? ;

  /* string printing */
  ((prints)): q< (prints) q> putc ;
  (prints): dup &((prints)) ? ;
  prints: (prints) drop ;

  0 'Factorial 32 '100: 10 prints

  100 fact .

`));