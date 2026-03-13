# Event Listeners in JavaScript

## What are Event Listeners?

An **Event Listener** is a function that waits for a specific event to occur
on an HTML element and then executes a callback function in response.

```javascript
element.addEventListener(eventType, callbackFunction);
```

---

## 1. Basic Syntax

```javascript
const btn = document.querySelector("#myBtn");

// addEventListener — recommended way ✅
btn.addEventListener("click", function() {
    console.log("Button clicked!");
});

// With arrow function
btn.addEventListener("click", () => {
    console.log("Button clicked!");
});

// Named function — easier to remove later
function handleClick() {
    console.log("Button clicked!");
}
btn.addEventListener("click", handleClick);

// Remove event listener
btn.removeEventListener("click", handleClick);
```

---

## 2. Mouse Events

```javascript
const box = document.querySelector(".box");

// Click — single click
box.addEventListener("click", () => {
    console.log("Clicked!");
});

// Double click
box.addEventListener("dblclick", () => {
    console.log("Double clicked!");
});

// Mouse enters the element
box.addEventListener("mouseover", () => {
    box.style.backgroundColor = "blue";
});

// Mouse leaves the element
box.addEventListener("mouseout", () => {
    box.style.backgroundColor = "";
});

// Mouse button pressed down
box.addEventListener("mousedown", () => {
    console.log("Mouse button pressed!");
});

// Mouse button released
box.addEventListener("mouseup", () => {
    console.log("Mouse button released!");
});

// Mouse moves over element
box.addEventListener("mousemove", (e) => {
    console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
});
```

---

## 3. Keyboard Events

```javascript
// keydown — fires when key is pressed
document.addEventListener("keydown", (e) => {
    console.log("Key pressed:", e.key);
    console.log("Key code:", e.code);
});

// keyup — fires when key is released
document.addEventListener("keyup", (e) => {
    console.log("Key released:", e.key);
});

// Common key checks
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("Enter pressed!");
    }
    if (e.key === "Escape") {
        console.log("Escape pressed — close modal!");
    }
    if (e.key === "ArrowUp") {
        console.log("Up arrow pressed!");
    }

    // Check modifier keys
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault(); // prevent browser save dialog
        console.log("Ctrl + S pressed — save!");
    }
});

// Input field — detect typing
const input = document.querySelector("#search");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("Search:", input.value);
    }
});
```

---

## 4. Form Events

```javascript
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

// submit — fires on form submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // ⚠️ prevent page refresh — always use this!
    console.log("Form submitted!");
    console.log("Name:", nameInput.value);
    console.log("Email:", emailInput.value);
});

// input — fires on every keystroke
nameInput.addEventListener("input", (e) => {
    console.log("Current value:", e.target.value);
});

// change — fires when value changes and element loses focus
emailInput.addEventListener("change", (e) => {
    console.log("Changed to:", e.target.value);
});

// focus — fires when element gains focus
nameInput.addEventListener("focus", () => {
    nameInput.style.borderColor = "blue";
});

// blur — fires when element loses focus
nameInput.addEventListener("blur", () => {
    nameInput.style.borderColor = "";
    if (!nameInput.value) {
        console.log("Name is required!");
    }
});
```

---

## 5. Window Events

```javascript
// load — fires when page fully loads
window.addEventListener("load", () => {
    console.log("Page fully loaded!");
});

// DOMContentLoaded — fires when HTML is parsed (faster than load)
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready!");
});

// resize — fires when window is resized
window.addEventListener("resize", () => {
    console.log("Width:", window.innerWidth);
    console.log("Height:", window.innerHeight);
});

// scroll — fires when user scrolls
window.addEventListener("scroll", () => {
    console.log("Scroll position:", window.scrollY);

    // Show back-to-top button
    const backBtn = document.querySelector("#back-to-top");
    if (window.scrollY > 300) {
        backBtn.style.display = "block";
    } else {
        backBtn.style.display = "none";
    }
});
```

---

## 6. The Event Object (e)

