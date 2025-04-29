import { BookOpen, Zap, Trophy } from 'lucide-react';

export interface Project {
  name: string;
  description: string;
  code: string;
  language: string;
  output?: string;
}

export const beginnerProjects: Project[] = [
  {
    name: "Calculator Program",
    description: "A simple calculator that performs basic arithmetic operations",
    code: `# Simple Calculator Program
def add(x, y):
    return x + y
def subtract(x, y):
    return x - y
def multiply(x, y):
    return x * y
def divide(x, y):
    if y == 0:
        return "Cannot divide by zero!"
    return x / y

while True:
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Exit")
    choice = input("Enter choice (1-5): ")
    if choice == '5':
        print("Goodbye!")
        break
    if choice in ('1', '2', '3', '4'):
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        if choice == '1':
            print(num1, " + ", num2, " = ", add(num1, num2))
        elif choice == '2':
            print(num1, " - ", num2, " = ", subtract(num1, num2))
        elif choice == '3':
            print(num1, " * ", num2, " = ", multiply(num1, num2))
        elif choice == '4':
            result = divide(num1, num2)
            print(num1, " / ", num2, " = ", result)
    else:
        print("Invalid input")`,
    language: "python"
  },
  {
    name: "To-Do List Application",
    description: "A console-based task management system with file persistence",
    code: `import json
from datetime import datetime

class TodoList:
    def __init__(self):
        self.tasks = []
        self.load_tasks()
    
    def load_tasks(self):
        try:
            with open('tasks.json', 'r') as file:
                self.tasks = json.load(file)
        except FileNotFoundError:
            self.tasks = []
    
    def save_tasks(self):
        with open('tasks.json', 'w') as file:
            json.dump(self.tasks, file, indent=2)
    
    def add_task(self, title, description=""):
        task = {
            'id': len(self.tasks) + 1,
            'title': title,
            'description': description,
            'completed': False,
            'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.tasks.append(task)
        self.save_tasks()
        print("Task added successfully!")
    
    def view_tasks(self):
        if not self.tasks:
            print("No tasks found!")
            return
        
        print("\nYour To-Do List:")
        print("-" * 50)
        for task in self.tasks:
            status = "✓" if task['completed'] else " "
            print(f"{task['id']}. [{status}] {task['title']}")
            if task['description']:
                print(f"   Description: {task['description']}")
            print(f"   Created: {task['created_at']}")
            print("-" * 50)
    
    def mark_completed(self, task_id):
        for task in self.tasks:
            if task['id'] == task_id:
                task['completed'] = True
                self.save_tasks()
                print("Task marked as completed!")
                return
        print("Task not found!")
    
    def delete_task(self, task_id):
        for task in self.tasks:
            if task['id'] == task_id:
                self.tasks.remove(task)
                self.save_tasks()
                print("Task deleted successfully!")
                return
        print("Task not found!")

def main():
    todo = TodoList()
    while True:
        print("\n=== To-Do List Menu ===")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Mark Task as Completed")
        print("4. Delete Task")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ")
        
        if choice == '1':
            title = input("Enter task title: ")
            description = input("Enter task description (optional): ")
            todo.add_task(title, description)
        elif choice == '2':
            todo.view_tasks()
        elif choice == '3':
            task_id = int(input("Enter task ID to mark as completed: "))
            todo.mark_completed(task_id)
        elif choice == '4':
            task_id = int(input("Enter task ID to delete: "))
            todo.delete_task(task_id)
        elif choice == '5':
            print("Thank you for using the To-Do List application!")
            break
        else:
            print("Invalid choice! Please try again.")

if __name__ == "__main__":
    main()`,
    language: "python",
    output: `=== To-Do List Menu ===
1. Add Task
2. View Tasks
3. Mark Task as Completed
4. Delete Task
5. Exit

Enter your choice (1-5): 1
Enter task title: Complete Python Project
Enter task description (optional): Finish the todo list application
Task added successfully!

Enter your choice (1-5): 2

Your To-Do List:
--------------------------------------------------
1. [ ] Complete Python Project
   Description: Finish the todo list application
   Created: 2024-03-14 15:30:45
--------------------------------------------------

Enter your choice (1-5): 3
Enter task ID to mark as completed: 1
Task marked as completed!

Enter your choice (1-5): 2

Your To-Do List:
--------------------------------------------------
1. [✓] Complete Python Project
   Description: Finish the todo list application
   Created: 2024-03-14 15:30:45
--------------------------------------------------

Enter your choice (1-5): 5
Thank you for using the To-Do List application!`
  },
  {
    name: "Password Generator",
    description: "A customizable password generator that creates strong, random passwords based on user preferences",
    code: String.raw`import random
import string
import pyperclip  # Install using 'pip install pyperclip'

def generate_password(length=12, use_digits=True, use_special=True, use_upper=True):
    # Define character sets
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase if use_upper else ""
    digits = string.digits if use_digits else ""
    special = string.punctuation if use_special else ""
    
    all_chars = lower + upper + digits + special
    
    if not all_chars:
        return "Error: No character set selected!"
    
    # Generate password
    password = "".join(random.choice(all_chars) for _ in range(length))
    
    # Ensure at least one character from each selected set
    if use_upper:
        password = random.choice(string.ascii_uppercase) + password[1:]
    if use_digits:
        password = password[:-1] + random.choice(string.digits)
    if use_special:
        mid = len(password) // 2
        password = password[:mid] + random.choice(string.punctuation) + password[mid+1:]
    
    # Shuffle the final password
    password_list = list(password)
    random.shuffle(password_list)
    return "".join(password_list)

def validate_password_strength(password):
    """Check password strength and return feedback"""
    strength = 0
    feedback = []
    
    if any(c.isupper() for c in password):
        strength += 1
    else:
        feedback.append("Add uppercase letters")
    
    if any(c.islower() for c in password):
        strength += 1
    else:
        feedback.append("Add lowercase letters")
    
    if any(c.isdigit() for c in password):
        strength += 1
    else:
        feedback.append("Add numbers")
    
    if any(c in string.punctuation for c in password):
        strength += 1
    else:
        feedback.append("Add special characters")
    
    if len(password) >= 12:
        strength += 1
    else:
        feedback.append("Make it longer")
    
    return {
        "strength": strength,
        "feedback": feedback,
        "rating": ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][strength]
    }

def main():
    print("🔐 Password Generator 🔐")
    print("------------------------")
    
    while True:
        try:
            length = int(input("\nEnter password length (minimum 8): "))
            if length < 8:
                print("Password length must be at least 8 characters!")
                continue
                
            use_digits = input("Include numbers? (y/n): ").lower() == "y"
            use_special = input("Include special characters? (y/n): ").lower() == "y"
            use_upper = input("Include uppercase letters? (y/n): ").lower() == "y"
            
            num_passwords = int(input("How many passwords to generate? "))
            
            print("\nGenerated Passwords:")
            print("--------------------")
            
            for i in range(num_passwords):
                password = generate_password(length, use_digits, use_special, use_upper)
                strength = validate_password_strength(password)
                
                print(f"\nPassword {i+1}: {password}")
                print(f"Strength: {strength['rating']}")
                if strength['feedback']:
                    print("Suggestions:", ", ".join(strength['feedback']))
                
                if i == 0:  # Copy first password to clipboard
                    pyperclip.copy(password)
                    print("✅ First password copied to clipboard!")
            
            again = input("\nGenerate more passwords? (y/n): ").lower()
            if again != 'y':
                print("\nThank you for using Password Generator!")
                break
                
        except ValueError:
            print("Please enter valid numbers!")
        except Exception as e:
            print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()`,
    language: "python",
    output: `🔐 Password Generator 🔐
------------------------

Enter password length (minimum 8): 16
Include numbers? (y/n): y
Include special characters? (y/n): y
Include uppercase letters? (y/n): y
How many passwords to generate? 3

Generated Passwords:
--------------------

Password 1: Kj9#mP2$nL5@vX4h
Strength: Very Strong
✅ First password copied to clipboard!

Password 2: 7$pQn#K4mR9@jL2v
Strength: Very Strong

Password 3: X2#kL7$vM4@nP9hJ
Strength: Very Strong

Generate more passwords? (y/n): n

Thank you for using Password Generator!`
  },
  {
    name: "Quiz Game",
    description: "A simple quiz game that asks multiple-choice questions and keeps track of the score",
    code: `import json
import random
import tkinter as tk
from tkinter import ttk, messagebox

class QuizGame:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Quiz Game")
        self.window.geometry("600x400")
        
        self.questions = self.load_questions()
        self.current_question = 0
        self.score = 0
        self.setup_gui()
        
    def load_questions(self):
        questions = [
            {
                "question": "What is the capital of France?",
                "options": ["London", "Berlin", "Paris", "Madrid"],
                "correct": 2
            },
            {
                "question": "Which planet is known as the Red Planet?",
                "options": ["Venus", "Mars", "Jupiter", "Saturn"],
                "correct": 1
            },
            {
                "question": "What is the largest mammal in the world?",
                "options": ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                "correct": 1
            }
        ]
        return questions
    
    def setup_gui(self):
        # Question Frame
        self.question_frame = ttk.LabelFrame(self.window, text="Question")
        self.question_frame.pack(padx=20, pady=10, fill="both", expand=True)
        
        self.question_label = ttk.Label(
            self.question_frame,
            wraplength=500,
            font=('Helvetica', 12)
        )
        self.question_label.pack(padx=10, pady=10)
        
        # Options Frame
        self.options_frame = ttk.Frame(self.question_frame)
        self.options_frame.pack(padx=10, pady=10, fill="both")
        
        self.selected_option = tk.IntVar()
        self.option_buttons = []
        
        # Score Label
        self.score_label = ttk.Label(
            self.window,
            text="Score: 0",
            font=('Helvetica', 10)
        )
        self.score_label.pack(pady=10)
        
        # Next Button
        self.next_button = ttk.Button(
            self.window,
            text="Next",
            command=self.check_answer
        )
        self.next_button.pack(pady=10)
        
        # Start the quiz
        self.show_question()
    
    def show_question(self):
        """Display the current question"""
        if self.current_question < len(self.questions):
            question = self.questions[self.current_question]
            self.question_label.config(text=question["question"])
            
            # Clear previous options
            for button in self.option_buttons:
                button.destroy()
            self.option_buttons.clear()
            
            # Create new option buttons
            for i, option in enumerate(question["options"]):
                button = ttk.Radiobutton(
                    self.options_frame,
                    text=option,
                    variable=self.selected_option,
                    value=i
                )
                button.pack(pady=5, anchor="w")
                self.option_buttons.append(button)
                
            self.selected_option.set(-1)  # Reset selection
            
        else:
            self.show_final_score()
    
    def check_answer(self):
        """Check if the selected answer is correct"""
        if self.selected_option.get() == -1:
            messagebox.showwarning("Warning", "Please select an answer!")
            return
            
        correct = self.questions[self.current_question]["correct"]
        if self.selected_option.get() == correct:
            self.score += 1
            self.score_label.config(text=f"Score: {self.score}")
        
        self.current_question += 1
        self.show_question()
    
    def show_final_score(self):
        """Display the final score"""
        for widget in self.question_frame.winfo_children():
            widget.destroy()
        
        final_score = (self.score / len(self.questions)) * 100
        
        ttk.Label(
            self.question_frame,
            text=f"Quiz Complete!\\nFinal Score: {final_score:.1f}%",
            font=('Helvetica', 14, 'bold')
        ).pack(pady=20)
        
        ttk.Button(
            self.question_frame,
            text="Play Again",
            command=self.restart_quiz
        ).pack(pady=10)
        
        self.next_button.destroy()
    
    def restart_quiz(self):
        """Reset the quiz"""
        self.current_question = 0
        self.score = 0
        self.score_label.config(text="Score: 0")
        self.setup_gui()
    
    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    app = QuizGame()
    app.run()`,
    language: "python",
    output: `=== Quiz Game ===

Question 1: What is the capital of France?
Options:
1. London
2. Berlin
3. Paris
4. Madrid

Your answer: 3 (Paris)
Correct! Score: 1

Question 2: Which planet is known as the Red Planet?
Options:
1. Venus
2. Mars
3. Jupiter
4. Saturn

Your answer: 2 (Mars)
Correct! Score: 2

Question 3: What is the largest mammal in the world?
Options:
1. African Elephant
2. Blue Whale
3. Giraffe
4. Polar Bear

Your answer: 2 (Blue Whale)
Correct! Score: 3

Quiz Complete!
Final Score: 100.0%
Play Again?`
  },
  {
    name: "Number Guessing Game",
    description: "A simple game where the player tries to guess a random number",
    code: `import random

def play_game():
    # Generate a random number between 1 and 100
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("Welcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess it.")
    
    while attempts < max_attempts:
        try:
            # Get player's guess
            guess = int(input("\\nEnter your guess: "))
            attempts += 1
            
            # Check the guess
            if guess < 1 or guess > 100:
                print("Please enter a number between 1 and 100.")
                attempts -= 1  # Don't count invalid guesses
            elif guess < secret_number:
                print("Too low!")
                print(f"Attempts remaining: {max_attempts - attempts}")
            elif guess > secret_number:
                print("Too high!")
                print(f"Attempts remaining: {max_attempts - attempts}")
            else:
                print(f"\\nCongratulations! You guessed the number in {attempts} attempts!")
                return True
                
        except ValueError:
            print("Please enter a valid number.")
            attempts -= 1  # Don't count invalid inputs
    
    print(f"\\nGame Over! The number was {secret_number}.")
    return False

def main():
    while True:
        play_game()
        
        # Ask to play again
        while True:
            play_again = input("\\nWould you like to play again? (yes/no): ").lower()
            if play_again in ['yes', 'no']:
                break
            print("Please enter 'yes' or 'no'.")
        
        if play_again == 'no':
            print("Thanks for playing! Goodbye!")
            break

if __name__ == "__main__":
    main()`,
    language: "python",
    output: `Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 10 attempts to guess it.

Enter your guess: 50
Too high!
Attempts remaining: 9

Enter your guess: 25
Too low!
Attempts remaining: 8

Enter your guess: 37
Too low!
Attempts remaining: 7

Enter your guess: 42
Congratulations! You guessed the number in 4 attempts!

Would you like to play again? (yes/no): no
Thanks for playing! Goodbye!`
  }
];

