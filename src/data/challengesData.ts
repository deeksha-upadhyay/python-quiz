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
    solution: 'input[\\s\\S]*print[\\s\\S]*Hello[\\s\\S]*welcome',
    rewardPoints: 50
  },
  {
    id: 'c2',
    title: 'Simple Calculator',
    description: 'Ask the user for two numbers, add them together, and print "The sum is: [result]".',
    difficulty: 'Medium',
    initialCode: '# Get numbers\nnum1 = input("First number: ")\nnum2 = input("Second number: ")\n# Convert to int and add\n',
    solution: 'int[\\s\\S]*int[\\s\\S]*print[\\s\\S]*sum',
    rewardPoints: 100
  },
  {
    id: 'c3',
    title: 'Age in Days',
    description: 'Ask the user for their age in years, and calculate how many days they have been alive (multiply age by 365). Print "You are [days] days old!".',
    difficulty: 'Medium',
    initialCode: 'age = input("Your age: ")\n',
    solution: 'int[\\s\\S]*age[\\s\\S]*365[\\s\\S]*print[\\s\\S]*days old',
    rewardPoints: 100
  },
  {
    id: 'c4',
    title: 'The Square Artist',
    description: 'Use the turtle module to draw a square with side length 100. Use a loop to make it efficient!',
    difficulty: 'Medium',
    initialCode: 'import turtle\nt = turtle.Turtle()\n# Draw square using a loop\n',
    solution: 'for[\\s\\S]*range[\\s\\S]*4[\\s\\S]*forward[\\s\\S]*100[\\s\\S]*left[\\s\\S]*90',
    rewardPoints: 150
  },
  {
    id: 'c5',
    title: 'Odd or Even?',
    description: 'Ask the user for a number and print "It is Even" if the number is even, or "It is Odd" if it is odd. Hint: Use the modulo operator %.',
    difficulty: 'Hard',
    initialCode: 'num = int(input("Enter a number: "))\n# Check if even or odd\n',
    solution: 'if[\\s\\S]*num[\\s\\S]*%[\\s\\S]*2[\\s\\S]*==[\\s\\S]*0[\\s\\S]*print[\\s\\S]*Even[\\s\\S]*else[\\s\\S]*print[\\s\\S]*Odd',
    rewardPoints: 200
  },
  {
    id: 'c6',
    title: 'List Sum',
    description: 'Create a list of 3 numbers, loop through them to calculate their total sum, and print "Total: [sum]".',
    difficulty: 'Hard',
    initialCode: 'nums = [10, 20, 30]\ntotal = 0\n# Loop and add\n',
    solution: 'for[\\s\\S]*in[\\s\\S]*nums[\\s\\S]*total[\\s\\S]*print[\\s\\S]*Total',
    rewardPoints: 200
  }
];
