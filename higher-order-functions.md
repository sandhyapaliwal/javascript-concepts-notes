# Higher Order Functions in JavaScript

## What are Higher Order Functions?

A **Higher Order Function (HOF)** is a function that either:
- **Takes one or more functions as arguments**, OR
- **Returns a function as its result**

This is possible because in JavaScript, functions are **first-class citizens**
— they can be stored in variables, passed as arguments, and returned from other functions.

```javascript
// Regular function
function greet() {
    return "Hello!";
}

// Higher Order Function — takes a function as argument
function runTwice(fn) {
    fn();
    fn();
}

runTwice(greet); // "Hello!" "Hello!"
```

---

## 1. Functions as First-Class Citizens

```javascript
// Store function in a variable
const sayHello = function() {
    return "Hello Sandhya!";
};

// Store arrow function
const double = n => n * 2;

// Store in an object
const actions = {
    greet: () => "Hello!",
    farewell: () => "Goodbye!"
};

// Store in an array
const operations = [
    n => n + 1,
    n => n * 2,
    n => n ** 2
];

console.log(operations[0](5)); // 6
console.log(operations[1](5)); // 10
console.log(operations[2](5)); // 25
```

---

## 2. Functions That Accept Functions (Callbacks)

```javascript
// Basic HOF — accepts a function as argument
function applyOperation(num, operation) {
    return operation(num);
}

const double = n => n * 2;
const square = n => n * n;
const negate = n => -n;

console.log(applyOperation(5, double)); // 10
console.log(applyOperation(5, square)); // 25
console.log(applyOperation(5, negate)); // -5

// HOF with multiple items
function transformArray(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(fn(arr[i]));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
console.log(transformArray(numbers, double)); // [2, 4, 6, 8, 10]
console.log(transformArray(numbers, square)); // [1, 4, 9, 16, 25]
```

---

## 3. Built-in Higher Order Functions

These are the most commonly used HOFs in JavaScript — all built-in array methods.

### map() — Transform every element
```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
    { name: "Sandhya", age: 22 },
    { name: "Priya", age: 25 }
];
const names = users.map(user => user.name);
console.log(names); // ["Sandhya", "Priya"]
```

### filter() — Keep matching elements
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const adults = users.filter(user => user.age >= 18);
```

### reduce() — Combine into one value
```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15
```

### forEach() — Execute for each element (no return)
```javascript
const fruits = ["Apple", "Mango", "Banana"];

fruits.forEach((fruit, index) => {
    console.log(`${index + 1}. ${fruit}`);
});
// 1. Apple
// 2. Mango
// 3. Banana
```

### find() — Get first matching element
```javascript
const users = [
    { id: 1, name: "Sandhya" },
    { id: 2, name: "Priya" },
    { id: 3, name: "Riya" }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Priya" }
```

### some() — Check if ANY element matches
```javascript
const numbers = [1, 2, 3, 4, 5];

const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven); // true

const allPositive = numbers.every(n => n > 0);
console.log(allPositive); // true
```

### every() — Check if ALL elements match
```javascript
const ages = [22, 25, 17, 30];

const allAdults = ages.every(age => age >= 18);
console.log(allAdults); // false — 17 is not adult

const anyMinor = ages.some(age => age < 18);
console.log(anyMinor); // true
```

### sort() — Sort elements
```javascript
const numbers = [5, 2, 8, 1, 9, 3];

// Ascending
const ascending = [...numbers].sort((a, b) => a - b);
console.log(ascending); // [1, 2, 3, 5, 8, 9]

// Descending
const descending = [...numbers].sort((a, b) => b - a);
console.log(descending); // [9, 8, 5, 3, 2, 1]

// Sort objects by property
const users = [
    { name: "Riya", age: 23 },
    { name: "Sandhya", age: 22 },
    { name: "Priya", age: 25 }
];

const byAge = users.sort((a, b) => a.age - b.age);
console.log(byAge);
// Sandhya(22), Riya(23), Priya(25)
```

---

## 4. Functions That Return Functions (Closures)

```javascript
// HOF — returns a new function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);
const tenTimes = multiplier(10);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(tenTimes(5)); // 50

// Arrow function version
const multiplier = factor => number => number * factor;

