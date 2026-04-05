# Event Loop & Call Stack in JavaScript

## 📌 Overview

JavaScript is a **single-threaded, synchronous language**, but it can handle asynchronous operations using the **Event Loop**.

To understand this, you need to know:

* Call Stack
* Web APIs
* Callback Queue
* Microtask Queue
* Event Loop

---

## 🧠 Call Stack

The **Call Stack** is a data structure that keeps track of function execution.

* Works on **LIFO (Last In, First Out)**
* When a function is called → it is pushed into the stack
* When execution completes → it is popped out

### Example:

```javascript
function first() {
  console.log("First");
}

function second() {
  first();
  console.log("Second");
}

second();
```

### Execution Flow:

```
Call Stack:
second()
first()
console.log("First")
→ removed
console.log("Second")
→ removed
→ stack empty
```

---

## 🌐 Web APIs

These are provided by the browser (not JavaScript itself).

Examples:

* setTimeout
* DOM events
* fetch API

They handle async tasks in the background.

---

## 📥 Callback Queue (Macrotask Queue)

* Stores callbacks from:

  * setTimeout
  * setInterval
  * DOM events

Example:

```javascript
setTimeout(() => {
  console.log("Timer done");
}, 1000);
```

---

## ⚡ Microtask Queue (High Priority)

* Stores:

  * Promises (.then, .catch)
  * queueMicrotask()

Example:

```javascript
Promise.resolve().then(() => {
  console.log("Promise resolved");
});
```

---

## 🔁 Event Loop

The **Event Loop** continuously checks:

1. Is Call Stack empty?
2. If yes → push tasks from:

   * First: Microtask Queue
   * Then: Callback Queue

---

## 🧪 Important Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

### Output:

```
Start
End
Promise
Timeout
```

### Explanation:

1. "Start" → Call Stack
2. setTimeout → goes to Web API
3. Promise → goes to Microtask Queue
4. "End" → Call Stack
5. Event Loop runs:

   * Microtask Queue → "Promise"
   * Callback Queue → "Timeout"

---

## ⚖️ Microtask vs Macrotask

| Feature          | Microtask Queue         | Callback Queue          |
| ---------------- | ----------------------- | ----------------------- |
| Priority         | High                    | Low                     |
| Examples         | Promise, queueMicrotask | setTimeout, setInterval |
| Execution Timing | Before next render      | After microtasks        |

---

## 🚨 Common Interview Questions

### 1. Why does Promise run before setTimeout?

👉 Because **Microtask Queue has higher priority**

---

### 2. Is JavaScript single-threaded?

👉 Yes, but async behavior is handled by **Event Loop + Web APIs**

---

### 3. What happens if Call Stack is not empty?

👉 Event Loop waits → no async task executes

---

## 🧩 Key Takeaways

* JavaScript executes code using **Call Stack**
* Async operations go to **Web APIs**
* Event Loop manages execution order
* **Microtasks > Macrotasks (priority)**

---

## 📌 Conclusion

Understanding Event Loop is essential for:

* Debugging async code
* Writing efficient applications
* Cracking JavaScript interviews

---

💡 Tip: Practice with console examples to fully understand execution order.
