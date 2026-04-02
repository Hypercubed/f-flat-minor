# F♭m VSCode Extension

Syntax highlighting and language support for [f-flat-minor](https://github.com/Hypercubed/f-flat-minor) (F♭m), a minimal stack-oriented programming language.

## Features

- Syntax highlighting for `.ff` and `.ffp` under one language id (`f-flat-minor`)
- **Import navigation**: For `.import` / `.load` lines, the path is a **document link** (Ctrl+Click / Cmd+Click; underline on Ctrl/Cmd-hover) and **Go to Definition** (F12) when the target file exists. Resolution matches the preprocessor (relative to the current file, then absolute fallback). Works in local workspaces and **Remote — WSL / SSH / Dev Containers** via the workspace file API and `vscode-remote` link targets.
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
cd vscode-f-flat-minor && npm install && npm run compile && cd ..
ln -s "$(pwd)/vscode-f-flat-minor" ~/.vscode/extensions/hypercubed.ff-minor
```

Then restart VSCode. (Cursor uses `~/.cursor/extensions/` for the symlink target if you use Cursor.)

### Option 2: Extension Development Host

1. From `vscode-f-flat-minor`, run `npm install` and `npm run compile` (builds `out/extension.js`)
2. Open the `vscode-f-flat-minor` folder in VSCode
3. Press `F5` to launch the Extension Development Host
4. The extension will be loaded in a new window

### Option 3: Package and Install

```bash
# Install dependencies and compile TypeScript
cd vscode-f-flat-minor
npm install
npm run compile

# Package the extension
npm run package

# This creates a .vsix file that can be installed via:
# VS Code / Cursor: Extensions > … menu > Install from VSIX...
```

After installing or updating, run **Developer: Reload Window** so grammars and default token colors reload.

### Remote — WSL (VSIX)

Install the `.vsix` from a window that is **connected to WSL** (green remote indicator in the status bar). In **Extensions**, the entry should show it is enabled for **WSL** (or use **Install in WSL** if VS Code offers it). A copy installed only on the **local** host will not see Linux files for import links. After changing versions, **Reload Window**; if the UI still shows an old build, uninstall, quit the app, confirm the old extension folder under `~/.vscode/extensions/` or `~/.cursor/extensions/` is gone, then reinstall.

### Cursor / VS Code: confirm you have the right build

1. **Extensions** panel: find **F♭m (f-flat-minor) Language Support** and check the **version** matches the `.vsix` you installed.
2. Status bar (bottom right): open an `.ff` / `.ffp` file and confirm the language mode is **F♭m** or **f-flat-minor** (not Plain Text). Set **Change Language Mode** if needed.
3. Cursor keeps extensions under `~/.cursor/extensions/` (VS Code uses `~/.vscode/extensions/`).

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
