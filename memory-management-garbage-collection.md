# Memory Management & Garbage Collection in JavaScript

## 📌 Overview

Memory management is how JavaScript:

- Allocates memory
- Uses memory
- Frees memory automatically

JavaScript handles all of this **behind the scenes**, so developers don't need to manually manage memory like in C/C++.

---

## 🔄 Memory Lifecycle

Every piece of data in JavaScript goes through three stages:

```
1. Allocation   → Memory is created
2. Usage        → Values are read or modified
3. Deallocation → Memory is cleaned up automatically
```

---

## 1️⃣ Memory Allocation

Memory is assigned when variables or objects are declared.

```javascript
// Primitive → stored in Stack
let count = 10;

// Object → stored in Heap
let user = { name: "Sandhya", role: "Developer" };
```

---

## 2️⃣ Memory Usage

Using the allocated memory.

```javascript
console.log(user.name);   // Access
user.role = "Engineer";   // Modify
```

---

## 3️⃣ Memory Deallocation

JavaScript automatically removes unused memory using:

👉 **Garbage Collection**

---

## 🗑️ What is Garbage Collection?

Garbage Collection is the process of:

```
Automatically removing unused (unreachable) memory
```

You don't need to manually delete variables — JavaScript does it for you.

---

## 🔗 Reachability (Core Concept)

An object is **reachable** if:

- It can be accessed from the global scope
- Or it is referenced by another reachable object

👉 If something is NOT reachable → it becomes **garbage**

---

## 🧪 Example — Garbage Collection

```javascript
let user = { name: "Sandhya" };

// Remove reference
user = null;
```

✔ The object is now unreachable
✔ It will be removed from memory automatically

---

## 🎯 Mark-and-Sweep Algorithm

JavaScript engines use this internally.

### Step 1: Mark

- Start from root (global scope)
- Mark all reachable objects

### Step 2: Sweep

- Remove all unmarked (unreachable) objects

### Example:

```javascript
let a = { value: 10 };
let b = { value: 20 };

a.ref = b;  // a references b
b.ref = a;  // b references a

console.log(a.value); // Both are reachable

a = null;
b = null;  // Now both are unreachable and will be garbage collected
```

---

## 🔄 Circular Reference Example

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

## 💾 Stack vs Heap Memory

```javascript
let a = 10;                // Stack
let obj = { name: "JS" };  // Heap
```

| Memory Type | Stores                           | Size    | Speed   |
| ----------- | -------------------------------- | ------- | ------- |
| Stack       | Primitive values, function calls | Limited | Faster  |
| Heap        | Objects, arrays, functions       | Larger  | Slower  |

### Memory Storage Visual:

```
STACK                       HEAP
┌─────────────┐            ┌──────────────────────┐
│ a: 10       │            │ { name: "Sandhya" }  │
│ b: 20       │            │ [1, 2, 3, 4, 5]      │
│ ptr → ───────────────────→ function() {}        │
└─────────────┘            └──────────────────────┘
```

---

## 🚨 Memory Leaks (Important)

A **memory leak** happens when:

```
Memory is not released even when it's no longer needed
```

This can cause:

- Slow performance
- High memory usage
- App crashes
- Browser freeze

---

## 🔴 Common Causes of Memory Leaks

### 1. Global Variables

```javascript
var data = "I stay in memory forever";
```

❌ Global variables are rarely garbage collected

**Fix:**
```javascript
let data = "Use let/const instead";
```

---

### 2. Unused Timers

```javascript
setInterval(() => {
  console.log("Running...");
}, 1000);
```

❌ Runs forever if not cleared, consuming memory

**Fix:**
```javascript
const timerId = setInterval(() => {
  console.log("Running...");
}, 1000);

// Later, when no longer needed:
clearInterval(timerId);
```

---

### 3. Closures Holding References

```javascript
function outer() {
  let largeData = new Array(1000000).fill("data");

  return function inner() {
    console.log("Using data");
  };
}

const closure = outer();
```

❌ `largeData` stays in memory due to closure

**Fix:**
```javascript
function outer() {
  let largeData = new Array(1000000).fill("data");
  const result = largeData[0]; // Use what you need

  return function inner() {
    console.log(result);
  };
}
```

---

### 4. Detached DOM Elements

```javascript
let el = document.getElementById("box");
document.body.removeChild(el);
// el still references the element
```

❌ If still referenced → cannot be garbage collected

**Fix:**
```javascript
let el = document.getElementById("box");
document.body.removeChild(el);
el = null;  // Remove reference
```

