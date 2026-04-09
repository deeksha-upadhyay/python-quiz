export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  initialCode: string;
  solution: string;
  rewardPoints: number;
}

export const challengesData: Challenge[] = [
  {
    id: 'c1',
    title: 'The Greeting Bot',
    description: 'Create a bot that asks for a name and then says "Hello [name], welcome to the Python world!".',
    difficulty: 'Easy',
    initialCode: '# Ask for name\nname = \n# Print greeting\n',
    solution: 'name = input\\(\".+\"\\)\\s+print\\(f?\"Hello {?name}?, welcome to the Python world!\"\\)',
    rewardPoints: 50
  },
  {
    id: 'c2',
    title: 'Simple Calculator',
    description: 'Ask the user for two numbers, add them together, and print "The sum is: [result]".',
    difficulty: 'Medium',
    initialCode: '# Get numbers\nnum1 = input("First number: ")\nnum2 = input("Second number: ")\n# Convert to int and add\n',
    solution: 'int\\(num1\\) \\+ int\\(num2\\)\\s+print\\(\"The sum is: .+\"\\)',
    rewardPoints: 100
  },
  {
    id: 'c3',
    title: 'Age in Days',
    description: 'Ask the user for their age in years, and calculate how many days they have been alive (multiply age by 365). Print "You are [days] days old!".',
    difficulty: 'Medium',
    initialCode: 'age = input("Your age: ")\n',
    solution: 'int\\(age\\) \\* 365\\s+print\\(\"You are .+\"\\)',
    rewardPoints: 100
  },
  {
    id: 'c4',
    title: 'The Square Artist',
    description: 'Use the turtle module to draw a square with side length 100. Use a loop to make it efficient!',
    difficulty: 'Medium',
    initialCode: 'import turtle\nt = turtle.Turtle()\n# Draw square using a loop\n',
    solution: 'for\\s+.+\\s+in\\s+range\\(4\\):\\s+t\\.forward\\(100\\)\\s+t\\.left\\(90\\)',
    rewardPoints: 150
  },
  {
    id: 'c5',
    title: 'Odd or Even?',
    description: 'Ask the user for a number and print "It is Even" if the number is even, or "It is Odd" if it is odd. Hint: Use the modulo operator %.',
    difficulty: 'Hard',
    initialCode: 'num = int(input("Enter a number: "))\n# Check if even or odd\n',
    solution: 'if\\s+num\\s*%\\s*2\\s*==\\s*0:\\s+print\\(\"It is Even\"\\)\\s+else:\\s+print\\(\"It is Odd\"\\)',
    rewardPoints: 200
  },
  {
    id: 'c6',
    title: 'List Sum',
    description: 'Create a list of 3 numbers, loop through them to calculate their total sum, and print "Total: [sum]".',
    difficulty: 'Hard',
    initialCode: 'nums = [10, 20, 30]\ntotal = 0\n# Loop and add\n',
    solution: 'for\\s+.+\\s+in\\s+nums:\\s+total\\s*\\+?=\\s*.+\\s+print\\(f?\"Total: {?total}?\"\\)',
    rewardPoints: 200
  }
];
