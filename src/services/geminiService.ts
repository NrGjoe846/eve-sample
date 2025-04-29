import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCFongAOEQyrrsdLHXsRxc7eWHfDH3-i4w';

const DIFFICULTY_WEIGHTS = {
  beginner: { complexity: 1, hints: 5 },
  intermediate: { complexity: 2, hints: 4 },
  advanced: { complexity: 3, hints: 3 }
} as const;

const mockChallenges: Challenge[] = [
  {
    id: 'mock-1',
    title: 'Sum of Two Numbers',
    description: 'Write a function that takes two numbers as input and returns their sum.',
    difficulty: 'beginner',
    sampleInput: 'a = 5, b = 3',
    sampleOutput: '8',
    testCases: [
      { input: '2, 3', output: '5' },
      { input: '-1, 1', output: '0' }
    ],
    hints: [
      'Use the + operator to add numbers',
      'Remember to return the result',
      'Consider edge cases like negative numbers'
    ],
    bestSolution: 'def add_numbers(a, b):\n    return a + b',
    concepts: ['Basic arithmetic', 'Function parameters', 'Return values']
  }
];

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sampleInput: string;
  sampleOutput: string;
  testCases: Array<{ input: string; output: string }>;
  hints: string[];
  bestSolution: string;
  concepts: string[];
}

export interface CodeValidationResult {
  isCorrect: boolean;
  feedback: string;
  efficiency: string;
  readability: string;
  suggestions: string[];
  performanceScore?: number;
  codeQualityScore?: number;
  executionTime?: string;
  memoryUsage?: string;
  testCasesPassed?: number;
  totalTestCases?: number;
  detailedResults?: Array<{
    testCase: string;
    expected: string;
    actual: string;
    passed: boolean;
  }>;
}

export class GeminiService {
  private model: any;
  private useMocks: boolean;
  private hintCache: Map<string, string[]>;

