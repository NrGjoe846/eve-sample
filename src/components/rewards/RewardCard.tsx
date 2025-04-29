import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock } from 'lucide-react';
import { Reward } from '../../store/rewardStore';

interface RewardCardProps {
  reward: Reward;
  onClaim: () => void;
  userCurrency: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onClaim, userCurrency }) => {
  const canClaim = !reward.claimed && userCurrency >= reward.cost;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400';
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="absolute top-4 right-4">
          {reward.claimed ? (
            <Star className={`w-5 h-5 ${getRarityColor(reward.rarity)}`} />
          ) : (
            <Lock className="w-5 h-5 text-gray-500" />
          )}
        </div>

        <div className={`p-3 bg-white/10 rounded-lg w-fit mb-4 ${getRarityColor(reward.rarity)}`}>
          <span className="text-2xl">{reward.icon}</span>
        </div>

        <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{reward.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{reward.cost} points</span>
          </div>
          <button
            onClick={onClaim}
            disabled={!canClaim || reward.claimed}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              canClaim && !reward.claimed
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            {reward.claimed ? 'Claimed' : canClaim ? 'Claim' : 'Not enough points'}
          </button>
        </div>

        <div className="mt-4 text-xs">
          <span className={`${getRarityColor(reward.rarity)} uppercase font-bold`}>
            {reward.rarity}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardCard;
