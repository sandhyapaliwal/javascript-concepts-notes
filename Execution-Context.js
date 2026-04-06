# Execution Context & Scope Chain in JavaScript

## 📌 Overview

Before any JavaScript code runs, an **Execution Context** is created.

It defines:

* How variables are stored
* How functions are executed
* How scope works

---

## 🧠 What is Execution Context?

An **Execution Context** is the environment in which JavaScript code is executed.

### Types of Execution Context:

1. **Global Execution Context (GEC)**
2. **Function Execution Context (FEC)**

---

## 🌍 Global Execution Context (GEC)

* Created when the JavaScript file first runs
* It is the default execution context
* `this` refers to the global object (in browser → `window`)

### Example:

```javascript
var a = 10;

function greet() {
  console.log("Hello");
}
```

👉 Here:

* `a` and `greet()` are stored in global memory

---

## ⚙️ Function Execution Context (FEC)

* A new execution context is created every time a function is invoked

### Example:

```javascript
function add(x, y) {
  return x + y;
}

add(2, 3);
```

👉 When `add()` is called:

* A new execution context is created
* `x = 2`, `y = 3` are initialized

---

## 🔄 Phases of Execution Context

Each execution context has two phases:

### 1. Memory Creation Phase (Creation Phase)

* Variables are initialized with `undefined`
* Functions are stored with their full definitions

### 2. Execution Phase

* Code executes line by line
* Variables are assigned actual values

---

## 🧪 Example

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

👉 During Creation Phase:

* `a = undefined`
* `test = function`
* Inside function → `b = undefined`

👉 During Execution Phase:

* `console.log(a)` → undefined
* `console.log(b)` → undefined

---

## 🧬 Scope in JavaScript

Scope determines where variables can be accessed.

### Types of Scope:

* Global Scope
* Function Scope
* Block Scope (`let`, `const`)

---

## 🔗 Scope Chain

The **Scope Chain** is the mechanism JavaScript uses to resolve variables.

👉 If a variable is not found in the current scope:
➡️ It searches in the parent scope
➡️ Then continues upward
➡️ Until it reaches the global scope

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

* `c` → found in inner function
* `b` → found in outer function
* `a` → found in global scope

👉 This is how the **Scope Chain** works

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

👉 JavaScript searches the entire scope chain but cannot find `x`

---

## 🔁 Execution Context Stack (Call Stack)

* Execution contexts are managed using a stack
* When a function is called → pushed to stack
* When it finishes → popped from stack

---

## ⚖️ var vs let vs const (Scope)

| Keyword | Scope    | Hoisting Behavior                    |
| ------- | -------- | ------------------------------------ |
| var     | Function | Hoisted (initialized as `undefined`) |
| let     | Block    | Hoisted (in Temporal Dead Zone)      |
| const   | Block    | Hoisted (in Temporal Dead Zone)      |

---

## 🚨 Common Interview Questions

### 1. What is Execution Context?

👉 The environment where JavaScript code runs

### 2. Difference between GEC and FEC?

👉 GEC is global, FEC is created for each function call

### 3. What is Scope Chain?

👉 A mechanism for resolving variables across nested scopes

### 4. What is Hoisting?

👉 Variables and functions are moved to memory during creation phase

---

