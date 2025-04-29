import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCFongAOEQyrrsdLHXsRxc7eWHfDH3-i4w';

export interface AptitudeQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TopicScore {
  topic: string;
  score: number;
  totalQuestions: number;
  completedQuestions: string[];
}

class AptitudeService {
  private model;
  private useMocks = false;

  constructor() {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    } catch (error) {
      console.warn('Failed to initialize Gemini client, falling back to mock data:', error);
      this.useMocks = true;
    }
  }

  private cleanJsonString(str: string): string {
    try {
      // Remove markdown code blocks
      str = str.replace(/```json\n?|\n?```/g, '');
      
      // Find the first [ and last ]
      const start = str.indexOf('[');
      const end = str.lastIndexOf(']') + 1;
      
      if (start === -1 || end === 0) {
        throw new Error('Invalid JSON structure');
      }
      
      // Extract just the JSON array
      str = str.slice(start, end);
      
      // Remove trailing commas
      str = str.replace(/,(\s*[}\]])/g, '$1');
      
      // Remove any line breaks in strings
      str = str.replace(/(?<=\":)\s*\"[^"]*\"/g, match => 
        match.replace(/\n/g, ' ').replace(/\s+/g, ' ')
      );
      
      return str.trim();
    } catch (error) {
      console.error('Error cleaning JSON string:', error);
      return '[]';
    }
  }

  async generateQuestions(topic: string, count: number = 5): Promise<AptitudeQuestion[]> {
    if (this.useMocks) {
      return this.getFallbackQuestions(topic, count);
    }

    try {
      const prompt = `
        Generate ${count} multiple choice questions about ${topic}.
        Each question should be challenging but fair, with 4 options where only one is correct.
        
        Format the response as a JSON array of questions with the following structure:
        [
          {
            "id": "unique-string",
            "topic": "${topic}",
            "question": "clear and concise question",
            "options": ["option1", "option2", "option3", "option4"],
            "correctAnswer": 0,
            "explanation": "detailed explanation of the correct answer",
            "difficulty": "medium"
          }
        ]

        Requirements:
        1. Questions should be diverse and cover different aspects of ${topic}
        2. All options should be plausible but only one correct
        3. Explanations should be educational and clear
        4. Difficulty should be one of: "easy", "medium", "hard"
        5. correctAnswer should be the index (0-3) of the correct option
        
        Return only the JSON array, no additional text.
      `;

      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();
      
      if (!responseText) {
        console.error('Empty response from API');
        return this.getFallbackQuestions(topic, count);
      }

      const cleanedJson = this.cleanJsonString(responseText);
      
      try {
        const questions = JSON.parse(cleanedJson);
        if (!Array.isArray(questions) || questions.length === 0) {
          console.error('Invalid questions array:', questions);
          return this.getFallbackQuestions(topic, count);
        }

        const validatedQuestions = this.validateQuestions(questions);
        if (validatedQuestions.length === 0) {
          console.error('No valid questions after validation');
          return this.getFallbackQuestions(topic, count);
        }

        return validatedQuestions;
      } catch (parseError) {
        console.error('Error parsing questions:', parseError);
        return this.getFallbackQuestions(topic, count);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      return this.getFallbackQuestions(topic, count);
    }
  }

  private validateQuestions(questions: any[]): AptitudeQuestion[] {
    return questions.filter(q => {
      try {
        const isValid = (
          q.id && 
          typeof q.id === 'string' &&
          q.topic && 
          typeof q.topic === 'string' &&
          q.question && 
          typeof q.question === 'string' &&
          Array.isArray(q.options) && 
          q.options.length === 4 &&
          q.options.every(opt => typeof opt === 'string') &&
          typeof q.correctAnswer === 'number' &&
          q.correctAnswer >= 0 && 
          q.correctAnswer <= 3 &&
          q.explanation &&
          typeof q.explanation === 'string' &&
          q.difficulty &&
          ['easy', 'medium', 'hard'].includes(q.difficulty)
        );

        if (!isValid) {
          console.error('Invalid question format:', q);
        }

        return isValid;
      } catch (error) {
        console.error('Error validating question:', error);
        return false;
      }
    });
  }

  private getFallbackQuestions(topic: string, count: number): AptitudeQuestion[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `fallback-${i + 1}`,
      topic,
      question: `Sample question ${i + 1} about ${topic}`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 0,
      explanation: `This is a sample explanation for question ${i + 1} about ${topic}.`,
      difficulty: 'medium' as const
    }));
  }
}

export const aptitudeService = new AptitudeService();