export const intermediateProjects: Project[] = [
  {
    name: "Expense Tracker",
    description: "A GUI-based expense tracking application with database storage and data visualization",
    code: String.raw`import tkinter as tk
from tkinter import ttk, messagebox
import sqlite3
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class ExpenseTracker:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Expense Tracker")
        self.window.geometry("800x600")
        
        # Initialize database
        self.init_database()
        
        # Setup GUI components
        self.setup_gui()
        
    def init_database(self):
        """Initialize SQLite database"""
        self.conn = sqlite3.connect('expenses.db')
        self.cursor = self.conn.cursor()
        
        # Create expenses table if it doesn't exist
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                description TEXT
            )
        ''')
        self.conn.commit()
    
    def setup_gui(self):
        """Setup the GUI components"""
        # Input Frame
        input_frame = ttk.LabelFrame(self.window, text="Add Expense")
        input_frame.pack(padx=20, pady=10, fill="x")
        
        # Date
        ttk.Label(input_frame, text="Date:").grid(row=0, column=0, padx=5, pady=5)
        self.date_entry = ttk.Entry(input_frame)
        self.date_entry.insert(0, datetime.now().strftime("%Y-%m-%d"))
        self.date_entry.grid(row=0, column=1, padx=5, pady=5)
        
        # Category
        ttk.Label(input_frame, text="Category:").grid(row=0, column=2, padx=5, pady=5)
        self.categories = ["Food", "Transport", "Bills", "Shopping", "Entertainment", "Other"]
        self.category_var = tk.StringVar()
        category_combo = ttk.Combobox(input_frame, textvariable=self.category_var, values=self.categories)
        category_combo.grid(row=0, column=3, padx=5, pady=5)
        
        # Amount
        ttk.Label(input_frame, text="Amount:").grid(row=1, column=0, padx=5, pady=5)
        self.amount_entry = ttk.Entry(input_frame)
        self.amount_entry.grid(row=1, column=1, padx=5, pady=5)
        
        # Description
        ttk.Label(input_frame, text="Description:").grid(row=1, column=2, padx=5, pady=5)
        self.desc_entry = ttk.Entry(input_frame)
        self.desc_entry.grid(row=1, column=3, padx=5, pady=5)
        
        # Add Button
        ttk.Button(input_frame, text="Add Expense", command=self.add_expense).grid(
            row=2, column=0, columnspan=4, pady=10)
        
        # Expenses Table
        table_frame = ttk.LabelFrame(self.window, text="Expenses")
        table_frame.pack(padx=20, pady=10, fill="both", expand=True)
        
        # Create Treeview
        self.tree = ttk.Treeview(table_frame, columns=("Date", "Category", "Amount", "Description"),
                                show="headings")
        
        # Set column headings
        self.tree.heading("Date", text="Date")
        self.tree.heading("Category", text="Category")
        self.tree.heading("Amount", text="Amount")
        self.tree.heading("Description", text="Description")
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(table_frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        self.tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Bind delete key
        self.tree.bind("<Delete>", self.delete_expense)
        
        # Summary Frame
        summary_frame = ttk.LabelFrame(self.window, text="Summary")
        summary_frame.pack(padx=20, pady=10, fill="x")
        
        self.total_label = ttk.Label(summary_frame, text="Total Expenses: $0.00")
        self.total_label.pack(pady=5)
        
        # Load existing expenses
        self.load_expenses()
        
    def add_expense(self):
        """Add new expense to database"""
        try:
            date = self.date_entry.get()
            category = self.category_var.get()
            amount = float(self.amount_entry.get())
            description = self.desc_entry.get()
            
            # Insert into database
            self.cursor.execute('''
                INSERT INTO expenses (date, category, amount, description)
                VALUES (?, ?, ?, ?)
            ''', (date, category, amount, description))
            self.conn.commit()
            
            # Clear entries
            self.amount_entry.delete(0, tk.END)
            self.desc_entry.delete(0, tk.END)
            
            # Reload expenses
            self.load_expenses()
            
            messagebox.showinfo("Success", "Expense added successfully!")
            
        except ValueError:
            messagebox.showerror("Error", "Please enter a valid amount!")
    
    def load_expenses(self):
        """Load expenses from database"""
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Load from database
        self.cursor.execute("SELECT date, category, amount, description FROM expenses")
        expenses = self.cursor.fetchall()
        
        # Insert into treeview
        total = 0
        for expense in expenses:
            self.tree.insert("", tk.END, values=expense)
            total += expense[2]
        
        # Update total
        self.total_label.config(text="Total Expenses: $%.2f" % total)
        
        # Update chart
        self.update_chart()
    
    def delete_expense(self, event=None):
        """Delete selected expense"""
        selected_item = self.tree.selection()
        if not selected_item:
            return
        
        if messagebox.askyesno("Confirm", "Delete selected expense?"):
            # Get the values of the selected item
            values = self.tree.item(selected_item)['values']
            
            # Delete from database
            self.cursor.execute('''
                DELETE FROM expenses 
                WHERE date=? AND category=? AND amount=? AND description=?
            ''', values)
            self.conn.commit()
            
            # Reload expenses
            self.load_expenses()
    
    def update_chart(self):
        """Update the expense chart"""
        # Get expenses by category
        self.cursor.execute('''
            SELECT category, SUM(amount) 
            FROM expenses 
            GROUP BY category
        ''')
        data = self.cursor.fetchall()
        
        if data:
            categories = [row[0] for row in data]
            amounts = [row[1] for row in data]
            
            # Create pie chart
            plt.figure(figsize=(6,4))
            plt.pie(amounts, labels=categories, autopct='%1.1f%%')
            plt.title("Expenses by Category")
            
            # Show plot
            plt.show()
    
    def run(self):
        """Run the application"""
        self.window.mainloop()

if __name__ == "__main__":
    app = ExpenseTracker()
    app.run()`,
    language: "python",
    output: `=== Expense Tracker ===

[GUI Window Launched]

Added Expense:
Date: 2024-03-14
Category: Food
Amount: $25.50
Description: Lunch with colleagues

Added Expense:
Date: 2024-03-14
Category: Transport
Amount: $15.00
Description: Taxi fare

Current Summary:
Total Expenses: $40.50

Expenses by Category:
- Food: 63%
- Transport: 37%

[Displaying pie chart visualization]`
  },
  {
    name: "Command-line To-Do List",
    description: "A persistent to-do list application with file storage that allows users to manage tasks through the command line",
    code: String.raw`import os

TASKS_FILE = "tasks.txt"

def load_tasks():
    if not os.path.exists(TASKS_FILE):
        return []
    with open(TASKS_FILE, "r") as file:
        return file.read().splitlines()

def save_tasks(tasks):
    with open(TASKS_FILE, "w") as file:
        file.write("\n".join(tasks))

def display_tasks(tasks):
    if not tasks:
        print("No tasks available.")
    else:
        print("\nYour To-Do List:")
        for i, task in enumerate(tasks, start=1):
            print(f"{i}. {task}")

def main():
    tasks = load_tasks()
    while True:
        print("\nOptions: [1] Add [2] Remove [3] View [4] Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            task = input("Enter task: ")
            tasks.append(task)
            save_tasks(tasks)
            print("Task added!")
        elif choice == "2":
            display_tasks(tasks)
            try:
                index = int(input("Enter task number to remove: ")) - 1
                if 0 <= index < len(tasks):
                    removed_task = tasks.pop(index)
                    save_tasks(tasks)
                    print(f"Removed: {removed_task}")
                else:
                    print("Invalid number!")
            except ValueError:
                print("Enter a valid number.")
        elif choice == "3":
            display_tasks(tasks)
        elif choice == "4":
            print("Exiting...")
            break
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    main()`,
    language: "python",
    output: `=== Command-line To-Do List ===

Options: [1] Add [2] Remove [3] View [4] Exit
Enter your choice: 1
Enter task: Complete Python project
Task added!

Options: [1] Add [2] Remove [3] View [4] Exit
Enter your choice: 1
Enter task: Review code changes
Task added!

Options: [1] Add [2] Remove [3] View [4] Exit
Enter your choice: 3

Your To-Do List:
1. Complete Python project
2. Review code changes

Options: [1] Add [2] Remove [3] View [4] Exit
Enter your choice: 2
Your To-Do List:
1. Complete Python project
2. Review code changes
Enter task number to remove: 1
Removed: Complete Python project

Options: [1] Add [2] Remove [3] View [4] Exit
Enter your choice: 3

Your To-Do List:
1. Review code changes

Options: [1] Add [2] Remove [3] View [4] Exit
Enter your choice: 4
Exiting...`
  }
];

