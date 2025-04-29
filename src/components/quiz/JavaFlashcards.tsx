import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RotateCcw, Zap } from 'lucide-react';
import flashcardsData from '../../data/quizzes/javaFlashcards.json';

interface FlashCard {
  id: string;
  front: string;
  back: string;
}

interface JavaFlashcardsProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  moduleTitle: string;
}

const JavaFlashcards: React.FC<JavaFlashcardsProps> = ({
  isOpen,
  onClose,
  onStartQuiz,
  moduleTitle
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<FlashCard[]>([]);

  useEffect(() => {
    const findFlashcardsForModule = () => {
      for (const phase of flashcardsData) {
        for (const topic of phase.topics) {
          for (const subtopic of topic.subtopics) {
            if (subtopic.subtopic === moduleTitle && subtopic.flashcards) {
              console.log(`Found flashcards for ${moduleTitle}:`, subtopic.flashcards);
              return subtopic.flashcards;
            }
          }
        }
      }
      console.warn(`No flashcards found for ${moduleTitle}`);
      return [];
    };

    const foundCards = findFlashcardsForModule();
    setCards(foundCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [moduleTitle]);

  if (!isOpen) return null;

  if (cards.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-[#0d1b2a] rounded-2xl p-6 max-w-md w-full m-4 text-center border-2 border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans">
          <h2 className="text-xl font-bold text-[#e0f7ff] mb-4">No Cyber Cards Available</h2>
          <p className="text-[#80deea] mb-6">Ready to race into the trial instead?</p>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors shadow-md font-bold glow-hover"
            >
              Return to Grid
            </motion.button>
            <motion.button
              onClick={onStartQuiz}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover"
            >
              <Zap className="w-4 h-4" />
              Start Trial
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentCard = cards[currentCardIndex];

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0d1b2a] rounded-2xl shadow-2xl p-6 m-4 border-2 border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#e0f7ff]">{moduleTitle} Cyber Cards</h2>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-[#00d4ff]/20 rounded-lg transition-all text-[#00d4ff]"
              title="Reset Cards"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-[#00d4ff]/20 rounded-lg transition-all text-[#00d4ff]"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 text-[#80deea]">
            <span>Card {currentCardIndex + 1} of {cards.length}</span>
            <span>{Math.round(((currentCardIndex + 1) / cards.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#1e3d59] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative perspective-1000 h-96 mb-8">
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 backface-hidden p-8 flex items-center justify-center text-center 
                bg-[#1e3d59]/50 rounded-2xl border border-[#00d4ff]/20 shadow-inner cursor-pointer
                ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
              onClick={handleFlip}
            >
              <div className="text-xl text-[#e0f7ff]">{currentCard.front}</div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 backface-hidden p-8 flex items-center justify-center text-center 
                bg-[#1e3d59]/50 rounded-2xl border border-[#00d4ff]/20 shadow-inner cursor-pointer
                [transform:rotateY(180deg)]
                ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
              onClick={handleFlip}
            >
              <div className="text-xl text-[#e0f7ff] whitespace-pre-line">{currentCard.back}</div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            whileHover={{ scale: currentCardIndex === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentCardIndex === 0 ? 1 : 0.95 }}
            className="p-2 hover:bg-[#00d4ff]/20 rounded-lg transition-all text-[#00d4ff] disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {currentCardIndex === cards.length - 1 ? (
            <motion.button
              onClick={onStartQuiz}
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors flex items-center gap-2 shadow-md font-bold glow-hover"
            >
              <Zap className="w-4 h-4" />
              Start Trial
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              disabled={currentCardIndex === cards.length - 1}
              whileHover={{ scale: currentCardIndex === cards.length - 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentCardIndex === cards.length - 1 ? 1 : 0.95 }}
              className="p-2 hover:bg-[#00d4ff]/20 rounded-lg transition-all text-[#00d4ff] disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JavaFlashcards;
