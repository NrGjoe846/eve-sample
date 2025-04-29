import React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";

interface QuizCardProps {
  question?: {
    type: "fill-blank" | "multiple-choice" | "true-false";
    question: string;
    options?: string[];
    answer: string | number | boolean;
    explanation: string;
  };
  currentAnswer: any;
  onAnswer: (answer: any) => void;
  isAnswered: boolean;
  isCorrect?: boolean;
  onNext: () => void;
  isLast: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentAnswer,
  onAnswer,
  isAnswered,
  isCorrect,
  onNext,
  isLast,
}) => {
  console.log("QuizCard received question:", question);

  // Check if `question` is missing
  if (!question || !question.question) {
    return <div className="text-red-500 p-4">⚠ Error: No question available.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white/10 rounded-2xl p-6 border border-white/20"
    >
      <h3 className="text-xl font-bold mb-4">{question.question}</h3>

      {question.type === "multiple-choice" && question.options && (
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                isAnswered
                  ? option === question.answer
                    ? "bg-green-500 text-white"
                    : option === currentAnswer
                    ? "bg-red-500 text-white"
                    : "bg-gray-100"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => !isAnswered && onAnswer(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {isAnswered && (
        <div className="mt-4 text-sm">
          {isCorrect ? (
            <p className="text-green-500 flex items-center">
              <Check className="w-5 h-5 mr-1" /> Correct!
            </p>
          ) : (
            <p className="text-red-500 flex items-center">
              <X className="w-5 h-5 mr-1" /> Incorrect. Correct answer:{" "}
              <strong>{question.answer}</strong>
            </p>
          )}
          <p className="mt-2 text-gray-400">
            <HelpCircle className="inline w-4 h-4" /> {question.explanation}
          </p>
        </div>
      )}

      {isAnswered && (
        <button
          onClick={onNext}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          {isLast ? "Finish" : "Next"} <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default QuizCard;
