#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <stack>
#include <queue>
#include <deque>
#include <cmath>
#include <map>
#include <boost/multiprecision/gmp.hpp>

namespace mp = boost::multiprecision;

using BigInt = mp::mpz_int;
using String = std::string;
using Stack = std::stack<BigInt>;
using Queue = std::deque<String>;
using Definition = std::stack<String>;

#define POP()  \
  stack.top(); \
  stack.pop();

std::deque<String> queue;
Stack stack;
Stack rstack;

std::map<String, int> symbols;
std::map<int, Definition> defs;

int nextOp = 255;

void callOp(int op);
void callOp(BigInt op);

std::queue<String> tokenize(const String &str)
{
  std::queue<String> result;
  std::istringstream iss(str);
  for (String s; iss >> s;)
    result.push(s);
  return result;
}

int getSymbol(const String &str)
{
  if (symbols.find(str) != symbols.end())
    return symbols[str];
  symbols[str] = nextOp++;
  return symbols[str];
}

enum op_code
{
  op_nop = 0,
  op_call = 1,
  op_putc = 2,
  op_drop = 8,
  op_pushr = 14,
  op_pullr = 15,
  op_shiftl = 16,
  op_shiftr = 17,
  op_clr = 24,
  op_dup = 33,
  op_swap = 36,
  op_mod = 37,
  op_add = 43,
  op_sub = 45,
  op_prn = 46,
  op_mul = 42,
  op_div = 47,
  op_mark = 58,
  op_def = 59,
  op_lt = 60,
  op_eq = 61,
  op_gt = 62,
  op_when = 63,
  op_pow = 94
};

void setup()
{
  symbols["nop"] = op_nop;
  symbols["eval"] = op_call;
  symbols["putc"] = op_putc;
  symbols["drop"] = op_drop;
  symbols["<<"] = op_shiftl;
  symbols[">>"] = op_shiftr;
  symbols["clr"] = op_clr;
  symbols["%"] = op_mod;
  symbols["+"] = op_add;
  symbols["-"] = op_sub;
  symbols["*"] = op_mul;
  symbols["/"] = op_div;
  symbols["."] = op_prn;
  symbols["^"] = op_pow;
  symbols[":"] = op_mark;
  symbols[";"] = op_def;
  symbols["swap"] = op_swap;
  symbols["q<"] = op_pushr;
  symbols["q>"] = op_pullr;
  symbols["dup"] = op_dup;
  symbols["<"] = op_lt;
  symbols["="] = op_eq;
  symbols[">"] = op_gt;
  symbols["?"] = op_when;
}

void printStack(Stack st)
{
  if (st.empty())
    return;

  BigInt t = st.top();
  st.pop();
  printStack(st);

  std::cout << t << ' ';
}

BigInt ipow_internal(const BigInt &base, const BigInt &exp)
{
  if (exp == 0)
    return 1;
  if (exp == 1)
    return base;

  BigInt pow = ipow_internal(base, exp / 2);
  pow = pow * pow;
  return (exp % 2 == 0) ? pow : pow * base;
}

BigInt ipow(const BigInt &base, const BigInt &exp)
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

void callSystem(int op)
{
  switch (op)
  {
  case op_nop:
    break;
  case op_call:
  {
    BigInt a = POP();
    callOp(a);
    break;
  }
  case op_putc:
  {
    BigInt a = POP();
    std::cout << (char)a.convert_to<int>();
    break;
  }
  case op_drop:
  {
    POP();
    break;
  }
  case op_pushr:
  {
    BigInt a = POP();
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
  case op_dup:
  {
    BigInt a = stack.top();
    stack.push(a);
    break;
  }
  case op_swap:
  {
    BigInt a = POP();
    BigInt b = stack.top();
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
    BigInt n = POP();
    defs[n.convert_to<int>()] = def;
    break;
  }
  case op_mod:
  {
    BigInt a = POP();
    stack.top() %= a;
    break;
  }
  case op_shiftl:
  {
    BigInt a = POP();
    BigInt b = stack.top();
    stack.top() = b * ipow(2, a);
    break;
  }
  case op_shiftr:
  {
    BigInt a = POP();
    BigInt b = stack.top();
    stack.top() = b / ipow(2, a);
    break;
  }
  case op_add:
  {
    BigInt a = POP();
    stack.top() += a;
    break;
  }
  case op_sub:
  {
    BigInt t = POP();
    stack.top() -= t;
    break;
  }
  case op_mul:
  {
    BigInt a = POP();
    BigInt b = POP();
    stack.push(a * b);
    break;
  }
  case op_div:
  {
    BigInt t = POP();
    stack.top() /= t;
    break;
  }
  case op_lt:
  {
    BigInt a = POP();
    BigInt b = stack.top();
    stack.top() = (b < a);
    break;
  }
  case op_gt:
  {
    BigInt a = POP();
    BigInt b = stack.top();
    stack.top() = (b > a);
    break;
  }
  case op_eq:
  {
    BigInt a = POP();
    BigInt b = stack.top();
    stack.top() = (b == a);
    break;
  }
  case op_prn:
    std::cout << "[ ";
    printStack(stack);
    std::cout << "]\n";
    break;
  case op_when:
  {
    BigInt o = POP();
    BigInt b = POP();
    if (b != 0)
    {
      callOp(o);
    }
    break;
  }
  case op_pow:
  {
    BigInt a = POP();
    BigInt b = stack.top();
    stack.top() = ipow(b, a);
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

void enqueue_back(std::queue<String> q)
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

void callOp(BigInt op)
{
  callOp(op.convert_to<int>());
}

int main()
{
  setup();

  for (String line; std::getline(std::cin, line);)
  {
    std::queue<String> q = tokenize(line);
    enqueue_back(tokenize(line));
  }

  while (!queue.empty())
  {
    String str = queue.front();
    queue.pop_front();

    try
    {
      BigInt i = std::stol(str);
      stack.push(i);
    }
    catch (...)
    {
      if (str[0] == '.' && str.size() > 1)
      {
        // nop
      }
      else if (str[0] == '[' && str.back() == ']')
      {
        stack.push(getSymbol(str.substr(1, str.size() - 2)));
      }
      else if (str.rfind("/*") == 0)
      {
        do
        {
          str = queue.front();
          queue.pop_front();
        } while (str.rfind("*/") != str.size() - 2);
      }
      else if (symbols.find(str) != symbols.end())
      {
        callOp(symbols[str]);
      }
      else
      {
        throw std::invalid_argument("undefined call: " + str);
      }
    }
  }

  return 0;
}
