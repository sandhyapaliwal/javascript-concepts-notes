# Control Flow in JavaScript

## 📌 Overview

Control flow in JavaScript refers to the **order in which statements are executed** in a program.

By default, JavaScript executes code from top to bottom, but using control flow statements, we can change this order based on conditions, loops, or function calls.

---

## 🎯 What is Control Flow?

```javascript
console.log("1");  // Executes first
console.log("2");  // Executes second
console.log("3");  // Executes third
```

This is the default flow - **top to bottom**.

But we can change it:

```javascript
console.log("1");

if (true) {
  console.log("2");  // Conditional execution
}

for (let i = 0; i < 2; i++) {
  console.log("3");  // Repeated execution
}

function test() {
  console.log("4");  // Function call
}
test();
```

---

## 📚 Types of Control Flow

1. **Conditional Statements** - Execute based on conditions
2. **Loops** - Repeat code multiple times
3. **Jump Statements** - Control loop and function flow
4. **Error Handling** - Handle runtime errors
5. **Function Flow** - Control execution via functions

---

## 1️⃣ Conditional Statements

Execute code based on conditions.

### if Statement

```javascript
const age = 18;

if (age >= 18) {
    console.log("You are eligible to vote");
}
```

### if...else

```javascript
const age = 16;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

### if...else if...else

```javascript
const marks = 75;

if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 70) {
    console.log("Grade B");  // This executes
} else if (marks >= 50) {
    console.log("Grade C");
} else {
    console.log("Fail");
}
```

### switch Statement

```javascript
const day = 2;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");  // This executes
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Invalid day");
}
```

**Important:** Always use `break` to prevent fall-through!

### Ternary Operator (Shorthand)

```javascript
const age = 20;
const result = age >= 18 ? "Adult" : "Minor";
console.log(result); // "Adult"
```

### Nested Conditionals

```javascript
const age = 25;
const hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("Can drive");
    } else {
        console.log("Get a license first");
    }
} else {
    console.log("Too young to drive");
}
```

---

## 2️⃣ Loops

Used to repeat code multiple times.

### for Loop

The most common loop - **used when you know the number of iterations**.

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);  // 1, 2, 3, 4, 5
}
```

**Parts:**
- `let i = 1` - Initialization
- `i <= 5` - Condition
- `i++` - Update

### while Loop

**Continues while condition is true**.

```javascript
let i = 1;

while (i <= 5) {
    console.log(i);  // 1, 2, 3, 4, 5
    i++;
}
```

### do...while Loop

**Executes at least once, then checks condition**.

```javascript
let i = 1;

do {
    console.log(i);  // Always runs at least once
    i++;
} while (i <= 5);
```

### for...of Loop

**Iterates over array values** (not indices).

```javascript
const arr = [10, 20, 30];

for (const value of arr) {
    console.log(value);  // 10, 20, 30
}

// Works with strings too
for (const char of "hello") {
    console.log(char);  // h, e, l, l, o
}
```

### for...in Loop

**Iterates over object keys**.

```javascript
const user = {
    name: "Sandhya",
    age: 22,
    city: "Delhi"
};

for (const key in user) {
    console.log(key, user[key]);
    // name Sandhya
    // age 22
    // city Delhi
}
```

### Comparison: for, for...of, for...in

| Loop | Best For | Returns |
|------|----------|---------|
| `for` | Known iterations | Index |
| `for...of` | Array values | Value |
| `for...in` | Object keys | Key |
| `while` | Unknown iterations | N/A |

---

## 3️⃣ Jump Statements

Control the flow inside loops or functions.

### break Statement

**Stops the loop immediately**.

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        break;  // Exit loop
    }
    console.log(i);  // 1, 2
}
```

Real-world example:

```javascript
function searchArray(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            console.log("Found at index:", i);
            break;  // Stop searching once found
        }
    }
}

searchArray([1, 2, 3, 4, 5], 3);  // Found at index: 2
```

### continue Statement

**Skips current iteration and moves to the next**.

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue;  // Skip this iteration
    }
    console.log(i);  // 1, 2, 4, 5
}
```

Real-world example:

