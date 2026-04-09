import 'dart:io';
import 'dart:convert';
import 'dart:collection';
import 'dart:math';

final List<BigInt> stack = [];

final ListQueue<Object> queue = ListQueue<Object>();
final _random = Random();

final symbols = Map<String, BigInt>();
final defs = Map<BigInt, dynamic>();

var _nextCode = -BigInt.one;

Object popFrontQueue() {
  return queue.removeFirst();
}

Object popBackQueue() {
  return queue.removeLast();
}

void pushFrontQueueAll(Iterable<Object> items) {
  for (final item in items.toList().reversed) {
    queue.addFirst(item);
  }
}

void pushFrontQueue(Object item) {
  queue.addFirst(item);
}

BigInt truncDiv(BigInt lhs, BigInt rhs) {
  var q = lhs.abs() ~/ rhs.abs();
  if (lhs.isNegative != rhs.isNegative) {
    q = -q;
  }
  return q;
}

BigInt truncMod(BigInt lhs, BigInt rhs) {
  final q = truncDiv(lhs, rhs);
  return lhs - rhs * q;
}

String _hex2char(String hex) {
  final n = int.parse(hex, radix: 16);
  if (n <= 0xffff) {
    return String.fromCharCode(n);
  } else if (n <= 0x10ffff) {
    final adjusted = n - 0x10000;
    final high = 0xd800 | (adjusted >> 10);
    final low = 0xdc00 | (adjusted & 0x3ff);
    return String.fromCharCode(high) + String.fromCharCode(low);
  } else {
    return '[hex error: $hex]';
  }
}

String unescapeQuotedString(String text) {
  final out = StringBuffer();
  for (var i = 0; i < text.length; i++) {
    final ch = text[i];
    if (ch == r'\' && i + 1 < text.length) {
      final next = text[++i];
      // Handle \UXXXXXXXX (8 hex digits)
      if ((next == 'U' || next == 'u') && i + 8 <= text.length) {
        final hex = text.substring(i + 1, i + 9);
        if (RegExp(r'^[0-9a-fA-F]{8}$').hasMatch(hex)) {
          out.write(_hex2char(hex));
          i += 8;
          continue;
        }
      }
      // Handle \uXXXX (4 hex digits)
      if ((next == 'u') && i + 4 <= text.length) {
        final hex = text.substring(i + 1, i + 5);
        if (RegExp(r'^[0-9a-fA-F]{4}$').hasMatch(hex)) {
          out.write(_hex2char(hex));
          i += 4;
          continue;
        }
      }
      switch (next) {
        case '0':
          out.writeCharCode(0);
          break;
        case 'b':
          out.write('\b');
          break;
        case 't':
          out.write('\t');
          break;
        case 'n':
          out.write('\n');
          break;
        case 'v':
          out.write('\v');
          break;
        case 'f':
          out.write('\f');
          break;
        case 'r':
          out.write('\r');
          break;
        case "'":
          out.write("'");
          break;
        case '"':
          out.write('"');
          break;
        case 's':
          out.write(' ');
          break;
        case '\\':
          out.write('\\');
          break;
        default:
          out.write(next);
          break;
      }
      continue;
    }
    out.write(ch);
  }
  return out.toString();
}

