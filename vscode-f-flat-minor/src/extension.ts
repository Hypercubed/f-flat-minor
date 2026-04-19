import * as fs from "node:fs";
import { homedir, tmpdir } from "node:os";
import * as path from "path";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import * as vscode from "vscode";

import {
  lookupCoreVocabularyEntry,
  markdownForCorePrimitiveHover,
  shouldOfferCoreVocabHover,
  whitespaceTokenRangeAt,
} from "./core-vocabulary-hover";
import {
  getTraceViewerHtml,
  type TraceRun,
  type TraceStep,
} from "./trace-viewer";

/**
 * Match Preprocessor.findFile in typescript/core/src/preprocess.ts.
 * Uses workspace.fs (not Node fs) so existence checks work in Remote — WSL/SSH
 * when the extension runs on the UI host or the path only exists on the remote.
 */
async function statPath(uri: vscode.Uri): Promise<vscode.FileStat | null> {
  try {
    return await vscode.workspace.fs.stat(uri);
  } catch {
    return null;
  }
}

function isStdlibImportPath(userPath: string): boolean {
  return userPath.startsWith("<") && userPath.endsWith(">") && userPath.length > 2;
}

function importDirectoryIndexCandidates(resolvedPath: string): string[] {
  const trimmed = resolvedPath.replace(/[\\/]+$/, "");
  const base = path.basename(trimmed);
  return [
    path.join(trimmed, `${base}.ffp`),
    path.join(trimmed, `${base}.ff`),
  ];
}

async function resolveFileOrDirectory(
  documentUri: vscode.Uri,
  resolvedPath: string,
  options: { extensions?: string[] } = {},
): Promise<string | null> {
  const exact = await statPath(uriForResolvedPath(documentUri, resolvedPath));
  if (exact?.type === vscode.FileType.File) {
    return resolvedPath;
  }

  for (const extension of options.extensions ?? []) {
    const withExtension = `${resolvedPath}${extension}`;
    const withExtensionStat = await statPath(uriForResolvedPath(documentUri, withExtension));
    if (withExtensionStat?.type === vscode.FileType.File) {
      return withExtension;
    }
  }

  if (exact?.type === vscode.FileType.Directory) {
    for (const candidate of importDirectoryIndexCandidates(resolvedPath)) {
      const indexStat = await statPath(uriForResolvedPath(documentUri, candidate));
      if (indexStat?.type === vscode.FileType.File) {
        return candidate;
      }
    }
  }

  return null;
}

function stdlibRootCandidates(sourceFile: string): string[] {
  const roots: string[] = [];

  const addRoot = (candidate: string) => {
    if (!roots.includes(candidate)) {
      roots.push(candidate);
    }
  };

  let dir = path.resolve(path.dirname(sourceFile));
  for (;;) {
    addRoot(path.join(dir, "ff", "lib"));
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }

  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    addRoot(path.join(folder.uri.fsPath, "ff", "lib"));
  }

  return roots;
}

