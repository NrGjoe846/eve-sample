import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface TrueFalseQuestionProps {
  question: {
    question: string;
    answer: string;
  };
  onAnswer: (isCorrect: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (answer: string) => {
    if (!submitted) {
      setSelected(answer);
    }
  };

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === question.answer;
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);

    if (!correct) {
      setTimeout(() => {
        setSelected(null);
        setSubmitted(false);
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{question.question}</p>

      <div className="flex space-x-4">
        {['True', 'False'].map((option) => (
          <button
            key={option}
            className={`w-full p-3 rounded-lg border transition-all text-white font-semibold flex items-center justify-center
              ${
                submitted
                  ? selected === option
                    ? isCorrect
                      ? 'bg-green-500 border-green-600'
                      : 'bg-red-500 border-red-600'
                    : 'bg-gray-800 border-gray-600'
                  : selected === option
                  ? 'bg-blue-500 border-blue-600'
                  : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
              }`}
            onClick={() => handleSelect(option)}
            disabled={submitted}
          >
            {option}
            {submitted && selected === option && (
              isCorrect ? <CheckCircle className="w-5 h-5 ml-2 text-white" /> : <XCircle className="w-5 h-5 ml-2 text-white" />
            )}
          </button>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 flex items-center justify-center text-white font-bold"
          disabled={!selected}
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

export default TrueFalseQuestion;
