# useState Hook

## What is useState?

**useState** is a React Hook that lets you add state to functional components.

Before Hooks, only class components could have state. Now with `useState`,
functional components can manage state too.

```javascript
import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    // count = state value
    // setCount = function to update state
    // 0 = initial value
};
```

---

## Basic Syntax

```javascript
const [state, setState] = useState(initialValue);
```

| Part | What it is |
|---|---|
| `state` | Current value (read-only) |
| `setState` | Function to update the state |
| `initialValue` | First time render value |

---

## 1. Counter Example — Most Common

```javascript
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}
```

---

## 2. Text Input — Form State

```javascript
import { useState } from "react";

export default function TextInput() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </div>
    );
}
```

---

## 3. Toggle State — Boolean

```javascript
import { useState } from "react";

export default function Toggle() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div style={{ background: isDarkMode ? "#000" : "#fff", color: isDarkMode ? "#fff" : "#000" }}>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Close" : "Open"} Menu
            </button>

            {isOpen && <p>Menu is open!</p>}

            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                Toggle Dark Mode
            </button>
        </div>
    );
}
```

---

## 4. Object State — Complex Data

```javascript
import { useState } from "react";

export default function UserProfile() {
    const [user, setUser] = useState({
        name: "Sandhya",
        age: 22,
        role: "React Developer"
    });

    // ❌ Wrong — replaces entire object!
    // const handleNameChange = (newName) => {
    //     setUser({ name: newName }); // loses age and role!
    // };

    // ✅ Correct — use spread operator to preserve other properties
    const handleNameChange = (newName) => {
        setUser({ ...user, name: newName });
    };

    const handleAgeChange = (newAge) => {
        setUser({ ...user, age: newAge });
    };

    return (
        <div>
            <input
                value={user.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Name"
            />
            <input
                value={user.age}
                onChange={(e) => handleAgeChange(Number(e.target.value))}
                placeholder="Age"
                type="number"
            />
            <p>{user.name} — {user.age} — {user.role}</p>
        </div>
    );
}
```

---

## 5. Array State — Lists

```javascript
import { useState } from "react";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, done: false }]);
            setInput("");
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a task..."
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                                textDecoration: todo.done ? "line-through" : "none",
                                cursor: "pointer"
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

---

## 6. Multiple useState Calls

```javascript
import { useState } from "react";

export default function Form() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ firstName, lastName, email, phone });
        setSubmitted(true);
    };

    if (submitted) {
        return <p>Form submitted!</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

---

## 7. State Derived from Props

```javascript
import { useState } from "react";

export default function UserCard({ initialName = "Guest" }) {
    // Initialize state from prop
    const [name, setName] = useState(initialName);
    const [age, setAge] = useState(0);

    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => setAge(age + 1)}>Birthday</button>
        </div>
    );
}

// Usage
<UserCard initialName="Sandhya" />
```

---

## 8. Function Update Pattern — For Complex Updates

```javascript
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    // ❌ Wrong — count might be stale
    const handleIncrement = () => {
        setCount(count + 1); // uses current count, might be batched
        setCount(count + 1); // still uses old count — only increments by 1!
    };

    // ✅ Correct — use function update (updater function)
    const handleIncrementCorrect = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1); // guaranteed to use latest count
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleIncrementCorrect}>Increment Twice</button>
        </div>
    );
}
```

---

## 9. useState with useEffect — Data Fetching

```javascript
import { useState, useEffect } from "react";

export default function UserData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

---

## 10. Custom Hook — Reusable State Logic

```javascript
import { useState } from "react";

// Custom hook — reusable state logic
function useInput(initialValue = "") {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        bind: {
            value,
            onChange: (e) => setValue(e.target.value)
        },
        reset: () => setValue(initialValue)
    };
}

// Usage
export default function Form() {
    const name = useInput("");
    const email = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name: name.value, email: email.value });
        name.reset();
        email.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input {...name.bind} placeholder="Name" />
            <input {...email.bind} placeholder="Email" type="email" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

---


## 12. useState vs State Object

```javascript
// Option 1 — Multiple useState calls
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [email, setEmail] = useState("");

// Option 2 — Single useState with object
const [formData, setFormData] = useState({
    name: "",
    age: 0,
    email: ""
});

// Which is better?
// Multiple hooks — when fields are independent
// Single object — when fields are related (form data)
```

---

## State vs Props — Comparison

| | State | Props |
|---|---|---|
| Can change? | ✅ Yes — setState | ❌ No — read only |
| Where set? | Inside component | Parent component |
| Scope | Component only | Parent → child |
| Re-render | ✅ Updates trigger re-render | ✅ Changes trigger re-render |
| Use case | Form inputs, toggles, counters | Pass data down |

---

## Key Rules — React Rules of Hooks

```javascript
// Rule 1 — Only call at top level (not in loops, conditions, functions)
function Component() {
    const [state, setState] = useState(0); // ✅ Top level
    
    if (true) {
        // const [bad, setBad] = useState(0); // ❌ Inside condition
    }
    
    return null;
}

// Rule 2 — Only call in React functions (components and custom hooks)
function myComponent() {
    const [state, setState] = useState(0); // ✅ Component function
    return null;
}

function notComponent() {
    // const [bad, setBad] = useState(0); // ❌ Regular function
}

// Rule 3 — Use updater function for batch updates
setCount(prev => prev + 1); // ✅ Guarantees latest value
setCount(count + 1);         // ⚠️ May use stale value
```

---

## Key Takeaways

1. `useState` lets functional components have state ✅
2. **Always** initialize with a default value — empty string, 0, false, [], {}
3. Use **spread operator** with objects — `{ ...state, property: newValue }`
4. Use **array methods** with arrays — `.map()`, `.filter()`, `.concat()`
5. For complex updates, use **updater function** — `setState(prev => ...)`
6. **Never mutate** state directly — always create new objects/arrays
7. Multiple **useState calls are fine** — even better for unrelated state
8. Only call hooks at **top level** — never in loops, conditions, or nested functions
