# JavaScript Core Concepts: API Calling & Event Loop

---

## 📋 Table of Contents

1. [API Calling in JavaScript](#-api-calling-in-javascript)
2. [Event Loop & Call Stack](#-event-loop--call-stack-in-javascript)

---

## 🌐 API Calling in JavaScript

### What is an API?

An **API (Application Programming Interface)** allows different software systems to communicate with each other.

**Common uses in JavaScript:**
- Fetch data from servers
- Interact with databases
- Integrate third-party services (weather, payments, social media)

---

### Ways to Call APIs

| Method | Type | Recommended? |
|--------|------|--------------|
| Fetch API | Built-in | ✅ Yes — modern standard |
| Axios | Third-party library | ✅ Yes — for complex apps |
| XMLHttpRequest | Built-in | ❌ Old — avoid |

---

### 1. Fetch API — GET Request

**Basic GET Request**

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
```

**With Async/Await ✅ Recommended**

```javascript
async function getPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error("Error:", error);
    }
}

getPosts();
```

---

### 2. POST Request

```javascript
async function createPost(postData) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Created:", data);

    } catch (error) {
        console.error("Error:", error);
    }
}

createPost({ title: "Hello", body: "World", userId: 1 });
```

---

### 3. PUT Request

```javascript
async function updatePost(postId, updatedData) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            }
        );

        const data = await response.json();
        console.log("Updated:", data);

    } catch (error) {
        console.error("Error:", error);
    }
}

updatePost(1, { title: "Updated Title", body: "Updated content" });
```

---

### 4. DELETE Request

```javascript
async function deletePost(postId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
            { method: "DELETE" }
        );

        if (response.ok) {
            console.log("Deleted successfully");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

deletePost(1);
```

---

### 5. Axios (Alternative to Fetch)

**Installation**

```bash
npm install axios
```

**GET Request**

```javascript
import axios from "axios";

async function getPosts() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

**POST Request**

```javascript
async function createPost(postData) {
    try {
        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            postData
        );
        console.log("Created:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

---

### 6. HTTP Methods — Quick Reference

| Method | Purpose | Example Use Case |
|--------|---------|-----------------|
| GET | Retrieve data | Fetch user profile, load posts |
| POST | Create new data | Create new user, submit form |
| PUT | Replace entire resource | Update user profile completely |
| PATCH | Partial update | Update only user's email |
| DELETE | Remove data | Delete a post or user |

---

### 7. Error Handling

**Fetch — Manual Error Handling**

⚠️ `fetch` does **NOT** throw on 404/500 — always check `response.ok` manually!

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Network error:", error);
        } else {
            console.error("API error:", error.message);
        }
    }
}
```

**Axios — Automatic Error Handling**

```javascript
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        if (error.response) {
            // Server responded with 4xx/5xx
            console.error("Server error:", error.response.status);
        } else if (error.request) {
            // No response received
            console.error("No response from server");
        } else {
            console.error("Error:", error.message);
        }
    }
}
```

---

### 8. Query Parameters

**Fetch**

```javascript
const params = new URLSearchParams({
    _limit: 10,
    _page: 1,
    _sort: "id",
    _order: "desc"
});

fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
    .then(response => response.json())
    .then(data => console.log(data));
```

**Axios**

```javascript
async function getPosts() {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    _limit: 10,
                    _page: 1,
                    _sort: "id",
                    _order: "desc"
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

---

### 9. Reusable API Service

```javascript
// apiService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

// Usage
const users = await apiCall("/users");
const post = await apiCall("/posts", {
    method: "POST",
    body: JSON.stringify({ title: "Hello" })
});
```

---

### 10. User Management Class

```javascript
class UserAPI {
    constructor(baseURL = "https://jsonplaceholder.typicode.com") {
        this.baseURL = baseURL;
    }

    async getAllUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Failed to fetch users");
        return await response.json();
    }

    async getUser(userId) {
        const response = await fetch(`${this.baseURL}/users/${userId}`);
        if (!response.ok) throw new Error("User not found");
        return await response.json();
    }

    async createUser(userData) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error("Failed to create user");
        return await response.json();
    }

    async updateUser(userId, userData) {
        const response = await fetch(`${this.baseURL}/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error("Failed to update user");
        return await response.json();
    }

    async deleteUser(userId) {
        const response = await fetch(`${this.baseURL}/users/${userId}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete user");
        return { success: true };
    }
}

