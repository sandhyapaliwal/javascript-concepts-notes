Event Loop & Call Stack in JavaScript
Overview
JavaScript is a single-threaded, synchronous language, but it handles asynchronous operations using the Event Loop.

Key components:

Call Stack
Web APIs
Callback Queue (Macrotask Queue)
Microtask Queue
Event Loop
Call Stack
The Call Stack is a data structure that tracks function execution.

Mechanism: LIFO (Last In, First Out)

Function called → pushed to stack
Execution completes → popped from stack
Example
Copy
function first() {
  console.log("First");
}

function second() {
  first();
  console.log("Second");
}

second();
Execution Order:

Copy
1. second() pushed to stack
2. first() pushed to stack
3. console.log("First") executes → "First" printed
4. first() popped from stack
5. console.log("Second") executes → "Second" printed
6. second() popped from stack
7. Stack empty
Output:

Copy
First
Second
Web APIs
Browser-provided APIs (not part of JavaScript itself) that handle asynchronous operations in the background.

Common Web APIs:

setTimeout / setInterval
DOM events (click, scroll, etc.)
fetch API
XMLHttpRequest
requestAnimationFrame
How they work:

When called, the browser takes responsibility
JavaScript continues executing
Callback executes later when ready
Copy
console.log("Start");

// setTimeout offloads to Web API
setTimeout(() => {
  console.log("After 1 second");
}, 1000);

console.log("End");
Output:

Copy
Start
End
After 1 second
Callback Queue (Macrotask Queue)
Stores callbacks from asynchronous Web API operations.

Examples of tasks:

setTimeout callbacks
setInterval callbacks
DOM event listeners
setImmediate (Node.js)
Process:

Web API completes → callback moved to Callback Queue
Event Loop checks if Call Stack is empty
If empty → callback moved to Call Stack for execution
Copy
setTimeout(() => {
  console.log("Callback executed");
}, 0);

console.log("Main code");
Output:

Copy
Main code
Callback executed
Even with 0 delay, callback goes to queue and executes after Call Stack is empty.

Microtask Queue (High Priority)
Stores high-priority asynchronous tasks.

Examples of microtasks:

Promise callbacks (.then(), .catch(), .finally())
queueMicrotask()
MutationObserver
Key difference: Microtasks execute before Callback Queue tasks.

Copy
Promise.resolve().then(() => {
  console.log("Promise executed");
});

setTimeout(() => {
  console.log("Timeout executed");
}, 0);
Output:

Copy
Promise executed
Timeout executed
Microtask Queue (Promise) executes before Callback Queue (setTimeout).

Event Loop
The Event Loop continuously monitors and manages task execution.

Algorithm:

Copy
while (eventLoop.waitForTask()) {
  1. Execute all tasks in Call Stack
  2. If Call Stack is empty:
     - Execute ALL microtasks (Microtask Queue)
     - Execute ONE macrotask (Callback Queue)
     - Re-render if needed
  3. Repeat
}
Execution Order:

Synchronous code (Call Stack)
Microtasks (Promise, queueMicrotask)
Callback Queue (setTimeout, setInterval)
Re-render
Repeat
Complete Example
Copy
console.log("Script start");

setTimeout(() => {
  console.log("setTimeout 1");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
  })
  .then(() => {
    console.log("Promise 2");
  });

setTimeout(() => {
  console.log("setTimeout 2");
}, 0);

console.log("Script end");
Output:

Copy
Script start
Script end
Promise 1
Promise 2
setTimeout 1
setTimeout 2
Step-by-step execution:

console.log("Script start") → Call Stack → executed immediately
setTimeout 1 → Web API → goes to Callback Queue
Promise.resolve().then() → goes to Microtask Queue
setTimeout 2 → Web API → goes to Callback Queue
console.log("Script end") → Call Stack → executed immediately
Call Stack empty → Event Loop checks Microtask Queue
Execute both promises (Microtask Queue)
Execute first setTimeout (Callback Queue)
Execute second setTimeout (Callback Queue)
Microtask vs Macrotask Comparison
Aspect	Microtask	Macrotask
Priority	High	Low
Execution	All microtasks before next macrotask	One macrotask at a time
Examples	Promise, queueMicrotask	setTimeout, setInterval, DOM events
Queue Name	Microtask Queue	Callback Queue (Event Queue)
When to use	Quick, urgent tasks	Deferred operations
Practical Examples
Example 1: Promise Chain
Copy
console.log("A");

