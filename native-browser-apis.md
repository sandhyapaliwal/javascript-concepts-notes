# Native Browser APIs in JavaScript

## 📌 Overview

Native Browser APIs are built-in interfaces provided by the browser that allow JavaScript to interact with the browser environment.

They help in:
- Manipulating the DOM
- Handling events
- Making network requests
- Storing data in the browser
- Working with browser features like location, history, etc.

---

## 1. DOM API (Document Object Model)

Used to access and manipulate HTML elements.

### Basic DOM Access:

```javascript
const heading = document.getElementById("title");
heading.textContent = "Hello World!";
```

### Create & Append Element:

```javascript
const div = document.createElement("div");
div.textContent = "New Element";
document.body.appendChild(div);
```

### Query Selectors:

```javascript
const element = document.querySelector(".className");
const elements = document.querySelectorAll(".className");
```

---

## 2. Event Handling API

Used to listen and respond to user actions like clicks, typing, etc.

### Example:

```javascript
const button = document.querySelector("button");
button.addEventListener("click", () => {
  alert("Button clicked!");
});
```

### Common Events:

- `click` - Mouse click
- `input` - Text input change
- `submit` - Form submission
- `mouseover` - Mouse hover
- `keypress` - Key press
- `change` - Input/select value change

### Remove Event Listener:

```javascript
const handleClick = () => {
  console.log("Clicked!");
};

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

---

## 3. Fetch API (Network Requests)

Used to make HTTP requests (GET, POST, etc.).

### Basic Fetch Example:

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Async/Await Version:

```javascript
async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

getData();
```

### POST Request:

```javascript
async function postData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Post",
        body: "This is a new post",
        userId: 1,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

postData();
```

---

## 4. Local Storage API

Used to store data in the browser (persists even after refresh).

### Basic Operations:

```javascript
// Save data
localStorage.setItem("username", "Sandhya");

// Retrieve data
const user = localStorage.getItem("username");
console.log(user); // "Sandhya"

// Remove specific item
localStorage.removeItem("username");

// Clear all data
localStorage.clear();
```

### Store Objects:

```javascript
const user = { name: "John", age: 25 };
localStorage.setItem("user", JSON.stringify(user));

const retrievedUser = JSON.parse(localStorage.getItem("user"));
console.log(retrievedUser); // { name: "John", age: 25 }
```

---

## 5. Session Storage API

Similar to localStorage but data is cleared when tab is closed.

### Basic Operations:

```javascript
// Save data
sessionStorage.setItem("token", "12345");

// Retrieve data
const token = sessionStorage.getItem("token");
console.log(token); // "12345"

// Remove item
sessionStorage.removeItem("token");

// Clear all data
sessionStorage.clear();
```

---

## 6. Geolocation API

Used to get user's location (requires permission).

```javascript
navigator.geolocation.getCurrentPosition(
  position => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position.coords.accuracy);
  },
  error => {
    console.error("Error getting location:", error);
  }
);
```

### Watch Position (continuous updates):

```javascript
const watchId = navigator.geolocation.watchPosition(
  position => {
    console.log("Current position:", position.coords);
  },
  error => {
    console.error(error);
  }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

---

## 7. Navigator API

Provides information about the browser.

### Examples:

```javascript
console.log(navigator.userAgent);    // Browser info
console.log(navigator.language);     // Browser language
console.log(navigator.onLine);       // Connection status
console.log(navigator.platform);     // Operating system
console.log(navigator.vendor);       // Browser vendor
```

---

## 8. History API

Used to navigate browser history.

```javascript
history.back();       // Go back one page
history.forward();    // Go forward one page
history.go(-2);       // Go back 2 pages
history.go(1);        // Go forward 1 page
```

---

## 9. Location API

Used to get or change the current URL.

### Examples:

```javascript
console.log(location.href);      // Current URL
console.log(location.hostname);  // Domain name
console.log(location.pathname);  // Path
console.log(location.protocol);  // Protocol (http/https)

// Navigate to a new URL
location.assign("https://google.com");      // Can go back
location.replace("https://google.com");     // Cannot go back
location.reload();                          // Refresh page
```

---

## 10. Timer APIs

Used for delayed or repeated execution.

### setTimeout (runs once):

```javascript
setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);
```

### setInterval (runs repeatedly):

```javascript
const intervalId = setInterval(() => {
  console.log("Runs every 1 second");
}, 1000);

// Stop the interval
clearInterval(intervalId);
```

### requestAnimationFrame:

```javascript
function animate() {
  console.log("Animation frame");
  requestAnimationFrame(animate);
}

animate();
```

---

## 11. Console API

Used for debugging.

### Examples:

```javascript
console.log("Normal log");
console.error("Error message");
console.warn("Warning message");
console.info("Info message");
console.table([{ name: "John", age: 25 }]);
console.time("label");
// ... code
console.timeEnd("label");
```

---

## 12. Notification API

Used to display system notifications (requires permission).

```javascript
if (Notification.permission === "granted") {
  new Notification("Hello!", {
    body: "This is a notification",
    icon: "/path/to/icon.png",
  });
}
```

---

## 13. Media Query API

Used to respond to media queries in JavaScript.

```javascript
const mediaQuery = window.matchMedia("(max-width: 600px)");

if (mediaQuery.matches) {
  console.log("Mobile view");
} else {
  console.log("Desktop view");
}

// Listen for changes
mediaQuery.addListener(e => {
  if (e.matches) {
    console.log("Changed to mobile view");
  } else {
    console.log("Changed to desktop view");
  }
});
```

---

## 🔄 localStorage vs sessionStorage vs Cookies

| Feature        | localStorage       | sessionStorage     | Cookies      |
| -------------- | ------------------ | ------------------ | ------------ |
| Persistence    | Until manual clear | Tab closed         | Expires time |
| Size           | ~5-10MB            | ~5-10MB            | ~4KB         |
| Server Access  | Client-side only   | Client-side only   | Both         |
| Sent with HTTP | No                 | No                 | Yes          |

---

## 🚨 Common Interview Questions

### 1. What are Native Browser APIs?

👉 Built-in interfaces provided by the browser to interact with the browser environment (DOM, storage, network, etc.)

### 2. Difference between localStorage and sessionStorage?

👉 **localStorage** persists indefinitely until cleared manually, while **sessionStorage** clears when the tab is closed.

### 3. How do you make a POST request using Fetch API?

👉 Use `fetch()` with `method: "POST"`, set headers, and pass data in the `body` parameter.

### 4. What is the purpose of Geolocation API?

👉 To retrieve the user's geographical coordinates (latitude and longitude) with their permission.

### 5. Difference between setTimeout and setInterval?

👉 **setTimeout** runs code once after a delay, **setInterval** runs code repeatedly at intervals.

---

## 🧩 Key Takeaways

- Native APIs are provided by the browser, not JavaScript itself
- They work directly with the `window` object
- Commonly used APIs: DOM, Fetch, Storage, Events, Location, History
- No external libraries required for native APIs
- localStorage is used for persistent data, sessionStorage for temporary data
- Fetch API is the modern way to make HTTP requests
- Always check browser compatibility before using APIs
