export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  code: string;
  testCases: TestCase[];
  hints: string[];
  xpReward: number;
  streakBonus: number;
  completedBy: string[];
  createdAt: Date;
  expiresAt: Date;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface UserProgress {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  completedChallenges: string[];
  badges: Badge[];
  lastCompletedDate: Date | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  totalXP: number;
  currentStreak: number;
  rank: number;
}
