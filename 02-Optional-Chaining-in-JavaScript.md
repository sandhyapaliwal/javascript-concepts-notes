# Optional Chaining in JavaScript (?.)

## Overview

**Optional chaining (?.)** is a modern JavaScript feature used to safely access deeply nested object properties without causing runtime errors.

- If any value in the chain is `null` or `undefined`, it returns `undefined` instead of throwing an error
- It is widely used in React applications and API handling
- Introduced in ES2020

---

## Why Optional Chaining Is Needed?

### ❌ Without Optional Chaining

```javascript
const user = null;
console.log(user.name);
// ❌ Error: Cannot read property 'name' of null
```

### ✅ With Optional Chaining

```javascript
const user = null;
console.log(user?.name);
// ✅ undefined (no error)
```

---

## Syntax

```javascript
object?.property              // Property access
object?.[expression]          // Bracket notation
function?.(arguments)         // Function call
```

---

## 1. Accessing Nested Properties Safely

```javascript
const user = {
    name: "Sandhya",
    address: {
        city: "Delhi"
    }
};

console.log(user?.address?.city); 
// Output: Delhi

console.log(user?.contact?.phone); 
// Output: undefined
```

**Benefit:** No error thrown even if `contact` doesn't exist

---

## 2. Handling Null or Undefined Values

```javascript
const user = null;

console.log(user?.name);
// Output: undefined

console.log(user?.address?.city);
// Output: undefined
```

**Benefit:** Safe way to handle nullable objects

---

## 3. Optional Chaining with Arrays

```javascript
const users = [
    { name: "Aman" },
    { name: "Riya" }
];

console.log(users?.[0]?.name);
// Output: Aman

console.log(users?.[5]?.name);
// Output: undefined (no error)
```

**Benefit:** Check if array exists and has elements without errors

---

## 4. Optional Chaining with Functions

```javascript
const user = {
    greet() {
        return "Hello!";
    }
};

console.log(user?.greet?.());
// Output: Hello

const admin = {};
console.log(admin?.greet?.());
// Output: undefined (no error)
```

**Benefit:** Check if method exists before calling it

---

## 5. Real-World API Example

```javascript
const response = {
    data: {
        user: {
            profile: {
                username: "sandhya_dev"
            }
        }
    }
};

console.log(response?.data?.user?.profile?.username);
// Output: sandhya_dev

// What if data doesn't exist?
console.log(response?.error?.message?.text);
// Output: undefined (no error)
```

**Use Case:** Safely accessing deeply nested API response data

---

## 6. Optional Chaining vs AND (&&)

### Using && (Old Way)

```javascript
console.log(user && user.address && user.address.city);
```

**Disadvantages:**
- Verbose and hard to read
- Repetitive code
- Error-prone

### Using ?. (Modern Way)

```javascript
console.log(user?.address?.city);
```

**Advantages:**
- ✅ Cleaner and shorter
- ✅ More readable
- ✅ Better maintainability

---

## 7. Optional Chaining Short-Circuit Evaluation

```javascript
let result;
const user = null;

// Stops at null, doesn't evaluate further
result = user?.address?.city;
console.log(result); // undefined
```

**Benefit:** Prevents unnecessary evaluations and performance improvements

---

## 8. Combining Optional Chaining with Nullish Coalescing (??)

```javascript
const user = {
    name: "",
    age: 0
};

// Return default if undefined/null (not if falsy)
console.log(user?.address?.city ?? "Unknown City");
// Output: Unknown City

console.log(user?.name ?? "Guest");
// Output: "" (empty string is not null/undefined)
```

---

## Real-World React Example

```javascript
// Component receiving props
function UserProfile({ user }) {
    return (
        <div>
            <h1>{user?.name ?? "Guest"}</h1>
            <p>{user?.contact?.email ?? "No email"}</p>
            <button onClick={user?.logout?.()}>Logout</button>
        </div>
    );
}
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | v80+ |
| Firefox | v74+ |
| Safari | v13.1+ |
| Edge | v80+ |
| Node.js | v14+ |

---

## Summary

| Feature | Before (??) | After (?.) |
|---------|------------|-----------|
| Readability | Low | High |
| Error Handling | Manual (&&) | Automatic |
| Code Length | Long | Concise |
| Maintainability | Difficult | Easy |

---

## Quick Tips

✅ Nested API responses ko safely access karo  
✅ Optional chaining nullish coalescing (??) ke sath combine karo  
✅ Array elements ko safely access karo  
✅ Methods ko safely call karo  
✅ React components mein extensively use karo  

