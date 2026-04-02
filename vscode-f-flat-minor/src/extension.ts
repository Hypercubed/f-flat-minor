import * as path from "path";
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

  context.subscriptions.push(
    vscode.languages.registerDocumentLinkProvider(docSelector, linkProvider),
    vscode.languages.registerDefinitionProvider(docSelector, definitionProvider),
  );
}

export function deactivate(): void {}
