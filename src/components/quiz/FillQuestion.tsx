import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FillQuestionProps {
  question: {
    type: string;
    question: string;
    answer: string; // The correct answer
  };
  onAnswer: (isCorrect: boolean) => void;
}

const FillQuestion: React.FC<FillQuestionProps> = ({ question, onAnswer }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!userInput) return;
    const correct = userInput.trim().toLowerCase() === question.answer.trim().toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);

    if (!correct) {
      setTimeout(() => {
        setUserInput('');
        setSubmitted(false);
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{question.question}</p>

      <input
        type="text"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          setIsCorrect(null);
        }}
        className={`w-full p-3 border rounded-lg text-black transition-all duration-300 
          ${
            isCorrect === null
              ? 'border-gray-500 bg-white'
              : isCorrect
              ? 'border-green-500 bg-green-100'
              : 'border-red-500 bg-red-100'
          }
        `}
        placeholder="Type your answer here..."
        disabled={submitted}
      />

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 flex items-center justify-center text-white font-bold"
          disabled={!userInput}
        >
          Submit <CheckCircle className="w-5 h-5 ml-2" />
        </button>
      )}

      {submitted && (
        <div className="flex items-center space-x-2 mt-3">
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
          <span className={`text-lg ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect, try again!'}
          </span>
        </div>
      )}
    </div>
  );
};

export default FillQuestion;
