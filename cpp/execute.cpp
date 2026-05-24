#include "ff.h"

int main(int argc, char* argv[])
{
    setup();
    std::string encoded = readBytecodeFile(argv[1]);
    executeBytecode(encoded);
    return 0;
}