```javascript
const arr = [1, 2, 3, 4, 5];

for (const num of arr) {
    if (num % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(num);  // 1, 3, 5 (odd numbers only)
}
```

### return Statement

**Exits from a function**.

```javascript
function sum(a, b) {
    return a + b;  // Exit function and return value
}

console.log(sum(2, 3));  // 5
```

With early return:

```javascript
function validateAge(age) {
    if (age < 0) {
        return "Invalid age";  // Exit early
    }
    if (age < 18) {
        return "Minor";
    }
    return "Adult";
}

console.log(validateAge(-5));   // "Invalid age"
console.log(validateAge(15));   // "Minor"
console.log(validateAge(25));   // "Adult"
```

---

## 4️⃣ Error Handling

Handle runtime errors gracefully.

### try...catch

```javascript
try {
    let result = x + 10;  // x is not defined
} catch (error) {
    console.log("Error occurred:", error.message);
    // Error occurred: x is not defined
}
```

### finally

**Runs regardless of success or failure**.

```javascript
try {
    console.log("Try block");
} catch (error) {
    console.log("Error block");
} finally {
    console.log("Always runs");
}

// Output:
// Try block
// Always runs
```

Real-world example:

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
    } finally {
        console.log("Request completed");
    }
}
```

### throw

**Throw custom errors**.

```javascript
function checkAge(age) {
    if (age < 0) {
        throw new Error("Age cannot be negative");
    }
    if (age < 18) {
        throw new Error("Must be 18 or older");
    }
    return "Valid age";
}

try {
    checkAge(15);
} catch (error) {
    console.log("Error:", error.message);
    // Error: Must be 18 or older
}
```

---

## 5️⃣ Function Flow

Functions control execution flow by calling and returning values.

```javascript
function greet() {
    console.log("Hello");
}

function start() {
    greet();  // Call another function
    console.log("Welcome");
}

start();

// Output:
// Hello
// Welcome
```

### Function Execution Order

```javascript
console.log("Start");

function first() {
    console.log("Inside first");
    second();  // Call second function
}

function second() {
    console.log("Inside second");
}

first();

console.log("End");

// Output:
// Start
// Inside first
// Inside second
// End
```

---

## 🧪 Complete Control Flow Example

```javascript
console.log("=== Bank Account System ===");

function processAccount(balance, amount, operation) {
    // Validation (conditional)
    if (balance < 0) {
        throw new Error("Invalid balance");
    }

    let newBalance = balance;

    // Control flow based on operation
    if (operation === "deposit") {
        newBalance += amount;
        console.log(`Deposited: ${amount}`);
    } else if (operation === "withdraw") {
        if (amount > balance) {
            throw new Error("Insufficient funds");
        }
        newBalance -= amount;
        console.log(`Withdrawn: ${amount}`);
    } else {
        console.log("Invalid operation");
        return balance;
    }

    return newBalance;
}

// Try-catch for error handling
try {
    let balance = 1000;
    
    balance = processAccount(balance, 200, "deposit");
    console.log("Balance:", balance);  // 1200
    
    balance = processAccount(balance, 500, "withdraw");
    console.log("Balance:", balance);  // 700
    
    // This will throw error
    balance = processAccount(balance, 1000, "withdraw");
} catch (error) {
    console.log("Error:", error.message);
}
```

---



## 🧩 Key Takeaways

- ✅ Control flow determines execution order
- ✅ Use `if/else` for conditions
- ✅ Use loops (`for`, `while`, `for...of`) to repeat code
- ✅ Use `break` to exit loops
- ✅ Use `continue` to skip iterations
- ✅ Use `try/catch/finally` for error handling
- ✅ Functions control execution through calls and returns
- ✅ Choose right loop type for your use case

---

## 🎓 Best Practices

- [ ] Always use `break` in switch statements
- [ ] Use meaningful variable names in loops
- [ ] Prefer `for...of` over `for` for arrays
- [ ] Always handle errors with try/catch
- [ ] Use early returns to exit functions
- [ ] Keep nesting levels shallow
- [ ] Use ternary for simple conditions
- [ ] Test edge cases and boundary conditions

---


