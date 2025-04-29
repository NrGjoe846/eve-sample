import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock } from 'lucide-react';
import { Achievement } from '../../store/achievementStore';

interface AchievementBadgeProps {
  achievement: Achievement;
  onClick?: () => void;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, onClick }) => {
  const isLocked = !achievement.isUnlocked;
  const showProgress = achievement.maxProgress && achievement.maxProgress > 0;
  const progressPercentage = showProgress 
    ? (achievement.progress / achievement.maxProgress!) * 100 
    : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group cursor-pointer ${
        isLocked ? 'opacity-75' : ''
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{achievement.icon}</div>
          <div className="flex-1">
            <h3 className="font-bold">
              {isLocked && achievement.isHidden ? '???' : achievement.title}
            </h3>
            <p className="text-sm text-gray-400">
              {isLocked && achievement.isHidden ? 'Secret achievement' : achievement.description}
            </p>
          </div>
          {isLocked ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5" />
              <span className="text-sm">+{achievement.xpReward} XP</span>
            </div>
          )}
        </div>

        {showProgress && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{achievement.progress} / {achievement.maxProgress}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {achievement.unlockedAt && (
          <div className="mt-2 text-sm text-gray-400">
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementBadge;
