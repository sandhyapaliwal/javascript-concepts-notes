# JavaScript Modules (ES Modules)

## 📌 Overview

JavaScript Modules allow you to **break your code into separate, reusable files**.

Each module has its own scope, which helps in:
- Avoiding global variable pollution
- Improving code organization
- Making code reusable and maintainable
- Collaborating on large projects

---

## 🎯 Why Use Modules?

### Without Modules (Bad):

```javascript
// main.js - Everything in one file
let count = 0;
let user = {};
let product = {};

function increment() { }
function decrementCount() { }
function getUser() { }
function updateUser() { }
function getProduct() { }
function updateProduct() { }

// Messy, hard to maintain, name conflicts possible
```

### With Modules (Good):

```
Project/
├── counter.js      (counter logic)
├── user.js         (user logic)
├── product.js      (product logic)
└── main.js         (combines everything)
```

Each file is focused and reusable!

---

## 📚 Types of Module Systems

### 1. CommonJS (Node.js)

```javascript
// math.js
module.exports = { add, subtract };

// app.js
const math = require('./math');
```

**Used in:** Node.js, older JavaScript projects

---

### 2. ES Modules (ESM) ✅ **Modern Standard**

```javascript
// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from './math.js';
```

**Used in:** Modern JavaScript, browsers, modern Node.js

---

## ✅ ES Modules (Important for Interviews)

ES Modules are the modern standard and recommended approach.

---

## 🔸 Exporting in JavaScript

### 1. Named Export

You can **export multiple things** from a file.

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

export function divide(a, b) {
  return a / b;
}
```

**Multiple exports from one file** ✔

---

### 2. Default Export

Only **one default export per file**.

```javascript
// greet.js
export default function greet(name) {
  return `Hello, ${name}`;
}
```

Or with variable:

```javascript
// config.js
const API_URL = "https://api.example.com";
export default API_URL;
```

---

### 3. Exporting Variables

```javascript
// constants.js
export const PI = 3.14159;
export const E = 2.71828;
export let count = 0;

export function increment() {
  count++;
}
```

---

## 🔹 Importing in JavaScript

### 1. Import Named Exports

```javascript
// app.js
import { add, subtract } from './math.js';

console.log(add(2, 3));       // 5
console.log(subtract(5, 2));  // 3
```

**Import specific items** ✔

---

### 2. Import Default Export

```javascript
// app.js
import greet from './greet.js';

console.log(greet("Sandhya"));  // Hello, Sandhya
```

**Import the default** ✔

---

### 3. Import Everything (Namespace)

```javascript
// app.js
import * as math from './math.js';

console.log(math.add(2, 3));       // 5
console.log(math.subtract(5, 2));  // 3
console.log(math.multiply(4, 5));  // 20
```

**Import all exports as object** ✔

---

### 4. Rename Imports (Aliasing)

```javascript
// app.js
import { add as sum, subtract as diff } from './math.js';

console.log(sum(4, 5));   // 9
console.log(diff(10, 3)); // 7
```

**Avoid naming conflicts** ✔

---

## 🔗 Combining Default + Named Exports

### File: utils.js

```javascript
export const PI = 3.14;
export const E = 2.71;

export default function square(x) {
  return x * x;
}
```

### File: app.js

```javascript
import square, { PI, E } from './utils.js';

console.log(square(4));  // 16
console.log(PI);         // 3.14
console.log(E);          // 2.71
```

**Import both default and named** ✔

---

## 📚 Real-World Module Examples

### Example 1: User Module

**File: user.js**

```javascript
export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

export function validateEmail(email) {
  return email.includes("@");
}

export const defaultUser = {
  name: "Guest",
  email: "guest@example.com"
};
```

**File: app.js**

```javascript
import { User, validateEmail, defaultUser } from './user.js';

const user = new User("Sandhya", "sandhya@example.com");
console.log(user.getInfo());  // Sandhya (sandhya@example.com)

console.log(validateEmail("test@gmail.com"));  // true
console.log(validateEmail("invalid"));         // false
```

---

### Example 2: API Service Module

**File: api.js**

```javascript
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return await response.json();
}

export async function createPost(data) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

**File: main.js**

```javascript
import { fetchPosts, fetchUser, createPost } from './api.js';

async function main() {
  const posts = await fetchPosts();
  console.log("Posts:", posts);

  const user = await fetchUser(1);
  console.log("User:", user);

  const newPost = await createPost({ title: "New", body: "Content", userId: 1 });
  console.log("Created:", newPost);
}

main();
```

---

### Example 3: Utility Modules

**File: helpers.js**

```javascript
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str) {
  return str.split('').reverse().join('');
}

export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export const mathUtils = {
  sum: (a, b) => a + b,
  product: (a, b) => a * b,
  power: (a, b) => Math.pow(a, b)
};
```

**File: script.js**

```javascript
import { capitalize, reverseString, removeDuplicates, mathUtils } from './helpers.js';

console.log(capitalize("hello"));           // Hello
console.log(reverseString("javascript"));   // tpircsavaj
console.log(removeDuplicates([1, 2, 2, 3])); // [1, 2, 3]
console.log(mathUtils.sum(5, 3));           // 8
console.log(mathUtils.power(2, 8));         // 256
```

