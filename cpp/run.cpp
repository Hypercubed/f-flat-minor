#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>
#include <stack>
#include <queue>
#include <deque>
#include <cmath>
#include <map>
#include <boost/multiprecision/gmp.hpp>
#include <boost/random.hpp>
#include <boost/algorithm/string.hpp>

using namespace boost::multiprecision;

using Stack = std::stack<mpz_int>;
using Queue = std::deque<std::string>;
using Definition = std::stack<std::string>;

const auto TWO = mpz_int(2);
boost::random::mt19937 mt;

#define POP()  \
  stack.top(); \
  stack.pop();

Queue queue;
Stack stack;
Stack rstack;

std::map<std::string, int> symbols;
std::map<int, Definition> defs;

int nextOp = 255;

void callOp(int op);
void callOp(mpz_int op);

mpz_int parseNumber(const std::string &s)
{
  std::string res;
  std::string::const_iterator it = s.begin();
  while (it != s.end())
  {
    char c = *it++;
    if (it != s.end())
    {
      switch (c)
      {
      case '_':
        continue;
      }
    }
    res += c;
  }

  return mpz_int(res);
}

std::queue<std::string> tokenize(const std::string &str)
{
  std::queue<std::string> result;
  std::istringstream iss(str);
  for (std::string s; iss >> s;)
  {
    try
    {
      auto n = parseNumber(s);

      // For now storing as a string
      result.push(n.convert_to<std::string>());
    }
    catch (...)
    {
      result.push(s);
    }
  }
  return result;
}

int getSymbol(const std::string &str)
{
  const std::string s = boost::algorithm::to_lower_copy(str);
  if (symbols.find(s) != symbols.end())
    return symbols[s];
  symbols[s] = nextOp++;
  return symbols[s];
}

int getSymbol()
{
  return nextOp++;
}

enum op_code
{
  op_nop = 0,
  op_eval = 1,
  op_putc = 2,
  op_putn = 5,
  op_clock = 6,
  op_drop = 8,
  op_pushr = 14,
  op_pullr = 15,
  op_shiftl = 16,
  op_shiftr = 17,
  op_clr = 24,
  op_rand = 26,
  // exit
  op_dup = 33,
  op_depth = 35,
  op_swap = 36,
  op_mod = 37,
  op_and = 38,
  // stash
  // fetch
  op_mul = 42,
  op_add = 43,
  op_sub = 45,
  op_dump = 46,
  op_div = 47,
  op_mark = 58,
  op_def = 59,
  op_lt = 60,
  op_eq = 61,
  op_gt = 62,
  op_when = 63,
  op_bra = 91,
  // ket
  op_pow = 94,
  op_or = 124,
  op_not = 126
};

void setup()
{
  symbols["nop"] = op_nop;
  symbols["eval"] = op_eval;
  symbols["putc"] = op_putc;
  symbols["putn"] = op_putn;
  symbols["clock"] = op_clock;
  symbols["drop"] = op_drop;
  symbols["<<"] = op_shiftl;
  symbols[">>"] = op_shiftr;
  symbols["clr"] = op_clr;
  symbols["rand"] = op_rand;
  symbols["%"] = op_mod;
  symbols["&"] = op_and;
  symbols["+"] = op_add;
  symbols["-"] = op_sub;
  symbols["*"] = op_mul;
  symbols["/"] = op_div;
  symbols["."] = op_dump;
  symbols["^"] = op_pow;
  symbols[":"] = op_mark;
  symbols[";"] = op_def;
  symbols["depth"] = op_depth;
  symbols["swap"] = op_swap;
  symbols["q<"] = op_pushr;
  symbols["q>"] = op_pullr;
  symbols["dup"] = op_dup;
  symbols["<"] = op_lt;
  symbols["="] = op_eq;
  symbols[">"] = op_gt;
  symbols["?"] = op_when;
  symbols["["] = op_bra;
  symbols["|"] = op_or;
  symbols["~"] = op_not;
}

