Loops in JavaScript
Overview

Loops are used to execute a block of code repeatedly until a condition is met. They help reduce redundancy and make code efficient.

1. for Loop
Definition

Used when the number of iterations is known.

Syntax
for (initialization; condition; update) {
  // code to execute
}
Example
for (let i = 0; i < 5; i++) {
  console.log(i);
}
Output
0
1
2
3
4
2. while Loop
Definition

Executes code as long as the condition is true.

Syntax
while (condition) {
  // code to execute
}
Example
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
3. do...while Loop
Definition

Executes code at least once, then checks the condition.

Syntax
do {
  // code
} while (condition);
Example
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 5);
4. for...of Loop
Definition

Used to iterate over iterable values (arrays, strings, etc.).

Example
const arr = [10, 20, 30];

for (let value of arr) {
  console.log(value);
}
5. for...in Loop
Definition

Used to iterate over object keys.

Example
const user = {
  name: "John",
  age: 25
};

for (let key in user) {
  console.log(key, user[key]);
}
6. break Statement
Definition

Stops the loop immediately.

Example
for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  console.log(i);
}
7. continue Statement
Definition

Skips the current iteration and moves to the next one.

Example
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
