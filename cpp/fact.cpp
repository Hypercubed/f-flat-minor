#include <iostream>
#include <boost/multiprecision/cpp_int.hpp>

using namespace boost::multiprecision;

cpp_int factorial(cpp_int n) {
  return n == 0 ? cpp_int(1) : n * factorial(n - 1);
}

int main()
{
  std::cout << "Factorial 100:" << std::endl;
  std::cout << "[ " << factorial(100) << " ]" << std::endl;
}
