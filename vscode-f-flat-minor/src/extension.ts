import * as fs from "node:fs";
import { homedir } from "node:os";
import * as path from "path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import * as vscode from "vscode";

import {
  lookupCoreVocabularyEntry,
  markdownForCorePrimitiveHover,
  shouldOfferCoreVocabHover,
  whitespaceTokenRangeAt,
} from "./core-vocabulary-hover";

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

const ERS_CLI_SEGMENTS = ["node", "bin", "ers.ts"] as const;

function ersTsCandidateAt(root: string): string {
  return path.join(root, ...ERS_CLI_SEGMENTS);
}

/** Walk parents of `startDir` looking for `node/bin/ers.ts` (full f-flat-minor checkout). */
function findErsTsWalkingUp(startDir: string): string | null {
  let dir = path.resolve(startDir);
  for (;;) {
    const candidate = ersTsCandidateAt(dir);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return null;
}

/**
 * Prefer: user setting → bundled `out/ers-cli.mjs` → walk up from the open file → workspace roots.
 * The old `extensionPath/../node/...` path is wrong for installed extensions (it becomes
 * `.../extensions/node/...`).
 */
function resolveErsScriptPath(
  context: vscode.ExtensionContext,
  document: vscode.TextDocument,
): string | null {
  const configured = vscode.workspace
    .getConfiguration("f-flat-minor")
    .get<string>("ersScript")
    ?.trim();
  if (configured) {
    const expanded = configured.replace(/^~(?=\/|\\)/, homedir());
    if (fs.existsSync(expanded)) {
      return expanded;
    }
  }

  const bundled = path.join(context.extensionPath, "out", "ers-cli.mjs");
  if (fs.existsSync(bundled)) {
    return bundled;
  }

  const sourcePath = sourcePathOrNull(document);
  if (sourcePath) {
    const fromFile = findErsTsWalkingUp(path.dirname(sourcePath));
    if (fromFile) {
      return fromFile;
    }
  }

  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    const candidate = ersTsCandidateAt(folder.uri.fsPath);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function nodeArgsForErsScript(scriptPath: string, auditArgs: string[]): string[] {
  const isBundled = scriptPath.endsWith("ers-cli.mjs");
  if (isBundled) {
    return [scriptPath, ...auditArgs];
  }
  return [
    "--experimental-transform-types",
    "--disable-warning=ExperimentalWarning",
    scriptPath,
    ...auditArgs,
  ];
}

function ersAuditCwd(document: vscode.TextDocument): string {
  return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? path.dirname(document.uri.fsPath);
}

async function execErsAudit(
  context: vscode.ExtensionContext,
  document: vscode.TextDocument,
  auditArgs: string[],
): Promise<string> {
  const scriptPath = resolveErsScriptPath(context, document);
  if (!scriptPath) {
    throw new Error(
      "Could not find the ERS tool. Reinstall or rebuild the extension (missing bundled `out/ers-cli.mjs`), or set `f-flat-minor.ersScript` to `node/bin/ers.ts` inside an f-flat-minor checkout.",
    );
  }
  const nodeArgs = nodeArgsForErsScript(scriptPath, auditArgs);
  const { stdout } = await execFileAsync("node", nodeArgs, {
    cwd: ersAuditCwd(document),
  });
  return stdout.trim();
}

async function runErsAuditForCursor(
  context: vscode.ExtensionContext,
  document: vscode.TextDocument,
  position: vscode.Position,
) {
  const asJson =
    vscode.workspace.getConfiguration("f-flat-minor").get<string>("ersOutputFormat") === "json";
  const auditArgs = [
    "audit",
    document.uri.fsPath,
    "--line",
    String(position.line + 1),
    "--character",
    String(position.character + 1),
    ...(asJson ? ["--json"] : []),
  ];
  return execErsAudit(context, document, auditArgs);
}

async function runErsAuditForWordName(
  context: vscode.ExtensionContext,
  document: vscode.TextDocument,
  word: string,
): Promise<string> {
  const asJson =
    vscode.workspace.getConfiguration("f-flat-minor").get<string>("ersOutputFormat") === "json";
  const auditArgs = [
    "audit",
    document.uri.fsPath,
    "--word",
    word,
    ...(asJson ? ["--json"] : []),
  ];
  return execErsAudit(context, document, auditArgs);
}

/** `word:` spans on a line that include `position` (first match wins left-to-right). */
function definitionNameAtPosition(
  line: vscode.TextLine,
  position: vscode.Position,
): { word: string; range: vscode.Range } | null {
  const text = line.text;
  const re = /([^\s:]+):/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const full = m[0];
    const word = full.slice(0, -1);
    if (!word || word.startsWith(".")) {
      continue;
    }
    const start = m.index;
    const end = start + full.length;
    const range = new vscode.Range(line.lineNumber, start, line.lineNumber, end);
    if (range.contains(position)) {
      return { word, range };
    }
  }
  return null;
}

interface ErsAuditJson {
  resolvedBody: string;
  safety: {
    verdict: string;
    reasons: string[];
  };
}

function parseErsAuditJson(stdout: string): ErsAuditJson {
  const start = stdout.indexOf("{");
  if (start === -1) {
    throw new Error("ERS did not return JSON.");
  }
  return JSON.parse(stdout.slice(start)) as ErsAuditJson;
}

function markdownForErsHover(
  word: string,
  data: ErsAuditJson,
  documentUri: vscode.Uri,
): vscode.MarkdownString {
  const md = new vscode.MarkdownString();
  md.isTrusted = { enabledCommands: ["f-flat-minor.auditDefinitionByWord"] };
  md.supportHtml = false;
  const body = data.resolvedBody?.trim() || "(empty)";
  md.appendMarkdown(`### \`${word}\`\n\n`);
  md.appendMarkdown("**Definition**\n\n");
  md.appendCodeblock(body, "f-flat-minor");
  md.appendMarkdown(`\n**Safety:** \`${data.safety.verdict}\`\n\n`);
  if (data.safety.reasons.length > 0) {
    md.appendMarkdown("**Reasons**\n\n");
    for (const r of data.safety.reasons) {
      md.appendMarkdown("- ");
      md.appendText(r.replace(/\n/g, " "));
      md.appendText("\n");
    }
  }
  const args = [documentUri.toString(), word];
  const query = encodeURIComponent(JSON.stringify(args));
  md.appendMarkdown(`\n\n[Run ERS audit](command:f-flat-minor.auditDefinitionByWord?${query})`);
  return md;
}

const ersHoverCache = new Map<string, ErsAuditJson>();
const ERS_HOVER_CACHE_MAX = 48;

function ersHoverCacheKey(document: vscode.TextDocument, word: string): string {
  return `${document.uri.toString()}\0${document.version}\0${word}`;
}

function rememberErsHoverCache(key: string, value: ErsAuditJson): void {
  if (ersHoverCache.size >= ERS_HOVER_CACHE_MAX) {
    const first = ersHoverCache.keys().next().value;
    if (first !== undefined) {
      ersHoverCache.delete(first);
    }
  }
  ersHoverCache.set(key, value);
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

  const hoverProvider: vscode.HoverProvider = {
    async provideHover(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
    ): Promise<vscode.Hover | undefined> {
      const line = document.lineAt(position.line);
      const cfg = vscode.workspace.getConfiguration("f-flat-minor");
      const ersHoverOn = cfg.get<boolean>("ersHover") ?? true;
      const coreVocabOn = cfg.get<boolean>("coreVocabHover") ?? true;

      if (ersHoverOn && sourcePathOrNull(document)) {
        const def = definitionNameAtPosition(line, position);
        if (def) {
          const cacheKey = ersHoverCacheKey(document, def.word);
          let data = ersHoverCache.get(cacheKey);
          if (!data) {
            try {
              const stdout = await execErsAudit(context, document, [
                "audit",
                document.uri.fsPath,
                "--word",
                def.word,
                "--json",
              ]);
              if (token.isCancellationRequested) {
                return undefined;
              }
              data = parseErsAuditJson(stdout);
              rememberErsHoverCache(cacheKey, data);
            } catch {
              /* fall through to primitive hover */
            }
          }
          if (data !== undefined && !token.isCancellationRequested) {
            return new vscode.Hover(markdownForErsHover(def.word, data, document.uri), def.range);
          }
        }
      }

      if (coreVocabOn) {
        const tokRange = whitespaceTokenRangeAt(line, position.character);
        if (tokRange) {
          const displayToken = document.getText(tokRange);
          if (shouldOfferCoreVocabHover(displayToken)) {
            const entry = lookupCoreVocabularyEntry(displayToken);
            if (entry) {
              return new vscode.Hover(
                markdownForCorePrimitiveHover(displayToken, entry),
                tokRange,
              );
            }
          }
        }
      }

      return undefined;
    },
  };

  const auditDefinitionByWord = vscode.commands.registerCommand(
    "f-flat-minor.auditDefinitionByWord",
    async (uriStr?: string, word?: string) => {
      if (typeof uriStr !== "string" || typeof word !== "string") {
        void vscode.window.showInformationMessage(
          "Use “Run ERS audit” in the definition hover, or run “Audit Current Definition” with the cursor on a word.",
        );
        return;
      }
      let document: vscode.TextDocument;
      try {
        document = await vscode.workspace.openTextDocument(vscode.Uri.parse(uriStr));
      } catch {
        void vscode.window.showErrorMessage("Could not open the file for ERS audit.");
        return;
      }
      if (document.languageId !== "f-flat-minor") {
        void vscode.window.showErrorMessage("ERS audit applies only to f-flat-minor files.");
        return;
      }
      if (!sourcePathOrNull(document)) {
        void vscode.window.showInformationMessage("Save the file before running ERS audit.");
        return;
      }
      try {
        ersOutput.clear();
        const stdout = await runErsAuditForWordName(context, document, word);
        ersOutput.append(stdout);
        ersOutput.show(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        void vscode.window.showErrorMessage(`ERS audit failed: ${message}`);
      }
    },
  );

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
    auditDefinitionByWord,
    auditCurrentDefinition,
    vscode.languages.registerDocumentLinkProvider(docSelector, linkProvider),
    vscode.languages.registerDefinitionProvider(docSelector, definitionProvider),
    vscode.languages.registerHoverProvider(docSelector, hoverProvider),
  );
}

export function deactivate(): void {}
