# Destructuring in JavaScript

## What is Destructuring?

**Destructuring** is an ES6 feature that allows you to extract values from
arrays or properties from objects into individual variables — in a clean,
readable way.

```javascript
// Without destructuring — old way
const name = user.name;
const age = user.age;

// With destructuring — clean and short
const { name, age } = user;
```

---

## ARRAY DESTRUCTURING

## 1. Basic Array Destructuring

```javascript
const fruits = ["Apple", "Mango", "Banana", "Orange", "Grapes"];

// Old way
const first = fruits[0];
const second = fruits[1];

// Destructuring — position based
const [first, second, third] = fruits;
console.log(first);  // "Apple"
console.log(second); // "Mango"
console.log(third);  // "Banana"

// Declare and destructure separately
let a, b;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
```

---

## 2. Skip Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

// Skip second element — leave a gap with comma
const [first, , third] = numbers;
console.log(first); // 1
console.log(third); // 3

// Skip multiple elements
const [a, , , d] = numbers;
console.log(a); // 1
console.log(d); // 4
```

---

## 3. Default Values

```javascript
const colors = ["red", "blue"];

// Third element doesn't exist — use default
const [primary, secondary, tertiary = "green"] = colors;
console.log(primary);   // "red"
console.log(secondary); // "blue"
console.log(tertiary);  // "green" — default used ✅

// Without default
const [a, b, c] = colors;
console.log(c); // undefined
```

---

## 4. Swap Variables

```javascript
let x = 1;
let y = 2;

// Old way — needs temp variable
let temp = x;
x = y;
y = temp;

// Destructuring — clean one-liner ✅
[x, y] = [y, x];
console.log(x); // 2
console.log(y); // 1
```

---

## 5. Rest in Array Destructuring

```javascript
const scores = [95, 88, 76, 65, 54];

const [top, second, ...remaining] = scores;
console.log(top);       // 95
console.log(second);    // 88
console.log(remaining); // [76, 65, 54]

// Get first and last
const [head, ...tail] = scores;
console.log(head); // 95
console.log(tail); // [88, 76, 65, 54]
```

---

## 6. Destructuring from Function Return

```javascript
// Function returns an array
function getCoordinates() {
    return [40.7128, -74.0060];
}

const [latitude, longitude] = getCoordinates();
console.log(latitude);  // 40.7128
console.log(longitude); // -74.0060

// React useState returns an array — this is why we destructure it!
const [count, setCount] = useState(0);
const [name, setName] = useState("");
const [isOpen, setIsOpen] = useState(false);
```

---

## OBJECT DESTRUCTURING

## 7. Basic Object Destructuring

```javascript
const user = {
    name: "Sandhya",
    age: 22,
    city: "Dehradun",
    role: "React Developer",
    github: "sandhyapaliwal"
};

// Old way
const name = user.name;
const age = user.age;
const city = user.city;

// Destructuring — property name must match
const { name, age, city } = user;
console.log(name); // "Sandhya"
console.log(age);  // 22
console.log(city); // "Dehradun"

// Order doesn't matter — unlike array destructuring
const { role, github, name } = user; // ✅ works fine
```

---

## 8. Rename While Destructuring

```javascript
const user = { name: "Sandhya", age: 22 };

// Rename — use colon
const { name: userName, age: userAge } = user;
console.log(userName); // "Sandhya"
console.log(userAge);  // 22

// Original names no longer available
console.log(name); // ❌ ReferenceError (if not declared elsewhere)
```

---

## 9. Default Values in Object Destructuring

```javascript
const user = { name: "Sandhya", age: 22 };

// salary doesn't exist — use default
const { name, age, salary = 50000, role = "Developer" } = user;
console.log(name);   // "Sandhya"
console.log(salary); // 50000 — default ✅
console.log(role);   // "Developer" — default ✅

// Rename + default value together
const { name: userName = "Guest", score: userScore = 0 } = user;
console.log(userName);  // "Sandhya" — from object
console.log(userScore); // 0 — default (score doesn't exist)
```

---

## 10. Nested Object Destructuring

```javascript
const person = {
    name: "Sandhya",
    age: 22,
    address: {
        city: "Dehradun",
        state: "Uttarakhand",
        pincode: "248001"
    },
    skills: {
        frontend: "React",
        styling: "Tailwind CSS"
    }
};

