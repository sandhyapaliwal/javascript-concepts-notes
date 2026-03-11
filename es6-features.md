# ES6 Features in JavaScript

## What is ES6?

**ES6 (ECMAScript 2015)** is a major update to JavaScript that introduced
powerful new features making code cleaner, shorter, and more readable.

Most modern JavaScript and React code is written using ES6+ features.

---

## 1. let and const

```javascript
// let — block scoped, can be reassigned
let name = "Sandhya";
name = "Paliwal"; // ✅ allowed

// const — block scoped, cannot be reassigned
const PI = 3.14;
PI = 3.15; // ❌ TypeError
```

> See `var-let-const.md` for detailed explanation.

---

## 2. Arrow Functions

```javascript
// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// No parameters
const greet = () => "Hello!";

// Single parameter
const double = n => n * 2;
```

> See `arrow-functions-in-js.md` for detailed explanation.

---

## 3. Template Literals

```javascript
const name = "Sandhya";
const role = "React Developer";
const age = 22;

// Old way — string concatenation
const msg1 = "Hello, my name is " + name + " and I am " + age + " years old.";

// ES6 — template literals (backticks)
const msg2 = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
const html = `
    <div class="card">
        <h2>${name}</h2>
        <p>${role}</p>
    </div>
`;

// Expressions inside ${}
const a = 10;
const b = 20;
console.log(`Sum is: ${a + b}`);         // "Sum is: 30"
console.log(`Is adult: ${age >= 18}`);   // "Is adult: true"

// Function calls inside ${}
const upper = str => str.toUpperCase();
console.log(`Name: ${upper(name)}`);     // "Name: SANDHYA"
```

---

## 4. Destructuring

### Array Destructuring
```javascript
const numbers = [1, 2, 3, 4, 5];

// Old way
const first = numbers[0];
const second = numbers[1];

// ES6 — array destructuring
const [first, second, third] = numbers;
console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3

// Skip elements
const [a, , c] = numbers;
console.log(a); // 1
console.log(c); // 3

// Default values
const [x = 0, y = 0, z = 0] = [10, 20];
console.log(z); // 0 — default value used

// Swap variables
let p = 1, q = 2;
[p, q] = [q, p];
console.log(p, q); // 2, 1
```

### Object Destructuring
```javascript
const user = {
    name: "Sandhya",
    age: 22,
    city: "Dehradun",
    role: "React Developer"
};

// Old way
const name = user.name;
const age = user.age;

// ES6 — object destructuring
const { name, age, city } = user;
console.log(name); // "Sandhya"
console.log(age);  // 22
console.log(city); // "Dehradun"

// Rename while destructuring
const { name: userName, role: jobRole } = user;
console.log(userName); // "Sandhya"
console.log(jobRole);  // "React Developer"

// Default values
const { name, salary = 50000 } = user;
console.log(salary); // 50000 — default value

// Nested destructuring
const person = {
    name: "Sandhya",
    address: {
        city: "Dehradun",
        state: "Uttarakhand"
    }
};
const { name, address: { city, state } } = person;
console.log(city);  // "Dehradun"
console.log(state); // "Uttarakhand"

// In function parameters — very common in React!
const greet = ({ name, age }) => `Hello ${name}, you are ${age}!`;
console.log(greet(user)); // "Hello Sandhya, you are 22!"
```

---

## 5. Spread Operator (...)

```javascript
// Spread arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — not affected ✅
console.log(copy);     // [1, 2, 3, 4]

// Spread objects
const user = { name: "Sandhya", age: 22 };
const updatedUser = { ...user, city: "Dehradun", age: 23 };
console.log(updatedUser);
// { name: "Sandhya", age: 23, city: "Dehradun" }

// React — update state with spread
const [user, setUser] = useState({ name: "Sandhya", age: 22 });
setUser({ ...user, age: 23 }); // update only age ✅

// Pass array as function arguments
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3
```

---

## 6. Rest Operator (...)

```javascript
// Rest in function parameters — collect remaining arguments
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest with destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Rest in object destructuring
const { name, age, ...others } = {
    name: "Sandhya",
    age: 22,
    city: "Dehradun",
    role: "Developer"
};
console.log(name);   // "Sandhya"
console.log(others); // { city: "Dehradun", role: "Developer" }
```

