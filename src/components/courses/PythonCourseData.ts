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

export const coursePhases: Phase[] =[
  {
    id: "phase-1",
    title: "Phase 1: Python Basics and Core Concepts",
    description: "This phase is focused on understanding Python syntax, basic operations, and foundational topics. It sets up the building blocks for becoming proficient in Python.",
    icon: "🐍",
     backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "intro",
        title: "1. Introduction to Python Programming",
        description: "Get started with Python programming language basics",
        completed: false,
        locked: false,
        subtopics: [
          { id: "installing-python", title: "Installing Python (Anaconda, PyCharm, or basic Python)", completed: false },
          { id: "ide-setup", title: "Setting up the IDE", completed: false },
          { id: "first-program", title: "Writing your first Python program: print(\"Hello, World!\")", completed: false },
          { id: "syntax", title: "Python syntax, keywords, and comments", completed: false },
          { id: "interpreter", title: "Python's interpreter vs. compiled languages", completed: false }
        ]
      },
      {
        id: "data-types",
        title: "2. Basic Data Types and Variables",
        description: "Learn about Python data types and variable declarations",
        completed: false,
        locked: false,
        subtopics: [
          { id: "numbers", title: "Numbers (integers, floats, complex)", completed: false },
          { id: "strings", title: "Strings", completed: false },
          { id: "booleans", title: "Booleans", completed: false },
          { id: "type-conversion", title: "Type conversion (int to float, string to int, etc.)", completed: false },
          { id: "naming-conventions", title: "Variable naming conventions and dynamic typing", completed: false }
        ]
      },
      {
        id: "operators",
        title: "3. Operators and Expressions",
        description: "Master Python operators and expressions",
        completed: false,
        locked: false,
        subtopics: [
          { id: "arithmetic", title: "Arithmetic operators: +, -, *, /, //, %, *", completed: false },
          { id: "comparison", title: "Comparison operators: ==, !=, >, <, >=, <=", completed: false },
          { id: "logical", title: "Logical operators: and, or, not", completed: false },
          { id: "assignment", title: "Assignment operators: =, +=", completed: false },
          { id: "bitwise", title: "Bitwise operators (optional for beginners)", completed: false }
        ]
      },
      {
        id: "control-flow",
        title: "4. Control Flow: Conditionals and Loops",
        description: "Understanding control structures in Python",
        completed: false,
        locked: false,
        subtopics: [
          { id: "conditionals", title: "Conditionals: if, elif, else", completed: false },
          { id: "for-loops", title: "for loops (with range and iterables)", completed: false },
          { id: "while-loops", title: "while loops", completed: false },
          { id: "loop-control", title: "Loop control statements: break, continue, pass", completed: false },
          { id: "nested-loops", title: "Nested loops and conditionals", completed: false }
        ]
      },
      {
        id: "functions",
        title: "5. Functions and Modular Code",
        description: "Working with functions in Python",
        completed: false,
        locked: false,
        subtopics: [
          { id: "defining-functions", title: "Defining functions using def", completed: false },
          { id: "parameters", title: "Function parameters and return values", completed: false },
          { id: "scope", title: "Function scope: local vs global variables", completed: false },
          { id: "default-params", title: "Default parameters and keyword arguments", completed: false },
          { id: "lambda-functions", title: "Lambda functions (anonymous functions)", completed: false },
          { id: "recursion", title: "Understanding recursion (optional for beginners)", completed: false }
        ]
      },
      {
        id: "io",
        title: "6. Basic Input and Output",
        description: "Working with input and output operations in Python",
        completed: false,
        locked: false,
        subtopics: [
          { id: "user-input", title: "User input using input()", completed: false },
          { id: "output-formatting", title: "Output formatting using print()", completed: false },
          { id: "string-interpolation", title: "String interpolation (f-strings, % formatting, .format())", completed: false }
        ]
      }
    ]
  },
  {
    id: "phase-2",
    title: "Phase 2: Data Structures and Collections",
    description: "In this phase, you'll learn how to store and manipulate collections of data, which is essential for almost every programming task.",
    icon: "📦",
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "lists",
        title: "7. Lists",
        description: "Learn how to create and manipulate lists in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "creating-modifying-lists", title: "Creating and modifying lists", completed: false },
          { id: "dictionary-creation", title: "Creating dictionaries", completed: false },
          { id: "access-modify-delete", title: "Accessing, modifying, and deleting key-value pairs", completed: false },
          { id: "dictionary-methods", title: "Dictionary methods: keys(), values(), items()", completed: false },
          { id: "dictionary-comprehensions", title: "Dictionary comprehensions", completed: false }
        ]
      },
      {
        id: "tuples",
        title: "8. Tuples",
        description: "Understand tuples and their properties.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "creating-tuples", title: "Creating tuples and understanding immutability", completed: false },
          { id: "packing-unpacking", title: "Tuple packing and unpacking", completed: false },
          { id: "tuples-as-keys", title: "Using tuples as dictionary keys", completed: false }
        ]
      },
      {
        id: "dictionaries",
        title: "9. Dictionaries",
        description: "Learn how to work with dictionaries in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "creating-dictionaries", title: "Creating dictionaries", completed: false },
          { id: "access-modify-delete-dict", title: "Accessing, modifying, and deleting key-value pairs", completed: false },
          { id: "dict-methods", title: "Dictionary methods: keys(), values(), items()", completed: false },
          { id: "dict-comprehensions", title: "Dictionary comprehensions", completed: false }
        ]
      },
      {
        id: "sets",
        title: "10. Sets",
        description: "Learn about sets and their operations.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "creating-using-sets", title: "Creating and using sets", completed: false },
          { id: "set-operations", title: "Set operations: union, intersection, difference, symmetric difference", completed: false },
          { id: "set-methods", title: "Set methods: add(), remove(), discard()", completed: false }
        ]
      },
      {
        id: "string-manipulation",
        title: "11. String Manipulation",
        description: "Explore string manipulation techniques in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "string-slicing-indexing", title: "String slicing and indexing", completed: false },
          { id: "string-methods", title: "String methods: split(), join(), replace(), strip(), etc.", completed: false },
          { id: "string-formatting", title: "String formatting with f-strings and .format()", completed: false },
          { id: "multi-line-strings", title: "Working with multi-line strings", completed: false }
        ]
      }
    ]
  },
  {
    id: "phase-3",
    title: "Phase 3: Intermediate Topics",
    description: "In this phase, you'll explore deeper into Python features that are crucial for writing cleaner, more efficient, and more reliable code.",
    icon: "🔍",
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "file-handling",
        title: "12. File Handling",
        description: "Learn how to read from and write to files in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "reading-writing", title: "Reading from and writing to text files", completed: false },
          { id: "file-modes", title: "File modes: r, w, a, x", completed: false },
          { id: "context-managers", title: "Context managers with with open() for safe file handling", completed: false },
          { id: "csv-handling", title: "Handling CSV files (optional)", completed: false }
        ]
      },
      {
        id: "error-exception-handling",
        title: "13. Error and Exception Handling",
        description: "Understand how to handle errors and exceptions in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "try-except", title: "Try-except blocks for catching exceptions", completed: false },
          { id: "raising-exceptions", title: "Raising exceptions with raise", completed: false },
          { id: "finally", title: "Using finally for clean-up actions", completed: false },
          { id: "custom-exceptions", title: "Custom exceptions (optional)", completed: false }
        ]
      },
      {
        id: "oop-basics",
        title: "14. Object-Oriented Programming (OOP) Basics",
        description: "Learn the fundamentals of OOP in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "defining-classes", title: "Defining and using classes", completed: false },
          { id: "creating-objects", title: "Creating objects (instances)", completed: false },
          { id: "instance-variables", title: "Instance variables and methods", completed: false },
          { id: "constructor", title: "Constructor: __init__()", completed: false },
          { id: "class-variables", title: "Class variables and methods", completed: false },
          { id: "inheritance", title: "Inheritance and method overriding", completed: false },
          { id: "self-super", title: "Understanding self and super()", completed: false },
          { id: "encapsulation", title: "Encapsulation and private members (using _ and __)", completed: false }
        ]
      },
      {
        id: "modules-packages",
        title: "15. Modules and Packages",
        description: "Learn how to work with modules and packages in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "importing-modules", title: "Importing standard Python modules: math, os, random, etc.", completed: false },
          { id: "custom-modules", title: "Writing and importing custom modules", completed: false },
          { id: "using-packages", title: "Using packages: understanding the __init__.py file", completed: false },
          { id: "installing-packages", title: "Installing external packages using pip", completed: false }
        ]
      },
      {
        id: "working-with-libraries",
        title: "16. Working with Libraries",
        description: "Explore essential libraries in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "math-library", title: "Math Library: Basic mathematical functions like sqrt(), pow(), sin()", completed: false },
          { id: "random-library", title: "Random Library: Generating random numbers, selecting random elements", completed: false },
          { id: "os-library", title: "OS Library: Working with file systems, directories, and environment variables", completed: false }
        ]
      }
    ]
  },
  {
    id: "phase-4",
    title: "Phase 4: Working with Data and Basic Algorithms",
    description: "Once you have a good grasp of Python’s core syntax, it’s important to learn how to work with data and create algorithms.",
    icon: "📊",
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "data-structures",
        title: "17. Data Structures: Stacks, Queues, and Linked Lists (optional but useful)",
        description: "Learn about essential data structures and their implementations.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "stacks", title: "Implementing stacks using lists", completed: false },
          { id: "queues", title: "Implementing queues with deque from the collections module", completed: false },
          { id: "linked-lists", title: "Simple linked lists (for understanding)", completed: false }
        ]
      },
      {
        id: "sorting-searching",
        title: "18. Sorting and Searching Algorithms (optional for beginners)",
        description: "Understand and implement basic sorting and searching algorithms.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "sorting-algorithms", title: "Understanding basic sorting algorithms: Bubble sort, Insertion sort, Merge sort", completed: false },
          { id: "searching-algorithms", title: "Searching algorithms: Linear search, Binary search", completed: false },
          { id: "built-in-functions", title: "Built-in functions: sorted(), min(), max(), sum()", completed: false }
        ]
      }
    ]
  },
  {
    id: "phase-5",
    title: "Phase 5: Advanced Beginner Topics",
    description: "These topics bridge the gap between beginner and intermediate levels, giving you practical skills in real-world programming.",
    icon: "🚀",
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "regular-expressions",
        title: "19. Basic Regular Expressions",
        description: "Learn to use regular expressions for pattern matching.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "re-module", title: "Using the re module for pattern matching", completed: false },
          { id: "common-patterns", title: "Common regex patterns for matching text, digits, and special characters", completed: false },
          { id: "search-replace", title: "Searching and replacing text with sub()", completed: false }
        ]
      },
      {
        id: "debugging-testing",
        title: "20. Debugging and Testing",
        description: "Understand debugging techniques and testing in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "print-debugging", title: "Print debugging: Using print statements to understand code flow", completed: false },
          { id: "logging", title: "Logging: Using the logging module for structured log messages", completed: false },
          { id: "unit-testing", title: "Basic Unit Testing: Writing unit tests using Python’s unittest module", completed: false },
          { id: "running-tests", title: "Running tests and interpreting results", completed: false }
        ]
      },
      {
        id: "databases",
        title: "21. Basic Introduction to Databases (Optional)",
        description: "Introduction to working with SQL databases in Python.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "sqlite3", title: "Introduction to working with SQL databases in Python using sqlite3", completed: false },
          { id: "crud-operations", title: "Performing basic CRUD operations (Create, Read, Update, Delete)", completed: false }
        ]
      }
    ]
  },
  {
    id: "phase-6",
    title: "Phase 6: Project Development and Version Control",
    description: "This phase focuses on applying your knowledge by building projects and understanding version control.",
    icon: "🛠️",
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "version-control",
        title: "22. Version Control with Git and GitHub",
        description: "Learn the basics of version control using Git and GitHub.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "git-commands", title: "Basic Git commands: git init, git add, git commit, git push", completed: false },
          { id: "branching", title: "Understanding branching: git branch, git checkout", completed: false },
          { id: "github-repositories", title: "Working with GitHub repositories: pushing and pulling code", completed: false }
        ]
      },
      {
        id: "small-projects",
        title: "23. Building Small Projects",
        description: "Apply your skills by building small projects.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "calculator-app", title: "Simple calculator app", completed: false },
          { id: "todo-list", title: "To-do list manager (using file I/O)", completed: false },
          { id: "number-guessing", title: "Number guessing game", completed: false },
          { id: "web-scraper", title: "Basic web scraper (using requests and BeautifulSoup)", completed: false }
        ]
      }
    ]
  },
  {
    id: "phase-7",
    title: "Phase 7: Continuous Learning and Practice",
    description: "The final phase is about practicing and refining your skills. Work on more projects and dive into areas that interest you, like web development, data science, or automation.",
    icon: "📚",
    backgroundImage:"https://i.pinimg.com/originals/f5/36/01/f53601133f236d1cb167ac19f05a3d60.gif",
    topics: [
      {
        id: "project-based-learning",
        title: "24. Project-Based Learning",
        description: "Engage in practical projects to enhance your skills.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "coding-challenges", title: "Participate in coding challenges (e.g., HackerRank, LeetCode)", completed: false },
          { id: "larger-projects", title: "Build larger projects:", completed: false },
          { id: "api-interaction", title: "Basic API interaction (fetching data from an API)", completed: false },
          { id: "web-app", title: "Simple web app with Flask or Django (optional)", completed: false }
        ]
      },
      {
        id: "specialized-libraries",
        title: "25. Explore Specialized Libraries and Fields",
        description: "Learn about various libraries and fields to expand your knowledge.",
        completed: false,
        locked: false,
        subtopics: [
          { id: "web-development", title: "Web Development: Flask, Django", completed: false },
          { id: "data-science", title: "Data Science: NumPy, Pandas, Matplotlib", completed: false },
          { id: "automation", title: "Automation: selenium, pyautogui", completed: false }
        ]
      }
    ]
  }
];
export default coursePhases;
