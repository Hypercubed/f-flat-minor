# F♭m VSCode Extension

Syntax highlighting and language support for [f-flat-minor](https://github.com/Hypercubed/f-flat-minor) (F♭m), a minimal stack-oriented programming language.

## Features

- Syntax highlighting for `.ff` and `.ffp` files
- Preprocessor command-line highlighting in `.ffp` files (lines that begin with `.`)
- Block comment support (`/* */`)
- Bracket matching for code blocks (`[ ]`)
- Language configuration for editor features

## Installation

### Option 1: Symlink (Recommended for Development)

Symlink this extension to your local VSCode extensions folder:

```bash
# From the f-flat-minor project root
ln -s "$(pwd)/vscode-f-flat-minor" ~/.vscode/extensions/hypercubed.ff-minor
```

Then restart VSCode.

### Option 2: Extension Development Host

1. Open the `vscode-f-flat-minor` folder in VSCode
2. Press `F5` to launch the Extension Development Host
3. The extension will be loaded in a new window

### Option 3: Package and Install

```bash
# Install dependencies
cd vscode-f-flat-minor
npm install

# Package the extension
npm run package

# This creates a .vsix file that can be installed via:
# VS Code: Extensions > Install from VSIX...
```

## Supported File Types

| Extension | Description |
|-----------|-------------|
| `.ff` | Basic f-flat-minor source |
| `.ffp` | Source with preprocessor directives |

## Syntax Features

- **Strings**: Single quotes only (`'Hello\sWorld'` - use `\s` for space)
- **Numbers**: Decimal, binary (`0b111`), octal (`0o111`), hex (`0x111`), with underscore separators (`1_000_000`)
- **Directives**: `.load`, `.m`, `.inline`, etc.
- **Word definitions**: End with colon (`word:`)
- **Code blocks**: Square brackets (`[ ]`)

## License

Same as f-flat-minor project.
