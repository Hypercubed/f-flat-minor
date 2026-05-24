#include "ff.h"

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
    enqueue_back(tokenize(content));
  } else {
    std::string content((std::istreambuf_iterator<char>(std::cin)),
                         std::istreambuf_iterator<char>());
    enqueue_back(tokenize(content));
  }

  run();

  return 0;
}
