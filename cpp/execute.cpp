#include "ff.h"
#include <unistd.h>  // readlink

static const std::string MAGIC = "FbAbbCb";

// Read bytecode payload from stdin.
// Validates magic header, strips it, returns payload.
static std::string readBytecodeStdin()
{
    std::string contents((std::istreambuf_iterator<char>(std::cin)),
                          std::istreambuf_iterator<char>());

    if (contents.empty()) {
        std::cerr << "error: stdin is empty\n";
        std::exit(1);
    }
    if (contents.size() < MAGIC.size() || contents.substr(0, MAGIC.size()) != MAGIC) {
        std::cerr << "error: stdin does not begin with valid magic header\n";
        std::exit(1);
    }
    return contents.substr(MAGIC.size());
}

// Resolve the path of the running binary.
// Tries /proc/self/exe first; falls back to argv[0].
static std::string resolveSelfPath(const char* argv0)
{
    char buf[4096];
    ssize_t len = readlink("/proc/self/exe", buf, sizeof(buf) - 1);
    if (len != -1) {
        buf[len] = '\0';
        return std::string(buf);
    }
    return std::string(argv0);
}

// Read bytecode payload appended to the binary at `path`.
// Scans backwards for the last occurrence of the magic header.
// Strips the header and returns the payload.
static std::string readBytecodeAppended(const std::string& path)
{
    std::ifstream file(path, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "error: cannot open self binary '" << path << "'\n";
        std::exit(1);
    }

    std::string contents((std::istreambuf_iterator<char>(file)),
                          std::istreambuf_iterator<char>());

    std::size_t pos = contents.rfind(MAGIC);
    if (pos == std::string::npos) {
        std::cerr << "error: no embedded bytecode payload found in '" << path << "'\n";
        std::exit(1);
    }
    return contents.substr(pos + MAGIC.size());
}

int main(int argc, char* argv[])
{
    if (argc > 2) {
        std::cerr << "usage: execute <file>.ffb\n"
                  << "       execute -\n"
                  << "       execute\n";
        return 1;
    }

    setup();

    std::string payload;
    if (argc == 2 && std::string(argv[1]) != "-") {
        // File mode (existing behaviour)
        payload = readBytecodeFile(argv[1]);
    } else if (argc == 2) {
        // Stdin mode
        payload = readBytecodeStdin();
    } else {
        // Self-executing mode
        std::string selfPath = resolveSelfPath(argv[0]);
        payload = readBytecodeAppended(selfPath);
    }

    executeBytecode(payload);
    return 0;
}
