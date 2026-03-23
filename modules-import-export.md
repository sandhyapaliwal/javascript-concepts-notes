# Modules — import / export in JavaScript

## What are Modules?

**Modules** allow you to split your JavaScript code into separate files,
each with its own scope. You can then **export** things from one file
and **import** them in another.

Benefits:
- Code is **organized** and easier to maintain
- **Reusable** across multiple files
- **No naming conflicts** — each module has its own scope
- Better **readability** for large projects

```
project/
├── utils/
│   ├── math.js       ← export functions here
│   └── helpers.js    ← export helpers here
├── components/
│   └── Button.jsx    ← export component here
└── App.js            ← import everything here
```

---

## 1. Named Exports

```javascript
// ---- math.js ----

// Export individually
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export const square = n => n * n;
export const cube = n => n * n * n;
```

```javascript
// ---- app.js ----

// Import named exports — use exact same names
import { PI, add, subtract, multiply } from "./math.js";

console.log(PI);           // 3.14159
console.log(add(5, 3));    // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(3, 4));  // 12
```

---

## 2. Export at the Bottom — Cleaner Way

```javascript
// ---- helpers.js ----

function formatName(first, last) {
    return `${first} ${last}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function truncate(str, maxLength) {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

const VERSION = "1.0.0";

// Export all at the bottom — easy to see what's exported
export { formatName, capitalize, truncate, VERSION };
```

---

## 3. Default Export

```javascript
// ---- greeting.js ----

// Only ONE default export per file
export default function greet(name) {
    return `Hello, ${name}! Welcome.`;
}

// OR — arrow function
const greet = name => `Hello, ${name}! Welcome.`;
export default greet;

// OR — export class as default
export default class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getInfo() {
        return `${this.name} is ${this.age} years old`;
    }
}
```

```javascript
// ---- app.js ----

// Import default — can use ANY name you want
import greet from "./greeting.js";
import sayHello from "./greeting.js"; // also valid — any name works

console.log(greet("Sandhya")); // "Hello, Sandhya! Welcome."
```

---

## 4. Named + Default Export Together

```javascript
// ---- userUtils.js ----

// Default export — main thing this file does
export default function createUser(name, age) {
    return { id: Date.now(), name, age, createdAt: new Date() };
}

// Named exports — helper functions
export function validateName(name) {
    return name && name.length >= 2;
}

export function validateAge(age) {
    return age >= 0 && age <= 120;
}

export const MAX_AGE = 120;
export const MIN_NAME_LENGTH = 2;
```

```javascript
// ---- app.js ----

// Import both default and named at once
import createUser, { validateName, validateAge, MAX_AGE } from "./userUtils.js";

const user = createUser("Sandhya", 22);
console.log(user); // { id: ..., name: "Sandhya", age: 22, ... }

console.log(validateName("Sandhya")); // true
console.log(validateAge(200));        // false
console.log(MAX_AGE);                 // 120
```

---

## 5. Rename on Import / Export

```javascript
// ---- math.js ----
export { add as addition, subtract as minus, multiply as times };

// ---- app.js ----
import { addition, minus, times } from "./math.js";

console.log(addition(2, 3)); // 5
console.log(minus(10, 4));   // 6

// Rename on import side
import { add as sum, multiply as product } from "./math.js";
console.log(sum(2, 3));     // 5
console.log(product(3, 4)); // 12

// Rename default import
import { default as greetUser } from "./greeting.js";
```

---

## 6. Import Everything — Namespace Import

```javascript
// ---- math.js ----
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14;

// ---- app.js ----

// Import everything as one object
import * as math from "./math.js";

console.log(math.add(2, 3));      // 5
console.log(math.subtract(10, 4)); // 6
console.log(math.PI);              // 3.14

// Useful when using many exports from same file
import * as utils from "./helpers.js";
utils.formatName("Sandhya", "Paliwal");
utils.capitalize("react developer");
```

---

## 7. Re-exporting — Barrel Exports

```javascript
// ---- components/Button.jsx ----
export default function Button({ label }) {
    return <button>{label}</button>;
}

