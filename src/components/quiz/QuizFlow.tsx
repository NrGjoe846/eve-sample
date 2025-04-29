import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Trophy, Timer } from 'lucide-react';
import QuizCard from './QuizCard';
import FlashCards from './FlashCards';

interface QuizFlowProps {
  questions: any[];
  flashcards: any[];
  onComplete: (score: number) => void;
  moduleTitle: string;
}

const QuizFlow: React.FC<QuizFlowProps> = ({ 
  questions = [], 
  flashcards = [], 
  onComplete, 
  moduleTitle 
}) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'flashcards' | 'quiz' | 'complete'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleStartFlashcards = () => {
    setCurrentStep('flashcards');
  };

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestionIndex]?.answer;
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setCurrentStep('complete');
        onComplete(Math.round((score / questions.length) * 100));
      }
    }, 1500);
  };

  // Step: Intro
  if (currentStep === 'intro') {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">{moduleTitle}</h2>
        <p className="text-gray-400 mb-6">
          Get ready to test your knowledge! Start with flashcards to review the concepts,
          then take the quiz to earn XP.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartFlashcards}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          Start Learning
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    );
  }

  // Step: Flashcards
  if (currentStep === 'flashcards') {
    return (
      <div className="p-8">
        <FlashCards cards={flashcards} />
        <div className="flex justify-center mt-8">

        </div>
      </div>
    );
  }

  // Step: Quiz
  if (currentStep === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="p-8">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="font-bold">Question {currentQuestionIndex + 1}/{questions.length}</h3>
              <p className="text-sm text-gray-400">Score: {score}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-blue-400" />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Question */}
        <QuizCard
          question={currentQuestion}
          currentAnswer={selectedAnswer}
          onAnswer={handleAnswerSelect}
          isAnswered={selectedAnswer !== null}
          isCorrect={isAnswerCorrect}
          onNext={() => {}}
          isLast={currentQuestionIndex === questions.length - 1}
        />
      </div>
    );
  }

  // Step: Completion
  if (currentStep === 'complete') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Quiz Complete!</h2>
        <p className="text-gray-400 mb-6">Your Score: {Math.round((score / questions.length) * 100)}%</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep('intro')}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300"
        >
          Retake Quiz
        </motion.button>
      </div>
    );
  }

  return null;
};

export default QuizFlow;
