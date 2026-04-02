import * as path from "path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import * as vscode from "vscode";

/**
 * Match Preprocessor.findFile in typescript/core/src/preprocess.ts.
 * Uses workspace.fs (not Node fs) so existence checks work in Remote — WSL/SSH
 * when the extension runs on the UI host or the path only exists on the remote.
 */
async function resolveImportPath(
  documentUri: vscode.Uri,
  sourceFile: string,
  userPath: string,
): Promise<string | null> {
  const filename = userPath.trim();
  if (!filename) {
    return null;
  }

  const candidates: string[] = [];
  if (sourceFile && sourceFile !== "-" && !path.isAbsolute(filename)) {
    candidates.push(path.resolve(path.dirname(sourceFile), filename));
  }
  candidates.push(filename);

  const seen = new Set<string>();
  for (const p of candidates) {
    if (seen.has(p)) {
      continue;
    }
    seen.add(p);
    const uri = uriForResolvedPath(documentUri, p);
    try {
      await vscode.workspace.fs.stat(uri);
      return p;
    } catch {
      // try next candidate
    }
  }
  return null;
}

/** Target URI that opens correctly for local file: and Remote vscode-remote: workspaces. */
function uriForResolvedPath(documentUri: vscode.Uri, resolvedFsPath: string): vscode.Uri {
  const normalized = resolvedFsPath.replace(/\\/g, "/");
  if (documentUri.scheme === "vscode-remote") {
    return documentUri.with({ path: normalized });
  }
  return vscode.Uri.file(resolvedFsPath);
}

const IMPORT_LINE = /^\.(import|load)\s+/;
const ERS_OUTPUT_CHANNEL_NAME = "F-flat-minor ERS";
const execFileAsync = promisify(execFile);

function pathRangeInLine(line: vscode.TextLine): {
  range: vscode.Range;
  pathText: string;
} | null {
  const text = line.text;
  const m = IMPORT_LINE.exec(text);
  if (!m) {
    return null;
  }
  const afterCmd = text.slice(m[0].length);
  const trimStart = afterCmd.length - afterCmd.trimStart().length;
  const pathPart = afterCmd.trim();
  if (!pathPart) {
    return null;
  }
  const startChar = m[0].length + trimStart;
  const endChar = startChar + pathPart.length;
  const range = new vscode.Range(
    line.lineNumber,
    startChar,
    line.lineNumber,
    endChar,
  );
  return { range, pathText: pathPart };
}

/** Paths on disk; skip untitled buffers without a saved path. */
function sourcePathOrNull(document: vscode.TextDocument): string | null {
  if (document.uri.scheme === "untitled") {
    return null;
  }
  const fp = document.uri.fsPath;
  return fp.length > 0 ? fp : null;
}

const docSelector: vscode.DocumentSelector = { language: "f-flat-minor" };

function ersCliPath(context: vscode.ExtensionContext) {
  return path.resolve(context.extensionPath, "../node/bin/ers.ts");
}

async function runErsAuditForCursor(
  context: vscode.ExtensionContext,
  document: vscode.TextDocument,
  position: vscode.Position,
) {
  const cli = ersCliPath(context);
  const args = [
    "--experimental-transform-types",
    "--disable-warning=ExperimentalWarning",
    cli,
    "audit",
    document.uri.fsPath,
    "--line",
    String(position.line),
    "--character",
    String(position.character),
    "--json",
  ];
  const { stdout } = await execFileAsync("node", args, {
    cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? path.dirname(document.uri.fsPath),
  });
  return stdout.trim();
}

async function documentLinksForImports(
  document: vscode.TextDocument,
  sourcePath: string,
): Promise<vscode.DocumentLink[]> {
  const docUri = document.uri;
  const links: vscode.DocumentLink[] = [];
  for (let i = 0; i < document.lineCount; i++) {
    const pr = pathRangeInLine(document.lineAt(i));
    if (!pr) {
      continue;
    }
    const resolved = await resolveImportPath(docUri, sourcePath, pr.pathText);
    if (!resolved) {
      continue;
    }
    links.push(
      new vscode.DocumentLink(pr.range, uriForResolvedPath(docUri, resolved)),
    );
  }
  return links;
}

export function activate(context: vscode.ExtensionContext): void {
  const ersOutput = vscode.window.createOutputChannel(ERS_OUTPUT_CHANNEL_NAME);
  const linkProvider: vscode.DocumentLinkProvider = {
    provideDocumentLinks(
      document: vscode.TextDocument,
    ): vscode.ProviderResult<vscode.DocumentLink[]> {
      const sourcePath = sourcePathOrNull(document);
      if (!sourcePath) {
        return [];
      }
      return documentLinksForImports(document, sourcePath);
    },
  };

  const definitionProvider: vscode.DefinitionProvider = {
    async provideDefinition(
      document: vscode.TextDocument,
      position: vscode.Position,
    ): Promise<vscode.Definition | undefined> {
      const sourcePath = sourcePathOrNull(document);
      if (!sourcePath) {
        return undefined;
      }
      const line = document.lineAt(position.line);
      const pr = pathRangeInLine(line);
      if (!pr || !pr.range.contains(position)) {
        return undefined;
      }
      const docUri = document.uri;
      const resolved = await resolveImportPath(docUri, sourcePath, pr.pathText);
      if (!resolved) {
        return undefined;
      }
      return new vscode.Location(
        uriForResolvedPath(docUri, resolved),
        new vscode.Position(0, 0),
      );
    },
  };

  const auditCurrentDefinition = vscode.commands.registerCommand(
    "f-flat-minor.auditCurrentDefinition",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "f-flat-minor") {
        void vscode.window.showErrorMessage("Open an f-flat-minor file to audit the current definition.");
        return;
      }

      const sourcePath = sourcePathOrNull(editor.document);
      if (!sourcePath) {
        void vscode.window.showInformationMessage(
          "Save the current f-flat-minor file before running ERS audit.",
        );
        return;
      }

      try {
        ersOutput.clear();
        const stdout = await runErsAuditForCursor(context, editor.document, editor.selection.active);
        ersOutput.append(stdout);
        ersOutput.show(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        void vscode.window.showErrorMessage(`ERS audit failed: ${message}`);
      }
    },
  );

  context.subscriptions.push(
    ersOutput,
    auditCurrentDefinition,
    vscode.languages.registerDocumentLinkProvider(docSelector, linkProvider),
    vscode.languages.registerDefinitionProvider(docSelector, definitionProvider),
  );
}

export function deactivate(): void {}
