import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Medal, Crown, Lock, Sparkles, Award, Zap } from 'lucide-react';
import { useAchievementStore, Achievement } from '../../store/achievementStore';
import BackButton from '../BackButton';
import AchievementBadge from './AchievementBadge';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const achievementCategories = [
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

const AchievementsPage = () => {
  const { achievements, totalXP, level, streak } = useAchievementStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('beginner');
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement | null>(null);
  const { width, height } = useWindowSize();

  const filteredAchievements = achievements.filter(
    achievement => achievement.category === selectedCategory
  );

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalAchievements = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAchievementClick = (achievement: Achievement) => {
    if (achievement.isUnlocked) {
      setRecentlyUnlocked(achievement);
      setShowUnlockAnimation(true);
      setTimeout(() => {
        setShowUnlockAnimation(false);
        setRecentlyUnlocked(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      {showUnlockAnimation && <Confetti width={width} height={height} />}
      
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
                <AchievementBadge 
                  achievement={achievement}
                  onClick={() => handleAchievementClick(achievement)}
                />
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
