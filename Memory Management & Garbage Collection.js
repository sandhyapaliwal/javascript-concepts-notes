# Memory Management & Garbage Collection in JavaScript

---

## What is Memory Management?

Memory management is how JavaScript:

* Allocates memory
* Uses memory
* Frees memory automatically

JavaScript handles all of this **behind the scenes**, so developers don’t need to manually manage memory like in C/C++.

---

## Memory Lifecycle

Every piece of data in JavaScript goes through three stages:

```
1. Allocation   → Memory is created
2. Usage        → Values are read or modified
3. Deallocation → Memory is cleaned up automatically
```

---

## 1. Memory Allocation

Memory is assigned when variables or objects are declared.

```javascript
// Primitive → stored in Stack
let count = 10;

// Object → stored in Heap
let user = { name: "Sandhya", role: "Developer" };
```

---

## 2. Memory Usage

Using the allocated memory.

```javascript
console.log(user.name);   // Access
user.role = "Engineer";   // Modify
```

---

## 3. Memory Deallocation

JavaScript automatically removes unused memory using:

👉 **Garbage Collection**

---

## What is Garbage Collection?

Garbage Collection is the process of:

```
Automatically removing unused (unreachable) memory
```

You don’t need to manually delete variables — JavaScript does it for you.

---

## Reachability (Core Concept)

An object is **reachable** if:

* It can be accessed from the global scope
* Or it is referenced by another reachable object

👉 If something is NOT reachable → it becomes **garbage**

---

## Example — Garbage Collection

```javascript
let user = { name: "Sandhya" };

// Remove reference
user = null;
```

✔ The object is now unreachable
✔ It will be removed from memory automatically

---

## Mark-and-Sweep Algorithm

JavaScript engines use this internally.

### Step 1: Mark

* Start from root (global scope)
* Mark all reachable objects

### Step 2: Sweep

* Remove all unmarked (unreachable) objects

---

## Circular Reference Example

```javascript
let obj1 = {};
let obj2 = {};

obj1.ref = obj2;
obj2.ref = obj1;

// Remove both references
obj1 = null;
obj2 = null;
```

✔ Even though they reference each other
✔ They are unreachable from root
✔ So they are garbage collected

---

## Stack vs Heap Memory

```javascript
let a = 10;                // Stack
let obj = { name: "JS" };  // Heap
```

| Memory Type | Stores                           |
| ----------- | -------------------------------- |
| Stack       | Primitive values, function calls |
| Heap        | Objects, arrays, functions       |

---

## Memory Leaks (Important)

A **memory leak** happens when:

```
Memory is not released even when it's no longer needed
```

This can cause:

* Slow performance
* High memory usage
* App crashes

---

## Common Causes of Memory Leaks

### 1. Global Variables

```javascript
var data = "I stay in memory forever";
```

❌ Global variables are rarely garbage collected

---

### 2. Unused Timers

```javascript
setInterval(() => {
  console.log("Running...");
}, 1000);
```

❌ Runs forever if not cleared

---

### 3. Closures Holding References

```javascript
function outer() {
  let largeData = new Array(1000000).fill("data");

  return function inner() {
    console.log("Using data");
  };
}
```

❌ `largeData` stays in memory due to closure

---

### 4. Detached DOM Elements

```javascript
let el = document.getElementById("box");
document.body.removeChild(el);
```

❌ If still referenced → cannot be garbage collected

---

## How to Avoid Memory Leaks

```javascript
// Remove references
user = null;

// Clear timers
clearInterval(timerId);

// Remove event listeners
element.removeEventListener("click", handler);
```

### Best Practices:

* Avoid unnecessary global variables
* Clean up timers and listeners
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

✔ Prevents unnecessary memory usage

---

## Garbage Collection in Action

```javascript
function createUser() {
  let user = { name: "Sandhya" };
  return user;
}

let u = createUser();

// Remove reference
u = null;
```

✔ Object becomes unreachable
✔ Automatically removed from memory

---

## Key Takeaways

* JavaScript handles memory automatically
* Garbage Collector removes unused objects
* Reachability decides what stays in memory
* Stack stores primitives, Heap stores objects
* Memory leaks can impact performance

---

## Quick Summary

```
Allocation → Usage → Garbage Collection
```

✔ Reachable → stays
❌ Not reachable → removed

---

> 💡 **Golden Rule**
>
> If you lose all references to an object → JavaScript will clean it up
> If you accidentally keep references → memory leak can happen 🚨
