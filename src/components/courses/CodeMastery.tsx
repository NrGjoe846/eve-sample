// src/components/courses/CodeMastery.tsx
import React from 'react';
import { Code2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CodeMastery = () => {
  return (
    <div className="relative group w-full max-w-md"> {/* Adjusted width */}
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a67c00]/20 via-[#00d4ff]/20 to-[#8B0000]/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10" />
      {/* Glassmorphism Card */}
      <div className="relative bg-gray-900 backdrop-blur-lg bg-opacity-30 rounded-xl shadow-lg p-6 border border-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] z-20">
        <div className="flex items-center gap-4 mb-4">
          <Code2 className="w-8 h-8 text-[#f4e4bc]" />
          <h3 className="text-2xl font-bold text-[#f4e4bc]">Code Mastery</h3>
        </div>
        <p className="text-[#80deea] mb-6">Embark on legendary quests across Python, Java, and C!</p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-all duration-300 shadow-md font-bold glow-hover"
        >
          <ChevronRight className="w-5 h-5" />
          Start Journey
        </Link>
      </div>

      <style>
        {`
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(166, 124, 0, 0.4); }
            50% { box-shadow: 0 0 15px rgba(166, 124, 0, 0.8); }
            100% { box-shadow: 0 0 5px rgba(166, 124, 0, 0.4); }
          }
          .glow-hover:hover {
            animation: glowPulse 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default CodeMastery;
