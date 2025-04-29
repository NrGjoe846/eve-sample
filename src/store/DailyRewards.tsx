import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrencyStore } from './useCurrencyStore';

interface Reward {
  id: string;
  day: number;
  type: 'gems' | 'gold' | 'chest';
  amount: number;
}

const DailyRewards = () => {
  const { loginStreak, dailyRewardsCollected, addGems, addGold, collectDailyReward } = useCurrencyStore();
  const [claimAnimation, setClaimAnimation] = useState<string | null>(null);

  const rewards: Reward[] = [
    { id: '1', day: 1, type: 'gems', amount: 100 },
    { id: '2', day: 2, type: 'gold', amount: 500 },
    { id: '3', day: 3, type: 'gems', amount: 200 },
    { id: '4', day: 4, type: 'gold', amount: 1000 },
    { id: '5', day: 5, type: 'chest', amount: 1 },
    { id: '6', day: 6, type: 'gems', amount: 500 },
    { id: '7', day: 7, type: 'chest', amount: 3 },
  ];

  const handleClaim = (reward: Reward) => {
    if (reward.day > loginStreak || dailyRewardsCollected.includes(reward.id)) return;

    setClaimAnimation(reward.id);
    setTimeout(() => {
      setClaimAnimation(null);
      collectDailyReward(reward.id);
      if (reward.type === 'gems') addGems(reward.amount);
      if (reward.type === 'gold') addGold(reward.amount);
    }, 1000);
  };

  const getRewardIcon = (type: string) => {
    return type === 'gems' ? '💎' : type === 'gold' ? '🪙' : '🎁';
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {claimAnimation && (
          <motion.div
            className="absolute z-50 text-4xl"
            initial={{ scale: 1, opacity: 1, x: '50%' }}
            animate={{ scale: 2, opacity: 0, x: '90vw', y: '-10vh' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {getRewardIcon(rewards.find(r => r.id === claimAnimation)?.type || '')}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-3xl font-bold text-center mb-6 neon-text">Daily Login Rewards</h2>
      <div className="grid grid-cols-7 gap-4">
        {rewards.map((reward) => {
          const isClaimable = reward.day <= loginStreak && !dailyRewardsCollected.includes(reward.id);
          const isClaimed = dailyRewardsCollected.includes(reward.id);

          return (
            <motion.div
              key={reward.id}
              className={`card-3d p-4 rounded-xl bg-gradient-to-br ${isClaimable ? 'from-cyan-500 to-blue-600' : 'from-gray-700 to-gray-800'} tech-border`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl mb-2 gem-shine"
                animate={isClaimable ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: isClaimable ? Infinity : 0, duration: 1 }}
              >
                {getRewardIcon(reward.type)}
              </motion.div>
              <p className="text-white font-bold">{reward.amount}</p>
              <p className="text-sm text-gray-300">Day {reward.day}</p>
              <motion.button
                className={`mt-2 w-full py-1 rounded ${isClaimable ? 'bg-cyan-400 pulse-glow' : 'bg-gray-600'}`}
                onClick={() => handleClaim(reward)}
                disabled={!isClaimable || isClaimed}
                whileHover={{ scale: 1.05 }}
              >
                {isClaimed ? 'Claimed' : 'Claim'}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyRewards;
