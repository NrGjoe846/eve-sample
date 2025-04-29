import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Award, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ScoreCardProps {
  totalQuestions: number;
  correctAnswers: number;
  onClose: () => void;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  totalQuestions,
  correctAnswers,
  onClose,
}) => {
  const { width, height } = useWindowSize();
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isHighScore = percentage >= 80;

  const getFeedback = () => {
    if (percentage >= 80) return "Excellent work! You've mastered this topic!";
    if (percentage >= 60) return "Good job! Keep up the great work!";
    return "Keep practicing! You're making progress!";
  };

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-400' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 70) return { grade: 'C', color: 'yellow-400' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-400' };
    return { grade: 'F', color: 'text-red-400' };
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {isHighScore && <Confetti width={width} height={height} />}
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-md w-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex justify-center mb-4"
          >
            {isHighScore ? (
              <Trophy className="w-16 h-16 text-yellow-400" />
            ) : (
              <Target className="w-16 h-16 text-blue-400" />
            )}
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Test Results</h2>
          <p className="text-gray-400">Here's how you performed</p>
        </div>

        {/* Score Circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-700"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-blue-500"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold">{percentage}%</span>
              <span className={`block text-sm ${getGrade().color}`}>
                Grade {getGrade().grade}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Total Questions</span>
            </div>
            <span className="text-2xl font-bold">{totalQuestions}</span>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Correct Answers</span>
            </div>
            <span className="text-2xl font-bold">{correctAnswers}</span>
          </div>
        </div>

        {/* Feedback */}
        <div className="text-center mb-8">
          <p className="text-lg">{getFeedback()}</p>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Continue Learning
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ScoreCard;