  constructor() {
    this.useMocks = false;
    this.hintCache = new Map();
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    } catch (error) {
      console.warn('Falling back to mock data:', error);
      this.useMocks = true;
    }
  }

  private cleanJsonString(str: string): string {
    return str
      .replace(/```json\n?|\n?```/g, '')
      .replace(/,(\s*[}\]])/g, '$1')
      .replace(/[\n\r]+/g, ' ')
      .trim();
  }

  private async retryOperation<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw lastError!;
  }

  async generateDailyChallenge(userLevel: string): Promise<Challenge> {
    if (this.useMocks) {
      return { ...mockChallenges[Math.floor(Math.random() * mockChallenges.length)] };
    }

    const prompt = `
      Generate a coding challenge for a ${userLevel} level programmer.
      Return valid JSON with:
      {
        "title": "short title",
        "description": "clear description under 100 words",
        "difficulty": "${userLevel}",
        "sampleInput": "example input",
        "sampleOutput": "expected output",
        "testCases": [{"input": "test1", "output": "out1"}, {"input": "test2", "output": "out2"}],
        "hints": ["hint1", "hint2", "hint3"],
        "bestSolution": "code solution",
        "concepts": ["concept1", "concept2"]
      }
    `;

    return this.retryOperation(async () => {
      const result = await this.model.generateContent(prompt);
      const responseText = this.cleanJsonString(await result.response.text());
      
      try {
        const parsed = JSON.parse(responseText) as Challenge;
        return {
          id: Date.now().toString(),
          ...parsed,
          difficulty: userLevel as 'beginner' | 'intermediate' | 'advanced',
          testCases: parsed.testCases || [],
          hints: parsed.hints || [],
          concepts: parsed.concepts || []
        };
      } catch (parseError) {
        console.error('Parse error:', parseError, 'Raw response:', responseText);
        return { ...mockChallenges[0], id: Date.now().toString() };
      }
    });
  }

  private async validateTestCases(code: string, testCases: Array<{ input: string; output: string }>, language: string): Promise<boolean> {
    if (this.useMocks) return code.includes('return');

    const prompt = `
      Validate this ${language} code against test cases:
      Code: ${code}
      Test Cases: ${JSON.stringify(testCases)}
      Return "true" or "false"
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = (await result.response.text()).toLowerCase().trim();
      return response === 'true';
    } catch (error) {
      console.error('Test case validation error:', error);
      return false;
    }
  }

  async validateSolution(challenge: Challenge, userCode: string, language: string): Promise<CodeValidationResult> {
    if (this.useMocks) {
      return {
        isCorrect: userCode.includes('return') && userCode.includes('+'),
        feedback: 'Good attempt!',
        efficiency: 'O(1)',
        readability: 'Good',
        suggestions: ['Consider adding comments'],
        performanceScore: 85,
        codeQualityScore: 80
      };
    }

    return this.retryOperation(async () => {
      const testCasesPassed = await this.validateTestCases(userCode, challenge.testCases, language);
      const prompt = `
        Evaluate this ${language} solution:
        Problem: ${challenge.description}
        User's Code: ${userCode}
        Test Cases: ${JSON.stringify(challenge.testCases)}
        Test Cases Passed: ${testCasesPassed}
        
        Return JSON with:
        {
          "isCorrect": boolean,
          "feedback": "string",
          "efficiency": "string",
          "readability": "string",
          "suggestions": string[],
          "executionTime": "string",
          "memoryUsage": "string",
          "testCasesPassed": number,
          "totalTestCases": number,
          "detailedResults": [{"testCase": "string", "expected": "string", "actual": "string", "passed": boolean}]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const responseText = this.cleanJsonString(await result.response.text());
      
      try {
        const validation = JSON.parse(responseText) as CodeValidationResult;
        return {
          isCorrect: testCasesPassed,
          feedback: validation.feedback || 'No feedback provided',
          efficiency: validation.efficiency || 'N/A',
          readability: validation.readability || 'N/A',
          suggestions: validation.suggestions || [],
          executionTime: validation.executionTime || 'N/A',
          memoryUsage: validation.memoryUsage || 'N/A',
          testCasesPassed: testCasesPassed ? challenge.testCases.length : 0,
          totalTestCases: challenge.testCases.length,
          detailedResults: validation.detailedResults || [],
          performanceScore: this.calculatePerformanceScore(validation),
          codeQualityScore: this.calculateCodeQualityScore(validation)
        };
      } catch (error) {
        console.error('Validation parse error:', error, 'Raw response:', responseText);
        return this.getFallbackValidation();
      }
    });
  }

  private calculatePerformanceScore(validation: CodeValidationResult): number {
    const testCaseScore = (validation.testCasesPassed || 0) / (validation.totalTestCases || 1) * 100;
    const efficiencyScore = this.getEfficiencyScore(validation.efficiency || 'N/A');
    return Math.round((testCaseScore + efficiencyScore) / 2);
  }

  private calculateCodeQualityScore(validation: CodeValidationResult): number {
    const readabilityScore = this.getReadabilityScore(validation.readability || 'N/A');
    const bestPracticesScore = validation.suggestions?.length > 0 ? 100 - (validation.suggestions.length * 10) : 100;
    return Math.round((readabilityScore + bestPracticesScore) / 2);
  }

  private getEfficiencyScore(efficiency: string): number {
    const eff = efficiency.toLowerCase();
    if (eff.includes('o(1)')) return 100;
    if (eff.includes('o(log n)')) return 90;
    if (eff.includes('o(n)')) return 80;
    if (eff.includes('o(n log n)')) return 70;
    if (eff.includes('o(n^2)')) return 60;
    return 50;
  }

  private getReadabilityScore(readability: string): number {
    const read = readability.toLowerCase();
    if (read.includes('excellent')) return 100;
    if (read.includes('good')) return 80;
    if (read.includes('fair')) return 60;
    if (read.includes('poor')) return 40;
    return 50;
  }

  async getInfiniteHints(challenge: Challenge, userCode: string, previousHints: string[]): Promise<string> {
    if (this.useMocks) {
      const hint = this.getFallbackHint(previousHints.length);
      this.hintCache.set(challenge.id, [...(this.hintCache.get(challenge.id) || []), hint]);
      return hint;
    }

    return this.retryOperation(async () => {
      const difficultyWeight = DIFFICULTY_WEIGHTS[challenge.difficulty];
      const hintLevel = previousHints.length + 1;
      const revealLevel = (hintLevel / difficultyWeight.hints) * 100;

      const prompt = `
        Generate hint #${hintLevel} for:
        Problem: ${challenge.description}
        Current Code: ${userCode}
        Previous Hints: ${JSON.stringify(previousHints)}
        Reveal Level: ${revealLevel}%
        
        Return a single string hint.
      `;

      const result = await this.model.generateContent(prompt);
      const hint = (await result.response.text()).trim();
      this.hintCache.set(challenge.id, [...(this.hintCache.get(challenge.id) || []), hint]);
      return hint;
    }).catch(error => {
      console.error('Hint generation error:', error);
      return this.getFallbackHint(previousHints.length);
    });
  }

  private getFallbackValidation(): CodeValidationResult {
    return {
      isCorrect: false,
      feedback: 'Unable to validate solution',
      efficiency: 'N/A',
      readability: 'N/A',
      suggestions: ['Check your code syntax'],
      performanceScore: 0,
      codeQualityScore: 0,
      executionTime: 'N/A',
      memoryUsage: 'N/A'
    };
  }

  private getFallbackHint(hintLevel: number): string {
    const fallbackHints = [
      "Break down the problem into smaller steps",
      "Consider edge cases",
      "Optimize your approach",
      "Look for patterns",
      "Check time complexity"
    ];
    return fallbackHints[hintLevel % fallbackHints.length];
  }
}

export const geminiService = new GeminiService();
