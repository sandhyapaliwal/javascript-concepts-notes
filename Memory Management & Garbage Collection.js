# Memory Management & Garbage Collection in JavaScript

## What is Memory Management?

Memory management refers to how JavaScript:

* Allocates memory
* Uses memory
* Releases memory automatically

👉 JavaScript handles memory **automatically** (no manual free like C/C++)

---

## Memory Lifecycle

JavaScript memory goes through 3 steps:

```
1. Allocation → Memory is assigned
2. Usage     → Values are used/read/write
3. Deallocation → Memory is released automatically
```

---

## 1. Memory Allocation

Memory is allocated when variables or objects are created

```javascript
let num = 10; // primitive → stored in stack
let user = { name: "Sandhya" }; // object → stored in heap
```

---

## 2. Memory Usage

Using the allocated memory

```javascript
console.log(user.name); // accessing object property
user.name = "Paliwal";  // modifying value
```

---

## 3. Memory Deallocation

JavaScript automatically frees memory using:
👉 **Garbage Collector**

---

## What is Garbage Collection?

Garbage Collection is the process of:

```
Removing unused / unreachable memory automatically
```

👉 No need to manually delete objects

---

## Reachability (VERY IMPORTANT)

An object is considered **reachable** if:

* It is accessible from global scope
* Or referenced by another reachable object

👉 If NOT reachable → it becomes garbage

---

## Example — Garbage Collection

```javascript
let user = { name: "Sandhya" };

user = null; // reference removed
```

👉 `{ name: "Sandhya" }` is now unreachable
👉 Garbage Collector will remove it ✅

---

## Mark-and-Sweep Algorithm

JavaScript engines use this algorithm

### Step 1: Mark

* Start from root (global scope)
* Mark all reachable objects

### Step 2: Sweep

* Remove all unmarked objects (garbage)

---

## Circular Reference Example

```javascript
let obj1 = {};
let obj2 = {};

obj1.ref = obj2;
obj2.ref = obj1;

obj1 = null;
obj2 = null;
```

👉 Even though objects reference each other
👉 They are unreachable from root
👉 So they are garbage collected ✅

---

## Stack vs Heap Memory

```javascript
let a = 10; // stack (primitive)
let obj = { name: "JS" }; // heap (reference)
```

| Memory Type | Stores                           |
| ----------- | -------------------------------- |
| Stack       | Primitive values, function calls |
| Heap        | Objects, arrays, functions       |

---

## Memory Leaks (IMPORTANT)

A **memory leak** happens when:

```
Memory is not released even when it's no longer needed
```

👉 This can slow down your app

---

## Common Causes of Memory Leaks

### 1. Global Variables

```javascript
var data = "I stay forever in memory";
```

👉 Global variables are rarely garbage collected ❌

---

### 2. Unused Timers

```javascript
setInterval(() => {
  console.log("Running...");
}, 1000);
```

👉 If not cleared → keeps running → memory leak ❌

---

### 3. Closures Holding Data

```javascript
function outer() {
  let largeData = new Array(1000000).fill("data");

  return function inner() {
    console.log("Still using data");
  };
}
```

👉 `largeData` stays in memory due to closure

---

### 4. Detached DOM Elements

```javascript
let element = document.getElementById("box");
document.body.removeChild(element);
```

👉 If still referenced → cannot be garbage collected ❌

---

## How to Avoid Memory Leaks

```javascript
// 1. Remove references
user = null;

// 2. Clear timers
clearInterval(timerId);

// 3. Remove event listeners
element.removeEventListener("click", handler);
```

👉 Best practices:

* Avoid unnecessary globals
* Clean up timers & listeners
* Be careful with closures

---

## Example — Proper Cleanup

```javascript
let timer = setInterval(() => {
  console.log("Running...");
}, 1000);

// Stop after 5 seconds
setTimeout(() => {
  clearInterval(timer);
}, 5000);
```

---

## Garbage Collection in Action

```javascript
function createUser() {
  let user = { name: "Sandhya" };
  return user;
}

let u = createUser();
u = null; // object becomes unreachable
```

👉 Object is removed from memory automatically

---

## Key Takeaways

1. JavaScript handles memory automatically ✅
2. Garbage Collector removes unused memory
3. Reachability decides what stays or gets deleted
4. Stack → primitives, Heap → objects
5. Memory leaks can harm performance

---

## Quick Summary

```
Allocation → Usage → Garbage Collection
```

👉 If something is reachable → stays
👉 If not reachable → removed

---

> 💡 **Golden Rule:**
> If you lose all references to an object → JavaScript will clean it up automatically
> But if you accidentally keep references → memory leak can happen 🚨


