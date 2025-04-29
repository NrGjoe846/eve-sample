export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  feedback?: string;
  score?: number;
}

export interface InterviewSession {
  category: string;
  difficulty: string;
  score: number;
  duration: number;
  date: Date;
}

export interface InterviewSettings {
  difficulty: string;
  focusAreas: string[];
  duration: number;
}
