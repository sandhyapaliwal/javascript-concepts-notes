# Objects + "this" in JavaScript

## 📌 Definition

### 1. Object
JavaScript mein object ek collection hota hai key-value pairs ka.
Har key ko property kehte hain aur value koi bhi data type ho sakta hai.

### 2. "this"
"this" keyword current object ko refer karta hai jiske andar function call ho raha hai.

👉 **Simple words:**
- `this` = jis object ne function call kiya

---

## Basic Object Example

```javascript
const person = {
  name: "Sandhya",
  age: 22,
  // method (function inside object)
  greet: function () {
    console.log("Hello, my name is " + this.name);
  }
};

person.greet(); // Output: Hello, my name is Sandhya
```

---

## Why "this" Is Used?

### ❌ Incorrect Way
Agar hum directly name likhen:

```javascript
const user = {
  name: "Rahul",
  greet: function () {
    console.log("Hello " + name); // ❌ ERROR
  }
};

// user.greet();  // Uncomment karoge toh error aayega
```

### ✅ Correct Way

```javascript
const user2 = {
  name: "Rahul",
  greet: function () {
    console.log("Hello " + this.name); // ✅
  }
};

user2.greet(); // Output: Hello Rahul
```

---

## "this" Depends On How Function Is Called

```javascript
const obj1 = {
  name: "Object1",
  show: function () {
    console.log(this.name);
  }
};

const obj2 = {
  name: "Object2"
};

obj2.show = obj1.show;

obj1.show(); // Output: Object1
obj2.show(); // Output: Object2
```

👉 **Key Point:** Same function hai, but jis object se call ho raha hai, `this` usi ko refer karega.

---

## ⚠️ "this" In Arrow Function - IMPORTANT

```javascript
const arrowObj = {
  name: "Sandhya",
  greet: () => {
    console.log(this.name);
  }
};

arrowObj.greet(); // Output: undefined
```

### ❗ Reason
- Arrow function apna `this` create nahi karta
- Wo parent scope ka `this` use karta hai
- 👉 Isliye object methods ke liye arrow function avoid karo

---

## Correct Way (Use Normal Function)

```javascript
const correctObj = {
  name: "Sandhya",
  greet: function () {
    console.log(this.name);
  }
};

correctObj.greet(); // Output: Sandhya
```

---

## "this" In Global Scope

```javascript
console.log(this); // Browser mein: Window object
                   // Node.js mein: global object
```

---

## Summary Table

| Scenario | "this" Refers To |
|----------|-----------------|
| Object method (normal function) | Object itself |
| Object method (arrow function) | Parent scope's "this" |
| Global scope | window/global object |
| Event handler | HTML element |
| Constructor function | New instance |

---

## Quick Tips

✅ Object methods ke liye regular functions use karo
✅ `this` hamesha jis object se call ho raha hai usi ko refer karta hai
✅ Arrow functions ke sath `this` problematic ho sakta hai
✅ `this` binding ko samajhna JavaScript ke liye bohot zaroori hai