void printStack(Stack st)
{
  if (st.empty())
    return;

  auto t = st.top();
  st.pop();
  printStack(st);

  std::cout << t << ' ';
}

mpz_int ipow_internal(const mpz_int &base, const mpz_int &exp)
{
  if (exp == 0)
    return 1;
  if (exp == 1)
    return base;

  auto pow = ipow_internal(base, exp / TWO);
  pow = pow * pow;
  return (exp % TWO == 0) ? pow : pow * base;
}

mpz_int ipow(const mpz_int &base, const mpz_int &exp)
{
  if (exp < 0)
  {
    if (base == 0)
      throw std::logic_error("Cannot divide by zero");
    return abs(base) == 1 ? base : 0;
  }
  if (exp == 0 || base == 1)
  {
    if (base == 0)
      throw std::logic_error("Zero cannot be raised to zero");
    return 1;
  }

  return ipow_internal(base, exp);
}

void defineUser(const int &op, const Definition def)
{
  if (defs.count(op))
  {
    throw std::logic_error("User word already defined");
  }
  defs[op] = def;
}

void callSystem(int op)
{
  switch (op)
  {
  case op_nop:
    break;
  case op_eval:
  {
    auto a = POP();
    callOp(a);
    break;
  }
  case op_putc:
  {
    auto a = POP();
    std::cout << a.convert_to<char>();
    break;
  }
  case op_putn:
  {
    auto a = POP();
    std::cout << a;
    break;
  }
  case op_clock:
  {
    stack.push(mpz_int(static_cast<unsigned int>(std::time(0))));
    break;
  }
  case op_drop:
  {
    POP();
    break;
  }
  case op_pushr:
  {
    auto a = POP();
    rstack.push(a);
    break;
  }
  case op_pullr:
  {
    stack.push(rstack.top());
    rstack.pop();
    break;
  }
  case op_clr:
  {
    while (!stack.empty())
      stack.pop();
    break;
  }
  case op_rand:
  {
    auto a = POP();
    boost::random::uniform_int_distribution<mpz_int> ui(0, a);
    stack.push(ui(mt));
    break;
  }
  case op_dup:
  {
    auto a = stack.top();
    stack.push(a);
    break;
  }
  case op_depth:
  {
    stack.push(mpz_int(stack.size()));
    break;
  }
  case op_swap:
  {
    auto a = POP();
    auto b = stack.top();
    stack.top() = a;
    stack.push(b);
    break;
  }
  case op_mark:
  {
    Definition def;
    while (!queue.empty() && queue.front() != ";")
    {
      def.push(queue.front());
      queue.pop_front();
    }
    queue.pop_front();
    auto n = POP();
    defineUser(n.convert_to<int>(), def);
    break;
  }
  case op_bra:
  {
    int depth = 1;
    Definition def;
    while (!queue.empty() && depth > 0) /* TODO: Handle nested brackets */
    {
      std::string str = queue.front();
      queue.pop_front();

      if (str == "[")
        depth++;
      else if (str == "]")
        depth--;
      if (depth > 0)
        def.push(str);
    }
    auto n = getSymbol();
    defineUser(n, def);
    stack.push(mpz_int(n));
    break;
  }
  case op_mod:
  {
    auto a = POP();
    stack.top() %= a;
    break;
  }
  case op_and:
  {
    auto a = POP();
    stack.top() &= a;
    break;
  }
  case op_or:
  {
    auto a = POP();
    stack.top() |= a;
    break;
  }
  case op_not:
  {
    stack.top() = ~stack.top();
    break;
  }
  case op_shiftl:
  {
    auto a = POP();
    stack.top() = stack.top() << a.convert_to<long long>();
    break;
  }
  case op_shiftr:
  {
    auto a = POP();
    stack.top() = stack.top() >> a.convert_to<long long>();
    break;
  }
  case op_add:
  {
    auto a = POP();
    stack.top() += a;
    break;
  }
  case op_sub:
  {
    auto t = POP();
    stack.top() -= t;
    break;
  }
  case op_mul:
  {
    auto a = POP();
    stack.top() *= a;
    break;
  }
  case op_div:
  {
    auto t = POP();
    stack.top() /= t;
    break;
  }
  case op_lt:
  {
    auto a = POP();
    stack.top() = (stack.top() < a);
    break;
  }
  case op_gt:
  {
    auto a = POP();
    stack.top() = (stack.top() > a);
    break;
  }
  case op_eq:
  {
    auto a = POP();
    stack.top() = (stack.top() == a);
    break;
  }
  case op_dump:
    std::cout << "[ ";
    printStack(stack);
    std::cout << "]\n";
    break;
  case op_when:
  {
    auto o = POP();
    auto b = POP();
    if (b != 0)
    {
      callOp(o);
    }
    break;
  }
  case op_pow:
  {
    auto a = POP();
    stack.top() = ipow(stack.top(), a);
    break;
  }
  }
}

