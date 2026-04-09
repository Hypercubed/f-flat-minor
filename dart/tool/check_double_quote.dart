// Run: cd dart && dart run tool/check_double_quote.dart
import 'dart:convert';
import 'dart:io';

import '../bin/dart.dart' as ff;

void main() async {
  // Tokenizer: whitespace-only split; "..." stays one token
  final hiTok = ff.tokenize('"hi"');
  if (hiTok.length != 1 || hiTok[0] != '"hi"') {
    stderr.writeln('tokenize expected one token for "\\"hi\\"", got $hiTok');
    exit(1);
  }
  final multi = ff.tokenize('a \t "x" \n b');
  if (multi.length != 3 || multi[0] != 'a' || multi[1] != '"x"' || multi[2] != 'b') {
    stderr.writeln('whitespace tokenize broken, got $multi');
    exit(1);
  }

  final pkgRoot = File(Platform.script.toFilePath()).parent.parent.path;
  final p = await Process.start(
    'dart',
    ['run', 'bin/dart.dart'],
    workingDirectory: pkgRoot,
  );
  p.stdin.add(utf8.encode('"hi" eval dup putn swap putn\n'));
  await p.stdin.close();
  final out = (await p.stdout.transform(utf8.decoder).join()).trim();
  final err = (await p.stderr.transform(utf8.decoder).join()).trim();
  final code = await p.exitCode;
  if (code != 0) {
    stderr.writeln('dart run failed ($code): $err');
    exit(1);
  }
  if (out != '105104') {
    stderr.writeln('expected stdout 105104, got ${jsonEncode(out)}');
    exit(1);
  }

  stdout.writeln('ok');
}
