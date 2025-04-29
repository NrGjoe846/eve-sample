import React from 'react';

export interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  answer: number | string;
  explanation: string;
  code?: string;
}

export interface FlashCard {
  front: string;
  back: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: (number | string | null)[];
  isComplete: boolean;
}

export interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

export type QuizAction =
  | { type: 'ANSWER_QUESTION'; payload: { questionIndex: number; answer: number | string } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };
