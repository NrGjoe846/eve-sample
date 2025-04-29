// src/components/quiz/PythonHintCycle.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface PythonHintCycleProps {
  question: string;
  hints: { id: number; text: string }[];
  onClose: () => void;
}

const PythonHintCycle: React.FC<PythonHintCycleProps> = ({ question, hints, onClose }) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleNextHint = () => {
    setCurrentHintIndex((prev) => (prev + 1) % hints.length); // Cycle forward
  };

  const handlePrevHint = () => {
    setCurrentHintIndex((prev) => (prev - 1 + hints.length) % hints.length); // Cycle backward
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg bg-[#f4e4bc] rounded-lg p-4 border-2 border-[#8b5e3c] shadow-lg z-10 font-serif"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-[#3c2f2f]">Sage’s Wisdom</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#8b5e3c]/20 rounded-full text-[#8b5e3c] transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-[#6b4e31] italic">{hints[currentHintIndex].text}</p>
      <div className="flex justify-between mt-3">
        <button
          onClick={handlePrevHint}
          className="p-1 hover:bg-[#8b5e3c]/20 rounded-full text-[#8b5e3c] transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-[#6b4e31]">{`${currentHintIndex + 1} of ${hints.length}`}</span>
        <button
          onClick={handleNextHint}
          className="p-1 hover:bg-[#8b5e3c]/20 rounded-full text-[#8b5e3c] transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default PythonHintCycle;