Promise.resolve()
  .then(() => console.log("B"))
  .then(() => console.log("C"));

console.log("D");
Output:

Copy
A
D
B
C
All promises execute before any macrotasks.

Example 2: Mixed Operations
Copy
console.log("1");

setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => console.log("3"));
}, 0);

Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => console.log("5"), 0);
});

console.log("6");
Output:

Copy
1
6
4
2
3
5
Explanation:

console.log("1") → executed synchronously
console.log("6") → executed synchronously
Promise microtask: console.log("4") → executed
setTimeout inside promise → goes to Callback Queue
First setTimeout macrotask: console.log("2") → executed
Promise inside setTimeout: console.log("3") → executed (microtask priority)
Second setTimeout: console.log("5") → executed
Example 3: Nested Promises
Copy
Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    Promise.resolve().then(() => console.log("Promise 1.1"));
  })
  .then(() => {
    console.log("Promise 2");
  });

console.log("Sync");
Output:

Copy
Sync
Promise 1
Promise 1.1
Promise 2
All promise microtasks execute before any macrotasks.

Common Interview Questions
Q1: Why does Promise execute before setTimeout?
Answer: Microtask Queue has higher priority than Callback Queue. Event Loop executes all microtasks before taking next macrotask.

Q2: Is JavaScript truly asynchronous?
Answer: No. JavaScript is single-threaded and synchronous. Asynchronous behavior is achieved through:

Web APIs (browser handles async operations)
Event Loop (coordinates task execution)
Callback/Microtask Queues (manages task order)
Q3: What happens if Call Stack never empties?
Answer: Callback Queue tasks never execute. This causes UI freezing (blocking).

Copy
// This freezes the browser
while (true) {
  // infinite loop
}

setTimeout(() => console.log("Never runs"), 0);
Q4: Why use Microtask Queue?
Answer: Some operations need guaranteed execution before browser repaints:

Promise chains
DOM mutations that need immediate handling
Critical updates
Performance Implications
Microtasks block rendering
Copy
// This blocks rendering
Promise.resolve().then(() => {
  // Heavy computation
  for (let i = 0; i < 1000000000; i++) {}
});

console.log("Page interactive");
The page won't render until the promise completes.

Use setTimeout for non-blocking tasks
Copy
// Better approach
setTimeout(() => {
  // Heavy computation in chunks
  for (let i = 0; i < 1000000000; i++) {}
}, 0);

console.log("Page interactive immediately");
Visual Representation
Copy
┌─────────────────────────────────────────────────────────┐
│                    JavaScript Runtime                    │
├─────────────────────────────────────────────────────────┤
│                    Call Stack                            │
│          (Synchronous code execution)                    │
├─────────────────────────────────────────────────────────┤
│          Web APIs (Browser provided)                     │
│   setTimeout, fetch, DOM events, etc.                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────┐      ┌──────────────────┐         │
│  │ Microtask Queue  │      │ Callback Queue   │         │
│  │                  │      │                  │         │
│  │ - Promise        │      │ - setTimeout     │         │
│  │ - queueMicro     │      │ - setInterval    │         │
│  │ - MutationObs    │      │ - DOM events     │         │
│  └──────────────────┘      └──────────────────┘         │
└─────────────────────────────────────────────────────────┘
                     ↑
                EVENT LOOP
         (Coordinates everything)
Best Practices
Use Promises for dependent async operations

Copy
// Good
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
}
Use setTimeout for heavy computations

Copy
// Don't block with microtasks
setTimeout(() => {
  heavyComputation(); // Microtasks can execute between
}, 0);
Understand async/await is Promise-based

Copy
// async/await uses Microtask Queue (Promise-based)
async function test() {
  await Promise.resolve();
  console.log("Runs before setTimeout");
}
Be careful with nested promises

Copy
// All execute in Microtask Queue
Promise.resolve()
  .then(() => Promise.resolve().then(() => console.log("Nested")));
Key Takeaways
✅ JavaScript is single-threaded but achieves async behavior through Event Loop
✅ Call Stack executes synchronous code (LIFO)
✅ Web APIs handle async operations in background
✅ Microtask Queue (Promise) has higher priority
✅ Callback Queue (setTimeout) has lower priority
✅ Event Loop coordinates execution order
✅ Event Loop: Sync → Microtasks → Macrotasks → Render