---

## 🏗️ Module Organization

### Good Structure:

```
project/
├── index.html
├── src/
│   ├── main.js            (entry point)
│   ├── modules/
│   │   ├── user.js        (user logic)
│   │   ├── product.js     (product logic)
│   │   ├── api.js         (API calls)
│   │   └── utils.js       (utility functions)
│   └── components/
│       ├── navbar.js      (navbar component)
│       ├── header.js      (header component)
│       └── footer.js      (footer component)
└── package.json
```

---

## 🔄 Module Dependencies

Modules can import from other modules:

**File: helpers.js**
```javascript
export const add = (a, b) => a + b;
```

**File: calculator.js**
```javascript
import { add } from './helpers.js';

export function addThree(a, b, c) {
  return add(add(a, b), c);
}
```

**File: main.js**
```javascript
import { addThree } from './calculator.js';
console.log(addThree(1, 2, 3));  // 6
```

---

## ⚠️ Important Notes

### 1. File Extensions Matter

```javascript
// ✅ CORRECT - Include .js
import { add } from './math.js';

// ❌ INCORRECT - Will fail in browser
import { add } from './math';
```

### 2. Module Scope

```javascript
// user.js
let message = "Private";  // Only in this file
export const name = "John"; // Exported, accessible

// app.js
import { name } from './user.js';
console.log(name);       // "John" ✔
console.log(message);    // ReferenceError ✗
```

### 3. Module Runs Once

```javascript
// logger.js
console.log("Module loaded");

// app.js
import './logger.js';  // "Module loaded" (first time)
import './logger.js';  // Nothing (cached, runs only once)
```

---

## 🚀 Using Modules in HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <h1>JavaScript Modules Demo</h1>
    
    <!-- Type "module" is required -->
    <script type="module" src="src/main.js"></script>
</body>
</html>
```

**Important:** Always use `type="module"` attribute!

---

## 🛠️ Building/Bundling Modules

For production, use bundlers:

### Webpack

```bash
npm install webpack webpack-cli --save-dev
```

### Vite (Modern Alternative)

```bash
npm create vite@latest my-app -- --template vanilla
```

### Parcel (Simplest)

```bash
npm install -g parcel-bundler
parcel src/index.html
```

---

## 🚨 Common Mistakes

### Mistake 1: Circular Dependencies

```javascript
// a.js
import { funcB } from './b.js';

export function funcA() {
  return funcB();
}

// b.js
import { funcA } from './a.js';  // ❌ Circular!

export function funcB() {
  return funcA();
}
```

**Fix:** Restructure code to avoid circular imports.

---

### Mistake 2: Missing .js Extension

```javascript
// ❌ WRONG
import { add } from './math';

// ✅ CORRECT
import { add } from './math.js';
```

---

### Mistake 3: Exporting Without Import

```javascript
// utils.js
function add(a, b) {
  return a + b;
}
// ❌ Not exported!

// app.js
import { add } from './utils.js';  // Error: add not found
```

**Fix:**
```javascript
// utils.js
export function add(a, b) {  // ✅ Now exported
  return a + b;
}
```

---

## 🚨 Common Interview Questions

### Q1: What are ES Modules?
👉 Modern JavaScript module system using `import`/`export` for code organization.

### Q2: Difference between default and named export?
👉 **Default**: One per file, imported without braces. **Named**: Multiple per file, imported with braces.

### Q3: How to import everything?
👉 Use `import * as name from './file.js'`

### Q4: Can you have both default and named exports?
👉 Yes, in the same file.

### Q5: How to rename imports?
👉 Use `import { original as alias } from './file.js'`

### Q6: Do modules run multiple times?
👉 No, they run once and are cached. Subsequent imports use cached version.

### Q7: Why use modules?
👉 Better organization, reusability, avoiding global scope pollution, easier maintenance.

---

## 🧩 Key Takeaways

- ✅ **Named Export**: Export multiple, import with braces
- ✅ **Default Export**: One per file, import without braces
- ✅ **Combine Both**: Use default + named together
- ✅ **Aliasing**: Rename imports with `as`
- ✅ **Namespace**: Import everything with `import * as`
- ✅ **Scope**: Each module has own scope (encapsulation)
- ✅ **Cached**: Modules run once, cached for future imports
- ✅ **.js Extension**: Required in browser (optional in Node.js)

---

## 🎓 Best Practices

- [ ] Use meaningful module names
- [ ] Keep modules focused on single responsibility
- [ ] Export only what's needed
- [ ] Use named exports for related functions
- [ ] Use default export for main feature
- [ ] Organize modules in logical folders
- [ ] Avoid circular dependencies
- [ ] Document module exports
- [ ] Use bundlers for production
- [ ] Keep module dependencies simple

---

## 📊 CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|---------|----------|-----------|
| Export | `module.exports` | `export` |
| Import | `require()` | `import` |
| Async | Sync only | Async |
| Used in | Node.js | Modern JS, Browsers |
| Status | Legacy | ✅ Standard |

---

**Happy Coding! 🚀**

Master modules and your codebase will be organized, scalable, and maintainable!
