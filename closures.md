# Closures in JavaScript

## 📌 Overview

A **closure** is a function that has access to variables from its outer (parent) function scope, even after the outer function has finished executing.

Closures are one of the most important concepts in JavaScript and are used everywhere in real-world code.

---

## 🎯 What is a Closure?

A closure happens when an inner function "remembers" variables from its outer function.

```javascript
function outerFunction() {
  let message = "Hello from outer function";
  
  function innerFunction() {
    console.log(message); // inner function remembers message
  }
  
  return innerFunction;
}

const closure = outerFunction();
closure(); // Output: Hello from outer function
```

✔ Even though `outerFunction()` finished executing
✔ `closure` still has access to `message`
✔ This is a **closure**!

---

## 🔍 How Closures Work

```javascript
function outer() {
  let count = 0;  // Variable in outer scope
  
  function inner() {
    count++;  // Access outer variable
    console.log(count);
  }
  
  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

**Execution:**
1. `outer()` is called
2. `inner` function is returned
3. `outer()` finishes executing
4. BUT `count` is still in memory (closure)
5. `counter()` can still access `count`

---

## 🔐 Closure with Private Variables

Closures can be used to create **private variables** that cannot be accessed directly from outside:

```javascript
function createCounter() {
  let count = 0;  // Private variable
  
  return function () {
    count++;
    console.log("Current count:", count);
  };
}

const counter = createCounter();
counter(); // Current count: 1
counter(); // Current count: 2
counter(); // Current count: 3

// Can't access count directly
console.log(count); // ReferenceError
```

✔ `count` is private (only accessible through returned function)
✔ Each call to `createCounter()` creates a new private variable
✔ This is encapsulation!

---

## 👯 Multiple Closure Instances

Each function call creates a new closure with its own memory:

```javascript
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);
const add100 = makeAdder(100);

console.log(add5(2));    // 7 (remembers x = 5)
console.log(add10(2));   // 12 (remembers x = 10)
console.log(add100(2));  // 102 (remembers x = 100)
```

✔ Each closure has its own `x` value
✔ They don't interfere with each other

---

## 🎬 Practical Example: Function Factory

```javascript
function makeMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

console.log(double(5));     // 10
console.log(triple(5));     // 15
console.log(quadruple(5));  // 20
```

Real-world use: Creating reusable functions with preset values

---

## 🔔 Common Interview Example

```javascript
function greeting(name) {
  return function () {
    console.log("Hello " + name);
  };
}

const greetSandhya = greeting("Sandhya");
const greetRahul = greeting("Rahul");

greetSandhya();  // Hello Sandhya
greetRahul();    // Hello Rahul
```

✔ Each closure remembers a different `name`
✔ They have separate memory

---

## ⚠️ Common Interview Question: The Loop Problem

### Problem: var in Loop

```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 1000);
}

// Output (after 1 second):
// var loop: 4
// var loop: 4
// var loop: 4
```

**Why?**
- `var` is function-scoped (not block-scoped)
- All `setTimeout` callbacks share the same `i`
- By the time callbacks run, loop is done and `i = 4`

---

### Solution 1: Use let (Block Scope)

```javascript
for (let j = 1; j <= 3; j++) {
  setTimeout(function () {
    console.log("let loop:", j);
  }, 1000);
}

// Output:
// let loop: 1
// let loop: 2
// let loop: 3
```

✔ `let` is block-scoped
✔ Each iteration creates a new `j`
✔ Each callback closure gets its own `j`

---

### Solution 2: Use IIFE (Immediately Invoked Function Expression)

```javascript
for (var k = 1; k <= 3; k++) {
  (function (num) {
    setTimeout(function () {
      console.log("IIFE loop:", num);
    }, 1000);
  })(k);
}

// Output:
// IIFE loop: 1
// IIFE loop: 2
// IIFE loop: 3
```

✔ IIFE creates a new function scope for each iteration
✔ Each closure gets its own `num`

---

## 📚 Real-World Use Cases

### 1. Data Encapsulation (Module Pattern)

```javascript
const calculator = (function () {
  let result = 0;  // Private variable
  
  return {
    add: function (x) {
      result += x;
      return result;
    },
    subtract: function (x) {
      result -= x;
      return result;
    },
    getResult: function () {
      return result;
    }
  };
})();

