# difference between var, let and const in JavaScript

## 1. `var`

- **Scope:** Function scoped
- **Re-declare:** ✅ Allowed
- **Re-assign:** ✅ Allowed
- **Hoisting:** ✅ Hoisted (value = `undefined`)

### Example:

```javascript
// Re-declaration allowed
var name = "Sandhya";
var name = "Paliwal"; // No error
console.log(name); // Paliwal

// Function scope
function greet() {
  var message = "Hello!";
  console.log(message); // Hello!
}
// console.log(message); // ❌ Error - not accessible outside function

// Hoisting
console.log(age); // undefined (hoisted but not initialized)
var age = 25;
console.log(age); // 25

// var leaks out of block
if (true) {
  var city = "Dehradun";
}
console.log(city); // "Dehradun" — accessible outside block ⚠️
```

---

## 2. `let`

- **Scope:** Block scoped `{ }`
- **Re-declare:** ❌ Not allowed
- **Re-assign:** ✅ Allowed
- **Hoisting:** ✅ Hoisted but in **Temporal Dead Zone** (TDZ) — cannot access before declaration

### Example:

```javascript
// Re-assignment allowed
let score = 10;
score = 20; // ✅ No error
console.log(score); // 20

// Re-declaration NOT allowed
let score = 30; // ❌ SyntaxError: Identifier 'score' has already been declared

// Block scope
if (true) {
  let city = "Dehradun";
  console.log(city); // "Dehradun"
}
// console.log(city); // ❌ Error - not accessible outside block

// Temporal Dead Zone
console.log(num); // ❌ ReferenceError - cannot access before initialization
let num = 5;
```

---

## 3. `const`

- **Scope:** Block scoped `{ }`
- **Re-declare:** ❌ Not allowed
- **Re-assign:** ❌ Not allowed
- **Hoisting:** ✅ Hoisted but in **Temporal Dead Zone** (TDZ)
- **Must be initialized** at the time of declaration

### Example:

```javascript
// Must initialize at declaration
const PI = 3.14;
// const PI; // ❌ SyntaxError: Missing initializer

// Re-assignment NOT allowed
PI = 3.15; // ❌ TypeError: Assignment to constant variable

// Block scope
if (true) {
  const country = "India";
  console.log(country); // "India"
}
// console.log(country); // ❌ Error - not accessible outside block

// ⚠️ const with Objects — object itself can't be reassigned
// but its properties CAN be changed
const person = { name: "Sandhya", age: 22 };
person.age = 23; // ✅ Allowed — modifying property
console.log(person); // { name: "Sandhya", age: 23 }

person = { name: "Someone" }; // ❌ TypeError — can't reassign object itself

// ⚠️ const with Arrays — same rule
const fruits = ["apple", "mango"];
fruits.push("banana"); // ✅ Allowed
console.log(fruits); // ["apple", "mango", "banana"]

fruits = ["grapes"]; // ❌ TypeError — can't reassign array itself
```

---

## Quick Comparison Table

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Re-declare | ✅ Yes | ❌ No | ❌ No |
| Re-assign | ✅ Yes | ✅ Yes | ❌ No |
| Hoisting | ✅ `undefined` | ⚠️ TDZ | ⚠️ TDZ |
| Must initialize | ❌ No | ❌ No | ✅ Yes |

---

## When to Use What?

```javascript
// Use const — by default, always prefer const
const apiUrl = "https://api.example.com";

// Use let — when value will change
let count = 0;
count++;

// Avoid var — outdated, causes bugs due to function scope leaking
// Use only if specifically needed for older code
```

---

## Real World Example

```javascript
// Shopping cart example
const cartItems = []; // const — array reference won't change

let totalPrice = 0; // let — price will keep updating

function addItem(item, price) {
  cartItems.push(item);  // ✅ modifying array is fine with const
  totalPrice += price;   // ✅ re-assigning let is fine
  console.log(`Added: ${item} | Total: ₹${totalPrice}`);
}

addItem("React Book", 499);   // Added: React Book | Total: ₹499
addItem("JS Course", 999);    // Added: JS Course | Total: ₹1498
```

---

> 💡 **Golden Rule:**
> - Use `const` by default
> - Use `let` when you know the value will change
> - Avoid `var` in modern JavaScript
