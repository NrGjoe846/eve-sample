import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FillInTheBlankProps {
  question?: {
    question: string;
    answer: string;
  };
  onAnswer: (answer: string) => void;
}

const FillInTheBlankCode: React.FC<FillInTheBlankProps> = ({ question, onAnswer }) => {
  if (!question || !question.answer) {
    return <p className="text-red-500">Error: Question data is missing.</p>;
  }

  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    const correct = userInput.trim() === question.answer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(userInput);

    if (!correct) {
      setTimeout(() => {
        setUserInput('');
        setIsSubmitted(false);
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{question?.question ?? "No question available"}</p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={`px-4 py-2 border rounded-md focus:outline-none bg-gray-800 text-white w-full 
            ${
              isSubmitted
                ? isCorrect
                  ? 'border-green-500'
                  : 'border-red-500'
                : 'border-gray-600'
            }`}
        />
      </div>
      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        >
          Submit <CheckCircle className="w-5 h-5 ml-2" />
        </button>
      )}
      {isSubmitted && (
        <div className="flex items-center space-x-2">
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

export default FillInTheBlankCode;