// Usage
const userAPI = new UserAPI();
const users = await userAPI.getAllUsers();
const newUser = await userAPI.createUser({ name: "Sandhya", email: "s@example.com" });
await userAPI.updateUser(1, { name: "Updated Name" });
await userAPI.deleteUser(1);
```

---

### 11. Best Practices

```javascript
// 1. Use environment variables for API URLs
const API_URL = process.env.REACT_APP_API_URL;

// 2. Always handle loading and error states
async function fetchUserData(userId) {
    let isLoading = true;
    let data = null;
    let error = null;

    try {
        data = await fetch(`/api/users/${userId}`).then(r => r.json());
    } catch (err) {
        error = err;
    } finally {
        isLoading = false;
    }

    return { isLoading, data, error };
}

// 3. Set request timeouts
const fetchWithTimeout = (url, timeout = 5000) => {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timeout")), timeout)
        )
    ]);
};

// 4. Use proper headers
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "X-API-Key": process.env.API_KEY
};

// 5. Validate API responses
async function getUser(userId) {
    const data = await fetch(`/api/users/${userId}`).then(r => r.json());

    if (!data.id || !data.name) {
        throw new Error("Invalid user data received");
    }

    return data;
}
```

---

### 12. Fetch vs Axios Comparison

| Feature | Fetch API | Axios |
|---------|-----------|-------|
| Built-in | ✅ Yes | ❌ Needs installation |
| Syntax | Verbose | Concise |
| Error Handling | Manual `response.ok` check | Automatic on 4xx/5xx |
| Request Timeout | ❌ No native support | ✅ Built-in |
| Interceptors | ❌ No | ✅ Yes |
| JSON Auto-convert | ❌ Need `.json()` | ✅ Automatic |
| Bundle Size | Zero | Small (~13kb) |
| Best For | Simple projects | Complex applications |

**Key Takeaways:**
- ✅ Use **Fetch API** for simple projects
- ✅ Use **Axios** for complex apps
- ✅ Always use `async/await`
- ⚠️ Fetch does **NOT** throw on 404/500
- ✅ Always wrap API calls in `try/catch`
- ✅ Use environment variables for URLs

---

## ⚙️ Event Loop & Call Stack in JavaScript

### Overview

JavaScript is a **single-threaded, synchronous** language, but handles async operations using the **Event Loop**.

---

### Key Components

```
┌─────────────────────────────────────────────────┐
│         JavaScript Runtime (V8, SpiderMonkey)  │
├─────────────────────────────────────────────────┤
│              Call Stack (LIFO)                  │
│       Synchronous code execution order         │
├─────────────────────────────────────────────────┤
│              Web APIs (Browser)                 │
│  setTimeout, fetch, DOM events, localStorage   │
├──────────────────┬───────────────────────────────┤
│  Microtask Queue │  Callback Queue (Task Queue) │
│  ✅ Promise      │  ⏱️ setTimeout               │
│  ✅ async/await  │  ⏱️ setInterval              │
│  ✅ MutationObv  │  🖱️ DOM events              │
└──────────────────┴───────────────────────────────┘
           ↑
      EVENT LOOP
   (Orchestrates everything)
```

**Execution Order:**
1. All synchronous code (Call Stack)
2. All Microtasks (Promise, async/await)
3. All Callback Queue tasks (setTimeout, events)
4. Repeat

---

### Call Stack

The Call Stack tracks function execution using **LIFO** (Last In, First Out).

```javascript
function first() {
  console.log("First");
}

function second() {
  first();
  console.log("Second");
}

second();

// Execution order:
// First → Second
```

**Visual:**

```
Call Stack
┌─────────────────┐
│   second()      │ ← Second in, First out
│   first()       │
│ <global>        │
└─────────────────┘
```

---

### Web APIs

Browser-provided APIs that handle async operations **in the background**.

```javascript
console.log("Start");

setTimeout(() => {
  console.log("After 1 second");
}, 1000);

