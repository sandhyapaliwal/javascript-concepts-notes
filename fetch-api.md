# Fetch API in JavaScript

## What is the Fetch API?

The **Fetch API** is a modern, built-in JavaScript interface for making
HTTP requests to servers — fetching data, sending data, and interacting
with REST APIs.

It replaced the older `XMLHttpRequest` and works with **Promises**,
making it clean and easy to use.

```javascript
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

---

## 1. Basic GET Request

```javascript
// Fetch data from an API
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log(response);        // Response object
        console.log(response.status); // 200
        console.log(response.ok);     // true (if status 200-299)
        return response.json();       // parse JSON — returns a Promise
    })
    .then(data => {
        console.log(data);            // actual data object
        console.log(data.name);       // "Leanne Graham"
    })
    .catch(error => {
        console.log("Error:", error);
    });
```

---

## 2. GET Request with Async/Await — Cleaner Way ✅

```javascript
async function getUser() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        // Always check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.name);  // "Leanne Graham"
        console.log(data.email); // "Sincere@april.biz"

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getUser();
```

---

## 3. Fetch Multiple Items

```javascript
// GET all posts
async function getAllPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();

        console.log(posts.length); // 100

        // Map through posts
        posts.forEach(post => {
            console.log(post.title);
        });

    } catch (error) {
        console.log("Error:", error);
    }
}

getAllPosts();
```

---

## 4. POST Request — Send Data to Server

```javascript
async function createPost() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",                         // HTTP method
            headers: {
                "Content-Type": "application/json" // tell server we're sending JSON
            },
            body: JSON.stringify({                  // convert object to JSON string
                title: "My First Post",
                body: "This is the post content",
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Created:", data);
        console.log("New post ID:", data.id); // 101

    } catch (error) {
        console.log("Error:", error.message);
    }
}

createPost();
```

---

## 5. PUT Request — Update Existing Data

```javascript
async function updatePost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                title: "Updated Title",
                body: "Updated content",
                userId: 1
            })
        });

        const data = await response.json();
        console.log("Updated:", data);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

updatePost(1);
```

---

## 6. PATCH Request — Update Partial Data

```javascript
async function patchPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Only Title Updated" // only sending what needs to change
            })
        });

        const data = await response.json();
        console.log("Patched:", data);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

patchPost(1);
```

---

## 7. DELETE Request

```javascript
async function deletePost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            console.log(`Post ${id} deleted successfully!`);
        }

    } catch (error) {
        console.log("Error:", error.message);
    }
}

deletePost(1);
```

---

## 8. Fetch with Headers — Authentication

```javascript
async function getProtectedData() {
    try {
        const response = await fetch("https://api.example.com/protected", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${yourAuthToken}`, // JWT token
                "Accept": "application/json"
            }
        });

        if (response.status === 401) {
            throw new Error("Unauthorized — please login again");
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Error:", error.message);
    }
}
```

---

## 9. Fetch with Query Parameters

```javascript
async function searchUsers(query) {
    try {
        // Add query params to URL
        const url = `https://api.example.com/users?search=${query}&limit=10&page=1`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

searchUsers("sandhya");

// Using URLSearchParams — cleaner way
async function searchUsersClean(query, page = 1) {
    const params = new URLSearchParams({
        search: query,
        limit: 10,
        page: page
    });

    const response = await fetch(`https://api.example.com/users?${params}`);
    const data = await response.json();
    console.log(data);
}
```

---

## 10. Response Methods

```javascript
const response = await fetch("https://api.example.com/data");

// Different ways to read the response body
const jsonData = await response.json();    // parse as JSON — most common
const textData = await response.text();    // parse as plain text
const blobData = await response.blob();    // parse as binary (images, files)

// Response properties
response.ok;         // true if status 200-299
response.status;     // 200, 201, 400, 401, 404, 500, etc.
response.statusText; // "OK", "Not Found", etc.
response.headers;    // response headers
response.url;        // final URL after redirects
```

---

## 11. Error Handling — Important!

```javascript
// ⚠️ fetch() does NOT throw on HTTP errors (404, 500, etc.)
// It only throws on network failures (no internet, DNS error)
// Always check response.ok manually!

async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);

        // Check for HTTP errors manually
        if (!response.ok) {
            if (response.status === 404) throw new Error("Resource not found");
            if (response.status === 401) throw new Error("Unauthorized");
            if (response.status === 500) throw new Error("Server error");
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        // Network error OR our thrown errors
        console.log("Error:", error.message);
        throw error; // re-throw for caller to handle
    }
}
```

---

## 12. Real World — Fetch in React with useEffect

```javascript
import { useState, useEffect } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // always stop loading
            }
        };

        fetchUsers();
    }, []); // empty array — runs only once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name} — {user.email}</li>
            ))}
        </ul>
    );
};

export default UserList;
```

---

## HTTP Methods Quick Reference

| Method | Purpose | Has Body? |
|---|---|---|
| `GET` | Fetch/read data | ❌ No |
| `POST` | Create new data | ✅ Yes |
| `PUT` | Replace existing data | ✅ Yes |
| `PATCH` | Update partial data | ✅ Yes |
| `DELETE` | Delete data | ❌ Usually No |

---

## Common HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | OK — success |
| `201` | Created — POST success |
| `400` | Bad Request — wrong data sent |
| `401` | Unauthorized — login required |
| `403` | Forbidden — no permission |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## Key Takeaways

1. `fetch()` returns a **Promise** — always use `.then()` or `async/await`
2. Always call `response.json()` to parse the response body
3. `fetch()` does **NOT** throw on HTTP errors — always check `response.ok` ✅
4. Use `method`, `headers`, and `body` options for POST/PUT/PATCH requests
5. Always wrap in **try/catch** to handle network errors
6. In React — always fetch inside **useEffect** with `async/await`
7. Use `finally` to stop loading state whether request succeeds or fails

---

> 💡 **Golden Rule:**
> Always check `response.ok` — fetch won't throw on 404 or 500 errors!
> Always handle errors with try/catch — network failures can happen anytime.
