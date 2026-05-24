#include "ff.h"

// Global VM state definitions
Stack stack;
Queue queue;
Stack rstack;
std::deque<mpz_int> stash_queue;
std::map<std::string, int> symbols;
std::map<int, std::string> symbol_names;
std::map<int, Definition> defs;
int nextOp = 256;
const mpz_int TWO = mpz_int(2);
boost::random::mt19937 mt;

void callOp(int op);
void callOp(mpz_int op);

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
  symbols["]"] = op_ket;
  symbols["|"] = op_or;
  symbols["~"] = op_not;
  symbols["exit"] = op_exit;
  symbols["getc"] = op_getc;
  symbols["cons"] = op_cons;
  symbols["("] = op_stash;
  symbols[")"] = op_fetch;

  for (auto const& pair : symbols)
  {
    symbol_names[pair.second] = pair.first;
  }
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

void defineUser(const int &op, const Definition& def)
{
  if (defs.count(op))
  {
    throw std::logic_error("User word already defined");
  }
  defs[op] = def;
}

void enqueueOp(mpz_int op)
{
  int op_int = op.convert_to<int>();
  if (op_int < 256)
  {
    if (op_int >= 0)
    {
      callSystem(op_int);
    }
    else
    {
      throw std::logic_error("Unknown opcode: " + std::to_string(op_int));
    }
  }
  else
  {
    callOp(op_int);
  }
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
    enqueueOp(a);
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
    while (!queue.empty())
    {
      mpz_int v = queue.front();
      queue.pop_front();
      if (v == mpz_int(0))
      {
        // literal-push pair: consume both values without checking for op_def
        def.push_back(v);
        if (!queue.empty())
        {
          def.push_back(queue.front());
          queue.pop_front();
        }
      }
      else if (v == mpz_int(static_cast<int>(op_def)))
      {
        break; // found the terminating ;
      }
      else
      {
        def.push_back(v);
      }
    }
    auto n = POP();
    defineUser(n.convert_to<int>(), def);
    break;
  }
  case op_bra:
  {
    int depth = 1;
    Definition def;
    while (!queue.empty() && depth > 0)
    {
      mpz_int v = queue.front();
      queue.pop_front();
      if (v == mpz_int(0))
      {
        // literal-push pair: consume both values without checking for op_bra/op_ket
        def.push_back(v);
        if (!queue.empty())
        {
          def.push_back(queue.front());
          queue.pop_front();
        }
      }
      else
      {
        if (v == mpz_int(static_cast<int>(op_bra))) depth++;
        else if (v == mpz_int(static_cast<int>(op_ket))) depth--;
        if (depth > 0) def.push_back(v);
      }
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
      enqueueOp(o);
    }
    break;
  }
  case op_pow:
  {
    auto a = POP();
    stack.top() = ipow(stack.top(), a);
    break;
  }
  case op_exit:
  {
    auto n = POP();
    std::exit(n.convert_to<int>());
  }
  case op_getc:
  {
    int c = std::getchar();
    stack.push(c == EOF ? mpz_int(0) : mpz_int(c));
    break;
  }
  case op_stash:
  {
    int len = (int)stack.size();
    std::vector<mpz_int> tmp;
    while (!stack.empty()) {
      mpz_int v = POP();
      tmp.push_back(v);
    }
    // tmp is now top-to-bottom; push bottom-to-top into stash_queue
    for (auto it = tmp.rbegin(); it != tmp.rend(); ++it)
      stash_queue.push_back(*it);
    stash_queue.push_back(mpz_int(len));
    break;
  }
  case op_fetch:
  {
    mpz_int count_val = stash_queue.back();
    stash_queue.pop_back();
    int len = count_val.convert_to<int>();
    // Collect stashed values (stored bottom-to-top in stash_queue, so pop from back gives top-to-bottom)
    std::vector<mpz_int> stashed;
    for (int i = 0; i < len; i++) {
      stashed.push_back(stash_queue.back());
      stash_queue.pop_back();
    }
    // stashed is now top-to-bottom; reverse to get bottom-to-top order
    std::reverse(stashed.begin(), stashed.end());
    // Drain current stack so we can insert stashed values at the bottom
    std::vector<mpz_int> current;
    while (!stack.empty()) {
      current.push_back(stack.top());
      stack.pop();
    }
    // current is top-to-bottom; push stashed (bottom-to-top) first, then current (bottom-to-top)
    for (auto& v : stashed)
      stack.push(v);
    for (auto it = current.rbegin(); it != current.rend(); ++it)
      stack.push(*it);
    break;
  }
  case op_ket:
    // no-op: standalone ] outside quotation context
    break;
  case op_cons:
  {
    auto y = POP();  // top
    auto x = POP();  // below top
    Definition def;
    def.push_back(mpz_int(0)); def.push_back(x);  // push x
    if (y != 0) {
      def.push_back(y);  // append y directly
    }
    auto n = getSymbol();
    defineUser(n, def);
    stack.push(mpz_int(n));
    break;
  }
  }
}

