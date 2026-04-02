# F♭m VSCode Extension

Syntax highlighting and language support for [f-flat-minor](https://github.com/Hypercubed/f-flat-minor) (F♭m), a minimal stack-oriented programming language.

## Features

- Syntax highlighting for `.ff` and `.ffp` under one language id (`f-flat-minor`)
- Preprocessor lines (`.import`, `.load`, `.m`, `.ff`, `.ffp`, `.exit` at line start) use preprocessor styling
- Compiler annotations (e.g. `.inline`, `.unsafe` after `;` or elsewhere) use muted gray styling (preprocessor lines are italic)
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
# VS Code / Cursor: Extensions > … menu > Install from VSIX...
```

After installing or updating, run **Developer: Reload Window** so grammars and default token colors reload.

### Cursor / VS Code: confirm you have the right build

1. **Extensions** panel: find **F♭m (f-flat-minor) Language Support** and check the **version** (must match the `.vsix` you installed, e.g. `0.0.3`).
2. Status bar (bottom right): open an `.ff` / `.ffp` file and confirm the language mode is **F♭m** or **f-flat-minor** (not Plain Text). Set **Change Language Mode** if needed.
3. Cursor keeps extensions under `~/.cursor/extensions/` (VS Code uses `~/.vscode/extensions/`). If colors never change, uninstall the extension, quit the app, confirm the old `hypercubed.vscode-f-flat-minor-*` folder is gone, then install the new `.vsix` again and reload.

Muted gray for `.inline` / preprocessor lines comes from **default token color rules** in this extension. If you have **`editor.tokenColorCustomizations`** in user or workspace settings, those can override extension defaults.

## Supported File Types

| Extension | Description |
|-----------|-------------|
| `.ff` | Basic f-flat-minor source |
| `.ffp` | Source with preprocessor directives |

## Syntax Features

- **Strings**: Single quotes only (`'Hello\sWorld'` - use `\s` for space)
- **Numbers**: Decimal, binary (`0b111`), octal (`0o111`), hex (`0x111`), with underscore separators (`1_000_000`)
- **Preprocessor** (line-leading): `.import`, `.load`, `.m`, `.ff`, `.ffp`, `.exit`
- **Compiler annotations** (dot-words): `.inline`, `.unsafe`, etc.
- **Word definitions**: End with colon (`word:`)
- **Code blocks**: Square brackets (`[ ]`)

## License

Same as f-flat-minor project.
