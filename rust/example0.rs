use num_bigint::{BigInt, Sign};
use num::ToPrimitive;
use num::Zero;

enum Definition {
  System(unsafe fn()),
  User(Vec<String>),
  None
}

static mut STACK: Vec<BigInt> = Vec::new();
static mut QUEUE: Vec<BigInt> = Vec::new();
static mut SYMBOLS: Vec<String> = Vec::new();
static mut DEFINITIONS: Vec<Definition> = Vec::new();

fn tokenize(line: &str) -> Vec<&str> {
  return line.split_whitespace().collect();
}

unsafe fn peek() -> &'static mut BigInt {
  return STACK.last_mut().unwrap();
}

unsafe fn pop() -> BigInt {
  return STACK.pop().unwrap_or(BigInt::zero());
}

unsafe fn push(num: BigInt) {
  STACK.push(num);
}

unsafe fn poke(num: BigInt) {
  *STACK.last_mut().unwrap() = num;
}

unsafe fn ev (words: Vec<&str>) {
  let len = words.len();
  let mut i = 0;
  while i < len {
    let word = words[i];
    match word.parse() {
      Ok(num) => {
        push(num);
      },
      Err(_) => {
        let word_len = word.len();
        let first_letter = &word[0..1];
        let last_letter = &word[word_len - 1..word_len];

        if first_letter == "[" && last_letter == "]" {
          push(BigInt::from(get_symbol(&word[1..word_len-1])));
        } else if first_letter == "'" && last_letter == "'" {
          for c in (&word[1..word_len-1]).chars() {
            push(BigInt::from(c as u32));
          }
        } else if &word[word_len-1..] == ":" {
          let name = &word[0..word_len-1];
          let mut def: Vec<String> = Vec::new();
          i += 1;
          while i < len {
            let word = words[i];
            if word == ";" {
              break;
            } else {
              def.push(word.to_string());
            }
            i += 1;
          }
          define_user(name, def);
        } else if word == "/*" {
          i += 1;
          while i < len {
            let word = words[i];
            if word == "*/" {
              break;
            }
            i += 1;
          }
        } else {
          call_op(find_symbol(word).unwrap_or(0) as usize);
        }
      }
    };
    i += 1;
  }
}

unsafe fn find_symbol(name: &str) -> Option<usize> {
  let sname = name.to_string();
  return SYMBOLS.iter().position(|x| *x == sname);
}

unsafe fn call_op(a: usize) {
  match &DEFINITIONS[a] {
    Definition::System(f) => {
      f();
    },
    Definition::User(p) => {
      let f1: Vec<&str> = p.iter().map(|s| &**s).collect();
      ev(f1);
    },
    _ => println!("undefined call")
  }
}

unsafe fn get_symbol(name: &str) -> usize {
  match find_symbol(name) {
    Some(i) => return i,
    None => {
      SYMBOLS.push(name.to_string());
      DEFINITIONS.push(Definition::None);
      return SYMBOLS.len() - 1;
    }
  }
}

unsafe fn define_system(name: &str, f: unsafe fn()) {
  DEFINITIONS[get_symbol(name)] = Definition::System(f);
}

unsafe fn define_user(name: &str, f: Vec<String>) {
  DEFINITIONS[get_symbol(name)] = Definition::User(f);
}

fn main() {
  fn nop() {
    // 
  }

  unsafe fn print() {
    println!("[ {}]", STACK.iter().fold(String::new(), |acc, num| acc + &num.to_string() + " "));
  }

  unsafe fn call() {
    let a = pop().to_usize().unwrap();
    call_op(a);
  }

  unsafe fn drop() {
    pop();
  }

  unsafe fn dup() {
    push(peek().clone());
  }

  unsafe fn swap() {
    let a = pop();
    let b = pop();
    push(a);
    push(b);
  }

  unsafe fn add() {
    let a = pop();
    *peek() += a;
  }

  unsafe fn sub() {
    let a = pop();
    *peek() -= a;
  }

  unsafe fn mul() {
    let a = pop();
    *peek() *= a;
  }

  unsafe fn div() {
    let a = pop();
    *peek() /= a;
  }

  unsafe fn eq() {
    let b = pop() == *peek();
    poke(BigInt::from(b as i32));
  }

  unsafe fn dip() {
    let a = pop();
    let b = pop();
    call_op(a.to_usize().unwrap());
    push(b);
  }

  unsafe fn q() {
    let op = pop();
    if pop().sign() != Sign::NoSign {
      call_op(op.to_usize().unwrap());
    }
  }

  unsafe fn qpush() {
    let a = pop();
    QUEUE.push(a);
  }

  unsafe fn qpop() {
    let a = QUEUE.pop().unwrap_or(BigInt::zero());
    push(a);
  }

  unsafe fn putc() {
    print!("{}", pop().to_u32().unwrap() as u8 as char);
  }

  unsafe {
    define_system("nop", nop);
    define_system(".", print);
    define_system("call", call);
    define_system("drop", drop);
    define_system("dup", dup);
    define_system("swap", swap);
    define_system("+", add);
    define_system("-", sub);
    define_system("*", mul);
    define_system("/", div);
    define_system("=", eq);
    define_system("dip", dip);
    define_system("?", q);
    define_system("q<", qpush);
    define_system("q>", qpop);
    define_system("putc", putc);
  }

  unsafe {
    ev(tokenize("

    /* define factorial */
    (fact): dup 1 - fact * ;
    fact: dup 1 - [(fact)] ? ;

    /* string printing */
    ((prints)): q< (prints) q> putc  ;
    (prints): dup [((prints))] ? ;
    prints: (prints) drop ;

    0 'Factorial' 32 '100:' 10 prints

    100 fact .

    "));
  }
}