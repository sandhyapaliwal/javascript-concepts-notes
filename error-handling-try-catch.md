# Error Handling in JavaScript — try/catch

## What is Error Handling?

**Error Handling** is the process of catching and managing errors gracefully
so that your application does not crash unexpectedly.

JavaScript provides the **try/catch/finally** block to handle errors.

```javascript
try {
    // code that might throw an error
} catch (error) {
    // handle the error here
} finally {
    // always runs — with or without error
}
```

---

## 1. Basic try/catch

```javascript
// Without try/catch — app crashes ❌
console.log(undeclaredVariable); // ReferenceError — app stops!
console.log("This never runs");

// With try/catch — error handled gracefully ✅
try {
    console.log(undeclaredVariable); // throws ReferenceError
} catch (error) {
    console.log("Error caught:", error.message); // "undeclaredVariable is not defined"
}
console.log("App keeps running!"); // ✅ runs normally
```

---

## 2. The Error Object

```javascript
try {
    null.name; // TypeError
} catch (error) {
    console.log(error.name);    // "TypeError"
    console.log(error.message); // "Cannot read properties of null"
    console.log(error.stack);   // full stack trace — useful for debugging
}
```

---

## 3. Types of Built-in Errors

```javascript
// ReferenceError — variable not defined
try {
    console.log(x);
} catch (e) {
    console.log(e.name); // "ReferenceError"
}

// TypeError — wrong type operation
try {
    null.toString();
} catch (e) {
    console.log(e.name); // "TypeError"
}

// SyntaxError — invalid syntax (caught at parse time usually)
try {
    eval("Hello World ===");
} catch (e) {
    console.log(e.name); // "SyntaxError"
}

// RangeError — value out of range
try {
    new Array(-1);
} catch (e) {
    console.log(e.name); // "RangeError"
}

// URIError — invalid URI
try {
    decodeURIComponent("%");
} catch (e) {
    console.log(e.name); // "URIError"
}
```

---

## 4. finally Block

```javascript
// finally always runs — whether error occurs or not
function fetchData() {
    try {
        console.log("Fetching data...");
        throw new Error("Network error!");
        console.log("This never runs");
    } catch (error) {
        console.log("Error:", error.message); // "Network error!"
    } finally {
        console.log("Always runs — cleanup here"); // ✅ always
    }
}

fetchData();
// Fetching data...
// Error: Network error!
// Always runs — cleanup here

// Common use case — loading state in React
async function loadUser() {
    setLoading(true); // show spinner
    try {
        const data = await fetchUser();
        setUser(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false); // hide spinner — always! ✅
    }
}
```

---

## 5. throw — Create Custom Errors

```javascript
// throw any value
throw "Something went wrong";   // string
throw 404;                       // number
throw true;                      // boolean

// throw Error object — best practice ✅
throw new Error("Something went wrong");

// Custom validation with throw
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed!");
    }
    return a / b;
}

try {
    console.log(divide(10, 2));  // 5
    console.log(divide(10, 0));  // throws error
} catch (error) {
    console.log("Error:", error.message); // "Division by zero is not allowed!"
}

// Validate user input
function createUser(name, age) {
    if (!name) {
        throw new Error("Name is required");
    }
    if (typeof age !== "number" || age < 0) {
        throw new Error("Age must be a positive number");
    }
    return { name, age };
}

try {
    const user = createUser("", 22);
} catch (error) {
    console.log(error.message); // "Name is required"
}
```

---

## 6. Custom Error Classes

```javascript
// Create custom error types by extending Error
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

class NotFoundError extends Error {
    constructor(resource) {
        super(`${resource} not found`);
        this.name = "NotFoundError";
    }
}

// Usage
function getUser(id) {
    if (!id) throw new ValidationError("User ID is required");
    if (id < 0) throw new ValidationError("User ID must be positive");
    if (id > 1000) throw new NotFoundError("User");

    return { id, name: "Sandhya" };
}

try {
    const user = getUser(9999);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Validation failed:", error.message);
    } else if (error instanceof NotFoundError) {
        console.log("Not found:", error.message); // "User not found"
    } else {
        console.log("Unexpected error:", error.message);
    }
}
```

---

