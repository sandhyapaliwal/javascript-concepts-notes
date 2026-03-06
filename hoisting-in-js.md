# Hoisting in JavaScript

## What is Hoisting?

Hoisting is JavaScript's default behavior of moving variable and function
**declarations to the top** of their scope before the code executes.

In simple words:
> You can use a variable or function **before declaring it** — and in some cases JS won't throw an error!

---

## 1. var — Hoisted with `undefined`

```javascript
console.log(name); // undefined — no error!
var name = "Sandhya";
console.log(name); // "Sandhya"
```

**What JS does internally:**
```javascript
var name;           // declaration moved to top — hoisted!
console.log(name);  // undefined
name = "Sandhya";   // assignment stays here
console.log(name);  // "Sandhya"
```

⚠️ `var` is hoisted — but its value is `undefined` until the assignment line is reached.

---

## 2. let and const — Hoisted but NOT accessible (TDZ)

```javascript
console.log(age); // ❌ ReferenceError: Cannot access 'age' before initialization
let age = 25;
```

```javascript
console.log(PI); // ❌ ReferenceError: Cannot access 'PI' before initialization
const PI = 3.14;
```

**What is the Temporal Dead Zone (TDZ)?**

> `let` and `const` are hoisted — but they live in a **"dead zone"**
> until the code reaches their declaration line.
> Accessing them in this zone throws a **ReferenceError**.

```javascript
// TDZ starts here — city is hoisted but not accessible
console.log(city); // ❌ ReferenceError — inside TDZ

let city = "Dehradun"; // TDZ ends — now accessible

console.log(city); // ✅ "Dehradun"
```

---

## 3. Function Declarations — Fully Hoisted ✅

```javascript
// Call the function BEFORE its declaration
greet(); // ✅ "Hello Sandhya!" — works perfectly!

function greet() {
    console.log("Hello Sandhya!");
}
```

**What JS does internally:**
```javascript
// Entire function moved to top
function greet() {
    console.log("Hello Sandhya!");
}

greet(); // ✅ works!
```

> Function declarations are **fully hoisted** — both the declaration and the definition!

---

## 4. Function Expressions — NOT Fully Hoisted

```javascript
sayHello(); // ❌ TypeError: sayHello is not a function

var sayHello = function() {
    console.log("Hello!");
};
```

**What JS does internally:**
```javascript
var sayHello;      // only var is hoisted — value is undefined
sayHello();        // ❌ undefined is not a function!
sayHello = function() {
    console.log("Hello!");
};
```

---

## 5. Real World Bug Caused by Hoisting

```javascript
// ⚠️ var causes unexpected bug
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3 — expected 0, 1, 2!
    }, 1000);
}

// ✅ let fixes it
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2 — correct!
    }, 1000);
}
```

---

## Quick Summary Table

| Declaration | Hoisted? | Initial Value | Accessible Before Declaration? |
|---|---|---|---|
| `var` | ✅ Yes | `undefined` | ✅ Yes (but undefined) |
| `let` | ✅ Yes | TDZ | ❌ No — ReferenceError |
| `const` | ✅ Yes | TDZ | ❌ No — ReferenceError |
| `function` declaration | ✅ Yes | Full function | ✅ Yes |
| `function` expression (var) | ⚠️ Partial | `undefined` | ❌ No — TypeError |

---

## Key Takeaways

1. `var` is hoisted — but its value is `undefined` until assigned
2. `let` and `const` are hoisted — but **TDZ** prevents access before declaration
3. **Function declarations** are fully hoisted — you can call them before declaring
4. **Function expressions** are NOT fully hoisted
5. Always declare variables at the **top of their scope** to avoid confusion ✅

---

> 💡 **Golden Rule:**
> Declare first, use later — always!
> Use `let` and `const` instead of `var` — TDZ protects you from hoisting bugs! ✅
