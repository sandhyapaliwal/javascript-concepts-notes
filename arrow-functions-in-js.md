# Arrow Functions in JavaScript

## What are Arrow Functions?

Arrow functions are a **shorter, cleaner syntax** for writing functions in JavaScript.
Introduced in **ES6 (2015)**, they are one of the most commonly used features in modern JS and React.

```javascript
// Regular Function
function add(a, b) {
    return a + b;
}

// Arrow Function — same thing, cleaner syntax
const add = (a, b) => a + b;
```

---

## 1. Basic Syntax

```javascript
// Regular Function
function greet(name) {
    return "Hello " + name;
}

// Arrow Function
const greet = (name) => {
    return "Hello " + name;
}

// Even shorter — single line, implicit return
const greet = (name) => "Hello " + name;

console.log(greet("Sandhya")); // "Hello Sandhya"
```

---

## 2. Syntax Variations

```javascript
// No parameters — use empty parentheses
const sayHello = () => "Hello!";

// One parameter — parentheses optional
const double = n => n * 2;
const double = (n) => n * 2; // both work ✅

// Multiple parameters — parentheses required
const add = (a, b) => a + b;

// Multiple lines — use curly braces + return
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Returning an object — wrap in parentheses
const getUser = () => ({ name: "Sandhya", age: 22 });
```

---

## 3. Implicit vs Explicit Return

```javascript
// Explicit return — curly braces + return keyword needed
const square = (n) => {
    return n * n;
};

// Implicit return — no curly braces, return is automatic
const square = (n) => n * n;

console.log(square(5)); // 25
```

⚠️ If you use `{}`, you **must** write `return` explicitly.

---

## 4. Arrow Functions with Arrays — Very Common in React!

```javascript
const numbers = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter — keep elements that match condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// find — first element that matches
const firstBig = numbers.find(n => n > 3);
console.log(firstBig); // 4

// reduce — combine all elements
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15
```

---

## 5. Arrow Functions vs Regular Functions — `this` Keyword

This is the **most important difference!**

```javascript
// Regular Function — has its OWN `this`
const person = {
    name: "Sandhya",
    greet: function() {
        console.log("Hello, " + this.name); // ✅ "Hello, Sandhya"
    }
};
person.greet();

// Arrow Function — does NOT have its own `this`
// It uses `this` from the surrounding scope
const person2 = {
    name: "Sandhya",
    greet: () => {
        console.log("Hello, " + this.name); // ❌ undefined
    }
};
person2.greet();
```

---

## 6. Arrow Functions in React — Most Common Use Case

```javascript
// Event handler in React
const Button = () => {
    const handleClick = () => {
        console.log("Button clicked!");
    };

    return <button onClick={handleClick}>Click Me</button>;
};

// Inline arrow function
const Button = () => (
    <button onClick={() => console.log("Clicked!")}>
        Click Me
    </button>
);

// Rendering a list with map
const fruits = ["Apple", "Mango", "Banana"];

const FruitList = () => (
    <ul>
        {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
        ))}
    </ul>
);
```

---

## 7. When NOT to Use Arrow Functions

```javascript
// ❌ Object methods — avoid arrow functions
const counter = {
    count: 0,
    increment: () => {
        this.count++; // ❌ `this` is undefined here
    }
};

// ✅ Use regular function instead
const counter = {
    count: 0,
    increment: function() {
        this.count++; // ✅ works correctly
    }
};

// ❌ As constructors — arrow functions can't be used with `new`
const Person = (name) => {
    this.name = name;
};
const p = new Person("Sandhya"); // ❌ TypeError: Person is not a constructor
```

---

## Quick Comparison Table

| Feature | Regular Function | Arrow Function |
|---|---|---|
| Syntax | Longer | Shorter ✅ |
| `this` binding | Own `this` | Inherits from parent |
| `arguments` object | ✅ Has it | ❌ Does not have it |
| Use as constructor | ✅ Yes | ❌ No |
| Best for | Object methods | Callbacks, React handlers |
| Implicit return | ❌ No | ✅ Yes (single line) |

---

## Key Takeaways

1. Arrow functions are **shorter** than regular functions
2. **Single line** arrow functions have an **implicit return** — no `return` keyword needed
3. Arrow functions do **NOT** have their own `this`
4. Use arrow functions for **callbacks, array methods, React event handlers**
5. Avoid arrow functions for **object methods** and **constructors**
6. Arrow functions with `map`, `filter`, `reduce` are extremely common in **React** ✅

---

> 💡 **Golden Rule:**
> Use arrow functions for callbacks and React components.
> Use regular functions when you need your own `this` context.
