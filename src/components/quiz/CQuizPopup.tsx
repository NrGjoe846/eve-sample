import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Skull, Map as MapIcon, Flame } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import DragDropQuestion from './DragDropQuestion';
import MatchQuestion from './MatchQuestion';
import FillQuestion from './FillQuestion';
import OrderQuestion from './OrderQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import TranslateCodeQuestion from './TranslateCodeQuestion';
import MultipleSelectionQuestion from './MultipleSelectionQuestion';
import CodeCorrectionQuestion from './CodeCorrectionQuestion';
import FillInTheBlank from './FillInTheBlank';
import CVideo from './CVideo';
import questionsData from "../../data/quizzes/cBasics.json";

const componentMap = {
  DragDropQuestion,
  MatchQuestion,
  FillQuestion,
  OrderQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  TranslateCodeQuestion,
  MultipleSelectionQuestion,
  CodeCorrectionQuestion,
  FillInTheBlank
};

interface CQuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  moduleTitle: string;
}

const CQuizPopup: React.FC<CQuizPopupProps> = ({ isOpen, onClose, onComplete, moduleTitle }) => {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showVideo, setShowVideo] = useState(false);
  const { width, height } = useWindowSize();

  const findQuestionsForModule = () => {
    if (!questionsData || !Array.isArray(questionsData)) {
      console.error("Error: questionsData is undefined or not an array.", questionsData);
      return [];
    }

    console.log("Finding questions for moduleTitle:", moduleTitle);
    for (const phase of questionsData) {
      for (const topic of phase.topics) {
        for (const subtopic of topic.subtopics) {
          console.log("Checking subtopic:", subtopic.subtopic);
          if (subtopic.subtopic === moduleTitle && subtopic.questionsData && subtopic.questionsData.length > 0) {
            console.log("Found matching subtopic:", subtopic.subtopic);
            return subtopic.questionsData;
          }
        }
      }
    }

    console.warn("No questions found for module:", moduleTitle);
    return [];
  };

  const questions = findQuestionsForModule();
  const currentQuestion = questions[currentQuestionIndex] || {};
  const QuestionComponent = componentMap[currentQuestion.component] || null;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const isVideoException = 
    moduleTitle === "What is C?" || 
    moduleTitle === "Setting up the C Environment (GCC, Code::Blocks, VS Code)";

  useEffect(() => {
    if (!isOpen) {
      setShowResults(false);
      setScore(0);
      setShowConfetti(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowVideo(false);
    } else if (isVideoException) {
      setShowVideo(true);
    }
  }, [isOpen, isVideoException]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (q.answer && Array.isArray(q.answer)) {
        const userAnswer = answers[index];
        const isCorrect = Array.isArray(userAnswer) &&
          userAnswer.length === q.answer.length &&
          userAnswer.every((ans, i) => ans === q.answer[i]);
        if (isCorrect) correctAnswers++;
      } else {
        if (answers[index] === q.answer) correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    onComplete(finalScore);
  };

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleVideoClose = () => {
    setShowVideo(false);
    onClose();
  };

  const handleVideoComplete = () => {
    setShowVideo(false);
    onComplete(100);
  };

  if (!isOpen) return null;

  if (!questions || questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="horror-bg bg-[#1C2526] rounded-2xl p-6 max-w-md w-full m-4 text-center border-2 border-[#468284]/30 shadow-[0_0_15px_rgba(139,0,0,0.2)] font-sans">
          <p className="text-xl text-[#F5F6F5] mb-4">No hauntings await in this crypt yet, survivor.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors shadow-md font-bold glow-hover"
          >
            Flee the Mausoleum
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <DndProvider backend={HTML5Backend}>
        {showConfetti && <Confetti width={width} height={height} />}
        <motion.div 
          className="relative w-full max-w-4xl horror-bg bg-[#1C2526] rounded-2xl shadow-2xl p-6 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#468284]/30 shadow-[0_0_15px_rgba(139,0,0,0.2)] font-sans"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#8B0000]/20 rounded-lg transition-all text-[#8B0000]"
          >
            <X className="w-6 h-6" />
          </button>

          {!showResults && !showVideo ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#F5F6F5]">{moduleTitle} Haunting</h2>
                <p className="text-sm text-[#468284]">Specter {currentQuestionIndex + 1} of {questions.length}</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-[#2E2E2E]/50 rounded-lg border border-[#468284]/20 shadow-inner"
                >
                  <p className="text-sm text-[#468284] italic">Banish these spirits to survive the night!</p>
                </motion.div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-[#468284]">
                  <span>Exorcism Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[#2E2E2E] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B0000] to-[#468284] rounded-full transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {QuestionComponent && (
                <div className="text-[#F5F6F5]">
                  <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-6 px-6 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors w-full shadow-md flex items-center justify-center gap-2 font-bold glow-hover"
              >
                <Flame className="w-5 h-5" />
                {currentQuestionIndex === questions.length - 1 ? 'Banish All' : 'Next Spirit'}
              </button>
            </>
          ) : showResults ? (
            <div className="text-center py-8">
              <Skull className="w-16 h-16 text-[#8B0000] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#F5F6F5] mb-4">Spirits Banished!</h2>
              <p className="text-xl text-[#F5F6F5] mb-4">Fear Factor: {score}%</p>
              <p className="text-[#468284] mb-6 italic">You’ve survived the haunting, brave soul!</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 mx-auto font-bold glow-hover"
              >
                <MapIcon className="w-5 h-5" />
                Escape the Crypt
              </button>
            </div>
          ) : null}
        </motion.div>

        <CVideo
          isOpen={showVideo}
          onClose={handleVideoClose}
          onComplete={handleVideoComplete}
          moduleTitle={moduleTitle}
        />
      </DndProvider>
    </motion.div>
  );
};

export default CQuizPopup;
