# Memory Management & Garbage Collection in JavaScript

## 📌 Overview

JavaScript automatically manages memory using a process called **Garbage Collection**.

👉 Developers do not need to manually allocate or free memory (unlike languages like C/C++).

---

## 🧠 What is Memory Management?

Memory management refers to:

* Allocation of memory when variables/objects are created
* Releasing memory when it is no longer needed

---

## 📦 Memory Lifecycle in JavaScript

JavaScript memory goes through three phases:

### 1. Allocation

Memory is allocated when variables or objects are declared

```javascript id="zjv9rf"
let num = 10;
let user = { name: "Sandhya" };
```

---

### 2. Usage

Memory is used when we read or write values

```javascript id="v7lz3z"
console.log(user.name);
```

---

### 3. Deallocation

Memory is automatically freed by the **Garbage Collector**

---

## 🧹 What is Garbage Collection?

Garbage Collection is the process of:
👉 Automatically removing unused memory

JavaScript engine detects objects that are no longer reachable and removes them.

---

## 🔗 Reachability Concept (IMPORTANT)

An object is considered **reachable** if:

* It is accessible from the root (global scope)
* Or referenced by another reachable object

👉 If not reachable → it becomes **garbage**

---

## 🧪 Example

```javascript id="x1g3mk"
let user = { name: "Sandhya" };

user = null;
```

👉 The object `{ name: "Sandhya" }` becomes unreachable
👉 Garbage Collector will remove it

---

## 🔄 Mark-and-Sweep Algorithm

Most JavaScript engines use the **Mark-and-Sweep algorithm**

### Steps:

1. **Mark Phase**

   * Identify all reachable objects starting from root

2. **Sweep Phase**

   * Remove all unmarked (unreachable) objects

---

## 🧪 Circular Reference Example

```javascript id="pfh9n7"
let obj1 = {};
let obj2 = {};

obj1.ref = obj2;
obj2.ref = obj1;

obj1 = null;
obj2 = null;
```

👉 Even though objects reference each other,
👉 They are unreachable from root → Garbage collected

---

## ⚠️ Memory Leaks (Important)

A **memory leak** occurs when memory is not released even when it is not needed.

---

## 🚨 Common Causes of Memory Leaks

### 1. Global Variables

```javascript id="m0qkdr"
var data = "This stays in memory";
```

---

### 2. Forgotten Timers

```javascript id="gn9h6u"
setInterval(() => {
  console.log("Running...");
}, 1000);
```

👉 If not cleared → memory keeps increasing

---

### 3. Closures Holding References

```javascript id="gqpl5b"
function outer() {
  let largeData = new Array(1000000).fill("data");

  return function inner() {
    console.log("Using data");
  };
}
```

👉 `largeData` stays in memory due to closure

---

### 4. Detached DOM Elements

* Removed elements still referenced in JS
* Cannot be garbage collected

---

## 🛠️ How to Avoid Memory Leaks

* Avoid unnecessary global variables
* Clear timers using `clearInterval` / `clearTimeout`
* Remove event listeners when not needed
* Set unused objects to `null`
* Be careful with closures

---

## ⚖️ Stack vs Heap Memory

| Memory Type | Description                              |
| ----------- | ---------------------------------------- |
| Stack       | Stores primitive values & function calls |
| Heap        | Stores objects & reference types         |

---

## 🧪 Example

```javascript id="xk2d8c"
let a = 10; // stored in stack
let obj = { name: "JS" }; // stored in heap
```

---

## 🚨 Common Interview Questions

### 1. Does JavaScript have manual memory management?

👉 No, it uses automatic garbage collection

---

### 2. What is garbage collection?

👉 Process of removing unused memory

---

### 3. What is reachability?

👉 Determines whether an object is accessible or not

---

### 4. What is a memory leak?

👉 Memory that is not released when no longer needed

---

## 🧩 Key Takeaways

* JavaScript automatically manages memory
* Garbage Collector removes unreachable objects
* Mark-and-Sweep is commonly used
* Memory leaks can affect performance

