# JavaScript Core Concepts

> A concise reference covering **API Calling** and the **Event Loop** in JavaScript.

---

## 📁 Table of Contents

- [API Calling in JavaScript](#-api-calling-in-javascript)
  - [Ways to Call APIs](#ways-to-call-apis)
  - [Fetch API](#1-fetch-api)
  - [POST Request](#2-post-request)
  - [PUT Request](#3-put-request)
  - [DELETE Request](#4-delete-request)
  - [Axios](#5-axios)
  - [HTTP Methods Reference](#6-http-methods-quick-reference)
  - [Error Handling](#7-error-handling)
  - [Query Parameters](#8-query-parameters)
  - [Reusable API Service](#9-real-world--reusable-api-service)
  - [User Management Class](#10-real-world--user-management-class)
  - [Best Practices](#11-best-practices)
  - [Fetch vs Axios Comparison](#12-fetch-api-vs-axios--comparison)
- [Event Loop & Call Stack](#-event-loop--call-stack-in-javascript)
  - [Key Components](#key-components)
  - [Call Stack](#call-stack)
  - [Web APIs](#web-apis)
  - [Callback Queue](#callback-queue-macrotask-queue)
  - [Microtask Queue](#microtask-queue-high-priority)
  - [Event Loop](#event-loop)
  - [Microtask vs Macrotask](#microtask-vs-macrotask-comparison)
  - [Common Interview Questions](#common-interview-questions)
  - [Best Practices](#best-practices-1)

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

### 1. Fetch API

**Basic GET Request**
```js
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
```

**GET with Async/Await ✅ Recommended**
```js
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

```js
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

```js
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

```js
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

### 5. Axios

**Installation**
```bash
npm install axios
```

**GET Request**
```js
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
```js
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

createPost({ title: "My Post", body: "Content here", userId: 1 });
```

**PUT Request**
```js
async function updatePost(postId, updatedData) {
    try {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
            updatedData
        );
        console.log("Updated:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

**DELETE Request**
```js
async function deletePost(postId) {
    try {
        await axios.delete(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        console.log("Deleted");
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

> ⚠️ `fetch` does **NOT** throw on 404/500 — always check `response.ok` manually!

```js
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
```js
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
```js
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
```js
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

### 9. Real World — Reusable API Service

```js
// apiService.js — reusable for entire project
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

// Usage anywhere in the project
const users = await apiCall("/users");
const post = await apiCall("/posts", {
    method: "POST",
    body: JSON.stringify({ title: "Hello" })
});
```

---

### 10. Real World — User Management Class

```js
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

```js
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

### 12. Fetch API vs Axios — Comparison

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
- ✅ Use **Fetch API** for simple projects — no dependencies needed
- ✅ Use **Axios** for complex apps — interceptors, auto JSON, cleaner syntax
- ✅ Always use `async/await` over `.then()` chains — more readable
- ⚠️ Fetch does **NOT** throw on 404/500 — always check `response.ok`
- ✅ Always wrap API calls in `try/catch`
- ✅ Use environment variables for API URLs — never hardcode them
- ✅ Create a reusable API service — avoid repeating fetch logic everywhere

---

## ⚙️ Event Loop & Call Stack in JavaScript

### Overview

JavaScript is a **single-threaded, synchronous** language, but handles async operations using the **Event Loop**.

### Key Components

```
┌─────────────────────────────────────────────────────────┐
│                    JavaScript Runtime                    │
├─────────────────────────────────────────────────────────┤
│                    Call Stack                            │
│          (Synchronous code execution)                    │
├─────────────────────────────────────────────────────────┤
│          Web APIs (Browser provided)                     │
│   setTimeout, fetch, DOM events, etc.                    │
├──────────────────────────┬──────────────────────────────┤
│  Microtask Queue         │  Callback Queue              │
│  - Promise (.then)       │  - setTimeout                │
│  - queueMicrotask        │  - setInterval               │
│  - MutationObserver      │  - DOM events                │
└──────────────────────────┴──────────────────────────────┘
                     ↑
                EVENT LOOP
         (Coordinates everything)
```

**Execution Order:**
1. Synchronous code (Call Stack)
2. Microtasks (Promise, queueMicrotask)
3. Callback Queue (setTimeout, setInterval)
4. Re-render → Repeat

---

### Call Stack

The Call Stack tracks function execution using **LIFO** (Last In, First Out).

```js
function first() {
  console.log("First");
}

function second() {
  first();
  console.log("Second");
}

second();

// Output:
// First
// Second
```

---

### Web APIs

Browser-provided APIs that handle async operations **in the background**.

```js
console.log("Start");

setTimeout(() => {
  console.log("After 1 second");
}, 1000);

console.log("End");

// Output:
// Start
// End
// After 1 second
```

---

### Callback Queue (Macrotask Queue)

Stores callbacks from async Web API operations (setTimeout, setInterval, DOM events).

```js
setTimeout(() => {
  console.log("Callback executed");
}, 0);

console.log("Main code");

// Output:
// Main code
// Callback executed
```

> Even with `0` delay, the callback waits for the Call Stack to empty.

### Microtask Queue (High Priority)

Stores high-priority async tasks: **Promise callbacks**, `queueMicrotask`, `MutationObserver`.

> **Key rule:** Microtasks execute **before** Callback Queue tasks.

```js
Promise.resolve().then(() => {
  console.log("Promise executed");
});

setTimeout(() => {
  console.log("Timeout executed");
}, 0);

// Output:
// Promise executed
// Timeout executed
```

---

### Event Loop

```js
// Full example
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

---

### Microtask vs Macrotask Comparison

| Aspect | Microtask | Macrotask |
|--------|-----------|-----------|
| Priority | High | Low |
| Execution | All microtasks before next macrotask | One macrotask at a time |
| Examples | Promise, queueMicrotask | setTimeout, setInterval, DOM events |
| Queue Name | Microtask Queue | Callback Queue |

---

### Common Interview Questions

**Q1: Why does Promise execute before setTimeout?**
> Microtask Queue has higher priority than Callback Queue. Event Loop executes **all** microtasks before taking the next macrotask.

**Q2: Is JavaScript truly asynchronous?**
> No. JavaScript is single-threaded. Async behavior is achieved through Web APIs, the Event Loop, and task queues.

**Q3: What happens if the Call Stack never empties?**
> Callback Queue tasks never execute → UI freezes (blocking).
```js
// This freezes the browser
while (true) {} // infinite loop
setTimeout(() => console.log("Never runs"), 0);
```

**Q4: Why use the Microtask Queue?**
> For operations that must run before the browser repaints — Promise chains, DOM mutations, critical updates.

---

### Best Practices

```js
// 1. Use Promises for dependent async operations
async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
}

// 2. Use setTimeout for heavy computations (non-blocking)
setTimeout(() => {
    heavyComputation();
}, 0);

// 3. async/await is Promise-based — uses Microtask Queue
async function test() {
    await Promise.resolve();
    console.log("Runs before setTimeout");
}
```

**Key Takeaways:**
- ✅ JavaScript is single-threaded but achieves async behavior through the Event Loop
- ✅ Call Stack executes synchronous code (LIFO)
- ✅ Web APIs handle async operations in background
- ✅ **Microtask Queue** (Promise) has **higher priority**
- ✅ **Callback Queue** (setTimeout) has **lower priority**
- ✅ Order: Sync → Microtasks → Macrotasks → Render

---
