#pragma once

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
#include <functional>
#include <boost/multiprecision/gmp.hpp>
#include <boost/random.hpp>
#include <boost/algorithm/string.hpp>

using namespace boost::multiprecision;

using Stack = std::stack<mpz_int>;
using Queue = std::deque<std::string>;
using Definition = std::stack<std::string>;

// Global VM state (defined in ff.cpp)
extern Stack stack;
extern Queue queue;
extern Stack rstack;
extern std::deque<mpz_int> stash_queue;
extern std::map<std::string, int> symbols;
extern std::map<int, Definition> defs;
extern int nextOp;

extern const mpz_int TWO;
extern boost::random::mt19937 mt;

#define POP()  \
  stack.top(); \
  stack.pop();

enum op_code
{
  op_nop    = 0,
  op_eval   = 1,
  op_putc   = 2,
  op_getc   = 3,
  op_putn   = 5,
  op_clock  = 6,
  op_drop   = 8,
  op_pushr  = 14,
  op_pullr  = 15,
  op_shiftl = 16,
  op_shiftr = 17,
  op_clr    = 24,
  op_rand   = 26,
  op_exit   = 27,
  op_dup    = 33,
  op_depth  = 35,
  op_swap   = 36,
  op_mod    = 37,
  op_and    = 38,
  op_stash  = 40,
  op_fetch  = 41,
  op_mul    = 42,
  op_add    = 43,
  op_cons   = 44,
  op_sub    = 45,
  op_dump   = 46,
  op_div    = 47,
  op_mark   = 58,
  op_def    = 59,
  op_lt     = 60,
  op_eq     = 61,
  op_gt     = 62,
  op_when   = 63,
  op_bra    = 91,
  op_ket    = 93,
  op_pow    = 94,
  op_or     = 124,
  op_not    = 126
};

// Core VM functions
void setup();
void callOp(int op);
void callOp(mpz_int op);
void callSystem(int op);
void run();

// Helper functions
int getSymbol(const std::string& str);
int getSymbol();
void defineUser(const int& op, const Definition def);
void enqueue_front(Definition q);
void enqueue_back(std::queue<std::string> q);

// Numeric parsing
bool tryParseNumber(const std::string& s, mpz_int& result);

// Tokenizer
std::deque<std::string> tokenize(const std::string& source);

// Bytecode support
std::vector<mpz_int> vlqDecode(const std::string& encoded);
void executeBytecode(const std::string& encoded);
std::string readBytecodeFile(const std::string& path);
