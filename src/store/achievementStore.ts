import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'social' | 'special';
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  progress: number;
  maxProgress?: number;
  unlockedAt: string | null;
  isHidden?: boolean;
}

interface AchievementState {
  achievements: Achievement[];
  totalXP: number;
  level: number;
  streak: number;
  lastActive: string | null;
  unlockAchievement: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  updateStreak: () => void;
}

const initialAchievements: Achievement[] = [
  // Beginner Level Achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first lesson',
    category: 'beginner',
    icon: '🎯',
    xpReward: 100,
    isUnlocked: false,
    progress: 0,
    unlockedAt: null
  },
  {
    id: 'curious-mind',
    title: 'Curious Mind',
    description: 'Answer your first question',
    category: 'beginner',
    icon: '🤔',
    xpReward: 50,
    isUnlocked: false,
    progress: 0,
    unlockedAt: null
  },
  {
    id: 'daily-streak-starter',
    title: 'Daily Streak Starter',
    description: 'Complete lessons for 3 days in a row',
    category: 'beginner',
    icon: '🔥',
    xpReward: 150,
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
    icon: '💡',
    xpReward: 100,
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'beginner-coder',
    title: 'Beginner Coder',
    description: 'Submit 5 correct answers in the coding section',
    category: 'beginner',
    icon: '👨‍💻',
    xpReward: 200,
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
    icon: '🗺️',
    xpReward: 150,
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
    icon: '🤖',
    xpReward: 300,
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
    icon: '📊',
    xpReward: 500,
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
    icon: '🔥',
    xpReward: 400,
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
    icon: '🐛',
    xpReward: 300,
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
    icon: '🧠',
    xpReward: 1000,
    progress: 0,
    isUnlocked: false,
    unlockedAt: null
  },
  {
    id: 'challenge-conqueror',
    title: 'Challenge Conqueror',
    description: 'Solve 25 advanced coding challenges',
    category: 'advanced',
    icon: '⚔️',
    xpReward: 800,
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
    icon: '👥',
    xpReward: 200,
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
    icon: '🤝',
    xpReward: 100,
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
    icon: '🦉',
    xpReward: 500,
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
    icon: '🌅',
    xpReward: 500,
    progress: 0,
    isUnlocked: false,
    isHidden: true,
    unlockedAt: null
  }
];

export const useAchievementStore = create(
  persist<AchievementState>(
    (set) => ({
      achievements: initialAchievements,
      totalXP: 0,
      level: 1,
      streak: 0,
      lastActive: null,

      unlockAchievement: (id) => set((state) => {
        const achievement = state.achievements.find(a => a.id === id);
        if (!achievement || achievement.isUnlocked) return state;

        return {
          achievements: state.achievements.map(a => 
            a.id === id ? { ...a, isUnlocked: true, unlockedAt: new Date().toISOString() } : a
          ),
          totalXP: state.totalXP + achievement.xpReward,
          level: Math.floor((state.totalXP + achievement.xpReward) / 1000) + 1
        };
      }),

      updateProgress: (id, progress) => set((state) => {
        const achievement = state.achievements.find(a => a.id === id);
        if (!achievement) return state;

        const newProgress = Math.min(progress, achievement.maxProgress || progress);
        const shouldUnlock = achievement.maxProgress ? newProgress >= achievement.maxProgress : newProgress > 0;

        if (shouldUnlock && !achievement.isUnlocked) {
          return {
            achievements: state.achievements.map(a => 
              a.id === id ? {
                ...a,
                progress: newProgress,
                isUnlocked: true,
                unlockedAt: new Date().toISOString()
              } : a
            ),
            totalXP: state.totalXP + achievement.xpReward,
            level: Math.floor((state.totalXP + achievement.xpReward) / 1000) + 1
          };
        }

        return {
          achievements: state.achievements.map(a => 
            a.id === id ? { ...a, progress: newProgress } : a
          )
        };
      }),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastActive = state.lastActive;

        if (!lastActive) {
          return { streak: 1, lastActive: today };
        }

        const lastActiveDate = new Date(lastActive);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActive === yesterday.toISOString().split('T')[0]) {
          return { streak: state.streak + 1, lastActive: today };
        } else if (lastActive !== today) {
          return { streak: 1, lastActive: today };
        }

        return state;
      })
    }),
    {
      name: 'achievement-storage'
    }
  )
);