void enqueue_front(Definition q)
{
  while (!q.empty())
  {
    queue.push_front(q.top());
    q.pop();
  }
}

void enqueue_back(std::queue<std::string> q)
{
  while (!q.empty())
  {
    queue.push_back(q.front());
    q.pop();
  }
}

void callOp(int op)
{
  if (op < 255)
  {
    callSystem(op);
    return;
  }
  enqueue_front(defs[op]);
}

void callOp(mpz_int op)
{
  callOp(op.convert_to<int>());
}

std::string unescape(const std::string &s)
{
  std::string res;
  std::string::const_iterator it = s.begin();
  while (it != s.end())
  {
    char c = *it++;
    if (c == '\\' && it != s.end())
    {
      switch (*it++)
      {
      case '\\':
        c = '\\';
        break;
      case 'n':
        c = '\n';
        break;
      case 't':
        c = '\t';
        break;
      case 's':
        c = ' ';
        break;
      // all other escapes
      default:
        // invalid escape sequence - skip it. alternatively you can copy it as is, throw an exception...
        continue;
      }
    }
    res += c;
  }

  return res;
}

void run() {
  while (!queue.empty())
  {
    auto str = queue.front();
    queue.pop_front();

    try
    {
      auto i = mpz_int(str);
      stack.push(i);
    }
    catch (...)
    {
      const std::string lower_str = boost::algorithm::to_lower_copy(str);

      if (str[0] == '.' && str.size() > 1)
      {
        // nop
      }
      else if (str[0] == '[' && str.back() == ']')
      {
        stack.push(getSymbol(str.substr(1, str.size() - 2)));
      }
      else if (str[0] == '\'' && str.back() == '\'')
      {
        str = unescape(str.substr(1, str.size() - 2));
        for (char &c : str)
        {
          stack.push(c);
        }
      }
      else if (str.back() == ':' && str.size() > 1)
      {
        stack.push(getSymbol(str.substr(0, str.size() - 1)));
        queue.push_front(":");
      }
      else if (str == "/*")
      {
        do
        {
          str = queue.front();
          queue.pop_front();
        } while (str != "*/");
      }
      else if (symbols.find(lower_str) != symbols.end())
      {
        callOp(symbols[lower_str]);
      }
      else
      {
        throw std::invalid_argument("undefined call: " + str);
      }
    }
  }  
}

int main(int argc,  char **argv)
{
  mt.seed(static_cast<unsigned int>(std::time(0)));

  setup();

  if (argv[1]) {
    std::string filename(argv[1]);
    std::ifstream source;
    source.open(filename);
    for (std::string line; std::getline(source, line);)
    {
      enqueue_back(tokenize(line));
    }
  } else {
    for (std::string line; std::getline(std::cin, line);)
    {
      enqueue_back(tokenize(line));
    }
  }

  run();

  return 0;
}
