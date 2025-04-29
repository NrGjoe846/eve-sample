import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  gems: number;
  gold: number;
  loginStreak: number;
  maxLoginStreak: number;
  dailyRewardsCollected: string[];
  addGems: (amount: number) => void;
  addGold: (amount: number) => void;
  increaseLoginStreak: () => void;
  collectDailyReward: (rewardId: string) => void;
  resetCurrency: () => void;
}

export const useCurrencyStore = create(
  persist<CurrencyState>(
    (set) => ({
      gems: 1300,
      gold: 5000,
      loginStreak: 3,
      maxLoginStreak: 10,
      dailyRewardsCollected: [],
      addGems: (amount) => set((state) => ({ gems: state.gems + amount })),
      addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
      increaseLoginStreak: () =>
        set((state) => {
          const newStreak = state.loginStreak + 1;
          return {
            loginStreak: newStreak,
            maxLoginStreak: newStreak > state.maxLoginStreak ? newStreak : state.maxLoginStreak,
          };
        }),
      collectDailyReward: (rewardId) =>
        set((state) => ({
          dailyRewardsCollected: [...state.dailyRewardsCollected, rewardId],
        })),
      resetCurrency: () => set({ gems: 0, gold: 0 }),
    }),
    { name: 'currency-storage' }
  )
);
