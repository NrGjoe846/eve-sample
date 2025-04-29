import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import QuizCard from './QuizCard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const pythonQuestions = [
  // ... existing questions array
];

const PythonQuiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const { width, height } = useWindowSize();

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    setIsAnswerChecked(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setIsAnswerChecked(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < pythonQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerChecked(false);
    } else {
      const score = calculateScore();
      setShowResults(true);
      onComplete(score);
    }
  };

  const handleCheckAnswer = () => {
    if (answers[currentQuestionIndex] !== undefined) {
      setIsAnswerChecked(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === pythonQuestions[index].answer) {
        correct++;
      }
    });
    return Math.round((correct / pythonQuestions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <>
        {score >= 70 && <Confetti width={width} height={height} />}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="mb-8">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-xl">Your Score: {score}%</p>
          </div>
          <div className="flex justify-center gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400 mb-2" />
              <p className="text-sm">XP Earned</p>
              <p className="text-xl font-bold">{score * 10}</p>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  const currentQuestion = pythonQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const isAnswered = currentAnswer !== undefined;
  const isCorrect = isAnswerChecked && currentAnswer === currentQuestion.answer;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {currentQuestionIndex + 1} of {pythonQuestions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / pythonQuestions.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500" 
            initial={{ width: 0 }} 
            animate={{ width: `${((currentQuestionIndex + 1) / pythonQuestions.length) * 100}%` }} 
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <QuizCard
          key={currentQuestionIndex}
          question={currentQuestion}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onCheckAnswer={handleCheckAnswer}
          isLast={currentQuestionIndex === pythonQuestions.length - 1}
          isFirst={currentQuestionIndex === 0}
        />
      </AnimatePresence>
    </div>
  );
};

export default PythonQuiz;
