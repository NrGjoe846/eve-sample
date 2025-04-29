import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Swords, Map as MapIcon, Zap } from 'lucide-react';
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
import JavaVideo from './JavaVideo';
import questionsData from "../../data/quizzes/javaBasics.json";

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

interface JavaQuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  moduleTitle: string;
}

const JavaQuizPopup: React.FC<JavaQuizPopupProps> = ({ isOpen, onClose, onComplete, moduleTitle }) => {
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
    moduleTitle === "Installing Java (JDK, JRE)" || 
    moduleTitle === "Setting up the IDE (IntelliJ IDEA, Eclipse, or VS Code)";

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
        <div className="bg-[#0d1b2a] rounded-2xl p-6 max-w-md w-full m-4 text-center border-2 border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans">
          <p className="text-xl text-[#e0f7ff] mb-4">No circuits available for this race yet, racer.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors shadow-md font-bold"
          >
            Return to Grid
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
          className="relative w-full max-w-4xl bg-[#0d1b2a] rounded-2xl shadow-2xl p-6 m-4 max-h-[90vh] overflow-y-auto border-2 border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)] font-sans"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#00d4ff]/20 rounded-lg transition-all text-[#00d4ff]"
          >
            <X className="w-6 h-6" />
          </button>

          {!showResults && !showVideo ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#e0f7ff]">{moduleTitle} Circuit Race</h2>
                <p className="text-sm text-[#80deea]">Lap {currentQuestionIndex + 1} of {questions.length}</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-[#1e3d59]/50 rounded-lg border border-[#00d4ff]/20 shadow-inner"
                >
                  <p className="text-sm text-[#80deea] italic">Power through this circuit to dominate the grid!</p>
                </motion.div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-[#80deea]">
                  <span>Race Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[#1e3d59] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] rounded-full transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {QuestionComponent && (
                <div className="text-[#e0f7ff]">
                  <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-6 px-6 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors w-full shadow-md flex items-center justify-center gap-2 font-bold glow-hover"
              >
                <Zap className="w-5 h-5" />
                {currentQuestionIndex === questions.length - 1 ? 'Finish Race' : 'Next Lap'}
              </button>
            </>
          ) : showResults ? (
            <div className="text-center py-8">
              <Swords className="w-16 h-16 text-[#00d4ff] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#e0f7ff] mb-4">Circuit Conquered!</h2>
              <p className="text-xl text-[#e0f7ff] mb-4">Race Score: {score}%</p>
              <p className="text-[#80deea] mb-6 italic">You’ve blazed through the track, cyber racer!</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#00d4ff] hover:bg-[#00b8d4] text-[#0d1b2a] rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 mx-auto font-bold glow-hover"
              >
                <MapIcon className="w-5 h-5" />
                Return to Grid
              </button>
            </div>
          ) : null}
        </motion.div>

        <JavaVideo
          isOpen={showVideo}
          onClose={handleVideoClose}
          onComplete={handleVideoComplete}
          moduleTitle={moduleTitle}
        />
      </DndProvider>
    </motion.div>
  );
};

export default JavaQuizPopup;
