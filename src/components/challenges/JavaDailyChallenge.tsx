import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useWindowSize } from 'react-use';
import { 
  Play, Save, Code2, Terminal, Trophy, Star, Award,
  ArrowLeft, CheckCircle, XCircle, HelpCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CodeEditor from '../CodeEditor/CodeEditor';
import Confetti from 'react-confetti';
import { geminiService } from '../../services/geminiService';
import Loader from '../ui/Loader';

interface JavaDailyChallengeProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const JavaDailyChallenge: React.FC<JavaDailyChallengeProps> = ({ difficulty }) => {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<any>(null);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState(0);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [codeQualityScore, setCodeQualityScore] = useState(0);
  const { width, height } = useWindowSize();

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
    loadChallenge();
  }, [difficulty]);

  const loadChallenge = async () => {
    setIsLoading(true);
    try {
      const newChallenge = await geminiService.generateDailyChallenge(difficulty);
      setChallenge(newChallenge);
      setCode(newChallenge.starterCode || '');
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!challenge) return;
    
    setIsExecuting(true);
    try {
      const validationResult = await geminiService.validateSolution(
        challenge,
        code,
        'java'
      );

      if (!validationResult.isCorrect) {
        setResult({
          success: false,
          message: 'Your code is wrong. Try again.'
        });
        if (hints.length < 3) {
          const newHint = await geminiService.getInfiniteHints(challenge, code, hints);
          setHints([...hints, newHint]);
        }
      } else {
        setResult({
          success: true,
          message: 'Correct! Well done!'
        });
        setShowConfetti(true);
        setPerformanceScore(validationResult.performanceScore || 0);
        setCodeQualityScore(validationResult.codeQualityScore || 0);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (error) {
      console.error('Error validating solution:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Java Daily Challenge</h1>
              <p className="text-gray-400">
                Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>100 XP</span>
            </div>
          </div>
        </div>

        {challenge && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div 
                className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20"
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
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

                  {hints.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Hints:</h3>
                      {hints.map((hint, index) => (
                        <div
                          key={index}
                          className="p-3 bg-blue-500/10 rounded-lg text-sm text-gray-300"
                        >
                          {hint}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`backdrop-blur-xl bg-white/10 rounded-2xl p-6 border ${
                      result.success ? 'border-green-500/50' : 'border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {result.success ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                      )}
                      <h3 className="font-bold">
                        {result.success ? 'Success!' : 'Keep Trying!'}
                      </h3>
                    </div>
                    <p className="text-gray-300">{result.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result?.success && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-2 gap-4"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
              <CodeEditor
                value={code}
                onChange={setCode}
                onSubmit={handleSubmit}
                language="java"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JavaDailyChallenge;
