Control Flow in JavaScript
Overview

Control flow in JavaScript refers to the order in which statements are executed in a program.

By default, JavaScript executes code from top to bottom, but using control flow statements, we can change this order based on conditions, loops, or function calls.

Types of Control Flow
Conditional Statements
Loops
Jump Statements
Error Handling
Function Flow
1. Conditional Statements

Used to execute code based on conditions.

if statement
const age = 18;

if (age >= 18) {
    console.log("You are eligible to vote");
}
if...else
const age = 16;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
if...else if...else
const marks = 75;

if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 70) {
    console.log("Grade B");
} else {
    console.log("Grade C");
}
switch statement
const day = 2;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    default:
        console.log("Invalid day");
}
Ternary Operator

Short form of if...else

const age = 20;

const result = age >= 18 ? "Adult" : "Minor";
console.log(result);
2. Loops

Used to repeat code multiple times.

for loop
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
while loop
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
do...while loop
let i = 1;

do {
    console.log(i);
    i++;
} while (i <= 5);
for...of (for arrays)
const arr = [10, 20, 30];

for (const value of arr) {
    console.log(value);
}
for...in (for objects)
const user = {
    name: "Sandhya",
    age: 22
};

for (const key in user) {
    console.log(key, user[key]);
}
3. Jump Statements

Control the flow inside loops or blocks.

break

Stops the loop

for (let i = 1; i <= 5; i++) {
    if (i === 3) break;
    console.log(i);
}
continue

Skips current iteration

for (let i = 1; i <= 5; i++) {
    if (i === 3) continue;
    console.log(i);
}
return

Exits from a function

function sum(a, b) {
    return a + b;
}

console.log(sum(2, 3));
4. Error Handling

Used to handle runtime errors.

try...catch
try {
    let result = x + 10; // x is not defined
} catch (error) {
    console.log("Error occurred:", error.message);
}
finally
try {
    console.log("Try block");
} catch (error) {
    console.log("Error");
} finally {
    console.log("Always runs");
}
throw
function checkAge(age) {
    if (age < 18) {
        throw new Error("Not allowed");
    }
}

checkAge(16);
5. Function Flow

Functions control execution flow by calling and returning values.

function greet() {
    console.log("Hello");
}

function start() {
    greet();
    console.log("Welcome");
}

start();
Execution Flow Example
console.log("Start");

if (true) {
    console.log("Inside if");
}

for (let i = 1; i <= 2; i++) {
    console.log("Loop:", i);
}

console.log("End");
