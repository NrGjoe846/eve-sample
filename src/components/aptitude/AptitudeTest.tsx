import React, { useState, useEffect } from 'react';
import { 
  Brain, Book, MessageSquare, Lightbulb, Globe, ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { aptitudeService, AptitudeQuestion, TopicScore } from '../../services/aptitudeService';
import Loader from '../ui/Loader';

const aptitudeTopics = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Quantitative Aptitude",
    description: "Master mathematical and numerical problem-solving skills essential for competitive exams",
    topics: ["Number System", "Algebra", "Geometry", "Data Interpretation", "Arithmetic"]
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Logical Reasoning",
    description: "Develop critical thinking and analytical reasoning abilities",
    topics: ["Syllogisms", "Blood Relations", "Coding-Decoding", "Series", "Analogies"]
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Verbal Ability",
    description: "Enhance your language skills, comprehension, and communication",
    topics: ["Reading Comprehension", "Vocabulary", "Grammar", "Verbal Reasoning", "Error Spotting"]
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Non-Verbal Reasoning",
    description: "Improve pattern recognition and spatial reasoning capabilities",
    topics: ["Pattern Series", "Figure Matrix", "Paper Folding", "Mirror Images", "Embedded Figures"]
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "General Knowledge",
    description: "Stay updated with current affairs and essential general awareness",
    topics: ["Current Affairs", "Science", "History", "Geography", "Technology"]
  }
];

const AptitudeTest = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scores, setScores] = useState<TopicScore[]>(() => {
    const savedScores = localStorage.getItem('aptitudeScores');
    return savedScores ? JSON.parse(savedScores) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('aptitudeScores', JSON.stringify(scores));
  }, [scores]);

  const handleTopicSelect = async (topic: string) => {
    setIsLoading(true);
    setSelectedTopic(topic);
    try {
      const newQuestions = await aptitudeService.generateQuestions(topic);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !questions[currentQuestionIndex]) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScores(prevScores => {
        const topicScore = prevScores.find(s => s.topic === selectedTopic);
        if (topicScore) {
          return prevScores.map(s => 
            s.topic === selectedTopic
              ? {
                  ...s,
                  score: s.score + 1,
                  completedQuestions: [...s.completedQuestions, questions[currentQuestionIndex].id]
                }
              : s
          );
        } else {
          return [
            ...prevScores,
            {
              topic: selectedTopic!,
              score: 1,
              totalQuestions: questions.length,
              completedQuestions: [questions[currentQuestionIndex].id]
            }
          ];
        }
      });
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getTopicScore = (topic: string) => {
    return scores.find(s => s.topic === topic)?.score || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>

        {!selectedTopic ? (
          <div className="grid grid-cols-1 gap-8">
            {aptitudeTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                        {topic.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                      <p className="text-gray-400">{topic.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    {topic.topics.map((subtopic, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleTopicSelect(subtopic)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center transition-all duration-300 relative"
                      >
                        <span>{subtopic}</span>
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {getTopicScore(subtopic)} pts
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedTopic}</h2>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  Back to Topics
                </button>
              </div>

              {questions[currentQuestionIndex] && (
                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>

                  <div className="text-xl mb-6">
                    {questions[currentQuestionIndex].question}
                  </div>

                  <div className="space-y-3">
                    {questions[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswer(idx)}
                        className={`w-full p-4 text-left rounded-lg transition-all duration-300 ${
                          selectedAnswer === idx
                            ? 'bg-blue-500/20 border-blue-500/50'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        } border`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {showExplanation ? (
                    <div className="mt-6 space-y-4">
                      <div className={`p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-500/20'
                          : 'bg-red-500/20'
                      }`}>
                        <p className="font-medium mb-2">
                          {selectedAnswer === questions[currentQuestionIndex].correctAnswer
                            ? 'Correct!'
                            : 'Incorrect'}
                        </p>
                        <p>{questions[currentQuestionIndex].explanation}</p>
                      </div>
                      
                      {currentQuestionIndex < questions.length - 1 && (
                        <button
                          onClick={handleNextQuestion}
                          className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
                        >
                          Next Question
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswer === null}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;
