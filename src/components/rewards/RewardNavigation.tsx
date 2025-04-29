import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Gift } from 'lucide-react';
import { useRewardStore } from '../../store/rewardStore';
import RewardCard from './RewardCard';

const RewardNavigation = () => {
  const { rewards, currency, claimReward } = useRewardStore();

  const handleClaimReward = (id: string) => {
    claimReward(id);
    // Play sound effect
    const audio = new Audio('/reward-claim.mp3');
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rewards Gallery</h1>
          <p className="text-gray-400">
            Unlock exclusive rewards with your earned points
          </p>
        </div>

        <div className="fixed top-4 right-4 flex items-center gap-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{currency} Points</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-400" />
            <span className="font-bold">
              {rewards.filter(r => r.claimed).length} / {rewards.length} Claimed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="font-bold">
              {rewards.filter(r => r.unlocked && !r.claimed).length} Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onClaim={() => handleClaimReward(reward.id)}
              userCurrency={currency}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardNavigation;