```javascript
btn.addEventListener("click", (e) => {
    // e is the event object — contains useful information

    console.log(e.type);          // "click" — type of event
    console.log(e.target);        // element that triggered the event
    console.log(e.currentTarget); // element the listener is attached to
    console.log(e.clientX);       // mouse X position
    console.log(e.clientY);       // mouse Y position
    console.log(e.key);           // key pressed (keyboard events)

    e.preventDefault();           // prevent default browser behavior
    e.stopPropagation();          // stop event from bubbling up
});

// e.target vs e.currentTarget
const list = document.querySelector("ul");
list.addEventListener("click", (e) => {
    console.log(e.target);        // the <li> that was clicked
    console.log(e.currentTarget); // the <ul> the listener is on
});
```

---

## 7. Event Bubbling and Capturing

```javascript
// Event Bubbling — event travels UP from child to parent (default)
document.querySelector("button").addEventListener("click", () => {
    console.log("Button clicked");  // fires first
});

document.querySelector("div").addEventListener("click", () => {
    console.log("Div clicked");     // fires second
});

document.querySelector("body").addEventListener("click", () => {
    console.log("Body clicked");    // fires last
});
// Clicking button logs: Button → Div → Body

// Stop bubbling
document.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation(); // stops event from going to parent
    console.log("Only button — no bubbling!");
});

// Event Capturing — event travels DOWN from parent to child
// Pass true as third argument
document.querySelector("div").addEventListener("click", () => {
    console.log("Div (capturing)"); // fires first during capture
}, true);
```

---

## 8. Event Delegation — Best Practice ✅

```javascript
// ❌ Bad — add listener to each item separately
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", () => {
        console.log("Item clicked:", item.textContent);
    });
});
// Problem: doesn't work for dynamically added items!

// ✅ Good — add ONE listener to parent
const list = document.querySelector("#list");
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        console.log("Item clicked:", e.target.textContent);
    }
});
// Works for dynamically added items too! ✅
// Only ONE listener instead of many ✅

// Real world — delete button in a list
const taskList = document.querySelector("#task-list");
taskList.addEventListener("click", (e) => {
    // Delete task
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest("li").remove();
    }

    // Mark as done
    if (e.target.classList.contains("task-text")) {
        e.target.classList.toggle("done");
    }
});
```

---

## 9. Once — Fire Event Only One Time

```javascript
// { once: true } — listener auto-removes after first trigger
btn.addEventListener("click", () => {
    console.log("This fires only ONCE!");
}, { once: true });

// Useful for: welcome modals, one-time animations, intro screens
```

---

## 10. Real World Example — Search with Debounce

```javascript
const searchInput = document.querySelector("#search");
const results = document.querySelector("#results");

let timer;

searchInput.addEventListener("input", (e) => {
    clearTimeout(timer); // clear previous timer

    timer = setTimeout(() => {
        const query = e.target.value.trim();

        if (query) {
            // Simulate API call
            results.textContent = `Searching for: ${query}`;
            console.log("API call with:", query);
        }
    }, 500); // wait 500ms after user stops typing
});

// Why debounce?
// Without it — API called on EVERY keystroke (too many calls!) ❌
// With it — API called only after user stops typing ✅
```

---

## Complete Event Types Reference

| Category | Events |
|---|---|
| Mouse | `click`, `dblclick`, `mouseover`, `mouseout`, `mousedown`, `mouseup`, `mousemove` |
| Keyboard | `keydown`, `keyup`, `keypress` |
| Form | `submit`, `input`, `change`, `focus`, `blur`, `reset` |
| Window | `load`, `DOMContentLoaded`, `resize`, `scroll` |
| Touch | `touchstart`, `touchend`, `touchmove` |
| Drag | `dragstart`, `dragend`, `dragover`, `drop` |
| Clipboard | `copy`, `cut`, `paste` |

---

## Key Takeaways

1. Always use `addEventListener` — never use inline `onclick` in HTML ✅
2. Always use `e.preventDefault()` in form submit — stops page refresh
3. Use **event delegation** for dynamic elements and better performance
4. `e.target` — element that triggered the event
5. `e.currentTarget` — element the listener is attached to
6. `{ once: true }` — fires event only one time then auto-removes
7. **Debounce** input events to avoid too many API calls
8. `stopPropagation()` — stops event from bubbling to parent elements

---

> 💡 **Golden Rule:**
> One listener on the parent is better than many listeners on children.
> Always use event delegation for lists and dynamic content!
