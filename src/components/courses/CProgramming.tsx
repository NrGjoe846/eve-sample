import React, { useState, useEffect, useRef } from 'react';
import { 
  Skull, Flame, CheckCircle, Lock, ChevronDown, ChevronUp, 
  AlertCircle, ChevronLeft, ChevronRight, Star, Ghost, Trophy, Flame as Fire // Added Trophy, renamed Flame to Fire
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CQuizPopup from '../quiz/CQuizPopup';
import CFlashcards from '../quiz/CFlashcards';
import CVideo from '../quiz/CVideo';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { coursePhases } from "./CCourseData";

interface Topic {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  locked: boolean;
  subtopics?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  expanded?: boolean;
  icon: string;
  backgroundImage?: string;
}

const CProgramming = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [flippedPhase, setFlippedPhase] = useState<string | null>(null);
  const [sparklePhase, setSparklePhase] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<{ phaseId: string; topicId: string } | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentQuizTopic, setCurrentQuizTopic] = useState<string>('');
  const [currentQuizSubtopic, setCurrentQuizSubtopic] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('cProgress');
    return saved ? JSON.parse(saved) : {
      completedTopics: [],
      completedSubtopics: {},
      xp: 0,
      level: 1,
      streak: 0,
      lastCompletedDate: null
    };
  });

  const phasesContainerRef = useRef<HTMLDivElement>(null);
  const subtopicsRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragThreshold = 5;
  const [dragDistance, setDragDistance] = useState(0);

  useEffect(() => {
    scrollToCurrentPhase();
  }, [currentPhaseIndex]);

  useEffect(() => {
    localStorage.setItem('cProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const getPhaseProgress = (phase: Phase) => {
    const totalSubtopics = phase.topics.reduce((sum, topic) => 
      sum + (topic.subtopics?.length || 0), 0);
    const completedSubtopics = phase.topics.reduce((sum, topic) => {
      const completed = userProgress.completedSubtopics[topic.id] || [];
      return sum + completed.length;
    }, 0);
    return totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
  };

  const scrollToCurrentPhase = () => {
    if (phasesContainerRef.current) {
      const container = phasesContainerRef.current;
      const phaseElement = container.children[currentPhaseIndex] as HTMLElement;
      const containerWidth = container.offsetWidth;
      const phaseWidth = phaseElement.offsetWidth;
      const newScrollLeft = phaseElement.offsetLeft - (containerWidth / 2) + (phaseWidth / 2);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!phasesContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - phasesContainerRef.current.offsetLeft);
    setScrollLeft(phasesContainerRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !phasesContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - phasesContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    phasesContainerRef.current.scrollLeft = scrollLeft - walk;
    setDragDistance(Math.abs(walk));
  };

  const handleMouseUp = () => {
    if (!isDragging || !phasesContainerRef.current) return;
    setIsDragging(false);
    if (dragDistance > dragThreshold) {
      const container = phasesContainerRef.current;
      const phaseWidth = container.children[0].clientWidth;
      const scrollPosition = container.scrollLeft;
      const newIndex = Math.round(scrollPosition / phaseWidth);
      setCurrentPhaseIndex(Math.max(0, Math.min(newIndex, coursePhases.length - 1)));
    }
  };

  const handlePrevPhase = () => {
    setCurrentPhaseIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextPhase = () => {
    setCurrentPhaseIndex(prev => Math.min(coursePhases.length - 1, prev + 1));
  };

  const handlePhaseClick = (index: number) => {
    if (dragDistance <= dragThreshold) {
      setCurrentPhaseIndex(index);
      setSelectedTopic(null);
      setExpandedTopic(null);
    }
  };

  const handlePhaseStart = (phaseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSparklePhase(phaseId);
    const sparkles = Array.from({ length: 8 }).map((_, i) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute w-2 h-2 bg-[#8B0000] rounded-full';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      sparkle.style.animation = `sparkle ${Math.random() * 0.5 + 0.5}s ease-in-out ${i * 0.1}s`;
      return sparkle;
    });
    const target = e.currentTarget as HTMLElement;
    sparkles.forEach(sparkle => target.appendChild(sparkle));
    setTimeout(() => sparkles.forEach(sparkle => sparkle.remove()), 1000);
    setTimeout(() => setSparklePhase(null), 500);
    if (flippedPhase !== phaseId) setFlippedPhase(phaseId);
  };

  const handleFlipBack = (phaseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedPhase(null);
  };

  const handleTopicStart = (phaseId: string, topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTopic?.topicId === topicId) {
      setExpandedTopic(null);
      setSelectedTopic(null);
    } else {
      setExpandedTopic(topicId);
      setSelectedTopic({ phaseId, topicId });
      setTimeout(() => subtopicsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  const isSubtopicLocked = (phaseId: string, topicId: string, subtopicIndex: number) => {
    const phase = coursePhases.find(p => p.id === phaseId);
    const topic = phase?.topics.find(t => t.id === topicId);
    if (!topic?.subtopics || subtopicIndex === 0) return false;
    const previousSubtopic = topic.subtopics[subtopicIndex - 1];
    return !userProgress.completedSubtopics[topicId]?.includes(previousSubtopic.id);
  };

  const handleSubtopicStart = (topicTitle: string, subtopicTitle: string) => {
    if (!selectedTopic) return;

    const phase = coursePhases.find(p => p.id === selectedTopic.phaseId);
    const topic = phase?.topics.find(t => t.id === selectedTopic.topicId);
    const subtopicIndex = topic?.subtopics?.findIndex(s => s.title === subtopicTitle);

    if (subtopicIndex !== undefined && subtopicIndex >= 0 && isSubtopicLocked(selectedTopic.phaseId, selectedTopic.topicId, subtopicIndex)) {
      console.log('Subtopic is locked. Complete previous subtopic first.');
      return;
    }

    console.log('Starting subtopic:', { topicTitle, subtopicTitle });
    setCurrentQuizTopic(topicTitle);
    setCurrentQuizSubtopic(subtopicTitle);

    const isPhase1Topic1 = 
      coursePhases[0].topics[0].title === topicTitle &&
      (subtopicTitle === coursePhases[0].topics[0].subtopics?.[0].title ||
       subtopicTitle === coursePhases[0].topics[0].subtopics?.[1].title);

    if (isPhase1Topic1) {
      setShowVideo(true);
      setShowFlashcards(false);
      setShowQuiz(false);
    } else {
      setShowFlashcards(true);
      setShowQuiz(false);
      setShowVideo(false);
    }
  };

  const handleStartQuiz = () => {
    setShowFlashcards(false);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    console.log('Quiz completed with score:', score);
    setShowQuiz(false);
    setShowConfetti(true);

    if (selectedTopic) {
      const phase = coursePhases.find(p => p.id === selectedTopic.phaseId);
      const topic = phase?.topics.find(t => t.id === selectedTopic.topicId);
      const subtopic = topic?.subtopics?.find(s => s.title === currentQuizSubtopic);

      if (subtopic) {
        const newCompletedSubtopics = {
          ...userProgress.completedSubtopics,
          [selectedTopic.topicId]: [
            ...(userProgress.completedSubtopics[selectedTopic.topicId] || []),
            subtopic.id
          ]
        };

        const baseXP = 50;
        const bonusXP = Math.floor(score * baseXP / 100);
        const totalXP = baseXP + bonusXP;

        const today = new Date().toDateString();
        const streakBonus = userProgress.lastCompletedDate === new Date(Date.now() - 86400000).toDateString()
          ? userProgress.streak + 1
          : 1;

        const newXP = userProgress.xp + totalXP;
        const newLevel = Math.floor(newXP / 1000) + 1;

        setUserProgress(prev => ({
          ...prev,
          completedSubtopics: newCompletedSubtopics,
          xp: newXP,
          level: newLevel,
          streak: streakBonus,
          lastCompletedDate: today
        }));

        const allSubtopicsCompleted = topic.subtopics.every(s =>
          newCompletedSubtopics[selectedTopic.topicId]?.includes(s.id)
        );

        if (allSubtopicsCompleted) {
          setUserProgress(prev => ({
            ...prev,
            completedTopics: [...prev.completedTopics, topic.id]
          }));
        }
      }
    }

    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  const handleVideoComplete = () => {
    setShowVideo(false);
    if (selectedTopic) {
      const phase = coursePhases.find(p => p.id === selectedTopic.phaseId);
      const topic = phase?.topics.find(t => t.id === selectedTopic.topicId);
      const subtopic = topic?.subtopics?.find(s => s.title === currentQuizSubtopic);
      if (subtopic) {
        setUserProgress(prev => ({
          ...prev,
          completedSubtopics: {
            ...prev.completedSubtopics,
            [selectedTopic.topicId]: [
              ...(prev.completedSubtopics[selectedTopic.topicId] || []),
              subtopic.id
            ]
          },
          xp: prev.xp + 25
        }));
      }
    }
  };

  const selectedPhaseAndTopic = selectedTopic ? {
    phase: coursePhases.find(p => p.id === selectedTopic.phaseId),
    topic: coursePhases.find(p => p.id === selectedTopic.phaseId)?.topics.find(t => t.id === selectedTopic.topicId)
  } : null;

  const AnimatePresenceComponent = AnimatePresence || (({ children }) => <>{children}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C2526] to-[#2E2E2E] text-[#F5F6F5] p-8 font-sans">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <style>
        {`
          @keyframes sparkle {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
          }
          @keyframes flickerGlow {
            0% { box-shadow: 0 0 5px rgba(139, 0, 0, 0.4); }
            50% { box-shadow: 0 0 15px rgba(139, 0, 0, 0.8); }
            100% { box-shadow: 0 0 5px rgba(139, 0, 0, 0.4); }
          }
          .horror-bg {
            background-image: url('https://www.transparenttextures.com/patterns/dark-mosaic.png');
            background-size: 100px 100px;
          }
          .glow-hover:hover {
            animation: flickerGlow 1.5s infinite;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .horror-button {
            background-color: #8B0000;
            color: #F5F6F5;
            border: 1px solid #468284;
            border-radius: 8px;
            padding: 4px 12px;
            transition: background-color 0.2s ease;
          }
          .horror-button:hover {
            background-color: #A52A2A;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto relative">
        <div className="fixed top-4 left-4 z-50">
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="horror-button flex items-center gap-2 text-sm shadow-md font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
            Flee the Shadows
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-4 right-4 flex items-center gap-4 bg-[#1C2526]/90 p-3 rounded-lg shadow-[0_0_15px_rgba(139,0,0,0.2)] border border-[#468284]/30 z-20"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#8B0000]" />
            <span className="font-bold text-[#F5F6F5]">{userProgress.xp} Dread</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#468284]" />
            <span className="font-bold text-[#F5F6F5]">Level {userProgress.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fire className="w-5 h-5 text-[#8B0000] animate-[flickerGlow_2s_infinite]" />
            <span className="font-bold text-[#F5F6F5]">{userProgress.streak} Nights</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 p-6 horror-bg bg-[#1C2526]/90 rounded-lg shadow-[0_0_15px_rgba(139,0,0,0.2)] border border-[#468284]/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <Skull className="w-8 h-8 text-[#8B0000]" />
            <h2 className="text-3xl font-bold text-[#F5F6F5]">C: Haunted Code Mausoleum</h2>
          </div>
          <p className="text-lg text-[#468284]">Face the terrors of C to conquer its darkest secrets!</p>
        </motion.div>

        <div className="relative mb-12">
          <button
            onClick={handlePrevPhase}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#1C2526]/50 rounded-full backdrop-blur-sm transition-opacity duration-300 ${
              currentPhaseIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-[#8B0000]/20'
            }`}
            disabled={currentPhaseIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-[#8B0000]" />
          </button>

          <button
            onClick={handleNextPhase}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#1C2526]/50 rounded-full backdrop-blur-sm transition-opacity duration-300 ${
              currentPhaseIndex === coursePhases.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-[#8B0000]/20'
            }`}
            disabled={currentPhaseIndex === coursePhases.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-[#8B0000]" />
          </button>

          <div 
            ref={phasesContainerRef}
            className="flex gap-6 overflow-x-auto px-4 py-2 no-scrollbar touch-pan-x"
            style={{ scrollSnapType: 'x mandatory' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {coursePhases.map((phase, index) => {
              const progress = getPhaseProgress(phase);
              return (
                <motion.div
                  key={phase.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: index === currentPhaseIndex ? 1 : 0.8, opacity: index === currentPhaseIndex ? 1 : 0.6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative min-w-[300px] md:min-w-[400px] h-[400px] md:h-[500px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer horror-bg bg-[#1C2526] border border-[#468284]/30 shadow-[0_0_15px_rgba(139,0,0,0.2)] ${
                    index === currentPhaseIndex ? 'ring-4 ring-[#8B0000]' : 'filter grayscale'
                  }`}
                  onClick={() => handlePhaseClick(index)}
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <motion.div
                    className="relative w-full h-full transition-all preserve-3d"
                    animate={{ rotateY: flippedPhase === phase.id ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 backface-hidden p-6 flex flex-col">
                      <Skull className="w-12 h-12 text-[#8B0000] mb-4 mx-auto" />
                      <h3 className="text-2xl font-bold mb-2 text-center text-[#F5F6F5]">{phase.title}</h3>
                      <p className="text-sm text-[#468284] mb-4 text-center">{phase.description}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1 text-[#468284]">
                          <span>Survival Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-[#2E2E2E] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#8B0000] to-[#468284] rounded-full transition-all duration-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      {index === currentPhaseIndex && (
                        <motion.button
                          onClick={(e) => handlePhaseStart(phase.id, e)}
                          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="mt-auto mx-auto px-6 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg flex items-center gap-2 shadow-md font-bold glow-hover"
                        >
                          {sparklePhase === phase.id ? (
                            <AlertCircle className="w-5 h-5 text-[#F5F6F5] animate-spin" style={{ animationDuration: '0.5s' }} />
                          ) : (
                            <Flame className="w-5 h-5" />
                          )}
                          Enter the Crypt
                        </motion.button>
                      )}
                    </div>

                    <div className="absolute inset-0 backface-hidden rotate-y-180 horror-bg bg-[#1C2526] overflow-y-auto border border-[#468284]/30 shadow-[0_0_15px_rgba(139,0,0,0.2)]">
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold mb-4 text-center text-[#F5F6F5]">{phase.title} Tombs</h3>
                        {phase.topics.map((topic) => (
                          <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                            className="bg-[#2E2E2E]/50 rounded-lg p-4 border border-[#468284]/20 shadow-inner glow-hover"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold mb-1 text-[#F5F6F5]">{topic.title}</h4>
                                <p className="text-sm text-[#468284]">{topic.description}</p>
                              </div>
                              <motion.button
                                onClick={(e) => handleTopicStart(phase.id, topic.id, e)}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg flex items-center gap-2 shadow-md font-bold"
                              >
                                <Flame className="w-4 h-4" />
                                <span>Unveil</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                        <motion.button
                          onClick={(e) => handleFlipBack(phase.id, e)}
                          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="w-full mt-4 px-4 py-2 bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5] rounded-lg flex items-center justify-center gap-2 shadow-md font-bold glow-hover"
                        >
                          <ChevronLeft className="w-5 h-5" />
                          Back to Mausoleum
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {coursePhases.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPhaseIndex ? 'w-8 bg-[#8B0000]' : 'bg-[#468284]/50 hover:bg-[#468284]'
                }`}
                onClick={() => setCurrentPhaseIndex(index)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        <AnimatePresenceComponent>
          {selectedPhaseAndTopic && selectedPhaseAndTopic.topic && (
            <motion.div
              key={selectedPhaseAndTopic.phase?.id + "-topics"}
              ref={subtopicsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 mt-8"
            >
              <div className="flex items-center justify-between horror-bg bg-[#1C2526]/90 p-4 rounded-lg shadow-[0_0_15px_rgba(139,0,0,0.2)] border border-[#468284]/30">
                <h3 className="text-xl font-bold text-[#F5F6F5]">{selectedPhaseAndTopic.topic.title} Echoes</h3>
                <motion.button 
                  onClick={() => setSelectedTopic(null)} 
                  className="text-[#8B0000] hover:text-[#A52A2A]"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedTopic === selectedPhaseAndTopic.topic.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              <AnimatePresenceComponent>
                {expandedTopic === selectedPhaseAndTopic.topic.id && (
                  <motion.div
                    key={selectedPhaseAndTopic.topic.id + "-subtopics"}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    {selectedPhaseAndTopic.topic.subtopics?.map((subtopic, index) => {
                      const isLocked = isSubtopicLocked(selectedPhaseAndTopic.phase!.id, selectedPhaseAndTopic.topic.id, index);
                      const isCompleted = userProgress.completedSubtopics[selectedTopic?.topicId]?.includes(subtopic.id);

                      return (
                        <motion.div
                          key={subtopic.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
                          className={`flex items-center justify-between p-3 rounded-lg border border-[#468284]/20 shadow-inner ${
                            isLocked ? 'bg-[#2E2E2E]/50' : 'bg-[#1C2526]/70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-[#468284]" />
                            ) : isLocked ? (
                              <Lock className="w-5 h-5 text-[#468284]" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-[#8B0000]" />
                            )}
                            <div>
                              <span className={`text-md font-semibold ${isLocked ? 'text-[#468284]' : 'text-[#F5F6F5]'}`}>
                                {subtopic.title}
                              </span>
                              <p className="text-sm text-[#468284]">Face the horror within!</p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: isLocked ? 1 : 1.05, boxShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
                            whileTap={{ scale: isLocked ? 1 : 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => !isLocked && handleSubtopicStart(selectedPhaseAndTopic.topic.title, subtopic.title)}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md ${
                              isLocked 
                                ? 'bg-[#8B0000]/20 text-[#468284]/50 cursor-not-allowed'
                                : isCompleted 
                                ? 'bg-[#468284]/20 text-[#F5F6F5]'
                                : 'bg-[#8B0000] hover:bg-[#A52A2A] text-[#F5F6F5]'
                            }`}
                            disabled={isLocked || isCompleted}
                          >
                            {isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Flame className="w-4 h-4" />
                            )}
                            {isCompleted ? 'Exorcised' : isLocked ? 'Sealed' : 'Confront'}
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresenceComponent>
            </motion.div>
          )}
        </AnimatePresenceComponent>

        <CFlashcards
          isOpen={showFlashcards}
          onClose={() => setShowFlashcards(false)}
          onStartQuiz={handleStartQuiz}
          moduleTitle={currentQuizSubtopic}
        />

        <CQuizPopup
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
          moduleTitle={currentQuizSubtopic}
        />

        <CVideo
          isOpen={showVideo}
          onClose={handleVideoClose}
          onComplete={handleVideoComplete}
          moduleTitle={currentQuizSubtopic}
        />
      </div>
    </div>
  );
};

export default CProgramming;
