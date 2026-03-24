# JSON Methods in JavaScript

## What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight data format used to
store and exchange data between a server and a client.

It looks like a JavaScript object — but it is actually a **string**.

```json
{
    "name": "Sandhya",
    "age": 22,
    "role": "React Developer",
    "skills": ["React", "JavaScript", "Tailwind CSS"],
    "address": {
        "city": "Dehradun",
        "country": "India"
    }
}
```

---

## JSON vs JavaScript Object

```javascript
// JavaScript Object — keys without quotes, methods allowed
const jsObject = {
    name: "Sandhya",
    age: 22,
    greet() { return "Hello!" }  // methods allowed
};

// JSON — keys with double quotes, NO methods allowed
const jsonString = '{"name": "Sandhya", "age": 22}';

// Key differences:
// JSON keys MUST be in double quotes
// JSON values can only be: string, number, boolean, null, array, object
// JSON cannot have: functions, undefined, comments
```

---

## 1. JSON.stringify() — Object to JSON String

Converts a JavaScript object/array into a JSON string.
Used when **sending data to a server**.

```javascript
const user = {
    name: "Sandhya",
    age: 22,
    role: "React Developer",
    skills: ["React", "JavaScript"]
};

// Basic stringify
const jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"Sandhya","age":22,"role":"React Developer","skills":["React","JavaScript"]}'

console.log(typeof jsonString); // "string"

// With indentation — pretty print
const prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson);
// {
//   "name": "Sandhya",
//   "age": 22,
//   "role": "React Developer",
//   "skills": [
//     "React",
//     "JavaScript"
//   ]
// }

// Stringify arrays
const skills = ["React", "JavaScript", "Tailwind CSS"];
console.log(JSON.stringify(skills));
// '["React","JavaScript","Tailwind CSS"]'

// Stringify nested objects
const profile = {
    user: { name: "Sandhya", age: 22 },
    projects: [{ name: "Resume Builder" }, { name: "StockView" }]
};
console.log(JSON.stringify(profile, null, 2));
```

---

## 2. JSON.stringify() — Replacer Parameter

```javascript
const user = {
    name: "Sandhya",
    age: 22,
    password: "secret123",  // sensitive — should not be sent!
    role: "Developer"
};

// Array replacer — only include specific keys
const safe = JSON.stringify(user, ["name", "age", "role"]);
console.log(safe);
// '{"name":"Sandhya","age":22,"role":"Developer"}'
// password is excluded ✅

// Function replacer — custom logic
const filtered = JSON.stringify(user, (key, value) => {
    if (key === "password") return undefined; // exclude password
    if (typeof value === "number") return value * 2; // double numbers
    return value;
});
console.log(filtered);
// '{"name":"Sandhya","age":44,"role":"Developer"}'
```

---

## 3. JSON.parse() — JSON String to Object

Converts a JSON string back into a JavaScript object/array.
Used when **receiving data from a server**.

```javascript
const jsonString = '{"name":"Sandhya","age":22,"skills":["React","JavaScript"]}';

// Parse JSON string to object
const user = JSON.parse(jsonString);

console.log(user);           // { name: "Sandhya", age: 22, skills: [...] }
console.log(user.name);      // "Sandhya"
console.log(user.age);       // 22
console.log(user.skills[0]); // "React"
console.log(typeof user);    // "object"

// Parse array
const jsonArray = '["React","JavaScript","Tailwind CSS"]';
const skills = JSON.parse(jsonArray);
console.log(skills);       // ["React", "JavaScript", "Tailwind CSS"]
console.log(skills.length); // 3

// Parse nested JSON
const jsonNested = '{"user":{"name":"Sandhya"},"count":5}';
const data = JSON.parse(jsonNested);
console.log(data.user.name); // "Sandhya"
console.log(data.count);     // 5
```

---

## 4. JSON.parse() — Reviver Parameter

```javascript
const jsonString = '{"name":"Sandhya","birthYear":2002,"score":85}';

// Reviver function — transform values while parsing
const data = JSON.parse(jsonString, (key, value) => {
    if (key === "birthYear") return 2026 - value; // convert to age
    if (key === "score") return `${value}%`;       // add % symbol
    return value;
});

console.log(data.name);      // "Sandhya"
console.log(data.birthYear); // 24 (age)
console.log(data.score);     // "85%"
```

---

## 5. Error Handling with JSON.parse()

```javascript
// ⚠️ JSON.parse throws SyntaxError for invalid JSON
// Always wrap in try/catch!

// Invalid JSON examples
const invalid1 = "Hello World";          // not JSON
const invalid2 = "{name: 'Sandhya'}";   // single quotes not allowed
const invalid3 = "{'name': 'Sandhya'}"; // single quotes not allowed
const invalid4 = undefined;              // undefined is not JSON

// Safe parse with try/catch ✅
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.log("Invalid JSON:", error.message);
        return null;
    }
}

console.log(safeJsonParse('{"name":"Sandhya"}')); // { name: "Sandhya" }
console.log(safeJsonParse("invalid"));             // null — no crash ✅
console.log(safeJsonParse(undefined));             // null — no crash ✅
```

---

## 6. Deep Clone with JSON