void enqueue_front(const Definition& def)
{
  queue.insert(queue.begin(), def.begin(), def.end());
}

void enqueue_back(const Queue& q)
{
  queue.insert(queue.end(), q.begin(), q.end());
}

bool tryParseNumber(const std::string& s, mpz_int& result)
{
  // Guard: bare + and - are operator tokens, not numeric literals
  if (s == "+" || s == "-")
    return false;

  // Strip all _ characters unconditionally
  std::string t;
  t.reserve(s.size());
  for (char c : s)
    if (c != '_') t += c;

  if (t.empty())
    return false;

  try
  {
    // Handle optional leading minus
    bool negative = false;
    std::string digits = t;
    if (!digits.empty() && digits[0] == '-')
    {
      negative = true;
      digits = digits.substr(1);
    }

    if (digits.empty())
      return false;

    // Detect base prefix
    if (digits.size() >= 2 && digits[0] == '0')
    {
      char prefix = digits[1];
      if (prefix == 'x' || prefix == 'X')
      {
        // Hexadecimal
        std::string hex_digits = digits.substr(2);
        if (hex_digits.empty()) return false;
        mpz_int val;
        if (mpz_set_str(val.backend().data(), hex_digits.c_str(), 16) != 0)
          return false;
        result = negative ? -val : val;
        return true;
      }
      else if (prefix == 'b' || prefix == 'B')
      {
        // Binary
        std::string bin_digits = digits.substr(2);
        if (bin_digits.empty()) return false;
        mpz_int val;
        if (mpz_set_str(val.backend().data(), bin_digits.c_str(), 2) != 0)
          return false;
        result = negative ? -val : val;
        return true;
      }
      else if (prefix == 'o' || prefix == 'O')
      {
        // Octal
        std::string oct_digits = digits.substr(2);
        if (oct_digits.empty()) return false;
        mpz_int val;
        if (mpz_set_str(val.backend().data(), oct_digits.c_str(), 8) != 0)
          return false;
        result = negative ? -val : val;
        return true;
      }
    }

    // Check for scientific notation (e or E present, no base prefix)
    bool has_sci = (digits.find('e') != std::string::npos ||
                    digits.find('E') != std::string::npos);
    if (has_sci)
    {
      double d = std::stod(t);  // use original t (with sign) for stod
      d = std::trunc(d);
      result = mpz_int(static_cast<long long>(d));
      return true;
    }

    // Fall through to decimal
    result = mpz_int(t);
    return true;
  }
  catch (...)
  {
    return false;
  }
}

std::deque<std::string> tokenize(const std::string& source)
{
  std::deque<std::string> result;
  std::istringstream iss(source);
  for (std::string s; iss >> s;)
  {
    result.push_back(s);
  }
  return result;
}

void callOp(int op)
{
  if (op < 256)
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
      case '0':
        c = '\0';
        break;
      // all other escapes
      default:
        // invalid escape sequence - skip it
        continue;
      }
    }
    res += c;
  }

  return res;
}

void run()
{
  while (!queue.empty())
  {
    mpz_int v = queue.front();
    queue.pop_front();

    if (v == 0)
    {
      // literal push: next value is the integer to push
      stack.push(queue.front());
      queue.pop_front();
    }
    else if (v > 0 && v < 256)
    {
      callSystem(v.convert_to<int>());
    }
    else if (v >= 256)
    {
      auto it = defs.find(v.convert_to<int>());
      if (it == defs.end())
      {
        std::cerr << "error: undefined opcode " << v << "\n";
        std::exit(1);
      }
      // prepend definition to front of queue
      queue.insert(queue.begin(), it->second.begin(), it->second.end());
    }
    else
    {
      // negative: literal integer
      stack.push(v);
    }
  }
}
