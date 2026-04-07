// Run: cd dart && dart run tool/check_double_quote.dart
import 'dart:io';

import '../bin/dart.dart' as ff;

void main() {
  final hi = ff.tokenize('"hi"');
  if (hi.length != 4 ||
      hi[0] != '[' ||
      hi[1] != '104' ||
      hi[2] != '105' ||
      hi[3] != ']') {
    stderr.writeln('tokenize("hi") expected [,104,105,], got $hi');
    exit(1);
  }
  final empty = ff.tokenize('""');
  if (empty.length != 2 || empty[0] != '[' || empty[1] != ']') {
    stderr.writeln('tokenize("") expected [,], got $empty');
    exit(1);
  }
  stdout.writeln('ok');
}
