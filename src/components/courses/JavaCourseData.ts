
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
    title: 'Phase 1: Java Basics and Core Concepts',
    description: 'Master the fundamentals of Java programming language and build a strong foundation.',
    icon: '☕',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'intro',
        title: '1. Introduction to Java Programming',
        description: 'Get started with Java programming language basics',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'jdk-setup', title: 'Installing Java (JDK, JRE)', completed: false },
          { id: 'ide-setup', title: 'Setting up the IDE (IntelliJ IDEA, Eclipse, or VS Code)', completed: false },
          { id: 'first-program', title: 'Writing your first Java program: Hello, World!', completed: false },
          { id: 'syntax', title: 'Java syntax, keywords, and comments', completed: false },
          { id: 'jvm', title: 'Understanding the Java Virtual Machine (JVM)', completed: false }
        ]
      },
      {
        id: 'data-types',
        title: '2. Basic Data Types and Variables',
        description: 'Learn about Java data types and variable declarations',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'primitive-types', title: 'Primitive data types: int, double, char, boolean', completed: false },
          { id: 'variables', title: 'Variables and constants (final keyword)', completed: false },
          { id: 'type-casting', title: 'Type casting: implicit and explicit', completed: false },
          { id: 'naming', title: 'Variable naming conventions', completed: false }
        ]
      },
   {
        id: 'operators',
        title: '3. Operators and Expressions',
        description: 'Master Java operators and expressions',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'arithmetic', title: 'Arithmetic operators: +, -, *, /, %', completed: false },
          { id: 'comparison', title: 'Comparison operators: ==, !=, >, <, >=, <=', completed: false },
          { id: 'logical', title: 'Logical operators: &&, ||, !', completed: false },
          { id: 'assignment', title: 'Assignment operators: =, +=, -=, *=, /=', completed: false },
          { id: 'ternary', title: 'Ternary operator: ? :', completed: false }
        ]
      },
      {
        id: 'control-flow',
        title: '4. Control Flow: Conditionals and Loops',
        description: 'Understanding control structures in Java',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'conditionals', title: 'Conditionals: if, else if, else', completed: false },
          { id: 'switch', title: 'Switch-case statements', completed: false },
          { id: 'for-loops', title: 'for loops', completed: false },
          { id: 'while-loops', title: 'while and do-while loops', completed: false },
          { id: 'loop-control', title: 'Loop control statements: break, continue', completed: false }
        ]
      },
      {
        id: 'methods',
        title: '5. Functions (Methods)',
        description: 'Working with methods in Java',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'method-basics', title: 'Defining methods using public, private, static', completed: false },
          { id: 'parameters', title: 'Method parameters and return values', completed: false },
          { id: 'overloading', title: 'Method overloading', completed: false },
          { id: 'recursion', title: 'Recursion (optional for beginners)', completed: false }
        ]
      },
      {
        id: 'io',
        title: '6. Basic Input and Output',
        description: 'Working with input and output operations in Java',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'scanner', title: 'User input using Scanner class', completed: false },
          { id: 'output', title: 'Output using System.out.println()', completed: false },
          { id: 'formatting', title: 'Formatting output with printf()', completed: false }
        ]
      }
  ]
      },
  {
    id: 'phase-2',
    title: 'Phase 2: Object-Oriented Programming',
    description: 'Master object-oriented programming concepts in Java',
    icon: '🎯',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'intro-oop',
        title: '7. Introduction to OOP',
        description: 'Understanding fundamental OOP concepts',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'classes-objects', title: 'Classes and objects', completed: false },
          { id: 'instance-vars', title: 'Instance variables and methods', completed: false },
          { id: 'constructors', title: 'Constructors: default and parameterized', completed: false },
          { id: 'this-keyword', title: 'this keyword', completed: false }
        ]
      },
      {
        id: 'encapsulation',
        title: '8. Encapsulation and Access Modifiers',
        description: 'Understanding encapsulation and access control',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'access-modifiers', title: 'Private vs public access modifiers', completed: false },
          { id: 'getters-setters', title: 'Getters and setters', completed: false },
          { id: 'encapsulation-principles', title: 'Encapsulation principles', completed: false }
        ]
      },
      {
        id: 'inheritance',
        title: '9. Inheritance',
        description: 'Understanding inheritance and class extensions',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'extends', title: 'Extending classes using extends', completed: false },
          { id: 'method-overriding', title: 'Method overriding', completed: false },
          { id: 'super-keyword', title: 'super keyword', completed: false },
          { id: 'inheritance-types', title: 'Types of inheritance: single, multilevel, hierarchical', completed: false }
        ]
      },
      {
        id: 'polymorphism',
        title: '10. Polymorphism',
        description: 'Understanding polymorphism in Java',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'method-overloading', title: 'Method overloading (compile-time polymorphism)', completed: false },
          { id: 'method-overriding-runtime', title: 'Method overriding (runtime polymorphism)', completed: false },
          { id: 'dynamic-dispatch', title: 'Dynamic method dispatch', completed: false }
        ]
      },
      {
        id: 'abstraction',
        title: '11. Abstraction and Interfaces',
        description: 'Understanding abstraction and interfaces',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'abstract-classes', title: 'Abstract classes and methods', completed: false },
          { id: 'interfaces', title: 'Interfaces and their implementation', completed: false },
          { id: 'multiple-inheritance', title: 'Multiple inheritance using interfaces', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Data Structures and Collections',
    description: 'Master Java data structures and collections framework',
    icon: '📚',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'arrays',
        title: '12. Arrays',
        description: 'Working with arrays in Java',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'array-basics', title: 'Single-dimensional and multi-dimensional arrays', completed: false },
          { id: 'array-manipulation', title: 'Array manipulation: sorting, searching', completed: false },
          { id: 'enhanced-for', title: 'Enhanced for loop', completed: false }
        ]
      },
      {
        id: 'collections',
        title: '13. Collections Framework',
        description: 'Understanding Java Collections Framework',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'lists', title: 'Lists: ArrayList, LinkedList', completed: false },
          { id: 'sets', title: 'Sets: HashSet, TreeSet', completed: false },
          { id: 'maps', title: 'Maps: HashMap, TreeMap', completed: false },
          { id: 'iterators', title: 'Iterators and for-each loop', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Exception Handling and File I/O',
    description: 'Master error handling and file operations in Java',
    icon: '🔧',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'exceptions',
        title: '14. Exception Handling',
        description: 'Understanding Java exception handling',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'try-catch', title: 'Try-catch blocks', completed: false },
          { id: 'multiple-catch', title: 'Multiple catch blocks', completed: false },
          { id: 'finally', title: 'Finally block', completed: false },
          { id: 'custom-exceptions', title: 'Custom exceptions', completed: false }
        ]
      },
          {
        id: 'file-io',
        title: '15. File Handling',
        description: 'Working with files in Java',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'file-rw', title: 'Reading from and writing to files using FileReader, FileWriter', completed: false },
          { id: 'buffered-rw', title: 'Using BufferedReader and BufferedWriter', completed: false },
          { id: 'file-exceptions', title: 'Handling file exceptions', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    title: 'Phase 5: Advanced Java Concepts',
    description: 'Master advanced Java concepts including multithreading and generics',
    icon: '🚀',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'multithreading',
        title: '16. Multithreading',
        description: 'Learn Java multithreading and concurrency',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'thread-creation', title: 'Creating threads using Thread class and Runnable interface', completed: false },
          { id: 'thread-sync', title: 'Thread synchronization', completed: false },
          { id: 'thread-lifecycle', title: 'Thread lifecycle', completed: false }
        ]
      },
      {
        id: 'generics',
        title: '17. Generics',
        description: 'Understanding Java generics and type parameters',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'generic-classes', title: 'Generic classes and methods', completed: false },
          { id: 'type-params', title: 'Type parameters', completed: false },
          { id: 'bounded-types', title: 'Bounded types', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    title: 'Phase 6: Working with Libraries and APIs',
    description: 'Learn to work with Java libraries and interact with APIs',
    icon: '📚',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'standard-library',
        title: '18. Java Standard Library',
        description: 'Working with Java standard libraries',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'java-util', title: 'Working with java.util, java.io, java.math', completed: false },
          { id: 'string-builders', title: 'Using StringBuilder and StringBuffer', completed: false },
          { id: 'date-time', title: 'Date and time API (java.time)', completed: false }
        ]
      },
      {
        id: 'apis',
        title: '19. Working with APIs',
        description: 'Learn to interact with external APIs',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'http-requests', title: 'Sending HTTP requests using HttpURLConnection', completed: false },
          { id: 'json-parsing', title: 'Parsing JSON data using libraries like Gson or Jackson', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    title: 'Phase 7: Project Development and Continuous Learning',
    description: 'Apply your knowledge through projects and explore advanced topics',
    icon: '🏗️',
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: 'version-control',
        title: '20. Version Control with Git',
        description: 'Learn Git basics and GitHub workflow',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'git-basics', title: 'Basic Git commands: git init, add, commit, push', completed: false },
          { id: 'branching', title: 'Branching and merging', completed: false },
          { id: 'github', title: 'Working with GitHub', completed: false }
        ]
      },
      {
        id: 'projects',
        title: '21. Building Projects',
        description: 'Build real-world Java applications',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'banking-system', title: 'Project 1: Simple Banking System', completed: false },
          { id: 'student-management', title: 'Project 2: Student Management System', completed: false },
          { id: 'quiz-app', title: 'Project 3: Online Quiz Application', completed: false }
        ]
      },
      {
        id: 'advanced-topics',
        title: '22. Exploring Advanced Topics',
        description: 'Explore advanced Java frameworks and testing',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'javafx', title: 'JavaFX for GUI development', completed: false },
          { id: 'spring-boot', title: 'Spring Boot for web development', completed: false },
          { id: 'unit-testing', title: 'Unit Testing with JUnit', completed: false }
        ]
      }
    ]
  }
];
 export default coursePhases;    
