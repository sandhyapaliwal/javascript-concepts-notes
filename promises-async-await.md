# Promises & Async/Await in JavaScript

## What is Asynchronous JavaScript?

JavaScript is **single-threaded** — it executes one thing at a time.
But some tasks take time (API calls, file reading, timers).

**Asynchronous** code lets JavaScript start a task and move on —
coming back when the task is complete.

```javascript
// Synchronous — waits for each line
console.log("First");
console.log("Second");
console.log("Third");
// Output: First → Second → Third

// Asynchronous — doesn't wait
console.log("First");
setTimeout(() => console.log("Second"), 2000);
console.log("Third");
// Output: First → Third → Second (after 2 seconds)
```

---

## 1. Callbacks — The Old Way (Problem)

```javascript
// Callback Hell — hard to read and maintain ❌
getData(function(result) {
    processData(result, function(processed) {
        saveData(processed, function(saved) {
            sendEmail(saved, function(sent) {
                console.log("Done!"); // deeply nested — "Callback Hell"
            });
        });
    });
});
```

> This is why **Promises** were introduced!

---

## 2. Promises — What are They?

A Promise is an object that represents the **eventual completion or failure**
of an asynchronous operation.

**3 States of a Promise:**
- **Pending** — operation is still running
- **Fulfilled** — operation completed successfully ✅
- **Rejected** — operation failed ❌

**Syntax:**
```javascript
const promise = new Promise((resolve, reject) => {
    // async operation here
    if (success) {
        resolve(result);  // fulfilled
    } else {
        reject(error);    // rejected
    }
});
```

---

## 3. Creating and Using Promises

```javascript
// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;

        if (success) {
            resolve("Data fetched successfully!");
        } else {
            reject("Error: Something went wrong!");
        }
    }, 2000);
});

// Using a Promise — .then() and .catch()
fetchData
    .then(result => {
        console.log(result); // "Data fetched successfully!"
    })
    .catch(error => {
        console.log(error);  // "Error: Something went wrong!"
    })
    .finally(() => {
        console.log("Always runs — success or failure");
    });
```

---

## 4. Promise Chaining

```javascript
// Each .then() returns a new Promise
fetch("https://api.example.com/user")
    .then(response => response.json())       // convert to JSON
    .then(data => {
        console.log(data.name);              // use the data
        return data.id;                      // pass to next .then()
    })
    .then(id => {
        console.log("User ID:", id);
    })
    .catch(error => {
        console.log("Error:", error);        // handles any error in chain
    });
```

---

## 5. Promise Methods

```javascript
const p1 = Promise.resolve("First");
const p2 = Promise.resolve("Second");
const p3 = Promise.resolve("Third");

// Promise.all() — wait for ALL promises to complete
// Fails if any ONE fails
Promise.all([p1, p2, p3])
    .then(results => console.log(results)); // ["First", "Second", "Third"]

// Promise.allSettled() — wait for ALL, never fails
// Returns status of each promise
Promise.allSettled([p1, p2, p3])
    .then(results => console.log(results));

// Promise.race() — resolves/rejects with FIRST settled promise
Promise.race([p1, p2, p3])
    .then(result => console.log(result)); // "First"

// Promise.any() — resolves with FIRST fulfilled promise
Promise.any([p1, p2, p3])
    .then(result => console.log(result)); // "First"
```

---

## 6. Async/Await — The Modern Way ✅

`async/await` is built on top of Promises — it makes async code
look and behave like synchronous code. Much cleaner!

**Rules:**
- `async` keyword before function — makes it return a Promise
- `await` keyword — pauses execution until Promise resolves
- `await` can only be used inside `async` functions

```javascript
// Same fetch — but with async/await
async function fetchUser() {
    try {
        const response = await fetch("https://api.example.com/user");
        const data = await response.json();
        console.log(data.name);
    } catch (error) {
        console.log("Error:", error);
    } finally {
        console.log("Always runs");
    }
}

fetchUser();
```

---

## 7. Async/Await Examples

```javascript
// Basic async function
async function greet() {
    return "Hello Sandhya!"; // automatically wrapped in Promise
}

greet().then(msg => console.log(msg)); // "Hello Sandhya!"

// Await a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("Start");
    await delay(2000);        // wait 2 seconds
    console.log("After 2 seconds");
}

run();
// Output: Start → (2 second pause) → After 2 seconds

// Multiple awaits — sequential
async function getUserData() {
    const user = await fetchUser();          // wait for user
    const posts = await fetchPosts(user.id); // then fetch posts
    const comments = await fetchComments();  // then fetch comments
    return { user, posts, comments };
}

// Multiple awaits — parallel (faster!)
async function getUserDataParallel() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    return { user, posts };
}
```

---

## 8. Real World — Fetching API Data in React

```javascript
import { useState, useEffect } from "react";

const UserCard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users/1"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};
```

---

## Promise vs Async/Await Comparison

```javascript
// Same operation — two ways

// Using Promises
fetch("https://api.example.com/data")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Using Async/Await — cleaner ✅
async function getData() {
    try {
        const res = await fetch("https://api.example.com/data");
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
```

---

## Quick Summary Table

| Feature | Promise | Async/Await |
|---|---|---|
| Syntax | `.then()` `.catch()` | `async` `await` |
| Readability | Medium | High ✅ |
| Error Handling | `.catch()` | `try/catch` |
| Chaining | `.then()` chain | Sequential `await` |
| Parallel execution | `Promise.all()` | `Promise.all()` with `await` |
| Built on | Callbacks | Promises |

---

## Key Takeaways

1. **Callbacks** — old way, leads to callback hell ❌
2. **Promises** — cleaner, 3 states: pending, fulfilled, rejected
3. **async/await** — cleanest way, built on Promises ✅
4. Always use **try/catch** with async/await for error handling
5. Use **Promise.all()** when multiple async operations can run in parallel
6. In React — always fetch data inside **useEffect** with async/await ✅

---

> 💡 **Golden Rule:**
> Always prefer `async/await` over `.then()` chains for cleaner, readable code.
> Always handle errors with `try/catch` — never leave a Promise unhandled!
