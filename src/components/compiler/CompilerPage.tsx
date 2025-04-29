import React, { useState, useRef, useEffect } from 'react';
import { Code2, Terminal, Play, Save, Download, Upload, Settings, Copy, Share2, Maximize2, Minimize2, RotateCcw, Layout, Loader } from 'lucide-react';
import BackButton from '../BackButton';
import { Language } from '../CodeEditor/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from 'react-use';

interface CompilerSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  tabSize: number;
  autoComplete: boolean;
  liveExecution: boolean;
}

const CompilerPage = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CompilerSettings>({
    theme: 'dark',
    fontSize: 14,
    tabSize: 2,
    autoComplete: true,
    liveExecution: false,
  });
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const editorRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  // Default code templates for each language
  const codeTemplates = {
    javascript: `// JavaScript Example
console.log("Hello, World!");

// Write your code here
function example() {
  // Your code
}`,
    python: `# Python Example
print("Hello, World!")

# Write your code here
def example():
    # Your code
    pass`,
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Write your code here
    }
}`,
  };

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('compilerSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load saved code for the current language
    const savedCode = localStorage.getItem(`code-${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(codeTemplates[language]);
    }
  }, [language]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    const savedCode = localStorage.getItem(`code-${newLanguage}`);
    setCode(savedCode || codeTemplates[newLanguage]);
    setOutput('');
    setError(null);
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setError(null);
    setOutput('');

    try {
      const response = await fetch(`/api/${language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          settings
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute code');
      }

      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem(`code-${language}`, code);
    // Show success toast
  };

  const handleDownload = () => {
    const fileExtensions = {
      javascript: 'js',
      python: 'py',
      java: 'java'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${fileExtensions[language]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // Show success toast
    } catch (err) {
      // Show error toast
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white ${
      isFullscreen ? 'p-0' : 'p-8'
    }`}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {!isFullscreen && <BackButton />}
            <h1 className="text-2xl font-bold">Code Editor</h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={() => setLayout(prev => prev === 'horizontal' ? 'vertical' : 'horizontal')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Layout className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className={`grid ${
          layout === 'horizontal' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        } gap-8`}>
          {/* Code Editor Panel */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Save"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <label className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    onChange={handleUpload}
                    className="hidden"
                    accept=".js,.py,.java"
                  />
                </label>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCode(codeTemplates[language])}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div ref={editorRef} className="h-[calc(100vh-20rem)]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent p-4 font-mono text-sm resize-none focus:outline-none"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  tabSize: settings.tabSize
                }}
                spellCheck="false"
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Output</span>
              </div>
              <button
                onClick={executeCode}
                disabled={isExecuting}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg transition-colors flex items-center gap-2"
              >
                {isExecuting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </button>
            </div>
            <div className="p-4 font-mono text-sm h-[calc(100vh-20rem)] overflow-auto">
              {isExecuting && (
                <div className="text-blue-400 animate-pulse">
                  Executing code...
                </div>
              )}
              {error && (
                <div className="text-red-400 whitespace-pre-wrap">
                  Error: {error}
                </div>
              )}
              {output && (
                <div className="text-green-400 whitespace-pre-wrap">
                  {output}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1a1a2e] rounded-2xl p-6 max-w-md w-full m-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Editor Settings</h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'light' | 'dark' })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Size</label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-center mt-1">{settings.fontSize}px</div>
                  </div>

                  {/* Tab Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Tab Size</label>
                    <input
                      type="number"
                      min="2"
                      max="8"
                      value={settings.tabSize}
                      onChange={(e) => setSettings({ ...settings, tabSize: parseInt(e.target.value) })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Auto Complete */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto Complete</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoComplete}
                        onChange={(e) => setSettings({ ...settings, autoComplete: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  {/* Live Execution */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Live Execution</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.liveExecution}
                        onChange={(e) => setSettings({ ...settings, liveExecution: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem('compilerSettings', JSON.stringify(settings));
                      setShowSettings(false);
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompilerPage;
