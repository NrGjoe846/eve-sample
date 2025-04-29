import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCFongAOEQyrrsdLHXsRxc7eWHfDH3-i4w';

export class InterviewService {
  private model;
  private useMocks: boolean;

  constructor() {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      this.useMocks = false;
    } catch (error) {
      console.warn('Failed to initialize Gemini client, falling back to mock data:', error);
      this.useMocks = true;
    }
  }

  private cleanJsonString(str: string): string {
    try {
      // Remove markdown code blocks
      str = str.replace(/```json\n?|\n?```/g, '');
      
      // Find the first { and last }
      const start = str.indexOf('{');
      const end = str.lastIndexOf('}') + 1;
      
      if (start === -1 || end === 0) {
        throw new Error('Invalid JSON structure');
      }
      
      // Extract just the JSON object
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
      return '{}';
    }
  }

  async generateQuestion(category: string, difficulty: string, previousQuestions: string[] = []): Promise<string> {
    if (this.useMocks) {
      return this.getFallbackQuestion(category, difficulty);
    }

    try {
      const prompt = `
        Generate an interview question for the ${category} category at ${difficulty} level.
        The question should:
        1. Be specific and technical
        2. Test deep understanding
        3. Be different from these previous questions: ${previousQuestions.join(', ')}
        4. Be suitable for a technical interview
        
        Return only the question text, no additional formatting.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response.trim();
    } catch (error) {
      console.error('Error generating question:', error);
      return this.getFallbackQuestion(category, difficulty);
    }
  }

  async analyzeResponse(response: string, question: string, category: string): Promise<{
    score: number;
    feedback: string;
    suggestions: string[];
    detailedAnalysis: string;
  }> {
    if (this.useMocks) {
      return {
        score: 75,
        feedback: "Good attempt! Here's some feedback to improve.",
        suggestions: ["Be more specific", "Include examples"],
        detailedAnalysis: "Your answer shows understanding but could use more detail."
      };
    }

    try {
      const prompt = `
        Analyze this interview response for a ${category} position:
        Question: ${question}
        Response: ${response}

        Provide analysis in JSON format with this exact structure:
        {
          "score": <number between 0-100>,
          "feedback": "<brief overall feedback>",
          "suggestions": ["<improvement suggestion 1>", "<improvement suggestion 2>"],
          "detailedAnalysis": "<detailed breakdown of strengths and weaknesses>"
        }

        IMPORTANT:
        - Response must be valid JSON
        - No additional text or formatting
        - Keep all text concise and professional
      `;

      const result = await this.model.generateContent(prompt);
      const responseText = await result.response.text();
      const cleanedJson = this.cleanJsonString(responseText);

      try {
        const analysis = JSON.parse(cleanedJson);
        
        // Validate and sanitize the response
        return {
          score: Math.min(100, Math.max(0, Number(analysis.score) || 0)),
          feedback: String(analysis.feedback || ''),
          suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions.map(String) : [],
          detailedAnalysis: String(analysis.detailedAnalysis || '')
        };
      } catch (parseError) {
        console.error('Error parsing analysis response:', parseError);
        throw new Error('Invalid response format from AI');
      }
    } catch (error) {
      console.error('Error analyzing response:', error);
      return {
        score: 50,
        feedback: "Unable to analyze response. Please try again.",
        suggestions: ["Provide more detailed answers", "Include specific examples"],
        detailedAnalysis: "Analysis unavailable"
      };
    }
  }

  async generateFollowUpQuestion(category: string, difficulty: string, context: {
    previousQuestion: string;
    response: string;
  }): Promise<string> {
    if (this.useMocks) {
      return "Could you elaborate more on your previous answer?";
    }

    try {
      const prompt = `
        Generate a follow-up interview question based on this context:
        Category: ${category}
        Difficulty: ${difficulty}
        Previous Question: ${context.previousQuestion}
        Candidate's Response: ${context.response}

        The follow-up should:
        1. Build on the previous response
        2. Probe deeper into the topic
        3. Test understanding of related concepts
        4. Be at the same difficulty level

        Return only the follow-up question text, no additional formatting.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      return response.trim();
    } catch (error) {
      console.error('Error generating follow-up:', error);
      return "Could you elaborate more on your previous answer?";
    }
  }

  private getFallbackQuestion(category: string, difficulty: string): string {
    const fallbackQuestions = {
      'data-science': {
        beginner: 'What is the difference between mean and median?',
        intermediate: 'Explain the concept of cross-validation.',
        advanced: 'Describe the mathematics behind gradient descent.'
      },
      'machine-learning': {
        beginner: 'What is supervised learning?',
        intermediate: 'Explain how decision trees work.',
        advanced: 'Describe the architecture of a transformer model.'
      },
      'python': {
        beginner: 'What are Python lists and tuples?',
        intermediate: 'Explain Python decorators.',
        advanced: 'How does the Python GIL work?'
      },
      'sql': {
        beginner: 'What is a PRIMARY KEY?',
        intermediate: 'Explain the different types of JOINs.',
        advanced: 'How would you optimize a slow-performing query?'
      }
    };

    return fallbackQuestions[category]?.[difficulty] || 
           'Tell me about your experience with this technology.';
  }
}

export const interviewService = new InterviewService();
