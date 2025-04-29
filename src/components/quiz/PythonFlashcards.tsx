import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RotateCcw, Scroll } from 'lucide-react';
import flashcardsData from '../../data/quizzes/pythonFlashcards.json';

interface FlashCard {
  id: string;
  front: string;
  back: string;
}

interface PythonFlashcardsProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  moduleTitle: string;
}

const PythonFlashcards: React.FC<PythonFlashcardsProps> = ({
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
              return subtopic.flashcards;
            }
          }
        }
      }
      return [];
    };

    const foundCards = findFlashcardsForModule();
    console.log(`Flashcards for ${moduleTitle}:`, foundCards); // Debug log
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
        <div className="bg-[#f4e4bc] rounded-2xl p-6 max-w-md w-full m-4 text-center border-2 border-[#8b5e3c] shadow-lg font-serif" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}>
          <h2 className="text-xl font-bold text-[#3c2f2f] mb-4">No Scrolls of Knowledge Available</h2>
          <p className="text-[#6b4e31] mb-6">Would you like to embark on the trial instead?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-colors shadow-md"
            >
              Return to Realm
            </button>
            <button
              onClick={onStartQuiz}
              className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-colors flex items-center gap-2 shadow-md"
            >
              <Scroll className="w-4 h-4" />
              Begin Trial
            </button>
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
        className="relative w-full max-w-4xl parchment-bg rounded-2xl shadow-2xl p-6 m-4 font-serif" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#3c2f2f]">{moduleTitle} Scrolls</h2>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-[#8b5e3c]/20 rounded-lg transition-all text-[#8b5e3c]"
              title="Reset Scrolls"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-[#8b5e3c]/20 rounded-lg transition-all text-[#8b5e3c]"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 text-[#6b4e31]">
            <span>Scroll {currentCardIndex + 1} of {cards.length}</span>
            <span>{Math.round(((currentCardIndex + 1) / cards.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#d3c092] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8b5e3c] to-[#a67c00] transition-all duration-300"
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
                bg-[#f4e4bc]/80 rounded-2xl border border-[#8b5e3c] shadow-inner cursor-pointer
                ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
              onClick={handleFlip}
            >
              <div className="text-xl text-[#3c2f2f]">{currentCard.front}</div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 backface-hidden p-8 flex items-center justify-center text-center 
                bg-[#f4e4bc]/80 rounded-2xl border border-[#8b5e3c] shadow-inner cursor-pointer
                [transform:rotateY(180deg)]
                ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
              onClick={handleFlip}
            >
              <div className="text-xl text-[#3c2f2f] whitespace-pre-line">{currentCard.back}</div>
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
            className="p-2 hover:bg-[#8b5e3c]/20 rounded-lg transition-all text-[#8b5e3c] disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {currentCardIndex === cards.length - 1 ? (
            <motion.button
              onClick={onStartQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg transition-colors flex items-center gap-2 shadow-md"
            >
              <Scroll className="w-4 h-4" />
              Begin Trial
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              disabled={currentCardIndex === cards.length - 1}
              whileHover={{ scale: currentCardIndex === cards.length - 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentCardIndex === cards.length - 1 ? 1 : 0.95 }}
              className="p-2 hover:bg-[#8b5e3c]/20 rounded-lg transition-all text-[#8b5e3c] disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PythonFlashcards;
