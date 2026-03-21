# Callbacks in JavaScript

## What is a Callback?

A **Callback** is a function that is passed as an argument to another function
and is executed after that function completes its task.

In simple words:
> "Call this function back when you are done."

```javascript
// Basic callback example
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback(); // call the function passed in
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Sandhya", sayBye);
// Hello, Sandhya!
// Goodbye!
```

---

## 1. Why Callbacks?

JavaScript is **single-threaded** — it executes one thing at a time.
Some tasks take time (fetching data, reading files, timers).

Callbacks allow JavaScript to:
- Start a task
- Move on to other code
- Come back and execute the callback when the task is done

```javascript
// Without callback — blocking (bad)
const data = fetchData(); // waits here until done ❌
console.log(data);
console.log("This waits too long!");

// With callback — non-blocking (good)
fetchData(function(data) {
    console.log(data); // runs when data is ready ✅
});
console.log("This runs immediately!"); // doesn't wait
```

---

## 2. Synchronous Callbacks

Synchronous callbacks execute immediately — right when they are called.

```javascript
// map — callback runs immediately for each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(n) {
    return n * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// filter — synchronous callback
const evens = numbers.filter(function(n) {
    return n % 2 === 0;
});
console.log(evens); // [2, 4]

// forEach — synchronous callback
numbers.forEach(function(n, index) {
    console.log(`Index ${index}: ${n}`);
});

// sort — synchronous callback
const sorted = [5, 2, 8, 1].sort(function(a, b) {
    return a - b;
});
console.log(sorted); // [1, 2, 5, 8]
```

---

## 3. Asynchronous Callbacks

Asynchronous callbacks execute later — after a task completes.

```javascript
// setTimeout — callback runs after delay
console.log("Start");

setTimeout(function() {
    console.log("Inside timeout"); // runs after 2 seconds
}, 2000);

console.log("End");

// Output:
// Start
// End
// Inside timeout (after 2 seconds)

// setInterval — callback runs repeatedly
let count = 0;
const interval = setInterval(function() {
    count++;
    console.log(`Count: ${count}`);
    if (count === 5) {
        clearInterval(interval); // stop after 5 times
    }
}, 1000);

// Event listeners — callback runs on user action
document.querySelector("button").addEventListener("click", function() {
    console.log("Button clicked!"); // runs when clicked
});
```

---

## 4. Callback with Parameters

```javascript
// Pass data to callback
function fetchUser(id, callback) {
    // simulate API call
    setTimeout(function() {
        const user = { id: id, name: "Sandhya", role: "Developer" };
        callback(user); // pass user data to callback
    }, 1000);
}

fetchUser(1, function(user) {
    console.log(user.name); // "Sandhya"
    console.log(user.role); // "Developer"
});

// Callback with error handling pattern
function fetchData(url, onSuccess, onError) {
    setTimeout(function() {
        const success = true;

        if (success) {
            onSuccess({ data: "Some data from " + url });
        } else {
            onError("Failed to fetch data");
        }
    }, 1000);
}

fetchData(
    "https://api.example.com/users",
    function(result) {
        console.log("Success:", result.data);
    },
    function(error) {
        console.log("Error:", error);
    }
);
```

---

## 5. Error-First Callbacks — Node.js Pattern

```javascript
// Convention: first argument is always error, second is result
function readFile(filename, callback) {
    setTimeout(function() {
        const error = null; // null means no error
        const data = "File content here...";
        callback(error, data);
    }, 500);
}

readFile("data.txt", function(error, data) {
    if (error) {
        console.log("Error:", error);
        return;
    }
    console.log("Data:", data); // "File content here..."
});

// With actual error
function readFileBad(filename, callback) {
    setTimeout(function() {
        const error = new Error("File not found!");
        callback(error, null);
    }, 500);
}

readFileBad("missing.txt", function(error, data) {
    if (error) {
        console.log("Error:", error.message); // "File not found!"
        return;
    }
    console.log("Data:", data);
});
```

---

## 6. Callback Hell — The Problem

When callbacks are nested inside each other deeply,
the code becomes hard to read and maintain.

