# API Calling in JavaScript

## What is an API?

**API (Application Programming Interface)** allows different software systems
to communicate with each other.

In JavaScript, APIs are used to:
- Fetch data from servers
- Interact with databases
- Integrate third-party services (weather, payments, social media)

---

## Ways to Call APIs in JavaScript

| Method | Type | Recommended? |
|---|---|---|
| **Fetch API** | Built-in | ✅ Yes — modern standard |
| **Axios** | Third-party library | ✅ Yes — for complex apps |
| **XMLHttpRequest** | Built-in | ❌ Old — avoid |

---

## 1. Fetch API

### Basic GET Request

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
```

### GET Request with Async/Await — Recommended ✅

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

## 2. POST Request — Send Data to Server

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

## 3. PUT Request — Update Existing Data

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

## 4. DELETE Request — Remove Data

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

## 5. Axios — Third Party Library

### Installation

```bash
npm install axios
```

### GET Request

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

### POST Request

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

createPost({ title: "My Post", body: "Content here", userId: 1 });
```

### PUT Request

```javascript
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

### DELETE Request

```javascript
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

## 6. HTTP Methods — Quick Reference

| Method | Purpose | Example Use Case |
|---|---|---|
| `GET` | Retrieve data | Fetch user profile, load posts |
| `POST` | Create new data | Create new user, submit form |
| `PUT` | Replace entire resource | Update user profile completely |
| `PATCH` | Partial update | Update only user's email |
| `DELETE` | Remove data | Delete a post or user |

---

## 7. Error Handling

### Fetch — Manual Error Handling

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        // ⚠️ fetch does NOT throw on 404/500 — check manually!
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

### Axios — Automatic Error Handling

```javascript
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            console.error("Server error:", error.response.status);
        } else if (error.request) {
            // Request made but no response received
            console.error("No response from server");
        } else {
            console.error("Error:", error.message);
        }
    }
}
```

---

## 8. Query Parameters

### Fetch with Query Parameters

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

### Axios with Query Parameters

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

## 9. Real World — Reusable API Service

```javascript
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

## 10. Real World — User Management Class

```javascript
class UserAPI {
    constructor(baseURL = "https://jsonplaceholder.typicode.com") {
        this.baseURL = baseURL;
    }

    async getAllUsers() {
        try {
            const response = await fetch(`${this.baseURL}/users`);
            if (!response.ok) throw new Error("Failed to fetch users");
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async getUser(userId) {
        try {
            const response = await fetch(`${this.baseURL}/users/${userId}`);
            if (!response.ok) throw new Error("User not found");
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async createUser(userData) {
        try {
            const response = await fetch(`${this.baseURL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error("Failed to create user");
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await fetch(`${this.baseURL}/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error("Failed to update user");
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async deleteUser(userId) {
        try {
            const response = await fetch(`${this.baseURL}/users/${userId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete user");
            return { success: true };
        } catch (error) {
            console.error("Error:", error);
        }
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

## 11. Best Practices

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
    try {
        const data = await fetch(`/api/users/${userId}`).then(r => r.json());

        if (!data.id || !data.name) {
            throw new Error("Invalid user data received");
        }

        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}
```

---

## 12. Fetch API vs Axios — Comparison

| Feature | Fetch API | Axios |
|---|---|---|
| Built-in | ✅ Yes | ❌ Needs installation |
| Syntax | Verbose | Concise |
| Error Handling | Manual `response.ok` check | Automatic on 4xx/5xx |
| Request Timeout | ❌ No native support | ✅ Built-in |
| Interceptors | ❌ No | ✅ Yes |
| JSON Auto-convert | ❌ Need `.json()` | ✅ Automatic |
| Bundle Size | Zero | Small (~13kb) |
| Best For | Simple projects | Complex applications |

---

## Key Takeaways

1. Use **Fetch API** for simple projects — no dependencies needed ✅
2. Use **Axios** for complex apps — interceptors, auto JSON, cleaner syntax ✅
3. Always use **async/await** over `.then()` chains — more readable
4. **Fetch does NOT throw** on 404/500 — always check `response.ok` manually
5. Always wrap API calls in **try/catch** — handle errors gracefully
6. Use **environment variables** for API URLs — never hardcode them
7. Create a **reusable API service** — avoid repeating fetch logic everywhere
