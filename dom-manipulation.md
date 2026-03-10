# DOM Manipulation in JavaScript

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface that represents
an HTML document as a **tree of objects**.

JavaScript can use the DOM to:
- **Select** HTML elements
- **Change** content, styles, and attributes
- **Add or remove** elements
- **Listen** for user events (clicks, input, etc.)

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        ├── p
        └── div
            ├── span
            └── button
```

---

## 1. Selecting Elements

```javascript
// By ID — returns single element
const title = document.getElementById("title");

// By Class — returns HTMLCollection (like an array)
const items = document.getElementsByClassName("item");

// By Tag — returns HTMLCollection
const paragraphs = document.getElementsByTagName("p");

// querySelector — returns FIRST matching element (CSS selector)
const btn = document.querySelector(".btn");
const heading = document.querySelector("#heading");
const input = document.querySelector("input[type='text']");

// querySelectorAll — returns ALL matching elements (NodeList)
const allItems = document.querySelectorAll(".item");
const allButtons = document.querySelectorAll("button");

// Best Practice — use querySelector and querySelectorAll ✅
```

---

## 2. Changing Content

```javascript
const heading = document.querySelector("h1");

// innerHTML — can include HTML tags
heading.innerHTML = "<span>Hello Sandhya!</span>";

// textContent — plain text only, no HTML parsing (safer)
heading.textContent = "Hello Sandhya!";

// innerText — visible text only (respects CSS styling)
heading.innerText = "Hello Sandhya!";

// Example
const card = document.querySelector(".card");
card.innerHTML = `
    <h2>Sandhya Paliwal</h2>
    <p>React Developer</p>
    <a href="#">View Profile</a>
`;
```

---

## 3. Changing Styles

```javascript
const box = document.querySelector(".box");

// Direct style property
box.style.color = "red";
box.style.backgroundColor = "#1e293b";
box.style.fontSize = "20px";
box.style.display = "none";     // hide element
box.style.display = "block";    // show element

// Better approach — toggle CSS classes
box.classList.add("active");        // add a class
box.classList.remove("active");     // remove a class
box.classList.toggle("active");     // add if not present, remove if present
box.classList.contains("active");   // returns true or false

// Example — dark mode toggle
const body = document.body;
const toggleBtn = document.querySelector("#toggle");

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});
```

---

## 4. Changing Attributes

```javascript
const img = document.querySelector("img");
const link = document.querySelector("a");
const input = document.querySelector("input");

// Get attribute
img.getAttribute("src");        // get current src
link.getAttribute("href");

// Set attribute
img.setAttribute("src", "new-image.jpg");
img.setAttribute("alt", "Profile Photo");
link.setAttribute("href", "https://github.com/sandhyapaliwal");

// Remove attribute
img.removeAttribute("alt");

// Shortcut for common attributes
img.src = "new-image.jpg";      // same as setAttribute
input.value = "Hello";          // get/set input value
input.placeholder = "Enter name...";
link.href = "https://example.com";
```

---

## 5. Creating and Adding Elements

```javascript
// Create a new element
const newDiv = document.createElement("div");
const newPara = document.createElement("p");
const newBtn = document.createElement("button");

// Add content
newPara.textContent = "This is a new paragraph";
newBtn.textContent = "Click Me";
newDiv.classList.add("card");

// Append to DOM
document.body.appendChild(newPara);         // add at end of body
document.body.appendChild(newBtn);

// Insert before a specific element
const container = document.querySelector(".container");
const existingItem = document.querySelector(".item");
container.insertBefore(newDiv, existingItem);

// Modern methods
container.append(newDiv);                   // add at end
container.prepend(newDiv);                  // add at beginning
existingItem.before(newDiv);               // add before element
existingItem.after(newDiv);                // add after element

// Real Example — Add a task to list
function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("task-item");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(deleteBtn);
    document.querySelector("#task-list").appendChild(li);
}
```

---

## 6. Removing Elements

```javascript
const item = document.querySelector(".item");

// Remove element
item.remove(); // modern way ✅

// Remove child (old way)
const parent = document.querySelector(".container");
const child = document.querySelector(".item");
parent.removeChild(child);

// Remove all children
const list = document.querySelector("ul");
list.innerHTML = ""; // clears all children ✅
```

---

## 7. Event Listeners

```javascript
const btn = document.querySelector("#myBtn");

// Click event
btn.addEventListener("click", () => {
    console.log("Button clicked!");
});

// Input event — fires on every keystroke
const input = document.querySelector("#search");
input.addEventListener("input", (e) => {
    console.log("Current value:", e.target.value);
});

// Submit event — form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page from refreshing
    const value = document.querySelector("#name").value;
    console.log("Submitted:", value);
});

// Mouse events
btn.addEventListener("mouseover", () => btn.style.background = "blue");
btn.addEventListener("mouseout", () => btn.style.background = "");

// Keyboard events
document.addEventListener("keydown", (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") console.log("Enter pressed!");
});

// Common events list
// click, dblclick, mouseover, mouseout, mousedown, mouseup
// keydown, keyup, keypress
// input, change, submit, focus, blur
// load, resize, scroll
```

---

## 8. Event Delegation — Important Concept

```javascript
// ❌ Bad — adding listener to each item
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", () => console.log("clicked"));
});

// ✅ Good — add ONE listener to parent (event delegation)
const list = document.querySelector("#list");
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        console.log("Item clicked:", e.target.textContent);
    }
});

// Why better?
// Works for dynamically added elements too! ✅
// Only ONE event listener instead of many ✅
```

---

## 9. Real World Example — Todo List

```html
<input id="task-input" type="text" placeholder="Add task..." />
<button id="add-btn">Add</button>
<ul id="task-list"></ul>
```

```javascript
const input = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-btn");
const taskList = document.querySelector("#task-list");

// Add task
addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">×</button>
    `;
    taskList.appendChild(li);
    input.value = ""; // clear input
});

// Delete task — event delegation
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }
});

// Mark as done
taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
        e.target.classList.toggle("done");
    }
});
```

---

## Quick Reference Table

| Action | Method |
|---|---|
| Select one element | `querySelector()` |
| Select all elements | `querySelectorAll()` |
| Change text | `textContent` |
| Change HTML | `innerHTML` |
| Add class | `classList.add()` |
| Remove class | `classList.remove()` |
| Toggle class | `classList.toggle()` |
| Create element | `createElement()` |
| Add to DOM | `appendChild()` / `append()` |
| Remove element | `element.remove()` |
| Add event | `addEventListener()` |
| Get input value | `element.value` |

---

## Key Takeaways

1. Use `querySelector` and `querySelectorAll` — most flexible selectors ✅
2. Prefer `textContent` over `innerHTML` when adding plain text — safer
3. Use `classList.toggle()` for showing/hiding elements
4. Always use `addEventListener` — not inline `onclick`
5. Use **event delegation** for dynamic elements
6. `e.preventDefault()` stops default browser behavior (form refresh, link navigation)

---

> 💡 **Golden Rule:**
> Select → Modify → Listen
> querySelector → change content/style → addEventListener