// Greeting factory
function createGreeter(greeting) {
    return name => `${greeting}, ${name}!`;
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
const sayHey = createGreeter("Hey");

console.log(sayHello("Sandhya")); // "Hello, Sandhya!"
console.log(sayHi("Priya"));     // "Hi, Priya!"
console.log(sayHey("Riya"));     // "Hey, Riya!"
```

---

## 5. Function Composition

```javascript
// Compose — combine multiple functions
const add10 = n => n + 10;
const double = n => n * 2;
const square = n => n * n;

// Manual composition
const result = square(double(add10(5)));
console.log(result); // square(double(15)) = square(30) = 900

// Compose function — applies right to left
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const transform = compose(square, double, add10);
console.log(transform(5)); // 900

// Pipe — applies left to right (more readable)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const process = pipe(add10, double, square);
console.log(process(5)); // 900
```

---

## 6. Currying

```javascript
// Regular function — all args at once
function add(a, b, c) {
    return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried function — one arg at a time
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function version
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

// Practical use — pre-configure functions
const add5 = curriedAdd(5);
const add5and10 = add5(10);

console.log(add5and10(3));  // 18
console.log(add5and10(20)); // 35
```

---

## 7. Memoization — Cache Results

```javascript
// HOF that caches function results
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Returning from cache");
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Expensive calculation
function slowSquare(n) {
    // simulate heavy computation
    return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5));  // calculates: 25
console.log(fastSquare(5));  // from cache: 25 (faster!)
console.log(fastSquare(10)); // calculates: 100
console.log(fastSquare(10)); // from cache: 100
```

---

## 8. HOFs in React

```javascript
// HOC — Higher Order Component (same concept!)
// A function that takes a component and returns a new component

// withLoading HOC
function withLoading(Component) {
    return function({ isLoading, ...props }) {
        if (isLoading) return <p>Loading...</p>;
        return <Component {...props} />;
    };
}

const UserCard = ({ name, role }) => (
    <div>
        <h2>{name}</h2>
        <p>{role}</p>
    </div>
);

const UserCardWithLoading = withLoading(UserCard);

// Usage
<UserCardWithLoading
    isLoading={false}
    name="Sandhya"
    role="React Developer"
/>

// HOFs in event handlers
const handleChange = field => e => {
    setFormData(prev => ({
        ...prev,
        [field]: e.target.value
    }));
};

<input onChange={handleChange("name")} />
<input onChange={handleChange("email")} />
<input onChange={handleChange("password")} />
```

---

## Chaining HOFs Together

```javascript
const employees = [
    { name: "Sandhya", dept: "Frontend", salary: 60000, active: true },
    { name: "Priya", dept: "Backend", salary: 75000, active: true },
    { name: "Riya", dept: "Frontend", salary: 55000, active: false },
    { name: "Sneha", dept: "Frontend", salary: 65000, active: true },
    { name: "Pooja", dept: "Backend", salary: 80000, active: false }
];

// Get total salary of active Frontend developers
const totalActiveFrontendSalary = employees
    .filter(e => e.active)                   // keep active only
    .filter(e => e.dept === "Frontend")      // keep Frontend only
    .map(e => e.salary)                      // extract salaries
    .reduce((total, sal) => total + sal, 0); // sum them up

console.log(totalActiveFrontendSalary); // 125000 (60000 + 65000)

// Get names of active employees sorted alphabetically
const activeNames = employees
    .filter(e => e.active)
    .map(e => e.name)
    .sort();

console.log(activeNames); // ["Priya", "Sandhya", "Sneha"]
```

---

## Quick Reference Table

| HOF | Takes Function | Returns Function | Built-in |
|---|---|---|---|
| `map()` | ✅ Yes | ❌ Array | ✅ Yes |
| `filter()` | ✅ Yes | ❌ Array | ✅ Yes |
| `reduce()` | ✅ Yes | ❌ Single value | ✅ Yes |
| `forEach()` | ✅ Yes | ❌ undefined | ✅ Yes |
| `sort()` | ✅ Yes | ❌ Array | ✅ Yes |
| `find()` | ✅ Yes | ❌ Element | ✅ Yes |
| Currying | ✅ Yes | ✅ Yes | ❌ Custom |
| Memoization | ✅ Yes | ✅ Yes | ❌ Custom |
| Composition | ✅ Yes | ✅ Yes | ❌ Custom |

---

## Key Takeaways

1. HOFs either **accept functions** as arguments or **return functions**
2. JavaScript functions are **first-class** — they can be stored, passed, returned
3. Built-in HOFs — `map`, `filter`, `reduce`, `forEach`, `find`, `sort` ✅
4. **Currying** breaks a function into smaller single-argument functions
5. **Memoization** caches results to avoid repeating expensive calculations
6. **Function composition** combines multiple functions into one pipeline
7. React **Higher Order Components (HOC)** are based on the same concept ✅

---

> 💡 **Golden Rule:**
> If a function takes another function as an argument or returns one —
> it is a Higher Order Function.
> map, filter, reduce are HOFs you will use every single day!
