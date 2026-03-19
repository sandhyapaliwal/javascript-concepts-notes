# Template Literals in JavaScript

## What are Template Literals?

**Template Literals** are an ES6 feature that provides a cleaner and more
powerful way to work with strings in JavaScript.

They use **backticks** ( ` ) instead of single or double quotes,
and allow embedding expressions directly inside strings using `${}`.

```javascript
// Old way — string concatenation
const msg = "Hello, " + name + "! You are " + age + " years old.";

// Template literal — clean and readable ✅
const msg = `Hello, ${name}! You are ${age} years old.`;
```

---

## 1. Basic Syntax

```javascript
const name = "Sandhya";
const role = "React Developer";
const city = "Dehradun";

// Old way
const intro1 = "My name is " + name + " and I am a " + role + ".";

// Template literal ✅
const intro2 = `My name is ${name} and I am a ${role}.`;

console.log(intro2);
// "My name is Sandhya and I am a React Developer."
```

---

## 2. Expressions Inside ${}

```javascript
const a = 10;
const b = 20;

// Math
console.log(`Sum: ${a + b}`);        // "Sum: 30"
console.log(`Product: ${a * b}`);    // "Product: 200"

// Ternary operator
const age = 22;
console.log(`Status: ${age >= 18 ? "Adult" : "Minor"}`);
// "Status: Adult"

// Function call
const upper = str => str.toUpperCase();
console.log(`Name: ${upper("sandhya")}`); // "Name: SANDHYA"

// Array method
const skills = ["React", "JavaScript", "Tailwind"];
console.log(`Skills: ${skills.join(", ")}`);
// "Skills: React, JavaScript, Tailwind"

// Object property
const user = { name: "Sandhya", age: 22 };
console.log(`${user.name} is ${user.age} years old.`);
// "Sandhya is 22 years old."
```

---

## 3. Multi-line Strings

```javascript
// Old way — need \n
const old = "Line 1\nLine 2\nLine 3";

// Template literal — natural line breaks ✅
const multiLine = `Line 1
Line 2
Line 3`;

// Building HTML strings
const card = `
    <div class="card">
        <h2>Sandhya Paliwal</h2>
        <p>React Developer</p>
        <p>Dehradun, India</p>
    </div>
`;

document.querySelector(".container").innerHTML = card;
```

---

## 4. Dynamic HTML with Template Literals

```javascript
const user = {
    name: "Sandhya",
    role: "React Developer",
    github: "sandhyapaliwal",
    skills: ["React", "JavaScript", "Tailwind CSS"]
};

const profileCard = `
    <div class="profile-card">
        <h2>${user.name}</h2>
        <p>${user.role}</p>
        <ul>
            ${user.skills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>
        <a href="https://github.com/${user.github}">GitHub</a>
    </div>
`;

document.body.innerHTML = profileCard;
```

---

## 5. Nested Template Literals

```javascript
const items = ["Apple", "Mango", "Banana"];

const list = `
    <ul>
        ${items.map(item => `<li>${item}</li>`).join("\n")}
    </ul>
`;

// Nested ternary
const score = 85;
const grade = `
    Score: ${score}
    Grade: ${
        score >= 90 ? "A" :
        score >= 80 ? "B" :
        score >= 70 ? "C" : "F"
    }
`;

console.log(grade);
// Score: 85
// Grade: B
```

---

## 6. Template Literals with Functions

```javascript
// Dynamic greeting
function greet(name, time) {
    return `Good ${time}, ${name}! Welcome back.`;
}
console.log(greet("Sandhya", "morning"));
// "Good morning, Sandhya! Welcome back."

// Build API URL
function buildUrl(endpoint, id) {
    const base = "https://api.example.com";
    return `${base}/${endpoint}/${id}`;
}
console.log(buildUrl("users", 42));
// "https://api.example.com/users/42"

// Build query string
function buildQuery(search, page = 1, limit = 10) {
    return `https://api.example.com/posts?search=${search}&page=${page}&limit=${limit}`;
}
console.log(buildQuery("react", 2));
// "https://api.example.com/posts?search=react&page=2&limit=10"
```

---

## 7. Template Literals in React

```javascript
// Dynamic class names
const isActive = true;
const btnClass = `btn ${isActive ? "active" : "inactive"}`;

// Dynamic API URLs
const userId = 42;
useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data));
}, [userId]);

// Dynamic messages
const ItemCount = ({ count }) => (
    <p>{`You have ${count} item${count !== 1 ? "s" : ""} in your cart.`}</p>
);
// count = 1 → "You have 1 item in your cart."
// count = 3 → "You have 3 items in your cart."

// Dynamic styles
const size = 16;
const style = {
    fontSize: `${size}px`,
    lineHeight: `${size * 1.5}px`
};
```

---

## 8. Common Use Cases

```javascript
// Error messages
const field = "email";
throw new Error(`Invalid value for field: ${field}`);

// Console logging
const user = { name: "Sandhya", id: 101 };
console.log(`Fetching data for: ${user.name} (ID: ${user.id})`);

// Email templates
const welcomeEmail = (name, email) => `
    Subject: Welcome!

    Dear ${name},

    Your account has been created for: ${email}

    Best regards,
    The Team
`;
```

---

## Template Literals vs Concatenation

```javascript
const name = "Sandhya";
const age = 22;
const role = "Developer";

// Concatenation — hard to read ❌
const msg1 = "Hello " + name + ", you are " + age + " and work as a " + role + ".";

// Template literal — easy to read ✅
const msg2 = `Hello ${name}, you are ${age} and work as a ${role}.`;

// Multi-line — concatenation is messy ❌
const html1 = "<div>" + "<h2>" + name + "</h2>" + "<p>" + role + "</p>" + "</div>";

// Template literal — clean ✅
const html2 = `
    <div>
        <h2>${name}</h2>
        <p>${role}</p>
    </div>
`;
```

---

## Quick Reference Table

| Feature | Syntax | Use Case |
|---|---|---|
| Basic | `Hello ${name}` | Embed variables |
| Expression | `${a + b}` | Math, logic |
| Ternary | `${x ? "yes" : "no"}` | Conditional strings |
| Function call | `${fn(value)}` | Transform values |
| Multi-line | Natural line breaks | HTML, long text |
| Nested | `${items.map(...)}` | Dynamic lists |

---

## Key Takeaways

1. Use **backticks** instead of quotes for template literals
2. Embed any **expression** inside `${}` — variables, math, ternary, functions
3. Multi-line strings work **naturally** — no `\n` needed
4. Great for building **dynamic HTML** and **API URLs**
5. In React — use for **class names**, **URLs**, and **conditional messages** ✅
6. Always prefer template literals over **string concatenation**

---

> 💡 **Golden Rule:**
> If you are using + to build a string with variables — switch to template literals.
> They are cleaner, more readable, and less error-prone!