BigInt? parseInteger(String token) {
  if (token.isEmpty) {
    return null;
  }

  var normalized = token.replaceAll('_', '');
  var sign = BigInt.one;
  if (normalized.startsWith('-')) {
    sign = -BigInt.one;
    normalized = normalized.substring(1);
  }

  if (normalized.isEmpty) {
    return null;
  }

  BigInt? parsed;
  if (normalized.startsWith('0x') || normalized.startsWith('0X')) {
    parsed = BigInt.tryParse(normalized.substring(2), radix: 16);
  } else if (normalized.startsWith('0b') || normalized.startsWith('0B')) {
    parsed = BigInt.tryParse(normalized.substring(2), radix: 2);
  } else if (normalized.startsWith('0o') || normalized.startsWith('0O')) {
    parsed = BigInt.tryParse(normalized.substring(2), radix: 8);
  } else if (normalized.contains('e') || normalized.contains('E')) {
    final expMatch = RegExp(r'^(\d+)[eE]([+-]?\d+)4').firstMatch('$normalized\u0000');
    if (expMatch != null) {
      final mantissa = BigInt.parse(expMatch.group(1)!);
      final exponent = int.parse(expMatch.group(2)!);
      if (exponent < 0) {
        return null;
      }
      parsed = mantissa * BigInt.from(10).pow(exponent);
    }
  } else {
    parsed = BigInt.tryParse(normalized);
  }

  if (parsed == null) {
    return null;
  }

  return sign * parsed;
}

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

  define('clr', () {
    stack.clear();
  });

  define('rand', () {
    var a = stack.removeLast();
    stack.add(BigInt.from(_random.nextInt(a.toInt() + 1)));
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

  define('putn', () {
    var a = stack.removeLast();
    stdout.write(a);
  });

  define('drop', () => stack.removeLast());

  define('depth', () {
    stack.add(BigInt.from(stack.length));
  });

  define('dup', () {
    var a = stack.last;
    stack.add(a);
  });

  define('q<', () {
    var a = stack.removeLast();
    queue.add(a);
  });

  define('q>', () {
    var a = popBackQueue();
    if (a is BigInt) {
      stack.add(a);
      return;
    }
    final token = a.toString();
    final number = parseInteger(token);
    stack.add(number ?? getSymbol(token));
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

  define('%', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(truncMod(a, b));
  });

  define('&', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a & b);
  });

  define('|', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a | b);
  });

  define('~', () {
    var a = stack.removeLast();
    stack.add(~a);
  });

  define('/', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(truncDiv(a, b));
  });

  define('^', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a.pow(b.toInt()));
  });

  define('<<', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a << b.toInt());
  });

  define('>>', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a >> b.toInt());
  });

  define('cons', () {
    var y = stack.removeLast();
    var x = stack.removeLast();
    var code = nextCode();
    defs[code] = [x, y, 'eval'];
    stack.add(code);
  });

  define('<', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a < b ? BigInt.one : BigInt.zero);
  });

  define('=', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a == b ? BigInt.one : BigInt.zero);
  });

  define('>', () {
    var b = stack.removeLast();
    var a = stack.removeLast();
    stack.add(a > b ? BigInt.one : BigInt.zero);
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
    var token = popFrontQueue().toString();
    List<String> def = [];
    while (token != ';' && queue.length > 0) {
      def.add(token);
      token = popFrontQueue().toString();
    }
    defs[code] = def;
  });
}

void callOp(BigInt code) {
  var r = defs[code];
  if (r is Function) {
    r();
  } else {
    if (r == null) {
      throw Exception('Undefined op code: $code stack=${stack.join(' ')}');
    }
    final definition = List<Object>.from(r as Iterable);
    pushFrontQueueAll(definition);
  }
}

/// Whitespace-only split (no string or comment awareness).
List<String> tokenize(String s) {
  return s
      .split(RegExp(r'\s+'))
      .where((ss) => ss.trim().isNotEmpty)
      .toList();
}

void ev() {
  Object token = '';
  while (queue.length > 0) {
    token = popFrontQueue();

    if (token is BigInt) {
      stack.add(token);
    } else {
      final text = token.toString();
      var number = parseInteger(text);
      if (number != null) {
        stack.add(number);
      } else if (text.startsWith('.') && text.length > 1) {
      // no op
      } else if (text.startsWith('\'')) {
        var end = text.endsWith('\'') ? text.length - 1 : text.length;
        var chars = unescapeQuotedString(text.substring(1, end)).split('');
        var asc = chars.map((c) => BigInt.from(c.codeUnitAt(0))).toList();
        stack.addAll(asc);
      } else if (text.length > 1 &&
          text.startsWith('"') &&
          text.endsWith('"')) {
        // Sugar: "..." is [ '...' ] — prepend '[', char code tokens, ']'
        final inner = text.substring(1, text.length - 1);
        final expanded = <Object>[
          '[',
          ...unescapeQuotedString(inner).codeUnits.map((u) => u.toString()),
          ']',
        ];
        pushFrontQueueAll(expanded);
      } else if (symbols[text.toLowerCase()] != null) {
        var code = getSymbol(text);
        callOp(code);
      } else if (text.startsWith('[') && text.endsWith(']')) {
        var name = text.substring(1, text.length - 1);
        stack.add(getSymbol(name));
      } else if (text.endsWith(':') && text.length > 1) {
        var name = text.substring(0, text.length - 1);
        var code = getSymbol(name);
        stack.add(code);
        pushFrontQueue(":");
      } else if (text == '[') {
        final code = nextCode();
        final definition = <Object>[];
        var depth = 1;
        while (queue.isNotEmpty && depth > 0) {
          final item = popFrontQueue();
          if (item == ']') {
            depth -= 1;
          } else if (item == '[') {
            depth += 1;
          }
          if (depth > 0) {
            definition.add(item);
          }
        }
        defs[code] = definition;
        stack.add(code);
      } else if (text == '/*') {
        while (token != '*/' && queue.length > 0) {
          token = popFrontQueue();
        }
      } else {
        throw Exception('Undefined word: ' + text);
      }
    }
  }
}

Future<void> main() async {
  setup();
  final code = await stdin.transform(utf8.decoder).join();
  queue.addAll(tokenize(code));
  ev();
}
