JavaScript Modules (ES Modules)
📌 Overview

JavaScript Modules allow you to break your code into separate, reusable files.

Each module has its own scope, which helps in:

Avoiding global variable pollution
Improving code organization
Making code reusable and maintainable
🔹 Why Use Modules?
Better code structure
Reusability
Easier debugging
Separation of concerns
🔹 Types of Modules in JavaScript
CommonJS (CJS) → Used in Node.js (require, module.exports)
ES Modules (ESM) → Modern JavaScript (import, export) ✅
✅ ES Modules (Important for Interviews)
🔸 Exporting in JavaScript
1. Named Export

You can export multiple things from a file.

// math.js

export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;
2. Default Export

Only one default export per file.

// greet.js

export default function greet(name) {
  return `Hello, ${name}`;
}
🔸 Importing in JavaScript
1. Import Named Exports
// app.js

import { add, subtract } from './math.js';

console.log(add(2, 3));       // 5
console.log(subtract(5, 2));  // 3
2. Import Default Export
// app.js

import greet from './greet.js';

console.log(greet("Sandhya"));
3. Import Everything
import * as math from './math.js';

console.log(math.add(2, 3));
4. Rename Imports
import { add as sum } from './math.js';

console.log(sum(4, 5));
🔹 Combining Default + Named Export
// utils.js

export const PI = 3.14;

export default function square(x) {
  return x * x;
}
// app.js

import square, { PI } from './utils.js';

console.log(square(4)); // 16
console.log(PI);        // 3.14
