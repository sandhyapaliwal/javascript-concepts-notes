Native Browser APIs in JavaScript
Overview

Native Browser APIs are built-in interfaces provided by the browser that allow JavaScript to interact with the browser environment.

They help in:

Manipulating the DOM
Handling events
Making network requests
Storing data in the browser
Working with browser features like location, history, etc.
1. DOM API (Document Object Model)

Used to access and manipulate HTML elements.

Example:
const heading = document.getElementById("title");
heading.textContent = "Hello World!";
Create & Append Element:
const div = document.createElement("div");
div.textContent = "New Element";
document.body.appendChild(div);
2. Event Handling API

Used to listen and respond to user actions like clicks, typing, etc.

Example:
const button = document.querySelector("button");

button.addEventListener("click", () => {
  alert("Button clicked!");
});
3. Fetch API (Network Requests)

Used to make HTTP requests (GET, POST, etc.).

Example:
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
Async/Await Version:
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
4. Local Storage API

Used to store data in the browser (persists even after refresh).

Example:
localStorage.setItem("username", "Sandhya");

const user = localStorage.getItem("username");
console.log(user);

localStorage.removeItem("username");
5. Session Storage API

Similar to localStorage but data is cleared when tab is closed.

sessionStorage.setItem("token", "12345");

const token = sessionStorage.getItem("token");
console.log(token);

sessionStorage.clear();
6. Geolocation API

Used to get user's location (requires permission).

navigator.geolocation.getCurrentPosition(
  position => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  },
  error => {
    console.error(error);
  }
);
7. Navigator API

Provides information about the browser.

console.log(navigator.userAgent);
console.log(navigator.language);
console.log(navigator.onLine);
8. History API

Used to navigate browser history.

history.back();    // Go back
history.forward(); // Go forward
9. Location API

Used to get or change the current URL.

console.log(location.href);

location.reload();       // Refresh page
location.assign("https://google.com"); // Redirect
10. Timer APIs

Used for delayed or repeated execution.

setTimeout:
setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);
setInterval:
setInterval(() => {
  console.log("Runs every 1 second");
}, 1000);
11. Console API

Used for debugging.

console.log("Normal log");
console.error("Error message");
console.warn("Warning message");
Key Points (Interview Important)
Native APIs are provided by the browser, not JavaScript itself
Work directly with window object
Commonly used APIs:
DOM
Fetch
Storage (local/session)
Events
No external libraries required
