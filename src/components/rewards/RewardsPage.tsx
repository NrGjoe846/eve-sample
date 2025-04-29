import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, Trophy, Crown, Sparkles, ChevronRight, Lock } from 'lucide-react';
import BackButton from '../BackButton';

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
}

const rewards: Reward[] = [
  {
    id: 'custom-avatar',
    name: 'Custom Avatar Frame',
    description: 'Add a unique frame to your profile picture',
    points: 100,
    icon: <Gift className="w-8 h-8" />,
    unlocked: true,
    rarity: 'common',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'pro-badge',
    name: 'Pro Coder Badge',
    description: 'Show off your coding expertise',
    points: 500,
    icon: <Star className="w-8 h-8" />,
    unlocked: true,
    rarity: 'rare',
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    id: 'special-theme',
    name: 'Dark Theme Pro',
    description: 'Unlock an exclusive dark theme for your IDE',
    points: 1000,
    icon: <Trophy className="w-8 h-8" />,
    unlocked: false,
    rarity: 'epic',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'legendary-status',
    name: 'Legendary Coder Status',
    description: 'Achieve legendary status with special perks',
    points: 5000,
    icon: <Crown className="w-8 h-8" />,
    unlocked: false,
    rarity: 'legendary',
    color: 'from-yellow-500/20 to-amber-500/20'
  }
];

const RewardsPage = () => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClaimReward = (reward: Reward) => {
    if (!reward.unlocked) return;
    
    setSelectedReward(reward);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-green-400';
      case 'rare':
        return 'text-blue-400';
      case 'epic':
        return 'text-purple-400';
      case 'legendary':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rewards Gallery</h1>
          <p className="text-gray-400">
            Unlock exclusive rewards by earning points and completing achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <motion.div
              key={reward.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${reward.color} rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
              
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  {reward.unlocked ? (
                    <Sparkles className={`w-5 h-5 ${getRarityColor(reward.rarity)}`} />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                <div className={`p-3 bg-white/10 rounded-lg w-fit mb-4 ${getRarityColor(reward.rarity)}`}>
                  {reward.icon}
                </div>

                <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{reward.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{reward.points} points</span>
                  </div>
                  <motion.button
                    onClick={() => handleClaimReward(reward)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                      reward.unlocked
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-700 cursor-not-allowed'
                    }`}
                    whileHover={reward.unlocked ? { scale: 1.05 } : {}}
                    whileTap={reward.unlocked ? { scale: 0.95 } : {}}
                  >
                    {reward.unlocked ? 'Claim' : 'Locked'}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="mt-4 text-xs">
                  <span className={`${getRarityColor(reward.rarity)} uppercase font-bold`}>
                    {reward.rarity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reward Details Modal */}
        <AnimatePresence>
          {selectedReward && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setSelectedReward(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`relative bg-gradient-to-br ${selectedReward.color} backdrop-blur-xl p-8 rounded-2xl border border-white/20 max-w-md w-full m-4`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4">
                  <Sparkles className={`w-6 h-6 ${getRarityColor(selectedReward.rarity)}`} />
                </div>

                <div className={`p-4 bg-white/10 rounded-lg w-fit mb-6 ${getRarityColor(selectedReward.rarity)}`}>
                  {selectedReward.icon}
                </div>

                <h2 className="text-2xl font-bold mb-2">{selectedReward.name}</h2>
                <p className="text-gray-300 mb-4">{selectedReward.description}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{selectedReward.points} points</span>
                  </div>
                  <span className={`${getRarityColor(selectedReward.rarity)} uppercase text-sm font-bold`}>
                    {selectedReward.rarity}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedReward(null)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RewardsPage;