async function resolveImportPath(
  documentUri: vscode.Uri,
  sourceFile: string,
  userPath: string,
): Promise<string | null> {
  const filename = userPath.trim();
  if (!filename) {
    return null;
  }

  if (isStdlibImportPath(filename)) {
    const logicalPath = filename.slice(1, -1).trim();
    for (const root of stdlibRootCandidates(sourceFile)) {
      const resolved = await resolveFileOrDirectory(
        documentUri,
        path.resolve(root, logicalPath),
        { extensions: [".ffp", ".ff"] },
      );
      if (resolved) {
        return resolved;
      }
    }
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
    const resolved = await resolveFileOrDirectory(documentUri, p);
    if (resolved) {
      return resolved;
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
const FF_RUN_CLI_SEGMENTS = ["node", "bin", "ff-run.ts"] as const;
const TRACE_QUEUE_MAX = "64";
const TRACE_STACK_MAX = "256";

/**
 * `child_process.execFile` applies `maxBuffer` to stdout and stderr each.
 * Trace runs emit JSONL on stderr and can be very large, so the default
 * 16 MiB is often too small; 256 MiB is a more practical default.
 */
function execFileMaxBufferBytes(): number {
  const raw = vscode.workspace.getConfiguration("f-flat-minor").get<number>(
    "execFileMaxBufferMb",
    256,
  );
  const mb = typeof raw === "number" && Number.isFinite(raw) ? raw : 256;
  const clamped = Math.min(2048, Math.max(16, Math.round(mb)));
  return clamped * 1024 * 1024;
}

/** Kill long-running Node subprocesses to avoid hanging the extension forever. */
function traceRunTimeoutMs(): number {
  const raw = vscode.workspace.getConfiguration("f-flat-minor").get<number>(
    "traceRunTimeoutSeconds",
    120,
  );
  const seconds = typeof raw === "number" && Number.isFinite(raw) ? raw : 120;
  const clamped = Math.min(3600, Math.max(5, Math.round(seconds)));
  return clamped * 1000;
}

let traceViewerPanel: vscode.WebviewPanel | undefined;

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

function ffRunTsCandidateAt(root: string): string {
  return path.join(root, ...FF_RUN_CLI_SEGMENTS);
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

function findFfRunTsWalkingUp(startDir: string): string | null {
  let dir = path.resolve(startDir);
  for (;;) {
    const candidate = ffRunTsCandidateAt(dir);
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

function nodeArgsForTypeScriptScript(scriptPath: string, args: string[]): string[] {
  if (scriptPath.endsWith(".mjs")) {
    return [scriptPath, ...args];
  }
  return [
    "--experimental-transform-types",
    "--disable-warning=ExperimentalWarning",
    scriptPath,
    ...args,
  ];
}

function ersAuditCwd(document: vscode.TextDocument): string {
  return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? path.dirname(document.uri.fsPath);
}

function ffRunCwd(document: vscode.TextDocument): string {
  return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? path.dirname(document.uri.fsPath);
}

function resolveFfRunScriptPath(document: vscode.TextDocument): string | null {
  const sourcePath = sourcePathOrNull(document);
  if (sourcePath) {
    const fromFile = findFfRunTsWalkingUp(path.dirname(sourcePath));
    if (fromFile) {
      return fromFile;
    }
  }

  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    const candidate = ffRunTsCandidateAt(folder.uri.fsPath);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  signal: NodeJS.Signals | null;
  timedOut?: boolean;
  maxBufferExceeded?: "stdout" | "stderr";
}

interface ExecNodeCommandOptions {
  timeoutMs?: number;
  stderrFilePath?: string;
}

interface RawTraceQueueToken {
  tag: "literal" | "call";
  value: string;
  action: string;
}

interface RawTraceEvent {
  step: number;
  immediate: boolean;
  tag: "literal" | "call";
  value: string;
  action: string;
  stack_before?: string[];
  stack_after?: string[];
  queue_preview?: RawTraceQueueToken[];
  queue_depth?: number;
  stdout_since_last?: string;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function isRawTraceQueueToken(value: unknown): value is RawTraceQueueToken {
  return typeof value === "object"
    && value !== null
    && (value as RawTraceQueueToken).tag !== undefined
    && ((value as RawTraceQueueToken).tag === "literal" || (value as RawTraceQueueToken).tag === "call")
    && typeof (value as RawTraceQueueToken).value === "string"
    && typeof (value as RawTraceQueueToken).action === "string";
}

function isRawTraceEvent(value: unknown): value is RawTraceEvent {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const event = value as RawTraceEvent;
  const queuePreview = event.queue_preview;

  return typeof event.step === "number"
    && typeof event.immediate === "boolean"
    && (event.tag === "literal" || event.tag === "call")
    && typeof event.value === "string"
    && typeof event.action === "string"
    && (event.stack_before === undefined || isStringArray(event.stack_before))
    && (event.stack_after === undefined || isStringArray(event.stack_after))
    && (queuePreview === undefined || (Array.isArray(queuePreview) && queuePreview.every(isRawTraceQueueToken)))
    && (event.queue_depth === undefined || typeof event.queue_depth === "number")
    && (event.stdout_since_last === undefined || typeof event.stdout_since_last === "string");
}

async function execNodeCommand(
  args: string[],
  cwd: string,
  options: ExecNodeCommandOptions = {},
): Promise<CommandResult> {
  return await new Promise<CommandResult>((resolve, reject) => {
    const maxBufferBytes = execFileMaxBufferBytes();
    const timeoutMs = options.timeoutMs ?? traceRunTimeoutMs();
    const child = spawn("node", args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let timedOut = false;
    let maxBufferExceeded: "stdout" | "stderr" | undefined;
    let settled = false;

    const stderrFile = options.stderrFilePath
      ? fs.createWriteStream(options.stderrFilePath, { encoding: "utf8" })
      : null;

    const timer = timeoutMs > 0
      ? setTimeout(() => {
        timedOut = true;
        child.kill("SIGKILL");
      }, timeoutMs)
      : undefined;

    const cleanup = () => {
      if (timer) {
        clearTimeout(timer);
      }
      stderrFile?.end();
    };

    const failOnce = (error: unknown) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      reject(error);
    };

    child.on("error", (error) => failOnce(error));
    stderrFile?.on("error", (error) => failOnce(error));

    child.stdout?.on("data", (chunk: Buffer) => {
      if (settled) {
        return;
      }
      stdoutBytes += chunk.length;
      if (stdoutBytes > maxBufferBytes) {
        maxBufferExceeded = "stdout";
        child.kill("SIGKILL");
        return;
      }
      stdout += chunk.toString("utf8");
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      if (settled) {
        return;
      }
      if (stderrFile) {
        stderrFile.write(chunk);
      } else {
        stderrBytes += chunk.length;
        if (stderrBytes > maxBufferBytes) {
          maxBufferExceeded = "stderr";
          child.kill("SIGKILL");
          return;
        }
        stderr += chunk.toString("utf8");
      }
    });

    child.on("close", (code, signal) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();

      if (timedOut) {
        stderr = `${stderr}\nTrace runner timed out after ${Math.round(timeoutMs / 1000)}s and was terminated.`.trim();
      }
      if (maxBufferExceeded) {
        stderr = `${stderr}\n${maxBufferExceeded} exceeded maxBuffer (${Math.round(maxBufferBytes / (1024 * 1024))} MiB) and was terminated.`.trim();
      }

      resolve({
        stdout,
        stderr,
        exitCode: typeof code === "number" ? code : 1,
        signal: signal ?? null,
        timedOut,
        maxBufferExceeded,
      });
    });
  });
}

async function runFfRun(
  document: vscode.TextDocument,
  args: string[],
  options: ExecNodeCommandOptions = {},
): Promise<CommandResult> {
  const scriptPath = resolveFfRunScriptPath(document);
  if (!scriptPath) {
    throw new Error(
      "Could not find `node/bin/ff-run.ts`. Open the file inside an f-flat-minor checkout so the trace viewer can run the TypeScript runtime.",
    );
  }
  return await execNodeCommand(
    nodeArgsForTypeScriptScript(scriptPath, args),
    ffRunCwd(document),
    {
      timeoutMs: traceRunTimeoutMs(),
      ...options,
    },
  );
}

function summarizeFailure(label: string, result: CommandResult): string {
  const parts = [`${label} failed with exit code ${result.exitCode}.`];
  if (result.signal) {
    parts.push(`Signal: ${result.signal}`);
  }
  if (result.timedOut) {
    parts.push("Reason: timed out.");
  }
  if (result.maxBufferExceeded) {
    parts.push(`Reason: ${result.maxBufferExceeded} exceeded maxBuffer.`);
  }
  if (result.stderr.trim()) {
    parts.push("", result.stderr.trim());
  } else if (result.stdout.trim()) {
    parts.push("", result.stdout.trim());
  }
  return parts.join("\n");
}

function parseTrace(stderr: string): { steps: TraceStep[]; notes: string[] } {
  const steps: TraceStep[] = [];
  const notes: string[] = [];
  for (const rawLine of stderr.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    try {
      const parsed = JSON.parse(line);
      if (isRawTraceEvent(parsed)) {
        steps.push({
          step: parsed.step,
          immediate: parsed.immediate,
          tag: parsed.tag,
          value: parsed.value,
          action: parsed.action,
          stackBefore: parsed.stack_before ?? [],
          stackAfter: parsed.stack_after ?? [],
          queuePreview: parsed.queue_preview ?? [],
          queueDepth: parsed.queue_depth ?? 0,
          stdoutSinceLast: parsed.stdout_since_last,
        });
        continue;
      }
    } catch {
      // Fall through and preserve non-JSONL stderr.
    }
    notes.push(rawLine);
  }
  return { steps, notes };
}

async function chooseTraceViewerMode(): Promise<boolean | undefined> {
  const picked = await vscode.window.showQuickPick([
    {
      label: "Unoptimized IR",
      description: "Use the normal compiled IR for the trace viewer",
      optimized: false,
    },
    {
      label: "Optimized IR",
      description: "Run the optimizer before generating IR and trace output",
      optimized: true,
    },
  ], {
    placeHolder: "Select how to prepare the program for the trace viewer",
    ignoreFocusOut: true,
  });
  return picked?.optimized;
}

async function captureTraceRun(
  document: vscode.TextDocument,
  optimized: boolean,
): Promise<TraceRun> {
  const filePath = document.uri.fsPath;
  const optimizationArgs = optimized ? ["-O"] : [];
  const traceTempDir = fs.mkdtempSync(path.join(tmpdir(), "f-flat-minor-trace-"));
  const traceStderrPath = path.join(traceTempDir, "trace.stderr.log");

  try {
  const [irResult, traceResult] = await Promise.all([
    runFfRun(document, ["-f", filePath, ...optimizationArgs, "-i"]),
    runFfRun(document, [
      "-f",
      filePath,
      ...optimizationArgs,
      "--trace",
      "--trace-format",
      "jsonl",
      "--trace-queue-max",
      TRACE_QUEUE_MAX,
      "--trace-stack-max",
      TRACE_STACK_MAX,
    ], {
      stderrFilePath: traceStderrPath,
    }),
  ]);

  if (irResult.exitCode !== 0) {
    throw new Error(summarizeFailure("IR capture", irResult));
  }

  const traceStderrFromFile = fs.existsSync(traceStderrPath)
    ? fs.readFileSync(traceStderrPath, "utf8")
    : "";
  const parsedTrace = parseTrace(`${traceStderrFromFile}\n${traceResult.stderr}`.trim());
  if (traceResult.exitCode !== 0 && parsedTrace.steps.length === 0) {
    throw new Error(summarizeFailure("Trace capture", traceResult));
  }

  const stderrNotes = [...parsedTrace.notes];
  if (traceResult.exitCode !== 0) {
    stderrNotes.unshift(`ff-run exited with code ${traceResult.exitCode}.`);
  }

  return {
    fileName: filePath,
    optimized,
    ir: irResult.stdout.replace(/\s+$/, ""),
    programOutput: traceResult.stdout.replace(/\s+$/, ""),
    stderr: stderrNotes.join("\n").trim(),
    exitCode: traceResult.exitCode,
    steps: parsedTrace.steps,
  };
  } finally {
    try {
      if (fs.existsSync(traceStderrPath)) {
        fs.unlinkSync(traceStderrPath);
      }
      fs.rmdirSync(traceTempDir);
    } catch {
      // Best-effort cleanup of temporary trace capture files.
    }
  }
}

function postToTraceViewerWebview(message: unknown): boolean {
  if (!traceViewerPanel) {
    return false;
  }
  void traceViewerPanel.webview.postMessage(message);
  return true;
}

function showTraceViewer(run: TraceRun) {
  if (!traceViewerPanel) {
    traceViewerPanel = vscode.window.createWebviewPanel(
      "fFlatMinorTraceViewer",
      "F-flat-minor Trace Viewer",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );
    traceViewerPanel.onDidDispose(() => {
      traceViewerPanel = undefined;
    });
  } else {
    traceViewerPanel.reveal(vscode.ViewColumn.Beside);
  }

  traceViewerPanel.title = `Trace Viewer: ${path.basename(run.fileName)}${run.optimized ? " (optimized)" : ""}`;
  traceViewerPanel.webview.html = getTraceViewerHtml(traceViewerPanel.webview, run);
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
    maxBuffer: execFileMaxBufferBytes(),
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

  const traceViewerTogglePlayback = vscode.commands.registerCommand(
    "f-flat-minor.traceViewerTogglePlayback",
    () => {
      if (!postToTraceViewerWebview({ type: "tracePlayback", action: "toggle" })) {
        void vscode.window.showInformationMessage(
          "Open the trace viewer first (F-flat-minor: Open Trace Viewer).",
        );
      }
    },
  );

  const openTraceViewer = vscode.commands.registerCommand(
    "f-flat-minor.openTraceViewer",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "f-flat-minor") {
        void vscode.window.showErrorMessage("Open an f-flat-minor file to launch the trace viewer.");
        return;
      }

      const sourcePath = sourcePathOrNull(editor.document);
      if (!sourcePath) {
        void vscode.window.showInformationMessage(
          "Save the current f-flat-minor file before opening the trace viewer.",
        );
        return;
      }

      const optimized = await chooseTraceViewerMode();
      if (optimized === undefined) {
        return;
      }

      try {
        const run = await vscode.window.withProgress({
          location: vscode.ProgressLocation.Notification,
          title: "Capturing F-flat-minor trace",
        }, async () => {
          return await captureTraceRun(editor.document, optimized);
        });
        showTraceViewer(run);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        void vscode.window.showErrorMessage(`Trace viewer failed: ${message}`);
      }
    },
  );

  context.subscriptions.push(
    ersOutput,
    auditDefinitionByWord,
    auditCurrentDefinition,
    openTraceViewer,
    traceViewerTogglePlayback,
    vscode.languages.registerDocumentLinkProvider(docSelector, linkProvider),
    vscode.languages.registerDefinitionProvider(docSelector, definitionProvider),
    vscode.languages.registerHoverProvider(docSelector, hoverProvider),
  );
}

export function deactivate(): void {}
