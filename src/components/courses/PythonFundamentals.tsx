// src/components/courses/PythonFundamentals.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Scroll, CheckCircle, Lock, ChevronDown, ChevronUp, 
  AlertCircle, Star, Swords, Shield, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import PythonQuizPopup from '../quiz/PythonQuizPopup';
import PythonFlashcards from '../quiz/PythonFlashcards';
import PythonVideo from '../quiz/PythonVideo';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { coursePhases } from './PythonCourseData';

const storyChapters = [
  {
    phaseId: "phase-1",
    title: "The Shattered Code Realm",
    intro: "Hail, brave adventurer! The Code Realm lies in ruins. Wield the power of variables to mend its broken foundations!",
    topics: {
      "intro": {
        intro: "The Variable Vaults spill their treasures. Master storage to seal them shut!",
        subtopics: {
          "installing-python": "Forge strong variable names to lock the vault doors.",
          "ide-setup": "Assign the right data types to appease the vault guardians.",
          "Introduction to Python Programming": "The realm needs your wisdom to master Python’s basics!" // Matches JSON subtopic
        }
      }
    },
    completion: "The realm’s core stands firm! The Code King beckons you onward."
  },
];

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
}

const PythonFundamentals: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [flippedPhase, setFlippedPhase] = useState<string | null>(null);
  const [sparklePhase, setSparklePhase] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<{ phaseId: string; topicId: string } | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizTopic, setCurrentQuizTopic] = useState<string>('');
  const [currentQuizSubtopic, setCurrentQuizSubtopic] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('pythonProgress');
    return saved ? JSON.parse(saved) : {
      completedTopics: [],
      completedSubtopics: {},
      xp: 0,
      level: 1,
      streak: 0,
      lastCompletedDate: null,
      storyProgress: []
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
    localStorage.setItem('pythonProgress', JSON.stringify(userProgress));
  }, [userProgress]);

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
      sparkle.className = 'absolute w-2 h-2 bg-yellow-400 rounded-full';
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
    const subtopic = topic?.subtopics?.find(s => s.title === subtopicTitle);

    if (!subtopic) return;

    if (subtopicIndex !== undefined && subtopicIndex >= 0 && isSubtopicLocked(selectedTopic.phaseId, selectedTopic.topicId, subtopicIndex)) {
      console.log('Subtopic is locked. Please complete the previous subtopic first.');
      return;
    }

    const isCompleted = userProgress.completedSubtopics[selectedTopic.topicId]?.includes(subtopic.id);
    if (isCompleted) {
      console.log('Subtopic already completed. Moving to next unlocked subtopic or topic.');
      return;
    }

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
      // For "Introduction to Python Programming" or other subtopics, go straight to quiz
      if (subtopicTitle === "Introduction to Python Programming") {
        setShowQuiz(true);
        setShowFlashcards(false);
        setShowVideo(false);
      } else {
        setShowFlashcards(true);
        setShowQuiz(false);
        setShowVideo(false);
      }
    }
  };

  const handleQuizComplete = (score: number) => {
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
          ].filter((id, index, self) => self.indexOf(id) === index)
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

        const newStoryProgress = [...userProgress.storyProgress];
        const storySegment = `${selectedTopic.phaseId}-${selectedTopic.topicId}-${subtopic.id}`;
        if (!newStoryProgress.includes(storySegment)) {
          newStoryProgress.push(storySegment);
        }

        setUserProgress(prev => {
          const updatedProgress = {
            ...prev,
            completedSubtopics: newCompletedSubtopics,
            xp: newXP,
            level: newLevel,
            streak: streakBonus,
            lastCompletedDate: today,
            storyProgress: newStoryProgress
          };
          localStorage.setItem('pythonProgress', JSON.stringify(updatedProgress));
          return updatedProgress;
        });

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
        setUserProgress(prev => {
          const newCompletedSubtopics = {
            ...prev.completedSubtopics,
            [selectedTopic.topicId]: [
              ...(prev.completedSubtopics[selectedTopic.topicId] || []),
              subtopic.id
            ].filter((id, index, self) => self.indexOf(id) === index)
          };
          const updatedProgress = {
            ...prev,
            completedSubtopics: newCompletedSubtopics,
            xp: prev.xp + 25
          };
          localStorage.setItem('pythonProgress', JSON.stringify(updatedProgress));
          return updatedProgress;
        });
      }
    }
  };

  const handleStartQuiz = () => {
    setShowFlashcards(false);
    setShowQuiz(true);
  };

  const selectedPhaseAndTopic = selectedTopic ? {
    phase: coursePhases.find(p => p.id === selectedTopic.phaseId),
    topic: coursePhases.find(p => p.id === selectedTopic.phaseId)?.topics.find(t => t.id === selectedTopic.topicId)
  } : null;

  const AnimatePresenceComponent = FramerAnimatePresence || (({ children }) => <>{children}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2e2e2e] to-[#1a1a1a] text-gray-200 p-8 font-serif">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <style>
        {`
          @keyframes sparkle {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
          }
          @keyframes glowPulse {
            0% { box-shadow: 0 0 5px rgba(166, 124, 0, 0.3); }
            50% { box-shadow: 0 0 15px rgba(166, 124, 0, 0.7); }
            100% { box-shadow: 0 0 5px rgba(166, 124, 0, 0.3); }
          }
          .parchment-bg {
            background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
            background-color: #f4e4bc;
            color: #3c2f2f;
            border: 2px solid #8b5e3c;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
          }
          .glow-hover:hover {
            animation: glowPulse 1.5s infinite;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .adventure-button {
            background-color: #8b5e3c;
            color: #f4e4bc;
            border: 1px solid #6b4e31;
            border-radius: 8px;
            padding: 4px 12px;
            transition: background-color 0.2s ease;
          }
          .adventure-button:hover {
            background-color: #a67c00;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="adventure-button flex items-center gap-2 text-sm shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
            Retreat
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 p-6 parchment-bg rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <Compass className="w-8 h-8 text-[#8b5e3c]" />
            <h2 className="text-3xl font-bold text-[#3c2f2f]">Quest for Python’s Ancient Codex</h2>
          </div>
          <p className="text-lg text-[#6b4e31]">Embark on a grand adventure to master the art of Python!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 flex items-center gap-4 parchment-bg p-3 rounded-lg shadow-md z-20"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#a67c00]" />
            <span className="font-bold text-[#3c2f2f]">{userProgress.xp} Valor</span>
          </div>
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#8b5e3c]" />
            <span className="font-bold text-[#3c2f2f]">Rank {userProgress.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#6b4e31]" />
            <span className="font-bold text-[#3c2f2f]">{userProgress.streak} Days Questing</span>
          </div>
        </motion.div>

        <div className="relative mb-12">
          <div 
            ref={phasesContainerRef}
            className="flex gap-6 overflow-x-auto px-4 py-2 no-scrollbar touch-pan-x"
            style={{ scrollSnapType: 'x mandatory' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {coursePhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: index === currentPhaseIndex ? 1 : 0.8, opacity: index === currentPhaseIndex ? 1 : 0.6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative min-w-[300px] md:min-w-[400px] h-[400px] md:h-[500px] rounded-lg overflow-hidden flex-shrink-0 cursor-pointer parchment-bg ${
                  index === currentPhaseIndex ? 'ring-4 ring-[#a67c00]' : 'filter grayscale'
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
                    <Compass className="w-12 h-12 text-[#8b5e3c] mb-4 mx-auto" />
                    <h3 className="text-2xl font-bold mb-2 text-center text-[#3c2f2f]">{phase.title}</h3>
                    <p className="text-sm text-[#6b4e31] mb-4 text-center">{phase.description}</p>
                    {index === currentPhaseIndex && (
                      <motion.button
                        onClick={(e) => handlePhaseStart(phase.id, e)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mt-auto mx-auto px-6 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md glow-hover"
                      >
                        {sparklePhase === phase.id ? (
                          <AlertCircle className="w-5 h-5 text-[#f4e4bc] animate-spin" style={{ animationDuration: '0.5s' }} />
                        ) : (
                          <Scroll className="w-5 h-5" />
                        )}
                        Explore Realm
                      </motion.button>
                    )}
                  </div>

                  <div className="absolute inset-0 backface-hidden rotate-y-180 parchment-bg overflow-y-auto">
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold mb-4 text-center text-[#3c2f2f]">{phase.title} Quests</h3>
                      {phase.topics.map((topic) => (
                        <motion.div
                          key={topic.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                          className="bg-[#f4e4bc]/80 rounded-lg p-4 border border-[#8b5e3c] shadow-inner glow-hover"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold mb-1 text-[#3c2f2f]">{topic.title}</h4>
                              <p className="text-sm text-[#6b4e31]">
                                {storyChapters.find(ch => ch.phaseId === phase.id)?.topics?.[topic.id]?.intro || topic.description}
                              </p>
                            </div>
                            <motion.button
                              onClick={(e) => handleTopicStart(phase.id, topic.id, e)}
                              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg flex items-center gap-2 shadow-md"
                            >
                              <Scroll className="w-4 h-4" />
                              <span>Begin</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                      <motion.button
                        onClick={(e) => handleFlipBack(phase.id, e)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full mt-4 px-4 py-2 bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc] rounded-lg flex items-center justify-center gap-2 shadow-md glow-hover"
                      >
                        <Compass className="w-5 h-5" />
                        Return to Codex
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <FramerAnimatePresence>
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
              <div className="flex items-center justify-between parchment-bg p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#3c2f2f]">{selectedPhaseAndTopic.topic.title} Challenges</h3>
                <motion.button 
                  onClick={() => setSelectedTopic(null)} 
                  className="text-[#8b5e3c] hover:text-[#a67c00]"
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

              <FramerAnimatePresence>
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
                      const storyText = storyChapters
                        .find(ch => ch.phaseId === selectedPhaseAndTopic.phase!.id)
                        ?.topics?.[selectedPhaseAndTopic.topic.id]?.subtopics?.[subtopic.id.split('-')[1]];

                      return (
                        <motion.div
                          key={subtopic.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
                          className={`flex items-center justify-between p-3 rounded-lg border border-[#8b5e3c] shadow-inner ${
                            isLocked ? 'bg-[#d3c092]/50' : 'bg-[#f4e4bc]/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-[#6b4e31]" />
                            ) : isLocked ? (
                              <Lock className="w-5 h-5 text-[#8b5e3c]" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-[#8b5e3c]" />
                            )}
                            <div>
                              <span className={`text-md font-semibold ${isLocked ? 'text-[#8b5e3c]' : 'text-[#3c2f2f]'}`}>
                                {subtopic.title}
                              </span>
                              <p className="text-sm text-[#6b4e31]">{storyText || "A perilous task awaits!"}</p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: isLocked ? 1 : 1.05, boxShadow: "0 0 10px rgba(166, 124, 0, 0.5)" }}
                            whileTap={{ scale: isLocked ? 1 : 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => !isLocked && !isCompleted && handleSubtopicStart(selectedPhaseAndTopic.topic.title, subtopic.title)}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md ${
                              isLocked
                                ? 'bg-[#8b5e3c]/50 text-[#f4e4bc]/50 cursor-not-allowed'
                                : isCompleted
                                ? 'bg-[#6b4e31] text-[#f4e4bc]'
                                : 'bg-[#8b5e3c] hover:bg-[#a67c00] text-[#f4e4bc]'
                            }`}
                            disabled={isLocked || isCompleted}
                          >
                            {isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Scroll className="w-4 h-4" />
                            )}
                            {isCompleted ? 'Conquered' : isLocked ? 'Sealed' : 'Venture Forth'}
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </FramerAnimatePresence>
            </motion.div>
          )}
        </FramerAnimatePresence>

        <PythonQuizPopup
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
          moduleTitle={currentQuizSubtopic}
          phaseId={selectedTopic?.phaseId}
          topicId={selectedTopic?.topicId}
          storyChapters={storyChapters}
        />

        <PythonFlashcards
          isOpen={showFlashcards}
          onClose={() => setShowFlashcards(false)}
          onStartQuiz={handleStartQuiz}
          moduleTitle={currentQuizSubtopic}
        />

        <PythonVideo
          isOpen={showVideo}
          onClose={handleVideoClose}
          onComplete={handleVideoComplete}
          moduleTitle={currentQuizSubtopic}
        />
      </div>
    </div>
  );
};

export default PythonFundamentals;
