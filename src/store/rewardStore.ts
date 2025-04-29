import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'badge' | 'theme' | 'feature' | 'discount';
  icon: string;
  unlocked: boolean;
  claimed: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface RewardState {
  rewards: Reward[];
  currency: number;
  addCurrency: (amount: number) => void;
  unlockReward: (id: string) => void;
  claimReward: (id: string) => void;
}

export const useRewardStore = create(
  persist<RewardState>(
    (set) => ({
      rewards: [
        {
          id: 'dark-theme',
          name: 'Dark Theme Pro',
          description: 'Unlock a premium dark theme for your IDE',
          cost: 1000,
          type: 'theme',
          icon: '🌙',
          unlocked: false,
          claimed: false,
          rarity: 'rare'
        },
        {
          id: 'pro-badge',
          name: 'Pro Coder Badge',
          description: 'Show off your expertise with this exclusive badge',
          cost: 2000,
          type: 'badge',
          icon: '🏆',
          unlocked: false,
          claimed: false,
          rarity: 'epic'
        },
        {
          id: 'ai-assistant',
          name: 'AI Assistant',
          description: 'Get personalized coding tips from our AI',
          cost: 5000,
          type: 'feature',
          icon: '🤖',
          unlocked: false,
          claimed: false,
          rarity: 'legendary'
        }
      ],
      currency: 0,
      addCurrency: (amount) => 
        set((state) => ({ currency: state.currency + amount })),
      unlockReward: (id) =>
        set((state) => ({
          rewards: state.rewards.map((reward) =>
            reward.id === id ? { ...reward, unlocked: true } : reward
          )
        })),
      claimReward: (id) =>
        set((state) => ({
          rewards: state.rewards.map((reward) =>
            reward.id === id ? { ...reward, claimed: true } : reward
          ),
          currency: state.currency - (state.rewards.find((r) => r.id === id)?.cost || 0)
        }))
    }),
    {
      name: 'reward-storage'
    }
  )
);