## 7. Error Handling with Async/Await

```javascript
// Basic async error handling
async function fetchUser(id) {
    try {
        const response = await fetch(`https://api.example.com/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Fetch failed:", error.message);
        throw error; // re-throw for caller to handle
    } finally {
        console.log("Fetch attempt complete");
    }
}

// Handle at call site
async function loadPage() {
    try {
        const user = await fetchUser(1);
        console.log(user.name);
    } catch (error) {
        console.log("Page load failed:", error.message);
    }
}

// Multiple async operations
async function loadDashboard() {
    try {
        const [user, posts, notifications] = await Promise.all([
            fetchUser(1),
            fetchPosts(1),
            fetchNotifications(1)
        ]);

        setUser(user);
        setPosts(posts);
        setNotifications(notifications);

    } catch (error) {
        // if ANY of the three fails — caught here
        console.log("Dashboard load failed:", error.message);
        setError(error.message);
    } finally {
        setLoading(false);
    }
}
```

---

## 8. Error Handling with Promises

```javascript
// .catch() on promise chain
fetch("https://api.example.com/users")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log("Error:", error.message))
    .finally(() => console.log("Done"));

// Promise.allSettled — never fails, handles each result
const promises = [
    fetch("https://api.example.com/users"),
    fetch("https://api.example.com/posts"),
    fetch("https://invalid-url.com") // this will fail
];

Promise.allSettled(promises).then(results => {
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Promise ${index} succeeded`);
        } else {
            console.log(`Promise ${index} failed:`, result.reason);
        }
    });
});
```

---

## 9. Global Error Handling

```javascript
// Catch unhandled errors globally
window.addEventListener("error", (event) => {
    console.log("Global error:", event.message);
    console.log("File:", event.filename);
    console.log("Line:", event.lineno);
});

// Catch unhandled Promise rejections
window.addEventListener("unhandledrejection", (event) => {
    console.log("Unhandled promise rejection:", event.reason);
    event.preventDefault(); // prevent default browser error
});

// Node.js global error handling
process.on("uncaughtException", (error) => {
    console.log("Uncaught exception:", error.message);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    console.log("Unhandled rejection:", reason);
});
```

---

## 10. Error Handling in React

```javascript
import { useState, useEffect } from "react";

// Error state pattern
const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);

                if (!response.ok) {
                    throw new Error("Failed to load user profile");
                }

                const data = await response.json();
                setUser(data);
                setError(null); // clear previous errors

            } catch (err) {
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!user) return <p>No user found</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};

// Form validation with error handling
const LoginForm = () => {
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email = e.target.email.value;
            const password = e.target.password.value;

            if (!email) throw new Error("Email is required");
            if (!password) throw new Error("Password is required");
            if (password.length < 6) throw new Error("Password too short");

            await loginUser({ email, password });
            setFormError(""); // clear error on success

        } catch (error) {
            setFormError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {formError && <p className="error">{formError}</p>}
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};
```

---

## Quick Reference Table

| Block | Purpose | Runs When |
|---|---|---|
| `try` | Code that might fail | Always — first |
| `catch(error)` | Handle the error | Only when error occurs |
| `finally` | Cleanup code | Always — last |
| `throw` | Create custom error | Manually triggered |

## Common Error Types

| Error | Cause |
|---|---|
| `ReferenceError` | Variable not defined |
| `TypeError` | Wrong type operation |
| `SyntaxError` | Invalid JavaScript syntax |
| `RangeError` | Value out of allowed range |
| `NetworkError` | Failed HTTP request (custom) |
| `ValidationError` | Invalid input (custom) |

---

## Key Takeaways

1. Always wrap risky code in **try/catch** — never let errors crash the app ✅
2. **finally** always runs — perfect for cleanup and stopping loading states
3. Use **throw** to create custom errors with meaningful messages
4. Create **custom error classes** for different error types in large apps
5. **Async/Await** errors must be wrapped in try/catch
6. Always check **response.ok** in fetch — it does not throw on 404/500
7. In React — use **error state** to show error messages to users ✅

---

> 💡 **Golden Rule:**
> Never let errors fail silently.
> Always catch, log, and handle errors gracefully —
> your users should see a friendly message, not a broken app!
