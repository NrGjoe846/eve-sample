export type Language = 'javascript' | 'python' | 'java';

export interface ExecutionResult {
  type: 'success' | 'error';
  content: string;
}

export interface CodeExecutor {
  execute: (code: string) => Promise<ExecutionResult>;
}

export interface ExecutionError {
  line?: number;
  column?: number;
  message: string;
}

export interface EditorTheme {
  name: string;
  theme: any;
}

export interface AutoCompleteItem {
  label: string;
  type: 'keyword' | 'function' | 'variable' | 'class' | 'property';
  info?: string;
}
