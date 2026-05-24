#include "ff.h"

// Forward declaration for unescape (defined in ff.cpp)
std::string unescape(const std::string& s);

// Compile string tokens to integer opcodes (parse-time symbol resolution)
Queue compile(const std::deque<std::string>& tokens) {
  Queue out;
  for (size_t i = 0; i < tokens.size(); ) {
    const std::string& tok = tokens[i++];
    mpz_int num;
    if (tryParseNumber(tok, num)) {
      out.push_back(mpz_int(0));
      out.push_back(num);
    } else if (tok.size() >= 2 && tok[0] == '\'' && tok.back() == '\'') {
      // character literal: push each code point
      std::string s = unescape(tok.substr(1, tok.size() - 2));
      for (unsigned char c : s) {
        out.push_back(mpz_int(0));
        out.push_back(mpz_int(c));
      }
    } else if (tok.size() >= 2 && tok[0] == '[' && tok.back() == ']') {
      // word pointer [word]
      int op = getSymbol(tok.substr(1, tok.size() - 2));
      out.push_back(mpz_int(0));
      out.push_back(mpz_int(op));
    } else if (tok.size() > 1 && tok.back() == ':') {
      // definition shorthand word:
      int op = getSymbol(tok.substr(0, tok.size() - 1));
      out.push_back(mpz_int(0));
      out.push_back(mpz_int(op));
      out.push_back(mpz_int(static_cast<int>(op_mark)));
    } else if (tok == "/*") {
      // skip comment tokens until */
      while (i < tokens.size() && tokens[i++] != "*/") {}
    } else if (tok.size() > 1 && tok[0] == '.') {
      // preprocessor directive — nop
    } else {
      std::string lower = boost::algorithm::to_lower_copy(tok);
      int op = getSymbol(lower);
      out.push_back(mpz_int(op));
    }
  }
  return out;
}

int main(int argc, char **argv)
{
  mt.seed(static_cast<unsigned int>(std::time(0)));

  setup();

  if (argc > 1 && argv[1]) {
    std::string filename(argv[1]);
    std::ifstream source;
    source.open(filename);
    std::string content((std::istreambuf_iterator<char>(source)),
                         std::istreambuf_iterator<char>());
    enqueue_back(compile(tokenize(content)));
  } else {
    std::string content((std::istreambuf_iterator<char>(std::cin)),
                         std::istreambuf_iterator<char>());
    enqueue_back(compile(tokenize(content)));
  }

  run();

  return 0;
}
