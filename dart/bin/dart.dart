import 'dart:io';
import 'dart:convert';

final List<BigInt> stack = [];
final List<BigInt> rstack = [];

final List<String> queue = [];

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

  define('eval', () {
    var code = stack.removeLast();
    callOp(code);
  });

  define('.', () {
    stdout.write('[ ');
    stdout.write(stack.join(" "));
    stdout.write(' ]\n');
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

  define('q<', () {
    var a = stack.removeLast();
    rstack.add(a);
  });

  define('q>', () {
    var a = rstack.removeLast();
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

  define('=', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a == b ? BigInt.one : BigInt.zero);
  });

  define('?', () {
    var t = stack.removeLast();
    var f = stack.removeLast();
    if (f != BigInt.zero) {
      callOp(t);
    }
  });

  define(':', () {
    var code = stack.removeLast();
    var token = queue.removeAt(0);
    List<String> def = [];
    while (token != ';' && queue.length > 0) {
      def.add(token);
      token = queue.removeAt(0);
    }
    defs[code] = def;
  });
}

void callOp(BigInt code) {
  var r = defs[code];
  if (r is Function) {
    r();
  } else {
    queue.insertAll(0,r); 
    ev();
  }
}

List<String> tokenize(String s) {
  return s.split(RegExp(r"\s+"))
    .where((ss) => ss.trim() != '')
    .toList();
}

void ev() {
  var token = '';
  while (queue.length > 0) {
    token = queue.removeAt(0);

    var number = BigInt.tryParse(token);
    if (number != null) {
      stack.add(number);
    } else if (token.startsWith('.') && token.length > 1) {
      // no op
    } else if (token.startsWith('\'')) {
      var chars = token.substring(1).split('');
      var asc = chars.map((c) => BigInt.from(c.codeUnitAt(0))).toList();
      stack.addAll(asc);
    } else if (symbols[token] != null) {
      var code = getSymbol(token);
      callOp(code);
    } else if (token.startsWith('[') && token.endsWith(']')) {
      var name = token.substring(1, token.length - 1);
      stack.add(getSymbol(name));
    } else if (token.endsWith(':') && token.length > 1) {
      var name = token.substring(0, token.length - 1);
      var code = getSymbol(name);
      stack.add(code);
      queue.insert(0, ":");
    } else if (token == '/*') {
      while (token != '*/' && queue.length > 0) {
        token = queue.removeAt(0);
      }
    } else {
      throw Exception('Undefined word: ' + token);
    }
  }
}

void main() {
  setup();

  while (true) {
    var line = stdin.readLineSync();
    if (line == null) {
      break;
    }
    queue.addAll(tokenize(line));
    ev();
  }
}
