import { reset, run } from './core';

reset();

run(`
  /* factorial */

  fact: dup 1 > [ dup 1 - fact * ] ? ;

  /* string printing */

  (prints): dup [ q< (prints) q> putc ] ? ;
  prints: (prints) drop ;

  0 'Factorial' 32 '100:' 10 prints

  100 fact .
`);