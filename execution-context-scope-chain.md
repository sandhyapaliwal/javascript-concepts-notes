# Execution Context & Scope Chain in JavaScript

## 📌 Overview

Before any JavaScript code runs, an **Execution Context** is created.

It defines:
- How variables are stored
- How functions are executed
- How scope works

---

## 🧠 What is Execution Context?

An **Execution Context** is the environment in which JavaScript code is executed.

### Types of Execution Context:

1. **Global Execution Context (GEC)**
2. **Function Execution Context (FEC)**

---

## 🌍 Global Execution Context (GEC)

- Created when the JavaScript file first runs
- It is the default execution context
- `this` refers to the global object (in browser → `window`)

### Example:

```javascript
var a = 10;
function greet() {
  console.log("Hello");
}
```

👉 Here:
- `a` and `greet()` are stored in global memory

---

## ⚙️ Function Execution Context (FEC)

- A new execution context is created every time a function is invoked

### Example:

```javascript
function add(x, y) {
  return x + y;
}
add(2, 3);
```

👉 When `add()` is called:
- A new execution context is created
- `x = 2`, `y = 3` are initialized

---

## 🔄 Phases of Execution Context

Each execution context has two phases:

### 1. Memory Creation Phase (Creation Phase)

- Variables are initialized with `undefined`
- Functions are stored with their full definitions

### 2. Execution Phase

- Code executes line by line
- Variables are assigned actual values

---

## 🧪 Example of Both Phases

```javascript
console.log(a);
var a = 5;
function test() {
  console.log(b);
  var b = 10;
}
test();
```

### Output:

```
undefined
undefined
```

### Explanation:

👉 During **Creation Phase**:
- `a = undefined`
- `test = function`
- Inside function → `b = undefined`

👉 During **Execution Phase**:
- `console.log(a)` → undefined (because assignment happens later)
- `console.log(b)` → undefined (same reason inside function)

---

## 🧬 Scope in JavaScript

Scope determines where variables can be accessed.

### Types of Scope:

- **Global Scope** - Variables accessible everywhere
- **Function Scope** - Variables accessible only within the function
- **Block Scope** - Variables accessible only within the block (with `let`, `const`)

---

## 🔗 Scope Chain

The **Scope Chain** is the mechanism JavaScript uses to resolve variables.

👉 If a variable is not found in the current scope:
- ➡️ It searches in the parent scope
- ➡️ Then continues upward
- ➡️ Until it reaches the global scope
- ➡️ If not found → **ReferenceError**

---

## 🧪 Scope Chain Example

```javascript
var a = 10;
function outer() {
  var b = 20;
  function inner() {
    var c = 30;
    console.log(a, b, c);
  }
  inner();
}
outer();
```

### Output:

```
10 20 30
```

### Explanation:

- `c` → found in inner function ✅
- `b` → found in outer function ✅
- `a` → found in global scope ✅

👉 This is how the **Scope Chain** works!

---

## 🚫 Reference Error Example

```javascript
function test() {
  console.log(x);
}
test();
```

### Output:

```
ReferenceError: x is not defined
```

👉 JavaScript searches the entire scope chain but cannot find `x`, so it throws an error.

---

## 🔁 Execution Context Stack (Call Stack)

- Execution contexts are managed using a **stack**
- When a function is called → pushed to stack
- When it finishes → popped from stack

### Example:

```javascript
function first() {
  console.log("First");
  second();
}

function second() {
  console.log("Second");
  third();
}

function third() {
  console.log("Third");
}

first();
```

### Call Stack Order:

```
1. Global Execution Context (pushed)
2. first() (pushed)
3. second() (pushed)
4. third() (pushed)
5. third() (popped)
6. second() (popped)
7. first() (popped)
8. Global Execution Context (popped)
```

---

## ⚖️ var vs let vs const (Scope Behavior)

| Keyword | Scope         | Hoisting Behavior                    | Reassignable |
| ------- | ------------- | ------------------------------------ | ------------ |
| `var`   | Function      | Hoisted (initialized as `undefined`) | Yes          |
| `let`   | Block         | Hoisted (in Temporal Dead Zone)      | Yes          |
| `const` | Block         | Hoisted (in Temporal Dead Zone)      | No           |

### Example:

```javascript
function test() {
  if (true) {
    var x = 1;
    let y = 2;
    const z = 3;
  }
  console.log(x);   // 1 (accessible, function scope)
  console.log(y);   // ReferenceError (block scope)
  console.log(z);   // ReferenceError (block scope)
}
test();
```

---

## 🧪 Temporal Dead Zone (TDZ)

Variables declared with `let` and `const` are hoisted but not initialized.

```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;
```

This period between declaration and initialization is called the **Temporal Dead Zone**.

---

## 🚨 Common Interview Questions

### 1. What is Execution Context?

👉 The environment where JavaScript code runs. It contains information about variables, functions, and the value of `this`.

### 2. Difference between GEC and FEC?

👉 **GEC** is created when the script starts and is global. **FEC** is created every time a function is called.

### 3. What is Scope Chain?

👉 A mechanism for resolving variables by searching in the current scope, then parent scopes, up to global scope.

### 4. What is Hoisting?

👉 Variables and functions are moved to the top of their scope during the creation phase. `var` is initialized as `undefined`, while `let` and `const` are hoisted but not initialized (TDZ).

### 5. Why do we get ReferenceError for `let` but not `var`?

👉 `var` is hoisted and initialized as `undefined`, so it doesn't throw an error. `let` and `const` are hoisted but stay in the Temporal Dead Zone until the line of declaration.

---

## 🧩 Key Takeaways

- Every JavaScript code execution happens inside an execution context
- Execution context has two phases: memory creation and execution
- Scope chain helps JavaScript find variables by searching upward
- `var` has function scope, while `let` and `const` have block scope
- Call stack manages execution contexts in a LIFO (Last-In-First-Out) order
- Understanding execution context is crucial for understanding hoisting, closures, and `this` binding
