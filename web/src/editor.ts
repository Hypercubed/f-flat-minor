import { history, historyKeymap, indentWithTab, defaultKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle, StreamLanguage } from "@codemirror/language";
import { EditorState, Prec, type Extension } from "@codemirror/state";
import type { StreamParser } from "@codemirror/stream-parser";
import { EditorView, drawSelection, highlightActiveLine, keymap, lineNumbers, placeholder } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { triggerEditorKeyFlatFeedback } from "./run-fx.ts";

interface FfStreamState {
  inBlockComment: boolean;
  inString: boolean;
  inStringEscape: boolean;
}

const BUILTIN_WORDS = new Set([
  "dup",
  "drop",
  "swap",
  "choose",
  "branch",
  "ifte",
  "eval",
  "nop",
  "putc",
  "getc",
  "putn",
  "clock",
  "clr",
  "rand",
  "exit",
  "depth",
  "q<",
  "q>",
]);

const ffHighlightStyle = HighlightStyle.define([
  { tag: tags.comment, color: "#8a6f5f", fontStyle: "italic" },
  { tag: tags.string, color: "#1d6e57" },
  { tag: tags.number, color: "#b14f21" },
  { tag: tags.keyword, color: "#7d2a10", fontWeight: "700" },
  { tag: tags.definition(tags.variableName), color: "#0d4f87", fontWeight: "700" },
  { tag: [tags.operator, tags.bracket], color: "#2a2d34" },
]);

const ffTheme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "transparent",
  },
  "&.cm-focused": {
    outline: "none",
  },
  ".cm-scroller": {
    overflow: "auto",
  },
  ".cm-content": {
    padding: "1rem",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    color: "#7a6153",
    border: "none",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 0.55rem 0 0",
  },
  ".cm-line": {
    padding: "0",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#201611",
  },
  ".cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "rgba(187, 77, 29, 0.22)",
  },
});

const sourceTheme = EditorView.theme({
  ".cm-content": {
    minHeight: "520px",
  },
});

const replTheme = EditorView.theme({
  "&": {
    border: "1px solid rgba(32, 22, 17, 0.15)",
    borderRadius: "14px",
    backgroundColor: "var(--panel-strong)",
  },
  "&.cm-focused": {
    outline: "none",
  },
  ".cm-scroller": {
    overflowX: "auto",
    overflowY: "hidden",
    fontFamily: "\"Iosevka\", \"Cascadia Code\", \"SFMono-Regular\", monospace",
    fontSize: "0.95rem",
    lineHeight: "1.55",
  },
  ".cm-content": {
    minHeight: "44px",
    padding: "0.7rem 0.9rem",
    whiteSpace: "pre",
  },
  ".cm-line": {
    padding: "0",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#201611",
  },
  ".cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "rgba(187, 77, 29, 0.22)",
  },
});

const readonlyTheme = EditorView.theme({
  ".cm-content": {
    minHeight: "160px",
    padding: "1rem 1.2rem 1.2rem",
    whiteSpace: "pre",
  },
  ".cm-scroller": {
    fontFamily: "\"Iosevka\", \"Cascadia Code\", \"SFMono-Regular\", monospace",
    fontSize: "0.92rem",
    lineHeight: "1.55",
  },
});

const ffStreamParser: StreamParser<FfStreamState> = {
  startState() {
    return {
      inBlockComment: false,
      inString: false,
      inStringEscape: false,
    };
  },
  copyState(state) {
    return {
      inBlockComment: state.inBlockComment,
      inString: state.inString,
      inStringEscape: state.inStringEscape,
    };
  },
  token(stream, state) {
    if (state.inBlockComment) {
      while (!stream.eol()) {
        if (stream.match("*/")) {
          state.inBlockComment = false;
          break;
        }
        stream.next();
      }
      return "comment";
    }

    if (state.inString) {
      while (!stream.eol()) {
        const char = stream.next();

        if (state.inStringEscape) {
          state.inStringEscape = false;
          continue;
        }

        if (char === "\\") {
          state.inStringEscape = true;
          continue;
        }

        if (char === "'") {
          state.inString = false;
          break;
        }
      }

      return "string";
    }

    if (stream.eatSpace()) {
      return null;
    }

    if (stream.match("/*")) {
      state.inBlockComment = true;
      return "comment";
    }

    if (stream.peek() === "'") {
      stream.next();
      state.inString = true;
      state.inStringEscape = false;
      return "string";
    }

    if (stream.match(/^q[<>](?![a-zA-Z0-9_])/i)) {
      return "keyword";
    }

    if (stream.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/)) {
      return "keyword";
    }

    if (stream.match(/^(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|[0-9][0-9_]*)(?![a-zA-Z0-9_])/)) {
      return "number";
    }

    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*:(?![a-zA-Z0-9_])/)) {
      return "def";
    }

    if (stream.match(/^[\[\]]/)) {
      return "bracket";
    }

    if (stream.match(/^(?:<<|>>|[+\-*/%=<>|&~?:;()])/)) {
      return "operator";
    }

    const word = stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (word) {
      return BUILTIN_WORDS.has(word[0].toLowerCase()) ? "keyword" : null;
    }

    stream.next();
    return null;
  },
};

