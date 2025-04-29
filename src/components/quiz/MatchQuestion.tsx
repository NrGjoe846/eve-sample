import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface MatchQuestionProps {
  question?: {  // Made optional to prevent crashes
    type: string;
    question: string;
    options?: { term: string; match: string }[];  // Made optional to handle undefined
  };
  onAnswer: (answer: { term: string; match: string }[]) => void;
}

const MatchQuestion: React.FC<MatchQuestionProps> = ({ question, onAnswer }) => {
  if (!question || !question.options) {
    return <p className="text-red-500">Error: Question data is missing.</p>;
  }

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ term: string; match: string }[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pairingColors, setPairingColors] = useState<{ [key: string]: string }>({});
  const colors = ['bg-yellow-500', 'bg-purple-500', 'bg-blue-500', 'bg-pink-500'];
  let colorIndex = 0;

  const getNextColor = () => {
    const color = colors[colorIndex % colors.length];
    colorIndex++;
    return color;
  };

  const handleSelectTerm = (term: string) => {
    if (submitted) return;
    setSelectedTerm(term);
  };

  const handleSelectMatch = (match: string) => {
    if (!selectedTerm || submitted) return;
    const color = pairingColors[selectedTerm] || getNextColor();
    setPairingColors({ ...pairingColors, [selectedTerm]: color, [match]: color });
    setMatchedPairs([...matchedPairs, { term: selectedTerm, match }]);
    setSelectedTerm(null);
  };

  const checkAnswer = () => {
    setSubmitted(true);
    onAnswer(matchedPairs);

    // Check if all pairs are correct
    const isAllCorrect = matchedPairs.every(pair => 
      question.options!.some(option => option.term === pair.term && option.match === pair.match)
    );

    if (!isAllCorrect) {
      setTimeout(() => {
        setMatchedPairs([]);
        setPairingColors({});
        setSubmitted(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{question?.question ?? "No question available"}</p>
      <div className="grid grid-cols-2 gap-4 border border-gray-500 p-4 rounded-lg">
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Terms</h3>
          {question.options?.map((option) => (  // Optional chaining + fallback empty array
            <button
              key={option.term}
              onClick={() => handleSelectTerm(option.term)}
              className={`block w-full p-3 rounded-lg text-left border transition-all 
                ${selectedTerm === option.term ? 'bg-blue-500 text-white shadow-lg scale-105' : pairingColors[option.term] || 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {option.term}
            </button>
          )) ?? []}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold">Matches</h3>
          {question.options?.map((option) => (  // Optional chaining + fallback empty array
            <button
              key={option.match}
              onClick={() => handleSelectMatch(option.match)}
              className={`block w-full p-3 rounded-lg text-left border transition-all 
                ${pairingColors[option.match] || 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {option.match}
            </button>
          )) ?? []}
        </div>
      </div>
      {!submitted && (
        <button
          onClick={checkAnswer}
          className="w-full p-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        >
          Submit <CheckCircle className="w-5 h-5 ml-2" />
        </button>
      )}
      {submitted && (
        <div className="mt-4 space-y-2">
          {matchedPairs.map(({ term, match }) => {
            const isCorrect = question.options!.some(option => option.term === term && option.match === match);
            return (
              <div key={term} className={`p-3 rounded-lg text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                {term} → {match}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchQuestion;
