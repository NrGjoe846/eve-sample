import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Medal, Crown, Lock, Sparkles, Award, Zap } from 'lucide-react';
import BackButton from '../BackButton';
import AchievementCard from './AchievementCard';
import { Achievement, AchievementCategory } from './types';

const achievementCategories: AchievementCategory[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Start your journey in AI and coding',
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Level up your skills',
    icon: <Medal className="w-6 h-6 text-blue-400" />,
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Master advanced concepts',
    icon: <Crown className="w-6 h-6 text-purple-400" />,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'social',
    name: 'Social & Community',
    description: 'Engage with the community',
    icon: <Award className="w-6 h-6 text-orange-400" />,
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 'special',
    name: 'Special & Hidden',
    description: 'Discover secret achievements',
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    color: 'from-yellow-500/20 to-amber-500/20'
  }
];

const achievements: Achievement[] = [
  // Beginner Level Achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first lesson',
    category: 'beginner',
    xpReward: 100,
    icon: '🎯',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'curious-mind',
    title: 'Curious Mind',
    description: 'Answer your first question',
    category: 'beginner',
    xpReward: 50,
    icon: '🤔',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'daily-streak-starter',
    title: 'Daily Streak Starter',
    description: 'Complete lessons for 3 days in a row',
    category: 'beginner',
    xpReward: 150,
    icon: '🔥',
    progress: 0,
    maxProgress: 3,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'problem-solver',
    title: 'Problem Solver',
    description: 'Solve your first coding challenge',
    category: 'beginner',
    xpReward: 100,
    icon: '💡',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'beginner-coder',
    title: 'Beginner Coder',
    description: 'Submit 5 correct answers in the coding section',
    category: 'beginner',
    xpReward: 200,
    icon: '👨‍💻',
    progress: 0,
    maxProgress: 5,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Try out 3 different learning modules',
    category: 'beginner',
    xpReward: 150,
    icon: '🗺️',
    progress: 0,
    maxProgress: 3,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'ai-enthusiast',
    title: 'AI Enthusiast',
    description: 'Complete all beginner-level lessons',
    category: 'beginner',
    xpReward: 300,
    icon: '🤖',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  
  // Intermediate Level Achievements
  {
    id: 'halfway-there',
    title: 'Halfway There',
    description: 'Complete 50% of the course',
    category: 'intermediate',
    xpReward: 500,
    icon: '📊',
    progress: 0,
    maxProgress: 100,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    category: 'intermediate',
    xpReward: 400,
    icon: '🔥',
    progress: 0,
    maxProgress: 7,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Debug and fix an incorrect code submission',
    category: 'intermediate',
    xpReward: 300,
    icon: '🐛',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  
  // Advanced Level Achievements
  {
    id: 'ai-expert',
    title: 'AI Expert',
    description: 'Complete all lessons in the advanced section',
    category: 'advanced',
    xpReward: 1000,
    icon: '🧠',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'challenge-conqueror',
    title: 'Challenge Conqueror',
    description: 'Solve 25 advanced coding challenges',
    category: 'advanced',
    xpReward: 800,
    icon: '⚔️',
    progress: 0,
    maxProgress: 25,
    isUnlocked: false,
    unlockedAt: null
  },
  
  // Social & Community Achievements
  {
    id: 'friendly-coder',
    title: 'Friendly Coder',
    description: 'Add 5 friends in the app',
    category: 'social',
    xpReward: 200,
    icon: '👥',
    progress: 0,
    maxProgress: 5,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'helping-hand',
    title: 'Helping Hand',
    description: 'Answer a question in the discussion forum',
    category: 'social',
    xpReward: 100,
    icon: '🤝',
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  
  // Special & Hidden Achievements
  {
    id: 'night-owl',
    title: '???',
    description: 'Complete a secret challenge',
    category: 'special',
    xpReward: 500,
    icon: '🦉',
    progress: 0,
    isUnlocked: false,
    isHidden: true,
    unlockedAt: null
  },
  {
    id: 'early-bird',
    title: '???',
    description: 'Complete another secret challenge',
    category: 'special',
    xpReward: 500,
    icon: '🌅',
    progress: 0,
    isUnlocked: false,
    isHidden: true,
    unlockedAt: null
  }
];

const AchievementsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('beginner');
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : achievements;
  });
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(userAchievements));
  }, [userAchievements]);

  const filteredAchievements = userAchievements.filter(
    achievement => achievement.category === selectedCategory
  );

  const unlockedCount = userAchievements.filter(a => a.isUnlocked).length;
  const totalAchievements = userAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold">Achievements</h1>
          </div>
          <p className="text-gray-400">
            Track your progress and unlock special rewards
          </p>
          
          {/* Progress Overview */}
          <div className="mt-6 p-4 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {unlockedCount} of {totalAchievements} achievements unlocked
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {achievementCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group ${
                selectedCategory === category.id 
                  ? 'bg-white/20 border-blue-500/50' 
                  : 'bg-white/10 border-white/10 hover:bg-white/15'
              } backdrop-blur-xl rounded-xl p-4 border transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
              <div className="relative flex flex-col items-center text-center">
                {category.icon}
                <h3 className="font-bold mt-2">{category.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{category.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Achievement Unlock Animation */}
        <AnimatePresence>
          {showUnlockAnimation && recentlyUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            >
              <motion.div
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-center"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
                <p className="text-xl mb-4">{recentlyUnlocked.title}</p>
                <p className="text-gray-400 mb-6">{recentlyUnlocked.description}</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>+{recentlyUnlocked.xpReward} XP</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AchievementsPage;