const ffLanguage = StreamLanguage.define(ffStreamParser);

const ffCommonExtensions = [
  history(),
  keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
  drawSelection(),
  ffLanguage,
  syntaxHighlighting(ffHighlightStyle),
];

export interface SourceEditor {
  getValue(): string;
  setValue(nextValue: string): void;
  focus(): void;
}

export interface MountSourceEditorOptions {
  extraExtensions?: readonly Extension[];
  /** Called after the document text changes (not on selection-only updates). */
  onDocumentChange?: () => void;
}

/** Main + tutorial source editors: one ♭ from the caret on qualifying keypresses (see run-fx). */
export const tutorialEditorFlatFeedback = EditorView.domEventHandlers({
  keydown(event, view) {
    triggerEditorKeyFlatFeedback(view, event);
  },
});

export function mountSourceEditor(
  parent: HTMLElement,
  initialValue: string,
  options?: MountSourceEditorOptions,
): SourceEditor {
  const onDocumentChange = options?.onDocumentChange;
  const view = new EditorView({
    state: EditorState.create({
      doc: initialValue,
      extensions: [
        ...ffCommonExtensions,
        lineNumbers(),
        highlightActiveLine(),
        EditorView.lineWrapping,
        ffTheme,
        sourceTheme,
        ...(onDocumentChange
          ? [
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                  onDocumentChange();
                }
              }),
            ]
          : []),
        ...(options?.extraExtensions ?? []),
      ],
    }),
    parent,
  });

  return {
    getValue() {
      return view.state.doc.toString();
    },
    setValue(nextValue: string) {
      const currentValue = view.state.doc.toString();
      if (currentValue === nextValue) {
        return;
      }

      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: nextValue,
        },
      });
    },
    focus() {
      view.focus();
    },
  };
}

export function mountReadonlySourceViewer(parent: HTMLElement, initialValue: string): SourceEditor {
  const view = new EditorView({
    state: EditorState.create({
      doc: initialValue,
      extensions: [
        ffLanguage,
        syntaxHighlighting(ffHighlightStyle),
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
        ffTheme,
        readonlyTheme,
      ],
    }),
    parent,
  });

  return {
    getValue() {
      return view.state.doc.toString();
    },
    setValue(nextValue: string) {
      const currentValue = view.state.doc.toString();
      if (currentValue === nextValue) {
        return;
      }

      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: nextValue,
        },
      });
    },
    focus() {
      view.focus();
    },
  };
}

export function mountReplEditor(
  parent: HTMLElement,
  initialValue: string,
  onEnter: () => void,
): SourceEditor {
  const singleLineFilter = EditorState.transactionFilter.of((transaction) => {
    if (!transaction.docChanged) {
      return transaction;
    }

    const normalized = transaction.newDoc.toString().replace(/[\r\n]+/g, " ");
    if (normalized === transaction.newDoc.toString()) {
      return transaction;
    }

    return {
      changes: {
        from: 0,
        to: transaction.newDoc.length,
        insert: normalized,
      },
      selection: transaction.newSelection,
    };
  });

  const enterKeymap = Prec.highest(
    keymap.of([
      {
        key: "Enter",
        run() {
          onEnter();
          return true;
        },
      },
    ]),
  );

  const view = new EditorView({
    state: EditorState.create({
      doc: initialValue,
      extensions: [
        ...ffCommonExtensions,
        singleLineFilter,
        enterKeymap,
        placeholder("Enter a line and press Enter to run"),
        replTheme,
      ],
    }),
    parent,
  });

  return {
    getValue() {
      return view.state.doc.toString();
    },
    setValue(nextValue: string) {
      const currentValue = view.state.doc.toString();
      if (currentValue === nextValue) {
        return;
      }

      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: nextValue,
        },
      });
    },
    focus() {
      view.focus();
    },
  };
}