// Nested destructuring
const {
    name,
    address: { city, state },
    skills: { frontend }
} = person;

console.log(name);     // "Sandhya"
console.log(city);     // "Dehradun"
console.log(state);    // "Uttarakhand"
console.log(frontend); // "React"

// ⚠️ address and skills are NOT available as variables
// Only city, state, frontend are extracted
```

---

## 11. Rest in Object Destructuring

```javascript
const user = {
    name: "Sandhya",
    age: 22,
    city: "Dehradun",
    role: "Developer",
    github: "sandhyapaliwal"
};

const { name, age, ...rest } = user;
console.log(name); // "Sandhya"
console.log(age);  // 22
console.log(rest); // { city: "Dehradun", role: "Developer", github: "sandhyapaliwal" }
```

---

## 12. Destructuring in Function Parameters

```javascript
// Without destructuring
function greet(user) {
    return `Hello ${user.name}, you are ${user.age}!`;
}

// With destructuring in parameters — clean ✅
function greet({ name, age }) {
    return `Hello ${name}, you are ${age}!`;
}

const user = { name: "Sandhya", age: 22 };
console.log(greet(user)); // "Hello Sandhya, you are 22!"

// With default values in params
function createProfile({ name = "Guest", role = "User", age = 0 } = {}) {
    return { name, role, age };
}

console.log(createProfile({ name: "Sandhya", role: "Developer", age: 22 }));
// { name: "Sandhya", role: "Developer", age: 22 }

console.log(createProfile()); // { name: "Guest", role: "User", age: 0 }
```

---

## 13. Destructuring in Loops

```javascript
const users = [
    { name: "Sandhya", age: 22, role: "Frontend" },
    { name: "Priya", age: 25, role: "Backend" },
    { name: "Riya", age: 23, role: "Full Stack" }
];

// Destructure each object in the loop
for (const { name, role } of users) {
    console.log(`${name} — ${role}`);
}
// Sandhya — Frontend
// Priya — Backend
// Riya — Full Stack

// With map
users.map(({ name, age }) => `${name} is ${age} years old`);
```

---

## 14. Destructuring in React — Every Day Use

```javascript
// Props destructuring
const UserCard = ({ name, age, role, github }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{role} — {age} years old</p>
            <a href={`https://github.com/${github}`}>GitHub</a>
        </div>
    );
};

// useState — array destructuring
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: "", email: "" });

// useEffect with destructured props
const Profile = ({ userId, onLoad }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUser(userId).then(({ name, email, avatar }) => {
            setUserData({ name, email, avatar });
            onLoad();
        });
    }, [userId]);
};

// API response destructuring
const fetchUser = async () => {
    const response = await fetch("/api/user");
    const { name, email, role, createdAt } = await response.json();
    setUser({ name, email, role });
};
```

---

## Quick Reference Table

| Type | Syntax | Based On |
|---|---|---|
| Array basic | `const [a, b] = arr` | Position |
| Array skip | `const [a, , c] = arr` | Position |
| Array rest | `const [a, ...rest] = arr` | Position |
| Object basic | `const { a, b } = obj` | Property name |
| Object rename | `const { a: newName } = obj` | Property name |
| Object default | `const { a = 0 } = obj` | Property name |
| Object nested | `const { a: { b } } = obj` | Property name |
| Object rest | `const { a, ...rest } = obj` | Property name |
| In function | `fn({ a, b }) {}` | Property name |

---

## Key Takeaways

1. **Array destructuring** is position-based — order matters
2. **Object destructuring** is name-based — order doesn't matter
3. Always provide **default values** to avoid undefined errors
4. Use **rename** syntax when variable names conflict
5. **Nested destructuring** extracts deeply nested values in one line
6. React **useState** uses array destructuring — that's why `[value, setValue]`
7. Destructuring **function parameters** makes component props cleaner in React ✅

---

> 💡 **Golden Rule:**
> Array destructuring → position matters
> Object destructuring → name matters
> Use destructuring in function params to write cleaner React components!