export const advancedProjects: Project[] = [
  {
    name: "AI-Powered Chatbot",
    description: "A chatbot that understands and responds to user queries using Natural Language Processing (NLP)",
    code: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import json
import random
import openai
from flask import Flask, request, jsonify

class ChatBot:
    def __init__(self):
        # Download required NLTK data
        nltk.download('punkt')
        nltk.download('stopwords')
        nltk.download('wordnet')
        
        # Initialize NLTK tools
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        
        # Load training data
        self.intents = json.loads(open('intents.json').read())
        
        # Initialize OpenAI (for advanced queries)
        openai.api_key = 'YOUR_API_KEY'
        
        # Initialize conversation context
        self.context = []
    
    def preprocess_text(self, text):
        # Tokenize and lemmatize input
        tokens = word_tokenize(text.lower())
        tokens = [self.lemmatizer.lemmatize(token) 
                 for token in tokens 
                 if token not in self.stop_words]
        return tokens
    
    def get_intent(self, tokens):
        # Match input tokens with intents
        for intent in self.intents['intents']:
            for pattern in intent['patterns']:
                pattern_tokens = self.preprocess_text(pattern)
                if all(token in pattern_tokens for token in tokens):
                    return intent
        return None
    
    def get_openai_response(self, query):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": query}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error getting AI response: {str(e)}"
    
    def get_response(self, text):
        # Preprocess input text
        tokens = self.preprocess_text(text)
        
        # Get matching intent
        intent = self.get_intent(tokens)
        
        if intent:
            # Use predefined responses for known intents
            response = random.choice(intent['responses'])
            
            # Update context
            self.context.append({
                'intent': intent['tag'],
                'input': text,
                'response': response
            })
            
            return response
        else:
            # Use OpenAI for unknown queries
            response = self.get_openai_response(text)
            
            # Update context
            self.context.append({
                'intent': 'unknown',
                'input': text,
                'response': response
            })
            
            return response

# Flask web application
app = Flask(__name__)
chatbot = ChatBot()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400
    
    response = chatbot.get_response(data['message'])
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)

# Example intents.json structure:
"""
{
    "intents": [
        {
            "tag": "greeting",
            "patterns": ["hi", "hello", "hey"],
            "responses": ["Hello!", "Hi there!", "Hey!"]
        },
        {
            "tag": "weather",
            "patterns": ["what's the weather", "weather forecast"],
            "responses": ["Let me check the weather for you..."]
        }
    ]
}
"""`,
    language: "python",
    output: `=== AI Chatbot Demo ===

User: Hello there!
Bot: Hi there! How can I help you today?

User: What's the weather like?
Bot: Let me check the weather for you...
[Fetching weather data...]
Current weather in London: 18°C, Partly Cloudy

User: Tell me a joke
Bot: Here's one: Why don't programmers like nature? It has too many bugs!

User: What is machine learning?
Bot: Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.`
  },
  {
    name: "Automated Resume Screener",
    description: "A tool that scans resumes and ranks them based on job requirements",
    code: `import spacy
import docx2txt
import PyPDF2
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from flask import Flask, request, jsonify

class ResumeScreener:
    def __init__(self):
        # Load SpaCy model
        self.nlp = spacy.load('en_core_web_lg')
        
        # Initialize vectorizer
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
        # Common skills database
        self.skills_db = self.load_skills_database()
        
    def load_skills_database(self):
        """Load predefined skills database"""
        # This would typically load from a JSON/CSV file
        return {
            'programming': ['python', 'java', 'javascript', 'c++', 'ruby'],
            'web': ['html', 'css', 'react', 'angular', 'node.js'],
            'database': ['sql', 'mongodb', 'postgresql', 'mysql'],
            'tools': ['git', 'docker', 'kubernetes', 'jenkins'],
            'soft_skills': ['leadership', 'communication', 'teamwork']
        }
    
    def extract_text_from_pdf(self, pdf_path):
        """Extract text from PDF file"""
        text = ""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
        except Exception as e:
            print(f"Error extracting PDF text: {str(e)}")
        return text
    
    def extract_text_from_docx(self, docx_path):
        """Extract text from DOCX file"""
        try:
            text = docx2txt.process(docx_path)
            return text
        except Exception as e:
            print(f"Error extracting DOCX text: {str(e)}")
            return ""
    
    def extract_text(self, file_path):
        """Extract text based on file type"""
        if file_path.endswith('.pdf'):
            return self.extract_text_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            return self.extract_text_from_docx(file_path)
        else:
            return ""
    
    def extract_skills(self, text):
        """Extract skills from text"""
        skills = []
        doc = self.nlp(text.lower())
        
        # Extract skills using pattern matching and NER
        for category, skill_list in self.skills_db.items():
            for skill in skill_list:
                if skill in text.lower():
                    skills.append(skill)
        
        # Extract additional skills using NER
        for ent in doc.ents:
            if ent.label_ in ['ORG', 'PRODUCT']:
                skills.append(ent.text)
        
        return list(set(skills))
    
    def extract_education(self, text):
        """Extract education information"""
        education = []
        education_keywords = ['bachelor', 'master', 'phd', 'degree']
        
        doc = self.nlp(text)
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in education_keywords):
                education.append(sent.text.strip())
        
        return education
    
    def extract_experience(self, text):
        """Extract work experience"""
        experience = []
        doc = self.nlp(text)
        
        # Look for date patterns and job titles
        for sent in doc.sents:
            if re.search(r'\\d{4}', sent.text):  # Contains year
                experience.append(sent.text.strip())
        
        return experience
    
    def calculate_similarity(self, job_description, resume_text):
        """Calculate similarity between job description and resume"""
        texts = [job_description, resume_text]
        tfidf_matrix = self.vectorizer.fit_transform(texts)
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return similarity
    
    def rank_resumes(self, job_description, resume_files):
        """Rank resumes based on job description"""
        rankings = []
        
        for resume_file in resume_files:
            resume_text = self.extract_text(resume_file)
            
            # Extract information
            skills = self.extract_skills(resume_text)
            education = self.extract_education(resume_text)
            experience = self.extract_experience(resume_text)
            
            # Calculate similarity
            similarity = self.calculate_similarity(job_description, resume_text)
            
            # Calculate score (weighted average)
            required_skills = self.extract_skills(job_description)
            skill_match = len(set(skills) & set(required_skills)) / len(required_skills)
            
            score = (similarity * 0.4 + skill_match * 0.6) * 100
            
            rankings.append({
                'file': resume_file,
                'score': score,
                'skills': skills,
                'education': education,
                'experience': experience,
                'similarity': similarity
            })
        
        # Sort by score
        rankings.sort(key=lambda x: x['score'], reverse=True)
        return rankings
    
    def generate_report(self, rankings, job_description):
        """Generate detailed screening report"""
        report = {
            'job_analysis': {
                'required_skills': self.extract_skills(job_description),
                'total_candidates': len(rankings),
                'average_score': sum(r['score'] for r in rankings) / len(rankings)
            },
            'candidate_rankings': rankings,
            'recommendations': []
        }
        
        # Add recommendations
        for rank in rankings[:3]:  # Top 3 candidates
            report['recommendations'].append({
                'file': rank['file'],
                'score': rank['score'],
                'strengths': [
                    skill for skill in rank['skills'] 
                    if skill in report['job_analysis']['required_skills']
                ],
                'missing_skills': [
                    skill for skill in report['job_analysis']['required_skills'] 
                    if skill not in rank['skills']
                ]
            })
        
        return report

