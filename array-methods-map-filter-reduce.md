# Array Methods in JavaScript — map, filter, reduce

## Overview

`map`, `filter`, and `reduce` are the three most powerful and commonly used
array methods in modern JavaScript and React.

> They all take a **callback function** as an argument and do NOT modify the original array.

---

## 1. map() — Transform Every Element

`map()` creates a **new array** by applying a function to every element.

**Syntax:**
```javascript
array.map((element, index, array) => {
    return newElement;
});
```

**Examples:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// Double every number
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Square every number
const squared = numbers.map(n => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

// Convert strings to uppercase
const names = ["sandhya", "paliwal", "react"];
const upper = names.map(name => name.toUpperCase());
console.log(upper); // ["SANDHYA", "PALIWAL", "REACT"]

// Extract specific property from objects
const users = [
    { id: 1, name: "Sandhya", age: 22 },
    { id: 2, name: "Priya", age: 25 },
    { id: 3, name: "Riya", age: 23 }
];
const names2 = users.map(user => user.name);
console.log(names2); // ["Sandhya", "Priya", "Riya"]
```

**React Example:**
```javascript
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

## 2. filter() — Keep Matching Elements

`filter()` creates a **new array** with only elements that pass a condition (return `true`).

**Syntax:**
```javascript
array.filter((element, index, array) => {
    return true or false;
});
```

**Examples:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Keep only even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Keep only numbers greater than 5
const bigNumbers = numbers.filter(n => n > 5);
console.log(bigNumbers); // [6, 7, 8, 9, 10]

// Filter objects by condition
const users = [
    { name: "Sandhya", age: 22, active: true },
    { name: "Priya", age: 17, active: false },
    { name: "Riya", age: 25, active: true }
];

// Get only active users
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);
// [{ name: "Sandhya", ... }, { name: "Riya", ... }]

// Get users above 18
const adults = users.filter(user => user.age >= 18);
console.log(adults);
// [{ name: "Sandhya", ... }, { name: "Riya", ... }]
```

**React Example:**
```javascript
const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", done: true },
    { id: 2, text: "Build Project", done: false },
    { id: 3, text: "Apply for Jobs", done: false }
]);

// Delete a task
const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
};

// Show only pending tasks
const pendingTasks = tasks.filter(task => !task.done);
```

---

## 3. reduce() — Combine All Elements into One Value

`reduce()` reduces an array to a **single value** by applying a function
to each element and accumulating the result.

**Syntax:**
```javascript
array.reduce((accumulator, currentValue, index, array) => {
    return updatedAccumulator;
}, initialValue);
```

**Examples:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum of all numbers
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15

// Product of all numbers
const product = numbers.reduce((total, n) => total * n, 1);
console.log(product); // 120

// Find maximum number
const max = numbers.reduce((maxVal, n) => n > maxVal ? n : maxVal, numbers[0]);
console.log(max); // 5

// Count occurrences of each item
const fruits = ["apple", "mango", "apple", "banana", "mango", "apple"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 3, mango: 2, banana: 1 }

// Flatten a nested array
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Calculate total price from cart
const cart = [
    { item: "React Book", price: 499 },
    { item: "JS Course", price: 999 },
    { item: "CSS Guide", price: 299 }
];
const totalPrice = cart.reduce((total, product) => total + product.price, 0);
console.log(totalPrice); // 1797
```

---

## 4. Chaining map, filter, reduce Together

```javascript
const students = [
    { name: "Sandhya", score: 85, passed: true },
    { name: "Priya", score: 45, passed: false },
    { name: "Riya", score: 92, passed: true },
    { name: "Sneha", score: 38, passed: false },
    { name: "Pooja", score: 78, passed: true }
];

// Get total score of only passed students
const totalPassedScore = students
    .filter(student => student.passed)          // keep passed students
    .map(student => student.score)              // extract scores
    .reduce((total, score) => total + score, 0); // sum them up

console.log(totalPassedScore); // 255 (85 + 92 + 78)
```

---

## Quick Comparison Table

| Method | Returns | Use When |
|---|---|---|
| `map()` | New array (same length) | Transform every element |
| `filter()` | New array (shorter/equal) | Keep elements that match a condition |
| `reduce()` | Single value | Combine all elements into one result |

---

## Key Takeaways

1. `map()` — transforms every element, returns **same length** array
2. `filter()` — keeps matching elements, returns **shorter or equal** array
3. `reduce()` — combines everything into **one value** (sum, object, string, etc.)
4. None of them **modify the original array** ✅
5. All three accept a **callback function** as argument
6. These are used **extensively in React** for rendering lists and managing state

---

> 💡 **Golden Rule:**
> - Need to transform? → `map()`
> - Need to select? → `filter()`
> - Need to combine? → `reduce()`
