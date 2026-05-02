# Specialized Built-in Methods in JavaScript

## 📌 Overview

JavaScript provides many specialized built-in methods that help developers perform common tasks efficiently. These methods are attached to objects like Array, String, Object, Number, and Date.

They improve code readability, reduce manual logic, and are widely used in real-world applications and interviews.

---

## 1. Array Methods

### 1.1 find()

Returns the first element that satisfies a condition.

```javascript
const nums = [10, 20, 30, 40];
const result = nums.find(num => num > 25);
console.log(result); // 30
```

### 1.2 some()

Returns true if at least one element satisfies the condition.

```javascript
const nums = [1, 3, 5, 8];
const hasEven = nums.some(num => num % 2 === 0);
console.log(hasEven); // true
```

### 1.3 every()

Returns true if all elements satisfy the condition.

```javascript
const nums = [2, 4, 6];
const allEven = nums.every(num => num % 2 === 0);
console.log(allEven); // true
```

### 1.4 includes()

Checks if an element exists in the array.

```javascript
const fruits = ["apple", "banana", "mango"];
console.log(fruits.includes("banana")); // true
```

### 1.5 flat()

Flattens nested arrays.

```javascript
const arr = [1, [2, [3, 4]]];
console.log(arr.flat(2)); // [1, 2, 3, 4]
```

### 1.6 flatMap()

Maps and flattens the result.

```javascript
const arr = [1, 2, 3];
const result = arr.flatMap(num => [num, num * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]
```

---

## 2. String Methods

### 2.1 startsWith()

Checks if string starts with given text.

```javascript
const str = "JavaScript";
console.log(str.startsWith("Java")); // true
```

### 2.2 endsWith()

Checks if string ends with given text.

```javascript
console.log(str.endsWith("Script")); // true
```

### 2.3 includes()

Checks if substring exists.

```javascript
console.log(str.includes("Script")); // true
```

### 2.4 trim()

Removes whitespace from both sides.

```javascript
const text = "  hello  ";
console.log(text.trim()); // "hello"
```

### 2.5 replaceAll()

Replaces all occurrences.

```javascript
const msg = "hi hi hi";
console.log(msg.replaceAll("hi", "hello"));
// hello hello hello
```

---

## 3. Object Methods

### 3.1 Object.keys()

Returns array of keys.

```javascript
const user = { name: "John", age: 25 };
console.log(Object.keys(user));
// ["name", "age"]
```

### 3.2 Object.values()

Returns array of values.

```javascript
console.log(Object.values(user));
// ["John", 25]
```

### 3.3 Object.entries()

Returns key-value pairs.

```javascript
console.log(Object.entries(user));
// [["name", "John"], ["age", 25]]
```

### 3.4 Object.assign()

Copies properties into target object.

```javascript
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const result = Object.assign({}, obj1, obj2);
console.log(result); // { a: 1, b: 2 }
```

### 3.5 Object.freeze()

Prevents modification.

```javascript
const obj = { name: "Alex" };
Object.freeze(obj);
obj.name = "John";
console.log(obj.name); // Alex
```

---

## 4. Number Methods

### 4.1 toFixed()

Formats number to fixed decimals.

```javascript
const num = 5.6789;
console.log(num.toFixed(2)); // 5.68
```

### 4.2 isNaN()

Checks if value is NaN.

```javascript
console.log(Number.isNaN(NaN)); // true
```

### 4.3 parseInt() and parseFloat()

```javascript
console.log(parseInt("10"));     // 10
console.log(parseFloat("10.5")); // 10.5
```

---

## 5. Date Methods

### 5.1 new Date()

```javascript
const now = new Date();
console.log(now);
```

### 5.2 getFullYear()

```javascript
console.log(now.getFullYear());
```

### 5.3 getMonth()

```javascript
console.log(now.getMonth()); // 0-11
```

### 5.4 getDate()

```javascript
console.log(now.getDate());
```

---


## 🧩 Key Takeaways

- Built-in methods reduce code complexity
- Array methods like `find()`, `some()`, `every()` are frequently used
- String methods handle text manipulation efficiently
- Object methods help in working with object properties
- Number and Date methods are essential for data transformation
