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
        solution: "print\\(\"I am a coder!\"\\)",
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
        solution: "print\\(\"Hello Python!\"\\)",
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
        solution: "print\\(\".+\"\\)",
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
      },
      {
        id: 6,
        title: "Secret Notes (Comments)",
        concept: "Comments are notes for humans that Python ignores.",
        explanation: "Sometimes you want to leave a note in your code. We use the `#` symbol for this! Python will skip anything on a line that starts with `#`.",
        example: "# This is a secret note\nprint(\"Python sees this\")\n# But not this!",
        practicePrompt: "Add a comment starting with # and then print \"I love comments!\"",
        initialCode: "",
        solution: "#.+\\s+print\\(\"I love comments!\"\\)",
        quiz: [
          {
            question: "Which symbol starts a comment in Python?",
            options: ["//", "/*", "#", "--"],
            correctAnswer: 2,
            explanation: "The hash symbol (#) is used for single-line comments in Python."
          }
        ],
        rewardPoints: 10
      },
      {
        id: 7,
        title: "Quotes Matter",
        concept: "Text must be in quotes, but numbers don't have to be.",
        explanation: "Python needs to know if something is 'Text' (a String) or a 'Number'. Text always goes inside quotes `\" \"` or `' '`.",
        example: "print(\"This is text\")\nprint(123) # This is a number",
        practicePrompt: "Print the word \"Python\" using single quotes ' '.",
        initialCode: "",
        solution: "print\\('Python'\\)",
        quiz: [
          {
            question: "What happens if you forget quotes around text?",
            options: ["It prints anyway", "Python gets confused (Error)", "The text turns blue", "It saves the file"],
            correctAnswer: 1,
            explanation: "Without quotes, Python thinks the text is a variable name. If that variable doesn't exist, it crashes!"
          }
        ],
        rewardPoints: 10
      },
      {
        id: 8,
        title: "Case Sensitivity",
        concept: "Python is picky about Big and Small letters.",
        explanation: "In Python, `print()` is NOT the same as `Print()`. Most Python commands use only small letters.",
        example: "print(\"Correct\")\n# Print(\"Wrong\")",
        practicePrompt: "Try to print \"Small letters only\" using the correct print function.",
        initialCode: "",
        solution: "print\\(\"Small letters only\"\\)",
        quiz: [
          {
            question: "Is 'print' the same as 'PRINT' in Python?",
            options: ["Yes", "No", "Only on Tuesdays", "Only for numbers"],
            correctAnswer: 1,
            explanation: "Python is case-sensitive, meaning capitalization matters!"
          }
        ],
        rewardPoints: 10
      },
      {
        id: 9,
        title: "Multiple Items",
        concept: "You can print many things at once using commas.",
        explanation: "Want to print two things on the same line? Use a comma `,` to separate them! Python will automatically add a space between them.",
        example: "print(\"Score:\", 100)",
        practicePrompt: "Print \"Level\" and the number 1 separated by a comma.",
        initialCode: "",
        solution: "print\\(\"Level\", 1\\)",
        quiz: [
          {
            question: "What does a comma do inside print()?",
            options: ["Deletes the code", "Adds a space and another item", "Makes the text bold", "Ends the program"],
            correctAnswer: 1,
            explanation: "Commas allow you to output multiple values in a single print statement."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 10,
        title: "Phase 1 Graduation",
        concept: "You've mastered the basics of output!",
        explanation: "You now know how to talk to the computer using `print`, how to use numbers, and how to leave comments. You're ready for Phase 2!",
        example: "print(\"I am ready for Phase 2!\")",
        practicePrompt: "Celebrate your progress! Print \"Phase 1 Complete!\"",
        initialCode: "",
        solution: "print\\(\"Phase 1 Complete!\"\\)",
        quiz: [
          {
            question: "Which function is used to show output?",
            options: ["show()", "display()", "print()", "output()"],
            correctAnswer: 2,
            explanation: "The print() function is the primary way to display information."
          }
        ],
        rewardPoints: 25
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
      },
      {
        id: 13,
        title: "Updating Variables",
        concept: "You can change what's inside a variable box.",
        explanation: "Variables can vary! You can give a variable a new value, and Python will forget the old one.",
        example: "power = 10\npower = 20\nprint(power) # Shows 20",
        practicePrompt: "Create a variable 'gems' set to 5, then change it to 10 on the next line.",
        initialCode: "gems = 5\n",
        solution: "gems = 5\\s+gems = 10",
        quiz: [
          {
            question: "What happens to the old value when you update a variable?",
            options: ["It stays there", "It gets deleted/forgotten", "It adds to the new value", "It moves to a new variable"],
            correctAnswer: 1,
            explanation: "Assigning a new value overwrites the previous one."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 14,
        title: "Naming Rules",
        concept: "Variable names must follow certain rules.",
        explanation: "Names can have letters, numbers, and underscores `_`. But they CANNOT start with a number or have spaces!",
        example: "player_1 = \"Alex\" # Good\n# 1player = \"Alex\" # Bad",
        practicePrompt: "Create a valid variable name using an underscore (like 'my_score') and set it to 100.",
        initialCode: "",
        solution: "[a-zA-Z_]+_[a-zA-Z0-9_]*\\s*=\\s*100",
        quiz: [
          {
            question: "Which of these is a VALID variable name?",
            options: ["my score", "2players", "player_one", "player-one"],
            correctAnswer: 2,
            explanation: "Variable names cannot have spaces or hyphens, and cannot start with numbers. Underscores are allowed!"
          }
        ],
        rewardPoints: 15
      },
      {
        id: 15,
        title: "Combining Strings",
        concept: "You can glue text together using +.",
        explanation: "Using `+` with text (strings) joins them together. This is called 'concatenation'.",
        example: "greeting = \"Hi \" + \"there!\"\nprint(greeting)",
        practicePrompt: "Create a variable 'full_name' by joining \"Python\" and \"Master\" with a space in between.",
        initialCode: "",
        solution: "full_name\\s*=\\s*\"Python\"\\s*\\+\\s*\" \"\\s*\\+\\s*\"Master\"",
        quiz: [
          {
            question: "What does \"A\" + \"B\" result in?",
            options: ["AB", "A B", "Error", "C"],
            correctAnswer: 0,
            explanation: "Adding strings joins them exactly as they are, without adding spaces automatically."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 16,
        title: "Math with Variables",
        concept: "You can do math using variable names.",
        explanation: "If a variable holds a number, you can use its name in math problems just like the number itself!",
        example: "apples = 5\noranges = 3\ntotal = apples + oranges",
        practicePrompt: "Create 'x' as 10 and 'y' as 5. Then create 'z' that is x + y.",
        initialCode: "x = 10\ny = 5\n",
        solution: "z\\s*=\\s*x\\s*\\+\\s*y",
        quiz: [
          {
            question: "If a=2 and b=3, what is a+b?",
            options: ["23", "5", "ab", "Error"],
            correctAnswer: 1,
            explanation: "Python adds the numeric values stored inside the variables."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 17,
        title: "Decimal Numbers (Floats)",
        concept: "Floats are numbers with decimal points.",
        explanation: "Not all numbers are whole. Numbers like `3.14` or `0.5` are called 'Floats' in Python.",
        example: "price = 19.99\nprint(price)",
        practicePrompt: "Create a variable 'pi' and set it to 3.14.",
        initialCode: "",
        solution: "pi\\s*=\\s*3.14",
        quiz: [
          {
            question: "What is 10.5 called in Python?",
            options: ["Integer", "String", "Float", "Boolean"],
            correctAnswer: 2,
            explanation: "Numbers with decimal points are known as floating-point numbers, or 'floats'."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 18,
        title: "True or False? (Booleans)",
        concept: "Booleans store only two values: True or False.",
        explanation: "Sometimes you just need to know if something is on or off. We use `True` and `False` (with capital letters!) for this.",
        example: "is_game_over = False\nis_logged_in = True",
        practicePrompt: "Create a variable 'is_happy' and set it to True.",
        initialCode: "",
        solution: "is_happy\\s*=\\s*True",
        quiz: [
          {
            question: "Which of these is a correct Boolean value?",
            options: ["true", "TRUE", "True", "\"True\""],
            correctAnswer: 2,
            explanation: "In Python, Booleans must be capitalized: True or False."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 19,
        title: "Variable to Variable",
        concept: "You can copy one variable into another.",
        explanation: "You can set a variable's value to be the same as another variable's current value.",
        example: "original = 100\ncopy = original\nprint(copy) # Shows 100",
        practicePrompt: "Create 'a' as 50, then create 'b' and set it equal to 'a'.",
        initialCode: "a = 50\n",
        solution: "b\\s*=\\s*a",
        quiz: [
          {
            question: "If x=10 and y=x, what is y?",
            options: ["x", "10", "Error", "Nothing"],
            correctAnswer: 1,
            explanation: "y takes the value that was currently inside x."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 20,
        title: "Phase 2 Graduation",
        concept: "You are a Variable Master!",
        explanation: "You can store text, numbers, decimals, and truth. You can update them and use them in math. You're ready for user interaction!",
        example: "print(\"Variables are powerful!\")",
        practicePrompt: "Print \"I am a Variable Master!\"",
        initialCode: "",
        solution: "print\\(\"I am a Variable Master!\"\\)",
        quiz: [
          {
            question: "What is the main purpose of a variable?",
            options: ["To slow down the computer", "To store data for later use", "To make the code look pretty", "To fix bugs"],
            correctAnswer: 1,
            explanation: "Variables allow us to remember and manipulate data throughout our program."
          }
        ],
        rewardPoints: 30
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
      },
      {
        id: 22,
        title: "Input Prompts",
        concept: "You can put a message inside input().",
        explanation: "Instead of printing a question first, you can put the question directly inside the `input()` parentheses.",
        example: "age = input(\"How old are you? \")",
        practicePrompt: "Ask the user \"What city? \" and store it in a variable called 'city'.",
        initialCode: "",
        solution: "city\\s*=\\s*input\\(\"What city\\? \"\\)",
        quiz: [
          {
            question: "Where does the prompt message go in input()?",
            options: ["Before the function", "After the function", "Inside the parentheses", "In a separate print()"],
            correctAnswer: 2,
            explanation: "The string inside input() is shown to the user as a prompt."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 23,
        title: "Dynamic Greetings",
        concept: "Use input to make your program personal.",
        explanation: "By combining `input()` and `print()`, you can make a program that talks back to the user!",
        example: "user = input(\"Name? \")\nprint(\"Welcome, \" + user)",
        practicePrompt: "Ask for a 'hobby' and then print \"Cool! I like \" + hobby.",
        initialCode: "hobby = input(\"Your hobby? \")\n",
        solution: "print\\(\"Cool! I like \"\\s*\\+\\s*hobby\\)",
        quiz: [
          {
            question: "How do you join a variable 'name' to the text 'Hi '?",
            options: ["'Hi ' + name", "'Hi ' . name", "'Hi ' & name", "Hi name"],
            correctAnswer: 0,
            explanation: "The + operator joins (concatenates) two strings together."
          }
        ],
        rewardPoints: 25
      },
      {
        id: 24,
        title: "The String Trap",
        concept: "input() ALWAYS gives you text (a String).",
        explanation: "Even if the user types a number like `10`, Python treats it as text `\"10\"`. You can't do math with it yet!",
        example: "num = input(\"Number? \")\nprint(num + num) # If input is 5, shows 55!",
        practicePrompt: "Ask for a 'number' and print it twice using num + num to see the 'String Trap' in action.",
        initialCode: "num = input(\"Enter 5: \")\n",
        solution: "print\\(num\\s*\\+\\s*num\\)",
        quiz: [
          {
            question: "If I type 7 into input(), what does Python see?",
            options: ["The number 7", "The text \"7\"", "An error", "Nothing"],
            correctAnswer: 1,
            explanation: "input() always returns a string, regardless of what is typed."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 25,
        title: "Converting to Numbers",
        concept: "Use int() to turn text into a whole number.",
        explanation: "To do math with user input, you must convert it using `int()`. This stands for 'Integer'.",
        example: "age_text = input(\"Age? \")\nage = int(age_text)\nprint(age + 1)",
        practicePrompt: "Ask for a 'score', convert it to an int, and print score + 10.",
        initialCode: "s = input(\"Score: \")\n",
        solution: "score\\s*=\\s*int\\(s\\)\\s+print\\(score\\s*\\+\\s*10\\)",
        quiz: [
          {
            question: "What does int(\"10\") do?",
            options: ["Makes it text", "Turns it into the number 10", "Deletes it", "Prints it"],
            correctAnswer: 1,
            explanation: "int() converts a string of digits into an actual numeric integer."
          }
        ],
        rewardPoints: 25
      },
      {
        id: 26,
        title: "Converting to Decimals",
        concept: "Use float() for numbers with decimals.",
        explanation: "If you expect a decimal number (like a price), use `float()` instead of `int()`.",
        example: "price = float(input(\"Price? \"))\nprint(price * 0.9)",
        practicePrompt: "Ask for 'height' in meters (like 1.75) and convert it to a float.",
        initialCode: "",
        solution: "height\\s*=\\s*float\\(input\\(\".+\"\\)\\)",
        quiz: [
          {
            question: "Which function converts text to a decimal number?",
            options: ["int()", "str()", "float()", "dec()"],
            correctAnswer: 2,
            explanation: "float() is used for floating-point (decimal) numbers."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 27,
        title: "The Easy Way (f-strings)",
        concept: "f-strings make printing variables much easier.",
        explanation: "Instead of using `+` and quotes everywhere, put an `f` before your string and use `{ }` for variables!",
        example: "name = \"Alex\"\nprint(f\"Hello {name}!\")",
        practicePrompt: "Create a variable 'food' and use an f-string to print \"I love {food}\".",
        initialCode: "food = \"Pizza\"\n",
        solution: "print\\(f\"I love {food}\"\\)",
        quiz: [
          {
            question: "What does the 'f' stand for in f-string?",
            options: ["Fast", "Formatted", "Function", "Final"],
            correctAnswer: 1,
            explanation: "f-strings are 'Formatted String Literals'."
          }
        ],
        rewardPoints: 25
      },
      {
        id: 28,
        title: "Math with Input",
        concept: "Combine input and math in one line.",
        explanation: "You can wrap the `input()` inside the `int()` to save space!",
        example: "num = int(input(\"Number: \"))\nprint(num * 2)",
        practicePrompt: "Ask for a 'radius' using int(input()), then print radius * 2.",
        initialCode: "",
        solution: "radius\\s*=\\s*int\\(input\\(\".+\"\\)\\)\\s+print\\(radius\\s*\\*\\s*2\\)",
        quiz: [
          {
            question: "Can you put one function inside another?",
            options: ["Yes", "No", "Only for print", "Only for math"],
            correctAnswer: 0,
            explanation: "This is called 'nesting' functions, and it's very common in Python!"
          }
        ],
        rewardPoints: 25
      },
      {
        id: 29,
        title: "Multi-line Input",
        concept: "Programs can ask many questions in a row.",
        explanation: "You can use multiple `input()` calls to gather a lot of information from the user.",
        example: "name = input(\"Name? \")\ncolor = input(\"Color? \")\nprint(f\"{name} likes {color}\")",
        practicePrompt: "Ask for 'name' and 'age', then print \"{name} is {age} years old\" using an f-string.",
        initialCode: "",
        solution: "name\\s*=\\s*input\\(.+\\)\\s+age\\s*=\\s*input\\(.+\\)\\s+print\\(f\".+\"\\)",
        quiz: [
          {
            question: "How many input() calls can a program have?",
            options: ["Only 1", "Up to 10", "As many as you need", "Exactly 2"],
            correctAnswer: 2,
            explanation: "There is no limit to how many times you can ask for user input."
          }
        ],
        rewardPoints: 25
      },
      {
        id: 30,
        title: "Phase 3 Graduation",
        concept: "You can now build interactive apps!",
        explanation: "You've learned how to get data from users, convert it for math, and display it beautifully with f-strings. You're a pro!",
        example: "print(\"Interaction unlocked!\")",
        practicePrompt: "Celebrate! Print \"I can talk to users!\"",
        initialCode: "",
        solution: "print\\(\"I can talk to users!\"\\)",
        quiz: [
          {
            question: "Which function pauses the program for user typing?",
            options: ["wait()", "pause()", "input()", "get()"],
            correctAnswer: 2,
            explanation: "input() is the standard way to get user input in Python."
          }
        ],
        rewardPoints: 40
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
      },
      {
        id: 32,
        title: "Subtraction",
        concept: "Use the - sign to subtract numbers.",
        explanation: "Subtraction is just as easy as addition. Use the minus sign `-`.",
        example: "result = 10 - 4\nprint(result)",
        practicePrompt: "Subtract 5 from 15 and print the result.",
        initialCode: "",
        solution: "print\\(15\\s*-\\s*5\\)",
        quiz: [
          {
            question: "Which symbol is used for subtraction?",
            options: ["_", "-", "sub", "/"],
            correctAnswer: 1,
            explanation: "The hyphen/minus sign (-) is used for subtraction."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 33,
        title: "Multiplication",
        concept: "Use the * sign to multiply numbers.",
        explanation: "In coding, we don't use 'x' for multiplication. We use the asterisk `*`!",
        example: "result = 5 * 5\nprint(result)",
        practicePrompt: "Multiply 6 by 7 and print the result.",
        initialCode: "",
        solution: "print\\(6\\s*\\*\\s*7\\)",
        quiz: [
          {
            question: "Which symbol is used for multiplication?",
            options: ["x", "*", "&", "^"],
            correctAnswer: 1,
            explanation: "The asterisk (*) is the multiplication operator in Python."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 34,
        title: "Division",
        concept: "Use the / sign to divide numbers.",
        explanation: "Use the forward slash `/` for division. Note that division always gives you a Float (decimal number)!",
        example: "result = 10 / 2\nprint(result) # Shows 5.0",
        practicePrompt: "Divide 20 by 4 and print the result.",
        initialCode: "",
        solution: "print\\(20\\s*/\\s*4\\)",
        quiz: [
          {
            question: "What type of number does division always return?",
            options: ["Integer", "Float", "String", "Boolean"],
            correctAnswer: 1,
            explanation: "In Python 3, the / operator always returns a float."
          }
        ],
        rewardPoints: 15
      },
      {
        id: 35,
        title: "Exponents (Powers)",
        concept: "Use ** to calculate powers.",
        explanation: "Want to calculate 2 to the power of 3? Use double asterisks `**`!",
        example: "result = 2 ** 3\nprint(result) # Shows 8",
        practicePrompt: "Calculate 5 squared (5 to the power of 2) and print it.",
        initialCode: "",
        solution: "print\\(5\\s*\\*\\*\\s*2\\)",
        quiz: [
          {
            question: "How do you calculate 3 to the power of 2?",
            options: ["3 ^ 2", "3 * 2", "3 ** 2", "3 ^^ 2"],
            correctAnswer: 2,
            explanation: "** is the exponentiation operator."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 36,
        title: "Modulo (Remainder)",
        concept: "Use % to find the remainder of a division.",
        explanation: "The modulo operator `%` gives you what's left over after division. For example, 10 % 3 is 1 because 3 goes into 10 three times with 1 left over.",
        example: "result = 10 % 3\nprint(result) # Shows 1",
        practicePrompt: "Find the remainder of 15 divided by 4 and print it.",
        initialCode: "",
        solution: "print\\(15\\s*%\\s*4\\)",
        quiz: [
          {
            question: "What is 7 % 2?",
            options: ["3.5", "3", "1", "0"],
            correctAnswer: 2,
            explanation: "2 goes into 7 three times (6), leaving a remainder of 1."
          }
        ],
        rewardPoints: 20
      },
      {
        id: 37,
        title: "Phase 4 Graduation",
        concept: "You are a Math Wizard!",
        explanation: "You can now perform all basic calculations in Python. From simple addition to complex powers and remainders!",
        example: "print(\"Math is my superpower!\")",
        practicePrompt: "Celebrate! Print \"Math Wizard Unlocked!\"",
        initialCode: "",
        solution: "print\\(\"Math Wizard Unlocked!\"\\)",
        quiz: [
          {
            question: "Which operator gives the remainder?",
            options: ["/", "//", "%", "*"],
            correctAnswer: 2,
            explanation: "The % (modulo) operator returns the remainder of a division."
          }
        ],
        rewardPoints: 30
      }
    ]
  },
  {
    id: 5,
    title: "Turtle Graphics",
    color: "bg-pink-500",
    levels: [
      {
        id: 41,
        title: "Meet the Turtle",
        concept: "The turtle module lets you draw shapes.",
        explanation: "Imagine a turtle with a pen on its tail crawling on your screen. As it moves, it draws! We use `import turtle` to start.",
        example: "import turtle\nt = turtle.Turtle()\nt.forward(100)",
        practicePrompt: "Import turtle and create a turtle named 't'. Then move it forward 50 steps.",
        initialCode: "import turtle\n",
        solution: "t\\s*=\\s*turtle\\.Turtle\\(\\)\\s+t\\.forward\\(50\\)",
        quiz: [
          {
            question: "What is the turtle module used for?",
            options: ["Studying animals", "Drawing graphics", "Calculating math", "Saving files"],
            correctAnswer: 1,
            explanation: "Turtle is a classic tool for learning graphics and geometry through code."
          }
        ],
        rewardPoints: 30
      },
      {
        id: 42,
        title: "Turning the Turtle",
        concept: "Use left() and right() to change direction.",
        explanation: "You can tell the turtle to turn by a certain number of degrees. `left(90)` makes a sharp left turn!",
        example: "t.forward(100)\nt.left(90)\nt.forward(100)",
        practicePrompt: "Move forward 100, turn right 90 degrees, and move forward 100 again.",
        initialCode: "import turtle\nt = turtle.Turtle()\n",
        solution: "t\\.forward\\(100\\)\\s+t\\.right\\(90\\)\\s+t\\.forward\\(100\\)",
        quiz: [
          {
            question: "How many degrees are in a full circle?",
            options: ["90", "180", "270", "360"],
            correctAnswer: 3,
            explanation: "A full rotation is 360 degrees."
          }
        ],
        rewardPoints: 30
      },
      {
        id: 43,
        title: "Drawing a Square",
        concept: "Combine moves and turns to make shapes.",
        explanation: "To draw a square, you move forward and turn 90 degrees four times!",
        example: "t.forward(100)\nt.left(90)\nt.forward(100)\nt.left(90)\nt.forward(100)\nt.left(90)\nt.forward(100)\nt.left(90)",
        practicePrompt: "Draw a small square with side length 50.",
        initialCode: "import turtle\nt = turtle.Turtle()\n",
        solution: "(t\\.forward\\(50\\)\\s+t\\.left\\(90\\)\\s*){4}",
        quiz: [
          {
            question: "What angle do you use for a square's corners?",
            options: ["45", "90", "120", "180"],
            correctAnswer: 1,
            explanation: "Squares have 90-degree (right) angles."
          }
        ],
        rewardPoints: 40
      },
      {
        id: 44,
        title: "Colors and Pens",
        concept: "Change the color and size of your drawing.",
        explanation: "You can change the pen color using `color()` and the line thickness using `pensize()`.",
        example: "t.color(\"red\")\nt.pensize(5)\nt.forward(100)",
        practicePrompt: "Set the color to \"blue\" and draw a line of length 100.",
        initialCode: "import turtle\nt = turtle.Turtle()\n",
        solution: "t\\.color\\(\"blue\"\\)\\s+t\\.forward\\(100\\)",
        quiz: [
          {
            question: "Which function changes the line color?",
            options: ["paint()", "color()", "ink()", "style()"],
            correctAnswer: 1,
            explanation: "The color() function sets the pen color."
          }
        ],
        rewardPoints: 30
      },
      {
        id: 45,
        title: "Phase 5 Graduation",
        concept: "You are a Digital Artist!",
        explanation: "You've learned the basics of Turtle graphics. You can move, turn, and change colors to create art with code!",
        example: "print(\"Art mode enabled!\")",
        practicePrompt: "Celebrate! Print \"I am a Turtle Artist!\"",
        initialCode: "",
        solution: "print\\(\"I am a Turtle Artist!\"\\)",
        quiz: [
          {
            question: "What command makes the turtle move backward?",
            options: ["back()", "reverse()", "backward()", "Both back() and backward()"],
            correctAnswer: 3,
            explanation: "Turtle supports both back() and backward() for moving in reverse."
          }
        ],
        rewardPoints: 50
      }
    ]
  },
  {
    id: 6,
    title: "Extra: Loops & Lists",
    color: "bg-indigo-500",
    levels: [
      {
        id: 51,
        title: "Repeating Code (for loops)",
        concept: "Loops let you run code multiple times automatically.",
        explanation: "Instead of writing the same line 10 times, use a `for` loop! `range(5)` will run the code 5 times.",
        example: "for i in range(5):\n    print(\"Hello!\")",
        practicePrompt: "Use a for loop to print \"Python\" 3 times.",
        initialCode: "",
        solution: "for\\s+.+\\s+in\\s+range\\(3\\):\\s+print\\(\"Python\"\\)",
        quiz: [
          {
            question: "What does range(10) do in a loop?",
            options: ["Counts to 10", "Runs the loop 10 times", "Multiplies by 10", "Deletes 10 items"],
            correctAnswer: 1,
            explanation: "range(n) generates a sequence of n numbers, causing the loop to run n times."
          }
        ],
        rewardPoints: 40
      },
      {
        id: 52,
        title: "Lists of Things",
        concept: "Lists store many items in one variable.",
        explanation: "A list is like a collection. Use square brackets `[ ]` and commas to make one.",
        example: "fruits = [\"Apple\", \"Banana\", \"Cherry\"]\nprint(fruits)",
        practicePrompt: "Create a list called 'colors' with \"Red\", \"Green\", and \"Blue\".",
        initialCode: "",
        solution: "colors\\s*=\\s*\\[\"Red\",\\s*\"Green\",\\s*\"Blue\"\\]",
        quiz: [
          {
            question: "Which brackets are used for lists?",
            options: ["( )", "{ }", "[ ]", "< >"],
            correctAnswer: 2,
            explanation: "Square brackets [ ] are the standard syntax for lists in Python."
          }
        ],
        rewardPoints: 30
      },
      {
        id: 53,
        title: "Looping through Lists",
        concept: "You can run code for every item in a list.",
        explanation: "A `for` loop can go through a list one by one and do something with each item.",
        example: "names = [\"Alex\", \"Sam\"]\nfor n in names:\n    print(\"Hello \" + n)",
        practicePrompt: "Create a list of numbers [1, 2, 3] and loop through them to print each one.",
        initialCode: "nums = [1, 2, 3]\n",
        solution: "for\\s+.+\\s+in\\s+nums:\\s+print\\(.+\\)",
        quiz: [
          {
            question: "What happens in 'for x in list'?",
            options: ["x becomes the whole list", "x becomes each item one by one", "The list is deleted", "Nothing"],
            correctAnswer: 1,
            explanation: "The loop variable (x) takes the value of each element in the list sequentially."
          }
        ],
        rewardPoints: 40
      },
      {
        id: 54,
        title: "Phase 6 Graduation",
        concept: "You are a Python Pro!",
        explanation: "You've mastered loops and lists, the building blocks of complex programs. You can now handle large amounts of data and repeat tasks with ease!",
        example: "print(\"Pro status achieved!\")",
        practicePrompt: "Celebrate! Print \"I am a Python Pro!\"",
        initialCode: "",
        solution: "print\\(\"I am a Python Pro!\"\\)",
        quiz: [
          {
            question: "Which keyword is used to start a loop?",
            options: ["loop", "repeat", "for", "while"],
            correctAnswer: 2,
            explanation: "The 'for' keyword is used to iterate over a sequence."
          }
        ],
        rewardPoints: 100
      }
    ]
  }
];
