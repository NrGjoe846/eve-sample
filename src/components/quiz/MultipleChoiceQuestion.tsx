import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface MultipleChoiceQuestionProps {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (option: string) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const correct = selectedOption === question.answer;
      setIsCorrect(correct);
      setSubmitted(true);
      onAnswer(selectedOption);

      if (!correct) {
        setTimeout(() => {
          setSelectedOption(null);
          setSubmitted(false);
          setIsCorrect(null);
        }, 1500);
      }
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-3 rounded-lg border transition-all text-white font-semibold
              ${
                submitted
                  ? selectedOption === option
                    ? isCorrect
                      ? 'bg-green-500 border-green-600'
                      : 'bg-red-500 border-red-600'
                    : 'bg-gray-800 border-gray-600'
                  : selectedOption === option
                  ? 'bg-blue-500 border-blue-600'
                  : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
              }`}
            onClick={() => handleSelect(option)}
            disabled={submitted}
          >
            {option}
          </button>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          disabled={!selectedOption}
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

export default MultipleChoiceQuestion;