// ---- components/Input.jsx ----
export default function Input({ placeholder }) {
    return <input placeholder={placeholder} />;
}

// ---- components/Card.jsx ----
export default function Card({ title, content }) {
    return <div><h2>{title}</h2><p>{content}</p></div>;
}

// ---- components/index.js ---- (barrel file)
// Re-export everything from one place
export { default as Button } from "./Button.jsx";
export { default as Input } from "./Input.jsx";
export { default as Card } from "./Card.jsx";

// ---- App.js ----
// Now import all from one place — clean! ✅
import { Button, Input, Card } from "./components";

// Instead of:
// import Button from "./components/Button";
// import Input from "./components/Input";
// import Card from "./components/Card";
```

---

## 8. Dynamic Imports — Lazy Loading

```javascript
// Static import — loaded immediately at start
import { add } from "./math.js";

// Dynamic import — loaded only when needed
async function loadMath() {
    const math = await import("./math.js");
    console.log(math.add(2, 3)); // 5
}

// Useful for code splitting in React
const HeavyComponent = React.lazy(() => import("./HeavyComponent.jsx"));

// Conditional import
async function loadFeature(featureName) {
    if (featureName === "chart") {
        const { ChartComponent } = await import("./ChartComponent.js");
        ChartComponent.render();
    }
}

// Load on button click
button.addEventListener("click", async () => {
    const { showModal } = await import("./modal.js");
    showModal();
});
```

---

## 9. Modules in React — Everyday Use

```javascript
// ---- api/users.js ----
const BASE_URL = "https://api.example.com";

export async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
}

export async function fetchUserById(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
}

// ---- components/UserList.jsx ----
import { useState, useEffect } from "react";
import { fetchUsers } from "../api/users";
import { formatName, truncate } from "../utils/helpers";
import UserCard from "./UserCard";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return (
        <div>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    name={formatName(user.firstName, user.lastName)}
                    bio={truncate(user.bio, 100)}
                />
            ))}
        </div>
    );
};

export default UserList;
```

---

## 10. Common Module Patterns

```javascript
// ---- constants.js ----
export const API_URL = "https://api.example.com";
export const MAX_ITEMS = 10;
export const THEMES = {
    LIGHT: "light",
    DARK: "dark"
};

// ---- hooks/useFetch.js ---- (custom hook)
import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}

// ---- App.js ----
import useFetch from "./hooks/useFetch";
import { API_URL, MAX_ITEMS } from "./constants";

const App = () => {
    const { data, loading, error } = useFetch(`${API_URL}/users`);
    // ...
};
```

---

## Named vs Default Export — When to Use

| | Named Export | Default Export |
|---|---|---|
| Syntax | `export { name }` | `export default` |
| Import syntax | `import { name }` | `import anyName` |
| Per file | Multiple allowed | Only ONE allowed |
| Best for | Utilities, constants, helpers | Main component, class, function |
| Auto-complete | ✅ Better IDE support | ❌ Any name — harder to track |
| React components | Optional | ✅ Convention |

---

## Quick Reference

```javascript
// Named export
export const name = value;
export function fn() {}
export { a, b, c };

// Default export
export default value;
export default function fn() {}

// Named import
import { a, b } from "./file";
import { a as newName } from "./file";

// Default import
import anything from "./file";

// Both
import defaultThing, { named1, named2 } from "./file";

// All
import * as everything from "./file";

// Dynamic
const module = await import("./file");
```

---

## Key Takeaways

1. **Named exports** — multiple per file, import with exact name in `{}`
2. **Default export** — only ONE per file, import with any name
3. Use **barrel files** (index.js) to re-export from one central place ✅
4. **Dynamic imports** load code only when needed — better performance
5. In React — components use **default export**, utilities use **named exports**
6. Always use **relative paths** (`./file`) for your own modules
7. Modules keep code **organized, reusable, and maintainable** ✅

---
