#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <stack>
#include <queue>
#include <deque>
#include <cmath>
#include <map>

#include "BigInt.hpp"

using INT = BigInt;

#define  POP() \
  stack.top(); \
  stack.pop();

std::deque<std::string> queue;
std::stack<INT> stack;
std::stack<INT> rstack;

std::map<std::string, INT> symbols;
std::map<INT, std::stack<std::string>> defs;

INT nextOp = 255;

void callOp(INT op);

std::queue<std::string> tokenize(const std::string& str) {
	std::queue<std::string> result;
	std::istringstream iss(str);
	for (std::string s; iss >> s; )
		result.push(s);
	return result;
}

INT getSymbol(const std::string& str) {
  if (symbols.find(str) != symbols.end())
    return symbols[str];
  symbols[str] = nextOp++;
  return symbols[str];
}

enum op_code {
  op_nop = 0,
  op_call = 1,
  op_drop = 8,
  op_pushr = 14,
  op_pullr = 15,
  op_dup = 33,
  op_swap = 36,
  op_add = 43,
  op_sub = 45,
  op_prn = 46,
  op_mul = 42,
  op_div = 47,
  op_mark = 58,
  op_def = 59,
  op_when = 63,
  op_pow = 94
};

void setup() {
  symbols["nop"] = op_nop;
  symbols["drop"] = op_drop;
  symbols["+"] = op_add;
  symbols["-"] = op_sub;
  symbols["*"] = op_mul;
  symbols["/"] = op_div;
  symbols["."] = op_prn;
  symbols["^"] = op_pow;
  symbols[":"] = op_mark;
  symbols[";"] = op_def;
  symbols["eval"] = op_call;
  symbols["swap"] = op_swap;
  symbols["q<"] = op_pushr;
  symbols["q>"] = op_pullr;
  symbols["dup"] = op_dup;
  symbols["?"] = op_when;
}

void printStack(std::stack<INT> st) {
  if (st.empty()) return;

  INT t = st.top();
  st.pop();
  printStack(st);

  std::cout << t << ' ';
}

void callSystem(int op) {
  switch (op) {
    case op_nop:
      break;
    case op_call: {
      INT a = POP();
      callOp(a);
      break;
    }
    case op_drop: {
      POP();
      break;
    }
    case op_pushr: {
      INT a = POP();
      rstack.push(a);
      break;
    }
    case op_pullr: {
      stack.push(rstack.top());
      rstack.pop();
      break;
    }
    case op_dup: {
      INT a = stack.top();
      stack.push(a);
      break;
    }
    case op_swap: {
      INT a = POP();
      INT b = stack.top();
      stack.top() = a;
      stack.push(b);
      break;
    }
    case op_mark: {
      std::stack<std::string> def;
      while (!queue.empty() && queue.front() != ";") {
        def.push(queue.front());
        queue.pop_front();
      }
      queue.pop_front();
      INT n = POP();
      defs[n] = def;
      break;
    }
    case op_add: {
      INT a = POP();
      stack.top() += a;
      break;
    }
    case op_sub: {
      INT t = POP();
      stack.top() -= t;
      break;
    }
    case op_mul: {
      INT a = POP();
      INT b = POP();
      stack.push(a * b);
      break;
    }
    case op_div: {
      INT t = POP();
      stack.top() /= t;
      break;
    }
    case op_prn:
      std::cout << "[ ";
      printStack(stack);
      std::cout << "]\n";
      break;
    case op_when: {
      INT o = POP();
      INT b = POP();
      if (b != 0) {
        callOp(o);
      }
      break;
    }
    case op_pow: {
      INT a = POP();
      stack.top() = pow(stack.top(), a.to_int());
      break;
    }
  }
}

void enqueue_front(std::stack<std::string> q) {
  while (!q.empty()) {
    queue.push_front(q.top());
    q.pop();
  }
}

void enqueue_back(std::queue<std::string> q) {
  while (!q.empty()) {
    queue.push_back(q.front());
    q.pop();
  }
}

void callOp(INT op) {
  if (op < 255) {
    callSystem(op.to_int());
    return;
  }
  enqueue_front(defs[op]);
}

int main() {
  setup();

  for (std::string line; std::getline(std::cin, line);) {
    std::queue<std::string> q = tokenize(line);
    enqueue_back(tokenize(line));
  }

  while (!queue.empty()) {
    std::string str = queue.front();
    queue.pop_front();

    try {
      INT i = std::stoi(str);
      stack.push(i);
    } catch(...) {
      if (str[0] == '.' && str.size() > 1) {
        // nop
      } else if (str[0] == '[' && str.back() == ']') {
        stack.push(getSymbol(str.substr(1, str.size() - 2)));
      } else if (symbols.find(str) != symbols.end()){
        callOp(symbols[str]);
      } else {
        throw std::invalid_argument("undefined call: " + str);
      }
    }
  }

  return 0;
}