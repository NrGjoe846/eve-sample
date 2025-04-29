import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Star, Clock, Trophy, Code2, Zap, HelpCircle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import CodeEditor from '../CodeEditor/CodeEditor';
import { geminiService, Challenge, CodeValidationResult } from '../../services/geminiService';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';
import Loader from '../ui/Loader';

const DailyChallenge = () => {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [result, setResult] = useState<CodeValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const { width, height } = useWindowSize();

  // Animation controls and scores
  const controls = useAnimationControls();
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [codeQualityScore, setCodeQualityScore] = useState<number>(0);

  // Spring animations for scores
  const scoreSpring = useSpring({
    number: performanceScore,
    from: { number: 0 },
    config: { mass: 1, tension: 20, friction: 10 }
  });

  const qualitySpring = useSpring({
    number: codeQualityScore,
    from: { number: 0 },
    config: { mass: 1, tension: 20, friction: 10 }
  });

  useEffect(() => {
    loadDailyChallenge();
    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadDailyChallenge = async () => {
    try {
      const userLevel = localStorage.getItem('challengeLevel') || 'beginner';
      const newChallenge = await geminiService.generateDailyChallenge(userLevel);
      setChallenge(newChallenge);
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const handleSubmit = async () => {
    if (!challenge) return;

    try {
      // Trigger submission animation
      controls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 }
      });

      const validationResult = await geminiService.validateSolution(
        challenge,
        userCode,
        'python'
      );

      setResult(validationResult);
      setAttempts(prev => prev + 1);
      setPerformanceScore(validationResult.performanceScore || 0);
      setCodeQualityScore(validationResult.codeQualityScore || 0);

      if (validationResult.isCorrect) {
        handleSuccess();
      } else if (attempts >= 1) {
        setShowHints(true);
      }
    } catch (error) {
      console.error('Error validating solution:', error);
    }
  };

  const handleSuccess = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const getNextHint = async () => {
    if (!challenge || currentHint >= 2) return;
    
    try {
      const hint = await geminiService.getInfiniteHints(
        challenge,
        userCode,
        challenge.hints.slice(0, currentHint + 1)
      );
      setCurrentHint(prev => prev + 1);
    } catch (error) {
      console.error('Error getting hint:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-bold">Daily Coding Challenge</h1>
                <p className="text-gray-400">Keep your streak alive!</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>{timeLeft}</span>
            </div>
            <div className="px-4 py-2 bg-blue-500/20 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>100 XP</span>
            </div>
          </div>
        </div>

        {challenge && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenge Description */}
            <div className="space-y-6">
              <motion.div 
                className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
                animate={controls}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold">{challenge.title}</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300">{challenge.description}</p>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Example:</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">Input: {challenge.sampleInput}</p>
                      <p className="text-gray-300">Output: {challenge.sampleOutput}</p>
                    </div>
                  </div>

                  {showHints && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Hints:</h3>
                      {challenge.hints.slice(0, currentHint + 1).map((hint, index) => (
                        <div
                          key={index}
                          className="p-3 bg-blue-500/10 rounded-lg text-sm text-gray-300"
                        >
                          {hint}
                        </div>
                      ))}
                      {currentHint < 2 && (
                        <button
                          onClick={getNextHint}
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                        >
                          <HelpCircle className="w-4 h-4" />
                          Get Next Hint
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Result Display with Animations */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`backdrop-blur-xl bg-white/10 rounded-2xl p-6 border ${
                      result.isCorrect ? 'border-green-500/50' : 'border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {result.isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                      )}
                      <h3 className="font-bold">
                        {result.isCorrect ? 'Success!' : 'Keep Trying!'}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <p className="text-gray-300">{result.feedback}</p>
                      
                      {!result.isCorrect && (
                        <>
                          <div className="text-sm">
                            <span className="text-gray-400">Efficiency: </span>
                            <span>{result.efficiency}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Readability: </span>
                            <span>{result.readability}</span>
                          </div>
                          {result.suggestions.length > 0 && (
                            <div className="text-sm">
                              <span className="text-gray-400">Suggestions:</span>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {result.suggestions.map((suggestion, index) => (
                                  <li key={index}>{suggestion}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Performance and Code Quality Scores */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <animated.div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
                        <h3 className="text-lg font-semibold mb-2">Performance Score</h3>
                        <div className="flex items-center justify-between">
                          <animated.div className="text-3xl font-bold text-blue-400">
                            {scoreSpring.number.to(n => `${Math.floor(n)}%`)}
                          </animated.div>
                          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <animated.div
                              className="h-full bg-blue-500"
                              style={{ width: scoreSpring.number.to(n => `${n}%`) }}
                            />
                          </div>
                        </div>
                      </animated.div>
                      <animated.div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
                        <h3 className="text-lg font-semibold mb-2">Code Quality Score</h3>
                        <div className="flex items-center justify-between">
                          <animated.div className="text-3xl font-bold text-purple-400">
                            {qualitySpring.number.to(n => `${Math.floor(n)}%`)}
                          </animated.div>
                          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <animated.div
                              className="h-full bg-purple-500"
                              style={{ width: qualitySpring.number.to(n => `${n}%`) }}
                            />
                          </div>
                        </div>
                      </animated.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Code Editor */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
              <CodeEditor
                value={userCode}
                onChange={setUserCode}
                onSubmit={handleSubmit}
                language="python"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
