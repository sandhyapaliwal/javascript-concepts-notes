# Loops in JavaScript

## 📌 Overview

Loops are used to **execute a block of code repeatedly** until a condition is met.

They help reduce redundancy and make code efficient by automating repetitive tasks.

---

## 🎯 Why Use Loops?

Instead of writing the same code multiple times:

```javascript
// ❌ WITHOUT LOOP
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

Use a loop:

```javascript
// ✅ WITH LOOP
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Much cleaner and scalable!

---

## 1️⃣ for Loop

**Used when the number of iterations is known.**

### Syntax

```javascript
for (initialization; condition; update) {
  // code to execute
}
```

### Example 1: Simple Count

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Output: 0, 1, 2, 3, 4
```

**Breakdown:**
- `let i = 0` - Start at 0
- `i < 5` - Continue while i is less than 5
- `i++` - Increment i by 1 each iteration

### Example 2: Iterate Over Array

```javascript
const arr = ["apple", "banana", "cherry"];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Output:
// apple
// banana
// cherry
```

### Example 3: Nested Loops

```javascript
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(`i=${i}, j=${j}`);
  }
}

// Output:
// i=1, j=1
// i=1, j=2
// i=2, j=1
// i=2, j=2
// i=3, j=1
// i=3, j=2
```

### Example 4: Multiplication Table

```javascript
const num = 5;

for (let i = 1; i <= 10; i++) {
  console.log(`${num} × ${i} = ${num * i}`);
}

// Output:
// 5 × 1 = 5
// 5 × 2 = 10
// ...
// 5 × 10 = 50
```

---

## 2️⃣ while Loop

**Executes code as long as the condition is true.**

Used when the number of iterations is **unknown**.

### Syntax

```javascript
while (condition) {
  // code to execute
}
```

### Example 1: Simple Counter

```javascript
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}

// Output: 0, 1, 2, 3, 4
```

### Example 2: User Input Loop

```javascript
let password = "";

while (password !== "secret") {
  password = prompt("Enter password:");
  if (password !== "secret") {
    alert("Wrong password, try again");
  }
}

alert("Access granted!");
```

### Example 3: Process Data Until Condition

```javascript
let number = 100;

while (number > 0) {
  console.log(number);
  number = number / 2;
}

// Output: 100, 50, 25, 12.5, 6.25, 3.125, 1.5625, 0.78125
```

---

## 3️⃣ do...while Loop

**Executes code at least once, then checks the condition.**

The code inside always runs **at minimum once**.

### Syntax

```javascript
do {
  // code to execute
} while (condition);
```

### Example 1: Simple Count

```javascript
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 5);

// Output: 0, 1, 2, 3, 4
```

### Example 2: Menu System

```javascript
let choice;

do {
  choice = prompt("1. Play\n2. Settings\n3. Exit");
  
  switch (choice) {
    case "1":
      console.log("Starting game...");
      break;
    case "2":
      console.log("Opening settings...");
      break;
    case "3":
      console.log("Exiting...");
      break;
  }
} while (choice !== "3");
```

### do...while vs while

```javascript
let i = 10;

// while - checks condition first
while (i < 5) {
  console.log(i);  // Never runs (i is 10, not < 5)
}

// do...while - runs at least once
do {
  console.log(i);  // Runs once (i = 10)
} while (i < 5);
```

---

## 4️⃣ for...of Loop

**Iterates over iterable values** (arrays, strings, etc.).

Does NOT use index - great for getting **values** directly.

### Syntax

```javascript
for (const value of iterable) {
  // code to execute
}
```

### Example 1: Array Values

```javascript
const arr = [10, 20, 30];

for (const value of arr) {
  console.log(value);
}

// Output: 10, 20, 30
```

### Example 2: String Characters

```javascript
const str = "hello";

for (const char of str) {
  console.log(char);
}

// Output: h, e, l, l, o
```

### Example 3: With Objects in Array

```javascript
const users = [
  { name: "Aman", age: 25 },
  { name: "Riya", age: 22 },
  { name: "Sandhya", age: 23 }
];

for (const user of users) {
  console.log(`${user.name} is ${user.age} years old`);
}

// Output:
// Aman is 25 years old
// Riya is 22 years old
// Sandhya is 23 years old
```

---

## 5️⃣ for...in Loop

**Iterates over object keys** (and array indices).

### Syntax

```javascript
for (const key in object) {
  // code to execute
}
```

### Example 1: Object Keys

```javascript
const user = {
  name: "Sandhya",
  age: 22,
  city: "Delhi"
};

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}

// Output:
// name: Sandhya
// age: 22
// city: Delhi
```

### Example 2: Array Indices

```javascript
const fruits = ["apple", "banana", "cherry"];