# Flask web application
app = Flask(__name__)
screener = ResumeScreener()

@app.route('/screen', methods=['POST'])
def screen_resumes():
    try:
        data = request.get_json()
        job_description = data['job_description']
        resume_files = data['resume_files']
        
        rankings = screener.rank_resumes(job_description, resume_files)
        report = screener.generate_report(rankings, job_description)
        
        return jsonify(report)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)`,
    language: "python",
    output: `=== Resume Screening Results ===

Job Analysis:
Required Skills: ['python', 'machine learning', 'sql', 'data analysis']
Total Candidates: 3
Average Score: 75.5

Top Candidates:
1. candidate1.pdf (Score: 92.5)
   Strengths: python, machine learning, sql
   Missing Skills: data analysis
   Education: Master's in Computer Science
   Experience: 3 years ML Engineer

2. candidate2.pdf (Score: 85.0)
   Strengths: python, data analysis, sql
   Missing Skills: machine learning
   Education: Bachelor's in Data Science
   Experience: 2 years Data Analyst

3. candidate3.pdf (Score: 49.0)
   Strengths: python, sql
   Missing Skills: machine learning, data analysis
   Education: Bachelor's in Computer Engineering
   Experience: 1 year Software Developer

[Generated detailed PDF report with visualizations]`
  }
  // Add other advanced projects here...
];

export const difficultyLevels = [
  {
    title: "Beginner",
    description: "Start with the basics",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-green-500/20 to-emerald-500/20",
    projects: beginnerProjects
  },
  {
    title: "Intermediate",
    description: "Build on your knowledge",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    projects: intermediateProjects
  },
  {
    title: "Advanced",
    description: "Challenge yourself",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    projects: advancedProjects
  }
];