console.log("End");

// Output:
// Start
// End
// (after 1 second) After 1 second
```

**What happens:**
1. `console.log("Start")` → Call Stack → executed
2. `setTimeout` → Web API → background
3. `console.log("End")` → Call Stack → executed
4. After 1s, callback → Callback Queue
5. Event Loop moves it to Call Stack

---

### Callback Queue (Macrotask Queue)

Stores callbacks from async Web API operations.

```javascript
setTimeout(() => {
  console.log("Callback executed");
}, 0);

console.log("Main code");

// Output:
// Main code
// Callback executed
```

Even with `0` delay, callback waits for Call Stack to empty!

---

### Microtask Queue (High Priority)

Stores **high-priority** async tasks: Promise, async/await, MutationObserver.

> **Key rule:** **ALL** Microtasks execute **before** first Callback Queue task!

```javascript
Promise.resolve().then(() => {
  console.log("Promise executed");
});

setTimeout(() => {
  console.log("Timeout executed");
}, 0);

// Output:
// Promise executed (Microtask)
// Timeout executed (Callback Queue)
```

---

### Event Loop in Action

```javascript
console.log("Script start");

setTimeout(() => console.log("setTimeout 1"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

setTimeout(() => console.log("setTimeout 2"), 0);

console.log("Script end");

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout 1
// setTimeout 2
```

**Why this order?**
1. Sync code first: "Script start", "Script end"
2. All Microtasks: "Promise 1", "Promise 2"
3. Callback Queue: "setTimeout 1", "setTimeout 2"

---

### Microtask vs Macrotask Comparison

| Aspect | Microtask | Macrotask |
|--------|-----------|-----------|
| Priority | ⭐⭐⭐ High | ⭐ Low |
| Execution | All before next macro | One at a time |
| Examples | Promise, async/await | setTimeout, events |
| Queue Name | Microtask Queue | Callback/Task Queue |
| When | Between sync & render | After render |

---

### Common Interview Questions

**Q1: Why does Promise execute before setTimeout?**

```javascript
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("setTimeout"), 0);

// Output: Promise, setTimeout
```

> Microtask Queue has **higher priority**. Event Loop executes **all** microtasks before taking next macrotask.

---

**Q2: Is JavaScript truly asynchronous?**

> No. JavaScript is **single-threaded**. Async behavior is achieved through:
> - Web APIs (handle async work)
> - Event Loop (coordinates execution)
> - Task queues (store callbacks)

---

**Q3: What happens if Call Stack never empties?**

```javascript
while (true) {} // Infinite loop

setTimeout(() => console.log("Never runs"), 0);
```

> Browser freezes! Callback never executes because Call Stack is blocked.

---

**Q4: What's the order of execution?**

```
1. Synchronous code (Call Stack)
   ↓
2. Microtasks (Promise, async/await)
   ↓
3. Render (if needed)
   ↓
4. Macrotasks (setTimeout, events)
   ↓
5. Repeat from step 2
```

---

### Best Practices

```javascript
// 1. Use async/await (uses Microtask Queue)
async function fetchData() {
    const data = await fetch("/api/data").then(r => r.json());
    return data;
}

// 2. Use Promises for dependent operations
Promise.resolve()
    .then(() => doTask1())
    .then(() => doTask2());

// 3. Use setTimeout for heavy computations (non-blocking)
setTimeout(() => {
    heavyComputation();
}, 0);

// 4. Understand execution order
console.log("1");
Promise.resolve().then(() => console.log("2"));
setTimeout(() => console.log("3"), 0);
console.log("4");
// Output: 1, 4, 2, 3
```

---

## 🧩 Key Takeaways

**API Calling:**
- ✅ Use **Fetch API** or **Axios**
- ✅ Always use `async/await`
- ✅ Handle errors with `try/catch`
- ✅ Use environment variables for URLs
- ⚠️ Fetch doesn't throw on 404/500

**Event Loop:**
- ✅ JavaScript is single-threaded
- ✅ Microtasks have **higher** priority
- ✅ Order: Sync → Microtasks → Macrotasks
- ✅ Call Stack must be empty for Queue tasks
- ✅ Event Loop coordinates everything

---

