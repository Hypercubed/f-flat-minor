import 'dart:io';

final List<BigInt> stack = [];
final symbols = Map<String, BigInt>();
final defs = Map<BigInt, dynamic>();

var _nextCode = BigInt.zero;

BigInt nextCode() {
  _nextCode += BigInt.one;
  return _nextCode;
}

BigInt getSymbol(String name) {
  name = name.toLowerCase();
  var code = symbols[name];
  if (code == null) {
    return symbols[name] = nextCode();
  }
  return code;
}

define(String name, fn) {
  var code = getSymbol(name);
  defs[code] = fn;
}

void setup() {
  define('nop', () {
    //
  });

  define('cls', () {
    stack.clear();
  });

  define('call', () {
    var code = stack.removeLast();
    callOp(code);
  });

  define('.', () {
    print(stack);
  });

  define('putc', () {
    var a = stack.removeLast();
    stdout.write(String.fromCharCode(a.toInt()));
  });

  define('drop', () => stack.removeLast());

  define('dup', () {
    var a = stack.last;
    stack.add(a);
  });

  define('swap', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(b);
    stack.add(a);
  });

  define('+', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a + b);
  });

  define('-', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a - b);
  });

  define('*', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a * b);
  });

  define('/', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a ~/ b);
  });

  define('?', () {
    var t = stack.removeLast();
    var f = stack.removeLast();
    if (f != BigInt.zero) {
      callOp(t);
    }
  });

  define('dip', () {
    var a = stack.removeLast();
    var b = stack.removeLast();
    callOp(a);
    stack.add(b);
  });
}

void callOp(BigInt code) {
  var r = defs[code];
  if (r is Function) {
    r();
  } else {
    ev(r);
  }
}

List<String> tokenize(String s) {
  return s.split(RegExp(r"\s+"))
    .where((ss) => ss.trim() != '')
    .toList();
}

void ev(List<String> tokens) {
  var l = tokens.length;
  var i = 0;
  var token = '';
  while (i < l) {
    token = tokens[i++];

    var number = BigInt.tryParse(token);
    if (number != null) {
      stack.add(number);
    } else if (token.startsWith('\'')) {
      var chars = token.substring(1).split('');
      var asc = chars.map((c) => BigInt.from(c.codeUnitAt(0))).toList();
      stack.addAll(asc.reversed);
    } else if (symbols[token] != null) {
      var code = getSymbol(token);
      callOp(code);
    } else if (token.startsWith('&')) {
      var name = token.substring(1);
      stack.add(getSymbol(name));
    } else if (token.endsWith(':')) {
      var name = token.substring(0, token.length - 1);
      var code = getSymbol(name);
      token = tokens[i++];
      List<String> def = [];
      while (token != ';' && i < l) {
        def.add(token);
        token = tokens[i++];
      }
      defs[code] = def;
    } else if (token == '/*') {
      while (token != '*/' && i < l) {
        token = tokens[i++];
      }
    } else {
      throw Exception('Undefined word: ' + token);
    }
  }
}

void main() {
  setup();

  final stopwatch = Stopwatch()..start();
	ev(tokenize('''
    /* common definitions */

    --: 1 - ;
    rot: q< swap q> swap ;
    choose: 0 = &swap ? drop ;
    ifte: rot choose eval ;

    /* factorial */

    fact_t: dup -- fact * ;
    fact_f: drop 1 ;
    fact: dup &fact_t &fact_f ifte ;

    /* string printing */

    print_t: putc print ;
    print: dup &print_t &drop ifte ;
    println: print 10 putc ;

    0 32 'Factorial print
    0 '100: println

    100 fact .
  '''));
  print('${stopwatch.elapsed.inMilliseconds}ms');
}