for (const index in fruits) {
  console.log(`${index}: ${fruits[index]}`);
}

// Output:
// 0: apple
// 1: banana
// 2: cherry
```

### for...of vs for...in

```javascript
const arr = ["a", "b", "c"];

// for...of - gets values
for (const value of arr) {
  console.log(value);  // a, b, c
}

// for...in - gets indices/keys
for (const index in arr) {
  console.log(index);  // 0, 1, 2
}
```

---

## 🛑 break Statement

**Stops the loop immediately.**

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break;  // Exit loop when i = 3
  }
  console.log(i);
}

// Output: 0, 1, 2
```

### Real-World Example: Search

```javascript
function findNumber(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      console.log(`Found at index ${i}`);
      break;  // Stop searching once found
    }
  }
}

findNumber([1, 2, 3, 4, 5], 3);  // Found at index 2
```

---

## ⏭️ continue Statement

**Skips the current iteration and moves to the next one.**

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;  // Skip i = 2
  }
  console.log(i);
}

// Output: 0, 1, 3, 4
```

### Real-World Example: Filter

```javascript
const numbers = [1, 2, 3, 4, 5];

console.log("Odd numbers:");
for (const num of numbers) {
  if (num % 2 === 0) {
    continue;  // Skip even numbers
  }
  console.log(num);
}

// Output:
// Odd numbers:
// 1
// 3
// 5
```

---

## 📊 Loop Comparison

| Loop | Best For | Syntax | Gets |
|------|----------|--------|------|
| `for` | Known iterations | `for(init; cond; update)` | Index |
| `while` | Unknown iterations | `while(cond)` | N/A |
| `do...while` | Run at least once | `do {} while(cond)` | N/A |
| `for...of` | Array values | `for(value of arr)` | Value |
| `for...in` | Object keys | `for(key in obj)` | Key |

---

## 🧪 Practical Examples

### Example 1: Sum Array

```javascript
const numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (const num of numbers) {
  sum += num;
}

console.log("Sum:", sum);  // 15
```

### Example 2: Count Occurrences

```javascript
const str = "hello world";
let count = 0;

for (const char of str) {
  if (char === "l") {
    count++;
  }
}

console.log("'l' appears", count, "times");  // 'l' appears 3 times
```

### Example 3: Create Table

```javascript
for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += "* ";
  }
  console.log(row);
}

// Output:
// * * * * *
// * * * * *
// * * * * *
// * * * * *
// * * * * *
```

### Example 4: Reverse String

```javascript
const str = "javascript";
let reversed = "";

for (let i = str.length - 1; i >= 0; i--) {
  reversed += str[i];
}

console.log(reversed);  // tpircsavaj
```

### Example 5: Process Multiple Data

```javascript
const users = [
  { name: "Aman", score: 85 },
  { name: "Riya", score: 92 },
  { name: "Sandhya", score: 78 }
];

for (const user of users) {
  let grade;
  
  if (user.score >= 90) {
    grade = "A";
  } else if (user.score >= 80) {
    grade = "B";
  } else {
    grade = "C";
  }
  
  console.log(`${user.name}: ${user.score} (Grade ${grade})`);
}

// Output:
// Aman: 85 (Grade B)
// Riya: 92 (Grade A)
// Sandhya: 78 (Grade C)
```

---

## 🚨 Common Mistakes

### Mistake 1: Infinite Loop

```javascript
// ❌ INFINITE LOOP - Never use this!
while (true) {
  console.log("This runs forever!");
}

// ✅ CORRECT - Has exit condition
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

### Mistake 2: Forgetting Increment

```javascript
// ❌ INFINITE LOOP
for (let i = 0; i < 5; ) {
  console.log(i);
  // Missing i++
}

// ✅ CORRECT
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### Mistake 3: Off-by-One Error

```javascript
const arr = [1, 2, 3];

// ❌ WRONG - Tries to access arr[3] which is undefined
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}

// ✅ CORRECT
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```


## 🧩 Key Takeaways

- ✅ Use `for` when iterations are known
- ✅ Use `while` when condition is unknown
- ✅ Use `do...while` for at-least-once execution
- ✅ Use `for...of` for array values
- ✅ Use `for...in` for object keys
- ✅ Use `break` to exit loops
- ✅ Use `continue` to skip iterations
- ✅ Avoid infinite loops!

---

## 🎓 Best Practices

- [ ] Choose the right loop for your use case
- [ ] Always have a clear exit condition
- [ ] Use meaningful variable names (i, j, k for indices)
- [ ] Keep nesting levels shallow
- [ ] Test edge cases (empty arrays, single element)
- [ ] Avoid modifying array while looping
- [ ] Use array methods (map, filter) when appropriate
- [ ] Profile performance for large loops

