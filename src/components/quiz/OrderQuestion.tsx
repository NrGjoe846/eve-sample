import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface OrderingQuestionProps {
  question: {
    type: string;
    question: string;
    options: string[]; // Unordered options
    correctOrder: string[]; // Correct order
  };
  onAnswer: (isCorrect: boolean) => void;
}

const OrderingQuestion: React.FC<OrderingQuestionProps> = ({ question, onAnswer }) => {
  const [userOrder, setUserOrder] = useState<string[]>([...question.options]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Function to swap the position of selected options
  const handleChange = (index: number, selectedIndex: number) => {
    if (submitted) return; // Prevent changes after submission

    const newOrder = [...userOrder];
    const [movedItem] = newOrder.splice(index, 1); // Remove item from current position
    newOrder.splice(selectedIndex, 0, movedItem); // Insert item at new position

    setUserOrder(newOrder);
    setIsCorrect(null); // Reset correctness state
  };

  // Function to check if the user's order matches the correct order
  const checkIfCorrect = (user: string[], correct: string[]) => {
    return user.length === correct.length && user.every((val, idx) => val === correct[idx]);
  };

  // Handle submission of the answer
  const handleSubmit = () => {
    if (!question.correctOrder) {
      console.error("Error: correctOrder is undefined in the question object.");
      return;
    }

    const correct = checkIfCorrect(userOrder, question.correctOrder);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(correct);

    // Reset order after 1.5 seconds if incorrect
    if (!correct) {
      setTimeout(() => {
        setUserOrder([...question.options]);
        setSubmitted(false);
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{question.question}</p>

      <div className="space-y-2">
        {userOrder.map((option, index) => (
          <div
            key={option}
            className={`flex items-center space-x-4 p-2 border rounded-lg font-semibold text-white transition-all duration-300
              ${
                submitted
                  ? isCorrect
                    ? "bg-green-500 border-green-600"
                    : "bg-red-500 border-red-600"
                  : "bg-gray-800 border-gray-600"
              }
            `}
          >
            <select
              value={index}
              onChange={(e) => handleChange(index, parseInt(e.target.value))}
              className="p-2 border rounded-lg text-black"
              disabled={submitted}
            >
              {userOrder.map((_, i) => (
                <option key={i} value={i}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span>{option}</span>
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 font-bold text-white flex items-center justify-center"
        >
          Submit Answer
          <CheckCircle className="w-5 h-5 ml-2" />
        </button>
      )}

      {submitted && (
        <div className="mt-2 p-2 text-white font-bold rounded-lg flex items-center space-x-2">
          {isCorrect ? (
            <>
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-green-500">Correct Order!</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-red-500" />
              <span className="text-red-500">Incorrect Order, Try Again!</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderingQuestion;