```javascript
// JSON trick — create a deep copy of an object
const original = {
    name: "Sandhya",
    skills: ["React", "JavaScript"],
    address: { city: "Dehradun" }
};

// Shallow copy — nested objects still linked ❌
const shallowCopy = { ...original };
shallowCopy.address.city = "Mumbai"; // affects original!
console.log(original.address.city);  // "Mumbai" — changed! ❌

// Deep copy using JSON ✅
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Mumbai"; // does NOT affect original
console.log(original.address.city); // "Dehradun" — safe! ✅

// ⚠️ Limitation — JSON deep copy does NOT work for:
const withFn = {
    name: "Sandhya",
    greet: () => "Hello",    // function — lost after parse!
    createdAt: new Date(),   // Date — becomes string!
    score: undefined         // undefined — lost after parse!
};

const copied = JSON.parse(JSON.stringify(withFn));
console.log(copied.greet);     // undefined — function lost ❌
console.log(copied.createdAt); // string, not Date object ❌
```

---

## 7. JSON with localStorage

```javascript
// ⚠️ localStorage only stores strings — use JSON methods!

const user = { name: "Sandhya", role: "Developer", theme: "dark" };

// Store object in localStorage
localStorage.setItem("user", JSON.stringify(user));

// Retrieve object from localStorage
const stored = JSON.parse(localStorage.getItem("user"));
console.log(stored.name);  // "Sandhya"
console.log(stored.theme); // "dark"

// Store array
const tasks = [
    { id: 1, text: "Learn React", done: true },
    { id: 2, text: "Build project", done: false }
];

localStorage.setItem("tasks", JSON.stringify(tasks));
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
console.log(savedTasks.length); // 2
```

---

## 8. JSON with Fetch API — Real World

```javascript
// Sending JSON to server — POST request
async function createUser(userData) {
    const response = await fetch("https://api.example.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // tell server it's JSON
        },
        body: JSON.stringify(userData) // convert object to JSON string
    });

    const newUser = await response.json(); // parse response JSON
    return newUser;
}

const user = { name: "Sandhya", email: "sandhya@example.com" };
const created = await createUser(user);
console.log(created.id); // server assigned ID

// Receiving JSON from server — GET request
async function getUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`);
    const data = await response.json(); // automatically parses JSON ✅
    console.log(data.name);
    return data;
}
```

---

## 9. JSON.stringify() — What Gets Excluded

```javascript
const data = {
    name: "Sandhya",
    age: 22,
    greet: () => "Hello",   // ❌ functions — excluded
    score: undefined,        // ❌ undefined — excluded
    active: null,            // ✅ null — included
    count: 0,               // ✅ 0 — included
    flag: false,            // ✅ false — included
    createdAt: new Date()   // ⚠️ Date — converted to string
};

console.log(JSON.stringify(data, null, 2));
// {
//   "name": "Sandhya",
//   "age": 22,
//   "active": null,
//   "count": 0,
//   "flag": false,
//   "createdAt": "2026-03-06T..."
// }
// greet and score are missing!
```

---

## 10. JSON in React

```javascript
import { useState, useEffect } from "react";

const App = () => {
    const [tasks, setTasks] = useState(() => {
        // Load from localStorage on first render
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text) => {
        const newTask = { id: Date.now(), text, done: false };
        setTasks(prev => [...prev, newTask]);
    };

    const toggleTask = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    return (
        <ul>
            {tasks.map(task => (
                <li
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    style={{ textDecoration: task.done ? "line-through" : "none" }}
                >
                    {task.text}
                </li>
            ))}
        </ul>
    );
};
```

---

## Quick Reference Table

| Method | Purpose | Input | Output |
|---|---|---|---|
| `JSON.stringify(obj)` | Object → String | JS Object/Array | JSON String |
| `JSON.stringify(obj, null, 2)` | Pretty print | JS Object | Indented JSON String |
| `JSON.stringify(obj, filter)` | Filter keys | JS Object | Filtered JSON String |
| `JSON.parse(str)` | String → Object | JSON String | JS Object/Array |
| `JSON.parse(str, reviver)` | Transform while parsing | JSON String | Transformed Object |

---

## Valid JSON Value Types

| Type | Example | Valid in JSON? |
|---|---|---|
| String | `"Sandhya"` | ✅ Yes |
| Number | `22` | ✅ Yes |
| Boolean | `true` / `false` | ✅ Yes |
| Null | `null` | ✅ Yes |
| Array | `["React", "JS"]` | ✅ Yes |
| Object | `{"name": "S"}` | ✅ Yes |
| Function | `() => {}` | ❌ No |
| Undefined | `undefined` | ❌ No |
| Date | `new Date()` | ⚠️ Becomes string |

---

## Key Takeaways

1. `JSON.stringify()` — converts object to string — use when **sending data** ✅
2. `JSON.parse()` — converts string to object — use when **receiving data** ✅
3. Always wrap `JSON.parse()` in **try/catch** — invalid JSON throws error
4. JSON keys must be in **double quotes** — single quotes are invalid
5. Functions and undefined are **excluded** by JSON.stringify
6. Use `JSON.stringify + JSON.parse` for **deep cloning** objects
7. Always use JSON methods with **localStorage** and **fetch API** ✅

---

> 💡 **Golden Rule:**
> Sending data → JSON.stringify() → converts to string
> Receiving data → JSON.parse() → converts to object
> Always use try/catch with JSON.parse — never trust external data!
