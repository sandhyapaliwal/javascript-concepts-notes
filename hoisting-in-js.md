# Hoisting in JavaScript

## Hoisting kya hota hai?

JavaScript mein **Hoisting** ek default behavior hai jisme variable aur function declarations
ko code execute hone se pehle **upar (top)** le jaaya jaata hai.

Simple words mein:
> Variable ya function use karo **declare karne se pehle bhi** — JS kuch cases mein error nahi deta!

---

## 1. var — Hoisted with `undefined`

```javascript
console.log(name); // undefined — error nahi aaya!
var name = "Sandhya";
console.log(name); // "Sandhya"
```

**Kya hua andar se:**
```javascript
// JS ne yeh kiya internally:
var name;           // declaration upar aa gayi — hoisted!
console.log(name);  // undefined
name = "Sandhya";   // assignment yahan hi raha
console.log(name);  // "Sandhya"
```

⚠️ `var` hoist hota hai — but value `undefined` hoti hai pehle

---

## 2. let aur const — Hoisted but NOT accessible (TDZ)

```javascript
console.log(age); // ❌ ReferenceError: Cannot access 'age' before initialization
let age = 25;
```

```javascript
console.log(PI); // ❌ ReferenceError: Cannot access 'PI' before initialization
const PI = 3.14;
```

**Temporal Dead Zone (TDZ) kya hai?**

> `let` aur `const` bhi hoist hote hain — lekin ek **"dead zone"** mein rehte hain
> jab tak unki declaration line tak code nahi pahunchta.
> Is zone mein access karo toh **ReferenceError** milta hai.

```javascript
// TDZ start — let city hoist hua but accessible nahi
console.log(city); // ❌ ReferenceError — TDZ mein hai

let city = "Dehradun"; // TDZ khatam — ab accessible hai

console.log(city); // ✅ "Dehradun"
```

---

## 3. Functions — Fully Hoisted ✅

```javascript
// Function call karo PEHLE declaration se
greet(); // ✅ "Hello Sandhya!" — works perfectly!

function greet() {
    console.log("Hello Sandhya!");
}
```

**Kya hua andar se:**
```javascript
// JS ne yeh kiya internally:
function greet() {       // poori function upar aa gayi!
    console.log("Hello Sandhya!");
}

greet(); // ✅ works!
```

> Function declarations **fully hoisted** hoti hain — declaration aur definition dono!

---

## 4. Function Expression — NOT Hoisted

```javascript
// var se bani function expression
sayHello(); // ❌ TypeError: sayHello is not a function

var sayHello = function() {
    console.log("Hello!");
};
```

**Kyun?**
```javascript
// JS ne yeh kiya internally:
var sayHello;      // sirf var hoist hua — undefined
sayHello();        // ❌ undefined is not a function!
sayHello = function() {
    console.log("Hello!");
};
```

---

## 5. Real World Example — Hoisting Bug

```javascript
// ⚠️ Var ki wajah se unexpected bug
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3 — expected tha 0, 1, 2 !
    }, 1000);
}

// ✅ let se fix ho jaata hai
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
| `function` | ✅ Yes | Full function | ✅ Yes |
| `function expression (var)` | ⚠️ Partial | `undefined` | ❌ No — TypeError |

---

## 💡 Key Takeaways

1. `var` hoist hota hai — value `undefined` hoti hai pehle
2. `let` aur `const` hoist hote hain — but **TDZ** ki wajah se access nahi kar sakte
3. **Function declarations** fully hoist hoti hain — pehle call kar sakte ho
4. **Function expressions** fully hoist nahi hoti
5. Isliye hamesha variables ko **upar declare karo** — confusion avoid hoga ✅

---

> 💡 **Golden Rule:**
> Declare first, use later — always!
> `let` aur `const` use karo `var` ki jagah — TDZ aapko bugs se bachata hai! ✅
