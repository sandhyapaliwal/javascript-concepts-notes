# Spread and Rest Operator in JavaScript

## What are Spread and Rest Operators?

Both use the same syntax — **three dots `...`** — but they do opposite things
depending on where they are used.

```
Spread  → expands  an array/object into individual elements
Rest    → collects individual elements into an array/object
```

---

## SPREAD OPERATOR

## 1. Spread with Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Merge two arrays
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Add elements while merging
const combined = [0, ...arr1, ...arr2, 7];
console.log(combined); // [0, 1, 2, 3, 4, 5, 6, 7]

// Copy an array — no reference sharing
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — not affected ✅
console.log(copy);     // [1, 2, 3, 4]

// Without spread — reference copy (both affected!)
const badCopy = original;
badCopy.push(99);
console.log(original); // [1, 2, 3, 99] — original changed! ❌

// Spread string into characters
const str = "Sandhya";
const chars = [...str];
console.log(chars); // ["S", "a", "n", "d", "h", "y", "a"]
```

---

## 2. Spread with Objects

```javascript
const user = { name: "Sandhya", age: 22 };
const address = { city: "Dehradun", state: "Uttarakhand" };

// Merge two objects
const fullProfile = { ...user, ...address };
console.log(fullProfile);
// { name: "Sandhya", age: 22, city: "Dehradun", state: "Uttarakhand" }

// Copy an object
const original = { name: "Sandhya", age: 22 };
const copy = { ...original };
copy.age = 25;
console.log(original.age); // 22 — not affected ✅
console.log(copy.age);     // 25

// Add or override properties
const updated = { ...user, age: 23, role: "Developer" };
console.log(updated);
// { name: "Sandhya", age: 23, role: "Developer" }

// ⚠️ Later properties override earlier ones
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 99, c: 3 };
const result = { ...obj1, ...obj2 };
console.log(result); // { a: 1, b: 99, c: 3 } — b is overridden by obj2
```

---

## 3. Spread with Function Calls

```javascript
const numbers = [5, 2, 8, 1, 9, 3];

// Pass array elements as individual arguments
console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1

// Without spread
console.log(Math.max(numbers)); // NaN — doesn't work with array ❌

// Sum function
function add(a, b, c) {
    return a + b + c;
}

const args = [10, 20, 30];
console.log(add(...args)); // 60 ✅
```

---

## 4. Spread in React — Most Common Uses

```javascript
import { useState } from "react";

const App = () => {
    const [user, setUser] = useState({
        name: "Sandhya",
        age: 22,
        city: "Dehradun"
    });

    // Update one property without losing others
    const updateAge = () => {
        setUser({ ...user, age: 23 }); // spread existing + override age ✅
    };

    // ❌ Wrong — replaces entire object
    const wrongUpdate = () => {
        setUser({ age: 23 }); // name and city are lost!
    };

    // Spread array state
    const [skills, setSkills] = useState(["React", "JavaScript"]);

    const addSkill = (newSkill) => {
        setSkills([...skills, newSkill]); // add without mutating ✅
    };

    // Pass all props to a component
    const buttonProps = {
        className: "btn",
        type: "submit",
        disabled: false
    };

    return <button {...buttonProps}>Submit</button>; // spread as props ✅
};
```

---

## REST OPERATOR

## 5. Rest in Function Parameters

```javascript
// Collect all arguments into an array
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));          // 6
console.log(sum(1, 2, 3, 4, 5));    // 15
console.log(sum(10, 20));           // 30

// Mix regular params with rest
function introduce(firstName, lastName, ...hobbies) {
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Hobbies: ${hobbies.join(", ")}`);
}

introduce("Sandhya", "Paliwal", "Coding", "Reading", "Music");
// Name: Sandhya Paliwal
// Hobbies: Coding, Reading, Music

// ⚠️ Rest must always be the LAST parameter
function wrong(...args, last) {} // ❌ SyntaxError
function correct(first, ...rest) {} // ✅
```

---

## 6. Rest in Array Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

// Collect remaining elements
const [first, second, ...remaining] = numbers;
console.log(first);     // 1
console.log(second);    // 2
console.log(remaining); // [3, 4, 5]

// Skip and collect
const [head, , ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [3, 4, 5]

// Real use — separate first item from rest
const [latest, ...older] = [
    "March 2026",
    "February 2026",
    "January 2026"
];
console.log(latest); // "March 2026"
console.log(older);  // ["February 2026", "January 2026"]
```

---

## 7. Rest in Object Destructuring

```javascript
const user = {
    name: "Sandhya",
    age: 22,
    city: "Dehradun",
    role: "Developer",
    github: "sandhyapaliwal"
};

// Extract specific properties — collect the rest
const { name, age, ...otherDetails } = user;
console.log(name);         // "Sandhya"
console.log(age);          // 22
console.log(otherDetails); // { city: "Dehradun", role: "Developer", github: "sandhyapaliwal" }

// Useful for separating concerns
const { id, createdAt, updatedAt, ...displayData } = apiResponse;
// id, createdAt, updatedAt used internally
// displayData shown to user
```

---

## 8. Rest in React — Common Patterns

```javascript
// Pass known props + spread unknown ones
const Button = ({ label, onClick, ...rest }) => {
    // label and onClick are used explicitly
    // ...rest contains className, disabled, type, style etc.
    return (
        <button onClick={onClick} {...rest}>
            {label}
        </button>
    );
};

// Usage
<Button
    label="Submit"
    onClick={handleSubmit}
    className="btn-primary"
    disabled={isLoading}
    type="submit"
/>
```

---

## Spread vs Rest — Side by Side

```javascript
// SPREAD — expand into individual elements
const arr = [1, 2, 3];
console.log(...arr);          // 1 2 3 — expanded
Math.max(...arr);             // spread into function args
const copy = [...arr];        // spread into new array
const obj = { ...user };      // spread into new object

// REST — collect into array/object
function fn(...args) {}       // rest in function params
const [a, ...rest] = arr;     // rest in array destructuring
const { x, ...others } = obj; // rest in object destructuring
```

---

## Quick Comparison Table

| Feature | Spread `...` | Rest `...` |
|---|---|---|
| Purpose | Expands elements | Collects elements |
| Used in | Function calls, arrays, objects | Function params, destructuring |
| Input | Array / Object | Multiple values |
| Output | Individual elements | Array / Object |
| React use | State updates, props | Component props, params |

---

## Key Takeaways

1. **Spread** expands — **Rest** collects. Same syntax, opposite purpose ✅
2. Spread creates a **shallow copy** — nested objects are still referenced
3. In React — always use spread to **update state** without mutating ✅
4. Rest must always be the **last parameter** in a function
5. Rest in destructuring collects all **remaining** elements
6. Spread with objects — later properties **override** earlier ones
7. Use spread to pass an **array as function arguments** — `Math.max(...arr)`

---

> 💡 **Golden Rule:**
> Spread = breaking apart (expanding)
> Rest = gathering together (collecting)
> In React — spread is your best friend for immutable state updates!
