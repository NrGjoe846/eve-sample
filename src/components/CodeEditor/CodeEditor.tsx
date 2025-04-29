import React, { useRef, useEffect, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { lintGutter } from '@codemirror/lint';
import { searchKeymap } from '@codemirror/search';
import { Play, Save, RotateCcw, Code2, Terminal, Copy, Check, X } from 'lucide-react';
import { Language } from './types';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  language: Language;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, onSubmit, language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const getLanguageExtension = (lang: Language) => {
    switch (lang) {
      case 'python':
        return python();
      case 'java':
        return java();
      case 'javascript':
        return javascript();
      default:
        return javascript();
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        syntaxHighlighting(defaultHighlightStyle),
        getLanguageExtension(language),
        keymap.of([...defaultKeymap, indentWithTab]),
        oneDark,
        autocompletion(),
        lintGutter(),
        keymap.of(searchKeymap),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content, .cm-gutter': { minHeight: '100%' },
          '.cm-gutters': { backgroundColor: 'transparent', border: 'none' },
          '.cm-activeLineGutter': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          '.cm-line': { padding: '0 4px' },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, [language]);

  const handleExecute = async () => {
    setIsExecuting(true);
    await onSubmit();
    setIsExecuting(false);
  };

  const handleSave = () => {
    localStorage.setItem(`code-${language}`, value);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the code? This will clear your current changes.')) {
      onChange('');
      editorView?.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: '' }
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Controls */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Run</span>
          </button>
          <button
            onClick={handleSave}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {isSaved && (
          <span className="text-sm text-green-400 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Saved
          </span>
        )}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        <div ref={editorRef} className="h-full" />
      </div>
    </div>
  );
};

export default CodeEditor;