```javascript
// Callback Hell — also called "Pyramid of Doom" ❌
getUser(userId, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                getAuthor(likes[0].userId, function(author) {
                    console.log(author.name); // finally!
                    // deeply nested — hard to read ❌
                });
            });
        });
    });
});
```

---

## 7. Solving Callback Hell

```javascript
// Solution 1 — Named functions (flatten the pyramid)
function handleAuthor(author) {
    console.log(author.name);
}

function handleLikes(likes) {
    getAuthor(likes[0].userId, handleAuthor);
}

function handleComments(comments) {
    getLikes(comments[0].id, handleLikes);
}

function handlePosts(posts) {
    getComments(posts[0].id, handleComments);
}

function handleUser(user) {
    getPosts(user.id, handlePosts);
}

getUser(userId, handleUser); // much more readable ✅

// Solution 2 — Promises (modern way) ✅
getUser(userId)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => getLikes(comments[0].id))
    .then(likes => getAuthor(likes[0].userId))
    .then(author => console.log(author.name))
    .catch(error => console.log(error));

// Solution 3 — Async/Await (cleanest) ✅
async function getUserData() {
    try {
        const user = await getUser(userId);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const likes = await getLikes(comments[0].id);
        const author = await getAuthor(likes[0].userId);
        console.log(author.name);
    } catch (error) {
        console.log(error);
    }
}
```

---

## 8. Callbacks vs Promises vs Async/Await

```javascript
// Same task — three different ways

// 1. Callback — old way
function getUserCallback(id, callback) {
    setTimeout(() => callback(null, { name: "Sandhya" }), 1000);
}

getUserCallback(1, (error, user) => {
    if (error) return console.log(error);
    console.log(user.name); // "Sandhya"
});

// 2. Promise — cleaner
function getUserPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ name: "Sandhya" }), 1000);
    });
}

getUserPromise(1)
    .then(user => console.log(user.name))
    .catch(error => console.log(error));

// 3. Async/Await — cleanest ✅
async function getUser(id) {
    const user = await getUserPromise(id);
    console.log(user.name);
}

getUser(1);
```

---

## 9. Real World Callbacks in React

```javascript
// onClick callback
const Button = ({ onClick, label }) => (
    <button onClick={onClick}>{label}</button>
);

// Usage
<Button
    label="Submit"
    onClick={() => console.log("Submitted!")}
/>

// onChange callback
const Input = ({ onChange, placeholder }) => (
    <input onChange={onChange} placeholder={placeholder} />
);

// setTimeout in useEffect
useEffect(() => {
    const timer = setTimeout(() => {
        setMessage("Welcome!");
    }, 3000);

    return () => clearTimeout(timer); // cleanup
}, []);

// Custom callback prop
const Form = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name: "Sandhya", email: "test@email.com" };
        onSubmit(data); // call parent's callback with data
    };

    return <form onSubmit={handleSubmit}>...</form>;
};

// Parent uses it
<Form onSubmit={(data) => console.log("Form data:", data)} />
```

---

## Quick Reference Table

| Type | When Executes | Example |
|---|---|---|
| Synchronous | Immediately | `map()`, `filter()`, `forEach()` |
| Asynchronous | After delay / event | `setTimeout`, `addEventListener` |
| Error-first | After async task | Node.js `fs.readFile()` |
| Event callback | On user action | `onClick`, `onChange` |

---

## Key Takeaways

1. A callback is a **function passed as an argument** to another function ✅
2. **Synchronous callbacks** run immediately — `map`, `filter`, `forEach`
3. **Asynchronous callbacks** run later — `setTimeout`, event listeners
4. **Error-first pattern** — first arg is error, second is result (Node.js)
5. **Callback hell** happens when callbacks are deeply nested — avoid it
6. Use **Promises** or **Async/Await** to solve callback hell ✅
7. React uses callbacks constantly — `onClick`, `onChange`, `onSubmit`

---

> 💡 **Golden Rule:**
> Callbacks are the foundation of async JavaScript.
> For simple tasks — use callbacks.
> For complex async flows — use Promises or Async/Await instead!
