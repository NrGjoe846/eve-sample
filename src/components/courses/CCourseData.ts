export interface Topic {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  locked: boolean;
  subtopics?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  expanded?: boolean;
  icon: string;
}

export const coursePhases: Phase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: Introduction and Basic Concepts',
    description: 'Master the fundamentals of C programming language and build a strong foundation.',
    icon: '🎯',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'intro',
        title: '1. Introduction to C Programming',
        description: 'Understanding C programming fundamentals',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'what-is-c', title: 'What is C?', completed: false },
          { id: 'setup', title: 'Setting up the C Environment (GCC, Code::Blocks, VS Code)', completed: false },
          { id: 'write-run', title: 'Writing and Running a C Program', completed: false },
          { id: 'structure', title: 'Structure of a C Program', completed: false }
        ]
      },
      {
        id: 'data-types',
        title: '2. Basic Data Types and Variables',
        description: 'Learn about C data types and variable declarations',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'data-types', title: 'Data Types (int, float, char, double)', completed: false },
          { id: 'variables', title: 'Declaring and Initializing Variables', completed: false },
          { id: 'constants', title: 'Constants and #define', completed: false }
        ]
      },
      {
        id: 'operators',
        title: '3. Operators in C',
        description: 'Understanding operators in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'basic-operators', title: 'Arithmetic, Relational, Logical, Bitwise, and Assignment Operators', completed: false },
          { id: 'inc-dec', title: 'Increment (++), Decrement (--)', completed: false }
        ]
      },
      {
        id: 'io',
        title: '4. Basic Input and Output',
        description: 'Working with input and output in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'printf-scanf', title: 'printf() and scanf()', completed: false },
          { id: 'char-io', title: 'getchar(), putchar(), gets(), puts()', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Control Flow and Functions',
    description: 'Master control structures and function usage in C',
    icon: '⚡',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'conditional-statements',
        title: '1. Conditional Statements',
        description: 'Understanding control structures in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'if-else', title: 'if, if-else statements', completed: false },
          { id: 'nested-if', title: 'nested if-else statements', completed: false },
          { id: 'switch-case', title: 'switch-case statements', completed: false }
        ]
      },
      {
        id: 'loops',
        title: '2. Loops and Iterations',
        description: 'Working with loops in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'for-loop', title: 'for loop', completed: false },
          { id: 'while-loop', title: 'while loop', completed: false },
          { id: 'do-while', title: 'do-while loop', completed: false },
          { id: 'break-continue', title: 'break and continue statements', completed: false }
        ]
      },
      {
        id: 'functions',
        title: '3. Functions and Modular Programming',
        description: 'Understanding functions in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'function-basics', title: 'Function Declaration, Definition, and Calling', completed: false },
          { id: 'function-args', title: 'Function Arguments and Return Values', completed: false },
          { id: 'recursion', title: 'Recursion', completed: false }
        ]
      },
      {
        id: 'storage-classes',
        title: '4. Storage Classes in C',
        description: 'Understanding storage classes in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'auto', title: 'auto storage class', completed: false },
          { id: 'static', title: 'static storage class', completed: false },
          { id: 'extern', title: 'extern storage class', completed: false },
          { id: 'register', title: 'register storage class', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Arrays, Strings, and Pointers',
    description: 'Master arrays, strings, and pointer manipulation in C',
    icon: '📚',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'arrays',
        title: '1. Arrays',
        description: 'Working with arrays in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'one-dim', title: 'One-Dimensional and Two-Dimensional Arrays', completed: false },
          { id: 'multi-dim', title: 'Multi-Dimensional Arrays', completed: false }
        ]
      },
      {
        id: 'strings',
        title: '2. Strings in C',
        description: 'Understanding strings and string manipulation',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'string-funcs', title: 'String Functions (strlen(), strcpy(), strcat(), strcmp())', completed: false },
          { id: 'char-arrays', title: 'Character Arrays and String Manipulation', completed: false }
        ]
      },
      {
        id: 'pointers',
        title: '3. Pointers',
        description: 'Understanding pointers in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'pointer-basics', title: 'Pointer Basics (* and & Operators)', completed: false },
          { id: 'pointer-arithmetic', title: 'Pointer Arithmetic', completed: false },
          { id: 'pointers-arrays', title: 'Pointers and Arrays', completed: false }
        ]
      },
      {
        id: 'dynamic-memory',
        title: '4. Dynamic Memory Allocation',
        description: 'Managing memory dynamically in C',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'memory-funcs', title: 'malloc(), calloc(), realloc(), free()', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Memory Management',
    description: 'Learn dynamic memory allocation and management',
    icon: '💾',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
      "id": "structures-unions",
      "title": "1. Structures and Unions",
      "description": "Defining and using structures, arrays of structures, nested structures, typedef, and unions.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "defining-structures", "title": "Defining and Using Structures", "completed": false },
        { "id": "arrays-of-structures", "title": "Arrays of Structure", "completed": false },
        { "id": "nested-structures", "title": "Nested Structures", "completed": false },
        { "id": "typedef-unions", "title": "typedef and Unions", "completed": false }
      ]
    },
    {
      "id": "file-handling",
      "title": "2. File Handling in C",
      "description": "Working with file operations like open, read, write, and close.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "file-operations", "title": "File Operations: Open, Read, Write, Close", "completed": false },
        { "id": "file-functions", "title": "File Handling Functions (fopen(), fclose(), fscanf(), fprintf())", "completed": false }
      ]
    },
    {
      "id": "preprocessor-macros",
      "title": "3. Preprocessor Directives and Macros",
      "description": "Understanding #define, #include, #ifdef, and #ifndef.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "define-include", "title": "#define, #include", "completed": false },
        { "id": "ifdef-ifndef", "title": "#ifdef, #ifndef", "completed": false }
      ]
    }
  ]
  },
  {
    id: 'phase-5',
    title: 'Phase 5: Structures and Unions',
    description: 'Master user-defined data types in C',
    icon: '🔧',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
    {
      "id": "intro-data-structures",
      "title": "1. Introduction to Data Structures",
      "description": "Understanding Data Structures and Abstract Data Types (ADTs).",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "understanding-ds", "title": "Understanding Data Structures", "completed": false },
        { "id": "adt", "title": "Abstract Data Types (ADTs)", "completed": false }
      ]
    },
    {
      "id": "linked-lists",
      "title": "2. Linked Lists",
      "description": "Learn about different types of linked lists.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "singly-linked-list", "title": "Singly Linked List", "completed": false },
        { "id": "doubly-linked-list", "title": "Doubly Linked List", "completed": false },
        { "id": "circular-linked-list", "title": "Circular Linked List", "completed": false }
      ]
    },
    {
      "id": "stacks-queues",
      "title": "3. Stacks and Queues",
      "description": "Learn about stack and queue operations.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "stack-operations", "title": "Stack Operations (Push, Pop)", "completed": false },
        { "id": "queue-operations", "title": "Queue Operations (Enqueue, Dequeue)", "completed": false }
      ]
    },
    {
      "id": "sorting-algorithms",
      "title": "4. Sorting Algorithms",
      "description": "Understand different sorting techniques.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "bubble-sort", "title": "Bubble Sort", "completed": false },
        { "id": "selection-sort", "title": "Selection Sort", "completed": false },
        { "id": "insertion-sort", "title": "Insertion Sort", "completed": false },
        { "id": "merge-sort", "title": "Merge Sort", "completed": false },
        { "id": "quick-sort", "title": "Quick Sort", "completed": false }
      ]
    },
    {
      "id": "searching-algorithms",
      "title": "5. Searching Algorithms",
      "description": "Learn how to search efficiently in data structures.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "linear-search", "title": "Linear Search", "completed": false },
        { "id": "binary-search", "title": "Binary Search", "completed": false }
      ]
    }
  ]
  },
  {
    id: 'phase-6',
    title: 'Phase 6: File Handling',
    description: 'Learn file input/output operations in C',
    icon: '📁',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
      "id": "bitwise-operations",
      "title": "1. Bitwise Operations",
      "description": "Learn about bitwise manipulation in C.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "bitwise-and-or-xor", "title": "AND, OR, XOR, NOT", "completed": false },
        { "id": "bitwise-shifts", "title": "Left Shift, Right Shift", "completed": false }
      ]
    },
    {
      "id": "command-line-arguments",
      "title": "2. Command-Line Arguments",
      "description": "Understand how to work with command-line arguments in C.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "argc-argv", "title": "Understanding argc and argv[]", "completed": false }
      ]
    },
    {
      "id": "multi-file-programming",
      "title": "3. Multi-File Programming",
      "description": "Learn how to organize C programs into multiple files.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "modular-code", "title": "Writing Modular Code with Multiple Source Files", "completed": false },
        { "id": "extern-keyword", "title": "Using extern for Global Variables", "completed": false }
      ]
    },
    {
      "id": "debugging-techniques",
      "title": "4. Debugging Techniques",
      "description": "Explore debugging strategies to find and fix errors.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "using-gdb", "title": "Using gdb for Debugging", "completed": false },
        { "id": "segfault-memory-leaks", "title": "Understanding Segmentation Faults and Memory Leaks", "completed": false }
      ]
    }
  ]
  },
  {
    id: 'phase-7',
    title: 'Phase 7: Advanced Topics',
    description: 'Explore advanced C programming concepts',
    icon: '🚀',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
      "id": "optimizing-c-programs",
      "title": "1. Optimizing C Programs",
      "description": "Learn how to write efficient and optimized C code.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "performance-techniques", "title": "Performance Improvement Techniques", "completed": false },
        { "id": "avoiding-mistakes", "title": "Avoiding Common Mistakes", "completed": false }
      ]
    },
    {
      "id": "building-small-projects",
      "title": "2. Building Small C Projects",
      "description": "Work on hands-on projects to apply your knowledge.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "mini-calculator", "title": "Mini Calculator", "completed": false },
        { "id": "file-management-system", "title": "File Management System", "completed": false },
        { "id": "student-record-system", "title": "Student Record System", "completed": false }
      ]
    },
    {
      "id": "real-world-applications",
      "title": "3. Real-World Applications of C",
      "description": "Explore the practical applications of C programming.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "system-programming", "title": "System Programming", "completed": false },
        { "id": "embedded-systems", "title": "Embedded Systems", "completed": false },
        { "id": "game-development", "title": "Game Development", "completed": false }
      ]
    },
    {
      "id": "keeping-up-with-c",
      "title": "4. Keeping Up with C Programming",
      "description": "Learn about advanced C topics and open-source projects.",
      "completed": false,
      "locked": false,
      "subtopics": [
        { "id": "advanced-topics", "title": "Learning Advanced Topics (Multithreading, Networking in C)", "completed": false },
        { "id": "open-source", "title": "Understanding Open-Source C Projects", "completed": false }
      ]
    }
  ]
  }
];
export default coursePhases;