---

## 7. Default Parameters

```javascript
// Old way
function greet(name) {
    name = name || "Guest";
    return "Hello " + name;
}

// ES6 — default parameters
function greet(name = "Guest") {
    return `Hello ${name}`;
}

console.log(greet("Sandhya")); // "Hello Sandhya"
console.log(greet());          // "Hello Guest"

// With multiple parameters
function createUser(name = "Unknown", age = 0, role = "user") {
    return { name, age, role };
}

console.log(createUser("Sandhya", 22, "admin"));
// { name: "Sandhya", age: 22, role: "admin" }

console.log(createUser());
// { name: "Unknown", age: 0, role: "user" }
```

---

## 8. Shorthand Property Names

```javascript
const name = "Sandhya";
const age = 22;
const role = "React Developer";

// Old way
const user1 = { name: name, age: age, role: role };

// ES6 — shorthand (when key and variable name are same)
const user2 = { name, age, role };

console.log(user2);
// { name: "Sandhya", age: 22, role: "React Developer" }
```

---

## 9. Modules — import / export

```javascript
// ---- math.js ----
// Named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14;

// Default export — only one per file
export default function multiply(a, b) {
    return a * b;
}

// ---- app.js ----
// Import named exports
import { add, subtract, PI } from "./math.js";

// Import default export
import multiply from "./math.js";

// Import everything
import * as math from "./math.js";
math.add(2, 3); // 5

// Rename on import
import { add as addition } from "./math.js";

// React example
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { fetchUser } from "./api/users";
```

---

## 10. Optional Chaining (?.)

```javascript
const user = {
    name: "Sandhya",
    address: {
        city: "Dehradun"
    }
};

// Old way — manual checks to avoid errors
const city = user && user.address && user.address.city;

// ES6 — optional chaining
const city = user?.address?.city;
console.log(city); // "Dehradun"

// If property doesn't exist — returns undefined (no error)
const zip = user?.address?.zip;
console.log(zip); // undefined — no error ✅

// With arrays
const firstItem = user?.hobbies?.[0];

// With functions
const result = user?.getFullName?.();
```

---

## 11. Nullish Coalescing Operator (??)

```javascript
// Returns right side ONLY if left side is null or undefined
// (unlike || which also triggers for 0, false, "")

const name = null ?? "Guest";
console.log(name); // "Guest"

const count = 0 ?? 10;
console.log(count); // 0 — because 0 is not null/undefined ✅

const score = undefined ?? 100;
console.log(score); // 100

// vs OR operator (||) — difference
const value1 = 0 || "default";   // "default" — 0 is falsy
const value2 = 0 ?? "default";   // 0 — 0 is not null/undefined

// Common React use case
const displayName = user?.name ?? "Anonymous";
```

---

## Quick Reference Table

| Feature | Syntax | Use Case |
|---|---|---|
| Template Literals | `` `Hello ${name}` `` | String interpolation |
| Array Destructuring | `const [a, b] = arr` | Extract array values |
| Object Destructuring | `const { a, b } = obj` | Extract object properties |
| Spread | `[...arr]` / `{...obj}` | Copy / merge arrays & objects |
| Rest | `(...args)` | Collect remaining values |
| Default Params | `fn(a = 0)` | Fallback parameter values |
| Shorthand Props | `{ name, age }` | Cleaner object creation |
| Optional Chaining | `obj?.prop` | Safe property access |
| Nullish Coalescing | `val ?? default` | Fallback for null/undefined |
| Modules | `import` / `export` | Split code into files |

---

## Key Takeaways

1. **Template literals** — use backticks and `${}` for cleaner strings
2. **Destructuring** — extract values from arrays and objects easily
3. **Spread** — copy and merge arrays/objects without mutation
4. **Rest** — collect multiple arguments into an array
5. **Default params** — avoid `undefined` errors in functions
6. **Optional chaining** — safely access nested properties
7. **Nullish coalescing** — better fallback than `||` for 0 and false values
8. All these features are used **heavily in React** every day ✅

---

> 💡 **Golden Rule:**
> ES6 features are not optional in modern JavaScript —
> they are the standard. Master these and React will feel much easier!
