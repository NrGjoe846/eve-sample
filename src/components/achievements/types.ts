export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  xpReward: number;
  icon: string;
  progress: number;
  maxProgress?: number;
  isUnlocked: boolean;
  isHidden?: boolean;
  unlockedAt: string | null;
}

export interface AchievementCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}
