import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Play, ArrowRight, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BackButton from '../BackButton';
import { Project, difficultyLevels } from './projectData';

const API_KEY = 'AIzaSyCFongAOEQyrrsdLHXsRxc7eWHfDH3-i4w';

interface CodeLine {
  code: string;
  explanation: string;
  isLoading?: boolean;
  error?: string;
}

const MiniProjectPage = () => {
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const typingSpeed = 30;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  useEffect(() => {
    if (selectedProject) {
      const lines = selectedProject.code.split('\n').map(line => ({
        code: line,
        explanation: '',
        isLoading: false
      }));
      setCodeLines(lines);
      fetchExplanation(0, lines[0].code);
    }
  }, [selectedProject]);

  const typeCode = async (code: string) => {
    setIsTyping(true);
    setTypingText('');
    
    for (let i = 0; i < code.length; i++) {
      await new Promise(resolve => setTimeout(resolve, typingSpeed));
      setTypingText(prev => prev + code[i]);
    }
    
    setIsTyping(false);
  };

  const fetchExplanation = async (lineIndex: number, code: string) => {
    if (!code.trim() || code.trim().startsWith('#')) {
      setCodeLines(prev => {
        const newLines = [...prev];
        newLines[lineIndex] = {
          ...newLines[lineIndex],
          explanation: code.trim().startsWith('#') ? code.trim().substring(1).trim() : '',
          isLoading: false
        };
        return newLines;
      });
      return;
    }

    setIsExplanationLoading(true);
    setCodeLines(prev => {
      const newLines = [...prev];
      newLines[lineIndex] = { ...newLines[lineIndex], isLoading: true };
      return newLines;
    });

    try {
      const prompt = `
        Explain this line of ${selectedProject?.language || 'Python'} code in simple terms:
        ${code}
        
        Provide a clear, concise explanation that a beginner would understand.
        Focus on:
        1. What the line does
        2. Why it's important
        3. How it fits in the context of the application
        
        Keep the explanation under 100 words.
      `;

      const result = await model.generateContent(prompt);
      const explanation = await result.response.text();

      setCodeLines(prev => {
        const newLines = [...prev];
        newLines[lineIndex] = {
          ...newLines[lineIndex],
          explanation: explanation.trim(),
          isLoading: false
        };
        return newLines;
      });
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setError('Failed to fetch explanation. Please try again.');
      setCodeLines(prev => {
        const newLines = [...prev];
        newLines[lineIndex] = {
          ...newLines[lineIndex],
          error: 'Failed to fetch explanation',
          isLoading: false
        };
        return newLines;
      });
    } finally {
      setIsExplanationLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentLineIndex < codeLines.length - 1) {
      const nextIndex = currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);
      await typeCode(codeLines[nextIndex].code);
      if (!codeLines[nextIndex].explanation) {
        fetchExplanation(nextIndex, codeLines[nextIndex].code);
      }
    }
  };

  const handlePrevious = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(prev => prev - 1);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchExplanation(currentLineIndex, codeLines[currentLineIndex].code);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentLineIndex(0);
    setCodeLines([]);
    setError(null);
  };

  // Calculate progress percentage
  const progressPercentage = codeLines.length > 0 
    ? Math.round((currentLineIndex / (codeLines.length - 1)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        {!selectedProject ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-12">Choose Your Project Level</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {difficultyLevels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${level.color} rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
                  <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                      {level.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{level.description}</p>
                    
                    {level.projects.length > 0 ? (
                      <div className="space-y-3">
                        {level.projects.map((project, projectIndex) => (
                          <motion.button
                            key={projectIndex}
                            onClick={() => handleProjectSelect(project)}
                            className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-gray-400">{project.description}</p>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-white/5 rounded-lg text-center text-gray-400">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Display Panel */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">{selectedProject.name}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  Back to Projects
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20" />
                <div className="p-4 font-mono text-sm overflow-x-auto">
                  {codeLines.slice(0, currentLineIndex + 1).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`whitespace-pre ${
                        index === currentLineIndex ? 'bg-blue-500/20 -mx-4 px-4' : ''
                      }`}
                    >
                      {index === currentLineIndex && isTyping ? typingText : line.code}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Explanation Panel */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <h2 className="text-xl font-bold mb-4">Code Explanation</h2>
                
                <AnimatePresence mode="wait">
                  {isExplanationLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 text-blue-400"
                    >
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating explanation...</span>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-500/20 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span>{error}</span>
                      </div>
                      <button
                        onClick={handleRetry}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Try again
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="explanation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="prose prose-invert max-w-none"
                    >
                      {codeLines[currentLineIndex]?.explanation || 
                       "This line is part of the application structure."}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentLineIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentLineIndex === codeLines.length - 1 || isTyping}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-gray-400">{progressPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Output Panel */}
              {selectedProject?.output && (
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
                  <h2 className="text-xl font-bold mb-4">Expected Output</h2>
                  <pre className="whitespace-pre-wrap text-sm text-gray-300">
                    {selectedProject.output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniProjectPage;