---

### 5. Event Listeners Not Removed

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Clicked");
});

document.body.removeChild(button);
// Event listener still attached to removed element
```

❌ Memory leak!

**Fix:**
```javascript
const handleClick = () => {
  console.log("Clicked");
};

button.addEventListener("click", handleClick);

// When done:
button.removeEventListener("click", handleClick);
document.body.removeChild(button);
```

---

## ✅ How to Avoid Memory Leaks

### Best Practices:

```javascript
// 1. Remove references
user = null;

// 2. Clear timers
clearInterval(timerId);
clearTimeout(timeoutId);

// 3. Remove event listeners
element.removeEventListener("click", handler);

// 4. Clean up DOM
element = null;

// 5. Break circular references
obj1.ref = null;
obj2.ref = null;
```

---

## 🔍 Real-World Example — Proper Cleanup

### Without Cleanup (Bad):

```javascript
function setupTimer() {
  const data = new Array(100000).fill("data");
  
  setInterval(() => {
    console.log(data[0]);
  }, 1000);
}

setupTimer();
// Memory leak: data stays in memory forever
```

### With Cleanup (Good):

```javascript
function setupTimer() {
  const data = new Array(100000).fill("data");
  
  let timerId = setInterval(() => {
    console.log(data[0]);
  }, 1000);
  
  // Return cleanup function
  return function cleanup() {
    clearInterval(timerId);
  };
}

const cleanup = setupTimer();

// Later:
cleanup();  // Stops timer and releases memory
```

---

## 🧪 Example — DOM Cleanup

### Bad:

```javascript
function createElements() {
  for (let i = 0; i < 1000; i++) {
    let div = document.createElement("div");
    document.body.appendChild(div);
    // div references stay in memory
  }
}
```

### Good:

```javascript
function createElements() {
  for (let i = 0; i < 1000; i++) {
    let div = document.createElement("div");
    document.body.appendChild(div);
  }
  // Let garbage collector clean up div references
}

// Or with event delegation:
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    console.log("Item clicked");
  }
});
// One listener instead of 1000
```

---

## 📊 Garbage Collection in Action

```javascript
function createUser() {
  let user = { name: "Sandhya" };
  return user;
}

let u = createUser();

console.log(u.name); // "Sandhya"

// Remove reference
u = null;
```

✔ Object becomes unreachable
✔ Automatically removed from memory
✔ Memory is freed

---

## 🧩 Memory Leak Detection (Browser DevTools)

```javascript
// Open DevTools (F12)
// Memory tab → Take snapshot
// Compare before and after running code
// Look for unexpected retained objects
```

---

## 🚨 Common Interview Questions

### Q1: What is memory management?
👉 The process of allocating, using, and freeing memory. JavaScript does this automatically using garbage collection.

### Q2: What is garbage collection?
👉 Automatic process of removing unreachable (unused) objects from memory.

### Q3: How does Mark-and-Sweep work?
👉 **Mark phase**: Start from root and mark all reachable objects. **Sweep phase**: Delete unmarked objects.

### Q4: What is a memory leak?
👉 Memory that is not released even when it's no longer needed, causing performance issues.

### Q5: How to avoid memory leaks?
👉 Remove references, clean up timers, remove event listeners, and break circular references.

### Q6: Difference between Stack and Heap?
👉 **Stack**: Fast, limited size, stores primitives. **Heap**: Slower, larger size, stores objects.

### Q7: What is reachability?
👉 An object is reachable if it can be accessed from the global scope or referenced by another reachable object.

---

## 🧩 Key Takeaways

- JavaScript handles memory **automatically** via garbage collection
- **Reachability** determines what stays in memory
- **Stack** stores primitives, **Heap** stores objects
- Memory leaks occur when memory isn't released
- **Common causes**: globals, timers, closures, DOM references, event listeners
- **Prevention**: Clean up references, timers, and listeners
- Use browser DevTools to detect memory leaks
- Always cleanup in React with useEffect cleanup function

---

## 🎓 Best Practices Checklist

- [ ] Avoid unnecessary global variables
- [ ] Clear timers with `clearInterval`/`clearTimeout`
- [ ] Remove event listeners when done
- [ ] Set DOM references to `null` after removal
- [ ] Break circular references
- [ ] Use browser DevTools to monitor memory
- [ ] Use weak references when appropriate (advanced)
- [ ] Monitor memory in production applications

---

**Happy Coding! 🚀**

Remember: Good memory management is key to performant applications, especially in long-running applications like SPAs and Node.js servers.
