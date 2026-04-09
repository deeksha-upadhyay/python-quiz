export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Level {
  id: number;
  title: string;
  concept: string;
  explanation: string;
  example: string;
  practicePrompt: string;
  initialCode: string;
  solution: string;
  quiz: QuizQuestion[];
  rewardPoints: number;
}

export interface Phase {
  id: number;
  title: string;
  color: string;
  levels: Level[];
}

export const learningData: Phase[] = [
  {
    id: 1,
    title: "Introduction to Coding",
    color: "bg-green-500",
    levels: [
      {
        id: 1,
        title: "What is Coding?",
        concept: "Coding is giving instructions to a computer.",
        explanation: "Imagine you are telling a robot how to make a peanut butter sandwich. You have to be very specific! Coding is just that—writing specific instructions for computers to follow.",
        example: "# No code here, just thinking!\n# If I say 'Walk', the robot walks.",
        practicePrompt: "Try printing your first message! Type: print(\"I am a coder!\")",
        initialCode: "",
        solution: "print(\"I am a coder!\")",
        quiz: [
          {
            question: "What is coding?",
            options: ["Talking to robots", "Giving instructions to a computer", "Playing video games", "Fixing a broken screen"],
            correctAnswer: 1,
            explanation: "Coding is the language we use to tell computers exactly what to do!"
          }
        ],
        rewardPoints: 10
      },
      {
        id: 2,
        title: "What is Python?",
        concept: "Python is a popular and easy-to-read coding language.",
        explanation: "Python is like a human language, but for computers. It's famous for being easy to read, just like English! It's used to build websites, AI, and even games.",
        example: "print(\"Hello Python!\")",
        practicePrompt: "Let's say hello to Python! Type: print(\"Hello Python!\")",
        initialCode: "",
        solution: "print(\"Hello Python!\")",
        quiz: [
          {
            question: "Why is Python popular for beginners?",
            options: ["It has a cool name", "It is easy to read and write", "It only works on snakes", "It's the oldest language"],
            correctAnswer: 1,
            explanation: "Python was designed to be readable and simple for humans to understand."
          }
        ],
        rewardPoints: 10
      },
      {
        id: 3,
        title: "Your First Program",
        concept: "The print() function shows text on the screen.",
        explanation: "In Python, we use `print()` to show things on the screen. Whatever you put inside the parentheses `()` and quotes `\" \"` will be displayed.",
        example: "print(\"Welcome to the game!\")",
        practicePrompt: "Print your name! For example: print(\"Alex\")",
        initialCode: "print(\"\")",
        solution: "print(\".+\")",
        quiz: [
          {
            question: "What does print() do?",
            options: ["Prints a paper document", "Shows text on the screen", "Deletes your code", "Changes the color of the screen"],
            correctAnswer: 1,
            explanation: "The print function 'outputs' information to the console or screen."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 4,
        title: "Printing Numbers",
        concept: "You can print numbers without quotes.",
        explanation: "Numbers are different from text. You don't need quotes `\" \"` for numbers! Python knows they are math values.",
        example: "print(100)",
        practicePrompt: "Print the number 7!",
        initialCode: "",
        solution: "print(7)",
        quiz: [
          {
            question: "Do you need quotes for numbers in print()?",
            options: ["Yes, always", "No, never", "Only for big numbers", "Only for zero"],
            correctAnswer: 1,
            explanation: "Numbers (integers) can be printed directly without quotes."
          }
        ],
        rewardPoints: 10
      },
      {
        id: 5,
        title: "Multiple Prints",
        concept: "Python runs code from top to bottom.",
        explanation: "If you write multiple print statements, Python will show them one after another, each on a new line.",
        example: "print(\"Line 1\")\nprint(\"Line 2\")",
        practicePrompt: "Print 'Hello' on one line and 'World' on the next line.",
        initialCode: "",
        solution: "print(\"Hello\")\nprint(\"World\")",
        quiz: [
          {
            question: "How does Python read your code?",
            options: ["Bottom to top", "Top to bottom", "Randomly", "Right to left"],
            correctAnswer: 1,
            explanation: "Python is an interpreted language that executes code line by line from the top."
          }
        ],
        rewardPoints: 15
      }
    ]
  },
  {
    id: 2,
    title: "Variables Basics",
    color: "bg-blue-500",
    levels: [
      {
        id: 11,
        title: "The Magic Box",
        concept: "Variables are like boxes that store information.",
        explanation: "A variable is a name you give to a piece of data. Think of it as a box with a label. You can put something inside and use the label to find it later.",
        example: "name = \"SuperCoder\"",
        practicePrompt: "Create a variable called 'hero' and set it to your favorite hero's name.",
        initialCode: "hero = ",
        solution: "hero = \".+\"",
        quiz: [
          {
            question: "What is a variable?",
            options: ["A type of computer", "A storage box for data", "A mathematical error", "A keyboard key"],
            correctAnswer: 1,
            explanation: "Variables store values so we can use them later in our program."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 12,
        title: "Printing Variables",
        concept: "You can print what's inside a variable box.",
        explanation: "To see what's inside a variable, just put the variable name inside `print()`. Don't use quotes, or it will print the name instead of the value!",
        example: "score = 10\nprint(score)",
        practicePrompt: "Create a variable 'age' with your age, then print it.",
        initialCode: "age = 10\n",
        solution: "age = \\d+\\s+print\\(age\\)",
        quiz: [
          {
            question: "How do you print a variable named 'x'?",
            options: ["print(\"x\")", "print(x)", "show x", "display(x)"],
            correctAnswer: 1,
            explanation: "Using print(x) prints the value stored in x. Using print(\"x\") would just print the letter x."
          }
        ],
        rewardPoints: 20
      }
    ]
  },
  {
    id: 3,
    title: "User Input",
    color: "bg-purple-500",
    levels: [
      {
        id: 21,
        title: "Asking Questions",
        concept: "The input() function lets the user type something.",
        explanation: "How do we get information from the person using our program? We use `input()`! It's like a prompt that waits for the user to type and press Enter.",
        example: "name = input(\"What is your name? \")\nprint(\"Hi \" + name)",
        practicePrompt: "Ask the user for their favorite color using input(\"Favorite color? \") and store it in a variable called 'color'.",
        initialCode: "color = ",
        solution: "color = input\\(\".+\"\\)",
        quiz: [
          {
            question: "What does input() do?",
            options: ["Prints text", "Waits for user to type", "Deletes a file", "Calculates math"],
            correctAnswer: 1,
            explanation: "input() pauses the program and waits for the user to provide text."
          }
        ],
        rewardPoints: 25
      }
    ]
  },
  {
    id: 4,
    title: "Basic Math",
    color: "bg-yellow-500",
    levels: [
      {
        id: 31,
        title: "Addition",
        concept: "Python can do math with the + sign.",
        explanation: "Python is a super calculator! Use `+` to add numbers together.",
        example: "result = 5 + 3\nprint(result)",
        practicePrompt: "Create a variable 'total' that adds 10 and 20, then print it.",
        initialCode: "total = \nprint(total)",
        solution: "total = 10 \\+ 20\\s+print\\(total\\)",
        quiz: [
          {
            question: "Which symbol is used for addition in Python?",
            options: ["&", "+", "add", "plus"],
            correctAnswer: 1,
            explanation: "The plus sign (+) is the standard operator for addition."
          }
        ],
        rewardPoints: 15
      }
    ]
  }
];
