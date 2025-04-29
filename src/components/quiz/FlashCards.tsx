import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const pythonInterpreterCards = [
  {
    front: "What is Python's execution model?",
    back: "Python is an interpreted language, meaning code is executed line-by-line by an interpreter rather than being compiled into machine code first."
  },
  {
    front: "How does Python's execution differ from compiled languages?",
    back: "Python code is executed directly by an interpreter, while compiled languages like C++ must be converted to machine code before execution."
  },
  {
    front: "What are the advantages of Python being interpreted?",
    back: "• Easier debugging and testing\n• More portable across platforms\n• Immediate feedback during development\n• No separate compilation step needed"
  },
  {
    front: "What is Python's execution process?",
    back: "1. Code is written and saved in a .py file\n2. The interpreter reads the code\n3. Code is executed line-by-line\n4. Output is displayed immediately"
  },
  {
    front: "Why is Python called an 'interpreted' language?",
    back: "Because it uses an interpreter to execute code line-by-line at runtime, rather than requiring the code to be compiled into machine code before execution."
  }
];

interface FlashCardsProps {
  onComplete: () => void;
}

const FlashCards: React.FC<FlashCardsProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentIndex < pythonInterpreterCards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Python's Interpreter vs. Compiled Languages</h2>
        <div className="text-sm text-gray-400">
          {currentIndex + 1} / {pythonInterpreterCards.length}
        </div>
      </div>

      <div className="relative perspective-1000 h-96">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ 
              x: direction > 0 ? 300 : -300,
              opacity: 0,
              rotateY: 0
            }}
            animate={{ 
              x: 0,
              opacity: 1,
              rotateY: isFlipped ? 180 : 0
            }}
            exit={{ 
              x: direction < 0 ? 300 : -300,
              opacity: 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 preserve-3d cursor-pointer"
            onClick={handleFlip}
          >
            {/* Front of Card */}
            <div 
              className={`absolute inset-0 backface-hidden transition-opacity duration-300 ${
                isFlipped ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="h-full backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Question</h3>
                  <p className="text-xl">{pythonInterpreterCards[currentIndex].front}</p>
                  <p className="text-sm text-gray-400 mt-4">Click to reveal answer</p>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div 
              className={`absolute inset-0 backface-hidden rotate-y-180 transition-opacity duration-300 ${
                isFlipped ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="h-full backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
                <div className="flex flex-col justify-center h-full text-center">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Answer</h3>
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {pythonInterpreterCards[currentIndex].back}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
            currentIndex === pythonInterpreterCards.length - 1 
            ? 'bg-green-600 hover:bg-green-700' // Green color for "Start Quiz"
            : 'bg-blue-600 hover:bg-blue-700'   // Blue color for "Next Card"
          }`}
        >
          {currentIndex === pythonInterpreterCards.length - 1 ? 'Start Quiz' : 'Next Card'}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default FlashCards;