calculator.add(5);        // 5
calculator.add(3);        // 8
calculator.subtract(2);   // 6
console.log(calculator.getResult()); // 6

// Can't access result directly
console.log(calculator.result);  // undefined
```

✔ `result` is private
✔ Only accessible through provided methods

---

### 2. Event Handler Closures

```javascript
function setupButtons() {
  for (let i = 1; i <= 3; i++) {
    const button = document.createElement("button");
    button.textContent = `Button ${i}`;
    
    // Closure captures 'i'
    button.addEventListener("click", function () {
      console.log(`Button ${i} clicked`);
    });
    
    document.body.appendChild(button);
  }
}

setupButtons();
// Click buttons and see correct number
```

✔ Each button closure remembers its `i`

---

### 3. Function Decorators

```javascript
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`${fn.name} returned`, result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
loggedAdd(2, 3);

// Output:
// Calling add with [2, 3]
// add returned 5
```

✔ Closure wraps original function
✔ Adds logging without changing original

---

### 4. Callback Closures (Async Operations)

```javascript
function fetchUserData(userId) {
  console.log(`Fetching user ${userId}...`);
  
  setTimeout(function () {
    // Closure captures userId
    console.log(`User ${userId} data loaded`);
  }, 1000);
}

fetchUserData(1);
fetchUserData(2);
fetchUserData(3);

// Output:
// Fetching user 1...
// Fetching user 2...
// Fetching user 3...
// (after 1 second)
// User 1 data loaded
// User 2 data loaded
// User 3 data loaded
```

✔ Each callback closure remembers its `userId`

---

## 🚨 Common Mistakes

### Mistake 1: Accidental Global Variable

```javascript
// ❌ BAD - Creates global variable
function createGreeter() {
  message = "Hello";  // No let/const!
  
  return function () {
    console.log(message);
  };
}

// ✅ GOOD - Proper closure
function createGreeter() {
  let message = "Hello";  // Proper variable
  
  return function () {
    console.log(message);
  };
}
```

---

### Mistake 2: Memory Leaks with Closures

```javascript
// ❌ BAD - Closure holds large data
function createHandler() {
  let largeArray = new Array(1000000).fill("data");
  
  return function () {
    console.log("Handler called");
    // But never uses largeArray!
  };
}

// ✅ GOOD - Only keep what's needed
function createHandler(id) {
  return function () {
    console.log(`Handler ${id} called`);
  };
}
```

---

## 🧩 Closure Scope Chain

```javascript
let global = "global";

function outer() {
  let outerVar = "outer";
  
  function middle() {
    let middleVar = "middle";
    
    function inner() {
      let innerVar = "inner";
      
      console.log(innerVar);   // inner
      console.log(middleVar);  // middle
      console.log(outerVar);   // outer
      console.log(global);     // global
    }
    
    inner();
  }
  
  middle();
}

outer();
```

✔ Closure has access to all parent scopes
✔ Scope chain goes up until global scope

---


## 🧩 Key Takeaways

- ✅ Closures give you access to outer function variables
- ✅ Closures create private variables (encapsulation)
- ✅ Each closure instance has its own memory
- ✅ Use `let`/`const` instead of `var` in loops
- ✅ Closures are used in callbacks, decorators, and event handlers
- ✅ Be careful with closures holding large objects (memory leaks)
- ✅ Closures are fundamental to JavaScript patterns
- ✅ Understanding closures is crucial for interviews

---

## 🎓 Best Practices

- [ ] Use `let`/`const` for block scope
- [ ] Understand scope chain
- [ ] Use closures for data encapsulation
- [ ] Be aware of memory implications
- [ ] Use closure patterns in event handlers
- [ ] Test closure behavior in loops
- [ ] Know when to use IIFE
- [ ] Understand closure in async operations

---

