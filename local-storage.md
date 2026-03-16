# localStorage in JavaScript

## What is localStorage?

**localStorage** is a built-in browser API that allows you to store
key-value pairs in the browser — data that **persists even after
the page is refreshed or the browser is closed**.

It is part of the **Web Storage API** and stores data with no expiration time.

```
localStorage
├── Stores data as strings (key-value pairs)
├── Data persists until manually cleared
├── Storage limit — ~5MB per domain
└── Only accessible from the same origin (same domain)
```

---

## localStorage vs sessionStorage vs Cookies

| Feature | localStorage | sessionStorage | Cookies |
|---|---|---|---|
| Expires | Never | Tab closes | Set by developer |
| Storage | ~5MB | ~5MB | ~4KB |
| Accessible | Same origin | Same tab | Server + Client |
| Auto sent to server | ❌ No | ❌ No | ✅ Yes |
| Best for | Persistent data | Temporary data | Auth tokens |

---

## 1. Basic Methods

```javascript
// setItem — store a value
localStorage.setItem("name", "Sandhya");
localStorage.setItem("city", "Dehradun");
localStorage.setItem("role", "React Developer");

// getItem — retrieve a value
const name = localStorage.getItem("name");
console.log(name); // "Sandhya"

// removeItem — remove a specific key
localStorage.removeItem("city");

// clear — remove ALL items
localStorage.clear();

// length — number of items stored
console.log(localStorage.length); // 2

// key — get key name by index
console.log(localStorage.key(0)); // "name"
```

---

## 2. Storing Numbers and Booleans

```javascript
// ⚠️ localStorage stores everything as STRINGS
// Numbers and booleans need to be converted back

// Store
localStorage.setItem("age", 22);
localStorage.setItem("isLoggedIn", true);

// Retrieve — comes back as string!
const age = localStorage.getItem("age");
console.log(age);        // "22" — string, not number!
console.log(typeof age); // "string"

// Convert back to correct type
const ageNumber = Number(localStorage.getItem("age"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

console.log(ageNumber);   // 22 — number ✅
console.log(isLoggedIn);  // true — boolean ✅
```

---

## 3. Storing Objects and Arrays — JSON

```javascript
// ⚠️ Objects cannot be stored directly
const user = { name: "Sandhya", age: 22, role: "Developer" };

// Wrong way ❌
localStorage.setItem("user", user);
localStorage.getItem("user"); // "[object Object]" — useless!

// Correct way — JSON.stringify to store ✅
localStorage.setItem("user", JSON.stringify(user));

// JSON.parse to retrieve ✅
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // "Sandhya"
console.log(storedUser.age);  // 22

// Storing an array
const skills = ["React", "JavaScript", "Tailwind CSS"];
localStorage.setItem("skills", JSON.stringify(skills));

const storedSkills = JSON.parse(localStorage.getItem("skills"));
console.log(storedSkills);        // ["React", "JavaScript", "Tailwind CSS"]
console.log(storedSkills.length); // 3
```

---

## 4. Safe Retrieval — Handling null

```javascript
// getItem returns null if key doesn't exist
const theme = localStorage.getItem("theme");
console.log(theme); // null — if not set

// Safe way — always provide a default value
const theme = localStorage.getItem("theme") || "light";
console.log(theme); // "light" — default value ✅

// Safe JSON parse — handle null and parse errors
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.log("Error reading localStorage:", error);
        return null;
    }
}

const user = getFromStorage("user");
```

---

## 5. Update Stored Data

```javascript
// Update a simple value
localStorage.setItem("theme", "dark"); // overwrites existing value

// Update a stored object
const user = JSON.parse(localStorage.getItem("user"));
user.age = 23; // modify
localStorage.setItem("user", JSON.stringify(user)); // save back

// Update a stored array — add item
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push({ id: Date.now(), text: "Learn React", done: false });
localStorage.setItem("tasks", JSON.stringify(tasks));

// Update a stored array — remove item
const updatedTasks = tasks.filter(task => task.id !== taskId);
localStorage.setItem("tasks", JSON.stringify(updatedTasks));
```

---

## 6. Real World — Theme Toggle (Dark/Light Mode)

```javascript
// On page load — apply saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

// Toggle button
const toggleBtn = document.querySelector("#theme-toggle");

toggleBtn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    localStorage.setItem("theme", newTheme); // save preference
    console.log("Theme saved:", newTheme);
});
```

---

## 7. Real World — Todo List with Persistence

```javascript
// Load tasks from localStorage on page load
function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks(); // load saved tasks

// Add task
function addTask(text) {
    const newTask = {
        id: Date.now(),
        text: text,
        done: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks); // persist immediately
}

// Toggle task done
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
    );
    saveTasks(tasks);
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}

addTask("Learn localStorage");
addTask("Build React project");
console.log(loadTasks()); // persists even after refresh!
```

---

## 8. Real World — Save Form Data (Auto-save Draft)

```javascript
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");

// Load saved draft on page load
titleInput.value = localStorage.getItem("draft-title") || "";
bodyInput.value = localStorage.getItem("draft-body") || "";

// Auto-save on every keystroke
titleInput.addEventListener("input", () => {
    localStorage.setItem("draft-title", titleInput.value);
});

bodyInput.addEventListener("input", () => {
    localStorage.setItem("draft-body", bodyInput.value);
});

// Clear draft on form submit
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem("draft-title");
    localStorage.removeItem("draft-body");
    console.log("Draft cleared after submit!");
});
```

---

## 9. localStorage in React

```javascript
import { useState, useEffect } from "react";

// Custom Hook — useLocalStorage
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

// Using the custom hook
const ThemeToggle = () => {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Current theme: {theme}
        </button>
    );
};

// Counter that persists
const Counter = () => {
    const [count, setCount] = useLocalStorage("count", 0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
};
```

---

## 10. Limitations and When NOT to Use

```javascript
// ⚠️ Never store sensitive data in localStorage
// It is accessible via JavaScript — XSS attacks can read it!

// ❌ Never do this
localStorage.setItem("password", "mypassword123");
localStorage.setItem("creditCard", "1234-5678-9012");
localStorage.setItem("authToken", jwtToken); // use httpOnly cookies instead

// ⚠️ localStorage is synchronous — can block main thread for large data
// For large data — use IndexedDB instead

// ⚠️ Not available in server-side rendering (SSR)
// In Next.js — always check if window exists first
if (typeof window !== "undefined") {
    localStorage.setItem("theme", "dark");
}
```

---

## Quick Reference

| Method | Description |
|---|---|
| `setItem(key, value)` | Store a value |
| `getItem(key)` | Get a value (returns null if not found) |
| `removeItem(key)` | Remove a specific item |
| `clear()` | Remove all items |
| `length` | Number of stored items |
| `key(index)` | Get key name by index |

---

## Key Takeaways

1. localStorage stores data as **strings only** — use `JSON.stringify` and `JSON.parse` for objects and arrays ✅
2. Data **persists** until manually cleared — survives page refresh and browser close
3. Always provide a **default value** when reading — `getItem` returns `null` if key not found
4. **Never store sensitive data** — passwords, tokens, credit cards ❌
5. Use for: theme preference, user settings, cart items, draft content, todo lists
6. In React — create a **custom `useLocalStorage` hook** for clean, reusable code ✅

---

> 💡 **Golden Rule:**
> Always JSON.stringify before storing objects.
> Always JSON.parse after retrieving objects.
> Never store sensitive information in localStorage!
